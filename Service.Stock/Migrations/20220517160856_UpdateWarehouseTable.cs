using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Service.Stock.Migrations
{
    public partial class UpdateWarehouseTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Warehouse",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Warehouse");
        }
    }
}
