import { BuildHero } from '@/components/hero/BuildHero';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { Packages } from '@/components/sections/Packages';
import { Process } from '@/components/sections/Process';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <>
      <BuildHero />
      <ServicesPreview />
      <SelectedWork />
      <Packages />
      <Process />
      <FAQ />
      <FinalCTA />
    </>
  );
}
