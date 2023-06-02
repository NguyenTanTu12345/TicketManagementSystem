namespace TicketManagementSystem_BE.DTO
{
    public class ResetPasswordDTO
    {
        public string Mail { get; set; } = null!;
        public string ResetPasswordToken { get; set; } = null!;

        public DateTime TimeSend { get; set; } 
    }
}
