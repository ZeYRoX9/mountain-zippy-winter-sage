import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const KEY = "hf-cookie-ok-v2";

export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      setOpen(localStorage.getItem(KEY) !== "1");
    } catch {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/95 p-4 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center">
        <p className="flex-1 text-sm leading-relaxed text-muted">
          HiredFrex uses an essential session cookie if you sign in. If Google AdSense is approved,
          Google and partners may use cookies to serve ads based on prior visits.{" "}
          <Link to="/cookies" className="font-semibold text-navy underline">
            Cookie policy
          </Link>{" "}
          ·{" "}
          <Link to="/privacy" className="font-semibold text-navy underline">
            Privacy
          </Link>
          . You can opt out of personalised ads at{" "}
          <a className="font-semibold text-navy underline" href="https://adssettings.google.com" rel="noreferrer" target="_blank">
            Google Ads Settings
          </a>
          .
        </p>
        <button
          className="h-11 shrink-0 rounded-xl bg-navy px-4 text-sm font-semibold text-paper"
          onClick={() => {
            try {
              localStorage.setItem(KEY, "1");
            } catch {
              /* ignore */
            }
            setOpen(false);
          }}
        >
          Understood
        </button>
      </div>
    </div>
  );
}
