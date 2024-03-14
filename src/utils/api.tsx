import React, { createContext, useContext, useState, ReactNode } from 'react';

interface APIContextType {
  startLoading: () => void;
  finishLoading: () => void;
}

const APIContext = createContext<APIContextType | undefined>(undefined);

interface APIProviderProps {
  children: ReactNode;
}

export const APIProvider: React.FC<APIProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const finishLoading = () => setLoading(false);

  return (
    <APIContext.Provider value={{ startLoading, finishLoading }}>
      {children}
      {loading && <div className="loader-overlay"><div className="loader"></div></div>}
    </APIContext.Provider>
  );
};

export const useAPI = (): APIContextType => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error('useAPI must be used within an APIProvider');
  }
  return context;
};
