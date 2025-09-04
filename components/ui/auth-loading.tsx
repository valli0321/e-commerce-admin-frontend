"use client"

import { LoadingSpinner } from "./loading-spinner"
import { Shield } from "lucide-react"

export function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center space-y-6 p-8">
        {/* Logo/Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
            <div className="relative bg-primary rounded-full p-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <LoadingSpinner size="lg" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">Verifying your access</h2>
            <p className="text-gray-600 max-w-sm mx-auto">
              Please wait while we authenticate your credentials and prepare your dashboard
            </p>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}
