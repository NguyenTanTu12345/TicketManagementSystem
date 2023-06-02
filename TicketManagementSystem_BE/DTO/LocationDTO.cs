namespace TicketManagementSystem_BE.DTO
{
    public class LocationDTO
    {
        public string LocationId { get; set; } = null!;
        public string LocationName { get; set; } = null!;
        public string LocationSummary { get; set; } = null!;
        public string LocationContent { get; set; } = null!;
        public string LocationImagePath { get; set; } = null!;
        public string LocationTypeId { get; set; } = null!;

        public string AccessToken { get; set; } = null!;
    }
}
