using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Service.Stock.Migrations
{
    public partial class StockQuantityTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Warehouse",
                table: "StockQuantity",
                newName: "WarehouseId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WarehouseId",
                table: "StockQuantity",
                newName: "Warehouse");
        }
    }
}
