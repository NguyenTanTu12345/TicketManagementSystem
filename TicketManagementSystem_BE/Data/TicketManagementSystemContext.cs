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
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserLikeLocation> UserLikeLocations { get; set; } = null!;
        public virtual DbSet<UserLikeNews> UserLikeNews { get; set; } = null!;
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
                    .HasMaxLength(150)
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

                entity.Property(e => e.ProgramId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ProgramID")
                    .IsFixedLength();

                entity.Property(e => e.UserId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("UserID")
                    .IsFixedLength();

                entity.HasOne(d => d.Program)
                    .WithMany(p => p.Histories)
                    .HasForeignKey(d => d.ProgramId)
                    .HasConstraintName("FK__History__Program__5070F446");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Histories)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__History__UserID__4F7CD00D");
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
                    .HasMaxLength(150)
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
                    .HasConstraintName("FK__Locations__Locat__31EC6D26");
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
                    .HasMaxLength(150)
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
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.NewsTitle).HasMaxLength(100);
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
                    .HasConstraintName("FK__Program__Locatio__34C8D9D1");
            });

            modelBuilder.Entity<ProgramImage>(entity =>
            {
                entity.ToTable("ProgramImage");

                entity.Property(e => e.ProgramImageId).HasColumnName("ProgramImageID");

                entity.Property(e => e.ProgramId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ProgramID")
                    .IsFixedLength();

                entity.Property(e => e.ProgramImagePath)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.Program)
                    .WithMany(p => p.ProgramImages)
                    .HasForeignKey(d => d.ProgramId)
                    .HasConstraintName("FK__ProgramIm__Progr__3A81B327");
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
                entity.ToTable("Show");

                entity.Property(e => e.ShowId).HasColumnName("ShowID");

                entity.Property(e => e.ArtistId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ArtistID")
                    .IsFixedLength();

                entity.Property(e => e.ProgramId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ProgramID")
                    .IsFixedLength();

                entity.HasOne(d => d.Artist)
                    .WithMany(p => p.Shows)
                    .HasForeignKey(d => d.ArtistId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Show__ArtistID__3D5E1FD2");

                entity.HasOne(d => d.Program)
                    .WithMany(p => p.Shows)
                    .HasForeignKey(d => d.ProgramId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Show__ProgramID__3C69FB99");
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
                    .HasConstraintName("FK__SupportMe__UserI__37A5467C");
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
                    .HasConstraintName("FK__Users__RoleID__2C3393D0");
            });

            modelBuilder.Entity<UserLikeLocation>(entity =>
            {
                entity.ToTable("UserLikeLocation");

                entity.Property(e => e.UserLikeLocationId).HasColumnName("UserLikeLocationID");

                entity.Property(e => e.LocationId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("LocationID")
                    .IsFixedLength();

                entity.Property(e => e.UserId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("UserID")
                    .IsFixedLength();

                entity.HasOne(d => d.Location)
                    .WithMany(p => p.UserLikeLocations)
                    .HasForeignKey(d => d.LocationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserLikeL__Locat__44FF419A");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserLikeLocations)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserLikeL__UserI__440B1D61");
            });

            modelBuilder.Entity<UserLikeNews>(entity =>
            {
                entity.Property(e => e.UserLikeNewsId).HasColumnName("UserLikeNewsID");

                entity.Property(e => e.NewsId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("NewsID")
                    .IsFixedLength();

                entity.Property(e => e.UserId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("UserID")
                    .IsFixedLength();

                entity.HasOne(d => d.News)
                    .WithMany(p => p.UserLikeNews)
                    .HasForeignKey(d => d.NewsId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserLikeN__NewsI__403A8C7D");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserLikeNews)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserLikeN__UserI__412EB0B6");
            });

            modelBuilder.Entity<UserProgram>(entity =>
            {
                entity.ToTable("UserProgram");

                entity.Property(e => e.UserProgramId).HasColumnName("UserProgramID");

                entity.Property(e => e.AlarmDate).HasColumnType("datetime");

                entity.Property(e => e.AlarmTime)
                    .HasMaxLength(5)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.IsLike).HasColumnName("isLike");

                entity.Property(e => e.ProgramId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ProgramID")
                    .IsFixedLength();

                entity.Property(e => e.QrcodePath)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("QRCodePath");

                entity.Property(e => e.UserId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("UserID")
                    .IsFixedLength();

                entity.HasOne(d => d.Program)
                    .WithMany(p => p.UserPrograms)
                    .HasForeignKey(d => d.ProgramId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserProgr__Progr__02FC7413");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserPrograms)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserProgr__UserI__02084FDA");
            });

            modelBuilder.Entity<UserSchedule>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.ProgramId })
                    .HasName("PK__UserSche__80DA9AAF973E988A");

                entity.ToTable("UserSchedule");

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

                entity.Property(e => e.UserScheduleDate).HasColumnType("datetime");

                entity.Property(e => e.UserScheduleTime)
                    .HasMaxLength(13)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.HasOne(d => d.Program)
                    .WithMany(p => p.UserSchedules)
                    .HasForeignKey(d => d.ProgramId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserSched__Progr__4CA06362");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserSchedules)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserSched__UserI__4BAC3F29");
            });

            modelBuilder.Entity<UserToken>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK__UserToke__1788CCAC2B395174");

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
                    .HasConstraintName("FK__UserToken__UserI__2F10007B");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
