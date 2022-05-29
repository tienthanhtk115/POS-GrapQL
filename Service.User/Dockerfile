FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Service.User.csproj", "./"]
RUN dotnet restore "Service.User.csproj"
COPY . .
RUN dotnet build "Service.User.csproj" -c Release -o /app/build
RUN dotnet publish "Service.User.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Service.User.dll"]