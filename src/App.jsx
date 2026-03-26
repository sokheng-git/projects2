import React, { useState, useEffect, useCallback } from "react";

import Navbar       from "./components/Navbar";
import Footer       from "./components/Footer";
import Toast        from "./components/Toast";
import HomePage     from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import DetailPage   from "./pages/DetailPage";
import CartPage     from "./pages/CartPage";
import AccountPage  from "./pages/AccountPage";
import ContactPage  from "./pages/ContactPage";

import { getCart, saveCart, getCurrentUsername, logoutUser } from "./utils/authCart";
import "./styles/global.css";

export default function App() {
  const [page,   setPageRaw] = useState("home");
  const [detail, setDetail]  = useState(null);

  const setPage = useCallback(p => {
    setDetail(null);
    setPageRaw(p);
    window.scrollTo(0, 0);
  }, []);

  const viewDetail = useCallback(product => {
    setDetail(product);
    setPageRaw("detail");
    window.scrollTo(0, 0);
  }, []);

  const [user, setUser] = useState(() => getCurrentUsername());

  const handleLoginSuccess = useCallback(username => {
    setUser(username);
    setCart(getCart());
    setPage("home");
  }, [setPage]);

  const handleLogout = useCallback(() => {
    logoutUser();
    setUser(null);
    setCart(getCart());
    setPage("home");
  }, [setPage]);

  const [cart,  setCart]  = useState(() => getCart());
  const [toast, setToast] = useState(null);

  useEffect(() => { setCart(getCart()); }, [user]);

  const addToCart = useCallback(product => {
    const c = getCart();
    const ex = c.find(i => i.id === product.id);
    if (ex) ex.quantity++;
    else c.push({ ...product, quantity: 1 });
    saveCart(c);
    setCart([...c]);
    setToast(`${product.name} added to cart`);
  }, []);

  const updateQty = useCallback((idx, qty) => {
    if (qty < 1) return;
    setCart(prev => {
      const next = prev.map((item,i) => i===idx ? {...item,quantity:qty} : item);
      saveCart(next);
      return next;
    });
  }, []);

  const removeItem = useCallback(idx => {
    setCart(prev => {
      const next = prev.filter((_,i) => i!==idx);
      saveCart(next);
      return next;
    });
  }, []);

  const cartCount = cart.reduce((s,i) => s + (i.quantity||0), 0);

  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <Navbar page={page} setPage={setPage} cartCount={cartCount} user={user} onLogout={handleLogout}/>

      <main style={{flex:1,display:"flex",flexDirection:"column"}}>
        {page==="home"     && <HomePage    setPage={setPage} onAdd={addToCart} onView={viewDetail}/>}
        {page==="products" && <ProductsPage onAdd={addToCart} onView={viewDetail} initialCat="all"/>}
        {page==="detail"   && detail && <DetailPage product={detail} onAdd={addToCart} onBack={()=>setPage("products")}/>}
        {page==="cart"     && <CartPage    cart={cart} onUpdate={updateQty} onRemove={removeItem} setPage={setPage}/>}
        {page==="account"  && <AccountPage onLoginSuccess={handleLoginSuccess}/>}
        {page==="contact"  && <ContactPage/>}
      </main>
      
      <Footer setPage={setPage}/>
      {toast && <Toast key={toast+Math.random()} msg={toast} onDone={()=>setToast(null)}/>}
    </div>
  );
}
