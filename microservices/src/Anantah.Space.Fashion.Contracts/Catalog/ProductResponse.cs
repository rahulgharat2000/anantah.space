namespace Anantah.Space.Fashion.Contracts.Catalog;

public sealed record ProductResponse(
    Guid Id,
    string Name,
    string Slug,
    string Category,
    string Brand,
    decimal PriceInr,
    string Color,
    decimal Rating,
    string ImageUrl);