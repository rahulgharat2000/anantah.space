using Microsoft.EntityFrameworkCore;

namespace Anantah.Space.Fashion.Infrastructure.Persistence;

public sealed class FashionDatabaseInitializer(FashionDbContext dbContext)
{
    public async Task InitialiseAsync(bool seedDevelopmentData, CancellationToken cancellationToken)
    {
        await dbContext.Database.MigrateAsync(cancellationToken);

        if (seedDevelopmentData)
        {
            await FashionDevelopmentData.SeedAsync(dbContext, cancellationToken);
        }
    }
}