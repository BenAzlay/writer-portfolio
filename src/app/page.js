// This is a client component
"use client";;
import { useEffect, useMemo, useRef, useState } from "react";
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, BookOpen } from "react-feather";
import Book from "./components/book";
import CONSTANTS from "./constants";
import ContactForm from "./components/contact-form";
import LogoCta from "./components/logo-cta";
import Image from "next/image";

export default function Home() {
  const secondPaneRef = useRef(null);
  const storiesPaneRef = useRef(null);

  const { stories } = CONSTANTS;

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollWidgetVisible = useMemo(() => scrollPosition <= 20, [scrollPosition]);

  const executeScroll = (ref) => ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const scrollWidget = () => (
    <div
      onClick={() => executeScroll(secondPaneRef)}
      style={{ visibility: scrollWidgetVisible ? "visible" : "hidden", opacity: scrollWidgetVisible ? 1 : 0 }}
      className="scrollWidget absolute bottom-6 cursor-pointer flex flex-col items-center"
    >
      <p>Dive in</p>
      <ArrowDown className="arrow" />
    </div>
  );

  const firstPane = () => (
    <div className="flex min-h-screen flex-col text-center items-center justify-center p-1 relative text-white">
      <h1 className="font-bold text-5xl mb-2">
        Wisdom for a New Age{" "}
      </h1>
      <h2 className="mb-8 opacity-90">by Eldar Sofer</h2>
      <div className="grid grid-cols-3 gap-6 sm:gap-12 justify-items-center font-medium text-lg">
        <div onClick={() => executeScroll(storiesPaneRef)} className="flex items-center cursor-pointer">
          <span className="w-6 mr-1">📘</span>
          <span>Stories</span>
        </div>
        <a className="flex items-center" href={"https://eldarsofer.substack.com"} target="_blank">
          <Image className="w-6 mr-1" src={require('@/app/assets/substack.png')} alt="substack" />
          <span>Articles</span>
        </a>
        <a className="flex items-center" href={"https://suno.com/@eldarsofer"} target="_blank">
          <Image className="w-6 mr-1" src={require('@/app/assets/suno.png')} alt="suno" />
          <span>Songs</span>
        </a>
      </div>
      {scrollWidget()}
    </div>
  );

  const explanationPane = () => (
    <div ref={secondPaneRef} className="text-start p-2 md:p-8 lg:p-12">
      <h2 className="font-bold text-2xl mb-8">
        <span>Crafting Wisdom adapted to{" "}</span>
        <br className="block sm:hidden" />
        <TypeAnimation
          sequence={[
            'the Information Age',
            1000,
            'Artificial Intelligence',
            1000,
            'Blockchain',
            1000,
            'Mass Media',
            1000
          ]}
          wrapper="span"
          speed={50}
          style={{}}
          repeat={Infinity}
        />
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="textBox">
          <h3 id="title">Why?</h3>
          <p>We live in an age full of intelligence: artificial intelligence, smart phones, smart cars, smart homes etc. But where is the <span className="italic">wisdom</span>?</p>
          <p>
            Technology evolved too fast, and wisdom didn't catch up yet. It's about time it does.
            Tools like the Internet, AI or Blockchain can bring us together, make us smarter and safeguard our freedoms, but they can just as well create a dystopian future if we don't use them wisely.
            Our intelligence creates the tools, and our wisdom should dictate how we use them.
          </p>
        </div>
        <div className="textBox">
          <h3 id="title">How?</h3>
          <p>
            I write stories because they give emotion and soul to otherwise cold ideas.
            They say an image is worth a thousand words; likewise, a story is worth a thousand maxims.
            From one story, we each can draw our own unique interpretations and lessons that resonate with us.
            If the Ancients crafted myths to vehicle wisdom that was passed down countless generations, it's because stories are so powerful.
            My tales aim at being like those myths, drawing new lessons from old times.
          </p>
        </div>
        <div className="textBox">
          <h3 id="title">Time for Axial Age 2.0</h3>
          <p>
            Around the 5th century BCE, something major happened: most of the world wisdom was written down. Everywhere, and all at once.
            In Greece, Socrates and Plato gave birth to Western philosophy; in Babylon, the exiled Judeans wrote the Torah; in Iran, Zarathustra was teaching the Avesta;
            In India, the great Hindu epics were written and the Buddha came; in China, Confucius and Laozi shaped Chinese thought for millennia to come...
            This 5th century wisdom explosion event is called the Axial Age.
            What Socrates, Zarathustra or Laozi wrote still applies today, but they didn't have the Internet, or AI, or globalization.
            So now is the time for the Axial Age 2.0! We should not replace ancient wisdom, but update it.
            Through my tales, I hope to contribute to this Axial Age 2.0.
          </p>
        </div>
      </div>

    </div>
  );

  const storiesPane = () => (
    <div ref={storiesPaneRef} className="min-h-screen text-start p-2 md:p-8 lg:p-12">
      <h2 className="font-bold text-2xl mb-1">Read my stories</h2>
      <p className="text-gray-100 mb-8">A few stories I can share. More are on the way...</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {
          stories.map((story, index) =>
            <Book
              key={index}
              title={story.title}
              summary={story.summary}
              pdfPath={story.pdfPath}
              coverImage={story.coverImage}
            />
          )
        }

      </div>
    </div>
  );

  const contactPane = () => (
    <div className="min-h-screen text-start p-2 md:p-8 lg:p-12">
      <h2 className="font-bold text-2xl mb-1">Contact me</h2>
      <p className="text-gray-100 mb-8">Have any feedback about my stories? Wish to collaborate? Don't hesitate to reach out!</p>
      <ContactForm />
    </div>
  );

  const footer = () => (
    <div className="bg-blue-600 rounded-t-lg px-12 py-6">
      <div className="grid grid-cols-4 gap-4 max-w-fit items-center mb-4">
        <LogoCta src={require('@/app/assets/substack.png')} url={"https://eldarsofer.substack.com/"} alt="substack" title={"Read my Substack articles"} />
        <LogoCta src={require('@/app/assets/suno.png')} url={"https://suno.com/@eldarsofer"} alt="suno" title={"Listen to my AI-generated songs"} />
      </div>
      <p>Copyright © 2024 Eldar Sofer</p>
    </div>
  );

  return (
    <main className="bg-gradient-to-tr from-purple-600 to-blue-500">
      {firstPane()}
      {explanationPane()}
      {storiesPane()}
      {contactPane()}
      {/* <div className="min-h-screen text-start p-2 md:p-8 lg:p-12"></div> */}
      {footer()}
    </main>
  );
}
