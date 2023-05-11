using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TicketManagementSystem.Data;
using TicketManagementSystem.Models;

namespace TicketManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly TicketManagementSystemContext _context;
        private readonly IConfiguration _configuration;

        public LoginController(TicketManagementSystemContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("Login")]
        public IActionResult Login(String userMail, String userPassword)
        {
            Models.User user = _context.Users.Where(s => s.Mail == userMail 
            && s.UserPassword == userPassword).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }
            var result = new {success = true, token = GenerateToken(user) };
            return Ok(result);
        }

        private String GenerateToken(Models.User user)
        {
            var authClaims = new List<Claim>
            {
                new Claim("userMail", user.Mail),
                new Claim("userName", "Admin01"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var authSignInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"]));
            var token = new JwtSecurityToken(
                expires: DateTime.Now.AddDays(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSignInKey, SecurityAlgorithms.HmacSha256Signature)
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
