﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Service.Order.Database;

#nullable disable

namespace Service.Order.Migrations
{
    [DbContext(typeof(OrderDbContext))]
    [Migration("20220515163125_OrderBankAccountTable")]
    partial class OrderBankAccountTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Service.Order.Entities.OrderBankAccountEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("AccountName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AccountNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BankName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("OrderBankAccounts");
                });

            modelBuilder.Entity("Service.Order.Entities.OrderEntity", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int?>("Id"), 1L, 1);

                    b.Property<int?>("BankAccountId")
                        .HasColumnType("int");

                    b.Property<string>("CashType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("PartnerId")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int>("Total")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BankAccountId");

                    b.ToTable("Order");
                });

            modelBuilder.Entity("Service.Order.Entities.OrderLineEntity", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int?>("Id"), 1L, 1);

                    b.Property<int?>("OrderEntityId")
                        .HasColumnType("int");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OrderEntityId");

                    b.ToTable("OrderLine");
                });

            modelBuilder.Entity("Service.Order.Entities.OrderEntity", b =>
                {
                    b.HasOne("Service.Order.Entities.OrderBankAccountEntity", "BankAccount")
                        .WithMany()
                        .HasForeignKey("BankAccountId");

                    b.Navigation("BankAccount");
                });

            modelBuilder.Entity("Service.Order.Entities.OrderLineEntity", b =>
                {
                    b.HasOne("Service.Order.Entities.OrderEntity", null)
                        .WithMany("OrderLines")
                        .HasForeignKey("OrderEntityId");
                });

            modelBuilder.Entity("Service.Order.Entities.OrderEntity", b =>
                {
                    b.Navigation("OrderLines");
                });
#pragma warning restore 612, 618
        }
    }
}
