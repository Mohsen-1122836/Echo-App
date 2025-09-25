import * as zod from "zod";

const loginSchema = zod.object({
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
    .min(8, "Password must be at least 8 characters long"),
});

export default loginSchema;
