// archivo: src/components/NavbarWrapper.tsx
'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

// Importamos la Navbar de forma dinámica y desactivamos el Server-Side Rendering (SSR)
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

// En el panel de admin, usaremos un layout diferente y no queremos esta navbar
const pathsWithoutNavbar = ['/admin'];

const NavbarWrapper = () => {
  const pathname = usePathname();

  // Si la ruta actual empieza con alguna de las rutas sin navbar, no renderizamos nada
  const shouldHideNavbar = pathsWithoutNavbar.some(path => pathname.startsWith(path));

  if (shouldHideNavbar) {
    return null;
  }

  return <Navbar />;
};

export default NavbarWrapper;