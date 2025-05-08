'use client';

import { About } from "./_components/about";
import {Blogs} from "./_components/blogs";
import {Experience} from "./_components/experience";
import { Hero } from "./_components/hero";
import {Projects} from "./_components/projects";
import {Qualities} from "./_components/qualities";
import {TechStack} from "./_components/skills";



export default function Page() {
  return (
    <div className="relative w-full">
      <Hero />
      {/* Main content container */}
      <div className="w-full px-4 md:max-w-4xl lg:px-0 pb-28 pt-20 m-auto space-y-28 overflow-hidden">
         <About/>
        <Experience/>
      <TechStack/>
         <Qualities/>
         <Projects/>
       <Blogs/>
      </div>
    </div>
  )
}