using System.ComponentModel.DataAnnotations;
namespace Service.Order.Entities
{
    public class OrderBankAccountEntity
    {
        [Key]
        public int Id { get; set; }
        public string AccountNumber { get; set; }
        public string BankName { get; set; }
        public string AccountName { get; set; }
    }
}
