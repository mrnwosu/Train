import { type ClientSafeProvider, signIn } from "next-auth/react";

export default function ProviderCircleButton({
  provider,
}: {
  provider: ClientSafeProvider;
}) {

  return (
    <button
      className=" bottom-4 text-md w-full flex flex-col items-center justify-center rounded-full border-2 border-zinc-200 bg-zinc-700 p-2 hover:bg-zinc-500 active:bg-zinc-600"
      onClick={() => signIn(provider.id)}
    >
      {provider.name}
    </button>
  );
}
