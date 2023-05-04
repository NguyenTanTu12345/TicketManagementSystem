using System;
using System.Collections.Generic;

#nullable disable

namespace TicketManagementSystem.Models
{
    public partial class SupportMenu
    {
        public string SupportMenuId { get; set; }
        public string SupportMenuTitle { get; set; }
        public string SupportMenuContent { get; set; }
        public string UserId { get; set; }

        public virtual User User { get; set; }
    }
}
