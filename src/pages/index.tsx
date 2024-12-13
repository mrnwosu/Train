import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import _ from "lodash";
import { isMobile } from "react-device-detect";

export default function Home() {
  useEffect(() => {
    function handleIntersection(entries: IntersectionObserverEntry[]) {
      const viewProgramButton = document.getElementById("viewProgramsButton");
      const firstInfoSection = document.getElementsByClassName("fadeInInfo")[0];

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fadeInInfo-active");
          viewProgramButton?.style.setProperty("opacity", "0");
        } else {
          entry.target.classList.remove("fadeInInfo-active");
          if (entry.target == firstInfoSection) {
            viewProgramButton?.style.setProperty("opacity", "1");
          }
        }
      });
    }
    const infoElements = document.getElementsByClassName("fadeInInfo");

    const threshold = isMobile ? 0.3 : 0.2;
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: threshold,
    });

    _.each(infoElements, (element) => {
      observer.observe(element);
    });

    const titles = document.getElementsByClassName("fadeTitle");
    _.each(titles, (title) => {
      setTimeout(() => {
        title.classList.add("fadeTitle-active");
      }, 500);
    });

    return () => {
      _.each(infoElements, (element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <>
      <Head>
        <title>Train With Ike</title>
        <meta name="description" content="Training portal for Ike Nwosu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex flex-col bg-black font-paytone text-white">
        <div className=" relative h-[38em] overflow-hidden">
          <Image
            src={"/ropes.jpg"}
            id="ropes-bg"
            sizes="100%"
            layout="fill"
            objectFit="cover"
            alt="Ropes"
            className=" translate-y-6 scale-110 grayscale md:translate-x-12 lg:translate-x-12"
          />
          <div className=" relative left-6 top-24 flex flex-col items-start gap-8 md:left-12 md:gap-4 lg:left-48 lg:top-20 lg:gap-4">
            <h1 className=" fadeTitle text-center text-8xl font-bold  text-black">
              Live
            </h1>
            <h1 className=" fadeTitle text-center text-8xl font-bold  text-black">
              Train
            </h1>
            <h1 className=" fadeTitle text-center text-9xl font-bold text-yellow-400 ">
              Shine
            </h1>
          </div>
        </div>

        {/* View Programs */}
        <div className=" relative flex flex-col items-center overflow-hidden ">
          <div className=" top-12 z-10 my-10 flex flex-row gap-4">
            <button
              id="viewProgramsButton"
              className=" h-fit w-fit border-2 border-zinc-900 bg-zinc-800 px-8 py-2 text-lg transition duration-500 hover:border-yellow-500 hover:bg-zinc-500"
              onClick={() => {
                document
                  .querySelector(".programs")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Programs
            </button>
          </div>
          <Image
            id="pullup-image"
            src={"/pullup.jpg"}
            alt="Online Training"
            objectFit="cover"
            layout="fill"
            className=" absolute opacity-20 grayscale transition"
          />
        </div>

        {/* Online Div */}
        <div className=" programs">
          <section className=" relative bg-gradient-to-r from-[#0E0900] to-black object-fill md:p-4 lg:p-4">
            <div className="fadeInInfo flex flex-auto flex-col justify-center gap-10 md:flex-row lg:flex-row ">
              <div className=" flex h-96 flex-col items-center rounded-lg p-1 md:w-1/2 md:p-0 lg:w-1/3 lg:p-0">
                <h1 className=" mt-6 text-center text-3xl font-bold">Onine</h1>
                <p className="mt-6 text-center md:w-5/6 md:text-left lg:w-5/6 lg:text-left">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                  voluptate, voluptatem, doloremque, quae doloribus voluptatum
                  vero quas voluptas voluptatibus nemo cumque. Quisquam, quae
                  voluptas. Quisquam, quae voluptas.
                </p>
                <p className="mt-6 text-center md:w-5/6 md:text-left lg:w-5/6 lg:text-left">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                  voluptate, voluptatem, doloremque, quae doloribus voluptatum
                  vero quas voluptas voluptatibus nemo cumque. Quisquam, quae
                  voluptas. Quisquam, quae voluptas.
                </p>
              </div>
              <div className=" relative h-24 overflow-hidden rounded-lg md:h-96 md:w-1/2 lg:h-96 lg:w-1/3">
                <Image
                  src={"/online.jpg"}
                  alt="Online Training"
                  objectFit="cover"
                  layout="fill"
                  className="
                scale-110 opacity-40 transition duration-300 ease-in hover:scale-100 hover:opacity-100"
                />
              </div>
            </div>
          </section>

          {/* In Person Div */}
          <section className=" relative bg-gradient-to-r from-black to-zinc-900 md:p-10 lg:p-10">
            <div className="fadeInInfo flex flex-auto flex-col justify-center gap-10 md:flex-row lg:flex-row">
              {!isMobile ? (
                <div className=" relative h-24 overflow-hidden rounded-lg bg-black md:h-96 md:w-1/2 lg:h-96 lg:w-1/3">
                  <Image
                    src={"/deadlift.jpg"}
                    alt="Online Training"
                    objectFit="cover"
                    layout="fill"
                    className="
                scale-110 opacity-40 grayscale transition duration-300 ease-in hover:scale-100 hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              ) : null}
              <div className=" flex h-96 flex-col items-center rounded-lg p-1 md:w-1/2 md:p-0 lg:w-1/3 lg:p-0">
                <h1 className=" mt-6 text-center text-3xl font-bold">
                  In person
                </h1>
                <p className="mt-6 text-center md:w-5/6 md:text-left lg:w-5/6 lg:text-left">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                  voluptate, voluptatem, doloremque, quae doloribus voluptatum
                  vero quas voluptas voluptatibus nemo cumque. Quisquam, quae
                  voluptas. Quisquam, quae voluptas.
                </p>
                <p className="mt-6 text-center md:w-5/6 md:text-left lg:w-5/6 lg:text-left">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                  voluptate, voluptatem, doloremque, quae doloribus voluptatum
                  vero quas voluptas voluptatibus nemo cumque. Quisquam, quae
                  voluptas. Quisquam, quae voluptas.
                </p>
              </div>
              {/* Bad Workaround  */}
              {isMobile ? (
                <div className=" relative h-24 overflow-hidden rounded-lg bg-black md:h-96 md:w-1/2 lg:h-96 lg:w-1/3">
                  <Image
                    src={"/deadlift.jpg"}
                    alt="Online Training"
                    objectFit="cover"
                    layout="fill"
                    className="
  scale-110 opacity-40 grayscale transition duration-300 ease-in hover:scale-100 hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              ) : null}
            </div>
          </section>
        </div>
        <footer className=" flex h-1/5 flex-row justify-end gap-4 bg-zinc-900 p-4">
          <a className=" transition hover:scale-[1.02] hover:text-yellow-200">
            Contact Me
          </a>
          <a className=" transition hover:scale-[1.02] hover:text-yellow-200">
            About this Site
          </a>
        </footer>
      </main>
    </>
  );
}
