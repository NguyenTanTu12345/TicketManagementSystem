using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class LocationType
    {
        public LocationType()
        {
            Locations = new HashSet<Location>();
        }

        public string LocationTypeId { get; set; } = null!;
        public string LocationTypeName { get; set; } = null!;
        public string? LocationTypePath { get; set; }

        public virtual ICollection<Location> Locations { get; set; }
    }
}
