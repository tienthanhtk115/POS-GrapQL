var builder = WebApplication.CreateBuilder(args);

const string User = "user";
const string Stock = "stock";
const string Product = "product";
const string Partner = "partner";
const string Order = "order";

builder.Services.AddHttpClient(User, c => c.BaseAddress = new Uri("http://posinventory-service-user/graphql"));
builder.Services.AddHttpClient(Stock, c => c.BaseAddress = new Uri("http://posinventory-service-stock/graphql"));
builder.Services.AddHttpClient(Product, c => c.BaseAddress = new Uri("http://posinventory-service-product/graphql"));
builder.Services.AddHttpClient(Partner, c => c.BaseAddress = new Uri("http://posinventory-service-partner/graphql"));
builder.Services.AddHttpClient(Order, c => c.BaseAddress = new Uri("http://posinventory-service-order/graphql"));
  
//Local
//builder.Services.AddHttpClient(Stock, c => c.BaseAddress = new Uri("http://localhost:5173/graphql"));
//builder.Services.AddHttpClient(Product, c => c.BaseAddress = new Uri("http://localhost:5044/graphql"));   
////builder.Services.AddHttpClient(Partner, c => c.BaseAddress = new Uri("http://localhost:5094/graphql"));
//builder.Services.AddHttpClient(User, c => c.BaseAddress = new Uri("http://localhost:5139/authorization"));
//builder.Services.AddHttpClient(Order, c => c.BaseAddress = new Uri("http://localhost:5074/graphql"));


builder.Services.AddGraphQLServer()
                .AddRemoteSchema(Stock)
                .AddRemoteSchema(User)
                .AddRemoteSchema(Product)
                .AddRemoteSchema(Order)
                .AddRemoteSchema(Partner)
                .AddTypeExtensionsFromFile("./Stitching.graphql");

                // .AddQueryType(d => d.Name("Query"))
                // .AddMutationType(d => d.Name("Mutation"))
               
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
                     builder => builder.WithOrigins()
                     .AllowAnyMethod()
                     .AllowAnyHeader()
                     .SetIsOriginAllowed(origin => true)
                     .AllowCredentials());
});

var app = builder.Build();

app.MapGraphQL("/graphql");
app.UseCors("CorsPolicy");
app.Run();
