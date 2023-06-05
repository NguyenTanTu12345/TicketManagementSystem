namespace TicketManagementSystem_BE.DTO
{
    public class UserProgramDTO
    {
        public int UserProgramId { get; set; }
        public string UserId { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string ProgramId { get; set; } = null!;
        public string ProgramName { get; set; } = null!;
        public bool IsLike { get; set; }
        public string AlarmTime { get; set; } = null!;
        public DateTime AlarmDate { get; set; }
        public string QrcodePath { get; set; } = null!;
        public string AccessToken { get; set;} = null!;
        public int Quantity { get; set; }
    }
}
