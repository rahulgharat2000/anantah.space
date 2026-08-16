export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand-mark" aria-label="Anantah">
      <span className="brand-mark__symbol" aria-hidden="true">A</span>
      {!compact && <span className="brand-mark__word">ANANTAH</span>}
    </span>
  );
}