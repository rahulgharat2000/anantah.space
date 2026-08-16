using Anantah.Space.Fashion.Domain.Common;

namespace Anantah.Space.Fashion.Domain.Catalog;

public sealed class Product : AuditableEntity
{
    private Product() { }

    public Product(
        string name,
        string slug,
        string category,
        string brand,
        decimal priceInr,
        string color,
        decimal rating,
        string imageUrl)
    {
        Name = name;
        Slug = slug;
        Category = category;
        Brand = brand;
        PriceInr = priceInr;
        Color = color;
        Rating = rating;
        ImageUrl = imageUrl;
    }

    public string Name { get; private set; } = string.Empty;
    public string Slug { get; private set; } = string.Empty;
    public string Category { get; private set; } = string.Empty;
    public string Brand { get; private set; } = string.Empty;
    public decimal PriceInr { get; private set; }
    public string Color { get; private set; } = string.Empty;
    public decimal Rating { get; private set; }
    public string ImageUrl { get; private set; } = string.Empty;
}