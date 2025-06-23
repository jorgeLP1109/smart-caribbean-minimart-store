'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { Product } from '@prisma/client';
import { categories } from '@/config/site';
import toast from 'react-hot-toast';
import Image from 'next/image';

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
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setDescription(product.description || '');
      setPrice(String(product.price) || '');
      setStock(String(product.stock) || '');
      setCategory(product.category || '');
      setImage(product.image || '');
    }
  }, [product]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    toast.loading('Uploading image...');

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const base64Image = reader.result as string;
        const response = await axios.post('/api/upload-image', { image: base64Image });
        setImage(response.data.url);
        toast.dismiss();
        toast.success('Image uploaded!');
      } catch (error) {
        toast.dismiss();
        toast.error('Image upload failed.');
        console.error(error);
      } finally {
        setIsUploading(false);
      }
    };
    reader.onerror = () => {
      setIsUploading(false);
      toast.dismiss();
      toast.error('Failed to read file.');
    };
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.dismiss();

    const dataToSend = {
      name,
      description,
      price: parseFloat(price) || 0,
      stock: parseInt(stock, 10) || 0,
      category,
      image,
    };

    if (!dataToSend.name || !dataToSend.category || dataToSend.price <= 0) {
        toast.error("Name, price, and category are required.");
        setLoading(false);
        return;
    }

    try {
      if (product) {
        await axios.put(`/api/products/${product.id}`, dataToSend);
        toast.success("Product updated successfully!");
      } else {
        await axios.post('/api/products', dataToSend);
        toast.success("Product created successfully!");
      }

      // --- LLAMADA DE REVALIDACIÓN CORREGIDA Y MÁS ROBUSTA ---
      console.log("Requesting revalidation for path: /");
      const res = await fetch(`/api/revalidate?path=/`);
      if (!res.ok) {
        console.error("Failed to revalidate:", await res.json());
        toast.error("Product saved, but failed to refresh home page cache.");
      } else {
        console.log("Revalidation successful:", await res.json());
      }
      // --- FIN DE LA CORRECCIÓN ---

      onSuccess(); // Esto refresca la lista en el panel de admin
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An error occurred.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">{product ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <div className="flex items-center gap-4">
                {image && <Image src={image} alt="Product preview" width={100} height={100} className="rounded-md object-cover" />}
                <input 
                    type="file" 
                    onChange={handleImageUpload} 
                    disabled={isUploading || loading} 
                    accept="image/*"
                    placeholder="Upload product image"
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-brand-orange hover:file:bg-orange-100"
                />
            </div>
            {isUploading && <p className="text-sm text-blue-600 mt-2">Processing image, please wait...</p>}
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
          
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit" disabled={loading || isUploading} className="btn-primary">
              {loading || isUploading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}