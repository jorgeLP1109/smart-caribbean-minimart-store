'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { name, email, password, ...address } = formData;
    const dataToSend = { name, email, password, address };

    try {
      await axios.post('/api/register', dataToSend);
      router.push('/login?status=registered');
    } catch (err: any) {
      setError(err.response?.data || 'An unexpected error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
              <input id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded mt-1" />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded mt-1" />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded mt-1" />
            </div>
            
            <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Shipping Address</h3>
                <div className="space-y-4">
                    <input name="street" value={formData.street} onChange={handleChange} placeholder="Street Address" required className="w-full p-2 border rounded" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required className="w-full p-2 border rounded" />
                        <input name="state" value={formData.state} onChange={handleChange} placeholder="State / Province" required className="w-full p-2 border rounded" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal Code" required className="w-full p-2 border rounded" />
                        <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" required className="w-full p-2 border rounded" />
                    </div>
                    <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="w-full p-2 border rounded" />
                </div>
            </div>
            
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-orange-600 hover:text-orange-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}