'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

import Button from '@/components/Ui/Button';
import Input from '@/components/Ui/Input';
import Container from '@/components/Ui/Container';
import { signIn } from '@/lib/auth-client'; // ✅ Ensure this points to your auth-client path

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });

  const validateForm = (): boolean => {
    const newErrors = { email: '', password: '', general: '' };
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({ email: '', password: '', general: '' });

    try {
      // ✅ Integrated with BetterAuth Email Sign-In
      const result = await signIn.email({
        email: formData.email,
        password: formData.password,
        // callbackURL: "/", // Where to direct after successful auth
      });
      setTimeout(() => {
        router.push('/');
        router.refresh();
      }, 1500);

      if (result?.error) {
        setErrors(prev => ({
          ...prev,
          general: result.error.message || 'Invalid email or password',
        }));
        return;
      }

      router.push('/');
      router.refresh();
    } catch (err) {
      console.error(err);
      setErrors(prev => ({
        ...prev,
        general: 'An unexpected error occurred. Please try again.',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // const handleGoogleSignIn = async () => {
  //   setIsLoading(true);
  //   setErrors({ email: "", password: "", general: "" });

  //   try {
  //     // ✅ Integrated with BetterAuth Google OAuth provider
  //     await signIn.social({
  //       provider: "google",
  //       callbackURL: "/",
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     setErrors((prev) => ({
  //       ...prev,
  //       general: "Google authentication failed. Please try again.",
  //     }));
  //     setIsLoading(false);
  //   }
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white to-(--primary)/5 py-12 px-4">
      <Container>
        <div className="max-w-md mx-auto w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100/50">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-(--dark)">Welcome Back</h1>
              <p className="mt-2 text-sm text-(--text-secondary)">
                Sign in to continue your adventure
              </p>
            </div>

            {errors.general && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-(--dark) mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={
                    errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : ''
                  }
                  disabled={isLoading}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-(--dark)">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-semibold text-(--primary) hover:underline transition"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`pr-10 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.password}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full h-11 flex justify-center items-center font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Login'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-(--text-secondary)">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Button Enabled */}
            <button
              type="button"
              // onClick={handleGoogleSignIn}
              disabled
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 px-4 py-3 font-medium text-(--dark) bg-white transition hover:bg-gray-50/80 hover:border-gray-400/80 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
            >
              <FcGoogle className="h-5 w-5" />
              <span>Continue with Google</span>
            </button>

            <p className="mt-6 text-center text-sm text-(--text-secondary)">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="font-bold text-(--primary) hover:underline transition"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
