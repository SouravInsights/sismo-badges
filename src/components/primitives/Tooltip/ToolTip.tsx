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
  transform-origin: ${(p) => createPosition(p.placment).negate()};
`;

// Function to create a position utility object
const createPosition = (current: string) => {
  // Mapping object for negating positions
  const negateMap = {
    left: "right",
    right: "left",
    top: "bottom",
    bottom: "top",
  };

  // Object with current position and utility methods
  return {
    current,
    // Method to get the negated position
    negate: () => negateMap[current],
    // Check if the current position is horizontal
    isHorizontal: () => ["left", "right"].includes(current),
    // Check if the current position is vertical
    isVertical: () => ["top", "bottom"].includes(current),
  };
};

// Interface representing a point with x and y coordinates
interface Point {
  x: number | null;
  y: number | null;
  // Set x and y coordinates
  setCoordinates: (coordinates: { x: number; y: number }) => void;
  // Restrict x and y coordinates to a given rectangle
  restrictToRect: (rect: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  }) => void;
}

// Utility function to create a point-like object
const createPoint = (): Point => ({
  x: null,
  y: null,
  setCoordinates({ x, y }) {
    this.x = x;
    this.y = y;
  },
  restrictToRect({ left, top, right, bottom }) {
    this.x = Math.max(left, Math.min(this.x!, right));
    this.y = Math.max(top, Math.min(this.y!, bottom));
  },
});

// Main function to calculate tooltip position
const calculateTooltipPosition = (
  target: HTMLElement,
  tooltip: HTMLElement,
  placement: string,
  sideOffset: number
): Point => {
  // Create a point-like object to represent tooltip position
  const tooltipPosition = createPoint();
  // Define boundaries of the viewport
  const boundaries = {
    left: sideOffset,
    top: sideOffset,
    right: document.body.clientWidth - (tooltip.clientWidth + sideOffset),
    bottom: window.innerHeight - (tooltip.clientHeight + sideOffset),
  };
  // Get bounding rectangle of the target element
  const targetRect = target.getBoundingClientRect();
  // Get position information based on the specified placement
  const positionInfo = createPosition(placement);

  // Attempt to calculate position up to three times
  for (let attempt = 0; attempt < 3; attempt++) {
    switch (positionInfo.current) {
      case "left":
        // Calculate tooltip position to the left of the target element
        tooltipPosition.setCoordinates({
          x: targetRect.left - (tooltip.offsetWidth + sideOffset),
          y: targetRect.top + (target.offsetHeight - tooltip.offsetHeight) / 2,
        });
        break;
      case "right":
        // Calculate tooltip position to the right of the target element
        tooltipPosition.setCoordinates({
          x: targetRect.right + sideOffset,
          y: targetRect.top + (target.offsetHeight - tooltip.offsetHeight) / 2,
        });
        break;
      case "top":
        // Calculate tooltip position above the target element
        tooltipPosition.setCoordinates({
          x: targetRect.left + (target.offsetWidth - tooltip.offsetWidth) / 2,
          y: targetRect.top - (tooltip.offsetHeight + sideOffset),
        });
        break;
      default: // "bottom"
        // Calculate tooltip position below the target element
        tooltipPosition.setCoordinates({
          x: targetRect.left + (target.offsetWidth - tooltip.offsetWidth) / 2,
          y: targetRect.bottom + sideOffset,
        });
    }

    // Break the loop if the position is within boundaries
    if (
      tooltipPosition.x! >= boundaries.left &&
      tooltipPosition.x! <= boundaries.right &&
      tooltipPosition.y! >= boundaries.top &&
      tooltipPosition.y! <= boundaries.bottom
    ) {
      break;
    }

    // Try the opposite position in the next attempt
    positionInfo.current = positionInfo.negate();
  }

  // Restrict tooltip position to the viewport boundaries
  tooltipPosition.restrictToRect(boundaries);

  // Return the calculated tooltip position
  return tooltipPosition;
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
    posRef.current = calculateTooltipPosition(
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
