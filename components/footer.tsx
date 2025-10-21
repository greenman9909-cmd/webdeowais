export function Footer() {
  return (
    <footer id="contact" className="mt-24 border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-slate-400">Built by Owais Raza Shaheen</p>
          <p className="text-xs text-slate-500">
            Crafted with Next.js, Tailwind, and a love for indie gems.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-300">
          <a className="hover:text-secondary" href="https://github.com/owais" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="hover:text-secondary" href="https://twitter.com/owais" target="_blank" rel="noreferrer">
            Twitter
          </a>
          <a className="hover:text-secondary" href="mailto:contact@owais.dev">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
