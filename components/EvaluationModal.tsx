import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, CheckCircle2, Phone, MessageCircle } from 'lucide-react';

interface EvaluationModalProps {
    isOpen: boolean;
    onClose: () => void;
    preSelectedService?: string;
}

const services = [
    "Career Counselling",
    "Study Abroad Consulting",
    "Indian Admissions",
    "Certification Courses",
    "Scientific Events",
    "Startup Incubation"
];

const EvaluationModal: React.FC<EvaluationModalProps> = ({ isOpen, onClose, preSelectedService }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect if user is on mobile device
    useEffect(() => {
        const checkMobile = () => {
            const userAgent = navigator.userAgent || navigator.vendor;
            const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
            setIsMobile(isMobileDevice || window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle call/WhatsApp click
    const handleContactClick = () => {
        const phoneNumber = '918977760443';
        if (isMobile) {
            // On mobile, redirect to phone call
            window.location.href = `tel:+${phoneNumber}`;
        } else {
            // On desktop/laptop, open WhatsApp
            const message = encodeURIComponent('Hi! I am interested in getting evaluated. Please help me with more information.');
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        }
    };

    // Update service when preSelectedService changes
    React.useEffect(() => {
        if (preSelectedService && isOpen) {
            setFormData(prev => ({ ...prev, service: preSelectedService }));
        }
    }, [preSelectedService, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("access_key", "68a9e3ab-4678-4d09-9a42-6d91c440e355");
            formDataToSend.append("name", formData.name);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("phone", formData.phone);
            formDataToSend.append("service", formData.service);
            formDataToSend.append("message", formData.message || "No message provided");
            formDataToSend.append("subject", `New Evaluation Request - ${formData.service}`);

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formDataToSend
            });

            const data = await response.json();

            if (data.success) {
                setIsSubmitting(false);
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    onClose();
                    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
                }, 2000);
            } else {
                setIsSubmitting(false);
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            setIsSubmitting(false);
            alert("Failed to submit. Please check your internet connection.");
        }
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.95,
            y: 20,
            rotateX: 10
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 300
            }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            y: 20,
            transition: { duration: 0.2 }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={overlayVariants}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={modalVariants}
                        className="relative w-full max-w-[95%] sm:max-w-md bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-teal-400 p-3 sm:p-4 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 z-10">
                                <button
                                    onClick={onClose}
                                    className="p-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md cursor-pointer"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                            <h2 className="text-base sm:text-lg font-bold">Get Evaluated Free</h2>
                            <p className="text-white/90 text-xs">
                                Start your journey with a personalized roadmap.
                            </p>

                            {/* Decorative circles */}
                            <div className="absolute -top-10 -left-10 w-16 h-16 bg-white/10 rounded-full blur-2xl" />
                            <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-teal-400/20 rounded-full blur-2xl" />
                        </div>

                        {/* Content */}
                        <div className="p-3 sm:p-4 max-h-[70vh] overflow-y-auto">
                            {/* Quick Contact Option */}
                            <button
                                onClick={handleContactClick}
                                className="w-full mb-3 p-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-semibold text-sm shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                            >
                                {isMobile ? (
                                    <>
                                        <Phone size={16} />
                                        <span>Call Us: 8977760443</span>
                                    </>
                                ) : (
                                    <>
                                        <MessageCircle size={16} />
                                        <span>WhatsApp: 8977760443</span>
                                    </>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative flex items-center justify-center my-3">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <span className="relative bg-white px-2 text-xs text-gray-500">
                                    Or fill the form
                                </span>
                            </div>

                            {isSuccess ? (
                                <div className="flex flex-col items-center justify-center py-4 text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                        className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2 text-green-600"
                                    >
                                        <CheckCircle2 size={24} />
                                    </motion.div>
                                    <h3 className="text-base font-bold text-gray-900 mb-1">Message Sent!</h3>
                                    <p className="text-gray-500 text-xs">
                                        You have taken first step towards your career
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                                            placeholder="Full Name"
                                        />
                                        <input
                                            required
                                            type="tel"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                                            placeholder="Phone Number"
                                        />
                                    </div>

                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                                        placeholder="Email Address"
                                    />

                                    <div className="relative">
                                        <select
                                            required
                                            value={formData.service}
                                            onChange={e => setFormData({ ...formData, service: e.target.value })}
                                            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>Select a service</option>
                                            {services.map(service => (
                                                <option key={service} value={service}>{service}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
                                    </div>

                                    <textarea
                                        rows={2}
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none resize-none"
                                        placeholder="Any comments (optional)"
                                    />

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-2.5 bg-gray-900 text-white rounded-lg font-semibold text-sm shadow-lg shadow-gray-900/10 hover:shadow-gray-900/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Processing...
                                            </span>
                                        ) : 'Submit Request'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EvaluationModal;
