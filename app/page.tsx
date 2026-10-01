import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Progetti } from "@/components/Progetti";
import { ChiSiamo } from "@/components/ChiSiamo";
import { Metodo } from "@/components/Metodo";
import { Servizi } from "@/components/Servizi";
import { Numeri } from "@/components/Numeri";
import { Aggiornamenti } from "@/components/Aggiornamenti";
import { Faq } from "@/components/Faq";
import { Contatti } from "@/components/Contatti";
import { Footer } from "@/components/Footer";
import { SignatureBeam } from "@/components/ui/SignatureBeam";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Progetti />
        <SignatureBeam />
        <ChiSiamo />
        <SignatureBeam />
        <Metodo />
        <SignatureBeam />
        <Servizi />
        <SignatureBeam />
        <Numeri />
        <SignatureBeam />
        <Aggiornamenti />
        <SignatureBeam />
        <Faq />
        <SignatureBeam />
        <Contatti />
      </main>
      <Footer />
    </>
  );
}
