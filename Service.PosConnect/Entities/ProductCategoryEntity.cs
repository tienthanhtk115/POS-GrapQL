using System.ComponentModel.DataAnnotations;
namespace Service.PosConnect.Entities
{
    public class ProductCategoryEntity
    {
        [Key]
        public long Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int order { set; get; }
        public int parent_id { get; set; }
        public string? Image { get; set; }
        public int Status { get; set; }
    }
}
