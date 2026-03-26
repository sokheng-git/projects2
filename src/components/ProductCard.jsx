import React from "react";

const styles = `
  .ts-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: all .25s;
    display: flex;
    flex-direction: column;
  }
  .ts-card:hover {
    border-color: var(--accent);
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(0,0,0,.4);
  }

  /* ── Image box ── */
  .ts-card-img {
    width: 100%;
    height: 160px;
    position: relative;
    overflow: hidden;
    background: #111;
    border-bottom: 1px solid var(--border);
    display: block;        /* ← មិនប្រើ flex */
  }
  .ts-card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .ts-card-emoji {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(2.4rem, 5vw, 3.2rem);
  }
  .ts-sale-tag {
    position: absolute;
    top: 8px; right: 8px;
    z-index: 2;
    background: var(--danger);
    color: #fff;
    font-family: var(--mono);
    font-size: .55rem;
    font-weight: 700;
    padding: 3px 7px;
    border-radius: var(--radius);
  }

  /* ── Card body ── */
  .ts-card-body { padding: 12px; flex: 1; display: flex; flex-direction: column; }
  .ts-card-name {
    font-size: .79rem; font-weight: 500; color: var(--text);
    line-height: 1.4; flex: 1; margin-bottom: 8px;
    display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; overflow: hidden;
  }
  .ts-card-price { display: flex; align-items: baseline; gap: 6px; margin-bottom: 10px; }
  .ts-price { font-family: var(--mono); font-size: .92rem; color: var(--accent); font-weight: 700; }
  .ts-price-orig { font-size: .72rem; color: var(--muted); text-decoration: line-through; }
  .ts-card-btns { display: flex; gap: 6px; }
  .ts-view-btn {
    flex: 1; background: transparent; border: 1px solid var(--border); color: var(--muted);
    font-family: var(--sans); font-size: .74rem; font-weight: 600;
    padding: 8px 4px; border-radius: var(--radius); cursor: pointer; transition: all .2s;
  }
  .ts-view-btn:hover { border-color: var(--muted); color: var(--text); }
  .ts-add-btn {
    flex: 2; background: transparent; border: 1px solid var(--accent); color: var(--accent);
    font-family: var(--sans); font-size: .74rem; font-weight: 600;
    padding: 8px 4px; border-radius: var(--radius); cursor: pointer; transition: all .2s;
  }
  .ts-add-btn:hover { background: var(--accent); color: #000; }
`;

export default function ProductCard({ product, onAdd, onView }) {
  return (
    <>
      <style>{styles}</style>
      <div className="ts-card" onClick={() => onView(product)}>

        <div className="ts-card-img">
          {product.orig && <span className="ts-sale-tag">SALE</span>}
          {product.image
            ? <img src={product.image} alt={product.name} />
            : <div className="ts-card-emoji">{product.emoji}</div>
          }
        </div>

        <div className="ts-card-body">
          <div className="ts-card-name">{product.name}</div>
          <div className="ts-card-price">
            <span className="ts-price">${product.price.toFixed(2)}</span>
            {product.orig && <span className="ts-price-orig">${product.orig}</span>}
          </div>
          <div className="ts-card-btns">
            <button className="ts-view-btn" onClick={e => { e.stopPropagation(); onView(product); }}>View</button>
            <button className="ts-add-btn"  onClick={e => { e.stopPropagation(); onAdd(product); }}>+ Cart</button>
          </div>
        </div>

      </div>
    </>
  );
}