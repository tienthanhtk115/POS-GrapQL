namespace Service.Product.Models
{
    public class ProductScaleModel
    {
        public string Name { get; set; }
        public string Barcode { get; set; }
        public int SalePrice { get; set; }        
        public string? Description { get; set; }
        public string ProductCategory { get; set; }
        public string UnitName { get; set; }
    }
}