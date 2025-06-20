'use client';

import Link from 'next/link';
import Image from 'next/image';

const HeroBanner = () => {
  return (
    <section className="relative h-96 md:h-[500px] flex items-center justify-center text-center text-white bg-gray-800 rounded-lg overflow-hidden">
      <Image
        src="/images/banner-bg.jpg"
        alt="Background of caribbean snacks"
        fill
        className="object-cover absolute z-0 opacity-40"
        priority 
      />
      <div className="relative z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight [text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)]">
          Taste the Vibes of the Caribbean
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)]">
          Your favorite snacks, drinks, and groceries, delivered right to your doorstep.
        </p>
        <Link
          href="#snacks"
          className="btn-primary mt-8"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default HeroBanner;