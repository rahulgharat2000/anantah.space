using Anantah.Space.Fashion.Domain.Catalog;
using Xunit;

namespace Anantah.Space.Fashion.UnitTests.Catalog;

public sealed class ProductTests
{
    [Fact]
    public void NewProductStartsActiveWithAuditTimestamps()
    {
        var beforeCreation = DateTimeOffset.UtcNow;

        var product = new Product(
            "Orbit Tailored Jacket",
            "orbit-tailored-jacket",
            "Jackets",
            "Anantah Atelier",
            12990m,
            "Midnight",
            4.7m,
            "https://cdn.example.test/orbit-tailored-jacket.jpg");

        Assert.NotEqual(Guid.Empty, product.Id);
        Assert.True(product.IsActive);
        Assert.Null(product.DeletedAt);
        Assert.True(product.CreatedAt >= beforeCreation);
        Assert.Equal("orbit-tailored-jacket", product.Slug);
    }
}