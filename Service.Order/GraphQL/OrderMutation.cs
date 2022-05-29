using Service.Order.Entities;
using Service.Order.Contracts;

namespace Service.Order.GraphQL
{
    public class OrderMutation
    {
        public OrderEntity OrderCreate(
            [Service] IOrderRepository repository,
            OrderEntity orderEntity
        )
        {
            return repository.OrderCreate(orderEntity);
        }

        public OrderEntity OrderModify(
            [Service] IOrderRepository repository,
            OrderEntity orderEntity
        )
        {
            return repository.OrderModify(orderEntity);
        }
    }
}
