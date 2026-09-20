import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { pageHead } from "@/lib/seo";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { confirmVerificationOtp, sendVerificationOtp } from "@/lib/server/otp";

export const Route = createFileRoute("/verify-email")({
  head: () =>
    pageHead({
      title: "Verify email",
      description: "Confirm the email on your HiredFrex account.",
      path: "/verify-email",
      index: false,
    }),
  component: VerifyEmail,
});

function VerifyEmail() {
  const { user, isPending } = useCurrentUserState();
  const [code, setCode] = useState("");
  const [note, setNote] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [pending, setPending] = useState(false);

  if (isPending) {
    return (
      <Page>
        <div className="h-24 animate-pulse rounded-2xl bg-line" />
      </Page>
    );
  }
  if (!user) return <RedirectToSignIn />;

  return (
    <Page className="max-w-md">
      <Eyebrow>Account</Eyebrow>
      <h1 className="mt-2 font-display text-4xl">Check your email</h1>
      <p className="mt-3 text-sm text-muted">
        We send a 6-digit code with Resend. HiredFrex will never ask you to pay for this code, a visa,
        or a job. Codes expire in 10 minutes.
      </p>
      {ok ? (
        <p className="mt-6 text-sm">
          Email confirmed. <Link to="/account" className="font-bold text-navy">Go to your dashboard</Link>
        </p>
      ) : (
        <form
          className="mt-6 grid gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setPending(true);
            setNote(null);
            const res = await confirmVerificationOtp({ data: { code } });
            setPending(false);
            if (res.ok) setOk(true);
            else setNote(res.error);
          }}
        >
          <input
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="6-digit code"
            className="h-11 rounded-xl border border-line bg-surface px-3 tracking-[0.4em] text-sm"
            required
          />
          <button disabled={pending} className="h-11 rounded-xl bg-navy text-sm font-bold text-white">
            {pending ? "Checking…" : "Confirm email"}
          </button>
          <button
            type="button"
            className="text-sm font-semibold text-navy"
            onClick={async () => {
              const res = await sendVerificationOtp({ data: {} });
              if (res.ok && "previewCode" in res && res.previewCode) {
                setNote(`Preview code: ${res.previewCode}. ${res.notice ?? ""}`);
              } else {
                setNote(res.ok ? "A new code is on the way via Resend." : res.error);
              }
            }}
          >
            Send a new code
          </button>
          {note ? <p className="text-sm text-danger">{note}</p> : null}
        </form>
      )}
    </Page>
  );
}
