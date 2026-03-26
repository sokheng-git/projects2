// components/Toast.jsx
import React, { useEffect } from "react";

export default function Toast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return <div className="ts-toast">{msg}</div>;
}
