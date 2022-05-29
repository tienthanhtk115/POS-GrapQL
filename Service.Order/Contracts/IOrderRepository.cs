using Service.Order.Entities;


namespace Service.Order.Contracts
{
    public interface IOrderRepository
    {
        IEnumerable<OrderEntity> OrderGetList();
        IEnumerable<OrderEntity> OrderGetById(int id);
        OrderEntity OrderCreate(OrderEntity order);
        OrderEntity OrderModify(OrderEntity order);

        IEnumerable<OrderBankAccountEntity> OrderBankAccountGetList();
    }
}
