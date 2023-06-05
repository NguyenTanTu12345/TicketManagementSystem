using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class UserProgram
    {
        public int UserProgramId { get; set; }
        public string UserId { get; set; } = null!;
        public string ProgramId { get; set; } = null!;
        public bool? IsLike { get; set; }
        public string? AlarmTime { get; set; }
        public DateTime? AlarmDate { get; set; }
        public string? QrcodePath { get; set; }
        public int? Quantity { get; set; }

        public virtual Program Program { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
