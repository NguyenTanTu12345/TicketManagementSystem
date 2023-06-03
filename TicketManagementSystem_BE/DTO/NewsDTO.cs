namespace TicketManagementSystem_BE.DTO
{
    public class NewsDTO
    {
        public string NewsId { get; set; } = null!;
        public string NewsTitle { get; set; } = null!;
        public string NewsContent { get; set; } = null!;
        public string NewsImagePath { get; set; } = null!;
        public DateTime NewsDate { get; set; }
        public string AccessToken { get; set; } = null!;

    }
}
