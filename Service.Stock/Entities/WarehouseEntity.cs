using System.ComponentModel.DataAnnotations;

namespace Service.Stock.Entities
{
    public class WarehouseEntity
    {
        [Key]
        public int? Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string? Address { get; set; }
        public string? Type { get; set; }
        public string Status { get; set; }
    }
}
