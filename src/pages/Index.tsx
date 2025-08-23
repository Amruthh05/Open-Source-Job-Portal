import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import JobListings from "@/components/JobListings";
import FeaturedCompanies from "@/components/FeaturedCompanies";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <JobListings />
        <FeaturedCompanies />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
