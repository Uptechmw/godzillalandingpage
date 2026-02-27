export default function Footer() {
    return (
        <footer className="py-12 border-t border-godzilla-border bg-godzilla-bg text-center">
            <div className="container mx-auto px-6">
                <p className="text-godzilla-text-muted text-sm font-medium">
                    © 2026 Godzilla Coder. All rights reserved. Powered by Advanced Agentic AI.
                </p>
                <div className="mt-4 flex justify-center gap-6">
                    <a href="#" className="text-godzilla-text-muted hover:text-white transition-colors text-xs uppercase tracking-widest">Twitter</a>
                    <a href="#" className="text-godzilla-text-muted hover:text-white transition-colors text-xs uppercase tracking-widest">Discord</a>
                    <a href="#" className="text-godzilla-text-muted hover:text-white transition-colors text-xs uppercase tracking-widest">Terms</a>
                </div>
            </div>
        </footer>
    );
}
