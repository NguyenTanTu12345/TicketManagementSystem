using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using TicketManagementSystem_BE.Models;

namespace TicketManagementSystem_BE.Data
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

        public virtual DbSet<Artist> Artists { get; set; } = null!;
        public virtual DbSet<History> Histories { get; set; } = null!;
        public virtual DbSet<Location> Locations { get; set; } = null!;
        public virtual DbSet<LocationType> LocationTypes { get; set; } = null!;
        public virtual DbSet<News> News { get; set; } = null!;
        public virtual DbSet<Models.Program> Programs { get; set; } = null!;
        public virtual DbSet<ProgramImage> ProgramImages { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Show> Shows { get; set; } = null!;
        public virtual DbSet<SupportMenu> SupportMenus { get; set; } = null!;
        public virtual DbSet<TicketSchedule> TicketSchedules { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserProgram> UserPrograms { get; set; } = null!;
        public virtual DbSet<UserSchedule> UserSchedules { get; set; } = null!;
        public virtual DbSet<UserToken> UserTokens { get; set; } = null!;

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
            modelBuilder.Entity<Artist>(entity =>
            {
                entity.ToTable("Artist");

                entity.Property(e => e.ArtistId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ArtistID")
                    .IsFixedLength();

                entity.Property(e => e.ArtistImagePath)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ArtistName).HasMaxLength(35);
            });

            modelBuilder.Entity<History>(entity =>
            {
                entity.ToTable("History");

                entity.Property(e => e.HistoryId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("HistoryID")
                    .IsFixedLength();

                entity.Property(e => e.HistoryTime)
                    .HasMaxLength(5)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.TicketScheduleId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("TicketScheduleID")
                    .IsFixedLength();

                entity.Property(e => e.UserId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("UserID")
                    .IsFixedLength();

                entity.HasOne(d => d.TicketSchedule)
                    .WithMany(p => p.Histories)
                    .HasForeignKey(d => d.TicketScheduleId)
                    .HasConstraintName("FK__History__TicketS__52593CB8");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Histories)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__History__UserID__5165187F");
            });

            modelBuilder.Entity<Location>(entity =>
            {
                entity.Property(e => e.LocationId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("LocationID")
                    .IsFixedLength();

                entity.Property(e => e.LocationContent).HasMaxLength(1000);

                entity.Property(e => e.LocationImagePath)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LocationName).HasMaxLength(100);

                entity.Property(e => e.LocationSummary).HasMaxLength(400);

                entity.Property(e => e.LocationTypeId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("LocationTypeID")
                    .IsFixedLength();

                entity.HasOne(d => d.LocationType)
                    .WithMany(p => p.Locations)
                    .HasForeignKey(d => d.LocationTypeId)
                    .HasConstraintName("FK__Locations__Locat__33D4B598");
            });

            modelBuilder.Entity<LocationType>(entity =>
            {
                entity.ToTable("LocationType");

                entity.Property(e => e.LocationTypeId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("LocationTypeID")
                    .IsFixedLength();

                entity.Property(e => e.LocationTypeName).HasMaxLength(100);

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
                    .IsFixedLength();

                entity.Property(e => e.NewsContent).HasMaxLength(1000);

                entity.Property(e => e.NewsDate).HasColumnType("datetime");

                entity.Property(e => e.NewsImagePath)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.NewsTitle).HasMaxLength(100);

                entity.HasMany(d => d.Users)
                    .WithMany(p => p.News)
                    .UsingEntity<Dictionary<string, object>>(
                        "UserLikeNews",
                        l => l.HasOne<User>().WithMany().HasForeignKey("UserId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__UserLikeN__UserI__4316F928"),
                        r => r.HasOne<News>().WithMany().HasForeignKey("NewsId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__UserLikeN__NewsI__4222D4EF"),
                        j =>
                        {
                            j.HasKey("NewsId", "UserId").HasName("PK__UserLike__4436311998856D03");

                            j.ToTable("UserLikeNews");

                            j.IndexerProperty<string>("NewsId").HasMaxLength(10).IsUnicode(false).HasColumnName("NewsID").IsFixedLength();

                            j.IndexerProperty<string>("UserId").HasMaxLength(10).IsUnicode(false).HasColumnName("UserID").IsFixedLength();
                        });
            });

            modelBuilder.Entity<Models.Program>(entity =>
            {
                entity.ToTable("Program");

                entity.Property(e => e.ProgramId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ProgramID")
                    .IsFixedLength();

                entity.Property(e => e.LocationId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("LocationID")
                    .IsFixedLength();

                entity.Property(e => e.ProgramContent).HasMaxLength(1000);

                entity.Property(e => e.ProgramFdate)
                    .HasColumnType("datetime")
                    .HasColumnName("ProgramFDate");

                entity.Property(e => e.ProgramName).HasMaxLength(100);

                entity.Property(e => e.ProgramTdate)
                    .HasColumnType("datetime")
                    .HasColumnName("ProgramTDate");

                entity.Property(e => e.ProgramTime)
                    .HasMaxLength(5)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.HasOne(d => d.Location)
                    .WithMany(p => p.Programs)
                    .HasForeignKey(d => d.LocationId)
                    .HasConstraintName("FK__Program__Locatio__36B12243");
            });

            modelBuilder.Entity<ProgramImage>(entity =>
            {
                entity.ToTable("ProgramImage");

                entity.Property(e => e.ProgramImageId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ProgramImageID")
                    .IsFixedLength();

                entity.Property(e => e.ProgramId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ProgramID")
                    .IsFixedLength();

                entity.Property(e => e.ProgramImagePath)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Program)
                    .WithMany(p => p.ProgramImages)
                    .HasForeignKey(d => d.ProgramId)
                    .HasConstraintName("FK__ProgramIm__Progr__3C69FB99");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.RoleId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("RoleID")
                    .IsFixedLength();

                entity.Property(e => e.RoleName).HasMaxLength(30);
            });

            modelBuilder.Entity<Show>(entity =>
            {
                entity.HasKey(e => new { e.ProgramId, e.ArtistId })
                    .HasName("PK__Show__6772668F98FEA0DC");

                entity.ToTable("Show");

                entity.Property(e => e.ProgramId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ProgramID")
                    .IsFixedLength();

                entity.Property(e => e.ArtistId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ArtistID")
                    .IsFixedLength();

                entity.Property(e => e.RoleName).HasMaxLength(100);

                entity.HasOne(d => d.Artist)
                    .WithMany(p => p.Shows)
                    .HasForeignKey(d => d.ArtistId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Show__ArtistID__3F466844");

                entity.HasOne(d => d.Program)
                    .WithMany(p => p.Shows)
                    .HasForeignKey(d => d.ProgramId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Show__ProgramID__3E52440B");
            });

            modelBuilder.Entity<SupportMenu>(entity =>
            {
                entity.ToTable("SupportMenu");

                entity.Property(e => e.SupportMenuId).HasColumnName("SupportMenuID");

                entity.Property(e => e.SupportMenuContent).HasMaxLength(1000);

                entity.Property(e => e.SupportMenuTitle).HasMaxLength(50);

                entity.Property(e => e.UserId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("UserID")
                    .IsFixedLength();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.SupportMenus)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__SupportMe__UserI__398D8EEE");
            });

            modelBuilder.Entity<TicketSchedule>(entity =>
            {
                entity.ToTable("TicketSchedule");

                entity.Property(e => e.TicketScheduleId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("TicketScheduleID")
                    .IsFixedLength();

                entity.Property(e => e.LocationName).HasMaxLength(100);

                entity.Property(e => e.ProgramName).HasMaxLength(100);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.UserId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("UserID")
                    .IsFixedLength();

                entity.Property(e => e.Cccd)
                    .HasMaxLength(13)
                    .IsUnicode(false)
                    .HasColumnName("CCCD")
                    .IsFixedLength();

                entity.Property(e => e.DateOfBirth).HasColumnType("datetime");

                entity.Property(e => e.FullName).HasMaxLength(50);

                entity.Property(e => e.Mail)
                    .HasMaxLength(35)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.RoleId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("RoleID")
                    .IsFixedLength();

                entity.Property(e => e.UserPassword)
                    .HasMaxLength(75)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK__Users__RoleID__2E1BDC42");

                entity.HasMany(d => d.Locations)
                    .WithMany(p => p.Users)
                    .UsingEntity<Dictionary<string, object>>(
                        "UserLikeLocation",
                        l => l.HasOne<Location>().WithMany().HasForeignKey("LocationId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__UserLikeL__Locat__46E78A0C"),
                        r => r.HasOne<User>().WithMany().HasForeignKey("UserId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__UserLikeL__UserI__45F365D3"),
                        j =>
                        {
                            j.HasKey("UserId", "LocationId").HasName("PK__UserLike__79F726EBB1416DA1");

                            j.ToTable("UserLikeLocation");

                            j.IndexerProperty<string>("UserId").HasMaxLength(10).IsUnicode(false).HasColumnName("UserID").IsFixedLength();

                            j.IndexerProperty<string>("LocationId").HasMaxLength(10).IsUnicode(false).HasColumnName("LocationID").IsFixedLength();
                        });
            });

            modelBuilder.Entity<UserProgram>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.ProgramId })
                    .HasName("PK__UserProg__80DA9AAFE5E02C62");

                entity.ToTable("UserProgram");

                entity.Property(e => e.UserId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("UserID")
                    .IsFixedLength();

                entity.Property(e => e.ProgramId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ProgramID")
                    .IsFixedLength();

                entity.Property(e => e.AlarmTime)
                    .HasMaxLength(5)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.QrcodePath)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("QRCodePath");

                entity.Property(e => e.UserProgramType)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.HasOne(d => d.Program)
                    .WithMany(p => p.UserPrograms)
                    .HasForeignKey(d => d.ProgramId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserProgr__Progr__4AB81AF0");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserPrograms)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserProgr__UserI__49C3F6B7");
            });

            modelBuilder.Entity<UserSchedule>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.TicketScheduleId })
                    .HasName("PK__UserSche__8253A542B44A1F2E");

                entity.ToTable("UserSchedule");

                entity.Property(e => e.UserId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("UserID")
                    .IsFixedLength();

                entity.Property(e => e.TicketScheduleId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("TicketScheduleID")
                    .IsFixedLength();

                entity.Property(e => e.UserScheduleDate).HasColumnType("datetime");

                entity.Property(e => e.UserScheduleTime)
                    .HasMaxLength(13)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.HasOne(d => d.TicketSchedule)
                    .WithMany(p => p.UserSchedules)
                    .HasForeignKey(d => d.TicketScheduleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserSched__Ticke__4E88ABD4");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserSchedules)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserSched__UserI__4D94879B");
            });

            modelBuilder.Entity<UserToken>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK__UserToke__1788CCAC24C0A448");

                entity.ToTable("UserToken");

                entity.Property(e => e.UserId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("UserID")
                    .IsFixedLength();

                entity.Property(e => e.RefreshToken)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.RefreshTokenExpired).HasColumnType("datetime");

                entity.Property(e => e.ResetPasswordToken)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.ResetPasswordTokenExpired).HasColumnType("datetime");

                entity.HasOne(d => d.User)
                    .WithOne(p => p.UserToken)
                    .HasForeignKey<UserToken>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserToken__UserI__30F848ED");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
