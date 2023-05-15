using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class UserSchedule
    {
        public string TicketScheduleId { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public string UserScheduleTime { get; set; } = null!;
        public DateTime UserScheduleDate { get; set; }

        public virtual TicketSchedule TicketSchedule { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
