using Anantah.Space.Fashion.Application.Catalog;
using Anantah.Space.Fashion.Domain.Catalog;
using Anantah.Space.Fashion.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Anantah.Space.Fashion.Infrastructure.Catalog;

public sealed class ProductReadRepository(FashionDbContext dbContext) : IProductReadRepository
{
    public async Task<IReadOnlyList<string>> GetCategoriesAsync(CancellationToken cancellationToken) =>
        await dbContext.Products
            .AsNoTracking()
            .Select(product => product.Category)
            .Distinct()
            .OrderBy(category => category)
            .ToListAsync(cancellationToken);

    public async Task<IReadOnlyList<Product>> GetProductsAsync(
        string? category,
        string? query,
        CancellationToken cancellationToken)
    {
        IQueryable<Product> products = dbContext.Products.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(category))
        {
            products = products.Where(product => product.Category == category);
        }

        if (!string.IsNullOrWhiteSpace(query))
        {
            var searchTerm = $"%{query.Trim()}%";
            products = products.Where(product =>
                EF.Functions.ILike(product.Name, searchTerm) ||
                EF.Functions.ILike(product.Brand, searchTerm) ||
                EF.Functions.ILike(product.Category, searchTerm));
        }

        return await products.OrderBy(product => product.Name).ToListAsync(cancellationToken);
    }

    public Task<Product?> GetProductAsync(Guid id, CancellationToken cancellationToken) =>
        dbContext.Products.AsNoTracking().FirstOrDefaultAsync(product => product.Id == id, cancellationToken);
}