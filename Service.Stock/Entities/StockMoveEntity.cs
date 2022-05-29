
using System.ComponentModel.DataAnnotations;
using System;

namespace Service.Stock.Entities
{
    public class StockMoveEntity
    {
        [Key]
        public int? Id { get; set; }
        public int WarehouseSourceId { get; set; }
        public int WarehouseDestId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public int UserId { get; set; }
        public DateTime CreateDate { get; set; }
    }
}