import React from 'react';

const Footer = () => {
    return (
        <footer className="py-24 bg-black">
            <div className="enterprise-container overflow-hidden">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 border-t border-border pt-16">
                    <div className="col-span-2">
                        <div className="text-[22px] font-display font-black tracking-tighter mb-8 h-8 text-glow-emerald uppercase">
                            GODZILLA AI
                        </div>
                        <p className="label-micro text-text-faint leading-relaxed max-w-xs lowercase">
                            The multi-model development platform for serious software engineering. Built with uncompromising security and scale.
                        </p>
                    </div>

                    <div>
                        <h4 className="label-micro text-emerald mb-8">Platform</h4>
                        <ul className="space-y-5 text-[14px] font-medium text-text-muted">
                            <li className="hover:text-text cursor-pointer transition-colors">Infrastructure</li>
                            <li className="hover:text-text cursor-pointer transition-colors">Model Router</li>
                            <li className="hover:text-text cursor-pointer transition-colors">Local Runtime</li>
                            <li className="hover:text-text cursor-pointer transition-colors">Pricing Mode</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="label-micro text-emerald mb-8">Engineering</h4>
                        <ul className="space-y-5 text-[14px] font-medium text-text-muted">
                            <li className="hover:text-text cursor-pointer transition-colors">Documentation</li>
                            <li className="hover:text-text cursor-pointer transition-colors">API Reference</li>
                            <li className="hover:text-text cursor-pointer transition-colors">CLI Tools</li>
                            <li className="hover:text-text cursor-pointer transition-colors">System Status</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="label-micro text-emerald mb-8">Security</h4>
                        <ul className="space-y-5 text-[14px] font-medium text-text-muted">
                            <li className="hover:text-text cursor-pointer transition-colors">Security Page</li>
                            <li className="hover:text-text cursor-pointer transition-colors">Privacy Policy</li>
                            <li className="hover:text-text cursor-pointer transition-colors">Terms of Service</li>
                            <li className="hover:text-text cursor-pointer transition-colors">Compliance</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="label-micro text-emerald mb-8">Connect</h4>
                        <ul className="space-y-5 text-[14px] font-medium text-text-muted">
                            <li className="hover:text-text cursor-pointer transition-colors font-mono lowercase">support@godzillaai.dev</li>
                            <li className="hover:text-text cursor-pointer transition-colors font-mono lowercase">enterprise@godzillaai.dev</li>
                            <li className="hover:text-text cursor-pointer transition-colors font-mono lowercase">security@godzillaai.dev</li>
                            <li className="hover:text-text cursor-pointer transition-colors">GitHub Repository</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 flex justify-between items-center label-micro text-text-faint lowercase">
                    <span>&copy; {new Date().getFullYear()} Godzilla Infrastructure AI.</span>
                    <span>Deployment: Local + Edge Grid</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
