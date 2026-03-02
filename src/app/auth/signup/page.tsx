"use client";

import LoginPage from "../login/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// The LoginPage component now handles both Sign In and Sign Up modes.
// Simply redirecting /auth/signup to /auth/login ensures a single source of truth 
// while maintaining the existing URL semantics.
export default function SignupPage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/auth/login?mode=signup");
    }, [router]);

    return (
        <div className="min-h-screen bg-[#0B1220] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
        </div>
    );
}
