
import { useState, useEffect } from "react";

export const useAvailabilityStatus = () => {
  const [isAvailableForWork, setIsAvailableForWork] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Load availability status from localStorage
  useEffect(() => {
    const checkStatus = () => {
      const savedStatus = localStorage.getItem("availability_status");
      if (savedStatus) {
        setIsAvailableForWork(savedStatus === "available");
      }
      setIsLoading(false);
    };

    checkStatus();

    // Set up an event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "availability_status") {
        setIsAvailableForWork(e.newValue === "available");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Custom event for same-tab updates
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.key === "availability_status") {
        setIsAvailableForWork(customEvent.detail.value === "available");
      }
    };

    window.addEventListener("availabilityStatusChange", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("availabilityStatusChange", handleCustomEvent);
    };
  }, []);

  // Function to update availability status
  const updateAvailabilityStatus = (available: boolean) => {
    const newValue = available ? "available" : "unavailable";
    localStorage.setItem("availability_status", newValue);
    
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(
      new CustomEvent("availabilityStatusChange", {
        detail: { key: "availability_status", value: newValue }
      })
    );
    
    setIsAvailableForWork(available);
  };

  return { isAvailableForWork, updateAvailabilityStatus, isLoading };
};
