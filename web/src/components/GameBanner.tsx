interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner({ adsCount, bannerUrl, title }: GameBannerProps) {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt="" />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0">
        <strong className="block font-bold text-white">{title}</strong>
        <span className="block text-sm text-zinc-300">
          {adsCount} anúncio(s)
        </span>
      </div>
    </a>
  );
}
