using Anantah.Space.Fashion.Application.Content;
using Anantah.Space.Fashion.Contracts.Content;

namespace Anantah.Space.Fashion.Infrastructure.Content;

public sealed class CuratedContentPageRepository : IContentPageRepository
{
    private static readonly ContentPageResponse HomePage = new(
        "home",
        "Anantah Space Fashion",
        "Original collections and considered essentials for life in motion.",
        [
            new(
                "home-hero",
                "hero",
                "The new perspective",
                "Anantah Space Fashion",
                "Original silhouettes, tactile layers, and precise essentials for a life in motion.",
                "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=2200&q=90",
                "Enter the collection",
                "/fashion/catalog",
                "ink",
                []),
            new(
                "daily-form",
                "editorial",
                "The daily form",
                "Quiet structure. Lasting presence.",
                "A study in proportion and utility, shaped for repeat wear rather than a single moment.",
                "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=88",
                "View the studio edit",
                "/fashion/catalog?edit=studio",
                "paper",
                []),
            new(
                "shop-by-world",
                "collection-grid",
                "Curated worlds",
                "Find your next rotation",
                "Three distinct expressions, composed as one wardrobe.",
                null,
                null,
                null,
                "canvas",
                [
                    new("women", "Women", "Fluid tailoring and considered layers", "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=86", "/fashion/catalog?for=women"),
                    new("men", "Men", "Clean utility and modern proportion", "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1100&q=86", "/fashion/catalog?for=men"),
                    new("premium", "Premium", "Exceptional material, restrained detail", "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=1100&q=86", "/fashion/catalog?edit=premium")
                ]),
            new(
                "service-notes",
                "service-strip",
                null,
                "Made to move with you",
                null,
                null,
                null,
                null,
                "ink",
                [
                    new("delivery", "Considered delivery", "Tracked dispatch and careful packaging", null, null),
                    new("returns", "Clear returns", "A straightforward 30-day return window", null, null),
                    new("care", "Product care", "Guidance that extends the life of every piece", null, null)
                ])
        ]);

    public Task<ContentPageResponse?> GetPublishedPageAsync(string slug, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();
        return Task.FromResult<ContentPageResponse?>(slug == HomePage.Slug ? HomePage : null);
    }
}