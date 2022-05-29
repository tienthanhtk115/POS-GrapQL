using Service.Stock.Contracts;
using Service.Stock.Entities;

namespace Service.Stock.GraphQL
{
    public class StockQuery
    {
        [UsePaging]
        public IEnumerable<WarehouseEntity> warehouseGetList([Service] IStockRepository repository) => repository.warehouseGetList();
        public WarehouseEntity warehouseGetById([Service] IStockRepository repository, int id) => repository.warehouseGetById(id);
        [UsePaging]
        public IEnumerable<TransferEntity> transferGetList([Service] IStockRepository repository) => repository.transferGetList();
        public TransferEntity transferGetById([Service] IStockRepository repository, int id) => repository.transferGetById(id);

        public StockQuantityEntity stockQuantityGetBy([Service] IStockRepository repository, int warehouseId, int productId) => repository.stockQuantityGetBy(warehouseId, productId);
    }
}
