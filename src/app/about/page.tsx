import Image from 'next/image'; import Link from 'next/link'; import { Header } from '@/components/Header'; import { Footer } from '@/components/Footer';

export const metadata = { title: "About | Nette's Corner", description: "A space for healing, personal growth, faith, and becoming the best version of you." };

const values = [
  { name: 'Faith', image: '/images/Faith2.png', desc: 'The steady undercurrent of everything here. Not perfect faith, honest faith. The kind that holds you even when you are asking the hard questions.' },
  { name: 'Growth', image: '/images/Growth_banner.png', desc: 'Real, imperfect, daily growth. Not the highlight reel, the actual work of becoming. We celebrate the small wins and the slow seasons equally.' },
  { name: 'Healing', image: '/images/Healing.png', desc: 'Because so many of us are carrying things we have not named yet. This is a space where healing is honored, at whatever pace yours needs to happen.' },
  { name: 'Everyday Life', image: '/images/Lifestyle.png', desc: 'Growth does not happen in grand moments. It happens in ordinary Tuesdays and quiet decisions. We talk about the real, everyday texture of becoming.' },
];

export default function About() {
  return (
    <>
      <Header />
      <main>
        <section className="shell grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="eyebrow">About Nette</p>
            <p className="mt-5 font-display text-2xl text-plum/70">Hi, I&apos;m</p>
            <h1 className="mt-2 text-5xl leading-[1.05] sm:text-6xl">Nette <em className="text-wine">and this is my corner.</em></h1>
            <p className="mt-6 max-w-lg leading-7 text-plum/70">A space for healing, personal growth, faith, and becoming the best version of you. You do not have to have it all figured out to start, you just have to start.</p>
            <div className="mt-7 flex flex-wrap gap-3 text-xs">
              {['Heal Deeply', 'Grow Daily', 'Trust God', 'Live Purposefully'].map((p) => (
                <span key={p} className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-medium text-plum/75"><span className="h-1.5 w-1.5 rounded-full bg-wine" />{p}</span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/blog" className="btn-primary">Read the blog</Link>
              <Link href="#newsletter" className="btn-secondary">Join the community</Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-blush/45">
              <Image src="/images/post_1.png" alt="Nette, welcome to Nette's Corner" fill className="object-cover" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 bg-ivory/90 p-4 backdrop-blur">
              <span className="text-xl">♡</span>
              <p className="font-display text-base italic">&quot;I&apos;m so glad you&apos;re here.&quot;</p>
            </div>
          </div>
        </section>

        <section className="bg-plum py-4 text-ivory">
          <div className="shell flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium uppercase tracking-[.2em] text-ivory/70">
            {['Faith', 'Growth', 'Motivation', 'Healing', 'Inspiration', 'Purpose', 'Becoming', 'One Day at a Time'].map((w) => <span key={w}>{w}</span>)}
          </div>
        </section>

        <section className="shell grid gap-12 py-20 md:grid-cols-2 md:items-center">
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-full bg-blush">
              <Image src="/images/Nette.png" alt="Nette, Nette's Corner" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-2 rounded-2xl bg-ivory px-5 py-4 shadow-sm">
              <p className="font-display text-2xl text-wine">2022</p>
              <p className="text-xs text-plum/60">Since Nette&apos;s Corner</p>
            </div>
          </div>
          <div>
            <p className="eyebrow">My story</p>
            <h2 className="mt-3 text-4xl leading-[1.1]">I started writing because <em className="text-wine">I needed the words too.</em></h2>
            <p className="mt-5 leading-7 text-plum/70">Nette&apos;s Corner did not start as a blog. It started as something quieter, a need to process, to put words around the things I was carrying. The grief. The uncertainty. The slow, sometimes painful work of figuring out who I was becoming and whether I was doing it right.</p>
            <p className="mt-4 leading-7 text-plum/70">What I found, as I kept writing, was that the things I was going through were not mine alone. People were reading and recognizing themselves. And that is when I understood what this space was really for.</p>
            <p className="mt-4 leading-7 text-plum/70">Nette&apos;s Corner is built on the belief that growth does not require perfection, it just requires honesty, a little faith, and the courage to keep going even when you cannot see the full picture yet.</p>
            <p className="mt-4 leading-7 text-plum/70">Whether you found this space in a season of healing, searching, or simply looking for something real, you are welcome here. Pull up a chair. You do not have to have it figured out to belong.</p>
            <Link href="/blog" className="btn-primary mt-7">Start reading</Link>
          </div>
        </section>

        <section className="bg-cream py-20">
          <div className="shell text-center">
            <p className="eyebrow">What this space is built on</p>
            <h2 className="mx-auto mt-3 max-w-xl text-4xl">The heart behind <em className="text-wine">every post.</em></h2>
            <p className="mx-auto mt-4 max-w-lg leading-7 text-plum/70">Everything written here comes from one of these four places, and is meant to bring you back to yourself.</p>
            <div className="mt-12 grid gap-8 text-left sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v) => (
                <div key={v.name}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ivory">
                    <Image src={v.image} alt={v.name} fill className="object-cover" />
                  </div>
                  <p className="mt-4 font-display text-xl">{v.name}</p>
                  <p className="mt-2 text-sm leading-6 text-plum/65">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="shell grid gap-12 py-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">My mission</p>
            <h2 className="mt-3 text-4xl leading-[1.1]">To inspire, encourage, and <em className="text-wine">empower</em> you.</h2>
            <p className="mt-5 leading-7 text-plum/70">My mission is simple, to be the voice of encouragement that says you are not too late, you are not too far behind, and you are not doing this alone. Every post is written with the intention of helping you feel a little more seen and a little more capable of the life you are building.</p>
            <p className="mt-4 leading-7 text-plum/70">Nette&apos;s Corner will also grow alongside you. The shop carries curated pieces that reflect this journey, things that carry meaning, not just a price tag.</p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[{ n: '14+', l: 'Published posts' }, { n: '2022', l: 'Year started' }, { n: '∞', l: 'More to come' }].map((s) => (
                <div key={s.l} className="rounded-2xl bg-cream px-4 py-5 text-center">
                  <p className="font-display text-2xl text-wine">{s.n}</p>
                  <p className="mt-1 text-xs text-plum/60">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-blush/45">
            <Image src="/images/NettesCorner.png" alt="Nette's Corner" fill className="object-cover" />
          </div>
        </section>

        <section className="bg-wine px-5 py-16 text-center text-ivory" id="newsletter">
          <p className="eyebrow !text-blush">A little love</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-4xl">Let&apos;s grow <em>together.</em></h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ivory/75">Join the community and get new posts, words of encouragement, and updates straight to your inbox. No spam, just genuine words when you need them most.</p>
          <form className="mx-auto mt-6 flex max-w-md">
            <input className="min-w-0 flex-1 rounded-l-full border-0 px-5 text-sm text-plum" placeholder="Your email address" aria-label="Email address" />
            <button className="rounded-r-full bg-blush px-6 text-sm font-semibold text-plum" type="button">Join us</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
