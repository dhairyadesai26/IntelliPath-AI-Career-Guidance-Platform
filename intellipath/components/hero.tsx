"use client"
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'


const HeroSection = () => {
   const imageRef = useRef(null);
   useEffect(() =>{
    const imageElement = imageRef.current;
    const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const scrollThreshold = 100;
    if(scrollPosition>scrollThreshold){
        imageElement.classList.add("scrolled");
    }
    else{
        imageElement.classList.remove("scrolled");
    }
};
    window.addEventListener("scroll",handleScroll);
    return () => {
        window.removeEventListener("scroll",handleScroll);
    }

   },[])
  return <section className="w-full pt-36 md:pt-48 pb-10 ">
    <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
            <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title">
           Discover your perfect career path with <br/>AI-powered personalized guidance. 
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                IntelliPath is an AI-powered platform that analyzes your skills, interests, and academic background to recommend the best career paths, identify skill gaps, and generate personalized learning roadmaps.
                </p>
        </div>
         <div className="flex justify-center space-x-4" >
            <Link href='/dashboard'>
             <Button size="lg" className="px-8">
                Get Started
             </Button>
            </Link>
             <Link href='/dashboard'>
             <Button size="lg" className="px-8" variant="outline">
                Get Started
             </Button>
            </Link>
         </div>
    </div>
  </section>
}

export default HeroSection 