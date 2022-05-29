using System.ComponentModel.DataAnnotations;

namespace Service.User.Entities
{
    public class IAuditableEntity
    {
        [Key]
        public int? Id { set; get; }
        public long? userAdded { set; get; }
        public long? userUpdated { set; get; }
        public DateTime? dateAdded { get; set; }
        public DateTime? dateUpdated { get; set; }
    }
}

