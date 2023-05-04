using System;
using System.Collections.Generic;

#nullable disable

namespace TicketManagementSystem.Models
{
    public partial class UserLikeLocation
    {
        public string UserId { get; set; }
        public string LocationId { get; set; }

        public virtual Location Location { get; set; }
        public virtual User User { get; set; }
    }
}
