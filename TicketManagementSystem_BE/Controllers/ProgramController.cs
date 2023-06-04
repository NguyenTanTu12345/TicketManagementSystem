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
        private readonly TicketManagementSystemContext _context;
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

        [HttpGet("user-like/{id}")]
        public async Task<ActionResult<IEnumerable<ProgramDTO>>> GetUserLike(string id)
        {
            var userPrograms = await _context.UserPrograms.Where(s => s.UserId == id
                && s.IsLike == true).ToListAsync();
            if (userPrograms == null)
            {
                return NoContent();
            }
            List<ProgramDTO> programDTOs = new List<ProgramDTO>();
            foreach (var item in userPrograms)
            {
                var program = await _context.Programs.FindAsync(item.ProgramId);
                if (program != null)
                {
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
                    var listProgramImage = await _context.ProgramImages.FirstOrDefaultAsync(s => s.ProgramId.Trim() == id);
                    if (listProgramImage != null)
                    {
                        programDTO.ImagePaths += listProgramImage.ProgramImagePath;
                    }
                    programDTOs.Add(programDTO);
                }
            }
            return programDTOs;
        }

        [HttpGet("alarm/{id}")]
        public async Task<ActionResult<IEnumerable<UserProgramDTO>>> GetAlarm(string id)
        {
            var user = await _context.Users.FindAsync(id);
            var userPrograms = await _context.UserPrograms.Where(s => s.UserId == id
                && s.AlarmDate != null && s.AlarmTime != null).ToListAsync();
            if (userPrograms == null || user == null)
            {
                return NoContent();
            }
            List<UserProgramDTO> userProgramDTOs = new List<UserProgramDTO>();
            foreach (var item in userPrograms)
            {
                var program = await _context.Programs.FindAsync(item.ProgramId);
                if (program != null)
                {
                    UserProgramDTO userProgramDTO = new UserProgramDTO
                    {
                        UserProgramId = item.UserProgramId,
                        ProgramId = program.ProgramId,
                        ProgramName = program.ProgramName,
                        UserId = user.UserId,
                        FullName = user.FullName,
                        AlarmTime = item.AlarmTime,
                        AlarmDate = (DateTime)item.AlarmDate
                    };
                    userProgramDTOs.Add(userProgramDTO);
                }
            }
            return userProgramDTOs;
        }

        [HttpGet("get-by-date/{id}")]
        public async Task<ActionResult<IEnumerable<Models.Program>>> GetByProgramDate(int day)
        {
            int month = DateTime.Now.Month;
            int year = DateTime.Now.Year;
            var programs = await _context.Programs.Where(s => s.ProgramTdate.Year == year
                || s.ProgramTdate.Month == month || s.ProgramTdate.Day == day).ToListAsync();
            if (programs == null)
            {
                return NotFound(new { message = "Resource Not Found!!!" });
            }
            return programs;
        }

        [HttpGet("get-list-program")]
        public async Task<ActionResult<IEnumerable<ListProgramDTO>>> GetListProgram()
        {
            var programs = await _context.Programs.ToListAsync();
            if (programs == null)
            {
                return NotFound(new { message = "Resources Not Found!!!" });
            }
            List<ListProgramDTO> list = new List<ListProgramDTO>();
            foreach (var item in programs)
            {
                var program = await _context.Programs.FindAsync(item.ProgramId);
                if (program != null)
                {
                    ListProgramDTO listProgramDTO = new ListProgramDTO
                    {
                        ProgramId = program.ProgramId,
                        ProgramName = program.ProgramName,
                        TypeInOff = program.TypeInOff
                    };
                    var programImage = await _context.ProgramImages.FirstOrDefaultAsync(s => s.ProgramId == program.ProgramId);
                    if (programImage != null)
                    {
                        listProgramDTO.ProgramImagePath = programImage.ProgramImagePath;
                    }
                    list.Add(listProgramDTO);
                }
            }
            return list;
        }

        [HttpGet("program-date")]
        public async Task<ActionResult<IEnumerable<ProgramDateDTO>>> ProgramDate()
        {
            var programs = await _context.Programs.ToListAsync();
            if (programs == null) 
            {
                return NoContent();
            }
            int month = DateTime.Now.Month;
            int year = DateTime.Now.Year;
            int totalDay = DateTime.DaysInMonth(year, month);
            List<ProgramDateDTO> list = new List<ProgramDateDTO>(); 
            for (int i = 1; i <= totalDay; i++)
            {
                var programsInThisDay = await _context.Programs.Where(s => s.ProgramTdate.Month == month
                    && s.ProgramTdate.Day == i && s.ProgramTdate.Year == year).ToListAsync();
                if (programsInThisDay != null && programsInThisDay.Count > 0)
                {
                    ProgramDateDTO programDateDTO = new ProgramDateDTO
                    {
                        DateTime = new DateTime(year, month, i),
                        TotalProgram = programsInThisDay.Count
                    };
                    list.Add(programDateDTO);
                }
            }
            return list;
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
        [HttpPost("user-like")]
        public async Task<ActionResult> UserLike(ProgramDTO programDTO)
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
            var program = await _context.Programs.FirstOrDefaultAsync(s => s.ProgramId == programDTO.ProgramId);
            if (program == null)
            {
                return NotFound(new { meassage = "Program Not Found!!!" });
            }
            var userLikeProgram = await _context.UserPrograms.FirstOrDefaultAsync(s => s.ProgramId == programDTO.ProgramId 
                && s.UserId == user.UserId);
            if (userLikeProgram == null)
            {
                UserProgram userProgram = new UserProgram
                {
                    UserId = user.UserId,
                    ProgramId = program.ProgramId,
                    IsLike = true
                };
                await _context.UserPrograms.AddAsync(userProgram);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Like Successful~" });
            }
            else
            {
                userLikeProgram.IsLike = false;
                _context.UserPrograms.Update(userLikeProgram);
                await _context.SaveChangesAsync();
                return Ok(new { message = "DisLike Successful~" });
            }
        }

        [Authorize]
        [HttpPost("alarm")]
        public async Task<ActionResult> Alarm(ProgramDTO programDTO)
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
            var program = await _context.Programs.FirstOrDefaultAsync(s => s.ProgramId == programDTO.ProgramId);
            if (program == null)
            {
                return NotFound(new { meassage = "Program Not Found!!!" });
            }
            var userLikeProgram = await _context.UserPrograms.FirstOrDefaultAsync(s => s.ProgramId == programDTO.ProgramId
                && s.UserId == user.UserId);
            if (userLikeProgram == null)
            {
                UserProgram userProgram = new UserProgram
                {
                    UserId = user.UserId,
                    ProgramId = program.ProgramId,
                    AlarmDate = programDTO.ProgramTdate,
                    AlarmTime = programDTO.ProgramTime
                };
                await _context.UserPrograms.AddAsync(userProgram);
            }
            else
            {
                userLikeProgram.AlarmDate = programDTO.ProgramTdate;
                userLikeProgram.AlarmTime = programDTO.ProgramTime;
                _context.UserPrograms.Update(userLikeProgram);
            }
            await _context.SaveChangesAsync();
            return Ok(new { message = "Set Alarm Time Successful~" });
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
        }
    }
}
