using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class Artist
    {
        public Artist()
        {
            Programs = new HashSet<Program>();
        }

        public string ArtistId { get; set; } = null!;
        public string ArtistName { get; set; } = null!;
        public string? ArtistImagePath { get; set; }

        public virtual ICollection<Program> Programs { get; set; }
    }
}
