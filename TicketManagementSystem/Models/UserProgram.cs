using System;
using System.Collections.Generic;

#nullable disable

namespace TicketManagementSystem.Models
{
    public partial class UserProgram
    {
        public string UserId { get; set; }
        public string ProgramId { get; set; }
        public string UserProgramType { get; set; }
        public string AlarmTime { get; set; }
        public string QrcodePath { get; set; }

        public virtual Program Program { get; set; }
        public virtual User User { get; set; }
    }
}
