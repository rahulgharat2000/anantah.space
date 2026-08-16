using Anantah.Space.Fashion.Contracts.Catalog;

namespace Anantah.Space.Fashion.Application.Catalog;

public interface IFashionCatalogService
{
    Task<IReadOnlyList<string>> GetCategoriesAsync(CancellationToken cancellationToken);
    Task<IReadOnlyList<ProductResponse>> GetProductsAsync(string? category, string? query, CancellationToken cancellationToken);
    Task<ProductResponse?> GetProductAsync(Guid id, CancellationToken cancellationToken);
}