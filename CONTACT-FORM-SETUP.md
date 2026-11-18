# Contact form activation

The form sends directly from the visitor's browser to FormSubmit. No account, dashboard, server or access key is required. Recipient: sanskriti04545@gmail.com, as approved by the site owner. No real submission or activation email has been triggered during this review.

## After review and deployment approval

1. Submit one clearly labeled test from the real production contact page. The first submission triggers a confirmation email to sanskriti04545@gmail.com. The client must click the service's confirmation link. Activation can be tied to the referring website, so test on the final production domain, not only localhost or the Vercel preview.
2. Confirm receipt in the client's inbox (also check spam) and verify Reply targets the visitor's submitted email. Until that is confirmed, do not describe delivery as tested. An API success only confirms acceptance for processing, not inbox arrival. Repeat the labeled test after activation if needed, with permission.
3. FormSubmit sends a random public recipient alias after email confirmation. To avoid exposing the raw address in the form endpoint, set `NEXT_PUBLIC_FORMSUBMIT_RECIPIENT` to that alias in `.env.local` and the production hosting environment, then rebuild/redeploy. This is optional: the default address works for initial activation. Do not use a private archive API key. Existing visible contact-email links elsewhere on the site remain unchanged.

The free form service does not require signup. Its default spam controls remain enabled and a hidden honeypot is included. Visitor details are processed by FormSubmit. The site owner requested no provider disclosure beside the send button. No CC, autoresponse, analytics or additional recipient is configured.

The form uses loading, accepted-for-processing and error states. It does not claim inbox delivery. Failed, invalid, non-JSON or timed-out responses retain fields; there is no automatic retry. Duplicate submits are blocked while a request is pending. On an ambiguous timeout, ask the visitor to contact Sanskriti before submitting again.

Verified locally: mocked success/failure/network/duplicate/bot cases, production build, tests and responsive layout. Not verified: actual service acceptance, production-domain acceptance, activation email, recipient inbox receipt or alias.

Sources checked November 18, 2026:
- https://formsubmit.co/
- https://formsubmit.co/documentation
- https://formsubmit.co/ajax-documentation
- https://formsubmit.co/help
