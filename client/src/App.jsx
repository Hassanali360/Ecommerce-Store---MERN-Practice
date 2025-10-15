import { Route, Routes, Navigate } from "react-router-dom"
import Layout from "./components/auth/Layout"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import AdminLayout from "./components/admin-view/Layout"
import AdminDashboard from "./pages/admin-view/Dashboard"
import AdminProducts from "./pages/admin-view/Products"
import AdminOrder from "./pages/admin-view/Order"
import Adminfeatures from "./pages/admin-view/features"
import ShoppingLayout from "./components/shopping-view/Layout"
import Notfound from "./pages/not-found/Index"
import Shoppinghome from "./pages/shopping-view/home"
import ShoppingListing from "./pages/shopping-view/Listing"
import ShoppingAccounts from "./pages/shopping-view/Accounts"
import ShopingCheckout from "./pages/shopping-view/Checkout"
import CheckAuth from "./components/common/CheckAuth"
import Unauth from "./pages/un-auth"

const App = () => {
  const isAuthenticated = false;
   const user = {
    name : "hassan",
    role : "user"
   }
  return (
   


    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Redirect root "/" to "/auth/login" */}
        <Route path="/" element={<Navigate to="/" replace />} />

        {/* Auth routes */}
        <Route path="/auth" element={
          <CheckAuth 
          isAuthenticated={isAuthenticated}
          user={user}
          >
          <Layout/>
        </CheckAuth>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={
          <CheckAuth
          isAuthenticated={isAuthenticated}
          user={user}
          >
            <AdminLayout /> 
          </CheckAuth>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrder />} />
          <Route path="features" element={<Adminfeatures />} />
        </Route>
               {/* shopping routes */}
        <Route path="/shop" element= {
          <CheckAuth 
           isAuthenticated={isAuthenticated}
          user={user}>
            <ShoppingLayout/>
          </CheckAuth>
        }>
           
            <Route path="home" element={<Shoppinghome/>}/>
            <Route path="listing" element={<ShoppingListing/>}/>
            <Route path="Accounts" element={<ShoppingAccounts/>}/>
            <Route path="checkout" element={<ShopingCheckout/>}/>
        </Route>
         <Route path="*" element={<Notfound/>}/>
         <Route path="/unauthpage" element={<Unauth/>}/>
         
      </Routes>
    </div>
  )
}

export default App
