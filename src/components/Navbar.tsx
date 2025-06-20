'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { categories } from '@/config/site';
import { useCartStore } from '@/lib/store';

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { items } = useCartStore();

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  if (!isMounted) {
    return (
      <header className="bg-white shadow-md sticky top-0 z-50 h-20">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
            <div className="h-10 w-36 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link href="/" className="flex-shrink-0 z-50">
            <Image src="/logo.png" alt="Logo" width={150} height={50} className="h-12 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {categories.map((cat) => (
              <Link key={cat.value} href={`/#${cat.value}`} className="text-sm font-medium text-gray-600 hover:text-brand-orange transition-colors">
                {cat.label}
              </Link>
            ))}
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-brand-orange transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {session ? (
                 <div className="flex items-center gap-4">
                    <span className="text-sm">Hi, {session.user?.name?.split(' ')[0]}</span>
                    {session.user.role === 'ADMIN' && <Link href="/admin" className="btn-danger text-sm py-1 px-3">Admin</Link>}
                    <button onClick={() => signOut()} className="text-sm hover:text-brand-orange">Logout</button>
                 </div>
              ) : (
                <div className="flex items-center gap-2">
                    <Link href="/login" className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900">Login</Link>
                    <Link href="/register" className="btn-primary text-sm py-2">Register</Link>
                </div>
              )}
            </div>
            
            <Link href="/cart" aria-label="Shopping Cart" className="relative p-2">
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden z-50 p-2">
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden fixed inset-0 w-full h-full bg-white z-40 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="pt-24 pb-8 px-6 flex flex-col h-full">
            <nav className="flex flex-col gap-1">
                {categories.map((cat) => (
                    <Link key={cat.value} href={`/#${cat.value}`} onClick={() => setIsMenuOpen(false)} className="p-4 text-lg font-medium text-gray-700 rounded-lg hover:bg-orange-50 hover:text-brand-orange">
                      {cat.label}
                    </Link>
                ))}
                 <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="p-4 text-lg font-medium text-gray-700 rounded-lg hover:bg-orange-50 hover:text-brand-orange">
                  Contact
                </Link>
            </nav>
            <div className="mt-auto border-t pt-6">
                {session ? (
                    <div className="flex flex-col gap-4 items-start">
                        <div className="px-4 text-lg font-semibold">Hi, {session.user?.name?.split(' ')[0]}</div>
                        {session.user.role === 'ADMIN' && <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="bg-red-500 text-white w-full text-center p-3 rounded-lg text-lg">Admin Panel</Link>}
                        <button onClick={() => { signOut(); setIsMenuOpen(false); }} className="p-4 text-lg text-gray-600 text-left w-full">Logout</button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <Link href="/login" onClick={() => setIsMenuOpen(false)} className="border border-gray-300 w-full text-center p-3 rounded-lg text-lg">Login</Link>
                        <Link href="/register" onClick={() => setIsMenuOpen(false)} className="bg-brand-orange text-white w-full text-center p-3 rounded-lg text-lg">Register</Link>
                    </div>
                )}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;