using System;
using System.Collections.Generic;

#nullable disable

namespace TicketManagementSystem.Models
{
    public partial class UserLikeNews
    {
        public string NewsId { get; set; }
        public string UserId { get; set; }

        public virtual News News { get; set; }
        public virtual User User { get; set; }
    }
}
