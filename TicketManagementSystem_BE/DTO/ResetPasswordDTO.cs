namespace TicketManagementSystem_BE.DTO
{
    public class ResetPasswordDTO
    {
        public string? Mail { get; set; }
        public string? ResetPasswordToken { get; set; }

        public DateTime? TimeSend { get; set; }
    }
}
