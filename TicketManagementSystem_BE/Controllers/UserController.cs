﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MoMo;
using Newtonsoft.Json.Linq;
using Org.BouncyCastle.Asn1.Ocsp;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using TicketManagementSystem_BE.Data;
using TicketManagementSystem_BE.DTO;
using TicketManagementSystem_BE.Helpers;
using TicketManagementSystem_BE.Models;
using TicketManagementSystem_BE.Services;

namespace TicketManagementSystem_BE.Controllers
{
    //[EnableCors("myOrigins")]
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TicketManagementSystemContext _context;
        private readonly INewID _newID;
        private readonly IConfiguration _configuration;
        private readonly IPrincipal _principal;
        private readonly ICustomEmailService _emailService;

        public UserController(TicketManagementSystemContext context, INewID newID, 
            IConfiguration configuration, IPrincipal principal,
            ICustomEmailService emailService)
        {
            _context = context;
            _newID = newID;
            _configuration = configuration;
            _principal = principal;
            _emailService = emailService;
        }

        [HttpPost("authenticate")]
        public async Task<ActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest(new { message = "Invalid Request!!!" });
            }
            var user = await _context.Users.FirstOrDefaultAsync(s => s.Mail == userObj.Mail);
            if (user == null)
            {
                return NotFound(new { message = "User Not Found!!!" });
            }  
            bool isValidPassword = BCrypt.Net.BCrypt.Verify(userObj.UserPassword, user.UserPassword.Trim());
            if (!(isValidPassword))
            {
                return BadRequest(new { message = "Incorrect Password!!!" });
            }
            string token = await CreateJwt(user);
            string refreshToken = await CreateRefreshToken();
            var userToken = await _context.UserTokens.FindAsync(user.UserId);
            await AddOrUpdateUserTokenAsync(user.UserId, token, refreshToken);
            return Ok(new TokenDTO
            {
                AccessToken = token,
                RefreshToken = refreshToken
            });
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }
            bool isExistedEmail = await _context.Users.AnyAsync(s => s.Mail.Trim() == userObj.Mail);
            if (isExistedEmail)
            {
                return BadRequest(new { message = "Email Already Exist!!!" });
            }
            List<string> listID = await _context.Users.Select(s => s.UserId).ToListAsync();
            userObj.UserId = _newID.CreateUserID(listID);
            userObj.UserPassword = BCrypt.Net.BCrypt.HashPassword(userObj.UserPassword);
            await _context.Users.AddAsync(userObj);
            await _context.SaveChangesAsync();
            return Ok(new { message = "User Registered~" });
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken(TokenDTO tokenDTO)
        {
            if (tokenDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            var principal = _principal.GetPrincipal(tokenDTO.AccessToken, _configuration["JWT:SecretKey"]);
            var userMail = principal.FindFirst(ClaimTypes.Email)?.Value;
            var user = await _context.Users.FirstOrDefaultAsync(s => s.Mail == userMail);
            if (user == null)
            {
                return NotFound(new { meassage = "User Not Found!!!" });
            }
            var userToken = await _context.UserTokens.FindAsync(user.UserId);
            if (userToken == null || userToken.RefreshToken.Trim() != tokenDTO.RefreshToken 
                || userToken.RefreshTokenExpired <= DateTime.Now)
            {
                return BadRequest(new { meassage = "Refuse Request!!!"}); 
            }
            string newAccessToken = await CreateJwt(user);
            string newRefreshToken = await CreateRefreshToken();
            await AddOrUpdateUserTokenAsync(user.UserId, newAccessToken, newRefreshToken);
            return Ok(new TokenDTO
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            });
        }

        [HttpPost("reset-password-token/{email}")]
        public async Task<IActionResult> ResetPasswordToken(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(s => s.Mail.Trim() == email);
            if (user == null)
            {
                return NotFound(new { message = "User Not Found!!" });
            }
            Random random = new Random();
            string resetPasswordToken = random.Next(100000, 999999).ToString();
            string from = _configuration["Email:From"];
            string password = _configuration["Email:Password"];
            string content = "<p>Mã thay đổi mật khẩu của bạn: " + resetPasswordToken + "</p>";
            var userToken = await _context.UserTokens.FirstOrDefaultAsync(s => s.UserId == user.UserId);
            if (userToken == null)
            {
                UserToken userToken1 = new UserToken
                {
                    UserId = user.UserId,
                    ResetPasswordToken = resetPasswordToken,
                    ResetPasswordTokenExpired = DateTime.Now.AddMinutes(1),
                    TotalInputWrongToken = 0
                };
                await _context.UserTokens.AddAsync(userToken1);
            }
            else
            {
                if (userToken.TotalInputWrongToken >= 3)
                {
                    return BadRequest(new { message = "Please Contact Administrator to Change Password!!!" });
                }
                userToken.ResetPasswordToken = resetPasswordToken;
                userToken.ResetPasswordTokenExpired = DateTime.Now.AddMinutes(1);
                userToken.TotalInputWrongToken = 0;
                _context.UserTokens.Update(userToken);
            }
            await _context.SaveChangesAsync();
            _emailService.SendEmail(from, password, email, "[Hue Festival] Reset Password", content);
            return Ok(new { message = "Send Mail Successful~"});
        }

        [HttpPost("check-reset-pass-token")]
        public async Task<IActionResult> CheckResetPassToken(ResetPasswordDTO resetPasswordDTO)
        {
            if (resetPasswordDTO == null) 
            {
                return BadRequest(new { message = "Invalid Request!!!" });
            }
            var user = await _context.Users.FirstOrDefaultAsync(s => s.Mail.Trim() == resetPasswordDTO.Mail);
            if (user == null)
            {
                return NotFound(new { message = "User Not Found!!!" });
            }
            var userToken = await _context.UserTokens.FirstOrDefaultAsync(s => s.UserId == user.UserId);
            if (userToken == null)
            {
                return BadRequest(new { message = "Refuse Request!!!" });
            }
            if (userToken.TotalInputWrongToken >= 3)
            {
                return BadRequest(new { message = "Please Contact Administrator to Change Password!!!" });
            }
            if (userToken.ResetPasswordToken.Trim() != resetPasswordDTO.ResetPasswordToken) 
            {
                userToken.TotalInputWrongToken = (byte?)(userToken.TotalInputWrongToken + 1);
                _context.UserTokens.Update(userToken);
                await _context.SaveChangesAsync();
                return BadRequest(new { message = "Wrong Reset Password Token" });
            }
            if (userToken.ResetPasswordTokenExpired < resetPasswordDTO.TimeSend)
            {
                return BadRequest(new { message = "Resset Password Token Expired!!!" });
            }
            return Ok(new { message = "Correct Resset Password" });
        }

        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword(User userObj)
        {
            var user = await _context.Users.FirstOrDefaultAsync(s => s.Mail.Trim() == userObj.Mail);
            if (user == null)
            {
                return BadRequest("Invalid Request!!!");
            }
            user.UserPassword = BCrypt.Net.BCrypt.HashPassword(userObj.UserPassword);
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Change Password Successful~" });
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> Update(User userObj)
        {
            var user = await _context.Users.FirstOrDefaultAsync(s => s.Mail.Trim() == userObj.Mail);
            if (user == null)
            {
                return BadRequest("Invalid Request!!!");
            }
            user.FullName = userObj.FullName;
            user.PhoneNumber = userObj.PhoneNumber;
            user.DateOfBirth = userObj.DateOfBirth;
            user.Cccd = userObj.Cccd;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Change Password Successful~" });
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAll()
        {
            if (_context.Users == null)
            {
                return NotFound(new { message = "Resources Not Found!!!" });
            }
            return await _context.Users.Where(s => s.RoleId.Trim() != "RO01").ToListAsync();
        }

        [Authorize]
        [HttpGet("get-by-mail/{mail}")]
        public async Task<ActionResult<User>> GetByMail(string mail)
        {
            var user = await _context.Users.FirstOrDefaultAsync(s => s.Mail.Trim() == mail);
            if (user == null)
            {
                return NotFound(new { message = "User Not Found!!!" });
            }
            return user;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(string id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(s => s.UserId == id);
            if (user == null)
            {
                return NotFound(new { message = "User Not Found!!!" });
            }
            return user;
        }

        [HttpPost("payment")]
        public async Task<ActionResult> Payment(UserProgramDTO userProgramDTO)
        {
            if (userProgramDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            var user = await _context.Users.FirstOrDefaultAsync(s => s.UserId.Trim() == userProgramDTO.UserId.Trim());
            if (user == null)
            {
                return NotFound(new { meassage = "User Not Found!!!" });
            }
            var program = await _context.Programs.FirstOrDefaultAsync(s => s.ProgramId.Trim() == userProgramDTO.ProgramId.Trim());
            if (program == null)
            {
                return NotFound(new { meassage = "Program Not Found!!!" });
            }
            var userPrograms = await _context.UserPrograms.Where(s => s.ProgramId == 
                program.ProgramId && s.Quantity != null).Select(s => s.Quantity).ToListAsync();
            int totalSell = 0;
            foreach (var item in userPrograms)
            {
                totalSell += int.Parse(item.ToString());
            }
            if (program.TotalTicket <= totalSell || program.TotalTicket <= userProgramDTO.Quantity)
            {
                return NotFound(new { meassage = "Out of Ticket!!!" });
            }
            //request params need to request to MoMo system
            string endpoint = _configuration["MoMo:endpoint"];
            string partnerCode = _configuration["MoMo:partnerCode"];
            string accessKey = _configuration["MoMo:accessKey"];
            string serectkey = _configuration["MoMo:serectkey"];
            string orderInfo = "Cảm ơn bạn đã thanh toán hóa đơn~";
            string returnUrl = _configuration["MoMo:returnUrl"];
            string notifyurl = _configuration["MoMo:notifyurl"];
            string amount = (program.ProgramPrice * userProgramDTO.Quantity).ToString();
            string orderid = DateTime.Now.Ticks.ToString();
            string requestId = DateTime.Now.Ticks.ToString();
            string extraData = user.UserId.Trim()+"@"+program.ProgramId.Trim() + "@" + userProgramDTO.Quantity;
            //Before sign HMAC SHA256 signature
            string rawHash = "partnerCode=" +
                partnerCode + "&accessKey=" +
                accessKey + "&requestId=" +
                requestId + "&amount=" +
                amount + "&orderId=" +
                orderid + "&orderInfo=" +
                orderInfo + "&returnUrl=" +
                returnUrl + "&notifyUrl=" +
                notifyurl + "&extraData=" +
                extraData;
            MoMoSecurity crypto = new MoMoSecurity();
            //sign signature SHA256
            string signature = crypto.signSHA256(rawHash, serectkey);
            //build body json request
            JObject message = new JObject
            {
                { "partnerCode", partnerCode },
                { "accessKey", accessKey },
                { "requestId", requestId },
                { "amount", amount },
                { "orderId", orderid },
                { "orderInfo", orderInfo },
                { "returnUrl", returnUrl },
                { "notifyUrl", notifyurl },
                { "extraData", extraData },
                { "requestType", "captureMoMoWallet" },
                { "signature", signature }
            };
            string responseFromMomo = PaymentRequest.sendPaymentRequest(endpoint, message.ToString());
            JObject jmessage = JObject.Parse(responseFromMomo);
            return Ok(new { message = jmessage.GetValue("payUrl").ToString() });
        }

        [HttpPost("confirm-payment-server")]
        public async Task<ActionResult> ConfirmPaymentServer(
            )
        {
            string rawContent = string.Empty;
            using (var reader = new StreamReader(Request.Body,
                          encoding: Encoding.UTF8, detectEncodingFromByteOrderMarks: false))
            {
                rawContent = await reader.ReadToEndAsync();
            }
            int first = rawContent.IndexOf("%40");
            int last = rawContent.LastIndexOf("%40");

            int indexOfUser = rawContent.IndexOf("extraData") + 10;
            int rangeOfUser = first - indexOfUser;
            string userId = rawContent.Substring(indexOfUser, rangeOfUser);

            int indexOfProgram = first + 3;
            int rangeOfProgram = last - indexOfProgram;
            string programId = rawContent.Substring(indexOfProgram, rangeOfProgram);

            int indexOfTotal = last + 3;
            int rangeOfTotal = rawContent.IndexOf("&payType") - indexOfTotal;
            int total = int.Parse(rawContent.Substring(indexOfTotal, rangeOfTotal));

            var userProgram = await _context.UserPrograms.Where(s => s.UserId == userId
                && s.ProgramId == programId).FirstOrDefaultAsync();
            if (userProgram == null)
            {
                UserProgram userProgram1 = new UserProgram
                {
                    UserId = userId,
                    ProgramId = programId,
                    Quantity = total
                };
                await _context.UserPrograms.AddAsync(userProgram1);
            }
            else
            {
                if (userProgram.Quantity == null)
                {
                    userProgram.Quantity = total;
                }
                else
                {
                    userProgram.Quantity += total;
                }
                _context.UserPrograms.Update(userProgram);
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("create")]
        public async Task<ActionResult> Create(UserDTO userDTO)
        {
            if (userDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            var principal = _principal.GetPrincipal(userDTO.AccessToken, _configuration["JWT:SecretKey"]);
            var userMail = principal.FindFirst(ClaimTypes.Email)?.Value;
            var user = await _context.Users.FirstOrDefaultAsync(s => s.Mail.Trim() == userMail);
            if (user == null)
            {
                return NotFound(new { meassage = "User Not Found!!!" });
            }
            if (user.RoleId.Trim() != "RO01")
            {
                return BadRequest(new { message = "You Aren't Allowed to Do This Action" });
            }
            bool isExistedEmail = await _context.Users.AnyAsync(s => s.Mail.Trim() == userDTO.Mail);
            if (isExistedEmail)
            {
                return BadRequest(new { message = "Email Already Exist!!!" });
            }
            List<string> listID = await _context.Users.Select(s => s.UserId).ToListAsync();
            User user1 = new User
            {
                UserId = _newID.CreateUserID(listID),
                FullName = userDTO.FullName,
                Mail = userDTO.Mail,
                UserPassword = BCrypt.Net.BCrypt.HashPassword(userDTO.UserPassword),
                UserState = userDTO.UserState,
                DateOfBirth = userDTO.DateOfBirth,
                Cccd = userDTO.Cccd,
                PhoneNumber = userDTO.PhoneNumber,
                RoleId = userDTO.RoleId
            };
            await _context.Users.AddAsync(user1);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Create Successful~" });
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            user.UserState = false;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Delete Successful~" });
        }

        private async Task<string> CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JWT:SecretKey"]);
            var role = await _context.Roles.FindAsync(user.RoleId);
            if (role == null || String.IsNullOrEmpty(user.Mail))
            {
                return "Can't Create JWT";
            }
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, role.RoleName),
                new Claim(ClaimTypes.Email, user.Mail.ToString().Trim())
            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        private async Task<string> CreateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);
            bool isHaveRefreshToken = await _context.UserTokens.AnyAsync(s => s.RefreshToken == refreshToken);
            if (isHaveRefreshToken)
            {
                return await CreateRefreshToken();
            }
            return refreshToken;
        }

        private async Task AddOrUpdateUserTokenAsync(string userId, string token, string refreshToken)
        {
            var userToken = await _context.UserTokens.FindAsync(userId);
            if (userToken == null)
            {
                UserToken userToken1 = new UserToken
                {
                    RefreshToken = refreshToken,
                    RefreshTokenExpired = DateTime.Now.AddDays(1),
                    UserId = userId
                };
                await _context.UserTokens.AddAsync(userToken1);
            }
            else
            {
                userToken.RefreshToken = refreshToken;
                userToken.RefreshTokenExpired = DateTime.Now.AddDays(1);
                _context.UserTokens.Update(userToken);
            }
            await _context.SaveChangesAsync();
        }
    }
}
