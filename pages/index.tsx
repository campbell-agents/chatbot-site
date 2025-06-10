export default function Home() {
  return (
    <>
      {/* NAVBAR */}
      <header className="w-full bg-white/80 dark:bg-zinc-900/90 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-xl font-bold text-zinc-900 dark:text-white">
            Campbell Virtual
          </div>
          <ul className="flex gap-6 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <li><a href="/">Home</a></li>
            <li><a href="/reviews">Reviews</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#info">More Info</a></li>
          </ul>
        </nav>
      </header>

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-28 bg-white dark:bg-zinc-900">
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
          Welcome to Campbell Virtual
        </h1>
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl">
          Custom virtual agents built to fit your needs.
        </p>
      </section>

      {/* WHAT WE OFFER */}
      <section className="px-4 py-16 bg-zinc-50 dark:bg-zinc-950">
        <h2 className="text-center text-2xl font-semibold text-zinc-800 dark:text-white mb-10">
          What We Offer
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          <div className="w-[300px] rounded-xl p-6 backdrop-blur-lg bg-white/70 text-zinc-900 shadow-md border border-zinc-200 dark:bg-white/5 dark:text-zinc-100 dark:shadow-lg dark:shadow-black/30 dark:border-white/10 transition-all duration-300">
            Seamless AI workflows that connect your tools and data for smarter automation.
          </div>
          <div className="w-[300px] rounded-xl p-6 backdrop-blur-lg bg-white/70 text-zinc-900 shadow-md border border-zinc-200 dark:bg-white/5 dark:text-zinc-100 dark:shadow-lg dark:shadow-black/30 dark:border-white/10 transition-all duration-300">
            Virtual agents tailored to your unique customer needs and branding.
          </div>
          <div className="w-[300px] rounded-xl p-6 backdrop-blur-lg bg-white/70 text-zinc-900 shadow-md border border-zinc-200 dark:bg-white/5 dark:text-zinc-100 dark:shadow-lg dark:shadow-black/30 dark:border-white/10 transition-all duration-300">
            Continuous maintenance and updates to keep your agents performing at their best.
          </div>
        </div>
      </section>
    </>
  );
}