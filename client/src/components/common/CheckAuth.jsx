import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const CheckAuth = ({ isAuthenticated, user, children }) => {
    const location = useLocation()

    // If not authenticated and not already on login/register
    if (
        !isAuthenticated &&
        !location.pathname.includes('/login') &&
        !location.pathname.includes('/register')
    ) {
        return <Navigate to="/auth/login" />
    }

    // If authenticated and trying to access login/register
    if (
        isAuthenticated &&
        (location.pathname.includes('/login') || location.pathname.includes('/register'))
    ) {
        if (user?.role === 'admin') {
            return <Navigate to="/admin/dashboard" />
        } else {
            return <Navigate to="/shop/home" />
        }
    }

    // If authenticated but user is not admin and tries to access admin route
    if (
        isAuthenticated &&
        user?.role !== 'admin' &&
        location.pathname.includes('/admin')
    ) {
        return <Navigate to="/unauthpage" />
    }

    // If authenticated admin tries to access shop route
    if (
        isAuthenticated &&
        user?.role === 'admin' &&
        location.pathname.includes('/shop')
    ) {
        return <Navigate to="/admin/dashboard" />
    }

    // Otherwise allow access
    return children
}

export default CheckAuth
