
import type React from "react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Link } from "react-router-dom";
import useLogin from "@/hooks/form-hooks/use-login-hook";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function LoginPage() {

  const { form, onLogin } = useLogin()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login:", formData);
  };

  return (
    <div className="min-h-screen bg-[url('/bg.png')] bg-cover bg-center flex items-center justify-center px-6 py-12">
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
            Welcome back
          </h1>
          <p className="text-gray-500 text-lg">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onLogin)} className="space-y-6">
            <div>
              <FormField
                control={form.control}
                name="email"
                
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium mb-2 block">Email Address</FormLabel>
                    <FormControl>
                          <Input className="h-12 text-base border-gray-200 focus:border-primary focus:ring-primary" type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium mb-2 block">Password</FormLabel>
                    <FormControl>
                          <Input className="h-12 text-base border-gray-200 focus:border-primary focus:ring-primary" type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, rememberMe: checked as boolean })
                  }
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold"
            >
              Sign in
            </Button>
          </form>
        </Form>

        {/* Sign up link */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
