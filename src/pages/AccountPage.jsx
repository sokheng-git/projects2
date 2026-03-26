import React, { useState } from "react";
import { loginUser, registerUser } from "../utils/authCart";

const styles = `
  .ts-auth {
    flex:1; display:flex; align-items:center; justify-content:center;
    padding:clamp(32px,6vw,60px) var(--pad);
    background:radial-gradient(ellipse 80% 80% at 50% 40%,rgba(232,255,71,.04) 0%,transparent 60%);
  }
  .ts-auth-box {
    background:var(--surface);border:1px solid var(--border);
    border-radius:10px;padding:clamp(24px,4vw,40px);
    width:100%;max-width:400px;
  }
  .ts-auth-title { font-family:var(--mono);font-size:1rem;margin-bottom:22px; }
  .ts-auth-tabs { display:flex;margin-bottom:26px;border:1px solid var(--border);border-radius:var(--radius);overflow:hidden; }
  .ts-auth-tab {
    flex:1;background:none;border:none;color:var(--muted);
    font-family:var(--sans);font-size:.88rem;font-weight:600;
    padding:11px;cursor:pointer;transition:all .2s;
  }
  .ts-auth-tab.active { background:var(--accent);color:#000; }
  .ts-auth-input {
    width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);
    border-radius:var(--radius);padding:12px 13px;font-family:var(--sans);font-size:.88rem;
    margin-bottom:11px;transition:border-color .2s;
  }
  .ts-auth-input:focus { outline:none;border-color:var(--accent); }
  .ts-auth-input::placeholder { color:var(--muted); }
  .ts-auth-submit {
    width:100%;background:var(--accent);color:#000;border:none;padding:13px;
    font-family:var(--mono);font-size:.83rem;font-weight:700;
    border-radius:var(--radius);cursor:pointer;margin-top:4px;transition:opacity .2s;
  }
  .ts-auth-submit:hover { opacity:.85; }
  .ts-auth-info { font-size:.75rem;color:var(--muted);text-align:center;margin-top:14px;line-height:1.5; }
  .ts-auth-msg { font-size:.78rem;padding:9px 11px;margin-bottom:10px;border-radius:var(--radius); }
  .ts-auth-msg.error   { background:rgba(255,71,71,.1);color:var(--danger); }
  .ts-auth-msg.success { background:rgba(71,200,255,.1);color:var(--accent2); }
`;

export default function AccountPage({ onLoginSuccess }) {
  const [tab,  setTab]  = useState("login");
  const [form, setForm] = useState({ username:"", email:"", password:"" });
  const [msg,  setMsg]  = useState({ text:"", type:"" });

  const handle = f => e => setForm(v => ({ ...v, [f]: e.target.value }));
  const switchTab = t => { setTab(t); setMsg({ text:"", type:"" }); };

  const submit = e => {
    e.preventDefault();
    setMsg({ text:"", type:"" });
    if (tab === "login") {
      const res = loginUser(form.username, form.password);
      if (!res.ok) { setMsg({ text:res.msg, type:"error" }); return; }
      onLoginSuccess(form.username);
    } else {
      const res = registerUser(form.username, form.email, form.password);
      if (!res.ok) { setMsg({ text:res.msg, type:"error" }); return; }
      setMsg({ text:"Registration successful! Please login.", type:"success" });
      switchTab("login");
      setForm(v => ({ ...v, password:"" }));
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="ts-auth">
        <div className="ts-auth-box">
          <h2 className="ts-auth-title">Account</h2>
          <div className="ts-auth-tabs">
            <button className={`ts-auth-tab${tab==="login"?" active":""}`}    onClick={()=>switchTab("login")}>Login</button>
            <button className={`ts-auth-tab${tab==="register"?" active":""}`} onClick={()=>switchTab("register")}>Register</button>
          </div>
          <form onSubmit={submit}>
            <input className="ts-auth-input" placeholder="Username" value={form.username} onChange={handle("username")} required/>
            {tab === "register" && (
              <input className="ts-auth-input" type="email" placeholder="Email" value={form.email} onChange={handle("email")} required/>
            )}
            <input className="ts-auth-input" type="password" placeholder="Password" value={form.password} onChange={handle("password")} required/>
            {msg.text && <div className={`ts-auth-msg ${msg.type}`}>{msg.text}</div>}
            <button className="ts-auth-submit" type="submit">
              {tab === "login" ? "LOGIN" : "REGISTER"}
            </button>
          </form>
          <p className="ts-auth-info">
            {tab === "login" ? "No account? Click Register above." : "Passwords stored locally — demo only."}
          </p>
        </div>
      </div>
    </>
  );
}
