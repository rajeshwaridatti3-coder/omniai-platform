# Local verification record

Checks performed while assembling this archive:

- All server-side `.js` files passed `node --check` syntax validation.
- All client-side `.js` and `.jsx` files passed TypeScript's JSX/JavaScript transpile parser.
- Root, server and client package manifests parsed as valid JSON.

A full dependency installation and Vite production build were not completed in the build environment because `npm install` exceeded the available execution window. Run `npm install` and `npm run build` locally after extracting the archive. No third-party API calls were made, so provider authentication, upload, publishing, webhook delivery and Stripe checkout have not been live-tested here.

A successful local syntax check is not a substitute for provider app approval or an end-to-end test using your own developer credentials and connected test accounts.
