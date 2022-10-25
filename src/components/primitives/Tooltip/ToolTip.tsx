import styled from "styled-components";
import React, { useState, useRef } from "react";
import { Portal } from "../Portal";

const StyledTooltip = styled.span.attrs((p: any) => p)`
  width: 280px;
  padding: 10px;
  text-align: start;
  background-color: #1c2847;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  color: #e9ecff;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  border-radius: 6px;
  position: fixed;
  top: ${(p) => p.posRef.current.y}px;
  left: ${(p) => p.posRef.current.x}px;
  pointer-events: none;
  z-index: 1;
  display: inline-block;
  white-space: wrap;
  opacity: ${(p) => p.show};
  transform-origin: ${(p) => position(p.placment).negate()};
`;

const position = (p) => ({
  current: p,
  negate() {
    if (this.current === "left") return "right";
    if (this.current === "right") return "left";
    if (this.current === "top") return "bottom";
    if (this.current === "bottom") return "top";
  },
  isHorizontal() {
    return this.current === "left" || this.current === "right";
  },
  isVertical() {
    return this.current === "top" || this.current === "bottom";
  },
});

const point = () => ({
  x: null,
  y: null,
  reset(p) {
    this.x = p.x;
    this.y = p.y;
  },
  restrictRect(rect) {
    if (this.x < rect.l) this.x = rect.l;
    else if (this.x > rect.r) this.x = rect.r;
    if (this.y < rect.t) this.y = rect.t;
    else if (this.y > rect.b) this.y = rect.b;
  },
});

const getPoint = (el, tt, placement, sideOffset) => {
  let recurCount = 0;
  const pt = point();
  const bdys = {
    l: sideOffset,
    t: sideOffset,
    r: document.body.clientWidth - (tt.clientWidth + sideOffset),
    b: window.innerHeight - (tt.clientHeight + sideOffset),
  };
  const elRect = el.getBoundingClientRect();

  return (function recursive(placement) {
    recurCount++;
    const pos = position(placement);
    switch (pos.current) {
      case "left":
        pt.x = elRect.left - (tt.offsetWidth + sideOffset);
        pt.y = elRect.top + (el.offsetHeight - tt.offsetHeight) / 2;
        break;
      case "right":
        pt.x = elRect.right + sideOffset;
        pt.y = elRect.top + (el.offsetHeight - tt.offsetHeight) / 2;
        break;
      case "top":
        pt.x = elRect.left + (el.offsetWidth - tt.offsetWidth) / 2;
        pt.y = elRect.top - (tt.offsetHeight + sideOffset);
        break;
      default:
        pt.x = elRect.left + (el.offsetWidth - tt.offsetWidth) / 2;
        pt.y = elRect.bottom + sideOffset;
    }

    if (recurCount < 3)
      if (
        (pos.isHorizontal() && (pt.x < bdys.l || pt.x > bdys.r)) ||
        (pos.isVertical() && (pt.y < bdys.t || pt.y > bdys.b))
      ) {
        pt.reset(recursive(pos.negate()));
      }

    pt.restrictRect(bdys);

    return pt;
  })(placement);
};

export const ToolTip = ({
  content,
  placement = "bottom",
  sideOffset = 15,
  children,
  disabled = 0,
}: any) => {
  const [show, setShow] = useState(0);
  const posRef = useRef({ x: 0, y: 0 });
  const tooltipRef = useRef();

  const handleMOver = (e) => {
    setShow(1);
    posRef.current = getPoint(
      e.currentTarget,
      tooltipRef.current,
      placement,
      sideOffset
    );
  };
  const handleMOut = () => setShow(0);

  return (
    <>
      {disabled
        ? children
        : React.cloneElement(children, {
            onMouseOver: handleMOver,
            onMouseOut: handleMOut,
          })}
      {disabled || (
        <Portal>
          <StyledTooltip ref={tooltipRef} posRef={posRef} show={show}>
            {content}
          </StyledTooltip>
        </Portal>
      )}
    </>
  );
};
