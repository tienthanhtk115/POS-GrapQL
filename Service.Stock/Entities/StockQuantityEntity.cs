using System.ComponentModel.DataAnnotations;

namespace Service.Stock.Entities
{
    public class StockQuantityEntity
    {
        [Key]
        public int? Id { get; set; }
        public int WarehouseId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
