using System;
using System.Collections.Generic;

#nullable disable

namespace TicketManagementSystem.Models
{
    public partial class LocationType
    {
        public LocationType()
        {
            Locations = new HashSet<Location>();
        }

        public string LocationTypeId { get; set; }
        public string LocationTypeName { get; set; }
        public string LocationTypePath { get; set; }

        public virtual ICollection<Location> Locations { get; set; }
    }
}
