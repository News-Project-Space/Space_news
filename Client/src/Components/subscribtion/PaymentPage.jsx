import React, { useState } from 'react';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for required fields
    if (!amount || !cardNumber || !expiryDate || !cvv) {
      setError('All fields are required');
      return;
    }

    // Additional validation for card number format (simple check)
    if (cardNumber.length < 16) {
      setError('Card number must be 16 digits');
      return;
    }

    // Additional validation for expiry date format (MM/YY)
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiryDate)) {
      setError('Invalid expiry date format. Use MM/YY');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          card_number: cardNumber,
          expiry_date: expiryDate,
          cvv,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Payment successful!');
        setAmount('');
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black" style={{ background: `linear-gradient(135deg, #23120B 0%, #21209C 100%)` }}>
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + 'vh',
              left: Math.random() * 100 + 'vw',
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite`
            }}
          />
        ))}
      </div>
      
      <div className="w-full max-w-md bg-opacity-20 p-8 rounded-lg" style={{ backgroundColor: 'rgba(35, 18, 11, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(241, 241, 241, 0.2)' }}>
        <div className="flex items-center justify-center mb-6">
          <div className="h-12 w-12 rounded-full bg-yellow-400" style={{ backgroundColor: '#FDB827' }}></div>
          <h2 className="text-2xl font-bold ml-3" style={{ color: '#F1F1F1' }}>Cosmic Payment</h2>
        </div>
        
        {error && <p className="text-red-500 text-sm mb-4 p-2 rounded" style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="amount" className="block text-sm font-medium mb-1" style={{ color: '#FDB827' }}>
              Amount
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3" style={{ color: '#F1F1F1' }}>$</span>
              <input
                type="number"
                id="amount"
                className="pl-8 p-3 w-full border rounded-lg focus:outline-none"
                style={{ 
                  backgroundColor: 'rgba(33, 32, 156, 0.3)', 
                  borderColor: '#FDB827',
                  color: '#F1F1F1'
                }}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="card_number" className="block text-sm font-medium mb-1" style={{ color: '#FDB827' }}>
              Card Number
            </label>
            <input
              type="text"
              id="card_number"
              className="p-3 w-full border rounded-lg focus:outline-none"
              style={{ 
                backgroundColor: 'rgba(33, 32, 156, 0.3)', 
                borderColor: '#FDB827',
                color: '#F1F1F1'
              }}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
              maxLength="16"
              required
            />
          </div>

          <div className="flex mb-5">
            <div className="w-1/2 mr-2">
              <label htmlFor="expiry_date" className="block text-sm font-medium mb-1" style={{ color: '#FDB827' }}>
                Expiry Date
              </label>
              <input
                type="text"
                id="expiry_date"
                className="p-3 w-full border rounded-lg focus:outline-none"
                style={{ 
                  backgroundColor: 'rgba(33, 32, 156, 0.3)', 
                  borderColor: '#FDB827',
                  color: '#F1F1F1'
                }}
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="w-1/2 ml-2">
              <label htmlFor="cvv" className="block text-sm font-medium mb-1" style={{ color: '#FDB827' }}>
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                className="p-3 w-full border rounded-lg focus:outline-none"
                style={{ 
                  backgroundColor: 'rgba(33, 32, 156, 0.3)', 
                  borderColor: '#FDB827',
                  color: '#F1F1F1'
                }}
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                maxLength="4"
                required
              />
            </div>
          </div>

          <style jsx>{`
            @keyframes twinkle {
              0% { opacity: 0.3; }
              50% { opacity: 1; }
              100% { opacity: 0.3; }
            }
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
          `}</style>

          <div className="mb-2">
            <button
              type="submit"
              className="w-full py-3 px-4 font-bold rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              style={{ 
                backgroundColor: loading ? 'rgba(241, 241, 241, 0.3)' : '#FDB827',
                color: loading ? '#F1F1F1' : '#23120B',
                boxShadow: '0 0 15px rgba(253, 184, 39, 0.5)'
              }}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Launch Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;