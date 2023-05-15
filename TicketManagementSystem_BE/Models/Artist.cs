using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class Artist
    {
        public Artist()
        {
            Shows = new HashSet<Show>();
        }

        public string ArtistId { get; set; } = null!;
        public string ArtistName { get; set; } = null!;

        public virtual ICollection<Show> Shows { get; set; }
    }
}
