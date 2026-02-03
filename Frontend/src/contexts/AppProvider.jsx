import React from 'react'
import { AuthProvider } from "./AuthContext.jsx";
import { MenuProvider } from "./MenuContext.jsx";

function AppProvider({ children }) {
  return (
    <AuthProvider>
      <MenuProvider>
      {children}
      </MenuProvider>
    </AuthProvider>
  )
}

export default AppProvider