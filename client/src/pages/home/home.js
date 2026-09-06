import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Wrench,
  Zap,
  BookOpen,
  Scissors,
  Camera,
  Search,
  Handshake,
  CheckCircle2,
} from "lucide-react";
import logo from "../../logo.svg";
import Header from "../../components/header/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const categories = [
  { name: "Home Cleaning", icon: Sparkles },
  { name: "Plumbing", icon: Wrench },
  { name: "Electrical", icon: Zap },
  { name: "Tutoring", icon: BookOpen },
  { name: "Beauty & Wellness", icon: Scissors },
  { name: "Photography", icon: Camera },
];

const steps = [
  {
    icon: Search,
    title: "Find a professional",
    description: "Browse service listings by category, location, and rate.",
  },
  {
    icon: Handshake,
    title: "Connect directly",
    description: "Reach out to the professional and agree on the details.",
  },
  {
    icon: CheckCircle2,
    title: "Get it done",
    description: "Get your service completed by a trusted professional.",
  },
];

export default function Home() {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const headingRef = useRef(null);
  const ctaRef = useRef(null);
  const cardsRef = useRef(null);

  return (
    <>
      <Header />
      <div ref={containerRef} className="bg-background">
        <section className="container flex flex-col items-center gap-6 py-20 text-center">
          <img ref={logoRef} src={logo} alt="ServiceFare logo" className="h-20 w-20" />
          <h1 ref={headingRef} className="text-4xl font-bold tracking-tight sm:text-5xl">
            Find trusted professionals for any service
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            ServiceFare connects you with skilled professionals for home
            services, tutoring, photography, and more &mdash; or list your own
            services and start getting booked.
          </p>
          <div ref={ctaRef} className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/services">Browse Services</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/register">Become a Professional</Link>
            </Button>
          </div>
        </section>

        <section className="container py-16">
          <h2 className="mb-8 text-center text-2xl font-semibold">
            Popular categories
          </h2>
          <div ref={cardsRef} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map(({ name, icon: Icon }) => (
              <Card key={name} className="transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col items-center gap-3 pt-6 text-center">
                  <Icon className="h-8 w-8 text-primary" />
                  <span className="text-sm font-medium">{name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-t bg-muted/30 py-16">
          <div className="container">
            <h2 className="mb-8 text-center text-2xl font-semibold">
              How it works
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {steps.map(({ icon: Icon, title, description }) => (
                <Card key={title}>
                  <CardHeader className="items-center text-center">
                    <Icon className="mb-2 h-8 w-8 text-primary" />
                    <CardTitle className="text-base">{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-sm text-muted-foreground">
                    {description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
