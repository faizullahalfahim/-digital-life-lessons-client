import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ArrowRight } from "lucide-react";



const bannerData = [
  {
    id: "b1",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1740&q=80",
    title: "Prepare for the Digital Future",
    subtitle:
      "Gain practical skills in coding, finance, and modern technology to stay ahead.",
    link: "/lessons",
    cta: "Explore Lessons",
    alt: "Person working on laptop — digital skills and learning",
  },
  {
    id: "b2",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1740&q=80",
    title: "Live Learning with Experts",
    subtitle:
      "Ask questions in our live mentorship sessions and receive real-time guidance.",
    link: "/mentorship",
    cta: "Join Mentorship",
    alt: "Instructor explaining concepts during live session",
  },
  {
    id: "b3",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1740&auto=format&fit=crop",
    title: "Track Your Progress",
    subtitle:
      "View learning time and milestones on your personalized dashboard.",
    link: "/dashboard",
    cta: "View Dashboard",
    alt: "Progress dashboard showing charts and metrics",
  },
];

const Banner = () => {
  return (
    <section
      aria-label="Homepage promotional carousel"
      className="max-w-7xl mx-auto rounded-xl shadow-2xl overflow-hidden mt-6"
    >
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators
        showArrows
        swipeable
        emulateTouch
        stopOnHover
        interval={6000}
        transitionTime={700}
        ariaLabel="Promotional slides"
        className="relative"
      >
        {bannerData.map((item) => (
          <article
            key={item.id}
            className="relative h-[300px] sm:h-[420px] lg:h-[560px] flex items-center"
          >
            {/* background image */}
            <img
              src={item.imageUrl}
              alt={item.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* gradient overlay for better text contrast */}
            <div
              className="absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(180deg, rgba(2,6,23,0.18) 0%, rgba(2,6,23,0.45) 60%, rgba(2,6,23,0.6) 100%)",
              }}
            />

            {/* content card (centered) */}
            <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16">
              <div className="mx-auto max-w-4xl text-center text-white">
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow-md">
                  {item.title}
                </h2>

                <p className="mt-3 text-sm sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                  {item.subtitle}
                </p>

                <div className="mt-6 flex justify-center">
                  <a
                    href={item.link}
                    className="inline-flex items-center gap-3 rounded-full bg-white/95 text-slate-900 px-5 py-3 font-semibold shadow-lg hover:scale-[1.02] transform transition focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
                    aria-label={`${item.cta} - ${item.title}`}
                  >
                    <span className="sr-only">{item.title} — </span>
                    <span>{item.cta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Accessible hidden caption for screen readers */}
            <p className="sr-only">
              Slide: {item.title} — {item.subtitle}
            </p>
          </article>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;