import React from "react";

const styles = `
  .ts-cart { padding:clamp(24px,4vw,48px) var(--pad); }
  .ts-cart-inner { max-width:860px; margin:0 auto; }
  .ts-empty { text-align:center;padding:clamp(48px,8vw,80px) 20px;color:var(--muted); }
  .ts-empty-icon { font-size:3rem;margin-bottom:12px; }

  /* desktop table */
  .ts-table-wrap { width:100%;overflow-x:auto; }
  .ts-table { width:100%;border-collapse:collapse;min-width:520px; }
  .ts-table th {
    font-family:var(--mono);font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;
    color:var(--muted);border-bottom:1px solid var(--border);padding:10px 12px;text-align:left;
  }
  .ts-table td { padding:14px 12px;border-bottom:1px solid var(--border);vertical-align:middle;font-size:.84rem; }
  .ts-item-name { font-weight:500; }
  .ts-qty {
    width:54px;background:var(--surface);border:1px solid var(--border);color:var(--text);
    border-radius:var(--radius);padding:6px 8px;font-family:var(--mono);font-size:.82rem;text-align:center;
  }
  .ts-qty:focus { outline:none;border-color:var(--accent); }
  .ts-remove {
    background:none;border:1px solid var(--border);color:var(--muted);
    cursor:pointer;font-size:.76rem;padding:5px 10px;border-radius:var(--radius);transition:all .2s;
  }
  .ts-remove:hover { color:var(--danger);border-color:var(--danger); }

  /* mobile card list */
  .ts-cart-cards { display:none;flex-direction:column;gap:12px; }
  .ts-cart-card {
    background:var(--surface);border:1px solid var(--border);
    border-radius:8px;padding:16px;
    display:flex;gap:14px;align-items:flex-start;
  }
  .ts-cart-card-emoji { font-size:2.2rem;flex-shrink:0;line-height:1; }
  .ts-cart-card-body { flex:1;min-width:0; }
  .ts-cart-card-name { font-size:.84rem;font-weight:500;margin-bottom:6px;line-height:1.4; }
  .ts-cart-card-price { font-family:var(--mono);font-size:.88rem;color:var(--accent);margin-bottom:10px; }
  .ts-cart-card-row { display:flex;align-items:center;gap:10px;flex-wrap:wrap; }

  .ts-total-row {
    display:flex;justify-content:flex-end;align-items:center;
    gap:14px;margin-top:24px;flex-wrap:wrap;
  }
  .ts-total-label { font-family:var(--mono);font-size:.76rem;color:var(--muted); }
  .ts-total-val { font-family:var(--mono);font-size:clamp(1.2rem,2.5vw,1.5rem);color:var(--accent);font-weight:700; }
  .ts-checkout {
    display:block;width:100%;margin-top:14px;
    background:var(--accent);color:#000;border:none;padding:15px;
    font-family:var(--mono);font-size:.88rem;font-weight:700;
    border-radius:var(--radius);cursor:pointer;transition:opacity .2s,transform .2s;
  }
  .ts-checkout:hover { opacity:.85;transform:translateY(-1px); }
  .ts-checkout-sm { width:auto;padding:12px 28px;display:inline-block; }

  @media (max-width: 580px) {
    .ts-table-wrap { display:none; }
    .ts-cart-cards { display:flex; }
  }
`;

export default function CartPage({ cart, onUpdate, onRemove, setPage }) {
  const total = cart.reduce((s,i) => s + i.price * i.quantity, 0);

  const checkout = () => {
    if (!cart.length) return;
    let msg = "I want to checkout:\n\n";
    cart.forEach(i => { msg += `- ${i.name} x${i.quantity} = $${(i.price*i.quantity).toFixed(2)}\n`; });
    msg += `\nTotal: $${total.toFixed(2)}`;
    window.location.href = `https://t.me/HORSOHENG?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      <style>{styles}</style>
      <div className="ts-cart">
        <div className="ts-cart-inner">
          <h2 className="ts-page-h">Shopping Cart</h2>

          {cart.length === 0 ? (
            <div className="ts-empty">
              <div className="ts-empty-icon">🛒</div>
              <p style={{marginBottom:18}}>Your cart is empty.</p>
              <button className="ts-checkout ts-checkout-sm" onClick={() => setPage("products")}>Browse Products</button>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="ts-table-wrap">
                <table className="ts-table">
                  <thead><tr>
                    <th>Product</th><th>Price</th><th>Qty</th><th>Total</th><th></th>
                  </tr></thead>
                  <tbody>
                    {cart.map((item,i) => (
                      <tr key={item.id}>
                        <td><span style={{marginRight:8}}>{item.emoji}</span><span className="ts-item-name">{item.name}</span></td>
                        <td style={{fontFamily:"var(--mono)",color:"var(--accent)"}}>${Number(item.price).toFixed(2)}</td>
                        <td><input className="ts-qty" type="number" min="1" value={item.quantity} onChange={e=>onUpdate(i,+e.target.value)}/></td>
                        <td style={{fontFamily:"var(--mono)"}}>${(item.price*item.quantity).toFixed(2)}</td>
                        <td><button className="ts-remove" onClick={()=>onRemove(i)}>✕</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="ts-cart-cards">
                {cart.map((item,i) => (
                  <div key={item.id} className="ts-cart-card">
                    <div className="ts-cart-card-emoji">{item.emoji}</div>
                    <div className="ts-cart-card-body">
                      <div className="ts-cart-card-name">{item.name}</div>
                      <div className="ts-cart-card-price">${(item.price*item.quantity).toFixed(2)}</div>
                      <div className="ts-cart-card-row">
                        <input className="ts-qty" type="number" min="1" value={item.quantity} onChange={e=>onUpdate(i,+e.target.value)}/>
                        <span style={{fontSize:".76rem",color:"var(--muted)"}}>× ${item.price}</span>
                        <button className="ts-remove" onClick={()=>onRemove(i)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="ts-total-row">
                <span className="ts-total-label">TOTAL</span>
                <span className="ts-total-val">${total.toFixed(2)}</span>
              </div>
              <button className="ts-checkout" onClick={checkout}>CHECKOUT VIA TELEGRAM →</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
