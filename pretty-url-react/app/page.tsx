"use client"; // required for client-side React features (useState, etc.)

import { useState } from "react";

export default function Home() {
  const [destination, setDestination] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShortUrl("");
    setError("");

    if (!destination) return;

    try {
      const res = await fetch("http://localhost:3000/short-urls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination }),
      });

      if (!res.ok) {
        throw new Error(`Failed. Status: ${res.status}`);
      }

      const data = await res.json();
      setShortUrl(data.shortUrl);
      setDestination("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error creating short URL");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          URL Shortener
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter a URL"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full"
          />
          <button
            type="submit"
            className="rounded-md border border-transparent transition-colors bg-blue-600 text-white hover:bg-blue-500 font-medium h-10 px-4"
          >
            Shorten
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-sm mt-3">{error}</p>
        )}

        {shortUrl && (
          <div className="mt-6 p-4 rounded bg-gray-100 dark:bg-gray-800">
            <p className="mb-2">Short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {shortUrl}
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(shortUrl)}
              className="ml-4 text-blue-600 underline text-sm"
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
