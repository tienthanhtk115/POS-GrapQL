using Service.Stock.Entities;
using Service.Stock.Contracts;
using Service.Stock.Database;
using Microsoft.EntityFrameworkCore;

namespace Service.Stock.Repositories
{
    public class StockRepository : IStockRepository
    {
        private readonly StockDbContext _context;

        public StockRepository(StockDbContext context)
        {
            _context = context;
        }

        public IEnumerable<WarehouseEntity> warehouseGetList() => _context.Warehouse.ToList();
        public WarehouseEntity warehouseGetById(int id) => _context.Warehouse.SingleOrDefault(x => x.Id == id) ?? new WarehouseEntity();
        public WarehouseEntity warehouseCreate(WarehouseEntity warehouse)
        {
            _context.Warehouse.Add(warehouse);
            _context.SaveChanges();

            return warehouse;
        }
        public WarehouseEntity warehouseModify(WarehouseEntity warehouse)
        {
            _context.Warehouse.Update(warehouse);
            _context.SaveChanges();

            return warehouse;
        }
        public IEnumerable<TransferEntity> transferGetList() => _context.Transfer.Include(line => line.TransferLines).ToList();
        public TransferEntity transferGetById(int id) => _context.Transfer.SingleOrDefault(x => x.Id == id) ?? new TransferEntity();
        public TransferEntity transferCreate(TransferEntity transfer)
        {
            _context.Transfer.Add(transfer);
            _context.SaveChanges();
            stockQuantityCalculate(transfer);
            return transfer;
        }

        public StockQuantityEntity stockQuantityGetBy(int warehouseId, int productId)
        {
            var data = _context.StockQuantity.SingleOrDefault(
                x => x.WarehouseId == warehouseId && x.ProductId == productId
            );
            return data == null ? new StockQuantityEntity() : data;
        }

        public IEnumerable<StockQuantityEntity> stockQuantityGetList()
        {
            return _context.StockQuantity.ToList();
        }

        public StockQuantityEntity stockQuantityCreate(StockQuantityEntity stockQuantityEntity)
        {
            _context.StockQuantity.Add(stockQuantityEntity);
            _context.SaveChanges();
            return stockQuantityEntity;
        }

        public bool stockQuantityCalculate(TransferEntity transfer)
        {
            if (transfer.TransferLines == null)
            {
                return false;
            }
            var listStockMove = new List<StockMoveEntity>();
            bool isIn = transfer.Type.Equals("in", StringComparison.CurrentCulture);
            var warehouse = isIn ? transfer.WarehouseDestId : transfer.WarehouseSourceId;
            foreach (var product in transfer.TransferLines)
            {
                var stockQuantityIn = _context.StockQuantity.FirstOrDefault(e => e.ProductId == product.ProductId && e.WarehouseId == warehouse);
                if (stockQuantityIn != null)
                {
                    if (isIn)
                    {
                        stockQuantityIn.Quantity += product.Quantity;
                    }
                    else
                    {
                        stockQuantityIn.Quantity -= product.Quantity;
                    }
                }
                else
                {
                    _context.StockQuantity.Add(new StockQuantityEntity
                    {
                        ProductId = product.ProductId,
                        WarehouseId = warehouse == null ? 0 : warehouse.Value,
                        Quantity = product.Quantity
                    });
                }

                listStockMove.Add(new StockMoveEntity
                {
                    ProductId = product.ProductId,
                    UserId = 0,//todo
                    Quantity = product.Quantity,
                    WarehouseDestId = transfer.WarehouseDestId == null ? 0 : transfer.WarehouseDestId.Value,
                    WarehouseSourceId = transfer.WarehouseSourceId == null ? 0 : transfer.WarehouseSourceId.Value,
                    CreateDate = DateTime.Now
                });
            }
            _context.StockMove.AddRange(listStockMove);
            _context.SaveChanges();
            return true;
        }
    }
}
