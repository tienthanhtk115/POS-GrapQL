using Microsoft.EntityFrameworkCore;
using Service.User.Entities;
using Service.User.Model;

namespace Service.User.Database
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { }
        public DbSet<UserEntity> User { get; set; }
        //public DbSet<UserModel> UserModel { get; set; }

    }
}
