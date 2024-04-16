import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
export default function Home() {
  return (
    <div className="bg-[#FEF5E6] w-full flex flex-col h-screen max-h-screen overflow-hidden">
      <div className="h-20">
        <Header />
      </div>
      <div className="flex-1 overflow-hidden">
        <Hero />
      </div>
      <div className="h-20">
        <Footer />
      </div>
    </div>
  );
}
