import React from 'react';
import { Mail, Phone, Globe, Instagram, Linkedin, Facebook, Youtube, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
    const services = [
        { name: 'Career Counselling', href: '#services' },
        { name: 'Study Abroad', href: '#study' },
        { name: 'Indian Admissions', href: '#programs' },
        { name: 'Certifications', href: '#skills' },
        { name: 'Scientific Events', href: '#events' },
        { name: 'Startups Support', href: '#startups' },
    ];

    const quickLinks = [
        { name: 'About Us', href: '#' },
        { name: 'Our Process', href: '#' },
        { name: 'Scientific Research', href: '#' },
        { name: 'Strategic Terms', href: '#' },
        { name: 'Privacy Policy', href: '#' },
    ];

    const socialLinks = [
        { icon: Linkedin, href: 'https://www.linkedin.com/company/onegrasp/', label: 'LinkedIn' },
        { icon: Instagram, href: 'https://www.instagram.com/onegrasp?igsh=MWF5bGM5YTRobHVpYw%3D%3D&utm_source=qr', label: 'Instagram' },
        { icon: Facebook, href: 'https://www.facebook.com/share/1EqZSLrsEe/?mibextid=wwXIfr', label: 'Facebook' },
        { icon: Youtube, href: 'https://youtube.com/@onegrasp?si=vTVaNUbq2PZ-vpu6', label: 'YouTube' },
    ];

    return (
        <footer className="bg-[#020617] text-white pt-24 pb-12 overflow-hidden relative">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-0"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[80px] -z-0"></div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <div>
                            <img src="/logo.png" alt="OneGrasp" className="h-12 w-auto brightness-0 invert" />
                            <p className="mt-6 text-gray-400 font-medium leading-relaxed max-w-sm">
                                Future-proofing your journey with scientific roadmaps and global opportunities. Building the next generation of global boardrooms.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all border border-white/10 group"
                                >
                                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-blue-500">Our Services</h4>
                        <ul className="space-y-4">
                            {services.map((item) => (
                                <li key={item.name}>
                                    <a href={item.href} className="text-gray-400 hover:text-white transition-colors font-bold text-sm flex items-center gap-2 group">
                                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-teal-500">Quick Links</h4>
                        <ul className="space-y-4">
                            {quickLinks.map((item) => (
                                <li key={item.name}>
                                    <a href={item.href} className="text-gray-400 hover:text-white transition-colors font-bold text-sm">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-indigo-500">Contact Support</h4>
                        <div className="space-y-6">
                            <a href="mailto:support@onegrasp.com" className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1">Email Experts</p>
                                    <p className="text-sm font-black group-hover:text-blue-500 transition-colors">support@onegrasp.com</p>
                                </div>
                            </a>
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-teal-600/10 flex items-center justify-center text-teal-500 border border-teal-500/20">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1">Connect Desk</p>
                                    <p className="text-sm font-black transition-colors">+91-89777 60443</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1">HQ Location</p>
                                    <p className="text-sm font-black transition-colors">Global Operations</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">
                        © 2025 OneGrasp. All Rights Reserved. Building International Boardrooms.
                    </p>
                    <div className="flex gap-8 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">
                        <a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-blue-500 transition-colors">Terms</a>
                        <a href="#" className="hover:text-blue-500 transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
