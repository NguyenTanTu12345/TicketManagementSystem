using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class News
    {
        public News()
        {
            Users = new HashSet<User>();
        }

        public string NewsId { get; set; } = null!;
        public string NewsTitle { get; set; } = null!;
        public string NewsContent { get; set; } = null!;
        public string? NewsImagePath { get; set; }
        public DateTime NewsDate { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
