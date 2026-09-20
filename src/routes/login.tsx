import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn, authClient } from "@/lib/auth/client";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { pageHead } from "@/lib/seo";
import { sendVerificationOtp } from "@/lib/server/otp";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    next: typeof s.next === "string" ? s.next : "/",
    mode: s.mode === "signup" ? "signup" : "signin",
  }),
  head: () =>
    pageHead({
      title: "Sign in",
      description: "Sign in to HiredFrex to save guides, apply, or write as an editor.",
      path: "/login",
      index: false,
    }),
  component: Login,
});

function Login() {
  const { next, mode } = Route.useSearch();
  const [err, setErr] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const signup = mode === "signup";
  const callbackURL = next || "/account";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    const name = String(fd.get("name") || "HiredFrex user");
    try {
      if (signup) {
        const res = await authClient.signUp.email({ email, password, name, callbackURL: "/verify-email" });
        if (res.error) setErr(res.error.message || "Could not create the account.");
        else {
          const mailed = await sendVerificationOtp({ data: { email } });
          if (!mailed.ok) setErr(mailed.error);
          window.location.assign("/verify-email");
        }
      } else {
        const res = await authClient.signIn.email({ email, password, callbackURL });
        if (res.error) setErr(res.error.message || "Could not sign in.");
        else window.location.assign(callbackURL);
      }
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Sign-in failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Page className="max-w-md">
      <Eyebrow>Account</Eyebrow>
      <h1 className="mt-2 font-display text-4xl">{signup ? "Create an account" : "Sign in"}</h1>
      <p className="mt-2 text-sm text-muted">
        Same account for reading, applying, or posting a job. Email sign-up sends a 6-digit
        confirmation code via Resend — never a fee.
      </p>
      <form className="mt-6 grid gap-3" onSubmit={onSubmit}>
        {signup ? (
          <input name="name" required placeholder="Full name" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
        ) : null}
        <input name="email" type="email" required placeholder="Email" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
        <input name="password" type="password" required minLength={8} placeholder="Password (8+ characters)" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
        {err ? <p className="text-sm text-danger">{err}</p> : null}
        <button disabled={pending} className="h-11 rounded-xl bg-navy text-sm font-bold text-white">
          {pending ? "Please wait…" : signup ? "Create account" : "Sign in"}
        </button>
      </form>
      <p className="mt-3 text-sm">
        {signup ? (
          <Link to="/login" search={{ next, mode: "signin" }} className="font-semibold text-navy">
            Already have an account? Sign in
          </Link>
        ) : (
          <Link to="/login" search={{ next, mode: "signup" }} className="font-semibold text-navy">
            Create an account
          </Link>
        )}
      </p>
      <div className="mt-8 border-t border-line pt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-faint">Or continue with</p>
        <div className="mt-3 grid gap-2">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <button
                key={p.providerId}
                type="button"
                onClick={() => signIn(p.providerId, { callbackURL })}
                className="h-11 rounded-xl border border-line bg-surface text-sm font-semibold"
              >
                Continue with {p.label}
              </button>
            ))
          ) : (
            <p className="text-sm text-muted">Social sign-in is disabled in this environment.</p>
          )}
        </div>
      </div>
    </Page>
  );
}
