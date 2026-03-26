/**
 * context/AppContext.jsx
 * Provides: page routing, auth state, cart state to entire app.
 */
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  getCurrentUsername, loginUser, logoutUser, registerUser,
  getCart, saveCart,
} from "../utils/authCart";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ── Routing ──────────────────────────────────────────────────────────────
  const [page,   setPageRaw] = useState("home");
  const [detail, setDetail]  = useState(null);   // current product for detail view

  const setPage = useCallback((p) => {
    setDetail(null);
    setPageRaw(p);
    window.scrollTo(0, 0);
  }, []);

  const viewDetail = useCallback((product) => {
    setDetail(product);
    setPageRaw("detail");
    window.scrollTo(0, 0);
  }, []);

  // ── Auth ─────────────────────────────────────────────────────────────────
  const [user, setUser] = useState(() => getCurrentUsername());

  const handleLogin = useCallback((username, password) => {
    const res = loginUser(username, password);
    if (res.ok) {
      setUser(username);
      setCart(getCart()); // reload merged cart
      setPage("home");
    }
    return res;
  }, [setPage]);

  const handleRegister = useCallback((username, email, password) => {
    return registerUser(username, email, password);
  }, []);

  const handleLogout = useCallback(() => {
    logoutUser();
    setUser(null);
    setCart(getCart()); // switch back to guest cart
    setPage("home");
  }, [setPage]);

  // ── Cart ──────────────────────────────────────────────────────────────────
  const [cart, setCart] = useState(() => getCart());

  // Re-sync cart whenever auth user changes
  useEffect(() => { setCart(getCart()); }, [user]);

  const addToCart = useCallback((product) => {
    const current = getCart();
    const existing = current.find(i => i.id === product.id);
    if (existing) existing.quantity++;
    else current.push({
      id:       product.id,
      name:     product.name,
      price:    product.price,
      quantity: 1,
      emoji:    product.emoji,
    });
    saveCart(current);
    setCart([...current]);
  }, []);

  const updateQty = useCallback((idx, qty) => {
    if (qty < 1) return;
    setCart(prev => {
      const next = prev.map((item, i) => i === idx ? { ...item, quantity: qty } : item);
      saveCart(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((idx) => {
    setCart(prev => {
      const next = prev.filter((_, i) => i !== idx);
      saveCart(next);
      return next;
    });
  }, []);

  const cartCount = cart.reduce((s, i) => s + (i.quantity || 0), 0);

  // ── Toast ─────────────────────────────────────────────────────────────────
  const [toast, setToast] = useState(null);
  const showToast = useCallback((msg) => setToast(msg), []);

  return (
    <AppContext.Provider value={{
      // routing
      page, setPage, detail, viewDetail,
      // auth
      user, handleLogin, handleRegister, handleLogout,
      // cart
      cart, cartCount, addToCart, updateQty, removeItem,
      // toast
      toast, setToast, showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
