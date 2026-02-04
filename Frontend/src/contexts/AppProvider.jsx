import React from 'react'
import { AuthProvider } from "./AuthContext.jsx";
import { MenuProvider } from "./MenuContext.jsx";
import { CartProvider } from "./CartContext.jsx";

function AppProvider({ children }) {
  return (
    <AuthProvider>
      <MenuProvider>
        <CartProvider>
          {children}
      </CartProvider>
      </MenuProvider>
    </AuthProvider>
  )
}

export default AppProvider