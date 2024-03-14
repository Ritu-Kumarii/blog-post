// api.js
import React, { createContext, useState } from 'react';

const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
  };

  const finishLoading = () => {
    setLoading(false);
  };

  return (
    <APIContext.Provider value={{ startLoading, finishLoading }}>
      {children}
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
    </APIContext.Provider>
  );
};

export const useAPI = () => {
  const context = React.useContext(APIContext);
  if (!context) {
    throw new Error('useAPI must be used within an APIProvider');
  }
  return context;
};
