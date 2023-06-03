using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class UserLikeNews
    {
        public int UserLikeNewsId { get; set; }
        public string NewsId { get; set; } = null!;
        public string UserId { get; set; } = null!;

        public virtual News News { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
