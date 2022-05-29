using System.ComponentModel.DataAnnotations;

namespace Service.Product.Entities
{
    public class ProductUnitEntity
    {
        [Key]
        public long Id { get; set; }
        public string? Code { get; set; }
        public string? Name { get; set; }
        public int Order { get; set; }
    }
}
