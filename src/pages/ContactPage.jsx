import React, { useState } from "react";

const styles = `
  .ts-contact { padding:clamp(24px,4vw,48px) var(--pad); }
  .ts-contact-inner { max-width:960px; margin:0 auto; }
  .ts-contact-grid {
    display:grid;
    grid-template-columns:1fr 280px;
    gap:clamp(16px,3vw,28px);
    align-items:start;
  }
  @media(max-width:720px) { .ts-contact-grid { grid-template-columns:1fr; } }

  .ts-form-box {
    background:var(--surface);border:1px solid var(--border);
    border-radius:10px;padding:clamp(20px,3vw,28px);
  }
  .ts-form-h { font-family:var(--mono);font-size:.9rem;margin-bottom:22px; }
  .ts-form-row {
    display:grid; grid-template-columns:1fr 1fr;
    gap:12px; margin-bottom:12px;
  }
  @media(max-width:480px) { .ts-form-row { grid-template-columns:1fr; } }
  .ts-form-label { font-size:.7rem;color:var(--muted);margin-bottom:5px;display:block;font-family:var(--mono);letter-spacing:.05em; }
  .ts-form-input, .ts-form-textarea {
    width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);
    border-radius:var(--radius);padding:10px 12px;font-family:var(--sans);font-size:.86rem;transition:border-color .2s;
  }
  .ts-form-input:focus,.ts-form-textarea:focus { outline:none;border-color:var(--accent); }
  .ts-form-input::placeholder,.ts-form-textarea::placeholder { color:var(--muted); }
  .ts-form-textarea { resize:vertical;min-height:110px; }
  .ts-captcha { display:flex;align-items:center;gap:10px;margin:14px 0;font-size:.83rem;color:var(--muted); }
  .ts-captcha input { accent-color:var(--accent);cursor:pointer; }
  .ts-form-actions { display:flex;gap:10px;flex-wrap:wrap; }
  .ts-form-btn {
    background:var(--accent);color:#000;border:none;padding:11px 24px;
    font-family:var(--mono);font-size:.8rem;font-weight:700;
    border-radius:var(--radius);cursor:pointer;transition:opacity .2s;flex:1;
  }
  .ts-form-btn:hover { opacity:.85; }
  .ts-form-btn-outline {
    background:none;color:var(--muted);border:1px solid var(--border);
    padding:11px 18px;font-family:var(--mono);font-size:.8rem;
    border-radius:var(--radius);cursor:pointer;transition:all .2s;
  }
  .ts-form-btn-outline:hover { border-color:var(--text);color:var(--text); }
  .ts-form-sent { font-size:.78rem;color:var(--accent2);margin-bottom:10px; }

  .ts-info-card {
    background:var(--surface);border:1px solid var(--border);
    border-radius:10px;padding:clamp(18px,3vw,24px);
  }
  .ts-info-item { margin-bottom:20px; }
  .ts-info-key { font-family:var(--mono);font-size:.6rem;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;margin-bottom:5px; }
  .ts-info-val { font-size:.87rem;color:var(--text);line-height:1.5; }
  .ts-info-val a { color:var(--accent2);text-decoration:none; }
  .ts-social-row { display:flex;gap:8px;margin-top:18px;flex-wrap:wrap; }
  .ts-social-btn {
    background:var(--bg);border:1px solid var(--border);color:var(--muted);
    padding:7px 12px;border-radius:var(--radius);font-size:.77rem;
    cursor:pointer;transition:all .2s;text-decoration:none;display:inline-block;
  }
  .ts-social-btn:hover { border-color:var(--accent);color:var(--accent); }
`;

const BLANK = { firstName:"",lastName:"",email:"",phone:"",message:"",notRobot:false };

export default function ContactPage() {
  const [form, setForm] = useState(BLANK);
  const [sent, setSent] = useState(false);

  const handle = f => e =>
    setForm(v => ({ ...v, [f]: e.target.type==="checkbox" ? e.target.checked : e.target.value }));

  const submit = e => {
    e.preventDefault();
    if (!form.notRobot) { alert("សូមបញ្ជាក់ថាអ្នកមិនមែន AI។"); return; }
    let text = "New contact from TechShop\n\n";
    text += `ឈ្មោះ: ${form.firstName} ${form.lastName}\n`;
    text += `លេខទូរស័ព្ទ: ${form.phone}\nអ៊ីមែល: ${form.email}\n\nសារ: ${form.message}`;
    window.location.href = `https://t.me/HORSOHENG?text=${encodeURIComponent(text)}`;
    setSent(true);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="ts-contact">
        <div className="ts-contact-inner">
          <h2 className="ts-page-h">Contact Us</h2>
          <div className="ts-contact-grid">
            <div className="ts-form-box">
              <h3 className="ts-form-h">សូមបំពេញព័ត៌មាន</h3>
              <form onSubmit={submit}>
                <div className="ts-form-row">
                  <div>
                    <label className="ts-form-label">ឈ្មោះ *</label>
                    <input className="ts-form-input" value={form.firstName} onChange={handle("firstName")} required/>
                  </div>
                  <div>
                    <label className="ts-form-label">នាមត្រកូល *</label>
                    <input className="ts-form-input" value={form.lastName} onChange={handle("lastName")} required/>
                  </div>
                </div>
                <div className="ts-form-row">
                  <div>
                    <label className="ts-form-label">អ៊ីមែល *</label>
                    <input className="ts-form-input" type="email" value={form.email} onChange={handle("email")} required/>
                  </div>
                  <div>
                    <label className="ts-form-label">លេខទូរស័ព្ទ *</label>
                    <input className="ts-form-input" type="tel" value={form.phone} onChange={handle("phone")} required/>
                  </div>
                </div>
                <div style={{marginBottom:12}}>
                  <label className="ts-form-label">សារ *</label>
                  <textarea className="ts-form-textarea" value={form.message} onChange={handle("message")} required/>
                </div>
                <div className="ts-captcha">
                  <input type="checkbox" id="robot" checked={form.notRobot} onChange={handle("notRobot")}/>
                  <label htmlFor="robot">I'm not AI</label>
                </div>
                {sent && <p className="ts-form-sent">Opening Telegram — press Send to complete.</p>}
                <div className="ts-form-actions">
                  <button className="ts-form-btn" type="submit">ផ្ញើសារ</button>
                  <button className="ts-form-btn-outline" type="button" onClick={()=>{setForm(BLANK);setSent(false);}}>សម្អាត</button>
                </div>
              </form>
            </div>

            <div className="ts-info-card">
              <div className="ts-info-item">
                <div className="ts-info-key">ទំនាក់ទំនង</div>
                <div className="ts-info-val">0886855271</div>
              </div>
              <div className="ts-info-item">
                <div className="ts-info-key">អ៊ីមែល</div>
                <div className="ts-info-val"><a href="mailto:techshopoffice@gmail.com">techshopoffice@gmail.com</a></div>
              </div>
              <div className="ts-info-item">
                <div className="ts-info-key">អាសយដ្ឋាន</div>
                <div className="ts-info-val">ផ្លូវលេខ​១០៩ សង្កាត់មនោរម្យ ខណ្ឌ៧មករា រាជធានីភ្នំពេញ</div>
              </div>
              <div className="ts-social-row">
                <a className="ts-social-btn" href="https://t.me/HORSOHENG" target="_blank" rel="noreferrer">Telegram</a>
                <a className="ts-social-btn" href="mailto:techshopoffice@gmail.com">Email</a>
                <a className="ts-social-btn" href="https://www.facebook.com/heng.mayweather" target="_blank" rel="noreferrer">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
