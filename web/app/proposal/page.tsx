'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, ShieldCheck, Layers, Zap, BrainCircuit, Workflow, ArrowRight, 
  ChevronDown, Terminal, Boxes, GitBranch, Cloud, Lock, Wand2 
} from 'lucide-react';

const pillars = [
  {
    id: 1,
    icon: <BrainCircuit className="w-6 h-6" />,
    title: 'هوش مصنوعی تطبیقی',
    en: 'Adaptive AI',
    color: 'from-emerald-400 to-cyan-400',
  },
  {
    id: 2,
    icon: <Layers className="w-6 h-6" />,
    title: 'معماری لایه‌ای',
    en: 'Layered Architecture',
    color: 'from-blue-400 to-indigo-400',
  },
  {
    id: 3,
    icon: <Zap className="w-6 h-6" />,
    title: 'سرعت و بهینگی',
    en: 'Speed & Optimization',
    color: 'from-amber-400 to-orange-400',
  },
];

const stack = [
  { name: 'Next.js 14', icon: '⬛', role: 'Web Frontend' },
  { name: 'FastAPI', icon: '⚡', role: 'Backend' },
  { name: 'Flutter', icon: '🦋', role: 'Mobile' },
  { name: 'PostgreSQL', icon: '🐘', role: 'Database' },
  { name: 'Redis', icon: '🔴', role: 'Cache & Queue' },
  { name: 'Chromadb', icon: '🧠', role: 'Vector Memory' },
  { name: 'Docker', icon: '🐳', role: 'Runtime' },
  { name: 'LangChain', icon: '⛓️', role: 'AI Orchestration' },
];

const liftItems = [
  { title: 'پلتفرم بهره‌وری', subtitle: '20/80 Productivity', emoji: '🎯' },
  { title: 'مرکز تمرکز', subtitle: 'Deep Focus Hub', emoji: '🧘' },
  { title: 'تسلط بر اهداف', subtitle: 'Goals Tracker', emoji: '🏆' },
  { title: 'مربی شخصی', subtitle: 'AI Tutor', emoji: '🎓' },
  { title: 'اتوماسیون هوشمند', subtitle: 'Smart Automation', emoji: '⚙️' },
  { title: 'تحلیل عملکرد', subtitle: 'Analytics', emoji: '📊' },
];

export default function ProposalPage() {
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0b1220] text-white font-sans selection:bg-emerald-500/30 overflow-hidden">
      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-1/2 left-1/4 w-[800px] h-[800px] bg-emerald-600/20 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute top-1/3 -left-1/4 w-[600px] h-[600px] bg-cyan-600/15 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute -bottom-1/4 right-1/4 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[140px] mix-blend-screen" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8">
            <Wand2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs tracking-widest text-emerald-300 uppercase">Magic Proposal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent mb-6">
            پلتفرم ۲۰/۸۰
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            یک سیستم بهره‌وری هوشمند که با اصل پارتو، تمرکز، اهداف و تعامل را در یک تجربه یکپارچه می‌سازد.
          </p>
        </motion.div>

        {/* Magic Lift-Up Cards */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <Rocket className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-semibold text-white/90">ساختار پروژه</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {liftItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group relative p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl hover:bg-white/[0.06] transition-all duration-500 cursor-pointer"
              >
                <div className="text-4xl mb-4 opacity-90 group-hover:scale-110 transition-transform duration-500 origin-bottom-left">
                  {item.emoji}
                </div>
                <h3 className="text-lg font-semibold text-white/90 mb-1">{item.title}</h3>
                <p className="text-sm text-white/40 font-mono">{item.subtitle}</p>
                <div className="absolute top-6 left-6 w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Architecture Pillars */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <Boxes className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white/90">سه پایه اصلی</h2>
          </div>
          <div className="space-y-4">
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.id}
                layout
                onClick={() => setExpandedPillar(expandedPillar === pillar.id ? null : pillar.id)}
                className={`relative overflow-hidden rounded-3xl border border-white/[0.08] backdrop-blur-2xl transition-colors duration-500 cursor-pointer ${
                  expandedPillar === pillar.id ? 'bg-white/[0.08]' : 'bg-white/[0.03] hover:bg-white/[0.06]'
                }`}
              >
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}>
                      {pillar.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white/90">{pillar.title}</h3>
                      <p className="text-xs text-white/40 font-mono">{pillar.en}</p>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: expandedPillar === pillar.id ? 180 : 0 }}>
                    <ChevronDown className="w-5 h-5 text-white/40" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {expandedPillar === pillar.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="px-6 overflow-hidden"
                    >
                      <div className="pb-6 pt-2 text-white/60 leading-relaxed">
                        {pillar.id === 1 && 'سیستم‌های هوشمند که با یادگیری از رفتار کاربر، برنامه فردی بهره‌وری ارائه می‌دهند.'}
                        {pillar.id === 2 && 'جداسازی واضح لایه‌های دامنه، زیرساخت و ارائه، برای توسعه پایدار و مقیاس‌پذیر.'}
                        {pillar.id === 3 && 'بهینه‌سازی عملکرد و رابط کاربری با بیلد استاتیک، کش هوشمند و CND-Ready.'}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack Grid */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-white/90">پشته فناوری</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl hover:border-white/20 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 origin-center">{tech.icon}</div>
                <h4 className="font-semibold text-white/90 mb-1">{tech.name}</h4>
                <p className="text-xs text-white/40">{tech.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Magic Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center pt-12 pb-8 border-t border-white/[0.06]"
        >
          <div className="inline-flex items-center gap-2 text-white/30 text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>ساخته شده با اطمینان و خودکار</span>
            <span className="mx-2">·</span>
            <GitBranch className="w-4 h-4" />
            <span>GitHub: Ferry737/20-80-software</span>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
