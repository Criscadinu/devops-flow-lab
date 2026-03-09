"use client";

import { signIn } from "next-auth/react";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function SignInPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "#000" }}
    >
      <div className="w-full max-w-sm flex flex-col items-center gap-8 text-center">

        {/* Classification label */}
        <p className="text-xs font-mono tracking-[0.25em] uppercase text-gray-700">
          Nexus Corp - Access Required
        </p>

        {/* Heading */}
        <div className="flex flex-col gap-3">
          <h1
            className="text-4xl text-white tracking-tight leading-tight"
            style={{ ...syne.style, fontWeight: 800 }}
          >
            Log in to start your mission.
          </h1>
          <p className="text-sm text-gray-600">
            Your progress is saved. No credit card required.
          </p>
        </div>

        {/* Google sign-in button */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center gap-4 px-5 py-4 text-sm font-medium text-white transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "#111",
            border: "1px solid rgb(31,41,55)",
            borderLeft: "3px solid rgb(6,182,212)",
          }}
        >
          <GoogleIcon />
          <span className="flex-1 text-left">Sign in with Google</span>
        </button>

        {/* Fine print */}
        <p className="text-xs text-gray-800">
          By signing in you agree to our terms of use.
        </p>
      </div>

      {/* Bottom wordmark */}
      <p className="absolute bottom-8 text-xs font-mono text-gray-800 tracking-widest">
        DevOps Flow Lab
      </p>
    </main>
  );
}
