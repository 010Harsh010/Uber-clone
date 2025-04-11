import React ,{ createContext, useState } from "react";

export const SidebarContext = createContext();

const SidebarProvider = ({children}) => {
    const [sideOpen,setsideOpen] = useState(false);
    return (
        <SidebarContext.Provider value={{sideOpen,setsideOpen}}>
            {children}
        </SidebarContext.Provider>
    )
}

export default SidebarProvider;