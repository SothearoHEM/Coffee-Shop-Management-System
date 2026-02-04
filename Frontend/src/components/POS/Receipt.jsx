import { useContext, useRef, useState } from "react";
import { CartContext } from "../../contexts/CartContext.jsx";
import { AuthContext } from "../../contexts/AuthContext.jsx";

const Receipt = ({ close }) => {

  const { cart, subtotal, tax, total, clearCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const printRef = useRef();
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  // Generate receipt ID
  const receiptId = `RCP-${Date.now().toString().slice(-8)}`;
  
  // Get current date and time
  const now = new Date();
  const dateTime = now.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const win = window.open("", "", "width=400,height=600");

    win.document.write(`
      <html>
        <head>
          <title>Receipt - ${receiptId}</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              padding: 20px;
              max-width: 400px;
              margin: 0 auto;
            }
            .text-center { text-align: center;}
            .Receipt-Info { justify-content: space-between; display: flex; }
            .font-bold { font-weight: bold; }
            .my-2 { margin: 8px 0; }
            .mt-4 { margin-top: 16px; }
            hr { border: none; border-top: 1px dashed #000; }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);

    win.document.close();
    win.print();

    clearCart();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 overflow-auto p-4">

      <div className="bg-white p-6 w-96 rounded-lg shadow-xl">

        <div ref={printRef} className="text-sm font-mono">

          {/* Shop Header */}
          <div className="text-center border-b-2 border-dashed border-gray-400 pb-3 mb-3">
            <h2 className="font-bold text-xl mb-1">Coffee Shop</h2>
            <p className="text-xs text-gray-600">123 Main Street</p>
            <p className="text-xs text-gray-600">City, State 12345</p>
            <p className="text-xs text-gray-600">Phone: (555) 123-4567</p>
          </div>

          {/* Receipt Info */}
          <div className="text-xs mb-3 space-y-1">
            <div className="flex justify-between Receipt-Info">
              <span className="font-semibold">Receipt ID:</span>
              <span>{receiptId}</span>
            </div>
            <div className="flex justify-between Receipt-Info">
              <span className="font-semibold">Date & Time:</span>
              <span>{dateTime}</span>
            </div>
            <div className="flex justify-between Receipt-Info">
              <span className="font-semibold">Cashier:</span>
              <span>{currentUser?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between Receipt-Info">
              <span className="font-semibold">Role:</span>
              <span className="capitalize">{currentUser?.role || 'N/A'}</span>
            </div>
          </div>

          <hr className="my-3 border-dashed border-gray-400" />

          {/* Items */}
          <div className="mb-3">
            <p className="font-bold mb-2">ITEMS:</p>
            {cart.map(item => (
              <div key={item.id} className="mb-2">
                <div className="flex justify-between Receipt-Info">
                  <span className="font-semibold">{item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600 pl-2 Receipt-Info">
                  <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <hr className="my-3 border-dashed border-gray-400" />

          {/* Totals */}
          <div className="space-y-1 mb-3">
            <div className="flex justify-between Receipt-Info">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between Receipt-Info">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-base border-t border-gray-400 pt-2 mt-2 Receipt-Info">
              <span>TOTAL:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <hr className="my-3 border-dashed border-gray-400" />

          {/* Payment Method */}
          <div className="flex justify-between mb-3 Receipt-Info">
            <span className="font-semibold">Payment Method:</span>
            <span>{paymentMethod}</span>
          </div>

          <hr className="my-3 border-dashed border-gray-400" />

          {/* Footer */}
          <div className="text-center mt-4 space-y-2">
            <p className="font-bold">Thank you for your purchase!</p>
            <p className="text-sm">Please come again</p>
            <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-dashed border-gray-300">
              Powered by Coffee Shop POS
            </p>
          </div>

        </div>

        {/* Payment Method Selection */}
        <div className="mt-4 mb-4">
          <label className="block text-sm font-semibold mb-2">Select Payment Method:</label>
          <select 
            value={paymentMethod} 
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Mobile Payment">Mobile Payment</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold"
          >
            Print Receipt
          </button>

          <button
            onClick={close}
            className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 font-semibold"
          >
            Close
          </button>
        </div>

      </div>

    </div>
  );
};

export default Receipt;
