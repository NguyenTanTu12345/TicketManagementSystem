using System;
using System.Collections.Generic;

#nullable disable

namespace TicketManagementSystem.Models
{
    public partial class History
    {
        public string HistoryId { get; set; }
        public string HistoryTime { get; set; }
        public bool HistoryStatus { get; set; }
        public string UserId { get; set; }
        public string TicketScheduleId { get; set; }

        public virtual TicketSchedule TicketSchedule { get; set; }
        public virtual User User { get; set; }
    }
}
