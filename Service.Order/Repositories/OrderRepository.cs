using Service.Order.Entities;
using Service.Order.Contracts;
using Service.Order.Database;
using Microsoft.EntityFrameworkCore;

namespace Service.Order.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly OrderDbContext _context;

        public OrderRepository(OrderDbContext context)
        {
            _context = context;
        }

        public IEnumerable<OrderEntity> OrderGetList()
        {
            var orders = _context.Order.Include(e => e.OrderLines);
            var query = from a in orders
                        join b in _context.OrderBankAccounts on a.BankAccountId equals b.Id into ob
                        from c in ob.DefaultIfEmpty()
                        select new OrderEntity
                        {
                            BankAccount = c ?? new OrderBankAccountEntity()
                            {
                                Id = 0,
                                AccountName = string.Empty,
                                AccountNumber = string.Empty,
                                BankName = string.Empty
                            },
                            BankAccountId = c.Id,
                            CashType = a.CashType,
                            Date = a.Date,
                            Id = a.Id,
                            OrderLines = a.OrderLines,
                            PartnerId = a.PartnerId,
                            Status = a.Status,
                            Total = a.Total
                        };
            return query.ToList();
        }
        public IEnumerable<OrderEntity> OrderGetById(int id) => _context.Order.Where(x => x.Id == id).ToList();
        public OrderEntity OrderCreate(OrderEntity order)
        {
            order.Date = DateTime.Now;
            if (order.OrderLines != null)
            {
                _context.OrderLine.AddRange(order.OrderLines);
            }
            _context.Order.Add(order);
            _context.SaveChanges();

            return order;
        }
        public OrderEntity OrderModify(OrderEntity order)
        {
            _context.Order.Update(order);
            _context.SaveChanges();

            return order;
        }

        public IEnumerable<OrderBankAccountEntity> OrderBankAccountGetList() => _context.OrderBankAccounts.ToList();
    }
}
