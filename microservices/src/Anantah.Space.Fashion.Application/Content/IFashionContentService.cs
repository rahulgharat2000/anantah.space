using Anantah.Space.Fashion.Contracts.Content;

namespace Anantah.Space.Fashion.Application.Content;

public interface IFashionContentService
{
    Task<ContentPageResponse?> GetPageAsync(string slug, CancellationToken cancellationToken);
}