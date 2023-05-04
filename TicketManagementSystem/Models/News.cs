using System;
using System.Collections.Generic;

#nullable disable

namespace TicketManagementSystem.Models
{
    public partial class News
    {
        public News()
        {
            UserLikeNews = new HashSet<UserLikeNews>();
        }

        public string NewsId { get; set; }
        public string NewsTitle { get; set; }
        public string NewsContent { get; set; }
        public string NewsImagePath { get; set; }
        public DateTime NewsDate { get; set; }

        public virtual ICollection<UserLikeNews> UserLikeNews { get; set; }
    }
}
