import React from 'react';
import { ArrowRight, Sparkles, Play, TrendingUp, ShieldCheck } from 'lucide-react';

const Hero: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  return (
    <section className="relative min-h-screen sm:min-h-[95vh] flex items-center pt-24 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-[#F9FAFB]">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-full sm:w-[60%] h-full bg-white -z-10 rounded-l-[80px] sm:rounded-l-[240px] shadow-2xl shadow-blue-500/5"></div>
      <div className="absolute -top-64 -left-64 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-blue-50/50 rounded-full blur-[180px] -z-10"></div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-12 sm:gap-24 items-center">
        <div className="space-y-8 sm:space-y-12 animate-reveal-hero">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl bg-white border border-gray-100 text-blue-600 text-[11px] sm:text-[14px] font-black tracking-widest uppercase shadow-xl shadow-black/5">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 fill-blue-600" />
              <span className="hidden sm:inline">Empowering 2 Million Learners Globally</span>
              <span className="sm:hidden">2M+ Learners Globally</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Decode your <span className="bg-gradient-to-r from-indigo-600 via-sky-500 to-teal-400 bg-clip-text text-transparent">future</span>
            </h1>
            <div className="w-20 sm:w-28 h-1 bg-blue-600/30 rounded mt-4"></div>

            <p className="text-lg sm:text-2xl text-gray-500 max-w-xl leading-relaxed font-semibold">
              We scientifically decode your potential to build a strategic 15-year roadmap for your professional life.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <a href="#service-showcase" className="inline-flex items-center justify-center px-8 sm:px-12 py-4 sm:py-6 bg-blue-600 text-white font-black rounded-[2rem] text-base sm:text-xl shadow-2xl shadow-blue-500/40 hover:bg-blue-700 hover:-translate-y-2 transition-all group button-shine">
              Explore Services
              <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-7 sm:h-7 group-hover:translate-x-2 transition-transform" />
            </a>
            <button
              onClick={onOpenModal}
              className="inline-flex items-center justify-center px-8 sm:px-12 py-4 sm:py-6 bg-white border-2 border-gray-100 text-gray-900 font-black rounded-[2rem] text-base sm:text-xl hover:border-blue-600 hover:text-blue-600 transition-all group"
            >
              <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-50 flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-blue-50 transition-colors">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-1" />
              </span>
              Get 15 Year Career Roadmap
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 pt-6 sm:pt-10 border-t border-gray-200/60">
            <div className="flex -space-x-3 sm:-space-x-5">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-white overflow-hidden shadow-2xl transform hover:-translate-y-3 transition-all cursor-pointer">
                  <img src={`https://i.pravatar.cc/150?u=${i + 40}`} alt="OneGrasp Scholar" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">4.9/5 Average Rating</p>
              <p className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest">Global Educational Experts</p>
            </div>
          </div>
        </div>

        <div className="relative animate-drift lg:mt-0 mt-12 block lg:opacity-100 opacity-90">
          <div className="relative z-10 rounded-[2rem] sm:rounded-[5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] lg:shadow-[0_60px_120px_-20px_rgba(0,0,0,0.2)] p-2 sm:p-4 bg-white border border-gray-50">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"
              alt="Education Future"
              className="rounded-[1.75rem] sm:rounded-[4rem] w-full aspect-[4/5] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            {/* Dynamic Data Badge */}
            <div className="absolute bottom-8 sm:bottom-16 left-6 right-6 sm:left-12 sm:right-12 glass-card p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 font-bold uppercase text-[9px] sm:text-[11px] tracking-widest mb-1">Career Transformation Rate</p>
                  <p className="text-3xl sm:text-5xl font-black text-blue-600">98.4%</p>
                </div>
                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-blue-600 rounded-[1rem] sm:rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-blue-500/40">
                  <TrendingUp className="w-7 h-7 sm:w-10 sm:h-10" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-8 sm:-top-12 -right-8 sm:-right-12 z-20 bg-white p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl border border-gray-100 flex items-center gap-3 sm:gap-4 animate-drift" style={{ animationDelay: '1s' }}>
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
              <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <p className="text-base sm:text-xl font-black">AI Verified</p>
              <p className="text-[10px] sm:text-xs text-gray-400">Career Insights</p>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-blue-100/40 rounded-full blur-[140px] -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;