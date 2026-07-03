import Link from "next/link";
import Navbar from "./_components/navbar";
import PulseMark from "./_components/pulse-mark";
import { FlaskConical, PackageSearch, Stethoscope } from "lucide-react";

const features = [
  {
    tab: "RX-01",
    href: "/ai-medicine-search",
    icon: PackageSearch,
    title: "AI Medicine Search",
    description: "Get details of any medicine with just a click.",
  },
  {
    tab: "LAB-02",
    href: "/ai-lab-report-explainer",
    icon: FlaskConical,
    title: "AI Lab Report Explainer",
    description: "Get a detailed explanation of your lab reports.",
  },
  {
    tab: "DX-03",
    href: "/ai-doctor",
    icon: Stethoscope,
    title: "AI Doctor",
    description: "Get instant diagnosis and treatment suggestions.",
  },
];

const Page = () => {
  return (
    <div>
      <Navbar />

      <section className="relative overflow-hidden border-b-2 border-foreground">
        {/* faint ECG trace running across the hero */}
        <svg
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-24 text-foreground/[0.06]"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0 50 H420 L450 10 L480 90 L510 50 H1200"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
        </svg>

        <div className="px-4 lg:px-16 py-20 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-foreground bg-secondary mb-6 text-xs font-mono font-medium tracking-wide uppercase">
              AI-Powered Healthcare
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-bold mb-5 tracking-tight leading-[1.05]">
              Care that reads
              <br />
              your <span className="text-accent">vitals</span>, not just
              <br />
              your symptoms.
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl">
              CURA AI turns medicine names, lab reports, and symptoms into
              clear answers — instantly, in plain language.
            </p>
            <Link href="/ai-doctor">
              <span className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground border-2 border-foreground font-medium hover:-translate-y-0.5 transition-transform">
                Start with the AI Doctor →
              </span>
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="relative bg-primary border-2 border-foreground rounded-3xl p-10 shadow-sm">
              <PulseMark
                className="h-28 w-28"
                markColor="hsl(var(--primary-foreground))"
                lineColor="hsl(var(--accent))"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="flex justify-center">
          <div className="max-w-screen-lg grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {features.map(({ tab, href, icon: Icon, title, description }) => (
              <Link href={href} key={tab}>
                <div className="relative h-full bg-card p-8 pt-9 rounded-xl border-2 border-foreground transition-all hover:-translate-y-1 hover:shadow-lg">
                  <span className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-md bg-foreground text-background text-xs font-mono tracking-wider">
                    {tab}
                  </span>
                  <div className="bg-secondary w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
