// app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mountain, Eye, EyeOff } from 'lucide-react';
import Button from '@/components/Ui/Button';
import Input from '@/components/Ui/Input';
import Container from '@/components/Ui/Container';
import { FcGoogle } from 'react-icons/fc';

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  });
  const [error, setError] = useState('');

  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 6) errors.push('at least 6 characters');
    if (!/[A-Z]/.test(password)) errors.push('one uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('one lowercase letter');
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.photoURL ||
      !formData.password
    ) {
      setError('Please fill in all fields');
      return;
    }

    // Password validation
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      setError(`Password must have: ${passwordErrors.join(', ')}`);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with BetterAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => router.push('/login'), 1500);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with BetterAuth Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push('/');
    } catch (err) {
      setError('Google sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-(--background) to-(--primary)/5 py-12 px-4">
      <Container>
        <div className="max-w-md mx-auto">
          {/* Register Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-(--dark)">
                Create Account
              </h2>
              <p className="mt-2 text-sm text-(--text-secondary)">
                Start your adventure today
              </p>
            </div>

            {success && (
              <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600 border border-green-200">
                Registration successful! Please login.
              </div>
            )}

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500 border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-(--dark)">
                  Name
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1.5"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-(--dark)">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-1.5"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-(--dark)">
                  Photo URL
                </label>
                <Input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={formData.photoURL}
                  onChange={e =>
                    setFormData({ ...formData, photoURL: e.target.value })
                  }
                  className="mt-1.5"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-(--dark)">
                  Password
                </label>
                <div className="relative mt-1.5">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={e =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-(--text-secondary) mt-1.5">
                  Password must have: 6+ characters, uppercase & lowercase
                  letter
                </p>
              </div>

              <Button
                type="submit"
                variant="secondary"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Register'}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-(--text-secondary)">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Button */}
            <button
              disabled
              onClick={handleGoogleSignUp}
              //   disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 px-4 py-3 font-medium text-(--dark) transition hover:bg-gray-50 disabled:opacity-50"
            >
              <FcGoogle className="h-5 w-5" />
              Continue with Google
            </button>

            <p className="mt-6 text-center text-sm ">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-bold text-(--primary) hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
