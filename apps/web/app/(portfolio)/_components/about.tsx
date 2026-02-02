'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useAnimation, type Variants } from 'framer-motion';

// Define card data structure
interface CardData {
  title: string;
  emoji: string;
  content: string;
  specialBorder?: boolean;
}

// Card data array
const cardData: CardData[] = [
  {
    title: 'Marketing Roots to AI PM',
    emoji: '📈',
    content:
      'Four years owning growth campaigns taught me how to mine customer signals, brief creative teams, and quantify lift. That frontline marketing context is the foundation of my AI PM work because it keeps me obsessed with the exact users, pain points, and revenue moments we are building for.',
  },
  {
    title: 'Building LeSearch AI',
    emoji: '🤖',
    content:
      'I co-built LeSearch AI, a GPT-4 research copilot for policy, climate, and venture analysts. I owned prompt architectures, prioritized workflows with the founders, launched features like guided briefs and source pinboards, and let user interviews dictate the backlog that drove retention.',
  },
  {
    title: 'Shipping Scrappy MVPs',
    emoji: '⚡',
    content:
      'Every week I shipped an MVP—SQL agents for non-technical ops teams, auto-browsing Q&A bots for scouts, summarizers for due diligence—and instrumented each launch so we could cut scope or double down based on activation, not vibes.',
  },
  {
    title: 'Searching for APM Roles',
    emoji: '🎯',
    content:
      'Now I am actively interviewing for Associate PM programs at AI-first teams where I can combine go-to-market intuition with hands-on prototyping. I want to run discovery, scope the AI workflows, rally eng/design, and keep iterating until we show measurable lift.',
    specialBorder: true,
  },
];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
    },
  },
};

const ConnectingLine = ({
  startRef,
  endRef,
}: {
  startRef: React.RefObject<HTMLDivElement | null>;
  endRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const updatePath = () => {
      if (
        !startRef.current ||
        !endRef.current ||
        !pathRef.current ||
        !circleRef.current
      )
        return;

      const startRect = startRef.current.getBoundingClientRect();
      const endRect = endRef.current.getBoundingClientRect();

      const startX = startRect.left + startRect.width / 2;
      const startY = startRect.bottom;
      const endX = endRect.left + endRect.width / 2;
      const endY = endRect.top;

      // Adjust for parent SVG positioning
      if (!pathRef.current.ownerSVGElement) return;
      const parentRect =
        pathRef.current.ownerSVGElement.getBoundingClientRect();
      const adjustedStartX = startX - parentRect.left;
      const adjustedStartY = startY - parentRect.top;
      const adjustedEndX = endX - parentRect.left;
      const adjustedEndY = endY - parentRect.top;

      // Create curved path
      const curveControl = (adjustedStartY + adjustedEndY) / 2;
      const pathData = `M ${adjustedStartX},${adjustedStartY} C ${adjustedStartX},${curveControl} ${adjustedEndX},${curveControl} ${adjustedEndX},${adjustedEndY}`;

      pathRef.current.setAttribute('d', pathData);

      // Update animation path
      const animateMotion = circleRef.current.querySelector('animateMotion');
      if (animateMotion) {
        animateMotion.setAttribute('path', pathData);
      }
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    window.addEventListener('scroll', updatePath);

    // Set an interval to periodically update the path
    // This helps with dynamic content and scrolling
    const interval = setInterval(updatePath, 500);

    return () => {
      window.removeEventListener('resize', updatePath);
      window.removeEventListener('scroll', updatePath);
      clearInterval(interval);
    };
  }, [startRef, endRef]);

  return (
    <>
      <path
        ref={pathRef}
        stroke="#2dd4bf"
        strokeWidth="2"
        fill="none"
        strokeDasharray="5,5"
        strokeLinecap="round"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="100"
          to="0"
          dur="15s"
          repeatCount="indefinite"
        />
      </path>
      <circle
        ref={circleRef}
        r="4"
        fill="#2dd4bf"
        filter="drop-shadow(0 0 3px rgba(45, 212, 191, 0.8))"
      >
        <animateMotion dur="3s" repeatCount="indefinite" />
      </circle>
    </>
  );
};

const Card = ({
  card,
  index,
  refCallback,
}: {
  card: CardData;
  index: number;
  refCallback: (element: HTMLDivElement | null) => void;
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      className="relative z-10"
      variants={itemVariants}
      initial="hidden"
      animate={controls}
      custom={index}
    >
      <h3 className="text-xl font-semibold text-teal-400 mb-6 text-center">
        {card.title}
      </h3>
      <div
        ref={refCallback}
        className={`card-content bg-neutral-800/50 backdrop-blur-md rounded-xl p-6 ${
          card.specialBorder
            ? 'border-x-4 border-x-teal-400 border-b-4 border-b-teal-400'
            : 'border-t-4 border-teal-400'
        } shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
      >
        <div className="text-3xl text-teal-400 mb-4 text-center">
          {card.emoji}
        </div>
        <p className="text-justify text-neutral-300">{card.content}</p>
      </div>
    </motion.div>
  );
};

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const setCardRef = (index: number) => (element: HTMLDivElement | null) => {
    cardRefs.current[index] = element;
  };

  return (
    <section id="about" className="w-full py-16">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-3 relative inline-block">
            Journey to AI PM
            <motion.span
              className="absolute bottom-0 inset-x-1/4 h-1 bg-teal-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </h2>
          <p className="text-xl text-teal-400 mt-4">
            My journey from business to AI
          </p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Intro Card */}
          <motion.div
            ref={introRef}
            className="bg-neutral-800/50 backdrop-blur-md rounded-xl p-8 border-x-4 border-x-teal-400 shadow-lg mb-16 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-justify text-neutral-300">
              From Marketing to AI PM is literally the story of my career. I led
              high-growth marketing teams, realized the same instincts could
              steer AI products, and dove headfirst into discovery, prompt
              design, and roadmap work. The cards below unpack how that pivot
              produced LeSearch AI, a cadence of scrappy MVPs, and my current
              search for APM roles where the marketing-to-product bridge sets me
              apart.
            </p>
          </motion.div>

          {/* SVG for connecting lines */}
          <svg
            aria-hidden="true"
            className="absolute top-0 left-0 size-full z-0 pointer-events-none"
          >
            {/* Line from intro to first card */}
            {cardRefs.current[0] && (
              <ConnectingLine
                startRef={introRef}
                endRef={{ current: cardRefs.current[0] }}
              />
            )}

            {/* Lines between cards */}
            {cardRefs.current.map((_, index) => {
              if (
                index < cardRefs.current.length - 1 &&
                cardRefs.current[index] &&
                cardRefs.current[index + 1]
              ) {
                return (
                  <ConnectingLine
                    key={`connecting-line-${index}-to-${index + 1}`}
                    startRef={{ current: cardRefs.current[index] }}
                    endRef={{ current: cardRefs.current[index + 1] }}
                  />
                );
              }
              return null;
            })}
          </svg>

          <motion.div
            className="space-y-24 relative"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {/* Map through card data */}
            {cardData.map((card, index) => (
              <Card
                key={card.title}
                card={card}
                index={index}
                refCallback={setCardRef(index)}
              />
            ))}
          </motion.div>

          <motion.div
            className="mt-16 text-center relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
              <Link
                href="/resume"
                className="inline-block px-6 py-3 border-2 border-teal-400 text-teal-400 font-semibold rounded transition-all duration-300 hover:bg-teal-400 hover:text-neutral-900"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  View My Résumé
                </motion.span>
              </Link>
              <Link
                href="https://linkedin.com/in/arya-teja-rudraraju"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-3 border-2 border-teal-400 text-teal-400 font-semibold rounded transition-all duration-300 hover:bg-teal-400 hover:text-neutral-900"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  Connect on LinkedIn
                </motion.span>
              </Link>
              <Link
                href="https://github.com/aryateja2106"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-3 border-2 border-teal-400 text-teal-400 font-semibold rounded transition-all duration-300 hover:bg-teal-400 hover:text-neutral-900"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  Explore My GitHub
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Support both named and default exports
export default About;
