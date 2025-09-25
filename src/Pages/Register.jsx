import { Button, Input, Select, SelectItem } from "@heroui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendSignUpData } from "../Services/AuthServices";
import { Navigate, useNavigate } from "react-router-dom";
import  registerSchema  from "../Schema/registerSchema";


  registerSchema.refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });
  export default function Register() {

  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState('');

    const navigate = useNavigate();
    
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
     dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(registerSchema),
  });
  
async function signUp(userData) {
  setLoading(true);
  const response = await sendSignUpData(userData); // response is now { message: "success" } OR { message: "error text" }

  if (response?.message === "success") {
  // save credentials in localStorage
  localStorage.setItem("userCredentials", JSON.stringify({
    email: userData.email,
    password: userData.password,
  }));

  setApiResponse("success");
  setTimeout(() => navigate("/login"), 2000);
} else {
  setApiResponse(response?.message);
}

  setLoading(false);
}

  return (
    <>
     <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
  <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-10 sm:p-16">
          <h1 className="text-4xl mb-5">register now</h1>
          <form onSubmit={handleSubmit(signUp)} className="flex flex-col gap-6">
            <Input
              isInvalid={Boolean(errors.name)}
              errorMessage={errors.name?.message}
              variant="bordered"
              label="Name"
              name="name"
              {...register("name")}
              type="text"
            />
            <Input
              isInvalid={Boolean(errors.email)}
              errorMessage={errors.email?.message}
              variant="bordered"
              label="Email"
              name="email"
              {...register("email")}
              type="email"
            />
            <Input
              isInvalid={Boolean(errors.password)}
              errorMessage={errors.password?.message}
              variant="bordered"
              label="Password"
              name="password"
              {...register("password")}
              type="password"
            />
            <Input
              isInvalid={Boolean(errors.rePassword)}
              errorMessage={errors.rePassword?.message}
              variant="bordered"
              label="Confirm Password"
              name="rePassword"
              {...register("rePassword")}
              type="password"
            />

            <div className="flex flex-col sm:flex-row gap-4 ">
              {" "}
              <Input
                variant="bordered"
                isInvalid={Boolean(errors.dateOfBirth)}
                errorMessage={errors.dateOfBirth?.message}
                label="Date of Birth"
                name="dateOfBirth"
                {...register("dateOfBirth")}
                type="date"
              />
              <Select
                variant="bordered"
                name="gender"
                isInvalid={Boolean(errors.gender)}
                errorMessage={errors.gender?.message}
                {...register("gender")}
                label="Select Your Gender"
              >
                <SelectItem key="male">Male</SelectItem>
                <SelectItem key="female">Female</SelectItem>
              </Select>
            </div>
            <Button isLoading={loading} type="submit" color="warning" variant="ghost">
              Register
            </Button>


          {apiResponse === 'success' ? <p className="text-green-500 text-center my-0 capitalize">success</p> : apiResponse && 
          <p className="text-red-500 text-center my-0 capitalize">{apiResponse}</p>
          }

          </form>
        </div>
      </div>
    </>
  );
}
