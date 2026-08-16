using Anantah.Space.Fashion.Domain.Catalog;

namespace Anantah.Space.Fashion.Application.Catalog;

public interface IProductReadRepository
{
    Task<IReadOnlyList<string>> GetCategoriesAsync(CancellationToken cancellationToken);
    Task<IReadOnlyList<Product>> GetProductsAsync(string? category, string? query, CancellationToken cancellationToken);
    Task<Product?> GetProductAsync(Guid id, CancellationToken cancellationToken);
}