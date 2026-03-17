"use client";

import { createContext, useContext, useState } from "react";

const VisitorContext = createContext();

export function VisitorProvider({ children }) {
    const [editing, setEditing] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const triggerRefresh = () => setRefresh((prev) => !prev);

    return (
        <VisitorContext.Provider value={{ editing, setEditing, refresh, triggerRefresh }}>
            {children}
        </VisitorContext.Provider>
    );
}

export function useVisitor() {
    return useContext(VisitorContext);
}