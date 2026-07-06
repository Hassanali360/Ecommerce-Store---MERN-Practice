import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginformControls } from '@/config'
import Form from '@/components/common/Form' // ← make sure you import your Form component
import { useDispatch } from 'react-redux'
import { loginUser } from '@/store/auth-slice'

const initialState = {
  email: "",
  password: "",
}

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState)
const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault()
    console.log("Form Submitted:", formData) // ✅ fixed variable name + syntax
    dispatch(loginUser(formData)).then(data=>{
      console.log(data);
    })
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign In to your Account
        </h1>
        <p className="mt-2">
          Don&apos;t have an account?{" "}
          <Link
            className="text-primary font-medium hover:underline"
            to="/auth/register"
          >
            Register Here
          </Link>
        </p>
      </div>

      <Form
        formControls={loginformControls} // ✅ fixed typo
        buttontext="Login"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthLogin
