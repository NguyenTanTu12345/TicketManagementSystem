using System;
using System.Collections.Generic;

#nullable disable

namespace TicketManagementSystem.Models
{
    public partial class Location
    {
        public Location()
        {
            Programs = new HashSet<Program>();
            UserLikeLocations = new HashSet<UserLikeLocation>();
        }

        public string LocationId { get; set; }
        public string LocationName { get; set; }
        public string LocationSummary { get; set; }
        public string LocationContent { get; set; }
        public string LocationImagePath { get; set; }
        public string LocationTypeId { get; set; }

        public virtual LocationType LocationType { get; set; }
        public virtual ICollection<Program> Programs { get; set; }
        public virtual ICollection<UserLikeLocation> UserLikeLocations { get; set; }
    }
}
