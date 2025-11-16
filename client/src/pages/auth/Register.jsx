import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import Form from "@/components/common/Form";
import { registerformControls } from "@/config";
import { toast, Toaster } from "react-hot-toast";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await dispatch(registerUser(formData));

      if (result?.payload?.success) {
        toast.success(result?.payload?.message || "Registration Successful");
        navigate("/auth/login");
      } else {
        toast.error(result?.payload?.message || "Registration Failed");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

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
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Register;
