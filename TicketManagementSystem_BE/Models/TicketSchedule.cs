using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class TicketSchedule
    {
        public TicketSchedule()
        {
            Histories = new HashSet<History>();
            UserSchedules = new HashSet<UserSchedule>();
        }

        public string TicketScheduleId { get; set; } = null!;
        public string ProgramName { get; set; } = null!;
        public string LocationName { get; set; } = null!;

        public virtual ICollection<History> Histories { get; set; }
        public virtual ICollection<UserSchedule> UserSchedules { get; set; }
    }
}
