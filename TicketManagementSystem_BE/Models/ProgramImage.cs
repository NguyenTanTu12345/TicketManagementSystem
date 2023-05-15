using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class ProgramImage
    {
        public string ProgramImageId { get; set; } = null!;
        public string ProgramImagePath { get; set; } = null!;
        public string? ProgramId { get; set; }

        public virtual Program? Program { get; set; }
    }
}
