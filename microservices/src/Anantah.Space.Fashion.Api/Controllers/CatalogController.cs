using Anantah.Space.Fashion.Application.Catalog;
using Anantah.Space.Fashion.Contracts.Catalog;
using Microsoft.AspNetCore.Mvc;

namespace Anantah.Space.Fashion.Api.Controllers;

[ApiController]
[Route("api/v1/fashion")]
public sealed class CatalogController(IFashionCatalogService catalog) : ControllerBase
{
    [HttpGet("categories")]
    [ProducesResponseType<IReadOnlyList<string>>(StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<string>>> GetCategories(CancellationToken cancellationToken) =>
        Ok(await catalog.GetCategoriesAsync(cancellationToken));

    [HttpGet("products")]
    [ProducesResponseType<IReadOnlyList<ProductResponse>>(StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<ProductResponse>>> GetProducts(
        [FromQuery] string? category,
        [FromQuery(Name = "q")] string? query,
        CancellationToken cancellationToken) =>
        Ok(await catalog.GetProductsAsync(category, query, cancellationToken));

    [HttpGet("products/{id:guid}")]
    [ProducesResponseType<ProductResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductResponse>> GetProduct(Guid id, CancellationToken cancellationToken)
    {
        var product = await catalog.GetProductAsync(id, cancellationToken);
        return product is null
            ? Problem(statusCode: StatusCodes.Status404NotFound, title: "Product not found")
            : Ok(product);
    }
}