import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const UserActions = () => {
  const { data: sessionData } = useSession();
  const [shouldShowViewDashboardButton, setShouldShowViewDashboardButton] = useState(false);
  const pagesToHideViewDashboardButton = ["/dashboard"];
  const counterRef = useRef(0);

  useEffect(() => {
    const pathName = window.location.pathname.toLowerCase();
    const shouldShow = !pagesToHideViewDashboardButton.includes(pathName);
    setShouldShowViewDashboardButton(shouldShow);

    if (pathName.includes("dashboard")) {
      const header = document.querySelector(".le-header");
      header?.classList.add("top-2");
    }
  }, []);

  return (
    <div className=" le-header relative flex flex-row items-center justify-center gap-4">
      <p className="text-center text-lg text-white">{sessionData && <span>{sessionData.user?.name}</span>}</p>
      {sessionData && shouldShowViewDashboardButton ? (
        <Link
          className="rounded-full bg-yellow-700/50 px-6 py-2 font-semibold text-white no-underline transition ease-in hover:bg-yellow-500/50"
          href="/Dashboard"
        >
          View Dashboard
        </Link>
      ) : null}
      <button
        className="rounded-full bg-white/10 px-6 py-2 font-semibold text-white no-underline transition hover:bg-white/20 active:bg-white/30 "
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

type ButtonProps = {
  onClick?: () => void;
  onHover?: () => void;
  onIntesection?: () => void;
  text: string;
  className?: string | undefined;
};

function applyButtonProps(id: string, props: ButtonProps) {
  const button = document.getElementById(id);
  if (!button) return;

  if (props.onClick) {
    button.addEventListener("click", props.onClick);
  }

  if (props.onHover) {
    button.addEventListener("mouseenter", props.onHover);
  }

  if (props.onIntesection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!props.onIntesection) return;
          props.onIntesection();
        }
      });
    });

    observer.observe(button);
  }
}



function RoundedButton(props: ButtonProps) {

    const guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    useEffect(() => {
      applyButtonProps(guid, props);
    }, []);

    return (
      <button
        className="rounded-full bg-yellow-700/50 px-6 py-2 font-semibold text-white no-underline transition hover:bg-yellow-500/50 active:bg-yellow-600/30 "
      >
        {props.text}
      </button>
    );
}

function GhostRoundedButton(props: ButtonProps) {

  

  return (
    <button
      id={guid}
      className="rounded-full border-2 border-zinc-600 px-6 py-2 font-semibold text-white no-underline transition hover:bg-white/20 active:bg-white/30 "
    >
      {props.text}
    </button>
  );
}


function RoundSecondaryButton(props: ButtonProps) {
  const guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  useEffect(() => {
    const button = document.getElementById(guid);
    if (button) {
      if (props.onClick) {
        button.addEventListener("click", props.onClick);
      }
      if (props.onHover) {
        button.addEventListener("mouseenter", props.onHover);
      }
    }
  }, []);

  return (
    <button
      id={guid}
      className="rounded-full bg-white/10 px-6 py-2 font-semibold text-white no-underline transition hover:bg-white/20 active:bg-white/30 "
    >
      {props.text}
    </button>
  );
}
