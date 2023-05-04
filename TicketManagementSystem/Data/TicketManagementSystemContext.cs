using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using TicketManagementSystem.Models;

#nullable disable

namespace TicketManagementSystem.Data
{
    public partial class TicketManagementSystemContext : DbContext
    {
        public TicketManagementSystemContext()
        {
        }

        public TicketManagementSystemContext(DbContextOptions<TicketManagementSystemContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Artist> Artists { get; set; }
        public virtual DbSet<History> Histories { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<LocationType> LocationTypes { get; set; }
        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<Program> Programs { get; set; }
        public virtual DbSet<ProgramImage> ProgramImages { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Show> Shows { get; set; }
        public virtual DbSet<SupportMenu> SupportMenus { get; set; }
        public virtual DbSet<TicketSchedule> TicketSchedules { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserLikeLocation> UserLikeLocations { get; set; }
        public virtual DbSet<UserLikeNews> UserLikeNews { get; set; }
        public virtual DbSet<UserProgram> UserPrograms { get; set; }
        public virtual DbSet<UserSchedule> UserSchedules { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-RAH6IHC\\SQLEXPRESS;Initial Catalog=TicketManagementSystem;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Artist>(entity =>
            {
                entity.ToTable("Artist");

                entity.Property(e => e.ArtistId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ArtistID")
                    .IsFixedLength(true);

                entity.Property(e => e.ArtistName)
                    .IsRequired()
                    .HasMaxLength(35);
            });

            modelBuilder.Entity<History>(entity =>
            {
                entity.ToTable("History");

                entity.Property(e => e.HistoryId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("HistoryID")
                    .IsFixedLength(true);

                entity.Property(e => e.HistoryTime)
                    .IsRequired()
                    .HasMaxLength(5)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.TicketScheduleId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("TicketScheduleID")
                    .IsFixedLength(true);

                entity.Property(e => e.UserId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("UserID")
                    .IsFixedLength(true);

                entity.HasOne(d => d.TicketSchedule)
                    .WithMany(p => p.Histories)
                    .HasForeignKey(d => d.TicketScheduleId)
                    .HasConstraintName("FK__History__TicketS__6EF57B66");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Histories)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__History__UserID__6E01572D");
            });

            modelBuilder.Entity<Location>(entity =>
            {
                entity.Property(e => e.LocationId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("LocationID")
                    .IsFixedLength(true);

                entity.Property(e => e.LocationContent)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(e => e.LocationImagePath)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LocationName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.LocationSummary)
                    .IsRequired()
                    .HasMaxLength(400);

                entity.Property(e => e.LocationTypeId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("LocationTypeID")
                    .IsFixedLength(true);

                entity.HasOne(d => d.LocationType)
                    .WithMany(p => p.Locations)
                    .HasForeignKey(d => d.LocationTypeId)
                    .HasConstraintName("FK__Locations__Locat__4AB81AF0");
            });

            modelBuilder.Entity<LocationType>(entity =>
            {
                entity.ToTable("LocationType");

                entity.Property(e => e.LocationTypeId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("LocationTypeID")
                    .IsFixedLength(true);

                entity.Property(e => e.LocationTypeName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.LocationTypePath)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<News>(entity =>
            {
                entity.Property(e => e.NewsId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("NewsID")
                    .IsFixedLength(true);

                entity.Property(e => e.NewsContent)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(e => e.NewsDate).HasColumnType("datetime");

                entity.Property(e => e.NewsImagePath)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.NewsTitle)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<TicketManagementSystem.Models.Program>(entity =>
            {
                entity.ToTable("Program");

                entity.Property(e => e.ProgramId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ProgramID")
                    .IsFixedLength(true);

                entity.Property(e => e.LocationId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("LocationID")
                    .IsFixedLength(true);

                entity.Property(e => e.ProgramContent)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(e => e.ProgramFdate)
                    .HasColumnType("datetime")
                    .HasColumnName("ProgramFDate");

                entity.Property(e => e.ProgramName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.ProgramTdate)
                    .HasColumnType("datetime")
                    .HasColumnName("ProgramTDate");

                entity.Property(e => e.ProgramTime)
                    .IsRequired()
                    .HasMaxLength(5)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.HasOne(d => d.Location)
                    .WithMany(p => p.Programs)
                    .HasForeignKey(d => d.LocationId)
                    .HasConstraintName("FK__Program__Locatio__4D94879B");
            });

            modelBuilder.Entity<ProgramImage>(entity =>
            {
                entity.ToTable("ProgramImage");

                entity.Property(e => e.ProgramImageId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ProgramImageID")
                    .IsFixedLength(true);

                entity.Property(e => e.ProgramId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ProgramID")
                    .IsFixedLength(true);

                entity.Property(e => e.ProgramImagePath)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Program)
                    .WithMany(p => p.ProgramImages)
                    .HasForeignKey(d => d.ProgramId)
                    .HasConstraintName("FK__ProgramIm__Progr__534D60F1");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.RoleId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("RoleID")
                    .IsFixedLength(true);

                entity.Property(e => e.RoleName)
                    .IsRequired()
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<Show>(entity =>
            {
                entity.HasKey(e => new { e.ProgramId, e.ArtistId })
                    .HasName("PK__Show__6772668FC833955D");

                entity.ToTable("Show");

                entity.Property(e => e.ProgramId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ProgramID")
                    .IsFixedLength(true);

                entity.Property(e => e.ArtistId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ArtistID")
                    .IsFixedLength(true);

                entity.Property(e => e.RoleName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.Artist)
                    .WithMany(p => p.Shows)
                    .HasForeignKey(d => d.ArtistId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Show__ArtistID__59063A47");

                entity.HasOne(d => d.Program)
                    .WithMany(p => p.Shows)
                    .HasForeignKey(d => d.ProgramId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Show__ProgramID__5812160E");
            });

            modelBuilder.Entity<SupportMenu>(entity =>
            {
                entity.ToTable("SupportMenu");

                entity.Property(e => e.SupportMenuId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("SupportMenuID")
                    .IsFixedLength(true);

                entity.Property(e => e.SupportMenuContent)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(e => e.SupportMenuTitle)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.UserId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("UserID")
                    .IsFixedLength(true);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.SupportMenus)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__SupportMe__UserI__5070F446");
            });

            modelBuilder.Entity<TicketSchedule>(entity =>
            {
                entity.ToTable("TicketSchedule");

                entity.Property(e => e.TicketScheduleId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("TicketScheduleID")
                    .IsFixedLength(true);

                entity.Property(e => e.LocationName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.ProgramName)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.UserId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("UserID")
                    .IsFixedLength(true);

                entity.Property(e => e.Mail)
                    .HasMaxLength(35)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.RoleId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("RoleID")
                    .IsFixedLength(true);

                entity.Property(e => e.UserPassword)
                    .IsRequired()
                    .HasMaxLength(12)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK__Users__RoleID__47DBAE45");
            });

            modelBuilder.Entity<UserLikeLocation>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LocationId })
                    .HasName("PK__UserLike__79F726EBDD5243EE");

                entity.ToTable("UserLikeLocation");

                entity.Property(e => e.UserId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("UserID")
                    .IsFixedLength(true);

                entity.Property(e => e.LocationId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("LocationID")
                    .IsFixedLength(true);

                entity.HasOne(d => d.Location)
                    .WithMany(p => p.UserLikeLocations)
                    .HasForeignKey(d => d.LocationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserLikeL__Locat__60A75C0F");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserLikeLocations)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserLikeL__UserI__5FB337D6");
            });

            modelBuilder.Entity<UserLikeNews>(entity =>
            {
                entity.HasKey(e => new { e.NewsId, e.UserId })
                    .HasName("PK__UserLike__44363119AE3FBA20");

                entity.Property(e => e.NewsId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("NewsID")
                    .IsFixedLength(true);

                entity.Property(e => e.UserId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("UserID")
                    .IsFixedLength(true);

                entity.HasOne(d => d.News)
                    .WithMany(p => p.UserLikeNews)
                    .HasForeignKey(d => d.NewsId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserLikeN__NewsI__5BE2A6F2");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserLikeNews)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserLikeN__UserI__5CD6CB2B");
            });

            modelBuilder.Entity<UserProgram>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.ProgramId })
                    .HasName("PK__UserProg__80DA9AAFD44DC5DB");

                entity.ToTable("UserProgram");

                entity.Property(e => e.UserId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("UserID")
                    .IsFixedLength(true);

                entity.Property(e => e.ProgramId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ProgramID")
                    .IsFixedLength(true);

                entity.Property(e => e.AlarmTime)
                    .HasMaxLength(5)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.QrcodePath)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("QRCodePath");

                entity.Property(e => e.UserProgramType)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.HasOne(d => d.Program)
                    .WithMany(p => p.UserPrograms)
                    .HasForeignKey(d => d.ProgramId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserProgr__Progr__6477ECF3");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserPrograms)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserProgr__UserI__6383C8BA");
            });

            modelBuilder.Entity<UserSchedule>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.TicketScheduleId })
                    .HasName("PK__UserSche__8253A5421B336717");

                entity.ToTable("UserSchedule");

                entity.Property(e => e.UserId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("UserID")
                    .IsFixedLength(true);

                entity.Property(e => e.TicketScheduleId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("TicketScheduleID")
                    .IsFixedLength(true);

                entity.Property(e => e.UserScheduleDate).HasColumnType("datetime");

                entity.Property(e => e.UserScheduleTime)
                    .IsRequired()
                    .HasMaxLength(13)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.HasOne(d => d.TicketSchedule)
                    .WithMany(p => p.UserSchedules)
                    .HasForeignKey(d => d.TicketScheduleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserSched__Ticke__68487DD7");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserSchedules)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserSched__UserI__6754599E");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
