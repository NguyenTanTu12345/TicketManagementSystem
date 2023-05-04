using System;
using System.Collections.Generic;

#nullable disable

namespace TicketManagementSystem.Models
{
    public partial class TicketSchedule
    {
        public TicketSchedule()
        {
            Histories = new HashSet<History>();
            UserSchedules = new HashSet<UserSchedule>();
        }

        public string TicketScheduleId { get; set; }
        public string ProgramName { get; set; }
        public string LocationName { get; set; }

        public virtual ICollection<History> Histories { get; set; }
        public virtual ICollection<UserSchedule> UserSchedules { get; set; }
    }
}
