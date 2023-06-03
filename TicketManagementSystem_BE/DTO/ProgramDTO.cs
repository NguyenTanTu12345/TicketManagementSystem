namespace TicketManagementSystem_BE.DTO
{
    public class ProgramDTO
    {
        public string ProgramId { get; set; } = null!;
        public string ProgramName { get; set; } = null!;
        public string ProgramContent { get; set; } = null!;
        public string ProgramTime { get; set; } = null!;
        public DateTime ProgramTdate { get; set; }
        public DateTime ProgramFdate { get; set; }
        public bool TypeInOff { get; set; }
        public double ProgramPrice { get; set; }
        public int TotalTicket { get; set; }
        public bool ProgramType { get; set; }
        public string LocationId { get; set; } = null!;
        public string ImagePaths { get; set; } = null!;
        public string AccessToken { get; set; } = null!;
    }
}
