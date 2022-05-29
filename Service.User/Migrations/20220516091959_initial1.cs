using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Service.User.Migrations
{
    public partial class initial1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "User",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "dateAdded",
                table: "User",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "dateUpdated",
                table: "User",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "userAdded",
                table: "User",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "userUpdated",
                table: "User",
                type: "bigint",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "User");

            migrationBuilder.DropColumn(
                name: "dateAdded",
                table: "User");

            migrationBuilder.DropColumn(
                name: "dateUpdated",
                table: "User");

            migrationBuilder.DropColumn(
                name: "userAdded",
                table: "User");

            migrationBuilder.DropColumn(
                name: "userUpdated",
                table: "User");
        }
    }
}
