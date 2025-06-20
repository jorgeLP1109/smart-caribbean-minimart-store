// archivo: src/components/Footer.tsx
import Link from "next/link";
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} Smart Caribbean Minimart.</p>
            <p className="text-sm text-gray-400">All Rights Reserved.</p>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="#" title="Instagram" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-orange transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="#" title="TikTok" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-orange transition-colors">
              <FaTiktok size={24} />
            </a>
            <a href="#" title="Facebook" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-orange transition-colors">
              <FaFacebookF size={24} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;