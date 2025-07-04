import React, { useEffect, useRef, useState } from "react";

const TrailingCursor = () => {
    const cursorRef = useRef(null);
    const trailRefs = useRef([]);
    const trailCount = 8; // number of trailing dots

    const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const cursorPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const trailPositions = useRef(
        new Array(trailCount).fill({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    );

    const [isClicked, setIsClicked] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const onMouseMove = (e) => {
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;
        };

        const onMouseDown = () => setIsClicked(true);
        const onMouseUp = () => setIsClicked(false);

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        // Hover state for links/buttons
        const addHoverEvents = () => {
            document.querySelectorAll("a, button").forEach((el) => {
                el.addEventListener("mouseenter", () => setIsHovering(true));
                el.addEventListener("mouseleave", () => setIsHovering(false));
            });
        };
        addHoverEvents();

        let frameId;

        const animate = () => {
            frameId = requestAnimationFrame(animate);

            // Smoothly interpolate main cursor position
            cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.2;
            cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.2;

            // Update main cursor
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`;
            }

            // Move trailing dots, each follows the position of the previous one
            trailPositions.current = trailPositions.current.map((pos, i) => {
                if (i === 0) {
                    // first dot follows main cursor slower
                    const dx = cursorPos.current.x - pos.x;
                    const dy = cursorPos.current.y - pos.y;
                    return {
                        x: pos.x + dx * 0.3,
                        y: pos.y + dy * 0.3,
                    };
                } else {
                    // others follow the previous dot
                    const prevPos = trailPositions.current[i - 1];
                    const dx = prevPos.x - pos.x;
                    const dy = prevPos.y - pos.y;
                    return {
                        x: pos.x + dx * 0.3,
                        y: pos.y + dy * 0.3,
                    };
                }
            });

            // Update DOM positions for trail dots
            trailPositions.current.forEach((pos, i) => {
                if (trailRefs.current[i]) {
                    trailRefs.current[i].style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
                }
            });
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <>
            {/* Main cursor */}
            <div
                ref={cursorRef}
                className={`cursor ${isClicked ? "clicked" : ""} ${isHovering ? "hovering" : ""}`}
            />

            {/* Trailing dots */}
            {Array.from({ length: trailCount }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => (trailRefs.current[i] = el)}
                    className="trail-dot"
                    style={{
                        // progressively smaller and more transparent
                        width: `${20 - i * 2}px`,
                        height: `${20 - i * 2}px`,
                        opacity: `${(1 - i / trailCount) * 0.6}`,
                        zIndex: 9998 - i,
                    }}
                />
            ))}

            <style>{`
        .cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.9);
          pointer-events: none;
          mix-blend-mode: difference;
          will-change: transform, width, height, background-color;
          transition: width 0.2s ease, height 0.2s ease, background-color 0.2s ease;
          z-index: 9999;
        }
        .cursor.clicked {
          width: 20px;
          height: 20px;
          background-color: rgba(255, 100, 100, 0.9);
          transition: width 0.1s ease, height 0.1s ease, background-color 0.1s ease;
        }
        .cursor.hovering {
          width: 40px;
          height: 40px;
          background-color: rgba(100, 200, 255, 0.9);
          transition: width 0.1s ease, height 0.1s ease, background-color 0.1s ease;
        }
        .trail-dot {
          position: fixed;
          top: 0;
          left: 0;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
          pointer-events: none;
          mix-blend-mode: difference;
          will-change: transform, opacity;
          transition: background-color 0.2s ease;
          z-index: 9998;
        }
      `}</style>
        </>
    );
};

export default TrailingCursor;
