import {
  Hero,
  MembershipBand,
  Objectives,
  Partners,
  StandingStrip,
  VisionMission,
  WhoWeAre,
  WhyIraq,
} from "./components";
import { InstitutionsBand } from "@/core/new-components/common";
import { HomeSectionProps } from "./types";

export default function HomePageClient({ locale }: HomeSectionProps) {
  return (
    <>
      <div className="flex flex-col">
        <Hero locale={locale} />
        <StandingStrip locale={locale} />
      </div>
      <WhoWeAre locale={locale} />
      <VisionMission locale={locale} />
      <Objectives locale={locale} />
      <WhyIraq locale={locale} />
      <MembershipBand locale={locale} />
      <Partners locale={locale} />
      <InstitutionsBand locale={locale} />
    </>
  );
}
