using Anantah.Space.Fashion.Application.Content;
using Anantah.Space.Fashion.Contracts.Content;
using Xunit;

namespace Anantah.Space.Fashion.UnitTests.Content;

public sealed class FashionContentServiceTests
{
    [Fact]
    public async Task GetPageNormalizesSlugBeforeReadingPublishedContent()
    {
        var repository = new RecordingContentPageRepository(new ContentPageResponse(
            "home",
            "Fashion home",
            "Published content",
            []));
        var service = new FashionContentService(repository);

        var page = await service.GetPageAsync("  HOME  ", CancellationToken.None);

        Assert.NotNull(page);
        Assert.Equal("home", repository.RequestedSlug);
    }

    [Fact]
    public async Task GetPageReturnsNullWhenPublishedContentDoesNotExist()
    {
        var repository = new RecordingContentPageRepository(null);
        var service = new FashionContentService(repository);

        var page = await service.GetPageAsync("missing", CancellationToken.None);

        Assert.Null(page);
    }

    private sealed class RecordingContentPageRepository(ContentPageResponse? response) : IContentPageRepository
    {
        public string? RequestedSlug { get; private set; }

        public Task<ContentPageResponse?> GetPublishedPageAsync(
            string slug,
            CancellationToken cancellationToken)
        {
            RequestedSlug = slug;
            return Task.FromResult(response);
        }
    }
}