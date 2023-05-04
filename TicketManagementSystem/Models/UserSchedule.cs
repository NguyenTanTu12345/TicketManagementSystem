using System;
using System.Collections.Generic;

#nullable disable

namespace TicketManagementSystem.Models
{
    public partial class UserSchedule
    {
        public string TicketScheduleId { get; set; }
        public string UserId { get; set; }
        public string UserScheduleTime { get; set; }
        public DateTime UserScheduleDate { get; set; }

        public virtual TicketSchedule TicketSchedule { get; set; }
        public virtual User User { get; set; }
    }
}
