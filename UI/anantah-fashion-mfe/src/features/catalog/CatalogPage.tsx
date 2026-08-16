import { Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button, EmptyState, Notice, SearchField, SegmentedControl, Skeleton } from "../../design-system";
import { getCategories, getProducts, type Product } from "../../shared/api/catalogApi";

export function CatalogPage() {
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [requestVersion, setRequestVersion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCatalog() {
      try {
        setLoading(true);
        const productsRequest = getProducts(selectedCategory, controller.signal);
        const categoriesRequest = categories.length === 1
          ? getCategories(controller.signal)
          : Promise.resolve(categories.slice(1));
        const [fetchedCategories, fetchedProducts] = await Promise.all([categoriesRequest, productsRequest]);

        setCategories(["All", ...fetchedCategories]);
        setCatalog(fetchedProducts);
        setError(null);
      } catch (requestError) {
        if ((requestError as Error).name !== "AbortError") {
          setError("The collection could not be loaded right now.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadCatalog();
    return () => controller.abort();
  }, [selectedCategory, requestVersion]);

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return catalog;

    return catalog.filter((item) =>
      [item.name, item.brand, item.category, item.color].some((field) => field.toLowerCase().includes(normalized)),
    );
  }, [catalog, query]);

  return (
    <main>
      <section className="fashion-catalog" aria-labelledby="catalog-heading">
        <header className="fashion-catalog__heading">
          <p>Current collection</p>
          <h1 id="catalog-heading">Fashion catalog</h1>
          <span>Browse every piece across the Anantah Space Fashion edit.</span>
        </header>
        <div className="fashion-catalog__toolbar">
          <SegmentedControl
            label="Categories"
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />

          <SearchField
            id="fashion-search-input"
            label="Search the fashion catalog"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search brand, product, category"
          />
        </div>

        {error && (
          <Notice
            tone="error"
            action={<Button size="sm" variant="danger" onClick={() => setRequestVersion((version) => version + 1)}>Try again</Button>}
          >
            {error}
          </Notice>
        )}

        {!error && (loading ? (
          <CatalogSkeleton />
        ) : filteredProducts.length > 0 ? (
          <div className="fashion-grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="fashion-card">
                <div className="fashion-card__image-wrap">
                  <img src={product.imageUrl} alt={product.name} loading="lazy" decoding="async" />
                </div>
                <div className="fashion-card__body">
                  <span>{product.brand}</span>
                  <h2>{product.name}</h2>
                  <p>{product.category} · {product.color}</p>
                  <div className="fashion-card__meta">
                    <strong>INR {product.priceInr.toLocaleString("en-IN")}</strong>
                    <small><Star size={12} aria-hidden="true" /> {product.rating.toFixed(1)}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="No pieces found" description="Clear the search or choose another collection." />
        ))}
      </section>
    </main>
  );
}

function CatalogSkeleton() {
  return (
    <div className="fashion-grid" aria-label="Loading catalog" aria-busy="true">
      {Array.from({ length: 4 }, (_, index) => (
        <div className="fashion-card fashion-card--skeleton" key={index} aria-hidden="true">
          <Skeleton className="fashion-card__image-wrap" />
          <div className="fashion-card__body">
            <Skeleton width="35%" height={12} />
            <Skeleton width="75%" height={17} />
            <Skeleton width="52%" height={12} />
          </div>
        </div>
      ))}
    </div>
  );
}