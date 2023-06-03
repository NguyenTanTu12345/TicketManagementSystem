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
    [Route("api/program")]
    [ApiController]
    public class ProgramController : ControllerBase
    {
        /*private readonly TicketManagementSystemContext _context;
        private readonly IPrincipal _principal;
        private readonly IConfiguration _configuration;
        private readonly INewID _newID;

        public ProgramController(TicketManagementSystemContext context, IPrincipal principal,
            IConfiguration configuration, INewID newID)
        {
            _context = context;
            _principal = principal;
            _configuration = configuration;
            _newID = newID;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Program>>> GetAll()
        {
            if (_context.Programs == null)
            {
                return NotFound(new { message = "Resources Not Found!!!" });
            }
            return await _context.Programs.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProgramDTO>> Get(string id)
        {
            var program = await _context.Programs.FindAsync(id);
            if (program == null)
            {
                return NotFound(new { message = "Resource Not Found!!!" });
            }
            ProgramDTO programDTO = new ProgramDTO
            {
                ProgramId = program.ProgramId,
                ProgramContent = program.ProgramContent,
                ProgramFdate = (DateTime)program.ProgramFdate,
                ProgramTdate = program.ProgramTdate,
                ProgramName = program.ProgramName,
                ProgramPrice = program.ProgramPrice,
                ProgramTime = program.ProgramTime,
                TypeInOff = program.TypeInOff,
                TotalTicket = program.TotalTicket,
                LocationId = program.LocationId,
                ProgramType = program.ProgramType
            };
            var listProgramImage = await _context.ProgramImages.Where(s => s.ProgramId.Trim() == id).ToListAsync();
            if (listProgramImage != null)
            {
                foreach (var image in listProgramImage)
                {
                    programDTO.ImagePaths += image.ProgramImagePath + "@"; 
                }
            }
            return programDTO;
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult> Create(ProgramDTO programDTO)
        {
            if (programDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            var principal = _principal.GetPrincipal(programDTO.AccessToken, _configuration["JWT:SecretKey"]);
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
            if (programDTO.ProgramTdate < DateTime.Now)
            {
                return BadRequest(new { message = "Invalid DateTime" });
            }
            List<string> listID = await _context.Programs.Select(s => s.ProgramId).ToListAsync();
            string newProgramID = _newID.CreateProgramID(listID);
            Models.Program program = new Models.Program
            {
                ProgramId = newProgramID,
                ProgramContent = programDTO.ProgramContent,
                ProgramFdate = programDTO.ProgramFdate,
                ProgramTdate = programDTO.ProgramTdate,
                ProgramName = programDTO.ProgramName,
                ProgramPrice = programDTO.ProgramPrice,
                ProgramTime = programDTO.ProgramTime,
                TypeInOff = programDTO.TypeInOff,
                TotalTicket = programDTO.TotalTicket,
                LocationId = programDTO.LocationId,
                ProgramType = programDTO.ProgramType
            };
            await _context.Programs.AddAsync(program);
            string imagePath = programDTO.ImagePaths;
            string[] imagePaths = imagePath.Split('@');
            foreach (var item in imagePaths)
            {
                ProgramImage programImage = new ProgramImage
                {
                    ProgramId = newProgramID,
                    ProgramImagePath = item
                };
                await _context.ProgramImages.AddAsync(programImage);
            }
            await _context.SaveChangesAsync();
            return Ok(new { message = "Create Successful~" });
        }

        [Authorize]
        [HttpPost("create-range")]
        public async Task<IActionResult> CreateRange(List<Models.Program> programs)
        {
            await _context.Programs.AddRangeAsync(programs);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Create Successful~" });
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<ActionResult> Update(ProgramDTO programDTO)
        {
            if (programDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            var principal = _principal.GetPrincipal(programDTO.AccessToken, _configuration["JWT:SecretKey"]);
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
            if (programDTO.ProgramTdate < DateTime.Now)
            {
                return BadRequest(new { message = "Invalid DateTime" });
            }
            var program = await _context.Programs.FindAsync(programDTO.ProgramId);
            if (program == null)
            {
                return NotFound(new { message = "Resource Not Found!!!" });
            }
            program.ProgramContent = programDTO.ProgramContent;
            program.ProgramFdate = programDTO.ProgramFdate;
            program.ProgramTdate = programDTO.ProgramTdate;
            program.ProgramName = programDTO.ProgramName;
            program.ProgramPrice = programDTO.ProgramPrice;
            program.ProgramTime = programDTO.ProgramTime;
            program.TypeInOff = programDTO.TypeInOff;
            program.TotalTicket = programDTO.TotalTicket;
            program.LocationId = programDTO.LocationId;
            program.ProgramType = programDTO.ProgramType;
            _context.Programs.Update(program);
            var programImages = await _context.ProgramImages.Where(s => s.ProgramId  == program.ProgramId).ToListAsync();
            if (programImages != null)
            {
                _context.RemoveRange(programImages);
            }
            string imagePath = programDTO.ImagePaths;
            string[] imagePaths = imagePath.Split('@');
            foreach (var item in imagePaths)
            {
                ProgramImage programImage = new ProgramImage
                {
                    ProgramId = program.ProgramId,
                    ProgramImagePath = item
                };
                await _context.ProgramImages.AddAsync(programImage);
            }
            await _context.SaveChangesAsync();
            return Ok(new { message = "Update Successful~" });
        }*/
    }
}
