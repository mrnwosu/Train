import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState} from "react";

export default function UserActions() {
  const { data: sessionData } = useSession();
  const [shouldShowViewDashboardButton, setShouldShowViewDashboardButton] = useState(false)
  const pagesToHideViewDashboardButton = [
    '/dashboard'
  ]

  useEffect(() => {
    setShouldShowViewDashboardButton(!pagesToHideViewDashboardButton.includes(window.location.pathname))
  }, [])

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <p className="text-center text-lg text-white">
        {sessionData && <span>{sessionData.user?.name}</span>}
      </p>
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
}
