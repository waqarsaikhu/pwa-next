import React, { createContext, useState } from "react";

interface ClientContextProps {
  formData: any;
}

export const ClientContext = createContext<ClientContextProps>({
  formData: {},
});

export const ClientProvider = ({ children }: any) => {
  const [formDataState, setFormDataState] = useState({});

  return (
    <ClientContext.Provider value={{ formData: formDataState }}>
      {children}
    </ClientContext.Provider>
  );
};
