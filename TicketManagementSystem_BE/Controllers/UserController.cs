using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using TicketManagementSystem_BE.Data;
using TicketManagementSystem_BE.DTO;
using TicketManagementSystem_BE.Helpers;
using TicketManagementSystem_BE.Models;

namespace TicketManagementSystem_BE.Controllers
{
    [EnableCors("myOrigins")]
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TicketManagementSystemContext _context;
        private readonly INewID _newID;
        private readonly IConfiguration _configuration;
        private readonly IPrincipal _principal;

        public UserController(TicketManagementSystemContext context, INewID newID, 
            IConfiguration configuration, IPrincipal principal)
        {
            _context = context;
            _newID = newID;
            _configuration = configuration;
            _principal = principal;
        }

        [HttpPost("authenticate")]
        public async Task<ActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
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
            await AddOrUpdateAsync(user.UserId, token, refreshToken);
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
            if (String.IsNullOrEmpty(tokenDTO.AccessToken) || String.IsNullOrEmpty(tokenDTO.RefreshToken))
            {
                return BadRequest(new
                {
                    meassage = tokenDTO.AccessToken,
                    message1 = tokenDTO.RefreshToken
                });
            }
            var principal = _principal.GetPrincipal(tokenDTO.AccessToken, _configuration["JWT:SecretKey"]);
            var userMail = principal.FindFirst(ClaimTypes.Email)?.Value;
            var user = await _context.Users.FirstOrDefaultAsync(s => s.Mail == userMail);
            if (user == null)
            {
                return BadRequest(new
                {
                    meassage = "Not Found That User 123"
                });
            }
            var userToken = await _context.UserTokens.FindAsync(user.UserId);
            if (userToken == null || userToken.RefreshToken.Trim() != tokenDTO.RefreshToken || userToken.RefreshTokenExpiredTime <= DateTime.Now)
            {
                return BadRequest(new
                {
                    meassage = "Not Found That User!!!"
                }); 
            }
            string newAccessToken = await CreateJwt(user);
            string newRefreshToken = await CreateRefreshToken();
            await AddOrUpdateAsync(user.UserId, newAccessToken, newRefreshToken);
            return Ok(new TokenDTO
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            });
        }

        private async Task<string> CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JWT:SecretKey"]);
            var role = await _context.Roles.FindAsync(user.RoleId);
            if (role  == null || String.IsNullOrEmpty(user.Mail))
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
                Expires = DateTime.Now.AddSeconds(5),
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

        private async Task AddOrUpdateAsync(string userId, string token, string refreshToken)
        {
            var userToken = await _context.UserTokens.FindAsync(userId);
            if (userToken == null)
            {
                UserToken userToken1 = new UserToken
                {
                    RefreshToken = refreshToken,
                    RefreshTokenExpiredTime = DateTime.Now.AddDays(1),
                    UserId = userId
                };
                await _context.UserTokens.AddAsync(userToken1);
            }
            else
            {
                userToken.RefreshToken = refreshToken;
                userToken.RefreshTokenExpiredTime = DateTime.Now.AddDays(1);
                _context.UserTokens.Update(userToken);
            }
            await _context.SaveChangesAsync();
        }
    }
}
