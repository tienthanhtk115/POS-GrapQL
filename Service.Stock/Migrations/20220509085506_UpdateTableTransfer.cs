using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Service.Stock.Migrations
{
    public partial class UpdateTableTransfer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ExpiryDate",
                table: "TransferLine",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LotNumber",
                table: "TransferLine",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumDayWarning",
                table: "TransferLine",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Position",
                table: "TransferLine",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExpiryDate",
                table: "TransferLine");

            migrationBuilder.DropColumn(
                name: "LotNumber",
                table: "TransferLine");

            migrationBuilder.DropColumn(
                name: "NumDayWarning",
                table: "TransferLine");

            migrationBuilder.DropColumn(
                name: "Position",
                table: "TransferLine");
        }
    }
}
