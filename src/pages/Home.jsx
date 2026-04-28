import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import HowWeWork from '../components/HowWeWork';
import Projects from '../components/Projects';
import Store from '../components/Store';
import Benefits from '../components/Benefits';
import Experience from '../components/Experience';
import CTAFinal from '../components/CTAFinal';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import Team from '../components/Team';

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <main>
        <Hero />
        <Services />
        <HowWeWork />
        <Projects />
        <Store />
        <Benefits />
        <Experience />
        <Team />
        <CTAFinal />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
