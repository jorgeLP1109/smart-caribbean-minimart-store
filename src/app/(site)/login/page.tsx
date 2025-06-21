// archivo: src/app/(site)/login/page.tsx
import { Suspense } from 'react';
import LoginClientPage from './LoginClientPage';

// Componente de carga que se mostrará mientras el componente de cliente se carga
const LoginPageLoading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="space-y-6 pt-6">
                    <div className="h-14 bg-gray-200 rounded"></div>
                    <div className="h-14 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    )
}

// La página principal del servidor que usa Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageLoading />}>
      <LoginClientPage />
    </Suspense>
  );
}