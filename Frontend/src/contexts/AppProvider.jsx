import React from 'react'
import { AuthProvider } from "./AuthContext.jsx";
import { MenuProvider } from "./MenuContext.jsx";
import { CartProvider } from "./CartContext.jsx";
import { InventoryProvider } from "./InventoryContext.jsx";
import { OrderProvider } from "./OrderContext.jsx";

function AppProvider({ children }) {
  return (
    <AuthProvider>
      <MenuProvider>
        <CartProvider>
          <InventoryProvider>
            <OrderProvider>
            {children}
            </OrderProvider>
          </InventoryProvider>
      </CartProvider>
      </MenuProvider>
    </AuthProvider>
  )
}

export default AppProvider