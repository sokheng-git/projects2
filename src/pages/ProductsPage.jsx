import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, ALL_CATEGORIES } from "../utils/products";

const styles = `
  .ts-products-page { display:flex; flex-direction:column; }

  /* ── Filter bar (mobile) ── */
  .ts-filter-bar {
    display: none;
    padding: 12px var(--pad);
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    gap: 8px; flex-wrap: wrap; align-items: center;
  }
  .ts-filter-bar.visible { display: flex; }
  .ts-filter-tag {
    background: var(--bg); border: 1px solid var(--border);
    color: var(--muted); font-size: .76rem; padding: 5px 12px;
    border-radius: 99px; cursor: pointer; transition: all .2s;
    white-space: nowrap;
  }
  .ts-filter-tag:hover, .ts-filter-tag.active { border-color:var(--accent); color:var(--accent); }

  /* ── Layout ── */
  .ts-main {
    display: flex; flex: 1;
    min-height: calc(100vh - var(--nav-h));
  }

  /* ── Sidebar ── */
  .ts-sidebar {
    width: 220px; flex-shrink: 0;
    background: var(--surface); border-right: 1px solid var(--border);
    padding: 24px 16px;
    position: sticky; top: var(--nav-h);
    height: calc(100vh - var(--nav-h));
    overflow-y: auto;
  }
  .ts-sidebar-label {
    font-family:var(--mono);font-size:.6rem;color:var(--muted);
    letter-spacing:.15em;text-transform:uppercase;
    margin-bottom:8px;margin-top:22px;
  }
  .ts-sidebar-label:first-child { margin-top:0; }
  .ts-check-label {
    display:flex;align-items:center;gap:8px;color:var(--muted);
    font-size:.82rem;cursor:pointer;padding:7px 10px;
    border-radius:var(--radius);transition:color .2s;user-select:none;
  }
  .ts-check-label:hover { color:var(--text); }
  .ts-check-label input { accent-color:var(--accent);cursor:pointer;width:14px;height:14px; }
  .ts-check-label.checked { color:var(--accent); }
  .ts-range { width:100%;margin:10px 0;accent-color:var(--accent);cursor:pointer; }
  .ts-price-labels { display:flex;justify-content:space-between;font-size:.7rem;color:var(--muted); }
  .ts-sort {
    width:100%;background:var(--bg);color:var(--text);
    border:1px solid var(--border);border-radius:var(--radius);
    padding:8px 10px;font-family:var(--sans);font-size:.82rem;
    cursor:pointer;margin-top:4px;
  }
  .ts-sort:focus { outline:none;border-color:var(--accent); }

  /* ── Products area ── */
  .ts-products-area { flex:1; padding:clamp(16px,3vw,28px); min-width:0; }
  .ts-toolbar {
    display:flex;align-items:center;justify-content:space-between;
    margin-bottom:20px;gap:12px;flex-wrap:wrap;
  }
  .ts-toolbar-count { font-family:var(--mono);font-size:.8rem;color:var(--muted); }
  .ts-toolbar-count span { color:var(--text); }
  .ts-search {
    background:var(--surface);border:1px solid var(--border);color:var(--text);
    border-radius:var(--radius);padding:9px 14px;font-family:var(--sans);
    font-size:.84rem;width:min(210px,100%);transition:border-color .2s;
  }
  .ts-search:focus { outline:none;border-color:var(--accent); }
  .ts-search::placeholder { color:var(--muted); }

  /* hide sidebar on mobile, show filter bar instead */
  @media (max-width: 768px) {
    .ts-sidebar { display: none; }
    .ts-filter-bar { display: flex; }
    .ts-toolbar { flex-direction: column; align-items: stretch; }
    .ts-search { width: 100%; }
  }
`;

const CAT_LABELS = { audio:"Audio", wearables:"Wearables", chargers:"Chargers", accessories:"Accessories" };
const SORTS = [["name","Name"],["price-low","Price ↑"],["price-high","Price ↓"]];

export default function ProductsPage({ onAdd, onView, initialCat }) {
  const [selectedCats, setSelectedCats] = useState(
    initialCat && initialCat !== "all" ? [initialCat] : []
  );
  const [search,   setSearch]   = useState("");
  const [sort,     setSort]     = useState("name");
  const [maxPrice, setMaxPrice] = useState(500);

  const toggleCat = cat =>
    setSelectedCats(prev => prev.includes(cat) ? prev.filter(c=>c!==cat) : [...prev,cat]);

  const result = PRODUCTS
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => selectedCats.length === 0 || selectedCats.includes(p.category))
    .filter(p => p.price <= maxPrice)
    .sort((a,b) => {
      if (sort === "price-low")  return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  return (
    <>
      <style>{styles}</style>
      <div className="ts-products-page">

        {/* mobile quick-filter chips */}
        <div className="ts-filter-bar visible">
          {ALL_CATEGORIES.map(cat => (
            <button key={cat}
              className={`ts-filter-tag${selectedCats.includes(cat)?" active":""}`}
              onClick={() => toggleCat(cat)}>
              {CAT_LABELS[cat]}
            </button>
          ))}
          <select className="ts-sort" style={{flex:1,minWidth:120}}
            value={sort} onChange={e=>setSort(e.target.value)}>
            {SORTS.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>

        <div className="ts-main">
          {/* desktop sidebar */}
          <aside className="ts-sidebar">
            <div className="ts-sidebar-label">Categories</div>
            {ALL_CATEGORIES.map(cat => (
              <label key={cat} className={`ts-check-label${selectedCats.includes(cat)?" checked":""}`}>
                <input type="checkbox" checked={selectedCats.includes(cat)} onChange={() => toggleCat(cat)}/>
                {CAT_LABELS[cat]}
              </label>
            ))}
            <div className="ts-sidebar-label">Max Price</div>
            <input type="range" className="ts-range" min={0} max={500} value={maxPrice}
              onChange={e => setMaxPrice(+e.target.value)}/>
            <div className="ts-price-labels"><span>$0</span><span>${maxPrice}</span></div>
            <div className="ts-sidebar-label">Sort</div>
            <select className="ts-sort" value={sort} onChange={e=>setSort(e.target.value)}>
              {SORTS.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </aside>

          {/* products */}
          <div className="ts-products-area">
            <div className="ts-toolbar">
              <div className="ts-toolbar-count"><span>{result.length}</span> products</div>
              <input className="ts-search" placeholder="Search…"
                value={search} onChange={e=>setSearch(e.target.value)}/>
            </div>
            {result.length === 0
              ? <div className="ts-empty-state">No products match your filters.</div>
              : <div className="ts-grid">
                  {result.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} onView={onView}/>)}
                </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}
