import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from '@/components/common/Form'
import { registerformControls } from '@/config'

const initialState = {
  userName: "",
  email: "",
  password: "",
}

const Register = () => {
  const [formData, setFormData] = useState(initialState)

  // ✅ Define the function properly
  const onSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // You can add API call or validation logic here
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create New Account
        </h1>
        <p className="mt-2">
          Already have an account?{" "}
          <Link
            className="text-primary font-medium hover:underline"
            to="/auth/login"
          >
            Login Here
          </Link>
        </p>
      </div>

      <Form
        formControls={registerformControls}
        buttontext="Sign Up"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit} // ✅ correctly passed
      />
    </div>
  )
}

export default Register
