import React from "react";

const styles = `
  .ts-footer {
    background: var(--surface); border-top: 1px solid var(--border);
    padding: clamp(32px,5vw,52px) var(--pad);
  }
  .ts-footer-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
  }
  @media (max-width: 900px) { .ts-footer-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 480px) { .ts-footer-grid { grid-template-columns: 1fr; gap:20px; } }
  .ts-footer-brand { font-family:var(--mono);font-size:1.1rem;color:var(--accent);font-weight:700;margin-bottom:8px; }
  .ts-footer-tagline { font-size:.78rem;color:var(--muted);line-height:1.6; }
  .ts-footer-h { font-family:var(--mono);font-size:.6rem;color:var(--muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:14px; }
  .ts-footer-link { display:block;color:var(--muted);font-size:.82rem;margin-bottom:8px;text-decoration:none;cursor:pointer;transition:color .2s; }
  .ts-footer-link:hover { color:var(--text); }
  .ts-footer-bottom { margin-top:32px;padding-top:18px;border-top:1px solid var(--border);text-align:center;font-size:.72rem;color:var(--muted); }
`;

export default function Footer({ setPage }) {
  return (
    <>
      <style>{styles}</style>
      <footer className="ts-footer">
        <div className="ts-container">
          <div className="ts-footer-grid">
            <div>
              <div className="ts-footer-brand">TECHSHOP</div>
              <div className="ts-footer-tagline">ទិញអីទិញទៅ អោយតែលុយមក​</div>
            </div>
            <div>
              <div className="ts-footer-h">Quick Links</div>
              {[["home","Home"],["products","Products"],["contact","Contact"]].map(([p,l]) => (
                <span key={p} className="ts-footer-link" onClick={() => setPage(p)}>{l}</span>
              ))}
            </div>
            <div>
              <div className="ts-footer-h">Contact</div>
              <span className="ts-footer-link">+855 886-855-271</span>
              <span className="ts-footer-link">techshopoffice@gmail.com</span>
            </div>
            <div>
              <div className="ts-footer-h">Social</div>
              <a className="ts-footer-link" href="https://t.me/HORSOHENG" target="_blank" rel="noreferrer">Telegram</a>
              <a className="ts-footer-link" href="https://www.facebook.com/heng.mayweather" target="_blank" rel="noreferrer">Facebook</a>
            </div>
          </div>
          <div className="ts-footer-bottom">© 2025 TechShop. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
