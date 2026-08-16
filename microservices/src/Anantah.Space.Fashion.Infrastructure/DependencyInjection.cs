using Anantah.Space.Fashion.Application.Catalog;
using Anantah.Space.Fashion.Application.Content;
using Anantah.Space.Fashion.Infrastructure.Catalog;
using Anantah.Space.Fashion.Infrastructure.Content;
using Anantah.Space.Fashion.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Anantah.Space.Fashion.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddFashionInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("FashionDatabase");
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException("ConnectionStrings:FashionDatabase must be configured.");
        }

        services.AddDbContext<FashionDbContext>(options => options.UseNpgsql(
            connectionString,
            postgres => postgres.MigrationsHistoryTable("__ef_migrations_history", "fashion")));
        services.AddScoped<FashionDatabaseInitializer>();
        services.AddScoped<IProductReadRepository, ProductReadRepository>();
        services.AddScoped<IFashionCatalogService, FashionCatalogService>();
        services.AddSingleton<IContentPageRepository, CuratedContentPageRepository>();
        services.AddScoped<IFashionContentService, FashionContentService>();
        return services;
    }
}