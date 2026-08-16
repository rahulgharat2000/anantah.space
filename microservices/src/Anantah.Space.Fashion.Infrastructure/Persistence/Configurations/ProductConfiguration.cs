using Anantah.Space.Fashion.Domain.Catalog;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Anantah.Space.Fashion.Infrastructure.Persistence.Configurations;

public sealed class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("products");
        builder.HasKey(product => product.Id);
        builder.Property(product => product.Name).HasMaxLength(180).IsRequired();
        builder.Property(product => product.Slug).HasMaxLength(200).IsRequired();
        builder.Property(product => product.Category).HasMaxLength(120).IsRequired();
        builder.Property(product => product.Brand).HasMaxLength(120).IsRequired();
        builder.Property(product => product.Color).HasMaxLength(80).IsRequired();
        builder.Property(product => product.ImageUrl).HasMaxLength(2048).IsRequired();
        builder.Property(product => product.PriceInr).HasPrecision(12, 2);
        builder.Property(product => product.Rating).HasPrecision(3, 2);
        builder.Property(product => product.CreatedBy).HasMaxLength(100);
        builder.HasIndex(product => product.Slug).IsUnique();
        builder.HasIndex(product => new { product.Category, product.IsActive });
        builder.HasQueryFilter(product => product.DeletedAt == null && product.IsActive);
    }
}