using Microsoft.EntityFrameworkCore;
using Service.Stock.Entities;

namespace Service.Stock.Database
{
    public class StockDbContext : DbContext
    {
        public StockDbContext(DbContextOptions<StockDbContext> options) : base(options) { }
        public DbSet<WarehouseEntity> Warehouse { get; set; }
        public DbSet<TransferEntity> Transfer { get; set; }
        public DbSet<TransferLineEntity> TransferLine { get; set; }
        public DbSet<StockQuantityEntity> StockQuantity { get; set; }
        public DbSet<StockMoveEntity> StockMove { get; set; }
        
    }
}
