export const triggerMpesaPayment = async (phone: string, amount: number): Promise<boolean> => {
  try {
    const response = await fetch('/.netlify/functions/mpesa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, amount }),
    });

    const data = await response.json();
    return response.ok && data.success;
  } catch (error) {
    console.error('M-Pesa Payment Error:', error);
    return false;
  }
};
