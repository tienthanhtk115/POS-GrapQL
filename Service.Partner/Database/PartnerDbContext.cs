using Microsoft.EntityFrameworkCore;
using Service.Partner.Entities;

namespace Service.Partner.Database
{
    public class PartnerDbContext : DbContext
    {
        public PartnerDbContext(DbContextOptions<PartnerDbContext> options) : base(options) { }
        public DbSet<PartnerEntity> Partner { get; set; }
        public DbSet<CustomerEntity> Customer { get; set; }
    }
}
