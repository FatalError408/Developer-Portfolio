
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Flag to track React initialization
window.reactLoaded = false;

// Error handling for React rendering
const renderApp = () => {
  try {
    console.log("Starting to mount React app...");
    console.log("Window location:", window.location.href);
    
    // This ensures React app mounts properly regardless of the base URL path
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      throw new Error('Failed to find the root element');
    }

    console.log("Found root element, mounting React app");
    
    // Clean root element before mounting to prevent hydration issues
    while (rootElement.firstChild && !(rootElement.firstChild instanceof Comment)) {
      rootElement.removeChild(rootElement.firstChild);
    }
    
    const root = createRoot(rootElement);
    root.render(<App />);
    
    // Hide loading indicator if it exists
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
    }
    
    console.log("React app mounted successfully");
    window.reactLoaded = true;
  } catch (error) {
    console.error("Error rendering React application:", error);
    
    // Display error to user
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; text-align: center;">
          <h1 style="color: #e74c3c;">Application Error</h1>
          <p>Sorry, there was a problem loading the application.</p>
          <p>Please check the browser console for more information or try refreshing the page.</p>
          <pre style="background: #f8f8f8; padding: 10px; border-radius: 5px; text-align: left; margin-top: 20px; overflow: auto;">${error?.toString()}</pre>
        </div>
      `;
    }
    
    // Also update the error display if it exists
    const errorMessage = document.getElementById('error-message');
    const errorDisplay = document.getElementById('error-display');
    if (errorMessage && errorDisplay) {
      errorMessage.textContent = error?.toString() || 'Unknown error';
      errorDisplay.style.display = 'block';
    }
  }
};

// Execute app mounting with a slight delay to ensure DOM is ready
console.log("main.tsx executed, preparing to render app");
setTimeout(renderApp, 10);

// Add additional window global
declare global {
  interface Window {
    reactLoaded: boolean;
  }
}
