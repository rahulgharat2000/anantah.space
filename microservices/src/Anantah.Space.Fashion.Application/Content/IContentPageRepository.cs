using Anantah.Space.Fashion.Contracts.Content;

namespace Anantah.Space.Fashion.Application.Content;

public interface IContentPageRepository
{
    Task<ContentPageResponse?> GetPublishedPageAsync(string slug, CancellationToken cancellationToken);
}