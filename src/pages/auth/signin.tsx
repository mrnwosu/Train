import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../server/auth";
import { type getServerSideProps } from "next/dist/build/templates/pages"; //Might be wrong
import { Provider } from "next-auth/providers";
import Image from "next/image";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <section className=" flex h-screen w-screen flex-row bg-black font-paytone text-white">
      <div className="w-3/5 overflow-hidden bg-gradient-to-r from-black to-zinc-900">
        {/* <Image
          src={"/pullup-full.jpg"}
          alt="Guy doing a pullup"
          layout="fill"
          className="opacity-20 grayscale"
          /> */}
      </div>
      <div className=" flex flex-col items-center justify-center w-2/5 bg-zinc-900 text-black ">
        <div className=" flex flex-col gap-4 items-center px-8 py-4 rounded-md bg-zinc-700 w-72">
            <h1 className=" text-4xl font-bold">Sign In</h1>
          {Object.values(providers).map((provider: Provider) => (
            <div key={provider.name}>
              <button
                className=" bg-zinc-200 px-4 py-2"
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

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
