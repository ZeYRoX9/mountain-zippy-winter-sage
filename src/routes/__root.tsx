import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppErrorComponent } from "@/lib/error-component";
import { ADSENSE_PUB } from "@/lib/site";
import appCss from "../styles.css?url";

const APP_NAME = "HiredFrex";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "theme-color", content: "#10243f" },
      { name: "google-adsense-account", content: ADSENSE_PUB },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400;7..72,600;7..72,700&family=Newsreader:opsz,wght@6..72,500;6..72,600;6..72,700&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&display=swap",
      },
    ],
  }),
  errorComponent: AppErrorComponent,
  notFoundComponent: () => (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">404</p>
      <h1 className="mt-3 font-display text-4xl text-navy">Page not found</h1>
      <p className="mt-3 text-muted">
        This URL is not a live HiredFrex page. It may have been removed, or the link is out of date.
      </p>
      <a href="/" className="mt-6 inline-block rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-paper">
        Back to home
      </a>
    </div>
  ),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
