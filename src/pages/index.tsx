import Head from "next/head";
import { api } from "~/utils/api";
import Image from "next/image";
import { useEffect } from "react";
import _ from "lodash";
import { useSession } from "next-auth/react";
import { AuthShowcase } from "./UserActions";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const { data: session } = useSession();

  useEffect(() => {
    function handleIntersection(
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) {

      const viewProgramButton = document.getElementById("viewProgramsButton");
      const firstInfoSection = document.getElementsByClassName("fadeInInfo")[0];

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fadeInInfo-active");
          viewProgramButton?.style.setProperty("opacity", "0")
          
        } else {
          entry.target.classList.remove("fadeInInfo-active");
          if(entry.target == firstInfoSection){
            viewProgramButton?.style.setProperty("opacity", "1")
          }
        }
      });
    }
    const infoElements = document.getElementsByClassName("fadeInInfo");

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
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
    }

  }, []);

  return (
    <>
      <Head>
        <title>Train With Ike</title>
        <meta name="description" content="Training portal for Ike Nwosu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-paytone relative flex flex-col bg-black text-white">
        <header className=" absolute z-20 h-12 w-screen">
          <nav className=" flex flex-row items-center justify-end p-4">
            <div className=" flex flex-row items-center justify-between gap-4">
              <AuthShowcase />
            </div>
          </nav>
        </header>
        <div className=" relative h-[38em] w-screen overflow-hidden">
          <Image
            src={"/ropes.jpg"}
            id="ropes-bg"
            sizes="100%"
            layout="fill"
            objectFit="cover"
            alt="Ropes"
            className=" translate-x-12 translate-y-6 scale-110 grayscale"
          />
          <div className=" relative left-48 top-20 flex flex-col items-start gap-4">
            <h1 className=" fadeTitle font-paytone text-center text-8xl font-bold  text-black">
              Live
            </h1>
            <h1 className=" fadeTitle font-paytone text-center text-8xl font-bold  text-black">
              Train
            </h1>
            <h1 className=" fadeTitle font-paytone text-center text-9xl font-bold text-yellow-400 ">
              Shine
            </h1>
          </div>
        </div>

        {/* View Programs */}
        <div className=" relative flex flex-col items-center overflow-hidden ">
          <div className=" top-12 z-10 my-10 flex flex-row gap-4">
            <button id="viewProgramsButton" className=" h-fit w-fit border-2 border-zinc-900 bg-zinc-800 px-8 py-2 text-lg transition hover:border-yellow-500 hover:bg-zinc-500">
              View Programs
            </button>
          </div>
          <Image
            id="pullup-image"
            src={"/pullup.jpg"}
            alt="Online Training"
            objectFit="cover"
            layout="fill"
            className=" 
                absolute opacity-20 grayscale transition"
          />
        </div>

        {/* Online Div */}
        <section className=" bg-gradient-to-r from-[#0E0900] to-black p-4">
          <div className="fadeInInfo  flex flex-auto flex-row justify-center gap-10 ">
            <div className=" flex h-96 w-1/3 flex-col items-center rounded-lg">
              <h1 className=" font-paytone mt-6 text-center text-3xl font-bold">
                Onine
              </h1>
              <p className="mt-6 w-5/6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                voluptate, voluptatem, doloremque, quae doloribus voluptatum
                vero quas voluptas voluptatibus nemo cumque. Quisquam, quae
                voluptas. Quisquam, quae voluptas.
              </p>
              <p className="mt-6 w-5/6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                voluptate, voluptatem, doloremque, quae doloribus voluptatum
                vero quas voluptas voluptatibus nemo cumque. Quisquam, quae
                voluptas. Quisquam, quae voluptas.
              </p>
            </div>
            <div className=" relative h-96 w-1/3 overflow-hidden rounded-lg">
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
        <section className=" bg-gradient-to-r from-black to-zinc-900 p-10">
          <div className="fadeInInfo flex flex-auto flex-row justify-center gap-10">
            <div className=" relative h-96 w-1/3 overflow-hidden rounded-lg bg-black">
              <Image
                src={"/deadlift.jpg"}
                alt="Online Training"
                objectFit="cover"
                layout="fill"
                className="
              scale-110 opacity-40 grayscale transition duration-300 ease-in hover:scale-100 hover:opacity-100 hover:grayscale-0"
              />
            </div>
            <div className=" flex h-96 w-1/3 flex-col items-center rounded-lg">
              <h1 className=" font-paytone mt-6 text-center text-3xl font-bold">
                In person
              </h1>
              <p className="mt-6 w-5/6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                voluptate, voluptatem, doloremque, quae doloribus voluptatum
                vero quas voluptas voluptatibus nemo cumque. Quisquam, quae
                voluptas. Quisquam, quae voluptas.
              </p>
              <p className="mt-6 w-5/6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                voluptate, voluptatem, doloremque, quae doloribus voluptatum
                vero quas voluptas voluptatibus nemo cumque. Quisquam, quae
                voluptas. Quisquam, quae voluptas.
              </p>
            </div>
          </div>
        </section>

        <footer className=" flex h-1/5 w-screen flex-row justify-end gap-4 bg-zinc-900 p-4">
          <a className=" transition hover:scale-[1.05] hover:text-yellow-600">
            Contact Me
          </a>
          <a className=" transition hover:scale-[1.05] hover:text-yellow-600">
            About this Site
          </a>
        </footer>
      </main>
    </>
  );
}
