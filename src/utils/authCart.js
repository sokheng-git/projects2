// utils/authCart.js — full port of auth-cart.js

const ls = {
  read:   (key)      => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } },
  write:  (key, val) => localStorage.setItem(key, JSON.stringify(val)),
  remove: (key)      => localStorage.removeItem(key),
  raw:    (key)      => localStorage.getItem(key),
  rawSet: (key, val) => localStorage.setItem(key, val),
};

export const getUsers   = ()     => ls.read("users") || [];
export const saveUsers  = (u)    => ls.write("users", u);
export const findUser   = (name) => getUsers().find(u => u.username === name);

export const registerUser = (username, email, password) => {
  if (!username || !password) return { ok: false, msg: "Username and password required" };
  if (findUser(username))     return { ok: false, msg: "Username already exists" };
  const users = getUsers();
  users.push({ username, email, password });
  saveUsers(users);
  return { ok: true };
};

export const loginUser = (username, password) => {
  const user = findUser(username);
  if (!user || user.password !== password) return { ok: false, msg: "Invalid credentials" };
  ls.rawSet("currentUser", username);
  mergeGuestCartToUser(username);
  return { ok: true };
};

export const logoutUser         = ()     => ls.remove("currentUser");
export const getCurrentUsername = ()     => ls.raw("currentUser") || null;

export const GUEST_CART_KEY = "cart_guest";
export const userCartKey    = (name) => `cart_user_${name}`;

export const getCart = () => {
  const u = getCurrentUsername();
  return ls.read(u ? userCartKey(u) : GUEST_CART_KEY) || [];
};

export const saveCart = (cart) => {
  const u = getCurrentUsername();
  ls.write(u ? userCartKey(u) : GUEST_CART_KEY, cart);
};

export const mergeGuestCartToUser = (username) => {
  const guestCart = ls.read(GUEST_CART_KEY) || [];
  if (!guestCart.length) return;
  const key      = userCartKey(username);
  const userCart = ls.read(key) || [];
  guestCart.forEach(gItem => {
    const ex = userCart.find(u => u.id === gItem.id);
    if (ex) ex.quantity += gItem.quantity;
    else    userCart.push(gItem);
  });
  ls.write(key, userCart);
  ls.remove(GUEST_CART_KEY);
};
