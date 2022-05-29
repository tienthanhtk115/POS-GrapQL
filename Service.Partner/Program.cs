using Microsoft.EntityFrameworkCore;
using Service.Partner.Contracts;
using Service.Partner.Database;
using Service.Partner.GraphQL;
using Service.Partner.Repositories;


var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<PartnerDbContext>(x => x.UseSqlServer(connectionString));

// Add a service to DI
builder.Services.AddScoped<IPartnerRepository, PartnerRepository>();

builder.Services.AddGraphQLServer()
                .AddQueryType<PartnerQuery>()
                .AddMutationType<PartnerMutation>();

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
    var dataContext = scope.ServiceProvider.GetRequiredService<PartnerDbContext>();
    dataContext.Database.Migrate();
}
app.UseCors();
app.UseRouting();

app.MapGraphQL("/graphql");

app.Run();
