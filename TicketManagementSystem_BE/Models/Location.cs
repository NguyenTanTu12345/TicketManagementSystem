using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class Location
    {
        public Location()
        {
            Programs = new HashSet<Program>();
            Users = new HashSet<User>();
        }

        public string LocationId { get; set; } = null!;
        public string LocationName { get; set; } = null!;
        public string LocationSummary { get; set; } = null!;
        public string LocationContent { get; set; } = null!;
        public string? LocationImagePath { get; set; }
        public string? LocationTypeId { get; set; }

        public virtual LocationType? LocationType { get; set; }
        public virtual ICollection<Program> Programs { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
