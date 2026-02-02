import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Typewriter } from './typewriter';
import { ExploreButton } from './explore-button';
import Image from 'next/image';
import Robot from '../../../public/assets/Robot.png';

export function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const [binaryDigits, setBinaryDigits] = useState<
    Array<{ opacity: number; value: string; transform: string }>
  >([]);

  // Generate binary digits data on client-side only
  useEffect(() => {
    const digits = Array.from({ length: 100 }).map((_, i) => ({
      opacity: Math.random() * 0.8 + 0.2,
      value: i % 2 ? '1' : '0',
      transform: `translateY(${(i % 5) * 20}px) rotate(${i % 2 ? '0deg' : '90deg'})`,
    }));
    setBinaryDigits(digits);
    setIsMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <div className="w-full px-4 md:max-w-4xl lg:px-0 pb-28 pt-20 m-auto space-y-28 overflow-hidden">
      <div className="relative flex min-h-[85vh] w-full flex-col items-center md:justify-center py-8 px-4 md:px-0">
        {/* Background effects */}
        <div className="absolute -z-50 size-64 top-20 left-0 bg-[conic-gradient(transparent,rgb(0,0,0))] opacity-15 blur-3xl dark:bg-[conic-gradient(transparent,rgb(255,255,255))] md:left-36" />

        {/* Binary digits background effect (subtle) - Client-side only to prevent hydration mismatch */}
        {isMounted && (
          <div className="absolute inset-0 -z-40 overflow-hidden opacity-[0.03]">
            <div className="absolute left-0 top-0 size-full flex flex-wrap justify-center content-start gap-3 md:gap-5">
              {binaryDigits.map((digit, i) => (
                <div
                  key={`binary-${i}-${digit.value}`}
                  className="text-teal-500 font-mono text-xs md:text-sm"
                  style={{
                    transform: digit.transform,
                    opacity: digit.opacity,
                  }}
                >
                  {digit.value}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main content */}
        <motion.div
          className="flex w-full max-w-7xl flex-col-reverse md:flex-row items-center gap-8 md:gap-12 md:justify-between"
          variants={containerVariants}
          initial="hidden"
          animate={isMounted ? 'visible' : 'hidden'}
        >
          {/* Left column: Name, typewriter, value prop, CTAs */}
          <motion.div
            className="flex w-full flex-col items-center gap-6 md:w-3/5 md:items-start"
            variants={itemVariants}
          >
            {/* Name with sparkle effect */}
            <div className="relative">
              <motion.span
                className="flex flex-col items-center md:items-start w-min font-bold text-black drop-shadow-2xl dark:text-neutral-50 md:w-max"
                variants={itemVariants}
              >
                <div className="relative inline-block">
                  <span className="relative text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-500 pb-2">
                    Arya Teja
                  </span>
                  <span className="absolute -right-6 -top-4 text-xl animate-pulse text-yellow-300">
                    ✨
                  </span>
                </div>
                <span className="text-5xl md:text-6xl text-neutral-500 font-light tracking-tight">
                  Rudraraju
                </span>
              </motion.span>
            </div>

            {/* Typewriter with gradient underline */}
            <motion.div variants={itemVariants} className="relative w-full">
              <span className="flex w-full items-center justify-center text-center text-xl md:text-2xl text-neutral-300 font-mono md:min-h-fit md:justify-start md:text-left">
                <span className="text-teal-500 mr-2">{'>'}</span>
                <Typewriter
                  words={[
                    'AI Product Manager Who Builds',
                    'Building LeSearch AI',
                    'Shipping 0→1 Products',
                    'Bridging Research & Engineering',
                  ]}
                  loop
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
              <div className="mt-2 h-[1px] w-24 bg-gradient-to-r from-teal-500/50 to-transparent hidden md:block" />
            </motion.div>

            {/* Value Proposition with animated reveal */}
            <motion.p
              className="text-neutral-400 text-lg leading-relaxed max-w-lg text-center md:text-left backdrop-blur-sm md:backdrop-brightness-100 p-4 md:p-0 rounded-xl border border-neutral-800/50 md:border-0 bg-neutral-900/20 md:bg-transparent"
              variants={itemVariants}
            >
              Building the next generation of{' '}
              <b className="text-neutral-200">AI Agents</b>. Currently shipping
              enterprise automation at{' '}
              <b className="text-neutral-200">Pilvi Systems</b> and building{' '}
              <b className="text-neutral-200">LeSearch AI</b>. Focused on the
              intersection of{' '}
              <span className="text-teal-400">LLM Reasoning</span>,{' '}
              <span className="text-teal-400">Reliability</span>, and{' '}
              <span className="text-teal-400">User Experience</span>.
            </motion.p>

            {/* Call to Action Buttons with hover effects */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto"
              variants={itemVariants}
            >
              {/* Primary CTA - Resume Download */}
              <a
                href="/resume/Arya_Teja_PM_Resume.pdf"
                download="Arya_Teja_PM_Resume.pdf"
                onClick={() => {
                  if (
                    typeof globalThis.window !== 'undefined' &&
                    (globalThis.window as any).gtag
                  ) {
                    (globalThis.window as any).gtag(
                      'event',
                      'resume_download',
                      {
                        event_category: 'engagement',
                        event_label: 'Resume PDF Download',
                      },
                    );
                  }
                }}
                className="group relative px-8 py-3.5 bg-teal-500 text-neutral-950 font-bold rounded-lg hover:bg-teal-400 transition-all duration-300 text-center overflow-hidden inline-flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]"
              >
                <svg
                  className="w-5 h-5 transition-transform group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="relative z-10">Download Resume</span>
              </a>

              {/* Secondary CTA - Contact */}
              <Link
                href="#contact"
                className="group relative px-8 py-3.5 border border-teal-500/30 text-teal-400 font-medium rounded-lg hover:bg-teal-500/10 transition-all duration-300 text-center backdrop-blur-sm"
              >
                <span className="relative z-10">Get in Touch</span>
              </Link>
            </motion.div>

            {/* Unified explore button - visible on both mobile and desktop */}
            <motion.div className="mt-8" variants={itemVariants}>
              <ExploreButton />
            </motion.div>
          </motion.div>

          {/* Animated Hero Image */}
          <motion.div
            className="hidden md:block relative z-20"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              scale: 1.02,
              rotate: 1,
              transition: { duration: 0.4 },
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              <Image
                src={Robot}
                alt="AI Robot Concept"
                className="relative w-80 lg:w-96 object-cover drop-shadow-[0_0_30px_rgba(45,212,191,0.2)] transition-all duration-500"
                priority
              />
              <div className="absolute -z-50 size-80 bottom-10 right-0 bg-[radial-gradient(circle,rgba(45,212,191,0.15)_0%,transparent_70%)] blur-3xl" />
            </div>
          </motion.div>

          {/* Mobile Hero Image */}
          <div className="flex flex-col items-center md:hidden">
            <motion.div
              className="w-full flex justify-center pb-8"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-teal-500/20 blur-3xl rounded-full" />
                <Image
                  src={Robot}
                  alt="AI Robot Concept"
                  className="relative w-64 object-cover drop-shadow-[0_0_20px_rgba(45,212,191,0.25)]"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
