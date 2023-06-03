using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class UserLikeLocation
    {
        public int UserLikeLocationId { get; set; }
        public string UserId { get; set; } = null!;
        public string LocationId { get; set; } = null!;

        public virtual Location Location { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
