using Microsoft.EntityFrameworkCore;
using Service.Order.Contracts;
using Service.Order.Database;
using Service.Order.GraphQL;
using Service.Order.Repositories;


var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<OrderDbContext>(x => x.UseSqlServer(connectionString));

// Add a service to DI
builder.Services.AddScoped<IOrderRepository, OrderRepository>();

builder.Services.AddGraphQLServer()
                .AddQueryType<OrderQuery>()
                .AddMutationType<OrderMutation>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("*")
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

app.UseCors();
app.UseRouting();

app.MapGraphQL("/graphql");

app.Run();
