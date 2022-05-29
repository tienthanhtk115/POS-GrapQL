dotnet add package HotChocolate.AspNetCore

dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools

dotnet ef migrations add InitialCreate
dotnet ef database update

dotnet remove package GraphQL
dotnet remove package GraphQL.MicrosoftDI
dotnet remove package GraphQL.Server.Transports.AspNetCore
dotnet remove package GraphQL.Server.Transports.AspNetCore.SystemTextJson
dotnet remove package GraphQL.Server.Ui.Playground
