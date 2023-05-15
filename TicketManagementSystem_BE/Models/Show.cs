using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class Show
    {
        public string ProgramId { get; set; } = null!;
        public string ArtistId { get; set; } = null!;
        public string RoleName { get; set; } = null!;

        public virtual Artist Artist { get; set; } = null!;
        public virtual Program Program { get; set; } = null!;
    }
}
