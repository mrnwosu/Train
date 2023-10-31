import { useEffect, useState } from "react";
import UserActions from "~/components/UserActions";

export default function Layout({ children }) {
  const [shouldLoadHeader, setShouldLoadHeader] = useState(false)
  const pagesToHideHeader = [
    '/auth/signin'
  ]

  function handleScrollForNavbar(){
    const header = document.querySelector(".le-header");
    const scrollPercent = (window.scrollY / window.innerHeight);
    if (scrollPercent > .35) {
      console.log(scrollPercent)
      header?.classList.add("le-header-active");
    } else {
      header?.classList.remove("le-header-active");
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrollForNavbar);
    setShouldLoadHeader(!pagesToHideHeader.includes(window.location.pathname))
    
    return () => {
      window.removeEventListener("scroll", handleScrollForNavbar);
    };
  }, [])

  return <div className=" ">
    {shouldLoadHeader && <header className=" bg-opacity-0 le-header fixed z-20 w-full px-4 py-2 duration-300">
          <nav className="flex flex-row items-center justify-end">
            <div className=" flex flex-row items-center justify-between gap-4 [&_button]:bg-opacity-0">
              <UserActions  />
            </div>
          </nav>
        </header>}
    {children}
    </div>;
}
