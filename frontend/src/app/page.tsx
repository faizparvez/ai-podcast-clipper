// landing page
import DoodleBackground from "~/components/DoodleBackground";
import { Hero } from "~/components/Hero";
import { Features } from "~/components/Features";
import { Workflow } from "~/components/Workflow";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { Examples } from "~/components/Examples";

export default function HomePage() {
  return (
    <>
      <Header />
      <DoodleBackground />
      <Hero />
      <Workflow />
      <Features />
      <Examples />
      <Footer />
    </>
  );
}
