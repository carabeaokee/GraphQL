"use client";

import React from "react";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Alert } from "@material-tailwind/react";

const Login = () => {
  // Using the useState hook from React to manage the email and password state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Using the useSignInWithEmailAndPassword hook from Firebase to sign in the user
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  // Next.js hook that gives access to the router object
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSignIn = async (event: any) => {
    event.preventDefault();
    try {
      // Trying to sign in the user with the provided email and password
      const res = await signInWithEmailAndPassword(email, password);
      console.log(res);

      if (!res || !res.user) {
        throw new Error("Incorrect email or password");
      }

      // If sign in is successful, setting the user item in the session storage
      sessionStorage.setItem("user", "true");

      // Clearing the email and password state
      setEmail("");
      setPassword("");

      // Getting the redirect query parameter
      const redirect = searchParams?.get("redirect");

      // Redirecting the user to the redirect URL or the home page
      router.push(redirect || "/");
    } catch (e: any) {
      console.error(e.message); // Log the error message
      setError(e.message); // Display the error message to the user
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
          <h1 className="text-white text-2xl mb-5">Log In</h1>
          <form onSubmit={handleSignIn}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            />

            {error && (
              <Alert color="red" onClose={() => setError("")}>
                {error}
              </Alert>
            )}

            <button
              type="submit"
              className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
            >
              Sign In
            </button>
          </form>
          <Link
            href="/registration"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Not a user? Click here to sign up.
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
