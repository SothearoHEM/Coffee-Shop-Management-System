import React from 'react'
import { AuthProvider } from "./AuthContext.jsx";
import { MenuProvider } from "./MenuContext.jsx";
import { CartProvider } from "./CartContext.jsx";
import { InventoryProvider } from "./InventoryContext.jsx";
import { OrderProvider } from "./OrderContext.jsx";
import { UiProvider } from "./UIContext.jsx";

function AppProvider({ children }) {
  return (
    <UiProvider>
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
    </UiProvider>
  )
}

export default AppProvider