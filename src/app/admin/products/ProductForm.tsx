'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '@prisma/client';
import { categories } from '@/config/site';
import ImageUpload from '../components/ImageUpload';

interface ProductFormProps {
  product?: Product | null;
  onSuccess: () => void;
  onClose: () => void;
}

export default function ProductForm({ product, onSuccess, onClose }: ProductFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description || '');
      setPrice(String(product.price));
      setStock(String(product.stock));
      setCategory(product.category || '');
      setImage(product.image || '');
    }
  }, [product]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // --- CORRECCIÓN FINAL AQUÍ ---
    // Construimos el objeto explícitamente usando las variables de estado
    const dataToSend = {
      name: name,
      description: description,
      price: parseFloat(price) || 0,
      stock: parseInt(stock, 10) || 0,
      category: category,
      image: image,
    };

    if (!dataToSend.name || dataToSend.price <= 0) {
        setError("Product name and a valid price are required.");
        setLoading(false);
        return;
    }

    try {
      if (product) {
        await axios.put(`/api/products/${product.id}`, dataToSend);
      } else {
        await axios.post('/api/products', dataToSend);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred while saving the product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">{product ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <ImageUpload
              src={image}
              onChange={(url) => setImage(url)}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full p-2 border rounded" />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 w-full p-2 border rounded" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input id="price" name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="mt-1 w-full p-2 border rounded" step="0.01" />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
              <input id="stock" name="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} required className="mt-1 w-full p-2 border rounded" />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="mt-1 w-full p-2 border rounded bg-white">
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (<option key={cat.value} value={cat.value}>{cat.label}</option>))}
            </select>
          </div>
          
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}