import Head from 'next/head';
import dynamic from 'next/dynamic';

// Import PhaserGame component without SSR
const PhaserGame = dynamic(() => import('../game/PhaserGame'), {
  ssr: false,
});

export default function Game() {
  return (
    <>
      <Head>
        <title>Star Jumper - Play</title>
        <meta name="description" content="Play Star Jumper - An exciting platform adventure!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="fixed inset-0 w-screen h-screen overflow-hidden">
        <PhaserGame />
      </main>
    </>
  );
}
