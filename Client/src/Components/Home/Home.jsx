import React from 'react'
import HeroSection from './HeroSection'
import CtaSection from './CtaSection'
import VideoSection from './VideoSection'
import Categories from './Categories'
import FeaturedSection from './FeaturedSection'

function Home() {
  return (
    <>
    <HeroSection/>
    <FeaturedSection/>

    <VideoSection/>
    <Categories/>
    <CtaSection/>
    </>
  )
}

export default Home