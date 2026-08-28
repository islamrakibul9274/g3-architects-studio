import { Hero } from '@/components/home/Hero';
import { BeforeAfterSlider } from '@/components/home/BeforeAfterSlider';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { ArchitectPhilosophy } from '@/components/home/ArchitectPhilosophy';
import { LiveStats } from '@/components/home/LiveStats';
import { StudioTeam } from '@/components/home/StudioTeam';
import { TestimonialsSponsors } from '@/components/home/TestimonialsSponsors';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <BeforeAfterSlider />
      <ArchitectPhilosophy />
      <LiveStats />
      <StudioTeam />
      <TestimonialsSponsors />
    </>
  );
}
