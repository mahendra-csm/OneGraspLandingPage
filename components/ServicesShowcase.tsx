import React from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform
} from 'framer-motion';
import {
  Brain,
  Plane,
  GraduationCap,
  Award,
  Microscope,
  Lightbulb,
  Zap,
  ChevronRight
} from 'lucide-react';

// --- Core Data & Types ---
interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  tagline: string;
  features: string[];
  mockupBg: string;
  anchor: string;
}

const SERVICES: Service[] = [
  {
    id: 1,
    title: "Career Counselling",
    description: "A scientific, multi-dimensional assessment evaluating personality, interests, and skills to create a 15-year roadmap.",
    icon: "Brain",
    color: "#5c6bc0",
    tagline: "Psychometric Assessment",
    features: ["15-Year Career Roadmap", "Skill Mapping", "Informed Decisions"],
    mockupBg: "bg-gradient-to-br from-[#5c6bc0] to-[#3f51b5]",
    anchor: "#services"
  },
  {
    id: 2,
    title: "Study Abroad",
    description: "End-to-end guidance for admissions across 20+ countries and 3000+ universities. Profile evaluation and visa assistance.",
    icon: "Plane",
    color: "#e91e63",
    tagline: "Study Abroad Admissions",
    features: ["University Shortlisting", "SOP/LOR Support", "Visa Assistance"],
    mockupBg: "bg-gradient-to-br from-[#e91e63] to-[#c2185b]",
    anchor: "#study"
  },
  {
    id: 3,
    title: "India Admissions",
    description: "Access to 2000+ Indian institutions and 150+ online universities for flexible learning in Tech, AI, and Management.",
    icon: "GraduationCap",
    color: "#3fd1a6",
    tagline: "Degree Programs",
    features: ["AI & Data Science", "Management & Business", "On-Campus/Online"],
    mockupBg: "bg-gradient-to-br from-[#3fd1a6] to-[#20a682]",
    anchor: "#programs"
  },
  {
    id: 4,
    title: "Certifications and Internships",
    description: "Career-oriented certifications, bootcamps, and 300+ virtual internships designed to improve global employability.",
    icon: "Award",
    color: "#F6978D",
    tagline: "Certifications",
    features: ["A Global Reach on Skills", "Psychometric Test & Internships", "Soft Skills to Tech Certification"],
    mockupBg: "bg-gradient-to-br from-[#F6978D] via-[#e67e5e] to-[#c25e4e]",
    anchor: "#skills"
  },
  {
    id: 5,
    title: "Scientific Events",
    description: "Organization of scientific conferences, FDPs, and workshops. Build portfolios through research and global awards.",
    icon: "Microscope",
    color: "#FFDD3C",
    tagline: "Scientific Conferences",
    features: ["Research Exposure", "Portfolio Building", "Portfolio Recognitions"],
    mockupBg: "bg-gradient-to-br from-[#FFDD3C] to-[#f39c12]",
    anchor: "#events"
  },
  {
    id: 6,
    title: "Startups",
    description: "A structured ecosystem for idea incubation, mentorship, funding access, and scaling for aspiring founders.",
    icon: "Lightbulb",
    color: "#8e24aa",
    tagline: "Investors Connect",
    features: ["Idea Incubation", "Mentorship Circles", "GTM Strategy"],
    mockupBg: "bg-gradient-to-br from-[#8e24aa] to-[#4a148c]",
    anchor: "#startups"
  }
];

// --- Shared Components & Logic ---

const getIcon = (name: string, size = 24, color = "currentColor") => {
  const icons: Record<string, React.ReactNode> = {
    Brain: <Brain size={size} color={color} />,
    Plane: <Plane size={size} color={color} />,
    GraduationCap: <GraduationCap size={size} color={color} />,
    Award: <Award size={size} color={color} />,
    Microscope: <Microscope size={size} color={color} />,
    Lightbulb: <Lightbulb size={size} color={color} />,
    Zap: <Zap size={size} color={color} />
  };
  return (icons as any)[name] || icons.Zap;
};

// Map service titles to form dropdown options
const serviceMapping: Record<string, string> = {
  "Career Counselling": "Career Counselling",
  "Study Abroad": "Study Abroad Consulting",
  "India Admissions\nOn campus & Online": "Indian Admissions",
  "Certifications and Internships": "Certification Courses",
  "Scientific Events": "Scientific Events",
  "Startups": "Startup Incubation"
};

const PhoneMockup: React.FC<{ activeService: Service; index: number; onOpenModal: (serviceName: string) => void }> = ({ activeService, index, onOpenModal }) => {
  const handleClick = () => {
    window.location.href = activeService.anchor;
  };

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative w-[220px] sm:w-[240px] h-[440px] sm:h-[480px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] hover:drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-all duration-300 group cursor-pointer"
    >
      {/* Animated glow effect on hover */}
      <div
        className="absolute -inset-2 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
        style={{
          background: `radial-gradient(circle at center, ${activeService.color}40 0%, transparent 70%)`
        }}
      />

      {/* Device Frame */}
      <div className="absolute inset-0 bg-white rounded-[2.5rem] border-[6px] border-gray-100 overflow-hidden shadow-xl transition-all duration-300 group-hover:border-gray-200 group-hover:shadow-2xl">
        {/* Top Speaker/Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-4 sm:h-5 bg-gray-100 rounded-b-xl z-50 flex items-center justify-center">
          <div className="w-7 sm:w-8 h-0.5 sm:h-1 rounded-full bg-gray-200" />
        </div>

        <motion.div
          key={activeService.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`absolute inset-0 p-3 sm:p-4 pt-6 sm:pt-8 pb-4 sm:pb-5 flex flex-col ${activeService.mockupBg}`}
        >
          {/* Mock OS Bar */}
          <div className="flex justify-between items-center px-2 sm:px-3 mb-4 sm:mb-6">
            <span className="text-[8px] sm:text-[9px] font-bold text-white/70">9:41</span>
            <div className="flex gap-1 sm:gap-1.5 items-center">
              <div className="w-2.5 sm:w-3 h-1 sm:h-1.5 rounded-sm border border-white/30" />
              <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-white/30" />
            </div>
          </div>

          <div className="flex-1 space-y-2 sm:space-y-3 pt-1 sm:pt-1">
            <motion.div
              animate={{
                y: [0, -6, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-white/30 rounded-[1.75rem] sm:rounded-[2rem] flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300"
            >
              {getIcon(activeService.icon, 36, "white")}
            </motion.div>

            <div className="text-center space-y-1.5 sm:space-y-2 px-2">
              <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                {activeService.tagline}
              </h2>
              <p className="text-[9px] sm:text-[10px] text-white/80 leading-relaxed line-clamp-3">
                {activeService.description}
              </p>
            </div>

            <div className="space-y-1.5 sm:space-y-2 px-2">
              {activeService.features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 + (i * 0.1) }}
                  className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/10 border border-white/5 flex items-center gap-1.5 sm:gap-2 group-hover:bg-white/15 transition-colors duration-300"
                >
                  <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full" style={{ background: activeService.color }} />
                  <span className="text-[9px] sm:text-[10px] font-bold text-white/90">{f}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div
            className="mt-auto w-full py-3 sm:py-3.5 bg-white text-gray-900 font-black text-[10px] sm:text-[11px] uppercase tracking-[0.3em] rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            GET STARTED
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Decorative Reflections */}
      <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] z-40 bg-gradient-to-tr from-white/20 to-transparent" />
    </motion.div>
  );
};

// --- Main Component Export ---
export default function ServicesShowcase({ onOpenModal }: { onOpenModal: (serviceName: string) => void }) {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white" id="service-showcase">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16 reveal-on-scroll">
          <p className="text-gray-500 text-xs sm:text-sm font-bold uppercase tracking-widest">Overview</p>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3 sm:mt-4 mb-3 sm:mb-4 text-gray-900">Explore our services</h3>
          <p className="text-gray-400 text-base sm:text-lg">Comprehensive solutions for every stage of your career journey.</p>
        </div>

        {/* Grid of 6 Phone Mockups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 max-w-7xl mx-auto">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              {/* Service Title Above */}
              <div className="mb-4 sm:mb-6 text-center">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md"
                    style={{ backgroundColor: `${service.color}22`, border: `1px solid ${service.color}33` }}
                  >
                    {getIcon(service.icon, 18, service.color)}
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-gray-900">{service.title}</h4>
                </div>
                <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">{service.tagline}</p>
              </div>

              {/* Individual Phone Mockup */}
              <PhoneMockup activeService={service} index={idx} onOpenModal={onOpenModal} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
