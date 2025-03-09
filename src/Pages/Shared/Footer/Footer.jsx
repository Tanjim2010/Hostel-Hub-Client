
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-16 bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Logo and About Section */}
        <div className="text-center md:text-left">
          <h1 className="text-xl font-bold text-white">Hostel Management</h1>
          <p className="text-sm mt-2">
            Simplifying hostel life with efficient management and services.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3 text-center md:text-left">
            Quick Links
          </h2>
          <ul className="flex flex-wrap justify-center md:justify-start gap-4">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/meals" className="hover:text-white transition">
                Meals
              </Link>
            </li>
            <li>
              <Link to="/upcoming-meals" className="hover:text-white transition">
                Upcoming Meals
              </Link>
            </li>
            <li>
              <Link to="/join-us" className="hover:text-white transition">
                Join Us
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-white transition">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3 text-center md:text-left">
            Contact Us
          </h2>
          <ul className="space-y-2 text-center md:text-left">
            <li>
              <span>Email: </span>
              <a
                href="mailto:support@hostelmanagement.com"
                className="hover:underline"
              >
                support@hostelmanagement.com
              </a>
            </li>
            <li>
              <span>Phone: </span>
              <a href="tel:+1234567890" className="hover:underline">
                +123 456 7890
              </a>
            </li>
            <li>
              <span>Address: </span>123 Hostel Lane, University Campus
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-6 border-t border-gray-600 pt-4">
        <p>
          &copy; {new Date().getFullYear()} Hostel Management. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
