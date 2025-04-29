
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Error handling for React rendering
const renderApp = () => {
  try {
    // This ensures React app mounts properly regardless of the base URL path
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      throw new Error('Failed to find the root element');
    }

    console.log("Mounting React app to root element");
    
    const root = createRoot(rootElement);
    root.render(<App />);
    
    // Hide loading indicator if it exists
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
    }
    
    console.log("React app mounted successfully");
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
  }
};

// Execute with a slight delay to ensure all scripts are loaded
setTimeout(renderApp, 100);
