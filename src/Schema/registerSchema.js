import * as zod from "zod";

const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(2, "Name must be at least 2 characters long")
      .max(20, "Name must be at most 20 characters long"),
    email: zod
      .string()
      .nonempty("Email is required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Enter valid email"
      ),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
      ),
    rePassword: zod.string().nonempty("Confirm Password is required"),
    dateOfBirth: zod.coerce
      .date("Age must be 18 or older")
      .refine((date) => {
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        return age >= 18;
      }, "You must be at least 18 years old"),
    gender: zod.string().nonempty("Gender is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

export default registerSchema;
