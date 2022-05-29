using System.ComponentModel.DataAnnotations;

namespace Service.Order.Entities
{
    public class OrderLineEntity
    {
        [Key]
        public int? Id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }
    }
}
