using Service.Stock.Entities;
using Service.Stock.Contracts;

namespace Service.Stock.GraphQL
{
    public class StockMutation
    {
        public WarehouseEntity warehouseCreate(
            [Service] IStockRepository repository,
            WarehouseEntity warehouseEntity
        )
        {
            return repository.warehouseCreate(warehouseEntity);
        }

         public WarehouseEntity warehouseModify(
            [Service] IStockRepository repository,
            WarehouseEntity warehouseEntity
        )
        {
            return repository.warehouseModify(warehouseEntity);
        }

         public TransferEntity transferCreate(
            [Service] IStockRepository repository,
            TransferEntity transferEntity
        )
        {
            return repository.transferCreate(transferEntity);
        }

        public StockQuantityEntity stockQuantityCreate(
            [Service] IStockRepository repository,
            StockQuantityEntity stockQuantityEntity
        )
        {
            return repository.stockQuantityCreate(stockQuantityEntity);
        }
    }
}
