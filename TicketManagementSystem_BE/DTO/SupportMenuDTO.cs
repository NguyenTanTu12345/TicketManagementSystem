namespace TicketManagementSystem_BE.DTO
{
    public class SupportMenuDTO
    {
        public int SupportMenuId { get; set; }
        public string SupportMenuTitle { get; set; } = null!;
        public string SupportMenuContent { get; set; } = null!;
        public string AccessToken { get; set; } = null!;
    }
}
