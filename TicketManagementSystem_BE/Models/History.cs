using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class History
    {
        public string HistoryId { get; set; } = null!;
        public string HistoryTime { get; set; } = null!;
        public bool HistoryStatus { get; set; }
        public string? UserId { get; set; }
        public string? TicketScheduleId { get; set; }

        public virtual TicketSchedule? TicketSchedule { get; set; }
        public virtual User? User { get; set; }
    }
}
