"use client";

import React from "react";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const Login = () => {
  // Using the useState hook from React to manage the email and password state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Using the useSignInWithEmailAndPassword hook from Firebase to sign in the user
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  // Using hooks to get the router object, current path and search parameters
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSignIn = async () => {
    try {
      // Trying to sign in the user with the provided email and password
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });

      // If sign in is successful, setting the user item in the session storage
      sessionStorage.setItem("user", "true");

      // Clearing the email and password state
      setEmail("");
      setPassword("");

      // Getting the redirect query parameter
      const redirect = searchParams?.get("redirect");

      // Redirecting the user to the redirect URL or the home page
      router.push(redirect || "/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div></div>
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
          <h1 className="text-white text-2xl mb-5">Log In</h1>
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
          <button
            onClick={handleSignIn}
            className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
          >
            Sign In
          </button>
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
