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
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                console.error("Auth Error:", error.message);
                router.push("/auth/login?error=" + encodeURIComponent(error.message));
                return;
            }

            if (data.session) {
                const token = data.session.access_token;

                // If the source is 'app', redirect using deep link
                if (source === "app") {
                    const deepLink = `godzillacoder://auth?token=${token}`;
                    window.location.href = deepLink;

                    // Fallback UI if deep link isn't captured
                    setTimeout(() => {
                        router.push("/dashboard?status=success");
                    }, 3000);
                    return;
                }

                // Otherwise, go to web dashboard
                router.push("/dashboard");
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
