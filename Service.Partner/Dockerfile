FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Service.Partner.csproj", "./"]
RUN dotnet restore "Service.Partner.csproj"
COPY . .
RUN dotnet build "Service.Partner.csproj" -c Release -o /app/build
RUN dotnet publish "Service.Partner.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Service.Partner.dll"]