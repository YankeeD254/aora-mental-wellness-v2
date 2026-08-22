import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { phone, amount } = JSON.parse(event.body || '{}');

    // Standardize phone format (07XXXXXXXX or +254XXXXXXXX -> 254XXXXXXXX)
    const formattedPhone = phone.replace(/^0/, '254').replace(/^\+/, '');

    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const passkey = process.env.MPESA_PASSKEY;
    const shortcode = process.env.MPESA_SHORTCODE || '174379';
    const callbackUrl = process.env.MPESA_CALLBACK_URL;

    // 1. Get OAuth Access Token from Daraja
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenRes = await fetch(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const { access_token } = await tokenRes.json();

    // 2. Generate Timestamp & Password
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

    // 3. Initiate STK Push
    const stkRes = await fetch(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: amount,
          PartyA: formattedPhone,
          PartyB: shortcode,
          PhoneNumber: formattedPhone,
          CallBackURL: callbackUrl || 'https://example.com/api/callback',
          AccountReference: 'Aora Wellness',
          TransactionDesc: 'Therapy Session Booking',
        }),
      }
    );

    const stkData = await stkRes.json();

    if (stkData.ResponseCode === '0') {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'STK push sent', data: stkData }),
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, error: stkData.CustomerMessage }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
