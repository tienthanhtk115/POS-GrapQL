using System.ComponentModel.DataAnnotations;
namespace Service.PosConnect.Entities
{
    public class ProductEntity
    {
        [Key]
        public long Id { get; set; }
        public string Name { get; set; }
        public string Barcode { get; set; }
        public string? Image { get; set; }
        public int SalePrice { get; set; }
        public int CostPrice { get; set; }
        public string? Description { get; set; }
        public long ProductCategory { get; set; }
        public string? ProductCategory_Code { get; set; }
        public string? Unit_Code { set; get; }
        public string? Packing_Code { set; get; }
        public long UnitId { get; set; }
        public string Status { get; set; } 
    }
}
