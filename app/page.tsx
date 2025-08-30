"use client";

import TicTacToe from "@/components/tic-tac-toe";
import { useEffect } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
export default function Home() {
  const { setFrameReady, isFrameReady } = useMiniKit();

  useEffect(() => {
    if (!isFrameReady) setFrameReady();
  }, [isFrameReady, setFrameReady]);
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <TicTacToe />
    </main>
  );
}
