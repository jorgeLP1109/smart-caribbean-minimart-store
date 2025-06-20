// archivo: src/app/auth/denied/page.tsx

import Link from "next/link";

export default function DeniedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
      <p className="mt-4 text-lg">
        You do not have permission to view this page.
      </p>
      <Link href="/" className="mt-6 px-4 py-2 font-semibold text-white bg-brand-orange rounded-md hover:bg-orange-600">
        Return to Home
      </Link>
    </div>
  );
}