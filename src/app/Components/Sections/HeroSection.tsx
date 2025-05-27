"use client";

import React from "react";
import Button from "../UI/Button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-10 lg:px-20 overflow-hidden">
      {/* Background Image with Next.js Image component */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/HeroStack.png" // Make sure the image is in your public folder
          alt="MagicAuth background"
          fill
          priority
          quality={100}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Dark overlay */}
      <div ></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Simplify Your Authentication <br /> With{" "}
          <span className="text-purple-400">MagicAuth</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8 mx-auto">
          Forget passwords. Secure your app with one-click login magic links.
          Easy integration, secure sessions, happier users.
        </p>

        <div className="flex gap-6 flex-col sm:flex-row justify-center items-center">
          <Button
            text="SignUp"
            link="/client/register"
            style="bg-white text-black border-black hover:bg-transparent hover:text-white hover:border-white hover:border-2"
          />

          <Button
            text="View Docs"
            link="/documentation"
            style="bg-white text-black border-black hover:bg-transparent hover:text-white hover:border-white hover:border-2"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
