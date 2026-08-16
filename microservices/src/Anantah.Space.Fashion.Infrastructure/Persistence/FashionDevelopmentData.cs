using Anantah.Space.Fashion.Domain.Catalog;
using Microsoft.EntityFrameworkCore;

namespace Anantah.Space.Fashion.Infrastructure.Persistence;

internal static class FashionDevelopmentData
{
    public static async Task SeedAsync(FashionDbContext dbContext, CancellationToken cancellationToken)
    {
        if (await dbContext.Products.AnyAsync(cancellationToken)) return;

        dbContext.Products.AddRange(
            new Product("Orbital Linen Shirt", "orbital-linen-shirt", "Clothes", "Anantah Atelier", 4599, "Ivory", 4.6m, "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=960&q=80"),
            new Product("Nebula Street Sneaker", "nebula-street-sneaker", "Shoes", "Anantah Motion", 6999, "Cloud White", 4.4m, "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=960&q=80"),
            new Product("Cosmos Leather Tote", "cosmos-leather-tote", "Bags", "Anantah Studio", 8490, "Sand", 4.8m, "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=960&q=80"),
            new Product("Event Horizon Chronograph", "event-horizon-chronograph", "Watches", "Anantah Time", 15499, "Midnight Blue", 4.7m, "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=960&q=80"));

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}