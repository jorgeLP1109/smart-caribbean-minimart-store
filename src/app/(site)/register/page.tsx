// archivo: src/app/(site)/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // --- 1. Añade el estado para la dirección ---
  const [address, setAddress] = useState({
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddress({ ...address, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ... (lógica de loading y error)

    try {
      // --- 2. Envía el objeto de dirección completo ---
      await axios.post('/api/register', { name, email, password, address });
      router.push('/login?status=registered');
    } catch (err: any) {
      setError(err.response?.data || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Create your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campos de Usuario */}
            <input name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required className="w-full p-2 border rounded" />
            <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full p-2 border rounded" />
            <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full p-2 border rounded" />

            <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                {/* --- 3. Añade los campos del formulario de dirección --- */}
                <input name="street" value={address.street} onChange={handleAddressChange} placeholder="Street Address" required className="w-full p-2 border rounded mb-2" />
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <input name="city" value={address.city} onChange={handleAddressChange} placeholder="City" required className="w-full p-2 border rounded" />
                    <input name="state" value={address.state} onChange={handleAddressChange} placeholder="State / Province" required className="w-full p-2 border rounded" />
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <input name="postalCode" value={address.postalCode} onChange={handleAddressChange} placeholder="Postal Code" required className="w-full p-2 border rounded" />
                    <input name="country" value={address.country} onChange={handleAddressChange} placeholder="Country" required className="w-full p-2 border rounded" />
                </div>
                <input name="phone" type="tel" value={address.phone} onChange={handleAddressChange} placeholder="Phone Number" required className="w-full p-2 border rounded" />
            </div>
            
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
      </div>
    </div>
  );
}