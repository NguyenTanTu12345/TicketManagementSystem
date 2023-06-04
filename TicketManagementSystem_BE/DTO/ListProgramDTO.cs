namespace TicketManagementSystem_BE.DTO
{
    public class ListProgramDTO
    {
        public string ProgramId { get; set; } = null!;
        public string ProgramName { get; set; } = null!;
        public string ProgramImagePath { get; set; } = null!;
        public Boolean TypeInOff { get; set; }
    }
}
