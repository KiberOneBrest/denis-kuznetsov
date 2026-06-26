"use client"

import EvilEye from './components/EvilEye';
import Carousel from './components/Carousel'
import UserForm from './components/UserForm'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Глаз на фоне */}
      <div className="absolute inset-0 z-0">
        <EvilEye
          eyeColor="#fffb00"
          intensity={0.75}
          pupilSize={0.6}
          irisWidth={0.25}
          glowIntensity={0.35}
          scale={0.8}
          noiseScale={1}
          pupilFollow={2.5}
          flameSpeed={1}
          backgroundColor="#2522eb"
        />
      </div>

      {/* Текст поверх - теперь без pointer-events-none */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen">
        <h1 className="text-white text-4xl font-bold drop-shadow-lg text-center pointer-events-none">
          Всем привеееет с вами я денис великолепный и это мой сайт на next.JS
        </h1>
        <h2 className="text-yellow-400 text-5xl font-bold drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] mt-4 animate-pulse pointer-events-none">
          ULTRAгайд ура 
        </h2>
      </div>

      {/* Карусель */}
      <div className="relative z-10 flex items-center justify-center py-20">
        <Carousel
          baseWidth={500}
          autoplay={false}
          autoplayDelay={3000}
          pauseOnHover={false}
          loop={false}
          round={false}
        />
      </div>

      {/* Форма - теперь с z-index выше */}
      <div className="relative z-20 py-10">
        <UserForm />
      </div>
    </main>
  );
}