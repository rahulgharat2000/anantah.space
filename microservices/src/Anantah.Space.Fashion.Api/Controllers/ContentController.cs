using Anantah.Space.Fashion.Application.Content;
using Anantah.Space.Fashion.Contracts.Content;
using Microsoft.AspNetCore.Mvc;

namespace Anantah.Space.Fashion.Api.Controllers;

[ApiController]
[Route("api/v1/fashion/content")]
public sealed class ContentController(IFashionContentService content) : ControllerBase
{
    [HttpGet("pages/{slug}")]
    [ProducesResponseType<ContentPageResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ContentPageResponse>> GetPage(
        string slug,
        CancellationToken cancellationToken)
    {
        var page = await content.GetPageAsync(slug, cancellationToken);
        return page is null
            ? Problem(statusCode: StatusCodes.Status404NotFound, title: "Content page not found")
            : Ok(page);
    }
}