'use client';

import { useEffect, useState, useRef, forwardRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { Order, User, Product, OrderItem, OrderStatus, Address } from '@prisma/client';

type FullOrderItem = OrderItem & { product: Product };
type FullOrder = Order & { user: User; items: FullOrderItem[] };

// --- Componente que define el LAYOUT de lo que se va a imprimir ---
// Este componente no cambia.
const PrintableOrder = forwardRef<HTMLDivElement, { order: FullOrder }>(({ order }, ref) => {
    return (
        <div ref={ref} className="p-8 text-black bg-white">
            <h1 className="text-2xl font-bold mb-4">Delivery Slip - Order #{order.id.substring(0, 8)}</h1>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <div className="my-4 border-t border-b py-4 border-gray-400">
                <h2 className="text-xl font-semibold">Shipping To:</h2>
                {(order.shippingAddress && typeof order.shippingAddress === 'object' && 'fullName' in order.shippingAddress) ? (
                    <>
                        <p>{(order.shippingAddress as unknown as Address).fullName}</p>
                        <p>{(order.shippingAddress as unknown as Address).street}</p>
                        <p>{(order.shippingAddress as unknown as Address).city}, {(order.shippingAddress as unknown as Address).state} {(order.shippingAddress as unknown as Address).postalCode}</p>
                        <p>{(order.shippingAddress as unknown as Address).country}</p>
                        <p><strong>Phone:</strong> {(order.shippingAddress as unknown as Address).phone}</p>
                    </>
                ) : <p>No address provided.</p>}
            </div>
            <h2 className="text-xl font-semibold">Items:</h2>
            <table className="w-full mt-2">
                <thead>
                    <tr className="border-b border-gray-400">
                        <th className="text-left py-1">Item</th>
                        <th className="text-right py-1">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map(item => (
                        <tr key={item.id}>
                            <td className="py-1">{item.quantity} x {item.product.name}</td>
                            <td className="text-right py-1">${(item.product.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-right mt-4 border-t pt-2 border-gray-400">
                <p className="text-xl font-bold">Total: ${order.total.toFixed(2)}</p>
            </div>
        </div>
    );
});
PrintableOrder.displayName = 'PrintableOrder';


// --- Componente que contiene el botón y la LÓGICA DE IMPRESIÓN REESCRITA ---
const PrintButton = ({ order }: { order: FullOrder }) => {
    const componentRef = useRef<HTMLDivElement>(null);
    const [isPrinting, setIsPrinting] = useState(false);

    // La función de impresión ahora se activa con un useEffect
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onAfterPrint: () => setIsPrinting(false), // Resetea el estado después de imprimir
    });

    useEffect(() => {
        if (isPrinting && handlePrint) {
            handlePrint();
        }
    }, [isPrinting, handlePrint]);
    
    return (
        <>
            {/* El botón ahora solo cambia el estado para empezar a imprimir */}
            <button onClick={() => setIsPrinting(true)} className="btn-edit text-xs mr-2">Print</button>

            {/* El componente a imprimir solo se renderiza cuando isPrinting es true */}
            {isPrinting && (
                <div className="hidden">
                    <PrintableOrder order={order} ref={componentRef} />
                </div>
            )}
        </>
    );
};


export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<FullOrder[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/admin/orders');
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId: string, status: OrderStatus) => {
        try {
            await axios.put(`/api/admin/orders/${orderId}`, { status });
            fetchOrders();
        } catch (error) {
            alert("Failed to update status.");
        }
    };

    const handleDelete = async (orderId: string) => {
        if (confirm('Are you sure you want to delete this order permanently?')) {
            try {
                await axios.delete(`/api/admin/orders/${orderId}`);
                fetchOrders();
            } catch (error) {
                alert("Failed to delete order.");
            }
        }
    };

    if (loading) return <div>Loading orders...</div>

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Orders</h1>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Info</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shipping</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{order.user.name}</div>
                                    <div className="text-sm text-gray-500">{order.user.email}</div>
                                    <div className="text-sm text-gray-400 mt-1">ID: {order.id.substring(0, 8)}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {(order.shippingAddress && typeof order.shippingAddress === 'object' && 'street' in order.shippingAddress) ? `${(order.shippingAddress as Address).street}, ${(order.shippingAddress as Address).city}`: 'N/A'}
                                </td>
                                <td className="px-6 py-4 text-sm">{order.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}</td>
                                <td className="px-6 py-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                        className="p-1 border rounded-md text-sm"
                                    >
                                        {Object.values(OrderStatus).map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-6 py-4 text-right flex justify-end items-center">
                                    <PrintButton order={order} />
                                    <button onClick={() => handleDelete(order.id)} className="btn-danger text-xs">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}