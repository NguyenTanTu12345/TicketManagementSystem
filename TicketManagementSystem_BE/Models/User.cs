using System;
using System.Collections.Generic;

namespace TicketManagementSystem_BE.Models
{
    public partial class User
    {
        public User()
        {
            Histories = new HashSet<History>();
            SupportMenus = new HashSet<SupportMenu>();
            UserPrograms = new HashSet<UserProgram>();
            UserSchedules = new HashSet<UserSchedule>();
            Locations = new HashSet<Location>();
            News = new HashSet<News>();
        }

        public string UserId { get; set; } = null!;
        public string UserPassword { get; set; } = null!;
        public string? Mail { get; set; }
        public string? PhoneNumber { get; set; }
        public bool UserState { get; set; }
        public string? RoleId { get; set; }

        public virtual Role? Role { get; set; }
        public virtual UserToken? UserToken { get; set; }
        public virtual ICollection<History> Histories { get; set; }
        public virtual ICollection<SupportMenu> SupportMenus { get; set; }
        public virtual ICollection<UserProgram> UserPrograms { get; set; }
        public virtual ICollection<UserSchedule> UserSchedules { get; set; }

        public virtual ICollection<Location> Locations { get; set; }
        public virtual ICollection<News> News { get; set; }
    }
}
