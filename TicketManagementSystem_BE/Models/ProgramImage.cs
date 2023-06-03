using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class ProgramImage
    {
        public int ProgramImageId { get; set; }
        public string ProgramImagePath { get; set; } = null!;
        public string? ProgramId { get; set; }

        public virtual Program? Program { get; set; }
    }
}
