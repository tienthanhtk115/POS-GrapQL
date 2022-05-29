namespace Service.User.Model
{
    public class UserModel
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public byte Type { get; set; }
        public string Permission { get; set; }
        public int Status { get; set; }
    }
}
