using Anantah.Space.Fashion.Application.Catalog;
using Anantah.Space.Fashion.Domain.Catalog;
using Xunit;

namespace Anantah.Space.Fashion.ArchitectureTests;

public sealed class LayeringTests
{
    [Fact]
    public void DomainDoesNotReferenceFrameworkOrOuterLayers()
    {
        var references = typeof(Product).Assembly.GetReferencedAssemblies().Select(name => name.Name).ToArray();

        Assert.DoesNotContain(references, name => name?.StartsWith("Microsoft.EntityFrameworkCore") == true);
        Assert.DoesNotContain("Anantah.Space.Fashion.Infrastructure", references);
        Assert.DoesNotContain("Anantah.Space.Fashion.Api", references);
    }

    [Fact]
    public void ApplicationDoesNotReferenceInfrastructureOrApi()
    {
        var references = typeof(IFashionCatalogService).Assembly.GetReferencedAssemblies().Select(name => name.Name).ToArray();

        Assert.DoesNotContain("Anantah.Space.Fashion.Infrastructure", references);
        Assert.DoesNotContain("Anantah.Space.Fashion.Api", references);
    }
}