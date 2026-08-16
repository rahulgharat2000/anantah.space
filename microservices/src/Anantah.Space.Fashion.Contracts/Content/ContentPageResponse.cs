namespace Anantah.Space.Fashion.Contracts.Content;

public sealed record ContentPageResponse(
    string Slug,
    string Title,
    string Description,
    IReadOnlyList<ContentBlockResponse> Blocks);

public sealed record ContentBlockResponse(
    string Id,
    string Kind,
    string? Eyebrow,
    string Title,
    string? Body,
    string? ImageUrl,
    string? ActionLabel,
    string? ActionHref,
    string Theme,
    IReadOnlyList<ContentItemResponse> Items);

public sealed record ContentItemResponse(
    string Id,
    string Title,
    string? Subtitle,
    string? ImageUrl,
    string? Href);