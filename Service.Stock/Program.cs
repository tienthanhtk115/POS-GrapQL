using Microsoft.EntityFrameworkCore;
using Service.Stock.Contracts;
using Service.Stock.Database;
using Service.Stock.GraphQL;
using Service.Stock.Repositories;


var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<StockDbContext>(x => x.UseSqlServer(connectionString));

// Add a service to DI
builder.Services.AddScoped<IStockRepository, StockRepository>();

builder.Services.AddGraphQLServer()
                .AddQueryType<StockQuery>()
                .AddMutationType<StockMutation>();

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
