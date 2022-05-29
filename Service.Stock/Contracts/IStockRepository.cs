using Service.Stock.Entities;


namespace Service.Stock.Contracts
{
    public interface IStockRepository
    {
        IEnumerable<WarehouseEntity> warehouseGetList();
        WarehouseEntity warehouseGetById(int id);
        WarehouseEntity warehouseCreate(WarehouseEntity warehouse);
        WarehouseEntity warehouseModify(WarehouseEntity warehouse);
        IEnumerable<TransferEntity> transferGetList();
        TransferEntity transferGetById(int id);
        TransferEntity transferCreate(TransferEntity transfer);

        StockQuantityEntity stockQuantityGetBy(int warehouseId, int productId);
        StockQuantityEntity stockQuantityCreate(StockQuantityEntity stockQuantityEntity);
      
    }
}
