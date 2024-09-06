"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("email", {
      email,
      redirect: false,
      callbackUrl: "/",
    });

    if (res?.error) {
      setError("Sign-in failed. Please try again.");
    } else {
      setError(null);
      alert("Check your email for the magic link!");
    }
  };

  return (
    <main className="flex min-h-screen min-w flex-col items-center justify-between">
      <div className="z-10 items-center justify-between font-mono text-sm lg:flex">
        <div className="min-h-screen w-screen flex flex-col items-center justify-center">
          <div className="w-full max-w-md p-10">
            <h1 className="text-3xl font-semibold mb-4">Sign in with Email</h1>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </form>
            {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
