import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Calendar, Clock, Send } from 'lucide-react';

interface FreeSessionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const timeSlots = [
    "10:00 AM - 11:00 AM",
    "11:30 AM - 12:30 PM",
    "02:00 PM - 03:00 PM",
    "04:00 PM - 05:00 PM",
    "05:30 PM - 06:30 PM"
];

const FreeSessionModal: React.FC<FreeSessionModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        query: '',
        timeSlot: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
            setFormData({ name: '', email: '', phone: '', query: '', timeSlot: '' });
        }, 2500);
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 40 },
        visible: {
            opacity: 1, scale: 1, y: 0,
            transition: { type: "spring", damping: 25, stiffness: 400 }
        },
        exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 mb-12">
                    <motion.div
                        initial="hidden" animate="visible" exit="hidden"
                        variants={overlayVariants} onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                    />

                    <motion.div
                        initial="hidden" animate="visible" exit="exit"
                        variants={modalVariants}
                        className="relative w-full max-w-md bg-white rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] overflow-hidden border border-slate-100"
                    >
                        <div className="p-6 sm:p-8 bg-slate-50/50 border-b border-slate-100 relative">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
                            >
                                <X size={18} />
                            </button>
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4 text-blue-500" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Consultation Booking</span>
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Book Free Session</h2>
                        </div>

                        <div className="p-6 sm:p-8">
                            {isSuccess ? (
                                <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in zoom-in duration-500">
                                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-500 shadow-sm">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-2">Session Booked!</h3>
                                    <p className="text-slate-500 font-bold text-sm max-w-[240px] mx-auto leading-relaxed">
                                        We'll confirm your slot at <span className="text-blue-600">{formData.timeSlot}</span> shortly.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[12px] font-black text-slate-800 uppercase tracking-wider ml-1">Full Name</label>
                                        <input
                                            required type="text" value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300 text-sm"
                                            placeholder="Enter your name"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[12px] font-black text-slate-800 uppercase tracking-wider ml-1">Phone</label>
                                            <input
                                                required type="tel" value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300 text-sm"
                                                placeholder="+91 897XX XXXXX"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[12px] font-black text-slate-800 uppercase tracking-wider ml-1">Email</label>
                                            <input
                                                required type="email" value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300 text-sm"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[12px] font-black text-slate-800 uppercase tracking-wider ml-1">Preferred Timing</label>
                                        <div className="grid grid-cols-1 gap-2">
                                            <div className="relative">
                                                <select
                                                    required
                                                    value={formData.timeSlot}
                                                    onChange={e => setFormData({ ...formData, timeSlot: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none font-bold text-slate-900 appearance-none cursor-pointer text-sm"
                                                >
                                                    <option value="" disabled>Select a time slot</option>
                                                    {timeSlots.map(slot => (
                                                        <option key={slot} value={slot}>{slot}</option>
                                                    ))}
                                                </select>
                                                <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[12px] font-black text-slate-800 uppercase tracking-wider ml-1">Your Query</label>
                                        <textarea
                                            required rows={3} value={formData.query}
                                            onChange={e => setFormData({ ...formData, query: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300 resize-none min-h-[80px] text-sm"
                                            placeholder="What would you like to discuss?"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                Confirming...
                                            </span>
                                        ) : (
                                            <>
                                                Book My Session
                                                <Send className="w-4 h-4" />
                                            </>
                                        )}
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

export default FreeSessionModal;
