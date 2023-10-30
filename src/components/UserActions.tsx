import { signIn, signOut, useSession } from "next-auth/react";

export function UserActions() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <p className="text-center text-lg text-white">
        {sessionData && <span>{sessionData.user?.name}</span>}
      </p>
      {sessionData ? (
        <button className="rounded-full bg-yellow-700/50 px-6 py-2 font-semibold text-white no-underline transition ease-in hover:bg-yellow-500/50">
          View Dashboard
        </button>
      ) : null}
      <button
        className="rounded-full bg-white/10 px-6 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
