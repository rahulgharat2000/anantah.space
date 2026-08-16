using Anantah.Space.Fashion.Domain.Catalog;
using Microsoft.EntityFrameworkCore;

namespace Anantah.Space.Fashion.Infrastructure.Persistence;

public sealed class FashionDbContext(DbContextOptions<FashionDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("fashion");
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(FashionDbContext).Assembly);
    }
}