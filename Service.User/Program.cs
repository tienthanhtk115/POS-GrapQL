using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Service.User.Contracts;
using Service.User.Database;
using Service.User.GraphQL;
using Service.User.Repositories;
using System.Text;



var builder = WebApplication.CreateBuilder(args);

ConfigurationManager configuration = builder.Configuration;
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<UserDbContext>(x => x.UseSqlServer(connectionString));
builder.Services.AddScoped<ILoggerManager, LoggerManager>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<Query>();
builder.Services.AddScoped<Mutation>();

builder.Services.AddGraphQLServer()
            .AddQueryType<Query>()
            .AddMutationType<Mutation>();


//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//.AddJwtBearer(options =>
//{
//    options.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidIssuer = configuration["JWT:ValidIssuer"],
//        ValidateIssuer = true,
//        ValidAudience = configuration["JWT:ValidIssuer"],
//        ValidateAudience = true,
//        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"])),
//        ValidateIssuerSigningKey = true
//    };
//});

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
                    builder => builder.WithOrigins()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(origin => true)
                    .AllowCredentials());
});

builder.Services.AddControllers();

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<UserDbContext>();
    dataContext.Database.Migrate();
}
app.UseAuthentication();
app.UseCors("CorsPolicy");
app.MapGraphQL("/graphql");
app.UseRouting();


app.Run();
