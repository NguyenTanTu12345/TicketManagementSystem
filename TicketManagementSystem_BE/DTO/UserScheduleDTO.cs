using TicketManagementSystem_BE.Models;

namespace TicketManagementSystem_BE.DTO
{
    public class UserScheduleDTO
    {
        public string ProgramId { get; set; } = null!;
        public string ProgramName { get; set; } = null!;
        public string UserId { get; set;} = null!;
        public string FullName { get; set; } = null!;
        public string UserScheduleTime { get; set; } = null!;
        public DateTime UserScheduleDate { get; set; }
        public List<ListProgramDTO> ListProgram1 { get; set; } = null!;
       // public List<Models.Program> ListProgram2 { get; set; } = null!;
        public string AccessToken { get; set; } = null!;
    }
}
