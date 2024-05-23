"use client";
import React, { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";

// Redirection page component
const Redirection = () => {
  // State to hold the countdown value
  const [redirectCountdown, setRedirectCountdown] = useState(4);
  // State to hold the start redirect value
  const [startRedirect, setStartRedirect] = useState(false);
  // State to hold the user object
  const [user, setUser] = useState<User | null>(null);
  // Next.js hook that gives us access to the router object
  const router = useRouter();

  useEffect(() => {
    // if there's no user, set startRedirect to true
    if (!user) {
      setStartRedirect(true);
    }
  }, [user]);

  // useEffect hook to handle the countdown
  useEffect(() => {
    // Timer to countdown
    let timer: NodeJS.Timeout;
    if (startRedirect && redirectCountdown > 0) {
      timer = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1);
      }, 1000);
      // Redirect to login page when countdown reaches 0
    } else if (startRedirect && redirectCountdown === 0) {
      router.push("/login");
    }
    // Cleanup timer
    return () => {
      clearTimeout(timer);
    };
  }, [startRedirect, redirectCountdown]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <br />
        {startRedirect && (
          <div>
            Must be logged in. Redirecting to log-in page in {redirectCountdown}{" "}
            seconds...
          </div>
        )}
      </div>
    </main>
  );
};

export default Redirection;
