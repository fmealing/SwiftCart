import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
      <div className="max-w-4xl text-center p-8 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-white mb-6">
          About <span className="text-yellow-300">Minimalist Tech</span>
        </h1>
        <p className="text-xl text-white leading-relaxed">
          Welcome to Minimalist Tech. I&apos;m <strong>Florian Mealing</strong>,
          a developer driven by the belief that simplicity in design leads to
          clarity in innovation. Technology should work for us, not overwhelm
          us, and that&apos;s the ethos behind everything I build.
        </p>
        <p className="text-xl text-white leading-relaxed mt-4">
          My journey into tech started with the desire to create solutions that
          make life easier. Over time, I realised that the beauty of technology
          lies in its ability to simplify even the most complex challenges.
          Minimalist Tech was born from this vision: to reduce complexity,
          improve functionality, and design experiences that feel intuitive.
        </p>
        <p className="text-xl text-white leading-relaxed mt-4">
          This project began as a humble front-end exercise but evolved into
          something far more impactful. Along the way, I&apos;ve learned, grown,
          and sharpened my skills as a developer. What you see today is a
          reflection of my dedication to continuous improvement and a commitment
          to building with purpose.
        </p>
        <p className="text-xl text-white leading-relaxed mt-4">
          I believe that technology, when thoughtfully designed, can empower
          people to do their best work and live more fulfilling lives.
          Minimalist Tech is my contribution to that vision—a platform built to
          serve, inspire, and simplify.
        </p>
        <Image
          src="/images/about-me-illustration.jpg"
          alt="Illustration of me working on a project"
          width={150}
          height={60}
          layout="intrinsic"
          className="mx-auto mt-8 w-full md:w-1/2"
        />
      </div>
    </section>
  );
};

export default About;
