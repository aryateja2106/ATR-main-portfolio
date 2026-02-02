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
      'Leading end-to-end B2B AI automation products from 0->1, shipping 3 MVPs in 8 weeks.',
      'Designed and deployed an Amplitude analytics framework to track complex agentic workflows.',
      'Refined activation loops for technical users, driving a 19% lift in week-1 retention.',
      'Conducting ongoing customer discovery with enterprise stakeholders to align roadmap with business goals.',
    ],
  },
  lesearch: {
    company: 'LeSearch AI',
    role: 'Founder & Product Lead',
    period: 'Nov 2024 - Present',
    location: 'Dallas, TX',
    description: [
      'Building an AI-native research workspace (RAG + Knowledge Graphs) for academic synthesis.',
      'Scaled to 50+ active beta users; iterating on "chat-with-library" core interactions.',
      'Handling full-stack product dev: Next.js frontend, Supabase vector store, and Python agent backend.',
    ],
  },
  mconnect: {
    company: 'mconnect',
    role: 'Product Role (Pending)',
    period: 'Dates (Pending)',
    location: 'Location (Pending)',
    description: [
      'Placeholder for mconnect experience details.',
      'Will be updated upon user provision of details.',
    ],
  },
  ispeak: {
    company: 'iSpeak AI',
    role: 'AI Product Manager & Co-founder',
    period: 'Aug 2023 - Aug 2024',
    location: 'Pittsburgh, PA',
    description: [
      'Co-founded AI automation agency; delivered custom generative AI pipelines (Text/Image/Video) for SMBs.',
      'Achieved #1 Google ranking for niche queries via programmatic SEO and content strategy.',
      'Managed cross-functional freelance teams to deliver client projects on tight deadlines.',
    ],
  },
  duquesne: {
    company: 'Duquesne University',
    role: 'Graduate Research Assistant',
    period: 'Aug 2022 - May 2025',
    location: 'Pittsburgh, PA',
    description: [
      'Developed "University Buddy" AI chatbot prototype to assist new students with FAQ resolution.',
      'Research focus: AI adoption frameworks in higher education and administrative automation.',
    ],
  },
  sage: {
    company: 'Sage Wealth Advisory',
    role: 'Financial Analyst Intern',
    period: 'May 2023 - May 2024',
    location: 'Pittsburgh, PA',
    description: [
      'Automated financial portfolio reporting using Excel macros and data visualization tools reduction reporting time by 60%.',
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
