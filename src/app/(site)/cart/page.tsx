'use client';

import { useCartStore } from "@/lib/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import AddressFormModal from "./AddressFormModal";
import { Address } from "@prisma/client";
import toast from 'react-hot-toast';
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCartStore();
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (session) {
      axios.get('/api/addresses').then(response => {
        setAddresses(response.data);
        const defaultAddress = response.data.find((addr: Address) => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id);
        } else if (response.data.length > 0) {
          setSelectedAddressId(response.data[0].id);
        }
      });
    }
  }, [session]);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!session) {
      toast.error("Please log in to proceed.");
      router.push('/login?redirect=/cart');
      return;
    }
    
    setLoading(true);

    if (!selectedAddressId) {
        toast.error("Please select or add a shipping address.");
        setLoading(false);
        return;
    }

    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
    
    try {
      const response = await axios.post('/api/checkout', {
        cartItems: items,
        shippingAddress: selectedAddress,
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Could not proceed to checkout. Please try again.");
    } finally {
        setLoading(false);
    }
  };
  
  const handleNewAddressSuccess = (newAddress: Address) => {
    setAddresses(prev => [newAddress, ...prev]);
    setSelectedAddressId(newAddress.id);
    setIsModalOpen(false);
  };

  if (!isMounted) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 animate-pulse bg-gray-200 h-9 w-48 rounded-md"></h1>
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">Loading your cart...</p>
            </div>
        </div>
    );
  }

  const isCheckoutDisabled = loading || items.length === 0 || (!!session && !selectedAddressId);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">Your cart is empty.</p>
          <button onClick={() => router.push('/')} className="btn-primary mt-6">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center bg-white p-4 rounded-lg shadow-md">
                <Image src={product.image || '/placeholder.png'} alt={product.name} width={80} height={80} className="rounded-md object-cover" />
                <div className="flex-grow ml-4">
                  <h2 className="font-semibold text-lg">{product.name}</h2>
                  <p className="text-sm text-gray-500">{formatPrice(product.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10);
                        if (newQuantity > 0) {
                            updateQuantity(product.id, newQuantity);
                        }
                    }}
                    className="w-16 text-center border rounded-md"
                    aria-label={`Quantity for ${product.name}`}
                  />
                  <button 
                    onClick={() => removeFromCart(product.id)} 
                    className="text-red-500 hover:text-red-700 p-1"
                    title={`Remove ${product.name} from cart`}
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1 space-y-6">
            {session && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                    {addresses.length > 0 ? (
                        <select 
                            value={selectedAddressId}
                            onChange={(e) => setSelectedAddressId(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        >
                            {addresses.map(addr => (
                                <option key={addr.id} value={addr.id}>
                                    {addr.street}, {addr.city}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="text-sm text-gray-500">Please add a shipping address to proceed.</p>
                    )}
                    <button onClick={() => setIsModalOpen(true)} className="text-brand-orange hover:underline text-sm mt-2 font-semibold">
                        + Add New Address
                    </button>
                </div>
            )}
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="mt-6 relative group">
                <button 
                    onClick={handleCheckout} 
                    disabled={isCheckoutDisabled && !!session} 
                    className="btn-primary w-full"
                >
                  {loading ? 'Processing...' : 'Proceed to Checkout'}
                </button>
                {!session && (
                    <div className="absolute bottom-full mb-2 hidden group-hover:block w-full">
                        <div className="bg-gray-800 text-white text-xs rounded py-2 px-3 text-center">
                            Please log in or register to continue
                        </div>
                    </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {isModalOpen && (
          <AddressFormModal 
            onSuccess={handleNewAddressSuccess}
            onClose={() => setIsModalOpen(false)}
          />
      )}
    </div>
  );
}