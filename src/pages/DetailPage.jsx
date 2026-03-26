import React from "react";

const styles = `
  .ts-detail { padding:clamp(24px,4vw,48px) var(--pad); }
  .ts-back-btn {
    background:none;border:none;color:var(--muted);font-family:var(--mono);
    font-size:.76rem;cursor:pointer;padding:0;
    display:inline-flex;align-items:center;gap:6px;
    margin-bottom:28px;transition:color .2s;
  }
  .ts-back-btn:hover { color:var(--text); }
  .ts-detail-grid {
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:clamp(24px,4vw,48px);
    align-items:start;
  }
  @media(max-width:640px) { .ts-detail-grid { grid-template-columns:1fr; } }
  .ts-detail-img {
    aspect-ratio:1;background:var(--surface);border:1px solid var(--border);
    border-radius:10px;display:flex;align-items:center;justify-content:center;
    font-size:clamp(5rem,12vw,8rem);
  }
  .ts-detail-cat {
    font-family:var(--mono);font-size:.62rem;color:var(--accent2);
    letter-spacing:.15em;text-transform:uppercase;
    margin-bottom:10px;display:block;
  }
  .ts-detail-name {
    font-size:clamp(1.1rem,2.5vw,1.5rem);
    font-weight:600;line-height:1.35;margin-bottom:14px;
  }
  .ts-detail-price {
    font-family:var(--mono);font-size:clamp(1.5rem,3vw,2rem);
    color:var(--accent);font-weight:700;margin-bottom:6px;
  }
  .ts-detail-orig { font-size:.86rem;color:var(--muted);text-decoration:line-through;margin-bottom:20px; }
  .ts-meta { border-top:1px solid var(--border);padding-top:16px;margin-top:16px; }
  .ts-meta-row {
    display:flex;justify-content:space-between;
    padding:9px 0;font-size:.83rem;border-bottom:1px solid var(--border);
  }
  .ts-meta-row:last-child { border-bottom:none; }
  .ts-meta-key { color:var(--muted); }
  .ts-detail-add {
    width:100%;background:var(--accent);color:#000;border:none;
    padding:15px;font-family:var(--mono);font-size:.85rem;font-weight:700;
    border-radius:var(--radius);cursor:pointer;margin-top:22px;
    transition:opacity .2s,transform .2s;
  }
  .ts-detail-add:hover { opacity:.85;transform:translateY(-1px); }
`;

const META = [["Brand","TechShop"],["Availability","In Stock"],["Shipping","Free on $50+"]];

export default function DetailPage({ product, onAdd, onBack }) {
  return (
    <>
      <style>{styles}</style>
      <div className="ts-detail">
        <div className="ts-container">
          <button className="ts-back-btn" onClick={onBack}>← Back to Products</button>
          <div className="ts-detail-grid">
            <div className="ts-detail-img">{product.emoji}</div>
            <div>
              <span className="ts-detail-cat">{product.category}</span>
              <h1 className="ts-detail-name">{product.name}</h1>
              <div className="ts-detail-price">${product.price.toFixed(2)}</div>
              {product.orig && <div className="ts-detail-orig">Was ${product.orig}</div>}
              <div className="ts-meta">
                {[...META,["Category",product.category]].map(([k,v]) => (
                  <div className="ts-meta-row" key={k}>
                    <span className="ts-meta-key">{k}</span><span>{v}</span>
                  </div>
                ))}
              </div>
              <button className="ts-detail-add" onClick={() => onAdd(product)}>ADD TO CART</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
