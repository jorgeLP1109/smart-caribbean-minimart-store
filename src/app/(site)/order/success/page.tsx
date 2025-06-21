// archivo: src/app/(site)/order/success/page.tsx
import { Suspense } from 'react';
import SuccessClientPage from './SuccessClientPage';

// Un componente de carga simple
const Loading = () => {
    return (
         <div className="container mx-auto text-center py-20">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-2xl mx-auto animate-pulse">
                <div className="h-9 bg-gray-300 rounded w-1/2 mx-auto"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mt-4"></div>
                <div className="h-12 bg-gray-300 rounded w-1/3 mx-auto mt-8"></div>
            </div>
        </div>
    )
}

// La página del servidor que envuelve todo en Suspense
export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SuccessClientPage />
    </Suspense>
  );
}