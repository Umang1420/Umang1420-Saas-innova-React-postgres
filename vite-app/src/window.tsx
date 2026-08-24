import { useState, useEffect } from "react";

function Window() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            console.log("removed");
        };
    }, []);

    return (
        <div>
            <h2>Window Width: {windowWidth}px</h2>
            {windowWidth > 768 ? (
                <p>This is a wide screen layout.</p>
            ) : (
                <p>This is a mobile-friendly layout.</p>
            )}
        </div>
    );
}

export default Window;