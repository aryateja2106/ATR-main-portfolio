'use client';
import React, { useState } from 'react';
import { Hexagon } from 'lucide-react';

// Experience data extracted for maintainability
const experiences = {
  pilvi: {
    company: 'Pilvi Systems',
    role: 'AI Product Manager',
    period: 'Aug 2025 - Present',
    location: 'Dallas, TX (Remote)',
    description: [
      'Shipped 3 MVPs in 2 months for B2B AI automation solutions, driving rapid product iteration cycles.',
      'Conducted 15+ customer discovery interviews to identify pain points and validate product-market fit.',
      'Designed and implemented Amplitude analytics infrastructure from scratch for data-driven decision making.',
      'Improved user activation rate from 22% to 41% through targeted onboarding flow optimizations.',
      'Collaborated with engineering team to define product roadmap and prioritize feature backlog.',
    ],
  },
  lesearch: {
    company: 'LeSearch AI',
    role: 'Founder & Product Lead',
    period: 'Nov 2024 - Present',
    location: 'Dallas, TX',
    description: [
      'Building AI-powered research platform helping researchers move from papers to action.',
      'Acquired 50+ beta users across 4 universities through direct outreach and product demos.',
      'Architected core features: PDF viewer, AI chatbot, and knowledge graph visualization.',
      'Currently rebuilding leaner version focusing on core value proposition based on user feedback.',
      'Managing full product lifecycle from ideation to deployment on Vercel infrastructure.',
    ],
  },
  ispeak: {
    company: 'iSpeak AI',
    role: 'AI Product Manager & Co-founder',
    period: 'Aug 2023 - Aug 2024',
    location: 'Pittsburgh, PA',
    description: [
      'Co-founded AI automation agency serving 10 SMB clients with 90% satisfaction rate.',
      'Built and deployed multi-modal AI pipelines for text, image, video, and audio content creation.',
      "Achieved #1 Google ranking for 'AI Automation Pittsburgh' through SEO-focused content strategy.",
      'Developed NextJS websites using TypeScript, delivering tailored solutions for diverse clients.',
      'Led marketing initiatives that drove 30% improvement in campaign effectiveness.',
    ],
  },
  duquesne: {
    company: 'Duquesne University',
    role: 'Graduate Research & Teaching Assistant',
    period: 'Aug 2022 - May 2025',
    location: 'Pittsburgh, PA',
    description: [
      'Built University Buddy AI chatbot serving 100 students with 40% engagement increase.',
      'Authored white papers on AI adoption in higher education, presented to faculty committees.',
      'Served as judge for 5 pitch competitions, evaluating startup ideas and providing feedback.',
      'Executed digital marketing campaigns for international student recruitment, increasing engagement by 40%.',
      'Implemented AI tools to automate CRM tasks, enhancing efficiency and data management.',
    ],
  },
  sage: {
    company: 'Sage Wealth Advisory',
    role: 'Financial Analyst Intern',
    period: 'May 2023 - May 2024',
    location: 'Pittsburgh, PA',
    description: [
      'Built Excel dashboards for portfolio analysis, reducing reporting time by 60%.',
      'Developed diverse portfolio strategies (growth, blended, value) based on client requirements.',
      'Conducted comprehensive financial research contributing to portfolio strategy improvements.',
      'Utilized Excel and Morning Star for effective data management and financial reporting.',
      'Supported budget preparation and financial forecasting, improving projection accuracy.',
    ],
  },
};

type ExperienceKey = keyof typeof experiences;

export const Experience = () => {
  const [activeTab, setActiveTab] = useState<ExperienceKey>('pilvi');

  const currentExperience = experiences[activeTab];

  return (
    <section id="experience" className="w-full mt-28">
      <h2 className="flex items-center text-3xl font-bold mb-16">
        <span className="mr-4">Where I&apos;ve </span>
        <span className="text-teal-400 mr-3">Worked</span>
        <div className="h-px bg-gray-600 grow" />
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Company tabs */}
        <div className="md:w-64 flex md:flex-col overflow-x-auto md:overflow-visible">
          {(Object.keys(experiences) as ExperienceKey[]).map((key) => (
            <button
              type="button"
              key={key}
              onClick={() => setActiveTab(key)}
              className={`py-3 px-4 text-left border-l-2 whitespace-nowrap transition-all duration-300 ${
                activeTab === key
                  ? 'bg-slate-800/50 text-teal-400 border-l-teal-400'
                  : 'hover:bg-slate-800/30 border-l-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              {experiences[key].company}
            </button>
          ))}
        </div>

        {/* Experience details */}
        <div className="flex-1">
          <div className="mb-2">
            <h3 className="text-2xl font-semibold">
              {currentExperience.role}{' '}
              <span className="text-teal-400">
                @ {currentExperience.company}
              </span>
            </h3>
            <p className="text-gray-400 mt-1">
              {currentExperience.period} • {currentExperience.location}
            </p>
          </div>

          <ul className="space-y-4 mt-6">
            {currentExperience.description.map((item, index) => (
              <li key={`${index}-${item.substring(0, 10)}`} className="flex">
                <Hexagon className="text-teal-400 mr-2 mt-1 size-3 fill-current shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
