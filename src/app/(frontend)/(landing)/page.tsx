import { FeaturesSection } from "@/components/landing/features-section"
import { CtaSection } from "@/components/landing/cta-section"
import { TestimonialsSection } from "@/components/landing/testimonials/testimonials-section"
import { HeroSection } from "@/components/landing/hero-section"
import { PricingSection } from "@/components/landing/pricing-section"

export default function LandingPage() {
	return (
		<>
			<HeroSection />
			<FeaturesSection />
			<TestimonialsSection />
			<PricingSection />
			<CtaSection />
		</>
	)
}
