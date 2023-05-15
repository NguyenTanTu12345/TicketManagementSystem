using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class SupportMenu
    {
        public string SupportMenuId { get; set; } = null!;
        public string SupportMenuTitle { get; set; } = null!;
        public string SupportMenuContent { get; set; } = null!;
        public string? UserId { get; set; }

        public virtual User? User { get; set; }
    }
}
