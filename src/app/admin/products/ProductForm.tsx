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
    // ... (resto de la lógica de submit es la misma)
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
                    title="Upload product image"
                    placeholder="Choose an image file"
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-brand-orange hover:file:bg-orange-100"
                />
            </div>
            {isUploading && <p className="text-sm text-blue-600 mt-2">Processing image, please wait...</p>}
          </div>

          {/* ... (resto de los campos del formulario: name, description, etc. no cambian) ... */}

        </form>
      </div>
    </div>
  );
}