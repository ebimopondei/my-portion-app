import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
            <div className="md:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 mb-6"
              >
                <Link to="/" className="flex items-center">
                  <img
                    src="/logo.png"
                    width={140}
                    height={36}
                    alt="portion-logo"
                  />
                </Link>
              </motion.div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Connecting communities to wholesale food vendors for smarter,
                cheaper grocery shopping.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-gray-900">For Buyers</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/register"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/how-it-works"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Browse Categories
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-gray-900">For Vendors</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/register/vendor"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Partner with Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/vendor-benefits"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Benefits
                  </Link>
                </li>
                <li>
                  <Link
                    to="/vendor-support"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-gray-900">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/help"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600">
                &copy; 2024 Portion. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <Link
                  to="/terms"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/privacy"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer