using System;
using System.Collections.Generic;

#nullable disable

namespace TicketManagementSystem.Models
{
    public partial class Show
    {
        public string ProgramId { get; set; }
        public string ArtistId { get; set; }
        public string RoleName { get; set; }

        public virtual Artist Artist { get; set; }
        public virtual Program Program { get; set; }
    }
}
