import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTokenContext } from '../context/TokenContext'
import toast from 'react-hot-toast'
import { BiHide, BiShow  } from "react-icons/bi";

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword)
    }

    const { storeToken } = useTokenContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`https://todo-tawny-beta-13.vercel.app/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            if (res.ok) {
                const data = await res.json()
                storeToken(data.token)
                toast.success(`Login success`)
            } else {
                toast.error(`Login failed`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-3xl font-semibold text-center mb-4">Welcome Back</h1>
                <p className="text-center text-gray-600 mb-6">Sign in to your account</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder='you@example.com'
                            id="email"
                            value={user.email}
                            onChange={handleChange}
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder='••••••••'
                                value={user.password}
                                onChange={handleChange}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button
                                type="button"
                                onClick={handlePasswordToggle}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                            >
                                {!showPassword ? <BiHide /> : <BiShow />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-700">Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login
