import Image from 'next/image'; import Link from 'next/link'; import { notFound } from 'next/navigation'; import { Header } from '@/components/Header'; import { Footer } from '@/components/Footer'; import { posts, getPostBySlug, getRelatedPosts } from '@/lib/posts';

export function generateStaticParams() { return posts.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} | Nette's Corner`, description: post.excerpt };
}

function getToc(body: string) {
  const matches = [...body.matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>/g)];
  return matches.map((m) => ({ id: m[1], label: m[2] }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();
  const toc = getToc(post.body);
  const related = getRelatedPosts(post.slug, 3);

  return (
    <>
      <Header />
      <main>
        <section className="relative">
          <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
            <Image src={post.image} alt={post.heroTitle} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-plum/80 via-plum/20 to-transparent" />
          </div>
          <div className="shell relative -mt-28 pb-4 text-ivory sm:-mt-36">
            <div className="flex flex-wrap items-center gap-2 text-xs text-ivory/70">
              <Link href="/">Home</Link><span>›</span><Link href="/blog">Blog</Link><span>›</span><span>{post.category}</span>
            </div>
            <p className="eyebrow mt-4 !text-blush">{post.category}</p>
            <h1 className="mt-3 max-w-3xl text-4xl leading-[1.08] sm:text-5xl" dangerouslySetInnerHTML={{ __html: post.heroTitle }} />
            <div className="mt-5 flex flex-wrap gap-3 text-xs">
              <span className="rounded-full bg-ivory/15 px-3 py-1.5 backdrop-blur">By Nette</span>
              <span className="rounded-full bg-ivory/15 px-3 py-1.5 backdrop-blur">{post.date}</span>
              <span className="rounded-full bg-ivory/15 px-3 py-1.5 backdrop-blur">{post.readTime}</span>
            </div>
          </div>
        </section>

        <section className="shell grid gap-12 py-14 lg:grid-cols-[1fr_300px]">
          <article>
            <div className="article-body" dangerouslySetInnerHTML={{ __html: post.body }} />
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-plum/70">{t}</span>
              ))}
            </div>
          </article>

          <aside className="space-y-8">
            {toc.length > 0 && (
              <div className="rounded-2xl bg-cream p-6">
                <p className="eyebrow">In this post</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {toc.map((t) => (
                    <li key={t.id}><a href={`#${t.id}`} className="leading-5 text-plum/75 hover:text-wine">{t.label}</a></li>
                  ))}
                </ul>
              </div>
            )}
            <div className="rounded-2xl bg-plum p-6 text-ivory">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blush font-display text-lg text-plum">N</div>
              <p className="mt-3 font-display text-lg">Nette</p>
              <p className="mt-1.5 text-sm leading-6 text-ivory/75">Writing about growth, faith, and the everyday work of becoming who you&apos;re meant to be.</p>
            </div>
            <div className="rounded-2xl border border-plum/10 p-6">
              <p className="eyebrow">Stay inspired</p>
              <p className="mt-2 text-sm leading-6 text-plum/70">New posts straight to your inbox.</p>
              <form className="mt-4 flex flex-col gap-2">
                <input className="rounded-full border border-plum/20 px-4 py-2.5 text-sm" placeholder="Your email" aria-label="Email address" />
                <button className="btn-primary" type="button">Subscribe</button>
              </form>
            </div>
          </aside>
        </section>

        {related.length > 0 && (
          <section className="bg-cream py-16">
            <div className="shell">
              <div className="flex items-end justify-between">
                <h2 className="text-3xl">More to <em className="text-wine">read.</em></h2>
                <Link href="/blog" className="hidden text-sm font-semibold underline underline-offset-4 sm:block">All posts →</Link>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ivory">
                      <Image src={r.image} alt={r.heroTitle} fill className="object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-wine">{r.category}</p>
                    <p className="mt-1 font-display text-lg leading-snug">{r.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
