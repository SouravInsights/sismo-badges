import { useEffect } from "react";
import { createPortal } from "react-dom";

export const Portal = ({ children }) => {
  const mount = document.getElementById("portal-container");
  const el = document.createElement("div");

  useEffect((): any => {
    mount.appendChild(el);
    return () => mount.removeChild(el);
  }, [el, mount]);

  return createPortal(children, el);
};
