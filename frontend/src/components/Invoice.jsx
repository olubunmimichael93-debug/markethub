import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateInvoice = (order) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('MarketHub Invoice', 20, 20);
  doc.setFontSize(10);
  doc.text(`Order #: ${order._id.slice(-8)}`, 20, 35);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 42);
  doc.text(`Customer: ${order.shippingAddress?.fullName || 'N/A'}`, 20, 49);
  
  // Items table
  const tableData = order.items.map(item => [
    item.name,
    item.quantity,
    `₦${item.price.toLocaleString()}`,
    `₦{(item.price * item.quantity).toLocaleString()}`
  ]);
  
  doc.autoTable({
    startY: 60,
    head: [['Product', 'Qty', 'Price', 'Total']],
    body: tableData,
  });
  
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.text(`Subtotal: ₦${order.totalAmount.toLocaleString()}`, 140, finalY);
  doc.text(`Delivery: Free`, 140, finalY + 7);
  doc.text(`Total: ₦${order.totalAmount.toLocaleString()}`, 140, finalY + 14);
  
  doc.save(`invoice_${order._id}.pdf`);
};
