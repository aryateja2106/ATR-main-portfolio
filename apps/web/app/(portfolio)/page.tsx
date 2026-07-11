import {
  Agents,
  Footer,
  Hero,
  Journey,
  SiteNav,
  Writing,
} from './_components/field-notes';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#12110f] text-[#f7f2e8]">
      <SiteNav />
      <Hero />
      <Agents />
      <Journey />
      <Writing />
      <Footer />
    </div>
  );
}
