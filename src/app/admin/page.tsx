'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
    name: string;
    total: number;
}

interface Stats {
    totalSales: number;
    totalOrders: number;
    totalProducts: number;
    totalUsers: number;
    chartData: ChartData[];
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('/api/admin/stats');
                setStats(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div>
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Placeholder para las tarjetas */}
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="p-6 bg-gray-200 rounded-lg shadow-md animate-pulse h-32"></div>
                    ))}
                </div>
                <div className="mt-8 bg-gray-200 p-6 rounded-lg shadow-md animate-pulse h-80"></div>
            </div>
        );
    }

    if (!stats) {
        return <div>Error loading dashboard data. Please try again.</div>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            
            {/* Tarjetas de Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-600">Total Sales</h2>
                    <p className="text-3xl font-bold mt-2">${stats.totalSales.toFixed(2)}</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-600">Total Orders</h2>
                    <p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-600">Total Products</h2>
                    <p className="text-3xl font-bold mt-2">{stats.totalProducts}</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-600">Total Users</h2>
                    <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
                </div>
            </div>
            
            {/* Gráfico de Ventas */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Sales Last 7 Days</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={stats.chartData}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
                            labelStyle={{ fontWeight: 'bold' }}
                            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Sales']}
                        />
                        <Legend />
                        <Bar dataKey="total" fill="#f28c38" name="Total Sales" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}