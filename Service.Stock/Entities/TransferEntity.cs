using System.ComponentModel.DataAnnotations;

namespace Service.Stock.Entities
{
    public class TransferEntity
    {
        [Key]
        public int? Id { get; set; }
        public string Code { get; set; }
        public string? Reference { get; set; }
        public DateTime Date { get; set; }
        public int? PartnerId { get; set; }
        public int? WarehouseSourceId { get; set; }
        public int? WarehouseDestId { get; set; }
        public string Type { get; set; }
        public string? Note { get; set; }
        public string Status { get; set; }
        public List<TransferLineEntity>? TransferLines { get; set; }
    }

    public class TransferLineEntity
    {
        [Key]
        public int? Id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string? Position { get; set; }
        public string? LotNumber { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public int? NumDayWarning { get; set; }
    }
}
