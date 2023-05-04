using System;
using System.Collections.Generic;

#nullable disable

namespace TicketManagementSystem.Models
{
    public partial class ProgramImage
    {
        public string ProgramImageId { get; set; }
        public string ProgramImagePath { get; set; }
        public string ProgramId { get; set; }

        public virtual Program Program { get; set; }
    }
}
