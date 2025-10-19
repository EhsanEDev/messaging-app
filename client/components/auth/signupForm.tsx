"use client";

import { Button } from "@/components/shadcn/button";
import { Card, CardContent } from "@/components/shadcn/card";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { cn } from "@/lib/utils";
import { AuthService } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

// const SignupForm: React.FC = () => {
//   const [error, setError] = useState({ username: "", password: "", email: "" });
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError({ username: "", password: "", email: "" });

//     const { email, username, password } = Object.fromEntries(
//       new FormData(e.target as HTMLFormElement)
//     );

//     try {
//       await AuthService.signup({
//         username: username as string,
//         password: password as string,
//         email: email as string,
//       });
//       // setError({ username: "", password: "" });
//       router.push("/");
//     } catch (error) {
//       if (error instanceof Error) {
//         const msg = error.message;
//         if (msg.includes("Username has already been taken")) {
//           setError({ username: msg, password: "", email: "" });
//         } else if (msg.includes("Email is already in use")) {
//           setError({ username: "", password: "", email: msg });
//         } else if (msg.includes("Password is too weak")) {
//           setError({ username: "", password: msg, email: "" });
//         } else if (msg.includes("Username, password, and email are required")) {
//           setError({ username: msg, password: msg, email: msg });
//         } else {
//           console.error("Something went wrong");
//         }
//       } else {
//         console.error("Something went wrong");
//       }
//     }
//   };
//   // console.log(error);

//   return (
//     <Card className="w-full max-w-sm overflow-hidden p-0">
//       <form className="p-6 md:p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
//         <h1 className="self-center text-2xl font-bold">Create your account</h1>
//         <div className="grid gap-3">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             placeholder="email@example.com"
//             required
//           />
//           {error.email && <p className="text-sm text-red-500">{error.email}</p>}
//         </div>
//         <div className="grid gap-3">
//           <Label htmlFor="username">Username</Label>
//           <Input
//             id="username"
//             name="username"
//             type="text"
//             placeholder="username"
//             required
//           />
//           {error.username && (
//             <p className="text-sm text-red-500">{error.username}</p>
//           )}
//         </div>
//         <div className="grid gap-3">
//           <div className="flex items-center">
//             <Label htmlFor="password">Password</Label>
//           </div>
//           <Input id="password" name="password" type="password" required />
//           {error.password && (
//             <p className="text-sm text-red-500">{error.password}</p>
//           )}
//         </div>
//         <div className="grid gap-3">
//           <div className="flex items-center">
//             <Label htmlFor="confirm-password">Confirm Password</Label>
//           </div>
//           <Input
//             id="confirm-password"
//             name="confirm-password"
//             type="password"
//             required
//           />
//           {error.password && (
//             <p className="text-sm text-red-500">{error.password}</p>
//           )}
//         </div>
//         <Button variant={"default"} type="submit" className="w-full">
//           Sign Up
//         </Button>
//         <div className="text-center text-sm">
//           Already have an account?{" "}
//           <a href="/signin" className="underline underline-offset-4">
//             Sign in
//           </a>
//         </div>
//       </form>
//     </Card>
//   );
// };
const SignupForm: React.FC = () => {
  const [error, setError] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ username: "", password: "" });

    const { username, password } = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );

    try {
      await AuthService.signup({
        username: username as string,
        password: password as string,
      });
      // setError({ username: "", password: "" });
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        const msg = error.message;
        if (msg.includes("Username has already been taken")) {
          setError({ username: msg, password: "" });
        } else if (msg.includes("Password is too weak")) {
          setError({ username: "", password: msg });
        } else if (msg.includes("Username and password are required")) {
          setError({ username: msg, password: msg });
        } else {
          console.error("Something went wrong");
        }
      } else {
        console.error("Something went wrong");
      }
    }
  };
  // console.log(error);

  return (
    <Card className="w-full max-w-sm overflow-hidden p-0">
      <form className="p-6 md:p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
        <h1 className="self-center text-2xl font-bold">Create your account</h1>
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="username"
            required
          />
          {error.username && (
            <p className="text-sm text-red-500">{error.username}</p>
          )}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" name="password" type="password" required />
          {error.password && (
            <p className="text-sm text-red-500">{error.password}</p>
          )}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="confirm-password">Confirm Password</Label>
          </div>
          <Input
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
          />
          {error.password && (
            <p className="text-sm text-red-500">{error.password}</p>
          )}
        </div>
        <Button variant={"default"} type="submit" className="w-full">
          Sign Up
        </Button>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <a href="/signin" className="underline underline-offset-4">
            Sign in
          </a>
        </div>
      </form>
    </Card>
  );
};

export default SignupForm;
