"use client";

import { useEffect, Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

function AuthCallbackHandler() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const source = searchParams.get("source");

    useEffect(() => {
        const handleAuth = async () => {
            try {
                // For OAuth (GitHub/Google), Supabase passes the token in the URL hash.
                // supabase.auth.getSession() will automatically parse it.
                const { data, error } = await supabase.auth.getSession();

                if (error || !data.session) {
                    console.error("Auth Callback Error:", error?.message || "No session found");
                    router.push("/auth/login?error=" + encodeURIComponent(error?.message || "Authentication failed"));
                    return;
                }

                const accessToken = data.session.access_token;

                // Provision/sync the user in our Prisma database
                try {
                    const response = await fetch("/api/auth/provision", {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        const errData = await response.json().catch(() => ({}));
                        console.error("[Provision Error]", errData.error);
                        // Don't block login if provisioning fails — Supabase session is still valid
                    }
                } catch (provisionErr) {
                    console.error("[Provision Network Error]", provisionErr);
                    // Continue — the user still has a valid Supabase session
                }

                // If the source is the desktop app, redirect using deep link
                if (source === "app") {
                    const deepLink = `godzillacoder://auth?token=${accessToken}`;
                    window.location.href = deepLink;
                    // Fallback if deep link isn't captured
                    setTimeout(() => {
                        router.push("/dashboard?status=success");
                    }, 3000);
                    return;
                }

                // Otherwise, go to the web dashboard
                router.push("/dashboard");
            } catch (err: any) {
                console.error("Unexpected Auth Callback Error:", err);
                router.push("/auth/login?error=" + encodeURIComponent("Unexpected error during authentication"));
            }
        };

        handleAuth();
    }, [router, source]);

    return (
        <div className="min-h-screen bg-godzilla-bg flex flex-col items-center justify-center p-6 text-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="text-godzilla-accent mb-8"
            >
                <Loader2 className="w-12 h-12" />
            </motion.div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Atomic Synchronization</h1>
            <p className="text-godzilla-text-muted max-w-sm font-bold">
                {source === "app"
                    ? "Finalizing secure link to Godzilla Coder desktop. If you aren't redirected, please check your application."
                    : "Securing your connection to the Godzilla Coder ecosystem..."
                }
            </p>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-godzilla-bg flex flex-col items-center justify-center p-6 text-center">
                <Loader2 className="w-12 h-12 text-godzilla-accent animate-spin mb-4" />
                <p className="text-godzilla-text-muted font-bold italic">Initializing Atomic Link...</p>
            </div>
        }>
            <AuthCallbackHandler />
        </Suspense>
    );
}
