import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ChiSiamo } from "@/components/ChiSiamo";
import { Metodo } from "@/components/Metodo";
import { Servizi } from "@/components/Servizi";
import { Numeri } from "@/components/Numeri";
import { Aggiornamenti } from "@/components/Aggiornamenti";
import { Faq } from "@/components/Faq";
import { Contatti } from "@/components/Contatti";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ChiSiamo />
        <Metodo />
        <Servizi />
        <Numeri />
        <Aggiornamenti />
        <Faq />
        <Contatti />
      </main>
      <Footer />
    </>
  );
}
