import React, { useState } from "react";

const styles = `
  .ts-nav {
    position: sticky; top: 0; z-index: 200;
    background: rgba(13,13,13,.96); backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
    height: var(--nav-h);
  }
  .ts-nav-inner {
    display: flex; align-items: center; justify-content: space-between;
    height: 100%; gap: 12px;
  }
  .ts-brand {
    font-family: var(--mono); font-size: 1.05rem; font-weight: 700;
    color: var(--accent); cursor: pointer; user-select: none;
    letter-spacing: .05em; white-space: nowrap; flex-shrink: 0;
  }
  .ts-nav-links { display: flex; gap: 2px; align-items: center; }
  .ts-nav-btn {
    background: none; border: none; color: var(--muted);
    font-family: var(--sans); font-size: .83rem; font-weight: 500;
    padding: 6px 12px; border-radius: var(--radius);
    cursor: pointer; transition: all .2s; white-space: nowrap;
  }
  .ts-nav-btn:hover, .ts-nav-btn.active { color: var(--text); background: var(--border); }
  .ts-nav-user {
    font-size: .76rem; color: var(--muted);
    padding: 0 10px; border-left: 1px solid var(--border);
    margin-left: 4px; white-space: nowrap;
  }
  .ts-nav-user span { color: var(--accent2); }
  .ts-cart-btn {
    background: var(--accent); border: none;
    font-family: var(--mono); font-size: .76rem; font-weight: 700;
    padding: 8px 16px; border-radius: var(--radius);
    cursor: pointer; color: #000;
    display: flex; align-items: center; gap: 8px;
    white-space: nowrap; transition: opacity .2s; flex-shrink: 0;
  }
  .ts-cart-btn:hover { opacity: .85; }
  .ts-badge {
    background: #000; color: var(--accent);
    border-radius: 99px; padding: 1px 6px;
    font-size: .66rem; font-weight: 700; min-width: 18px; text-align: center;
  }
  .ts-hamburger {
    display: none; background: none; border: 1px solid var(--border);
    color: var(--text); padding: 6px 10px; border-radius: var(--radius);
    cursor: pointer; font-size: 1.1rem; line-height: 1; flex-shrink: 0;
  }
  /* mobile drawer */
  .ts-drawer {
    display: none;
    position: fixed; top: var(--nav-h); left: 0; right: 0; bottom: 0;
    background: rgba(13,13,13,.98);
    padding: 20px var(--pad) 32px;
    flex-direction: column; gap: 4px;
    z-index: 199; overflow-y: auto;
    animation: drawerIn .2s ease;
  }
  .ts-drawer.open { display: flex; }
  @keyframes drawerIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
  .ts-drawer-btn {
    background: none; border: none; color: var(--muted);
    font-family: var(--sans); font-size: 1rem; font-weight: 500;
    padding: 13px 14px; border-radius: var(--radius);
    cursor: pointer; text-align: left; transition: all .2s;
  }
  .ts-drawer-btn:hover, .ts-drawer-btn.active { color: var(--text); background: var(--border); }
  .ts-drawer-divider { height: 1px; background: var(--border); margin: 10px 0; }
  .ts-drawer-cart {
    margin-top: 8px; background: var(--accent); color: #000; border: none;
    font-family: var(--mono); font-size: .85rem; font-weight: 700;
    padding: 14px; border-radius: var(--radius); cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  @media (max-width: 768px) {
    .ts-nav-links { display: none; }
    .ts-cart-btn  { display: none; }
    .ts-hamburger { display: block; }
  }
`;

const LINKS = [["home","Home"],["products","Products"],["contact","Contact"]];

export default function Navbar({ page, setPage, cartCount, user, onLogout }) {
  const [open, setOpen] = useState(false);
  const go = p => { setPage(p); setOpen(false); };

  return (
    <>
      <style>{styles}</style>
      <nav className="ts-nav">
        <div className="ts-container ts-nav-inner">
          <span className="ts-brand" onClick={() => go("home")}>TECHSHOP</span>

          {/* desktop */}
          <div className="ts-nav-links">
            {LINKS.map(([p,l]) => (
              <button key={p} className={`ts-nav-btn${page===p?" active":""}`} onClick={() => go(p)}>{l}</button>
            ))}
            {user ? (
              <>
                <span className="ts-nav-user">Hi, <span>{user}</span></span>
                <button className="ts-nav-btn" onClick={onLogout}>Logout</button>
              </>
            ) : (
              <button className={`ts-nav-btn${page==="account"?" active":""}`} onClick={() => go("account")}>Account</button>
            )}
          </div>

          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button className="ts-cart-btn" onClick={() => go("cart")}>
              CART <span className="ts-badge">{cartCount}</span>
            </button>
            <button className="ts-hamburger" onClick={() => setOpen(o => !o)}>
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* mobile drawer */}
      <div className={`ts-drawer${open?" open":""}`}>
        {LINKS.map(([p,l]) => (
          <button key={p} className={`ts-drawer-btn${page===p?" active":""}`} onClick={() => go(p)}>{l}</button>
        ))}
        <div className="ts-drawer-divider"/>
        {user ? (
          <>
            <span style={{fontSize:".8rem",color:"var(--muted)",padding:"6px 14px"}}>
              Hi, <span style={{color:"var(--accent2)"}}>{user}</span>
            </span>
            <button className="ts-drawer-btn" onClick={() => { onLogout(); setOpen(false); }}>Logout</button>
          </>
        ) : (
          <button className={`ts-drawer-btn${page==="account"?" active":""}`} onClick={() => go("account")}>Account</button>
        )}
        <button className="ts-drawer-cart" onClick={() => go("cart")}>
          CART <span className="ts-badge">{cartCount}</span>
        </button>
      </div>
    </>
  );
}
