using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TicketManagementSystem_BE.Data;
using TicketManagementSystem_BE.Models;
using TicketManagementSystem_BE.Services;

namespace TicketManagementSystem_BE.Controllers
{
    [EnableCors("myOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TicketManagementSystemContext _context;
        private readonly ICreateIDService _createIDService;

        public UserController(TicketManagementSystemContext context, ICreateIDService createIDService)
        {
            _context = context;
            _createIDService = createIDService;
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
            return Ok(new { 
                message = "Login Success~",
                token = token
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
            userObj.UserId = _createIDService.CreateUserID(listID);
            userObj.UserPassword = BCrypt.Net.BCrypt.HashPassword(userObj.UserPassword);
            await _context.Users.AddAsync(userObj);
            await _context.SaveChangesAsync();
            return Ok(new { message = "User Registered~" });
        }

        private async Task<string> CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("ThisIsMyVerySecuritySecretKey");
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
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), 
                SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
    }
}
