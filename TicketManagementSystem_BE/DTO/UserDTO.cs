namespace TicketManagementSystem_BE.DTO
{
    public class UserDTO
    {
        public string UserId { get; set; } = null!;
        public string UserPassword { get; set; } = null!;
        public string Mail { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public bool UserState { get; set; }
        public string Cccd { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public DateTime DateOfBirth { get; set; }
        public string RoleId { get; set; } = null!;

        public string AccessToken { get; set; } = null!;
    }
}
