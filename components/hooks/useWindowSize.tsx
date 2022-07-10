import { useEffect, useState } from "react";

export function useWindowSize() {
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});

	function handleResize() {
		if (typeof window !== "undefined") {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
	}

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("resize", handleResize);
			handleResize();
			return () => window.removeEventListener("resize", handleResize);
		}
	}, []);
	return windowSize;
}
