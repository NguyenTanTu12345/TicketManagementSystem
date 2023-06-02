using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class UserToken
    {
        public string UserId { get; set; } = null!;
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpired { get; set; }
        public string? ResetPasswordToken { get; set; }
        public DateTime? ResetPasswordTokenExpired { get; set; }
        public byte? TotalInputWrongToken { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
