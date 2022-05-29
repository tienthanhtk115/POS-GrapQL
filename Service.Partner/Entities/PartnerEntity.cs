using System.ComponentModel.DataAnnotations;

namespace Service.Partner.Entities
{
    public class PartnerEntity
    {
        [Key]
        public int? Id { get; set; }

        [StringLength(200)]
        public string Name { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public bool IsCustomer { get; set; }
        public bool IsSupplier { get; set; }
        public string Status { get; set; }
    }
}
