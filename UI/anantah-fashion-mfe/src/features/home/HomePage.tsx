import { ArrowUpRight, RotateCcw, Sparkles, Truck } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button, Notice, Skeleton } from "../../design-system";
import { getContentPage, type ContentBlock, type ContentItem, type ContentPage } from "../../shared/api/contentApi";

export function HomePage() {
  const [page, setPage] = useState<ContentPage | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPage() {
      try {
        setError(null);
        setPage(await getContentPage("home", controller.signal));
      } catch (requestError) {
        if ((requestError as Error).name !== "AbortError") {
          setError("The Fashion home edit could not be loaded right now.");
        }
      }
    }

    void loadPage();
    return () => controller.abort();
  }, [requestVersion]);

  if (error) {
    return (
      <main className="fashion-home-state">
        <Notice
          tone="error"
          action={<Button size="sm" variant="danger" onClick={() => setRequestVersion((version) => version + 1)}>Try again</Button>}
        >
          {error}
        </Notice>
        <Link className="fashion-home-state__link" to="catalog">Continue to the catalog</Link>
      </main>
    );
  }

  if (!page) return <HomeSkeleton />;

  return (
    <main className="fashion-home" aria-label={page.title}>
      {page.blocks.map((block) => <ContentBlockRenderer block={block} key={block.id} />)}
    </main>
  );
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case "hero":
      return <HeroBlock block={block} />;
    case "editorial":
      return <EditorialBlock block={block} />;
    case "collection-grid":
      return <CollectionGridBlock block={block} />;
    case "service-strip":
      return <ServiceStripBlock block={block} />;
    default:
      return null;
  }
}

function HeroBlock({ block }: { block: ContentBlock }) {
  return (
    <section className="fashion-home-hero">
      {block.imageUrl && <img src={block.imageUrl} alt="" fetchPriority="high" />}
      <div className="fashion-home-hero__shade" />
      <div className="fashion-home-hero__content">
        {block.eyebrow && <p>{block.eyebrow}</p>}
        <h1>{block.title}</h1>
        {block.body && <span>{block.body}</span>}
        <ContentLink href={block.actionHref} className="fashion-home-hero__action">
          {block.actionLabel} <ArrowUpRight size={17} aria-hidden="true" />
        </ContentLink>
      </div>
    </section>
  );
}

function EditorialBlock({ block }: { block: ContentBlock }) {
  return (
    <section className="fashion-editorial">
      <div className="fashion-editorial__media">
        {block.imageUrl && <img src={block.imageUrl} alt="" decoding="async" />}
      </div>
      <div className="fashion-editorial__copy">
        {block.eyebrow && <p>{block.eyebrow}</p>}
        <h2>{block.title}</h2>
        {block.body && <span>{block.body}</span>}
        <ContentLink href={block.actionHref} className="fashion-text-link">
          {block.actionLabel} <ArrowUpRight size={16} aria-hidden="true" />
        </ContentLink>
      </div>
    </section>
  );
}

function CollectionGridBlock({ block }: { block: ContentBlock }) {
  return (
    <section className="fashion-worlds" aria-labelledby={`${block.id}-heading`}>
      <header>
        {block.eyebrow && <p>{block.eyebrow}</p>}
        <h2 id={`${block.id}-heading`}>{block.title}</h2>
        {block.body && <span>{block.body}</span>}
      </header>
      <div className="fashion-worlds__grid">
        {block.items.map((item) => (
          <ContentLink href={item.href} className="fashion-world" key={item.id}>
            {item.imageUrl && <img src={item.imageUrl} alt="" decoding="async" />}
            <span className="fashion-world__shade" />
            <span className="fashion-world__copy">
              <strong>{item.title}</strong>
              {item.subtitle && <small>{item.subtitle}</small>}
              <ArrowUpRight size={19} aria-hidden="true" />
            </span>
          </ContentLink>
        ))}
      </div>
    </section>
  );
}

const serviceIcons: Record<string, ReactNode> = {
  delivery: <Truck size={21} />,
  returns: <RotateCcw size={21} />,
  care: <Sparkles size={21} />,
};

function ServiceStripBlock({ block }: { block: ContentBlock }) {
  return (
    <section className="fashion-services" aria-labelledby={`${block.id}-heading`}>
      <h2 className="visually-hidden" id={`${block.id}-heading`}>{block.title}</h2>
      {block.items.map((item) => (
        <div className="fashion-service" key={item.id}>
          <span aria-hidden="true">{serviceIcons[item.id] ?? <Sparkles size={21} />}</span>
          <div>
            <strong>{item.title}</strong>
            {item.subtitle && <small>{item.subtitle}</small>}
          </div>
        </div>
      ))}
    </section>
  );
}

function ContentLink({ children, className, href }: { children: ReactNode; className: string; href: string | null }) {
  if (!href || !href.startsWith("/") || href.startsWith("//")) return null;
  return <Link className={className} to={href}>{children}</Link>;
}

function HomeSkeleton() {
  return (
    <main className="fashion-home-loading" aria-label="Loading Fashion home" aria-busy="true">
      <Skeleton className="fashion-home-loading__hero" />
      <div className="fashion-home-loading__copy">
        <Skeleton width="28%" height={12} />
        <Skeleton width="72%" height={42} />
        <Skeleton width="56%" height={16} />
      </div>
    </main>
  );
}