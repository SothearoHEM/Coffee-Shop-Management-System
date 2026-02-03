import React from 'react'
import { AuthProvider } from "./AuthContext.jsx";

function AppProvider({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

export default AppProvider