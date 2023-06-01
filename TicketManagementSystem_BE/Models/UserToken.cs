using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class UserToken
    {
        public string UserId { get; set; } = null!;
        public string RefreshToken { get; set; } = null!;
        public DateTime RefreshTokenExpiredTime { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
