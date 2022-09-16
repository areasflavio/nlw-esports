import { useEffect, useState } from 'react';

import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdDialog } from './components/CreateAdDialog';
import { GameBanner } from './components/GameBanner';

type Game = {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  };
};

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto my-20 flex flex-col items-center">
      <img src="/logo-nlw-esports.svg" alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{' '}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{' '}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          />
        ))}
      </div>

      <CreateAdDialog />
    </div>
  );
}

export default App;
