export const WHATSAPP_NUMBER = "+923006676035";

export const generateWhatsAppLink = (productName: string, price: number, customUrl?: string): string => {
  const currentUrl = customUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const message = `Hello FreshKeep! I'm interested in ordering:
  
📦 *Product:* ${productName}
💰 *Price:* $${price.toFixed(2)}
🔗 *Link:* ${currentUrl}

Please let me know how to proceed with the payment. Thanks!`;

  return `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`;
};

