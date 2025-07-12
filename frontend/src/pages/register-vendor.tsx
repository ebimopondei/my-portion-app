
"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Link } from "react-router-dom";

export default function RegisterVendor() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log("Register:", formData);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="mb-6 flex justify-center">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                width={120}
                height={320}
                alt="portion-logo"
              />
            </Link>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Create an account
          </h1>
          <p className="text-gray-500 text-lg">Start your journey with us</p>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label
              htmlFor="name"
              className="text-gray-700 font-medium mb-2 block"
            >
              Full name
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="h-12 text-base border-gray-200 focus:border-primary focus:ring-primary"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <Label
              htmlFor="email"
              className="text-gray-700 font-medium mb-2 block"
            >
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="h-12 text-base border-gray-200 focus:border-primary focus:ring-primary"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="text-gray-700 font-medium mb-2 block"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="h-12 text-base border-gray-200 focus:border-primary focus:ring-primary"
              placeholder="Create a password"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, agreeToTerms: checked as boolean })
              }
              required
            />
            <Label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-primary hover:text-primary/80 underline"
              >
                Terms & Conditions
              </Link>
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold"
          >
            Create account
          </Button>
        </form>

        {/* Sign in link */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
