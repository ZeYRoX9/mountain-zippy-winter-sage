import { Link, useRouterState } from "@tanstack/react-router";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { SUPPORT_EMAIL } from "@/lib/site";
import { CookieBanner } from "@/components/layout/cookie-banner";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Insights" },
  { to: "/jobs", label: "Jobs" },
  { to: "/employers", label: "Hire" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

function LogoMark({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2.5">
      <img
        src="/logo-mark.png"
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 rounded-full bg-surface object-contain"
      />
      <span className="min-w-0">
        <span className={`block font-display text-[22px] font-semibold leading-none tracking-tight ${light ? "text-paper" : "text-navy"}`}>
          Hired<span className="text-gold-deep">Frex</span>
        </span>
        <span className={`mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] ${light ? "text-gold" : "text-faint"}`}>
          Read first. Then apply.
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, isPending } = useCurrentUserState();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/92 backdrop-blur-md">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-[4.5rem]">
        <LogoMark />
        <nav aria-label="Primary" className="ml-2 hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <a
                key={item.to}
                href={item.to}
                className={`rounded-lg px-3 py-2 text-[15px] font-semibold ${
                  active ? "bg-gold-soft text-navy" : "text-muted hover:text-navy"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {isPending ? (
            <div className="h-9 w-20 animate-pulse rounded-lg bg-line" />
          ) : user ? (
            <>
              <Link to="/account" className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-muted hover:text-navy sm:inline">
                Account
              </Link>
              <UserButton />
            </>
          ) : (
            <Link
              to="/login"
              search={{ next: "/account", mode: "signin" }}
              className="rounded-lg bg-navy px-3 py-2 text-sm font-semibold text-paper"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
      <nav aria-label="Mobile" className="flex items-center gap-2 overflow-x-auto border-t border-line px-3 py-2 lg:hidden">
        {NAV.map((item) => (
          <a
            key={item.to}
            href={item.to}
            className="min-h-11 shrink-0 rounded-full border border-line bg-surface px-3 py-2 text-sm font-semibold text-navy"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-navy text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <LogoMark light />
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Original career guides for people applying to Gulf and international jobs. A small,
            honestly labelled job board sits on the side. Free to read. Candidates never pay to apply.
          </p>
        </div>
        <FooterCol
          title="Read"
          links={[
            ["/blog", "Career insights"],
            ["/guides", "Guides"],
            ["/authors", "Writers"],
            ["/sitemap", "Sitemap"],
            ["/editorial-standards", "Editorial standards"],
            ["/how-we-verify", "How we review listings"],
          ]}
        />
        <FooterCol
          title="Work"
          links={[
            ["/jobs", "Open jobs"],
            ["/employers", "Employer posting"],
            ["/cv-builder", "CV builder"],
            ["/report", "Report a listing"],
            ["/faq", "FAQ"],
          ]}
        />
        <FooterCol
          title="Trust"
          links={[
            ["/about", "About"],
            ["/contact", "Contact"],
            ["/privacy", "Privacy"],
            ["/terms", "Terms"],
            ["/disclaimer", "Disclaimer"],
            ["/cookies", "Cookies"],
            [`mailto:${SUPPORT_EMAIL}`, SUPPORT_EMAIL],
          ]}
        />
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs leading-relaxed text-white/50">
        © 2026 HiredFrex · build 2026.09.19 · Editorial pages are original. Job listings are
        employer-submitted unless a higher review status is shown. Advertising, if approved, does not
        write our labels.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-[0.14em] text-gold">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-white/75">
        {links.map(([href, label]) => (
          <li key={href}>
            <a href={href} className="hover:text-white">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Page({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <SignedOut>
        <span className="sr-only">Signed out</span>
      </SignedOut>
      <SignedIn>
        <span className="sr-only">Signed in</span>
      </SignedIn>
      <main id="main" className={`mx-auto w-full max-w-6xl flex-1 px-4 py-10 ${className}`}>
        {children}
      </main>
      <SiteFooter />
      <CookieBanner />
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-deep">{children}</div>
  );
}
