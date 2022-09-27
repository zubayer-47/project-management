import React from 'react'
import { useState } from 'react'
import { useLoginMutation } from '../features/auth/authApi'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading }] = useLoginMutation()
  const resetInput = () => {
    setEmail('')
    setPassword('')
  }
  const handleLogin = (e) => {
    e.preventDefault()
    login({ email, password })
    resetInput()
  }

  return (
    <>
      <div className="text-center bg-gray-100 flex items-center justify-center py-2">
        <p  className='px-2'>
          <span className="text-gray-400"> example1: </span>
          <span className="text-gray-400"> email</span>:{' '}
          <span className="text-gray-600">test4@gmail.com</span>
          <span className="text-gray-400"> pass</span>{' '}
          <span className="text-gray-600">1test@gmail.com</span>
        </p>
        <p className='px-2'>
          <span className="text-gray-400"> example2: </span>
          <span className="text-gray-400"> email</span>:{' '}
          <span className="text-gray-600">test5@gmail.com</span>
          <span className="text-gray-400"> pass</span>{' '}
          <span className="text-gray-600">1test@gmail.com</span>
        </p>
      </div>
      <div className="grid place-items-center h-screen bg-[#F9FAFB">
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img className="mx-auto h-12 w-auto" src="./images/logo.png" alt="Learn with sumit" />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <form className="mt-8 space-y-6" action="#" onSubmit={handleLogin}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-4">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
