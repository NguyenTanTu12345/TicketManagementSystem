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
            UserLikeLocations = new HashSet<UserLikeLocation>();
            UserLikeNews = new HashSet<UserLikeNews>();
            UserPrograms = new HashSet<UserProgram>();
            UserSchedules = new HashSet<UserSchedule>();
        }

        public string UserId { get; set; } = null!;
        public string UserPassword { get; set; } = null!;
        public string Mail { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public bool UserState { get; set; }
        public string? Cccd { get; set; }
        public string? FullName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? RoleId { get; set; }

        public virtual Role? Role { get; set; }
        public virtual UserToken? UserToken { get; set; }
        public virtual ICollection<History> Histories { get; set; }
        public virtual ICollection<SupportMenu> SupportMenus { get; set; }
        public virtual ICollection<UserLikeLocation> UserLikeLocations { get; set; }
        public virtual ICollection<UserLikeNews> UserLikeNews { get; set; }
        public virtual ICollection<UserProgram> UserPrograms { get; set; }
        public virtual ICollection<UserSchedule> UserSchedules { get; set; }
    }
}
