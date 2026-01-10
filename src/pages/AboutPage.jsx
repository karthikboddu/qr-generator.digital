import React from 'react';
import Seo from '../components/Seo';
import { Target, Zap, ShieldCheck } from 'lucide-react';

function AboutPage() {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn about our mission to provide a free, fast, and feature-rich QR Code Generator for everyone."
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-center mb-4">About QR Gen</h1>
        <p className="text-xl text-muted-foreground text-center mb-12">
          Our mission is to provide the simplest, most powerful, and privacy-respecting QR code tool on the web.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 text-blue-400 mb-4">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Powerful & Free</h2>
            <p className="text-muted-foreground">
              To empower users to create high-quality, custom QR codes for any purpose, completely free of charge.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 text-blue-400 mb-4">
              <Zap className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Blazing Fast</h2>
            <p className="text-muted-foreground">
              All QR codes are generated instantly in your browser. No server-side processing means no waiting.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 text-blue-400 mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Privacy First</h2>
            <p className="text-muted-foreground">
              Your data, including uploaded logos, never leaves your device. We don't track or store your content.
            </p>
          </div>
        </div>

        <div className="mt-16 prose prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground">
          <h3 className="text-3xl font-bold">Why Choose Us?</h3>
          <p>
            In a digital world, QR codes are the bridge between physical and online spaces. We saw a need for a tool that was not only powerful but also respected user privacy and was incredibly easy to use. That's why we built QR Gen. 
          </p>
          <p>
            Whether you're a small business owner creating a link to your menu, a marketer running a campaign, an event organizer sharing Wi-Fi details, or just someone wanting to share your contact info with a vCard, our tool is designed for you. With support for a wide range of content types including URLs, social media, WhatsApp, and more, plus customization options like colors and logos, you have everything you need to create the perfect QR code.
          </p>
          <p>
            We are committed to keeping this tool free and continuously improving it with new features based on user feedback. Thank you for choosing us for your QR code needs!
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
