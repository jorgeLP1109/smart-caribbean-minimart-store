// archivo: src/app/(site)/cart/AddressFormModal.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';

interface AddressFormModalProps {
  onSuccess: (newAddress: any) => void;
  onClose: () => void;
}

export default function AddressFormModal({ onSuccess, onClose }: AddressFormModalProps) {
  const [formData, setFormData] = useState({
    fullName: '', street: '', city: '', state: '', postalCode: '', country: '', phone: ''
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/addresses', formData);
      onSuccess(response.data);
    } catch (error) {
      console.error("Failed to add address", error);
      alert("Could not add address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Shipping Address</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="fullName" onChange={handleChange} placeholder="Full Name" required className="w-full p-2 border rounded" />
          <input name="street" onChange={handleChange} placeholder="Street Address" required className="w-full p-2 border rounded" />
          <div className="grid grid-cols-2 gap-4">
            <input name="city" onChange={handleChange} placeholder="City" required className="w-full p-2 border rounded" />
            <input name="state" onChange={handleChange} placeholder="State" required className="w-full p-2 border rounded" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input name="postalCode" onChange={handleChange} placeholder="Postal Code" required className="w-full p-2 border rounded" />
            <input name="country" onChange={handleChange} placeholder="Country" required className="w-full p-2 border rounded" />
          </div>
          <input name="phone" type="tel" onChange={handleChange} placeholder="Phone" required className="w-full p-2 border rounded" />
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Saving...' : 'Save Address'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}