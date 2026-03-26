import React from "react";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../utils/products";

const styles = `
  .ts-hero {
    padding: clamp(48px,8vw,100px) var(--pad) clamp(36px,5vw,64px);
    background: linear-gradient(135deg,#0d0d0d 0%,#111 50%,#0a0f1e 100%);
    border-bottom: 1px solid var(--border);
    position: relative; overflow: hidden;
  }
  .ts-hero::before {
    content:''; position:absolute; inset:0;
    background: radial-gradient(ellipse 60% 60% at 70% 50%, rgba(232,255,71,.07) 0%, transparent 70%);
    pointer-events:none;
  }
  .ts-hero-inner { position:relative; z-index:1; max-width:640px; }
  .ts-hero-tag {
    font-family:var(--mono); font-size:.64rem; color:var(--accent);
    letter-spacing:.2em; text-transform:uppercase;
    border:1px solid var(--accent); padding:4px 10px;
    border-radius:var(--radius); display:inline-block; margin-bottom:20px;
  }
  .ts-hero h1 {
    font-family:var(--mono);
    font-size:clamp(1.8rem, 5vw, 4rem);
    font-weight:700; line-height:1.1; margin-bottom:16px;
  }
  .ts-hero h1 span { color:var(--accent); }
  .ts-hero-sub {
    color:var(--muted); font-size:clamp(.88rem,1.5vw,1rem);
    margin-bottom:32px; line-height:1.7;
  }
  .ts-hero-cta {
    background:var(--accent); color:#000; border:none;
    padding:13px clamp(20px,3vw,32px); border-radius:var(--radius);
    font-family:var(--mono); font-size:.83rem; font-weight:700;
    cursor:pointer; letter-spacing:.05em;
    transition:transform .2s,box-shadow .2s;
  }
  .ts-hero-cta:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(232,255,71,.3); }
  .ts-hero-stats {
    display:flex; flex-wrap:wrap; gap:clamp(20px,3vw,40px);
    margin-top:clamp(28px,4vw,48px);
    border-top:1px solid var(--border);
    padding-top:clamp(20px,3vw,32px);
  }
  .ts-stat-num { font-family:var(--mono); font-size:clamp(1.2rem,2.5vw,1.6rem); color:var(--accent); font-weight:700; }
  .ts-stat-label { font-size:.72rem; color:var(--muted); margin-top:2px; }
  .ts-featured-section { padding:clamp(28px,4vw,48px) var(--pad); }
`;

const FEATURED_IDS = [1, 4, 8, 9];

export default function HomePage({ setPage, onAdd, onView }) {
  const featured = PRODUCTS.filter(p => FEATURED_IDS.includes(p.id));
  return (
    <>
      <style>{styles}</style>
      <section className="ts-hero">
        <div className="ts-container">
          <div className="ts-hero-inner">
            <div className="ts-hero-tag">New Collection 2025</div>
            <h1>Tech <span>Accessories</span><br/>Shop</h1>
            <p className="ts-hero-sub">Discover high-quality gadgets and accessories for your modern lifestyle.</p>
            <button className="ts-hero-cta" onClick={() => setPage("products")}>SHOP NOW →</button>
            <div className="ts-hero-stats">
              <div><div className="ts-stat-num">20+</div><div className="ts-stat-label">Products</div></div>
              <div><div className="ts-stat-num">4</div><div className="ts-stat-label">Categories</div></div>
              <div><div className="ts-stat-num">$6</div><div className="ts-stat-label">Starting From</div></div>
            </div>
          </div>
        </div>
      </section>
      <div className="ts-featured-section">
        <div className="ts-container">
          <div className="ts-section-h">Featured Products</div>
          <div className="ts-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} onView={onView}/>)}
          </div>
        </div>
      </div>
    </>
  );
}
