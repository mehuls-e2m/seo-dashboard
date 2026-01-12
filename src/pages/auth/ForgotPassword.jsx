import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft } from 'lucide-react'
import AuthLayout from '../../components/AuthLayout'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Frontend-only: Just show success message
    setSubmitted(true)
  }

  return (
    <AuthLayout title="Forgot Password" subtitle="Enter your email to receive a reset link">
          {submitted ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Check your email</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors">
                If an account exists with that email, you'll receive a password reset link.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-primary-orange hover:text-orange-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-orange hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Send Reset Link
              </button>

              <Link
                to="/login"
                className="block text-center text-sm text-primary-orange hover:text-orange-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 inline mr-2" />
                Back to login
              </Link>
            </form>
          )}
    </AuthLayout>
  )
}

