'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Order, OrderItem, Product, User } from '@prisma/client';

// Definimos un tipo más completo para nuestras órdenes, incluyendo las relaciones
type FullOrder = Order & {
  user: User;
  items: (OrderItem & {
    product: Product;
  })[];
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<FullOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('/api/admin/orders')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error("Failed to fetch orders", error);
                alert("Could not fetch orders.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading orders...</p>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order.id} className="bg-white p-6 rounded-lg shadow-md border">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                                    <p className="font-semibold">{order.user.name} ({order.user.email})</p>
                                    <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
                                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                        order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 border-t pt-4">
                                <h4 className="font-semibold mb-2">Items:</h4>
                                <ul className="list-disc list-inside">
                                    {order.items.map((item: any) => (
                                        <li key={item.id} className="ml-4">
                                            {item.quantity} x {item.product.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}