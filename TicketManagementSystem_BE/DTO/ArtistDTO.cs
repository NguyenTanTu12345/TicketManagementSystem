namespace TicketManagementSystem_BE.DTO
{
    public class ArtistDTO
    {
        public string ArtistId { get; set; } = null!;
        public string ArtistName { get; set; } = null!;
        public string ArtistImagePath { get; set; } = null!;
        public  List<string> ProgramID { get; set; } = null!;
        public string AccessToken { get; set; } = null!;
    }
}
