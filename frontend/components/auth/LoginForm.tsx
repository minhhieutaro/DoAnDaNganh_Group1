'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // TODO: Integrate with backend API
      // Example API call:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, rememberMe })
      // });
      
      // if (!response.ok) {
      //   throw new Error('Login failed');
      // }
      
      // const data = await response.json();
      
      // Simulate successful login for now
      console.log('Login attempted with:', { email, password, rememberMe });
      
      // Redirect to dashboard on success
      setTimeout(() => {
        router.push('/');
      }, 1000);
      
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="p-3 bg-red-50 text-red-500 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#7a40f2] focus:border-[#7a40f2] focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#7a40f2] focus:border-[#7a40f2] focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-[#7a40f2] focus:ring-[#7a40f2] border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
            loading 
              ? 'bg-purple-400 cursor-not-allowed' 
              : 'bg-[#7a40f2] hover:bg-[#6930e0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7a40f2]'
          }`}
        >
          {loading ? (
            <>
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              <span>Signing in...</span>
            </>
          ) : (
            <span>Sign in</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;