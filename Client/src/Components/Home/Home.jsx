import React from 'react'
import HeroSection from './HeroSection'
import CtaSection from './CtaSection'
import VideoSection from './VideoSection'
import Categories from './Categories'
import FeaturedSection from './FeaturedSection'
import Articleone from './articleOne'

function Home() {
  return (
    <>
    <HeroSection/>
    <FeaturedSection/>

    <VideoSection/>
    <Categories/>
    <Articleone/>
    <CtaSection/>
    </>
  )
}

export default Home