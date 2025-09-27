import { Button, Input } from "@heroui/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import loginSchema from "../Schema/loginSchema"; // ⬅️ import your schema
import { loginUser } from "../Services/AuthServices";
import { AuthContext } from "../Components/AuthContext";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState("");

  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function signIn(userData) {
    setLoading(true);
    const response = await loginUser(userData);

    if (response?.message === "success") {
      setApiResponse("success");

      // ✅ save token if provided
      if (response.token) {
        localStorage.setItem("token", response.token);
        setIsLoggedIn(response.token);
      }

      setTimeout(() => navigate("/"), 2000); // redirect after 2s
    } else {
      setApiResponse(response?.message || "Login failed");
    }

    setLoading(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950 px-4">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl w-full max-w-2xl p-10 sm:p-16">
        <h1 className="text-4xl mb-5 text-gray-900 dark:text-gray-100">login</h1>
        <form onSubmit={handleSubmit(signIn)} className="flex flex-col gap-6">
          <Input
            isInvalid={Boolean(errors.email)}
            errorMessage={errors.email?.message}
            variant="bordered"
            label="Email"
            {...register("email")}
            type="email"
            className="dark:text-gray-100"
          />

          <Input
            isInvalid={Boolean(errors.password)}
            errorMessage={errors.password?.message}
            variant="bordered"
            label="Password"
            {...register("password")}
            type="password"
            className="dark:text-gray-100"
          />

          <Button
            isLoading={loading}
            type="submit"
            color="warning"
            variant="ghost"
          >
            Login
          </Button>

          {apiResponse && (
            <p
              className={`text-center my-0 capitalize ${
                apiResponse === "success"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {apiResponse}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
