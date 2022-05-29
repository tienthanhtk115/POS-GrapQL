using System.ComponentModel.DataAnnotations;

namespace Service.Order.Entities
{
    public class OrderEntity
    {
        [Key]
        public int? Id { get; set; }
        public int PartnerId { get; set; }
        public DateTime Date { get; set; }
        public string CashType { get; set; }
        public int? BankAccountId { get; set; }
        public OrderBankAccountEntity? BankAccount { get; set; }
        public int Total { get; set; }
        public int Status { get; set; }
        public string Note { get; set; }
        public List<OrderLineEntity>? OrderLines { get; set; } 
    }
}
