using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Service.Order.Migrations
{
    public partial class OrderBankAccountTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BankAccountId",
                table: "Order",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CashType",
                table: "Order",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "OrderBankAccounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BankName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AccountName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderBankAccounts", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Order_BankAccountId",
                table: "Order",
                column: "BankAccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_OrderBankAccounts_BankAccountId",
                table: "Order",
                column: "BankAccountId",
                principalTable: "OrderBankAccounts",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_OrderBankAccounts_BankAccountId",
                table: "Order");

            migrationBuilder.DropTable(
                name: "OrderBankAccounts");

            migrationBuilder.DropIndex(
                name: "IX_Order_BankAccountId",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "BankAccountId",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "CashType",
                table: "Order");
        }
    }
}
