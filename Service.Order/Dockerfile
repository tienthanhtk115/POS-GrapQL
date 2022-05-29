FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Service.Order.csproj", "./"]
RUN dotnet restore "Service.Order.csproj"
COPY . .
RUN dotnet build "Service.Order.csproj" -c Release -o /app/build
RUN dotnet publish "Service.Order.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Service.Order.dll"]