
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-bluepay-500 flex items-center justify-center">
                <span className="font-bold text-xs text-white">BP</span>
              </div>
              <span className="text-lg font-bold text-bluepay-600">BluePay</span>
            </Link>
            <p className="text-sm text-gray-500 mt-2">
              Secure payments and withdrawals in Naira
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-sm mb-2">Services</h3>
              <ul className="space-y-1">
                <li className="text-sm text-gray-500 hover:text-bluepay-500 transition-colors">
                  <Link to="#">Withdrawals</Link>
                </li>
                <li className="text-sm text-gray-500 hover:text-bluepay-500 transition-colors">
                  <Link to="#">BPC Codes</Link>
                </li>
                <li className="text-sm text-gray-500 hover:text-bluepay-500 transition-colors">
                  <Link to="#">Transfers</Link>
                </li>
              </ul>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-sm mb-2">Company</h3>
              <ul className="space-y-1">
                <li className="text-sm text-gray-500 hover:text-bluepay-500 transition-colors">
                  <Link to="#">About</Link>
                </li>
                <li className="text-sm text-gray-500 hover:text-bluepay-500 transition-colors">
                  <Link to="#">Contact</Link>
                </li>
                <li className="text-sm text-gray-500 hover:text-bluepay-500 transition-colors">
                  <Link to="#">Terms</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-4 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} BluePay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
