import { useEffect, useState } from "preact/hooks";

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const checkWindowResolution = () => {
    const windowWidth = window.innerWidth;
    const isMobileDevice = windowWidth <= 1024; // Adjust the values as per your requirements

    setIsMobile(isMobileDevice);
  };
  useEffect(() => {
    // Call the checkWindowResolution function on component mount
    checkWindowResolution();

    // Attach a resize event listener to update the mobile status on window resize
    window.addEventListener("resize", checkWindowResolution);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkWindowResolution);
    };
  }, []);
  // Event handler for window resize
  const handleResize = () => {
    checkWindowResolution(); // Re-evaluate the window resolution
  };

  useEffect(() => {
    // Attach the event handler to the resize event
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return isMobile;
}
