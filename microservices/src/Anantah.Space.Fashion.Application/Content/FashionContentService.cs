using Anantah.Space.Fashion.Contracts.Content;

namespace Anantah.Space.Fashion.Application.Content;

public sealed class FashionContentService(IContentPageRepository pages) : IFashionContentService
{
    public Task<ContentPageResponse?> GetPageAsync(string slug, CancellationToken cancellationToken)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(slug);
        return pages.GetPublishedPageAsync(slug.Trim().ToLowerInvariant(), cancellationToken);
    }
}