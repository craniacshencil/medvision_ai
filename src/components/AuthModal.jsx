"use client"

import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { motion } from "framer-motion"
import { FiUser, FiMail, FiLock, FiX } from "react-icons/fi"

export default function AuthModal({ isOpen, setIsOpen, onSuccess, mode = "login" }) {
  const [authMode, setAuthMode] = useState(mode)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle authentication here
    console.log("Form submitted:", formData)

    // In a real app, you would validate with a backend
    // For demo purposes, we'll just simulate a successful login
    onSuccess({
      id: "123",
      name: formData.name || "Demo User",
      email: formData.email,
    })

    setIsOpen(false)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {authMode === "login" ? "Welcome Back" : "Create Account"}
                  </Dialog.Title>
                  <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-500">
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {authMode === "register" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    {authMode === "login" ? "Sign In" : "Create Account"}
                  </motion.button>
                </form>

                <div className="mt-4 text-center text-sm">
                  <button
                    className="text-primary-600 hover:text-primary-500"
                    onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
                  >
                    {authMode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}


