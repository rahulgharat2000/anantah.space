namespace Anantah.Space.Fashion.Domain.Common;

public abstract class AuditableEntity
{
    public Guid Id { get; protected set; } = Guid.NewGuid();
    public DateTimeOffset CreatedAt { get; protected set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset UpdatedAt { get; protected set; } = DateTimeOffset.UtcNow;
    public string? CreatedBy { get; protected set; }
    public bool IsActive { get; protected set; } = true;
    public DateTimeOffset? DeletedAt { get; protected set; }
}