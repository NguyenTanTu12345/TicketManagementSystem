namespace TicketManagementSystem_BE.DTO
{
    public class HistoryDTO
    {
        public string FullName { get; set; } = null!;
        public DateTime HistoryTime { get; set; }
        public double ProgramPrice { get; set; } 
        public Boolean HistoryStatus { get; set; }
    }
}
