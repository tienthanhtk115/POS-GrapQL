using Microsoft.EntityFrameworkCore;
using Service.Product.Contracts;
using Service.Product.Database;
using Service.Product.GraphQL;
using Service.Product.Repositories;


var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ProductDbContext>(x => x.UseSqlServer(connectionString));

// Add a service to DI
builder.Services.AddScoped<IProductRepository, ProductRepository>();

builder.Services.AddGraphQLServer()
                .AddQueryType<ProductQuery>()
                .AddMutationType<ProductMutation>();

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
using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<ProductDbContext>();
    dataContext.Database.Migrate();
}
app.UseCors();
app.UseRouting();

app.MapGraphQL("/graphql");

app.Run();
