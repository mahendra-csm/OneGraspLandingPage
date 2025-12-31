import React, { useEffect, useState } from 'react';
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
}

// --- Diagnosis Dimensions (for Career Counselling map) ---
interface Dimension {
  id: string;
  label: string;
  methodology: string;
  analyze: string;
  benefit: string;
  roles: string[];
  color: string;
  icon: React.ReactNode;
}

const DIMENSIONS: Record<string, Dimension> = {
  P: {
    id: 'P',
    label: 'Career Personality',
    methodology: 'Jungian Personality (Carl Jung)',
    analyze: 'Self-Understanding: We assess your most dominant preferences—from how you focus your energy to how you make decisions based on logic.',
    benefit: 'Aligns You: Expand your career options in alignment with your unique personality for a more rewarding choice.',
    roles: ['Strategic Lead', 'Crisis Manager', 'Diplomatic Envoy'],
    color: '#2563eb',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  I: {
    id: 'I',
    label: 'Career Interest Types',
    methodology: 'RIASEC Types (John Holland)',
    analyze: 'Occupational Interest: We identify your top interest patterns (e.g., detail-oriented work with data, or analytical problem-solving).',
    benefit: "Finds Your Fit: Identifies a clear career focus directly linked to occupations you'll enjoy.",
    roles: ['UX Researcher', 'Architect', 'Creative Lead'],
    color: '#06b6d4',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  M: {
    id: 'M',
    label: 'Motivator Types',
    methodology: 'Values Assessment',
    analyze: 'Core Values: We find what you value most in a career, like working independently or enjoying work routine.',
    benefit: 'Ensures Fulfillment: A career in line with your core beliefs is more likely to be a lasting and positive choice.',
    roles: ['Founder', 'Ethics Lead', 'Director'],
    color: '#3b82f6',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  S: {
    id: 'S',
    label: 'Skills & Abilities',
    methodology: 'Multiple Intelligences (Howard Gardner)',
    analyze: 'Talent Mapping: We score your strengths (Verbal, Logical, etc.) and development areas.',
    benefit: 'Strategic Development: Helps you identify ways to reshape your career direction based on innate talent.',
    roles: ['Specialist', 'Data Analyst', 'Legal Advisor'],
    color: '#0891b2',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  L: {
    id: 'L',
    label: 'Learning Style',
    methodology: 'VARK Modalities',
    analyze: 'Optimal Learning: Determining your sensory preference to maximize your study efficiency and exam scores.',
    benefit: 'Boosts Academics: Provides concrete strategies like group study or recording notes to maximize outcomes.',
    roles: ['L&D Lead', 'Designer', 'Technical Trainer'],
    color: '#1e40af',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  }
};

import {
  BrainCircuit,
  FileText,
  Building2,
  Bot,
  Users,
  Target,
  TrendingUp,
  Globe,
  Lightbulb,
  Zap,
  ShieldCheck,
  Database,
  Layout,
  Rocket,
  Compass,
  ArrowUpRight,
  ArrowRight,
  Mail,
  Phone,
  ChevronRight,
  BookOpen,
  Share2,
  Banknote,
  Scale,
  ClipboardList,
  Briefcase,
  Settings,
  User,
  Monitor,
  Code,
  Stethoscope,
  Cpu,
  FlaskConical,
  Layers,
  Binary,
  Sprout,
  Palette,
  Trophy,
  Activity
} from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EvaluationModal from './components/EvaluationModal';
import SessionBookingModal from './components/SessionBookingModal';
import FreeSessionModal from './components/FreeSessionModal';
import ServicesShowcase from './components/ServicesShowcase';
import Footer from './components/Footer';
import { ASSESSMENT_AREAS } from './constants';

const CONFERENCE_CATEGORIES = [
  { name: "Business & Economics", icon: <Briefcase className="w-5 h-5" />, color: "#2563eb", bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-700", shadow: "shadow-blue-500/10" },
  { name: "Health & Medical Sciences", icon: <Stethoscope className="w-5 h-5" />, color: "#10b981", bg: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-700", shadow: "shadow-emerald-500/10" },
  { name: "Engineering & Technology", icon: <Cpu className="w-5 h-5" />, color: "#f59e0b", bg: "bg-amber-50", border: "border-amber-100", text: "text-amber-700", shadow: "shadow-amber-500/10" },
  { name: "Education", icon: <GraduationCap className="w-5 h-5" />, color: "#4f46e5", bg: "bg-indigo-50", border: "border-indigo-100", text: "text-indigo-700", shadow: "shadow-indigo-500/10" },
  { name: "Social Sciences & Humanities", icon: <Users className="w-5 h-5" />, color: "#f43f5e", bg: "bg-rose-50", border: "border-rose-100", text: "text-rose-700", shadow: "shadow-rose-500/10" },
  { name: "Physical & Life Sciences", icon: <FlaskConical className="w-5 h-5" />, color: "#06b6d4", bg: "bg-cyan-50", border: "border-cyan-100", text: "text-cyan-700", shadow: "shadow-cyan-500/10" },
  { name: "Interdisciplinary & Emerging Fields", icon: <Layers className="w-5 h-5" />, color: "#8b5cf6", bg: "bg-violet-50", border: "border-violet-100", text: "text-violet-700", shadow: "shadow-violet-500/10" },
  { name: "Mathematics & Data Science", icon: <Binary className="w-5 h-5" />, color: "#0ea5e9", bg: "bg-sky-50", border: "border-sky-100", text: "text-sky-700", shadow: "shadow-sky-500/10" },
  { name: "Agriculture & Food Sciences", icon: <Sprout className="w-5 h-5" />, color: "#16a34a", bg: "bg-green-50", border: "border-green-100", text: "text-green-700", shadow: "shadow-green-500/10" },
  { name: "Arts, Culture & Communication", icon: <Palette className="w-5 h-5" />, color: "#db2777", bg: "bg-pink-50", border: "border-pink-100", text: "text-pink-700", shadow: "shadow-pink-500/10" },
  { name: "Sports & Physical Education", icon: <Trophy className="w-5 h-5" />, color: "#f97316", bg: "bg-orange-50", border: "border-orange-100", text: "text-orange-700", shadow: "shadow-orange-500/10" },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('UG');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal State lifted
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isFreeSessionModalOpen, setIsFreeSessionModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>(''); // Track pre-selected service

  // Handler for opening modal with optional pre-selected service
  const handleOpenModal = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    } else {
      setSelectedService('');
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(''); // Reset when closing
  };

  const SERVICE_CARDS = [
    { id: 'services', index: '01', title: 'Career Counselling', desc: 'Psychometric tests & guidance', icon: <Users className="w-6 h-6 text-blue-600 icon" />, imageUrl: 'https://source.unsplash.com/1600x900/?career%20counselling,mentor' },
    { id: 'study', index: '02', title: 'Study Abroad', desc: 'Global university connections', icon: <Globe className="w-6 h-6 text-blue-600 icon" />, imageUrl: 'https://source.unsplash.com/1600x900/?university,campus,students' },
    { id: 'programs', index: '03', title: 'Indian Degree', desc: 'UG / PG / Doctorate programs', icon: <Target className="w-6 h-6 text-blue-600 icon" />, imageUrl: 'https://source.unsplash.com/1600x900/?india,university,graduation' },
    { id: 'skills', index: '04', title: 'Certifications', desc: 'Skill pathways & certs', icon: <BrainCircuit className="w-6 h-6 text-blue-600 icon" />, imageUrl: 'https://source.unsplash.com/1600x900/?online%20learning,certificate,elearning' },
    { id: 'events', index: '05', title: 'Scientific Events', desc: 'Conferences & labs', icon: <BookOpen className="w-6 h-6 text-blue-600 icon" />, imageUrl: 'https://source.unsplash.com/1600x900/?conference,academic,seminar' },
    { id: 'startups', index: '06', title: 'Startups Support', desc: 'Incubation & funding', icon: <Rocket className="w-6 h-6 text-blue-600 icon" />, imageUrl: 'https://source.unsplash.com/1600x900/?startup,team,office' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal-on-scroll:not(.toc-card)').forEach(el => observer.observe(el));

    // navigator entry: trigger when navigator section reaches ~70%
    const navSection = document.getElementById('service-navigator');
    if (navSection) {
      const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cards = Array.from(navSection.querySelectorAll('.toc-card')) as HTMLElement[];
            cards.forEach(c => c.classList.add('visible'));
            navObserver.disconnect();
          }
        });
      }, { threshold: 0.7 });
      navObserver.observe(navSection);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // highlight active service card based on viewport and manage muted state for others
    const container = document.querySelector('#service-navigator .grid') as HTMLElement | null;
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = (entry.target as HTMLElement).id;
        const card = document.querySelector(`.toc-card[data-target="${id}"]`) as HTMLElement | null;
        if (!card || !container) return;
        if (entry.isIntersecting) {
          // set active
          container.classList.add('toc-has-active');
          card.classList.add('active');
          // mute others
          Array.from(container.querySelectorAll('.toc-card')).forEach(c => {
            if (c !== card) (c as HTMLElement).classList.add('muted');
          });
        } else {
          card.classList.remove('active');
          Array.from(container.querySelectorAll('.toc-card')).forEach(c => (c as HTMLElement).classList.remove('muted'));
          // remove container state if no active cards remain
          const anyActive = container.querySelector('.toc-card.active');
          if (!anyActive) container.classList.remove('toc-has-active');
        }
      });
    }, { threshold: 0.3 });

    const targets = ['services', 'study', 'programs', 'skills', 'events', 'startups']
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    targets.forEach(t => cardObserver.observe(t));
    return () => cardObserver.disconnect();
  }, []);

  const handleCardClick = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // brief heading focus animation
    const heading = el.querySelector('h2, h3, h1') as HTMLElement | null;
    if (heading) {
      heading.classList.remove('section-focus');
      // force reflow
      void heading.offsetWidth;
      heading.classList.add('section-focus');
      // ensure underline completes
      heading.classList.add('section-focus-active');
      setTimeout(() => heading.classList.remove('section-focus-active'), 360);
      setTimeout(() => heading.classList.remove('section-focus'), 700);
    }
  };

  // states for Career Diagnosis map
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeDetail = selectedId ? DIMENSIONS[selectedId] : null;





  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900">
      <Navbar onOpenModal={() => handleOpenModal()} />
      <Hero onOpenModal={() => handleOpenModal()} />

      <EvaluationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        preSelectedService={selectedService}
      />

      <SessionBookingModal
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
      />

      <FreeSessionModal
        isOpen={isFreeSessionModalOpen}
        onClose={() => setIsFreeSessionModalOpen(false)}
      />

      <ServicesShowcase onOpenModal={handleOpenModal} />



      {/* 1. Career Counselling & Dashboard - REDESIGNED */}
      <section id="services" className="py-12 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">

          {/* Header Block with Integrated Pricing */}
          <div className="reveal-on-scroll relative z-10 mb-12 text-left">
            <span className="text-blue-600 font-extrabold uppercase tracking-widest text-sm mb-4 block font-poppins">
              Service 01
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-gray-900 font-poppins">
              1. <span className="text-black-600">Career COUNSELLING +</span><br />
              <span className="text-blue-600">Psychometric TEST</span>
            </h2>

            {/* Premium Interactive Info Tiling - Vibrant Static UI */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 w-full">

              {/* Tile 1: Roadmap */}
              <motion.button
                whileHover={{ y: -4, scale: 1.01 }}
                onClick={() => handleOpenModal('Career Counselling')}
                className="group relative flex items-center gap-5 p-5 rounded-3xl bg-blue-600 border border-blue-500 text-left transition-all duration-300 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.3)] hover:shadow-blue-400"
              >
                <div className="w-14 h-14 min-w-[3.5rem] rounded-2xl bg-blue-500/50 backdrop-blur-md flex items-center justify-center shadow-inner">
                  <Compass className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-black text-base">15-Year Roadmap</h3>
                  <p className="text-blue-50 text-xs font-bold leading-tight mt-0.5">
                    Top-3 Career Fitments via Expert Psychometric Analysis.
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-blue-200 group-hover:text-white group-hover:rotate-45 transition-all" />
              </motion.button>

              {/* Tile 2: Future Proof */}
              <motion.button
                whileHover={{ y: -4, scale: 1.01 }}
                onClick={() => handleOpenModal('Career Counselling')}
                className="group relative flex items-center gap-5 p-5 rounded-3xl bg-emerald-600 border border-emerald-500 text-left transition-all duration-300 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] hover:shadow-emerald-400"
              >
                <div className="w-14 h-14 min-w-[3.5rem] rounded-2xl bg-emerald-500/50 backdrop-blur-md flex items-center justify-center shadow-inner">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-black text-base">Future-Proof Careers</h3>
                  <p className="text-emerald-50 text-xs font-bold leading-tight mt-0.5">
                    WEF: 1.1B Jobs Evolving globally. Build startup ideas early.
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-emerald-200 group-hover:text-white group-hover:rotate-45 transition-all" />
              </motion.button>

              {/* Tile 3: Awareness */}
              <motion.button
                whileHover={{ y: -4, scale: 1.01 }}
                onClick={() => handleOpenModal('Career Counselling')}
                className="group relative flex items-center gap-5 p-5 rounded-3xl bg-purple-600 border border-purple-500 text-left transition-all duration-300 shadow-[0_20px_40px_-15px_rgba(147,51,234,0.3)] hover:shadow-purple-400"
              >
                <div className="w-14 h-14 min-w-[3.5rem] rounded-2xl bg-purple-500/50 backdrop-blur-md flex items-center justify-center shadow-inner">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-black text-base">High-Demand Awareness</h3>
                  <p className="text-purple-50 text-xs font-bold leading-tight mt-0.5">
                    Discover New-Age careers you might not know exist yet.
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-purple-200 group-hover:text-white group-hover:rotate-45 transition-all" />
              </motion.button>
            </div>




          </div>
          {/* Top Section: Split Layout - Redesigned Alignment */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-x-12 gap-y-16 items-start mb-32">

            {/* Left Col: Career Counselling Matrix */}
            <div className="space-y-10 bg-slate-100/50 p-6 md:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-3">
                <Brain className="w-8 h-8 text-teal-500" />
                Diagnosis Dimensions
              </h3>
              {/* The Analysis Matrix - Reference Infographic Style */}
              <div className="flex flex-col gap-8 md:gap-0">
                {/* Desktop Headers */}
                <div className="hidden md:grid grid-cols-[140px_1fr_1fr] gap-8 mb-6">
                  <div />
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-full text-center shadow-lg shadow-teal-200/50 text-sm whitespace-nowrap">
                    What We Analyze
                  </div>
                  <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold py-3 px-6 rounded-full text-center shadow-lg shadow-amber-200/50 text-sm whitespace-nowrap">
                    Your Benefit
                  </div>
                </div>

                {/* ROW 1: PERSONALITY */}
                <div className="grid grid-cols-1 md:grid-cols-[140px_1fr_1fr] gap-4 md:gap-8 items-stretch md:items-center py-6 md:py-8 border-b border-slate-200 last:border-0 md:last:border-b">
                  <div className="bg-cyan-200 h-28 md:h-32 w-full flex flex-col items-center justify-center text-center shadow-sm rounded-3xl md:rounded-none order-1">
                    <Users className="w-8 h-8 mb-2 text-slate-800" />
                    <span className="font-black text-slate-800 text-xs uppercase tracking-wider">Personality</span>
                  </div>
                  <div className="flex flex-col justify-center order-2">
                    <strong className="block text-slate-900 text-sm font-bold mb-1 md:hidden">What We Analyze:</strong>
                    <strong className="hidden md:block text-slate-900 text-sm font-bold mb-1">Self-Understanding:</strong>
                    <p className="text-slate-600 text-[13px] md:text-xs leading-relaxed">We assess your most dominant preferences—from how you focus energy to how you make decisions based on logic.</p>
                  </div>
                  <div className="flex flex-col justify-center order-3">
                    <strong className="block text-slate-900 text-sm font-bold mb-1 md:hidden">Your Benefit:</strong>
                    <strong className="hidden md:block text-slate-900 text-sm font-bold mb-1">Aligns You:</strong>
                    <p className="text-slate-600 text-[13px] md:text-xs leading-relaxed">Expand your career options in alignment with your unique personality for a more rewarding career choice.</p>
                  </div>
                </div>

                {/* ROW 2: INTERESTS */}
                <div className="grid grid-cols-1 md:grid-cols-[140px_1fr_1fr] gap-4 md:gap-8 items-stretch md:items-center py-6 md:py-8 border-b border-slate-200 last:border-0 md:last:border-b">
                  <div className="bg-amber-200 h-28 md:h-32 w-full flex flex-col items-center justify-center text-center shadow-sm rounded-3xl md:rounded-none order-1">
                    <Target className="w-8 h-8 mb-2 text-slate-800" />
                    <span className="font-black text-slate-800 text-xs uppercase tracking-wider">Interests</span>
                  </div>
                  <div className="flex flex-col justify-center order-2">
                    <strong className="block text-slate-900 text-sm font-bold mb-1 md:hidden">What We Analyze:</strong>
                    <strong className="hidden md:block text-slate-900 text-sm font-bold mb-1">Occupational Interest:</strong>
                    <p className="text-slate-600 text-[13px] md:text-xs leading-relaxed">We identify your top interest patterns (e.g., detail-oriented work with data, or analytical problem-solving).</p>
                  </div>
                  <div className="flex flex-col justify-center order-3">
                    <strong className="block text-slate-900 text-sm font-bold mb-1 md:hidden">Your Benefit:</strong>
                    <strong className="hidden md:block text-slate-900 text-sm font-bold mb-1">Finds Your Fit:</strong>
                    <p className="text-slate-600 text-[13px] md:text-xs leading-relaxed">Identifies a clear career focus directly linked to occupations you'll enjoy.</p>
                  </div>
                </div>

                {/* ROW 3: MOTIVATORS */}
                <div className="grid grid-cols-1 md:grid-cols-[140px_1fr_1fr] gap-4 md:gap-8 items-stretch md:items-center py-6 md:py-8 border-b border-slate-200 last:border-0 md:last:border-b">
                  <div className="bg-orange-400 h-28 md:h-32 w-full flex flex-col items-center justify-center text-center shadow-sm rounded-3xl md:rounded-none order-1">
                    <Lightbulb className="w-8 h-8 mb-2 text-white" />
                    <span className="font-black text-white text-xs uppercase tracking-wider">Motivators</span>
                  </div>
                  <div className="flex flex-col justify-center order-2">
                    <strong className="block text-slate-900 text-sm font-bold mb-1 md:hidden">What We Analyze:</strong>
                    <strong className="hidden md:block text-slate-900 text-sm font-bold mb-1">Core Values:</strong>
                    <p className="text-slate-600 text-[13px] md:text-xs leading-relaxed">We find what you value most in a career, like working independently or enjoying work routine.</p>
                  </div>
                  <div className="flex flex-col justify-center order-3">
                    <strong className="block text-slate-900 text-sm font-bold mb-1 md:hidden">Your Benefit:</strong>
                    <strong className="hidden md:block text-slate-900 text-sm font-bold mb-1">Ensures Fulfillment:</strong>
                    <p className="text-slate-600 text-[13px] md:text-xs leading-relaxed">A career in line with your core beliefs is more likely to be a lasting and positive choice.</p>
                  </div>
                </div>

                {/* ROW 4: SKILLS */}
                <div className="grid grid-cols-1 md:grid-cols-[140px_1fr_1fr] gap-4 md:gap-8 items-stretch md:items-center py-6 md:py-8 border-b border-slate-200 last:border-0 md:last:border-b">
                  <div className="bg-sky-300 h-28 md:h-32 w-full flex flex-col items-center justify-center text-center shadow-sm rounded-3xl md:rounded-none order-1">
                    <BrainCircuit className="w-8 h-8 mb-2 text-slate-900" />
                    <span className="font-black text-slate-900 text-xs uppercase tracking-wider">Skills</span>
                  </div>
                  <div className="flex flex-col justify-center order-2">
                    <strong className="block text-slate-900 text-sm font-bold mb-1 md:hidden">What We Analyze:</strong>
                    <strong className="hidden md:block text-slate-900 text-sm font-bold mb-1">Talent Mapping:</strong>
                    <p className="text-slate-600 text-[13px] md:text-xs leading-relaxed">We score your strengths (e.g, Excellent Verbal Ability and Good Logical Ability) and areas needing development.</p>
                  </div>
                  <div className="flex flex-col justify-center order-3">
                    <strong className="block text-slate-900 text-sm font-bold mb-1 md:hidden">Your Benefit:</strong>
                    <strong className="hidden md:block text-slate-900 text-sm font-bold mb-1">Strategic Development:</strong>
                    <p className="text-slate-600 text-[13px] md:text-xs leading-relaxed">Helps you identify different ways to reshape your career direction and focus on skills that give you a career advantage.</p>
                  </div>
                </div>

                {/* ROW 5: LEARNING */}
                <div className="grid grid-cols-1 md:grid-cols-[140px_1fr_1fr] gap-4 md:gap-8 items-stretch md:items-center py-6 md:py-8 border-b border-slate-200 last:border-0">
                  <div className="bg-yellow-300 h-28 md:h-32 w-full flex flex-col items-center justify-center text-center shadow-sm rounded-3xl md:rounded-none order-1">
                    <Brain className="w-8 h-8 mb-2 text-slate-900" />
                    <span className="font-black text-slate-900 text-xs uppercase tracking-wider">Learning</span>
                  </div>
                  <div className="flex flex-col justify-center order-2">
                    <strong className="block text-slate-900 text-sm font-bold mb-1 md:hidden">What We Analyze:</strong>
                    <strong className="hidden md:block text-slate-900 text-sm font-bold mb-1">Optimal Learning:</strong>
                    <p className="text-slate-600 text-[13px] md:text-xs leading-relaxed">For instance, the report shows a high preference for Auditory Learning (50%).</p>
                  </div>
                  <div className="flex flex-col justify-center order-3">
                    <strong className="block text-slate-900 text-sm font-bold mb-1 md:hidden">Your Benefit:</strong>
                    <strong className="hidden md:block text-slate-900 text-sm font-bold mb-1">Boosts Academics:</strong>
                    <p className="text-slate-600 text-[13px] md:text-xs leading-relaxed">Provides concrete strategies (like working in groups or listening to recorded notes) to maximize your study efficiency.</p>
                  </div>
                </div>

                {/* ROW 6: EXAMS */}
                <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-8 items-stretch md:items-center py-8">
                  <div className="bg-slate-800 h-24 md:h-32 w-full flex flex-col items-center justify-center text-center shadow-sm rounded-3xl md:rounded-none">
                    <GraduationCap className="w-8 h-8 mb-2 text-amber-400" />
                    <span className="font-black text-amber-400 text-[10px] md:text-xs uppercase tracking-wider">Exams</span>
                  </div>
                  <div className="flex flex-col justify-center h-full">
                    <strong className="block text-slate-900 text-sm md:text-lg font-black mb-1">Entrance Exams & Scholarships</strong>
                    <p className="text-slate-600 text-[13px] md:text-xs leading-relaxed font-medium">Prep for IIT-JEE, NEET, CLAT, etc. <span className="text-blue-600 font-bold">Get up to 100% Scholarship.</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Student Dashboard - Strictly Aligned */}
            <div className="space-y-10 bg-blue-100/40 p-8 md:p-10 rounded-[3.5rem] border border-blue-200/50 shadow-sm transition-all hover:shadow-md">

              {/* Header Block - Aligned with Left */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-slate-100 text-left h-full min-h-[116px]">
                <h2 className="text-5xl lg:text-6xl font-black text-blue-600 leading-[0.9] tracking-tighter">
                  <span className="text-slate-400 font-light">Student</span><br />
                  DASHBOARD
                </h2>
                <div className="max-w-xs text-right hidden sm:block">
                  <p className="text-xs font-medium text-slate-500 leading-tight">
                    <strong className="text-teal-600 block text-sm mb-1">All-in-One Advantage</strong>
                    Full ecosystem from AI to Admissions.
                  </p>
                </div>
              </div>

              {/* Dashboard Grid - Matching Matrix Style */}
              {/* Dashboard Infographic List */}
              <div className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-x-6 md:gap-x-8 gap-y-6 text-sm items-center">

                {/* Header Pill */}
                <div className="col-span-2 flex justify-start">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-full text-center shadow-lg shadow-blue-200/50 text-sm whitespace-nowrap">
                    Tools Included in Dashboard
                  </div>
                </div>

                {/* ROW 1: REPORT */}
                <div className="bg-indigo-400 h-28 w-full flex flex-col items-center justify-center text-center shadow-sm">
                  <FileText className="w-8 h-8 mb-2 text-white" />
                  <span className="font-black text-white text-xs uppercase tracking-wider">Report</span>
                </div>
                <div className="flex flex-col justify-center h-full">
                  <strong className="block text-indigo-700 text-lg font-black mb-1">5D + 30 Page Report</strong>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">Detailed analysis of Personality, Interests, Motivators, Learning Styles, Skills, plus a 15-Year Roadmap.</p>
                </div>
                <div className="col-span-2 h-px bg-slate-200 w-full"></div>

                {/* ROW 2: COLLEGE */}
                <div className="bg-teal-400 h-28 w-full flex flex-col items-center justify-center text-center shadow-sm">
                  <Building2 className="w-8 h-8 mb-2 text-white" />
                  <span className="font-black text-white text-xs uppercase tracking-wider">Colleges</span>
                </div>
                <div className="flex flex-col justify-center h-full">
                  <strong className="block text-teal-700 text-lg font-black mb-1">College Explorer</strong>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">Access 2000+ India Campus Univ, 150+ Online Univ, and 3000+ Abroad Universities.</p>
                </div>
                <div className="col-span-2 h-px bg-slate-200 w-full"></div>

                {/* ROW 3: AI MENTOR */}
                <div className="bg-amber-400 h-28 w-full flex flex-col items-center justify-center text-center shadow-sm">
                  <Bot className="w-8 h-8 mb-2 text-white" />
                  <span className="font-black text-white text-xs uppercase tracking-wider">AI Mentor</span>
                </div>
                <div className="flex flex-col justify-center h-full">
                  <strong className="block text-amber-700 text-lg font-black mb-1">AI Expert Career Mentor</strong>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">Salary Predictor, Skills in Demand, and 24/7 Career Guidance Chat.</p>
                </div>
                <div className="col-span-2 h-px bg-slate-200 w-full"></div>

                {/* ROW 4: STUDY ABROAD */}
                <div className="bg-blue-500 h-28 w-full flex flex-col items-center justify-center text-center shadow-sm">
                  <Globe className="w-8 h-8 mb-2 text-white" />
                  <span className="font-black text-white text-xs uppercase tracking-wider">Abroad</span>
                </div>
                <div className="flex flex-col justify-center h-full">
                  <strong className="block text-blue-700 text-lg font-black mb-1">Study Abroad Tool</strong>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">Portfolio Building, SOP Maker, Profile Weightage, and Entrance Exam Trainings.</p>
                </div>
                <div className="col-span-2 h-px bg-slate-200 w-full"></div>

                {/* ROW 5: WEBSITE */}
                <div className="bg-pink-400 h-28 w-full flex flex-col items-center justify-center text-center shadow-sm">
                  <Globe className="w-8 h-8 mb-2 text-white" />
                  <span className="font-black text-white text-xs uppercase tracking-wider">Website</span>
                </div>
                <div className="flex flex-col justify-center h-full">
                  <strong className="block text-pink-700 text-lg font-black mb-1">Personal Website</strong>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">Publish your own personal profile site in 15-mins to connect directly with Alumni networks.</p>
                </div>
                <div className="col-span-2 h-px bg-slate-200 w-full"></div>

                {/* ROW 6: LIBRARY */}
                <div className="bg-emerald-400 h-28 w-full flex flex-col items-center justify-center text-center shadow-sm">
                  <BookOpen className="w-8 h-8 mb-2 text-white" />
                  <span className="font-black text-white text-xs uppercase tracking-wider">Library</span>
                </div>
                <div className="flex flex-col justify-center h-full">
                  <strong className="block text-emerald-700 text-lg font-black mb-1">Career Library</strong>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">20 Career Clusters, 200+ Career paths, 300+ Virtual Internships.</p>
                </div>
              </div>
            </div>

            {/* PRICING BANNER - SPANNING BOTH COLUMNS */}
            <div className="lg:col-span-2 reveal-on-scroll">
              <div className="bg-slate-900 text-white p-8 lg:p-12 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-amber-400/50 mt-4">
                <div className="flex flex-col text-center md:text-left">
                  <span className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-3 flex items-center justify-center md:justify-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                    Limited Time Offer
                  </span>
                  <div className="flex items-baseline justify-center md:justify-start gap-3 sm:gap-4">
                    <span className="text-4xl sm:text-7xl font-black text-white tracking-tighter">₹2500</span>
                    <span className="text-lg sm:text-2xl text-slate-500 line-through decoration-red-400 decoration-2 font-bold">₹5000</span>
                  </div>
                  <p className="text-[10px] lg:text-xs text-slate-400 mt-4 font-bold tracking-[0.2em] uppercase opacity-70">Unified Psychometric Assessment + Comprehensive Student Dashboard Tools</p>
                </div>
                <div className="w-full md:w-auto">
                  <a
                    href="https://onegrasp.edumilestones.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:px-12 lg:px-16 py-5 lg:py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-sm lg:text-lg font-black uppercase tracking-widest rounded-2xl shadow-[0_20px_40px_-10px_rgba(245,158,11,0.4)] transition-all transform hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-3 group"
                  >
                    Take Assessment Now
                    <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section: 40 Min Test */}
          <div className="mb-32 relative text-center space-y-10 sm:space-y-16">
            <div>
              <div className="inline-block mb-4 px-5 sm:px-7 py-2 sm:py-3 rounded-2xl sm:rounded-full bg-slate-50 border border-slate-100 shadow-sm">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                  40 Min Test Saves
                </h2>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
                40 Years Struggle
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {/* Class 6-7 */}
              <div className="bg-gradient-to-br from-teal-50 to-teal-200 border border-teal-200 shadow-xl shadow-teal-200/50 rounded-[2rem] p-8 text-left hover:-translate-y-2 transition-transform duration-300 group">
                <h4 className="text-teal-800 font-black text-lg mb-4 group-hover:scale-105 transition-transform origin-left">Class 6-7</h4>
                <p className="text-xs text-teal-900 font-medium leading-relaxed">
                  Discover natural strengths early through Multiple Intelligence and Aptitude checks.
                  Build confidence before subject pressure begins.
                </p>
              </div>

              {/* Class 8-10 */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-200 border border-blue-200 shadow-xl shadow-blue-200/50 rounded-[2rem] p-8 text-left hover:-translate-y-2 transition-transform duration-300 group">
                <h4 className="text-blue-800 font-black text-lg mb-4 group-hover:scale-105 transition-transform origin-left">Class 8-10</h4>
                <p className="text-xs text-blue-900 font-medium leading-relaxed">
                  5-Dimensional assessment combining intelligence, personality, and aptitude to guide right stream selection.
                </p>
              </div>

              {/* Class 11-12 */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-200 border border-indigo-200 shadow-xl shadow-indigo-200/50 rounded-[2rem] p-8 text-left hover:-translate-y-2 transition-transform duration-300 group">
                <h4 className="text-indigo-800 font-black text-lg mb-4 group-hover:scale-105 transition-transform origin-left">Class 11 & 12</h4>
                <p className="text-xs text-indigo-900 font-medium leading-relaxed">
                  Detailed career report, subject-specific guidance, and admissions predictor to plan college pathways smartly.
                </p>
              </div>

              {/* Graduates */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-200 border border-amber-200 shadow-xl shadow-amber-200/50 rounded-[2rem] p-8 text-left hover:-translate-y-2 transition-transform duration-300 group">
                <h4 className="text-amber-800 font-black text-lg mb-4 group-hover:scale-105 transition-transform origin-left">Graduates</h4>
                <p className="text-xs text-amber-900 font-medium leading-relaxed">
                  Align passion with employability. Detailed career report, skills-in-demand insights, and portfolio building.
                </p>
              </div>

              {/* Professionals */}
              <div className="bg-gradient-to-br from-blue-100 to-blue-300 border border-blue-300 shadow-xl shadow-blue-300/50 rounded-[2rem] p-8 text-left hover:-translate-y-2 transition-transform duration-300 group">
                <h4 className="text-blue-900 font-black text-lg mb-4 group-hover:scale-105 transition-transform origin-left">Professionals</h4>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  Redesign your career. Certification & internship guidance, salary predictions, and strong professional profiling.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full transition-all duration-500">
            <img src="/assets/accreditations.png" alt="Accreditations" className="w-full h-auto object-contain max-h-32" />
          </div>

        </div>
      </section>

      {/* 2. Study Abroad - REDESIGNED IMAGE IMPLEMENTATION */}
      <section id="study" className="py-12 bg-white relative overflow-hidden font-poppins">
        <div className="container mx-auto px-6 lg:px-12">

          <div className="reveal-on-scroll relative z-10 mb-12 text-left">
            <span className="text-blue-600 font-extrabold uppercase tracking-widest text-sm mb-4 block font-poppins">
              Service 02
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-gray-900 font-poppins">
              2. <span className="text-blue-600">Study Abroad</span>
            </h2>
            <p className="text-xl text-gray-500 font-semibold max-w-3xl leading-relaxed font-poppins">
              Transform your education by making the world your campus.
            </p>
          </div>

          {/* New Hero Section based on Ref Image 1 */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12">

              {/* Left: Titles & Feature List */}
              <div className="flex-1 flex flex-col lg:justify-center">
                {/* Feature List (Free / Fee) */}
                <div className="space-y-8">
                  {/* FREE Section */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="bg-cyan-300 rounded-xl sm:rounded-full flex items-center justify-center w-full sm:w-12 h-10 sm:h-auto shadow-inner">
                      <span className="sm:-rotate-90 font-black text-white tracking-[0.2em] text-sm sm:text-lg whitespace-nowrap uppercase">FREE</span>
                    </div>
                    <div className="flex-1 grid gap-6">
                      {[
                        { id: 1, text: "Free profile weightage" },
                        { id: 2, text: "Free Explorations of universities for 20+ countries" },
                        { id: 3, text: "Free SOP maker" },
                        { id: 4, text: "Free Career counselling + PT for study abroad admissions" },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center gap-4 group">
                          <div className="w-10 h-10 min-w-[2.5rem] rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
                            {item.id}
                          </div>
                          <div className="flex-1 bg-gradient-to-r from-cyan-50 to-white p-3 rounded-lg border-l-4 border-cyan-400">
                            <p className="text-slate-800 font-medium text-sm md:text-base">{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* FEE Section */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="bg-amber-300 rounded-xl sm:rounded-full flex items-center justify-center w-full sm:w-12 h-10 sm:h-auto shadow-inner">
                      <span className="sm:-rotate-90 font-black text-white tracking-[0.2em] text-sm sm:text-lg whitespace-nowrap uppercase">FEE</span>
                    </div>
                    <div className="flex-1 grid gap-6">
                      {[
                        { id: 5, text: "IELTS, TOEFL, PTE Trainings" },
                        { id: 6, text: "Spot admissions drive for 12th class and UG, PG" },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center gap-4 group">
                          <div className="w-10 h-10 min-w-[2.5rem] rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
                            {item.id}
                          </div>
                          <div className="flex-1 bg-gradient-to-r from-amber-50 to-white p-3 rounded-lg border-l-4 border-amber-400">
                            <p className="text-slate-800 font-medium text-sm md:text-base">{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Redesigned Content Section - Pixel Perfect Refinement */}
              <div className="flex-1 relative bg-[#FEFAF0] rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[530px] border border-[#f3ead3] flex flex-col group">
                {/* Background Image Map */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="/assets/study_abroad_bg.png"
                    alt="Background Map"
                    className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                  />
                  {/* Yellowish Tint Overlay */}
                  <div className="absolute inset-0 bg-[#FEFAF0]/20" />
                </div>

                {/* Content Overlays Grid */}
                <div className="relative z-20 flex-1 p-6 sm:p-10 flex flex-col justify-between">

                  {/* Top Portion: Stacked Text (Left) and Stats (Right) */}
                  <div className="flex justify-between items-start w-full">
                    {/* Left: Expand Horizons Stack */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-left py-4"
                    >
                      <p className="text-[15px] font-bold text-slate-800 leading-tight tracking-[0.05em] uppercase">
                        EXPAND<br />
                        HORIZONS<br />
                        THROUGH
                      </p>
                    </motion.div>

                    {/* Right: Stats Area */}
                    <div className="space-y-10 text-right">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        <p className="text-4xl sm:text-6xl font-black text-[#27AEBD] leading-none mb-1">20+</p>
                        <p className="text-[10px] sm:text-sm font-bold text-slate-900 tracking-wide uppercase">Countries</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <p className="text-4xl sm:text-6xl font-black text-[#D37126] leading-none mb-1">3000+</p>
                        <p className="text-[10px] sm:text-sm font-bold text-slate-900 tracking-wide uppercase">Universities</p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Middle Portion: Global Immersion Title (Left) */}
                  <div className="flex flex-col justify-end">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="text-left"
                    >
                      <h3 className="text-3xl md:text-4xl lg:text-[3.2rem] font-black text-[#5C6166] leading-[0.9] tracking-tighter uppercase">
                        GLOBAL<br />
                        IMMERSION<br />
                        PROGRAM
                      </h3>
                    </motion.div>
                  </div>

                  {/* Floating Country Labels - Precise Positioning over the Map */}
                  <div className="absolute inset-0 pointer-events-none z-30">
                    {[
                      { name: "CANADA", top: "25%", left: "25%", color: "bg-[#D37126]" },
                      { name: "USA", top: "35%", left: "22%", color: "bg-[#D37126]" },
                      { name: "UK", top: "18%", left: "41%", color: "bg-[#D37126]" },
                      { name: "FRANCE", top: "28%", left: "38%", color: "bg-[#D37126]" },
                      { name: "GERMANY", top: "22%", left: "54%", color: "bg-[#D37126]" },
                      { name: "AUSTRALIA", top: "78%", left: "75%", color: "bg-[#D37126]" },
                    ].map((country, idx) => (
                      <motion.div
                        key={idx}
                        className={`absolute px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-2xl text-[8px] sm:text-[10px] font-black text-white pointer-events-auto ${country.color}`}
                        style={{
                          top: country.top,
                          left: country.left,
                          transform: 'translate(-50%, -50%)'
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * idx }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {country.name}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Subsection 1: Country Strips (Image 2) */}
          <div className="mb-20 reveal-on-scroll">
            <h3 className="text-3xl font-black text-slate-900 mb-8 border-l-8 border-blue-600 pl-4">Global Destinations</h3>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <img src="/assets/study_abroad_strip.png" alt="Study Abroad Countries" className="w-full h-auto object-cover" />
            </div>
          </div>

          {/* Subsection 2: University Logos Grid 1 (Image 3) */}
          <div className="mb-12 reveal-on-scroll">
            <h3 className="text-3xl font-black text-slate-900 mb-8 border-l-8 border-cyan-500 pl-4">Top Partner Universities</h3>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <img src="/assets/study_abroad_logos_1.png" alt="University Logos 1" className="w-full h-auto object-contain mix-blend-multiply" />
            </div>
          </div>

          {/* Subsection 3: University Logos Grid 2 (Image 4) */}
          <div className="reveal-on-scroll">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <img src="/assets/study_abroad_logos_2.png" alt="University Logos 2" className="w-full h-auto object-contain mix-blend-multiply" />
            </div>
          </div>

          {/* Explore Destinations Button */}
          <div className="mt-12 flex justify-center reveal-on-scroll">
            <a
              href="https://onegrasp.edumilestones.com/abroad-studies/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-16 py-7 bg-blue-600 text-white font-black rounded-3xl text-2xl shadow-3xl shadow-blue-500/40 hover:bg-blue-700 transition-all active:scale-95 button-shine font-poppins flex items-center gap-4"
            >
              Explore Destinations <ChevronRight className="w-8 h-8" />
            </a>
          </div>

        </div>
      </section>

      {/* 3. Online Degree Programs - REFERENCE IMAGE IMPLEMENTATION */}
      <section id="programs" className="relative py-12 overflow-hidden bg-white">


        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Main Heading */}
          <div className="reveal-on-scroll mb-12 text-left">
            <span className="text-blue-600 font-extrabold uppercase tracking-widest text-sm mb-4 block font-poppins">
              Service 03
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight text-gray-900 font-poppins">
              3. <span className="text-blue-600">India Admissions</span><br />
              <span className="text-xl sm:text-2xl md:text-5xl font-bold text-gray-500">Oncampus-2000+ Uni. & Online-600+ Uni.</span>
            </h2>
          </div>

          <div className="flex gap-4 lg:gap-8">
            {/* Sidebar Vertical Label */}
            <div className="hidden lg:flex flex-col items-center justify-center relative w-20">
              <div className="absolute transform -rotate-90 origin-center whitespace-nowrap">
                <p className="text-6xl font-black text-black-300 tracking-[0.1em] font-poppins">
                  OUR <span className="text-amber-500">COURSES</span>
                </p>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1">
              {/* Program Category Strips */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 reveal-on-scroll">
                <div className="bg-[#46b9b5] p-6 flex justify-between items-center rounded-sm">
                  <div>
                    <h4 className="text-white font-black text-xl leading-tight font-poppins">Under Graduate<br /><span className="text-gray-900/60 font-bold text-sm">Programs / Courses</span></h4>
                  </div>
                  <div className="text-rigt">
                    <p className="text-white font-black text-3xl font-poppins">2000+</p>
                    <p className="text-gray-900/60 font-bold text-xs uppercase font-poppins">Courses</p>
                  </div>
                </div>
                <div className="bg-[#fdbb30] p-6 flex justify-between items-center rounded-sm">
                  <div>
                    <h4 className="text-white font-black text-xl leading-tight font-poppins">Post Graduation<br /><span className="text-gray-900/60 font-bold text-sm">Programs / Courses</span></h4>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-black text-3xl font-poppins">3000+</p>
                    <p className="text-gray-900/60 font-bold text-xs uppercase font-poppins">Courses</p>
                  </div>
                </div>
                <div className="bg-[#fd923a] p-6 flex justify-between items-center rounded-sm">
                  <div>
                    <h4 className="text-black font-black text-xl leading-tight font-poppins">Doctorate</h4>
                  </div>
                  <div className="text-right text-black">
                    <p className="font-black text-3xl font-poppins">50+</p>
                    <p className="font-bold text-xs uppercase font-poppins tracking-tighter">courses</p>
                  </div>
                </div>
              </div>

              {/* Detailed Course Listing Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 reveal-on-scroll border border-gray-200 rounded-2xl overflow-hidden shadow-xl">
                {[
                  {
                    t: "Software & Tech",
                    items: ["Computer Science", "Software Development", "Full Stack Development", "Cybersecurity", "Software Engineering", "DevOps", "Blockchain", "Cloud", "Backend Development", "Ev Technology"]
                  },
                  {
                    t: "Data Science",
                    items: ["Master of Science", "Executive Post Graduate Programme", "Professional Certificate Program", "Advanced Certificate Programme", "Certificate Program", "Data Science Bootcamp", "Python Programming Bootcamp"]
                  },
                  {
                    t: "AI & ML",
                    items: ["Master of Science", "Executive Post Graduate Programme", "Advanced Certificate Programme", "Advanced Certificate Programme", "Executive Post Graduate Programme"]
                  },
                  {
                    t: "Digital Marketing",
                    items: ["Advanced Certificate", "Placement Guarantee Bootcamp", "Bootcamp"]
                  },
                  {
                    t: "Business Analytics",
                    items: ["Executive Post-Graduate Programme", "Professional Certificate Program", "Master of Science", "Global Master Certificate"]
                  },
                  {
                    t: "Law",
                    items: ["LLM in Corporate & Financial Law", "Master of Laws (LLM)", "LLM in Intellectual Property & Technology Law", "LLM in Dispute Resolution"]
                  }
                ].map((col, i) => (
                  <div key={i} className="bg-gray-50/50 p-6 border-r border-gray-200 last:border-r-0 hover:bg-white transition-all">
                    <h5 className="text-gray-900 font-black text-lg mb-6 pb-2 border-b-2 border-blue-500 font-poppins h-12 flex items-center uppercase tracking-tight">{col.t}</h5>
                    <ul className="space-y-3">
                      {col.items.map((item, idx) => (
                        <li key={idx} className="text-gray-600 text-[10px] grid grid-cols-[8px_1fr] gap-2 items-start font-bold leading-tight">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Partnership Banner */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-4 reveal-on-scroll">
                <div className="bg-white p-0 flex flex-wrap items-center justify-center gap-8 rounded-sm overflow-hidden">
                  <img src="/assets/partnership_banner.png" alt="University Partners" className="h-16 w-auto object-contain" />
                </div>
                <button className="bg-amber-500 px-8 py-4 text-black font-black uppercase text-xl rounded-sm hover:bg-amber-400 transition-all font-poppins flex items-center justify-between shadow-xl">
                  MORE..... <ArrowRight className="w-6 h-6" />
                </button>
              </div>

              {/* Partner University Grids */}
              <div className="mt-12 bg-gray-50 border border-gray-100 p-8 rounded-[4rem] reveal-on-scroll">
                <div className="mb-10 inline-flex items-center gap-4 bg-[#fdbb30] px-6 py-4 rounded-full">
                  <p className="text-gray-900/60 font-bold text-xs uppercase tracking-widest leading-none font-poppins">PARTNER</p>
                  <p className="text-gray-900 font-black text-2xl leading-none font-poppins">UNIVERSITIES</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">
                  {/* India Section */}
                  <div className="bg-white p-0 group border border-gray-100 shadow-2xl overflow-hidden relative min-h-[300px] flex items-center justify-center rounded-3xl">
                    <img src="/assets/india_partners.png" alt="India Partners" className="w-full h-full object-contain" />
                  </div>

                  {/* Abroad Section */}
                  <div className="bg-white p-0 group border border-gray-100 shadow-2xl overflow-hidden relative min-h-[300px] flex items-center justify-center rounded-3xl">
                    <img src="/assets/abroad_partners.png" alt="Abroad Partners" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Certifications - PREMIUM BLUE REFINEMENT */}
      <section id="skills" className="py-12 bg-white overflow-hidden relative">
        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full">
          {/* Section Heading with Poppins Font & Brand Blue */}
          <div className="reveal-on-scroll mb-12 text-left">
            <span className="text-blue-600 font-extrabold uppercase tracking-widest text-sm mb-4 block font-poppins">
              Service 04
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 lg:mb-10 leading-tight text-gray-900 font-poppins">
              4. <span className="text-blue-600">Certifications</span>
            </h2>
            <p className="text-xl text-gray-500 font-semibold max-w-3xl leading-relaxed font-poppins">
              Propel your career with 10,000+ expert certifications and 300+ virtual internships designed for growth.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start mb-12">
            {/* Left: 4,000+ Badge for Authority - ANIMATED & REALIGNED */}
            <div className="w-full lg:w-1/4 lg:sticky lg:top-40 reveal-on-scroll">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-blue-50/50 backdrop-blur-sm p-10 rounded-[3rem] border-2 border-blue-100 shadow-2xl relative overflow-hidden group"
              >
                {/* Subtle Brand Accent */}
                <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>

                <p className="text-4xl font-black text-gray-900 flex flex-col items-start leading-none font-poppins relative z-10 pl-4">
                  <span className="text-blue-600 text-6xl lg:text-7xl mb-4 tracking-tighter drop-shadow-sm">4,000+</span>
                  <span className="text-xs lg:text-sm uppercase tracking-[0.3em] font-black text-gray-500">CERTIFICATIONS</span>
                </p>
                <div className="mt-8 pt-6 border-t border-blue-100 relative z-10 pl-4">
                  <p className="text-gray-400 font-bold text-[10px] lg:text-xs leading-relaxed tracking-wider uppercase opacity-80">Verified Global Excellence</p>
                </div>
              </motion.div>
            </div>

            {/* Right: Categorized Courses Grid - INCREASED SIZE & Premium Look */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal-on-scroll">
                {[
                  { t: "Artificial Intelligence", c: "bg-[#46b9b5]", icon: <GraduationCap className="w-8 h-8" /> },
                  { t: "Executive program in GenAI for leaders", c: "bg-[#fdbb30]", icon: <ClipboardList className="w-8 h-8" /> },
                  { t: "Data Sciencs & Analytics", c: "bg-[#fd923a]", icon: <TrendingUp className="w-8 h-8" /> },
                  { t: "HR Management & Analytics", c: "bg-[#46b9b5]", icon: <Scale className="w-8 h-8" /> },
                  { t: "Finance", c: "bg-[#46b9b5]", icon: <Users className="w-8 h-8" /> },
                  { t: "Software & Tech ", c: "bg-[#fd923a]", icon: <Code className="w-8 h-8" /> },
                  { t: "Marketing ", c: "bg-[#fdbb30]", icon: <Share2 className="w-8 h-8" /> },
                  { t: "Digital Marketing", c: "bg-[#46b9b5]", icon: <Users className="w-8 h-8" /> },
                  { t: "For College Students", c: "bg-[#fdbb30]", icon: <User className="w-8 h-8" /> },
                  { t: "Product Management", c: "bg-[#46b9b5]", icon: <Briefcase className="w-8 h-8" /> },
                  { t: "Cloud computing", c: "bg-[#fd923a]", icon: <Settings className="w-8 h-8" /> },
                  { t: "Study Abroad", c: "bg-[#fdbb30]", icon: <Globe className="w-8 h-8" /> },
                  { t: "Cyber security", c: "bg-[#fd923a]", icon: <BookOpen className="w-8 h-8" /> },
                  { t: "Chief Technology Officer (CTO) Programme", c: "bg-[#fdbb30]", icon: <Database className="w-8 h-8" /> },
                  { t: "Management", c: "bg-[#46b9b5]", icon: <Layout className="w-8 h-8" /> },
                  { t: "Business Analytics", c: "bg-[#fd923a]", icon: <Zap className="w-8 h-8" /> },
                  { t: "Supply chain", c: "bg-[#fdbb30]", icon: <Brain className="w-8 h-8" /> },
                  { t: "Allied Health  And more...", c: "bg-[#fd923a]", icon: <Monitor className="w-8 h-8" /> }
                ].map((card, idx) => (
                  <div key={idx} className="flex items-center h-24 group cursor-pointer hover:scale-[1.03] transition-all shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden border border-gray-50">
                    <div className={`${card.c} w-24 h-24 flex items-center justify-center text-white flex-shrink-0 bg-opacity-90 group-hover:bg-opacity-100 transition-colors`}>
                      {card.icon}
                    </div>
                    <div className={`${card.c} bg-opacity-80 w-full h-24 flex items-center px-6 group-hover:bg-opacity-90 transition-colors`}>
                      <p className="text-white font-black text-sm uppercase leading-tight tracking-tight font-poppins">
                        {card.t}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enroll Now Button */}
              <div className="mt-12 flex justify-center reveal-on-scroll">
                <a
                  href="https://onegrasp.com/courses/advanced-generative-ai-certification-course/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-16 py-7 bg-blue-600 text-white font-black rounded-3xl text-2xl shadow-3xl shadow-blue-500/40 hover:bg-blue-700 transition-all active:scale-95 button-shine font-poppins flex items-center gap-4"
                >
                  Enroll Now <ChevronRight className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Scientific Events - DOMAIN-BASED DISCOVERY */}
      <section id="events" className="py-12 bg-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <div className="reveal-on-scroll mb-12 text-left">
            <span className="text-blue-600 font-extrabold uppercase tracking-widest text-sm mb-4 block font-poppins">
              Service 05
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 lg:mb-10 leading-tight text-gray-900 font-poppins">
              5. Scientific <span className="text-blue-600">Events</span>
            </h2>
            <p className="text-xl text-gray-500 font-semibold max-w-3xl leading-relaxed font-poppins">
              Global networking and research excellence across international domains.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 reveal-on-scroll">
            {[
              {
                badge: 'Global',
                title: 'International Conferences',
                desc: 'Global research exposure',
                icon: <Globe className="w-8 h-8" />,
                color: '#2563eb', // Blue
                badgeBg: 'bg-blue-600'
              },
              {
                badge: 'Prestige',
                title: 'Awards & Recognitions',
                desc: 'Celebrate academic excellence',
                icon: <Award className="w-8 h-8" />,
                color: '#f39c12', // Orange/Amber
                badgeBg: 'bg-orange-500'
              },
              {
                badge: 'Faculty',
                title: 'FDPs (Faculty Development)',
                desc: 'Professional growth for educators',
                icon: <Users className="w-8 h-8" />,
                color: '#10b981', // Green
                badgeBg: 'bg-emerald-600'
              },
              {
                badge: 'Practical',
                title: 'Workshops',
                desc: 'Hands-on skill building',
                icon: <Zap className="w-8 h-8" />,
                color: '#8b5cf6', // Purple
                badgeBg: 'bg-indigo-600'
              }
            ].map((card, i) => {
              const stats = i === 0
                ? [{ v: '300+', l: 'Conferences' }, { v: '', l: '' }]
                : i === 1
                  ? [{ v: '800+', l: 'Categories' }]
                  : i === 2
                    ? [{ v: '2000+', l: "FDP's" }]
                    : [{ v: '800+', l: 'Workshops' }];

              return (
                <div key={i} className="group relative pt-6 bg-white rounded-[3.5rem] border border-gray-100 shadow-xl hover:shadow-2xl transition-all flex flex-col items-center text-center p-10">
                  {/* Badge */}
                  <div className={`absolute top-4 left-6 px-4 py-1.5 rounded-full ${card.badgeBg} text-white text-[10px] font-black uppercase tracking-widest`}>
                    {card.badge}
                  </div>

                  {/* Icon Container */}
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform" style={{ backgroundColor: `${card.color}`, color: 'white' }}>
                    {card.icon}
                  </div>

                  {/* Content */}
                  <div className="space-y-4 mb-8">
                    <h4 className="text-xl font-black text-gray-900 leading-tight">{card.title}</h4>
                    <p className="text-gray-400 font-medium text-sm leading-relaxed">{card.desc}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-center gap-6 mb-10 w-full pt-6 border-t border-gray-50/50">
                    {stats.map((stat, si) => (
                      <React.Fragment key={si}>
                        <div className="text-center">
                          <p className="text-lg font-black text-gray-900">{stat.v}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.l}</p>
                        </div>
                        {si < stats.length - 1 && <div className="w-px h-8 bg-gray-100" />}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="px-10 py-4 border-2 border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-600 hover:border-blue-600 hover:text-blue-600 hover:shadow-lg transition-all">
                    Learn More
                  </button>
                </div>
              );
            })}
          </div>

          {/* New Categories Section */}
          <div className="mt-24 reveal-on-scroll">
            <div className="relative mb-16 inline-block">
              <span className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25"></span>
              <div className="relative px-10 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse"></div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter font-poppins">
                  Explore Conference <span className="text-blue-600">Domains & Disciplines</span>
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {CONFERENCE_CATEGORIES.map((cat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`group relative flex items-center p-4 bg-white rounded-[2rem] border ${cat.border} transition-all duration-300 hover:shadow-2xl ${cat.shadow}`}
                >
                  {/* Subtle Background Tint on Hover */}
                  <div className={`absolute inset-0 ${cat.bg} opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity`}></div>

                  {/* Icon Section */}
                  <div
                    className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-12"
                    style={{ backgroundColor: cat.color }}
                  >
                    {cat.icon}
                  </div>

                  {/* Label Section */}
                  <div className="relative z-10 ml-5 flex-1 text-left">
                    <p className={`text-[13px] font-black uppercase tracking-tight leading-tight ${cat.text}`}>
                      {cat.name}
                    </p>
                    <div className={`w-0 group-hover:w-full h-0.5 mt-1 transition-all duration-500`} style={{ backgroundColor: cat.color }}></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Explore More Events Button */}
            <div className="mt-12 flex justify-center reveal-on-scroll">
              <a
                href="https://onegrasp.com/events/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-16 py-7 bg-blue-600 text-white font-black rounded-3xl text-2xl shadow-3xl shadow-blue-500/40 hover:bg-blue-700 transition-all active:scale-95 button-shine font-poppins flex items-center gap-4"
              >
                Explore More Events <ChevronRight className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Startups Support - JOURNEY TIMELINE UI */}
      <section id="startups" className="py-12 bg-[#F9FAFB] relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="reveal-on-scroll mb-12 text-left">
            <span className="text-blue-600 font-extrabold uppercase tracking-widest text-sm mb-4 block font-poppins">
              Service 06
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 lg:mb-10 leading-tight text-gray-900 font-poppins">
              6. Startups <span className="text-blue-600">Support</span>
            </h2>
            <p className="text-xl text-gray-500 font-semibold max-w-3xl leading-relaxed font-poppins">
              We connect startups with trusted angel networks and venture capital firms through curated introductions.
            </p>
          </div>

          <div className="relative reveal-on-scroll">
            {/* Path Line SVG - Desktop Only */}
            <div className="absolute top-32 left-0 w-full h-1 hidden lg:block opacity-10">
              <div className="w-full h-full bg-blue-600 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {[
                { s: "INCUBATE", t: "Idea Incubation", d: "Refinement & Mentorship", icon: <Lightbulb />, c: "bg-amber-500" },
                { s: "NETWORK", t: "Networking", d: "Relationship building & Pitching", icon: <Share2 />, c: "bg-blue-500" },
                { s: "FINANCE", t: "Funding", d: "Securing the Capital", icon: <Banknote />, c: "bg-emerald-500" },
                { s: "LAUNCH", t: "Product Launch", d: "Market Entry & Scaling", icon: <Rocket />, c: "bg-rose-500" }
              ].map((step, i) => (
                <div key={i} className="group flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-white rounded-[2rem] border-2 border-transparent group-hover:border-blue-500 shadow-2xl flex items-center justify-center text-blue-600 mb-10 transition-all transform group-hover:scale-110 group-hover:-rotate-6 relative">
                    {step.icon}
                    <div className={`absolute -top-4 -right-8 px-3 py-1 ${step.c} text-white rounded-full flex items-center justify-center text-[10px] font-black uppercase tracking-widest shadow-xl`}>
                      {step.s}
                    </div>
                  </div>
                  <h4 className="text-2xl font-black mb-4 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{step.t}</h4>
                  <p className="text-gray-500 font-bold leading-relaxed px-4">{step.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 max-w-5xl mx-auto bg-gray-900 rounded-[4rem] p-16 lg:p-20 text-white shadow-4xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-4xl lg:text-5xl font-black mb-6">Idea Valuation</h3>
                <p className="text-xl text-gray-400 font-bold leading-relaxed mb-10">
                  Exclusive introductions to active angel networks and venture capital firms.
                </p>
                <button
                  onClick={() => setIsSessionModalOpen(true)}
                  className="px-10 py-5 bg-white text-gray-900 font-black rounded-3xl text-xl hover:scale-105 transition-transform active:scale-95 shadow-2xl"
                >
                  Validate your Idea
                </button>
              </div>
              <div className="hidden lg:flex justify-end">
                <div className="w-64 h-64 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                  <TrendingUp className="w-20 h-20 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL METRICS & CTA - MINIMALIST PREMIUM LIGHT REDESIGN */}
      <section id="contact" className="py-16 bg-white relative overflow-hidden border-t border-slate-100">
        {/* Subtle Decorative Background Element */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[100px] opacity-60"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[100px] opacity-60"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black mb-16 tracking-tight text-slate-900"
          >
            Future Ready.
          </motion.h2>

          {/* Compact Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 reveal-on-scroll">
            {[
              { val: "2M+", label: "Global Learners", color: "text-blue-600" },
              { val: "433%", label: "Avg. Salary Hike", color: "text-amber-500" },
              { val: "5K+", label: "Uni Partners", color: "text-indigo-600" },
              { val: "15Y", label: "Roadmap Plan", color: "text-emerald-600" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-2"
              >
                <p className={`text-5xl lg:text-6xl font-black tracking-tighter ${stat.color}`}>
                  {stat.val}
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Sleek Minimalist CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-white border border-slate-100 p-10 lg:p-14 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] relative group"
          >
            <h3 className="text-4xl font-black mb-6 text-slate-900 tracking-tight">Decode your Future !</h3>
            <p className="text-base lg:text-lg text-slate-500 font-medium mb-10 leading-relaxed max-w-lg mx-auto">
              One scientific roadmap can change your entire professional trajectory. Start your free consultation today.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center relative z-10">
              <button
                onClick={() => setIsFreeSessionModalOpen(true)}
                className="w-full sm:w-64 h-16 bg-[#2563eb] text-white font-black rounded-2xl text-base shadow-xl shadow-blue-500/20 hover:-translate-y-1 transition-all active:scale-95"
              >
                Book FREE Session
              </button>
              <a
                href="https://wa.me/918977760443"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-64 h-16 bg-[#FDBB30] text-slate-900 font-black rounded-2xl text-base shadow-xl shadow-amber-500/20 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center"
              >
                Contact Experts
              </a>
            </div>

            {/* Clean Contact Strip */}
            <div className="mt-12 pt-10 border-t border-slate-50 flex flex-wrap justify-center gap-x-10 gap-y-4 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
              <div className="flex items-center gap-2.5 hover:text-blue-600 transition-colors cursor-pointer group/item">
                <Phone className="w-4 h-4 text-blue-500 opacity-70 group-hover/item:opacity-100" />
                <span>+91-89777 60443</span>
              </div>
              <div className="flex items-center gap-2.5 hover:text-blue-600 transition-colors cursor-pointer group/item">
                <Mail className="w-4 h-4 text-blue-500 opacity-70 group-hover/item:opacity-100" />
                <span>support@onegrasp.com</span>
              </div>
              <div className="flex items-center gap-2.5 hover:text-blue-600 transition-colors cursor-pointer group/item">
                <Globe className="w-4 h-4 text-blue-500 opacity-70 group-hover/item:opacity-100" />
                <span>onegrasp.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div >
  );
};

export default App;