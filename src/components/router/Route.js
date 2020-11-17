import React, { useEffect, useState } from "react";

const Route = ({ path, children }) => {
    const [currentPatch, setCurrentPatch] = useState(window.location.pathname);
    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPatch(window.location.pathname);
        };
        window.addEventListener("popstate", onLocationChange);
        return () => {
            window.removeEventListener("popstate", onLocationChange);
        };
    }, []);
    return currentPatch === path ? children : null;
};
export default Route;
