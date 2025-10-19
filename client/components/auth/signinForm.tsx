"use client";

import { Button } from "@/components/shadcn/button";
import { Card } from "@/components/shadcn/card";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { cn } from "@/lib/utils";
import { AuthService } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

// const SigninForm: React.FC = () => {
//   const [error, setError] = useState({ email: "", password: "" });
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError({ email: "", password: "" });
//     const email = Object.fromEntries(new FormData(e.target as HTMLFormElement))
//       .email as string;
//     const password = Object.fromEntries(
//       new FormData(e.target as HTMLFormElement)
//     ).password as string;

//     try {
//       await AuthService.signin({ email, password });
//       // setError({ email: "", password: "" });
//       router.push("/");
//     } catch (error) {
//       if (error instanceof Error) {
//         const msg = error.message;
//         // message:
//         // 1. Email and password are required
//         // 2. Incorrect password
//         // 3. Email not found
//         if (msg.includes("User not found")) {
//           setError({ email: msg, password: "" });
//         } else if (msg.includes("Incorrect password")) {
//           setError({ email: "", password: msg });
//         } else if (msg.includes("Email and password are required")) {
//           setError({ email: msg, password: msg }); // @TODO: This error should improve in the future
//         } else {
//           // Unknown error
//           console.error("Something went wrong");
//         }
//       } else {
//         // Unknown error
//         console.error("Something went wrong");
//       }
//     }
//   };
//   // console.log(error);

//   return (
//     <Card className="w-full max-w-sm overflow-hidden p-0">
//       <form className="p-6 md:p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
//         <h1 className="self-center text-2xl font-bold">
//           Sign In to your account
//         </h1>
//         <div className="grid gap-3">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             placeholder="email@example.com"
//             required
//           />
//         </div>
//         {error.email && <p className="text-xs text-red-500">{error.email}</p>}
//         <div className="grid gap-3">
//           {/* <div className="flex items-center"> */}
//             <Label htmlFor="password">Password</Label>
//             {/* <a
//               href="#"
//               className="ml-auto text-sm underline-offset-2 hover:underline"
//             >
//               Forgot your password?
//             </a> */}
//           {/* </div> */}
//           <Input
//             id="password"
//             name="password"
//             type="password"
//             required
//             className={cn("border-2", { "border-red-500": error.password })}
//           />
//           {error.password && (
//             <p className="text-xs text-red-500">{error.password}</p>
//           )}
//         </div>
//         <div>
//           <Button variant={"default"} type="submit" className="w-full">
//             Sign In
//           </Button>
//         </div>
//         <div className="text-center text-sm">
//           Don&apos;t have an account?{" "}
//           <a href="/signup" className="underline underline-offset-4">
//             Sign up
//           </a>
//         </div>
//       </form>
//     </Card>
//   );
// };
const SigninForm: React.FC = () => {
  const [error, setError] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ username: "", password: "" });
    const username = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    ).username as string;
    const password = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    ).password as string;

    try {
      await AuthService.signin({ username, password });
      // setError({ email: "", password: "" });
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        const msg = error.message;
        // message:
        // 1. username and password are required
        // 2. Incorrect password
        // 3. username not found
        if (msg.includes("User not found")) {
          setError({ username: msg, password: "" });
        } else if (msg.includes("Incorrect password")) {
          setError({ username: "", password: msg });
        } else if (msg.includes("Username and password are required")) {
          setError({ username: msg, password: msg }); // @TODO: This error should improve in the future
        } else {
          // Unknown error
          console.error("Something went wrong");
        }
      } else {
        // Unknown error
        console.error("Something went wrong");
      }
    }
  };
  // console.log(error);

  return (
    <Card className="w-full max-w-sm overflow-hidden p-0">
      <form className="p-6 md:p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
        <h1 className="self-center text-2xl font-bold">
          Sign In to your account
        </h1>
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            required
          />
        </div>
        {error.username && (
          <p className="text-xs text-red-500">{error.username}</p>
        )}
        <div className="grid gap-3">
          {/* <div className="flex items-center"> */}
          <Label htmlFor="password">Password</Label>
          {/* <a
              href="#"
              className="ml-auto text-sm underline-offset-2 hover:underline"
            >
              Forgot your password?
            </a> */}
          {/* </div> */}
          <Input
            id="password"
            name="password"
            type="password"
            required
            className={cn("border-2", { "border-red-500": error.password })}
          />
          {error.password && (
            <p className="text-xs text-red-500">{error.password}</p>
          )}
        </div>
        <div>
          <Button variant={"default"} type="submit" className="w-full">
            Sign In
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </form>
    </Card>
  );
};

export default SigninForm;
