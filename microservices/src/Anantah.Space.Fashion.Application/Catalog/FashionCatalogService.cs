using Anantah.Space.Fashion.Contracts.Catalog;
using Anantah.Space.Fashion.Domain.Catalog;

namespace Anantah.Space.Fashion.Application.Catalog;

public sealed class FashionCatalogService(IProductReadRepository products) : IFashionCatalogService
{
    public Task<IReadOnlyList<string>> GetCategoriesAsync(CancellationToken cancellationToken) =>
        products.GetCategoriesAsync(cancellationToken);

    public async Task<IReadOnlyList<ProductResponse>> GetProductsAsync(
        string? category,
        string? query,
        CancellationToken cancellationToken)
    {
        var results = await products.GetProductsAsync(category, query, cancellationToken);
        return results.Select(ToResponse).ToArray();
    }

    public async Task<ProductResponse?> GetProductAsync(Guid id, CancellationToken cancellationToken)
    {
        var product = await products.GetProductAsync(id, cancellationToken);
        return product is null ? null : ToResponse(product);
    }

    private static ProductResponse ToResponse(Product product) => new(
        product.Id,
        product.Name,
        product.Slug,
        product.Category,
        product.Brand,
        product.PriceInr,
        product.Color,
        product.Rating,
        product.ImageUrl);
}