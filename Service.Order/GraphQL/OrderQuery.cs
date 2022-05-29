using Service.Order.Contracts;
using Service.Order.Entities;

namespace Service.Order.GraphQL
{
    public class OrderQuery
    {
        [UsePaging] 
        public IEnumerable<OrderEntity> OrderGetList([Service] IOrderRepository repository) => repository.OrderGetList();
        public IEnumerable<OrderBankAccountEntity> OrderBankAccountGetList([Service] IOrderRepository repository) => repository.OrderBankAccountGetList();
    }
}
