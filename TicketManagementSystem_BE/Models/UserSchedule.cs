using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class UserSchedule
    {
        public string ProgramId { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public string UserScheduleTime { get; set; } = null!;
        public DateTime UserScheduleDate { get; set; }

        public virtual Program Program { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
