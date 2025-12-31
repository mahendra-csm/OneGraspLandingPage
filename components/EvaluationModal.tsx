import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, CheckCircle2 } from 'lucide-react';

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

    // Update service when preSelectedService changes
    React.useEffect(() => {
        if (preSelectedService && isOpen) {
            setFormData(prev => ({ ...prev, service: preSelectedService }));
        }
    }, [preSelectedService, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
            onClose();
            setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        }, 2000);
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
                        <div className="bg-gradient-to-r from-indigo-600 to-teal-400 p-4 sm:p-5 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 sm:p-3 z-10">
                                <button
                                    onClick={onClose}
                                    className="p-1 sm:p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md cursor-pointer"
                                >
                                    <X size={16} className="sm:w-[18px] sm:h-[18px]" />
                                </button>
                            </div>
                            <h2 className="text-lg sm:text-xl font-bold mb-1">Get Evaluated Free</h2>
                            <p className="text-white/90 text-xs sm:text-sm">
                                Start your journey with a personalized roadmap.
                            </p>

                            {/* Decorative circles */}
                            <div className="absolute -top-10 -left-10 w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full blur-2xl" />
                            <div className="absolute -bottom-10 -right-10 w-20 h-20 sm:w-24 sm:h-24 bg-teal-400/20 rounded-full blur-2xl" />
                        </div>

                        {/* Content */}
                        <div className="p-4 sm:p-5 md:p-6 max-h-[70vh] sm:max-h-none overflow-y-auto">
                            {isSuccess ? (
                                <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                        className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4 text-green-600"
                                    >
                                        <CheckCircle2 size={28} className="sm:w-8 sm:h-8" />
                                    </motion.div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-500 max-w-[250px] text-xs sm:text-sm">
                                        You have taken first step towards to your career
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                        <div className="space-y-1 sm:space-y-1.5">
                                            <label className="text-xs sm:text-sm font-semibold text-gray-700 ml-1">Name</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                                                placeholder="Full Name"
                                            />
                                        </div>
                                        <div className="space-y-1 sm:space-y-1.5">
                                            <label className="text-xs sm:text-sm font-semibold text-gray-700 ml-1">Phone</label>
                                            <input
                                                required
                                                type="tel"
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                                                placeholder="+91 8977760442"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1 sm:space-y-1.5">
                                        <label className="text-xs sm:text-sm font-semibold text-gray-700 ml-1">Email</label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                                            placeholder="support@onegrasp.com"
                                        />
                                    </div>

                                    <div className="space-y-1 sm:space-y-1.5">
                                        <label className="text-xs sm:text-sm font-semibold text-gray-700 ml-1">Interested Service</label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={formData.service}
                                                onChange={e => setFormData({ ...formData, service: e.target.value })}
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Select a service</option>
                                                {services.map(service => (
                                                    <option key={service} value={service}>{service}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                                        </div>
                                    </div>

                                    <div className="space-y-1 sm:space-y-1.5">
                                        <label className="text-xs sm:text-sm font-semibold text-gray-700 ml-1">Any Message</label>
                                        <textarea
                                            rows={3}
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none resize-none"
                                            placeholder="Anything you want to share with us..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3 sm:py-4 bg-gray-900 text-white rounded-xl font-bold text-sm sm:text-[15px] shadow-lg shadow-gray-900/10 hover:shadow-gray-900/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
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
