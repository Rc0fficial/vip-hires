import FAQs from "@/components/FAQs";
import Footer from "@/components/Footer";
import Hero from "@/components/HeroSection";
import OurFamily from "@/components/OurFamily";
import Plan from "@/components/Plan";
import Spinner from "@/components/Spinner";
import Whychoosing from "@/components/WhyChoosing";
import { Suspense } from "react";


export default function Home() {
  return (
    <Suspense fallback={<Spinner/>}>
    <Hero/>
    <Whychoosing/>
    <OurFamily/>
    <Plan bgImg="desk"/>
    <FAQs/>
    {/* <Footer bg={"bg-bggreen"}/> */}
    </Suspense>
  );
}
