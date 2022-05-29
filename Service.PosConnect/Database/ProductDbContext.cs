using Microsoft.EntityFrameworkCore;
using Service.PosConnect.Entities;

namespace Service.PosConnect.Database
{
    public class ProductDbContext : DbContext
    {
        public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options) { }
        public DbSet<ProductEntity> Product { get; set; }
        public DbSet<ProductCategoryEntity> ProductCategory { get; set; }
        public DbSet<PackingCategoryEntity> PackingCategory { get; set; }
        public DbSet<ProductUnitEntity> Units { get; set; }
        
    }
}
