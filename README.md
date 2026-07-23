# Spline Architect documentation

The public user guide for Spline Architect v6, built with Docusaurus.

## Local checks

```text
npm ci
npm run typecheck
npm run build
npm run serve
```

Pull requests and pushes to `main` build the site without deploying it. To publish a release, switch GitHub Pages to the GitHub Actions source and manually run the **Documentation** workflow from `main` with **Deploy** enabled.

Until the v6 Fab release, the public site uses the preserved pre-v6 MkDocs build from `gh-pages`.

Google Analytics uses the existing GA4 measurement ID, `G-YV8FLGPN35`, through the Docusaurus `gtag` configuration.
