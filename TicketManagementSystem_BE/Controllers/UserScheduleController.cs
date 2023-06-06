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
    //[EnableCors("myOrigins")]
    [Route("api/user-schedule")]
    [ApiController]
    public class UserScheduleController : ControllerBase
    {
        private readonly TicketManagementSystemContext _context;
        private readonly INewID _newID;
        private readonly IPrincipal _principal;
        private readonly IConfiguration _configuration;

        public UserScheduleController(TicketManagementSystemContext context, INewID newID,
            IPrincipal principal, IConfiguration configuration)
        {
            _context = context;
            _newID = newID;
            _principal = principal;
            _configuration = configuration;
        }

        [Authorize]
        [HttpGet("get-all/{id}")]
        public async Task<ActionResult<UserScheduleDTO>> GetAll(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "User Not Found!!!" });
            }
            UserScheduleDTO userScheduleDTO = new UserScheduleDTO
            {
                UserId = user.UserId,
                FullName = user.FullName
            };
            List<Models.Program> programs1 = await _context.Programs.ToListAsync();
            var userSchedules = await _context.UserSchedules.Where(s => s.UserId == user.UserId).ToListAsync();
            if (userSchedules != null)
            {
                List<ListProgramDTO> programs2 = new List<ListProgramDTO>();
                int length = userSchedules.Count;
                for (int i = 0; i < length; i++)
                {
                    var program = await _context.Programs.FindAsync(userSchedules[i].ProgramId);
                    if (program != null)
                    {
                        ListProgramDTO listProgramDTO = new ListProgramDTO
                        {
                            ProgramId = program.ProgramId,
                            ProgramName = program.ProgramName
                        };
                        var programImagePath = await _context.ProgramImages.FirstOrDefaultAsync(s => s.ProgramId == program.ProgramId);
                        if (programImagePath != null)
                        {
                            listProgramDTO.ProgramImagePath = programImagePath.ProgramImagePath;
                        }
                        programs2.Add(listProgramDTO);
                        programs1.Remove(program);
                    }
                }
                userScheduleDTO.ListProgram1 = programs2;
            }
            userScheduleDTO.ListProgram2 = programs1;
            return userScheduleDTO;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserScheduleDTO>> Get(string id)
        {
            string[] userProgramId = id.Split('@');
            string userId = userProgramId[0];
            string programId = userProgramId[1];
            var userSchedule = await _context.UserSchedules.FirstOrDefaultAsync(s => s.UserId.Trim() == userId 
                && s.ProgramId == programId);
            if (userSchedule == null)
            {
                return NotFound(new { message = "Resource Not Found!!!" });
            }
            var user = await _context.Users.FirstOrDefaultAsync(s => s.UserId.Trim() == userId);
            if (user == null)
            {
                return NotFound(new { message = "User Not Found!!!" });
            }
            var program = await _context.Programs.FirstOrDefaultAsync(s => s.ProgramId.Trim() == programId);
            if (program == null)
            {
                return NotFound(new { message = "Program Not Found!!!" });
            }
            UserScheduleDTO userScheduleDTO = new UserScheduleDTO
            {
                UserId = user.UserId,
                FullName = user.FullName,
                ProgramId = program.ProgramId,
                ProgramName = program.ProgramName,
                UserScheduleDate = userSchedule.UserScheduleDate,
                UserScheduleTime = userSchedule.UserScheduleTime
            };
            return userScheduleDTO;
        }

        [HttpGet("get-schedule/{mail}")]
        public async Task<ActionResult<IEnumerable<UserScheduleDTO>>> GetSchedule(string mail)
        {
            var user = await _context.Users.FirstOrDefaultAsync(s => s.Mail.Trim() == mail);
            if (user == null)
            {
                return NotFound(new { message = "User Not Found!!!" });
            }
            var userSchedules = await _context.UserSchedules.Where(s => s.UserId.Trim() == user.UserId
                && s.UserScheduleDate.Year == DateTime.Now.Year && s.UserScheduleDate.Month == DateTime.Now.Month).ToListAsync();
            if (userSchedules == null)
            {
                return BadRequest();
            }
            List<UserScheduleDTO> userScheduleDTOs = new List<UserScheduleDTO>();
            foreach (var item in userSchedules)
            {
                var program = await _context.Programs.FirstOrDefaultAsync(s => s.ProgramId.Trim() == item.ProgramId);
                if (program != null)
                {
                    UserScheduleDTO userScheduleDTO = new UserScheduleDTO
                    {
                        UserId = user.UserId,
                        FullName = user.FullName,
                        ProgramId = program.ProgramId,
                        ProgramName = program.ProgramName,
                        UserScheduleDate = item.UserScheduleDate,
                        UserScheduleTime = item.UserScheduleTime
                    };
                    userScheduleDTOs.Add(userScheduleDTO);
                }
            }
            return userScheduleDTOs;
        }

        [HttpGet("ticket-scanner/{str}")]
        public async Task<ActionResult<UserScheduleDTO>> GetTicketScanner(string str)
        {
            string[] words = str.Split('@');
            var user = await _context.Users.FirstOrDefaultAsync(s => s.UserId.Trim() == words[1]);
            if (user == null)
            {
                return NotFound(new { message = "User Not Found!!!" });
            }
            var program = await _context.Programs.FirstOrDefaultAsync(s => s.ProgramId.Trim() == words[0]);
            if (program == null)
            {
                return NotFound(new { message = "Program Not Found!!!" });
            }
            var userSchedule = await _context.UserSchedules.FirstOrDefaultAsync(s => s.UserId == user.UserId
                && s.ProgramId == program.ProgramId);
            if (userSchedule == null)
            {
                return BadRequest();
            }
            UserScheduleDTO userScheduleDTO = new UserScheduleDTO
            {
                UserId = user.UserId,
                FullName = user.FullName,
                ProgramId = program.ProgramId,
                ProgramName = program.ProgramName,
                UserScheduleDate = userSchedule.UserScheduleDate,
                UserScheduleTime = userSchedule.UserScheduleTime
            };
            return userScheduleDTO;
        }

        [Authorize]
        [HttpPost("check-date")]
        public async Task<ActionResult> CheckDate(UserScheduleDTO userScheduleDTO)
        {
            if (userScheduleDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            var principal = _principal.GetPrincipal(userScheduleDTO.AccessToken, _configuration["JWT:SecretKey"]);
            var userMail = principal.FindFirst(ClaimTypes.Email)?.Value;
            var user = await _context.Users.FirstOrDefaultAsync(s => s.Mail.Trim() == userMail);
            if (user == null)
            {
                return NotFound(new { meassage = "User Not Found!!!" });
            }
            var program = await _context.Programs.FirstOrDefaultAsync(s => s.ProgramId == userScheduleDTO.ProgramId);
            if (program == null)
            {
                return NotFound(new { meassage = "Program Not Found!!!" });
            }
            var userSchedule = await _context.UserSchedules.Where(s => s.UserId == user.UserId 
                && s.ProgramId == program.ProgramId).FirstOrDefaultAsync();  
            if (userSchedule == null)
            {
                return NotFound(new { meassage = "Resource Not Found!!!" });
            }
            if (userSchedule.UserScheduleDate.Year == userScheduleDTO.UserScheduleDate.Year
                && userSchedule.UserScheduleDate.Month == userScheduleDTO.UserScheduleDate.Month
                && userSchedule.UserScheduleDate.Day == userScheduleDTO.UserScheduleDate.Day)
            {
                return Ok(new { message = "Verify Successful~" });
            }
            else
            {
                return BadRequest(new { message = "Not Right Time~" });
            }
        }

        [Authorize]
        [HttpPost("check-qrcode")]
        public async Task<ActionResult> CheckQRCode(UserScheduleDTO userScheduleDTO)
        {
            if (userScheduleDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            string[] words = userScheduleDTO.FullName.Split('@');
            var userProgram = await _context.UserPrograms.FirstOrDefaultAsync(s => s.UserId.Trim() == words[0]
                && s.ProgramId.Trim() == words[1] && s.ProgramId == userScheduleDTO.ProgramId
                && s.Quantity >= 1 && s.Quantity != null);
            List<string> listID = await _context.Histories.Select(s => s.HistoryId).ToListAsync();
            History history = new History
            {
                HistoryId = _newID.CreateHistoryID(listID),
                UserId = userScheduleDTO.UserId,
                ProgramId = userScheduleDTO.ProgramId,
                HistoryTime = DateTime.Now
            };
            if (userProgram == null)
            {
                history.HistoryStatus = false;
                await _context.Histories.AddAsync(history);
                await _context.SaveChangesAsync();
                return NotFound(new { meassage = "Ticket Not Found!!!" });
            }
            else
            {
                userProgram.Quantity -= 1;
                _context.UserPrograms.Update(userProgram);
                history.HistoryStatus = true;
                await _context.Histories.AddAsync(history);
                await _context.SaveChangesAsync();
                return Ok(new { meassage = "Verify Successful!!!" });
            }
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult> Create(UserScheduleDTO userScheduleDTO)
        {
            if (userScheduleDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            var principal = _principal.GetPrincipal(userScheduleDTO.AccessToken, _configuration["JWT:SecretKey"]);
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
            var user1 = await _context.Users.FirstOrDefaultAsync(s => s.UserId.Trim() == userScheduleDTO.UserId);
            if (user1 == null)
            {
                return NotFound(new { meassage = "User Not Found!!!" });
            }
            var program = await _context.Programs.FirstOrDefaultAsync(s => s.ProgramId.Trim() == userScheduleDTO.ProgramId);
            if (program == null)
            {
                return NotFound(new { meassage = "Program Not Found!!!" });
            }
            if (program.ProgramFdate < userScheduleDTO.UserScheduleDate)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            UserSchedule userSchedule = new UserSchedule
            {
                ProgramId = program.ProgramId,
                UserId = user1.UserId,
                UserScheduleDate = userScheduleDTO.UserScheduleDate,
                UserScheduleTime = userScheduleDTO.UserScheduleTime
            };
            await _context.UserSchedules.AddAsync(userSchedule);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Create Successful~" });
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<ActionResult> Update(UserScheduleDTO userScheduleDTO)
        {
            if (userScheduleDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            var principal = _principal.GetPrincipal(userScheduleDTO.AccessToken, _configuration["JWT:SecretKey"]);
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
            var program = await _context.Programs.FirstOrDefaultAsync(s => s.ProgramId.Trim() == userScheduleDTO.ProgramId);
            if (program == null)
            {
                return NotFound(new { meassage = "Program Not Found!!!" });
            }
            var userSchedule = await _context.UserSchedules.FirstOrDefaultAsync(s => s.UserId.Trim() == userScheduleDTO.UserId 
            && s.ProgramId.Trim() == userScheduleDTO.ProgramId);
            if (userSchedule == null)
            {
                return NotFound(new { meassage = "UserSchedule Not Found!!!" });
            }
            if (program.ProgramFdate < userScheduleDTO.UserScheduleDate)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            userSchedule.UserScheduleDate = userScheduleDTO.UserScheduleDate;
            userSchedule.UserScheduleTime = userScheduleDTO.UserScheduleTime;
            _context.UserSchedules.Update(userSchedule);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Create Successful~" });
        }
    }
}
