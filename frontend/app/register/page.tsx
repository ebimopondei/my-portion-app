"use client"

import { Button } from "@/components/ui/button"
import { Users, Store, Leaf } from "lucide-react"
import Image from "next/image";
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[url('/bg.png')] bg-cover bg-center flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6 flex justify-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                width={120}
                height={320}
                alt="portion-logo"
              />
            </Link>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Join Portion
          </h1>
          <p className="text-gray-500 text-lg">Choose how you'd like to get started</p>
        </div>

        {/* Registration Options */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Buyer Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 lg:p-10 hover:border-primary/30 transition-colors duration-300 group">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">I'm a Buyer</h2>
              <p className="text-gray-500 text-base">Save money on groceries through group buying</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center text-gray-600">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-4"></div>
                <span>Save up to 40% on groceries</span>
              </div>
              <div className="flex items-center text-gray-600">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-4"></div>
                <span>Join group buying for better prices</span>
              </div>
              <div className="flex items-center text-gray-600">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-4"></div>
                <span>Access verified wholesalers</span>
              </div>
              <div className="flex items-center text-gray-600">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-4"></div>
                <span>Fast delivery to your door</span>
              </div>
            </div>

            <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-base font-semibold" asChild>
              <Link href="/register/buyer">Sign Up as Buyer</Link>
            </Button>
          </div>

          {/* Vendor Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 lg:p-10 hover:border-secondary/30 transition-colors duration-300 group">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-secondary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/10 transition-colors duration-300">
                <Store className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">I'm a Vendor</h2>
              <p className="text-gray-500 text-base">Grow and Earn more from your wholesale business with us</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center text-gray-600">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-4"></div>
                <span>Reach thousands of buyers</span>
              </div>
              <div className="flex items-center text-gray-600">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-4"></div>
                <span>Manage orders efficiently</span>
              </div>
              <div className="flex items-center text-gray-600">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-4"></div>
                <span>Verified seller badge</span>
              </div>
              <div className="flex items-center text-gray-600">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-4"></div>
                <span>Marketing support</span>
              </div>
            </div>

            <Button className="w-full h-12 bg-secondary hover:bg-secondary/90 text-base font-semibold" asChild>
              <Link href="/register/vendor">Partner with Us</Link>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-lg">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:text-primary/80 font-semibold transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

