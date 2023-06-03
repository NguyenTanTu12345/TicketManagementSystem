using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class Program
    {
        public Program()
        {
            Histories = new HashSet<History>();
            ProgramImages = new HashSet<ProgramImage>();
            Shows = new HashSet<Show>();
            UserPrograms = new HashSet<UserProgram>();
            UserSchedules = new HashSet<UserSchedule>();
        }

        public string ProgramId { get; set; } = null!;
        public string ProgramName { get; set; } = null!;
        public string ProgramContent { get; set; } = null!;
        public string ProgramTime { get; set; } = null!;
        public DateTime ProgramTdate { get; set; }
        public DateTime? ProgramFdate { get; set; }
        public bool TypeInOff { get; set; }
        public double ProgramPrice { get; set; }
        public int TotalTicket { get; set; }
        public bool ProgramType { get; set; }
        public string? LocationId { get; set; }

        public virtual Location? Location { get; set; }
        public virtual ICollection<History> Histories { get; set; }
        public virtual ICollection<ProgramImage> ProgramImages { get; set; }
        public virtual ICollection<Show> Shows { get; set; }
        public virtual ICollection<UserProgram> UserPrograms { get; set; }
        public virtual ICollection<UserSchedule> UserSchedules { get; set; }
    }
}
