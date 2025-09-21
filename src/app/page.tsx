import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import { FeatureCard } from "@/components/home/FeatureCard";
import { TechStackItem } from "@/components/home/TechStackItem";
import { MessageCircle, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { features, techStack } from "@/constants";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Logo href="/" size="md" />
            <Button asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          {/* Large Logo */}
          <div className="mb-8 flex justify-center">
            <Logo size="xl" />
          </div>

          <Badge variant="outline" className="mb-4">
            <Zap className="mr-1 h-3 w-3" />
            Real-time messaging
          </Badge>

          <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-6xl dark:text-white">
            Connect with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              anyone, anywhere
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-xl text-slate-600 dark:text-slate-300">
            Experience the future of communication with our lightning-fast,
            secure, and feature-rich real-time chat application built with
            Next.js 15 and modern web technologies.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/login">
                Start Chatting Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              asChild
            >
              <Link href="https://github.com/AhmedFaridMostafa/realtime-chat">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white/50 px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-800/50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
              Why Choose Our Chat App?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              Built with cutting-edge technology for the best user experience
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                iconColor={feature.iconColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
              Built with Modern Technology
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Leveraging the latest web technologies for optimal performance
            </p>
          </div>

          <div className="grid grid-cols-2 items-center justify-items-center gap-8 md:grid-cols-4 lg:grid-cols-6">
            {techStack.map((tech, index) => (
              <TechStackItem
                key={index}
                name={tech.name}
                shortName={tech.shortName}
                bgColor={tech.bgColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Ready to Start Chatting?
          </h2>
          <p className="mb-8 text-xl text-blue-100">
            Join thousands of users who are already enjoying seamless real-time
            communication
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
              asChild
            >
              <Link href="/login">
                <MessageCircle className="mr-2 h-5 w-5" />
                Get Started Free
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-6 text-blue-100">
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              <span>No setup required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              <span>Instant messaging</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              <span>Secure & private</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-4 flex items-center justify-center space-x-2">
            <Logo size="sm" showText={true} />
          </div>
          <p className="mb-4 text-slate-400">
            Built with ❤️ using Next.js 15, TypeScript, and modern web
            technologies
          </p>
          <p className="text-sm text-slate-500">
            © 2024 AL-Fared. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
