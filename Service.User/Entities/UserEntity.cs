using System.ComponentModel.DataAnnotations;

namespace Service.User.Entities
{
    public class UserEntity : IAuditableEntity
    {
        [Key]
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Email { get; set; }
        public string? token { set; get; }
        public string Password { get; set; }
        public string Permission { get; set; }
        public int Status { get; set; }
    }
}
