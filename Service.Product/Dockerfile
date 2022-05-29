FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Service.Product.csproj", "./"]
RUN dotnet restore "Service.Product.csproj"
COPY . .
RUN dotnet build "Service.Product.csproj" -c Release -o /app/build
RUN dotnet publish "Service.Product.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Service.Product.dll"]