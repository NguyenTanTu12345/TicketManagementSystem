using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TicketManagementSystem_BE.Data;
using TicketManagementSystem_BE.DTO;
using TicketManagementSystem_BE.Helpers;
using TicketManagementSystem_BE.Models;

namespace TicketManagementSystem_BE.Controllers
{
    [EnableCors("myOrigins")]
    [Route("api/support-menu")]
    [ApiController]
    public class SupportMenuController : ControllerBase
    {
        private readonly TicketManagementSystemContext _context;
        private readonly IPrincipal _principal;
        private readonly IConfiguration _configuration;

        public SupportMenuController(TicketManagementSystemContext context, IPrincipal principal,
            IConfiguration configuration)
        {
            _context = context;
            _principal = principal;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SupportMenu>>> GetAll()
        {
            if (_context.SupportMenus == null)
            {
                return NotFound(new { message = "Rescouces Not Found!!!" });
            }
            return await _context.SupportMenus.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SupportMenu>> Get(int id)
        {
            var supportMenu = await _context.SupportMenus.FindAsync(id);
            if (supportMenu == null)
            {
                return NotFound(new { message = "Rescouce Not Found!!!" });
            }
            return supportMenu;
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult> Create(SupportMenuDTO supportMenuDTO)
        {
            if (supportMenuDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            var principal = _principal.GetPrincipal(supportMenuDTO.AccessToken, _configuration["JWT:SecretKey"]);
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
            SupportMenu supportMenu = new SupportMenu
            {
                SupportMenuTitle = supportMenuDTO.SupportMenuTitle,
                SupportMenuContent = supportMenuDTO.SupportMenuContent,
                UserId = user.UserId.Trim()
            };
            await _context.SupportMenus.AddAsync(supportMenu);
            await _context.SaveChangesAsync();
            return Ok(new { message  = "Create Successful~"});
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<ActionResult> Update(SupportMenuDTO supportMenuDTO)
        {
            if (supportMenuDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            var principal = _principal.GetPrincipal(supportMenuDTO.AccessToken, _configuration["JWT:SecretKey"]);
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
            SupportMenu supportMenu = new SupportMenu
            {
                SupportMenuId = supportMenuDTO.SupportMenuId,
                SupportMenuTitle = supportMenuDTO.SupportMenuTitle,
                SupportMenuContent = supportMenuDTO.SupportMenuContent,
                UserId = user.UserId.Trim()
            };
            _context.Update(supportMenu);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Update Successful~" });
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var supportMenu = await _context.SupportMenus.FindAsync(id);
            if (supportMenu == null)
            {
                return NotFound();
            }
            _context.SupportMenus.Remove(supportMenu);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Delete Successful~" });
        }
    }
}
