import { Hero } from '@/components/Hero';
import { BusinessValueStrip } from '@/components/BusinessValueStrip';
import { FeaturedCollection } from '@/components/FeaturedCollection';
import { ShopByCategory } from '@/components/ShopByCategory';
import { WholesaleSolutions } from '@/components/WholesaleSolutions';
import { StartYourGarmentBusiness } from '@/components/StartYourGarmentBusiness';
import { WhyJyotiEnterprise } from '@/components/WhyJyotiEnterprise';
import { AboutSection } from '@/components/AboutSection';
import { BusinessResources } from '@/components/BusinessResources';
import { ContactSection } from '@/components/ContactSection';

export default function HomePage() {
  return (
    <>
      {/* 2. Premium Hero */}
      <Hero />

      {/* 3. Business Value Strip */}
      <BusinessValueStrip />

      {/* 4. Featured Wholesale Collection */}
      <FeaturedCollection />

      {/* 5. Shop by Category */}
      <ShopByCategory />

      {/* 6. Wholesale Solutions */}
      <WholesaleSolutions />

      {/* 7 & 8. Start Your Garment Business + Business Questionnaire */}
      <StartYourGarmentBusiness />

      {/* 9. Why Jyoti Enterprise */}
      <WhyJyotiEnterprise />

      {/* 10. About / Business Story */}
      <AboutSection />

      {/* 11. Business Resources (Garment Business Guide) */}
      <BusinessResources />

      {/* 12. Contact Desk & Wholesale CTA */}
      <ContactSection />
    </>
  );
}
