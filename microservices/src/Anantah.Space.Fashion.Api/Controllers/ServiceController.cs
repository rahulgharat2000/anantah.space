using Microsoft.AspNetCore.Mvc;

namespace Anantah.Space.Fashion.Api.Controllers;

[ApiController]
[Route("api/v1/fashion")]
public sealed class ServiceController : ControllerBase
{
    [HttpGet("health")]
    public IActionResult Health() => Ok(new
    {
        service = "anantah-space-fashion",
        status = "ok",
        database = "postgresql"
    });
}