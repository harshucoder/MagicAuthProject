import React from 'react'
import Navbar from '../Components/Sections/Navbar'
import HeroSection from '../Components/Sections/HeroSection';
import FeatureSection from '../Components/Sections/FeatureSection';
import Footer from '../Components/Sections/Footer';
import PricingSection from '../Components/Sections/PricingSection';

const Page = () => {
  return (
    <div>
        <div className="shadow-white-l/50">
            <Navbar/>
        </div>
        <HeroSection/>
        <section id='Features'>
        <FeatureSection/>
        </section>
        <section id='Pricing'>
        <PricingSection/>
        </section>
        <Footer/>
    </div>
  )
}

export default Page;