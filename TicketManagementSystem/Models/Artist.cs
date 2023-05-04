using System;
using System.Collections.Generic;

#nullable disable

namespace TicketManagementSystem.Models
{
    public partial class Artist
    {
        public Artist()
        {
            Shows = new HashSet<Show>();
        }

        public string ArtistId { get; set; }
        public string ArtistName { get; set; }

        public virtual ICollection<Show> Shows { get; set; }
    }
}
