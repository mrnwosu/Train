import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { type ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authConfig } from "../../server/auth/config";
import Image from "next/image";
import ProviderCircleButton from "./providerCircleButton";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <section className=" flex h-screen flex-row bg-black font-paytone text-white">
      <div className="relative w-2/3 overflow-hidden bg-gradient-to-r from-black to-zinc-900">
        <Image
          src={"/weights.jpg"}
          alt="Guy doing a pullup"
          layout="fill"
          sizes="100%"
          objectFit="cover"
          className="scale-[1] grayscale"
        />
      </div>
      <div className=" flex w-1/3 flex-col items-center justify-center bg-zinc-800 text-white ">
        <div className=" flex flex-col items-center gap-4 px-8 py-4">
          <h1 className=" flex flex-col text-4xl font-bold ">Sign In</h1>
          <div className=" flex h-[0.05rem] w-11/12 flex-col items-center bg-zinc-400" />
          <div className=" flex flex-row gap-x-4">
            {Object.values(providers).map((provider: ClientSafeProvider) => (
              <ProviderCircleButton key={provider.name} provider={provider} />
            ))}
          </div>
          <p className=" text-xs">Trusted Providers</p>
          <div className=" flex h-[0.05rem] w-11/12 flex-col items-center bg-zinc-400"></div>
          
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authConfig);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
