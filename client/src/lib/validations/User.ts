import * as z from "zod";

export const UserLoginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const UserRegisterValidation = UserLoginValidation.extend({
  fullname: z.string().min(3).max(50),
  password: z.string().min(8),
  confirmPassword: z.string(),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
});
