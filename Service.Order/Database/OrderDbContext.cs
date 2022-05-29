using Microsoft.EntityFrameworkCore;
using Service.Order.Entities;

namespace Service.Order.Database
{
    public class OrderDbContext : DbContext
    {
        public OrderDbContext(DbContextOptions<OrderDbContext> options) : base(options) { }
        public DbSet<OrderEntity> Order { get; set; }
        public DbSet<OrderLineEntity> OrderLine { get; set; }
        public DbSet<OrderBankAccountEntity> OrderBankAccounts { get; set; }
        
    }
}
