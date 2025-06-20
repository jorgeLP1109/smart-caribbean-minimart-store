'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiExternalLink } from 'react-icons/fi'; // <-- 1. Importa un ícono

const AdminSidebar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Products', href: '/admin/products' },
    { name: 'Orders', href: '/admin/orders' },
    { name: 'Users', href: '/admin/users' },
  ];

  return (
    // Hacemos que la sidebar sea un contenedor flex-col para empujar el enlace hacia abajo
    <aside className="w-64 bg-gray-800 text-white flex-shrink-0 flex flex-col">
      <div>
        <div className="p-4 text-2xl font-bold border-b border-gray-700">Admin Panel</div>
        <nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`block px-4 py-3 hover:bg-gray-700 transition-colors ${
                    pathname === link.href ? 'bg-brand-orange text-white' : 'text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* --- 2. AÑADE ESTE BLOQUE DE CÓDIGO AL FINAL --- */}
      <div className="mt-auto p-4 border-t border-gray-700">
        <Link 
            href="/" 
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-center font-semibold bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
        >
          <FiExternalLink />
          <span>Go to Store</span>
        </Link>
      </div>
      {/* --- FIN DEL BLOQUE AÑADIDO --- */}

    </aside>
  );
};

export default AdminSidebar;