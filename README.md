# Credit OS Website

A seven-page marketing website for **Credit OS**, a fintech platform that connects MSMEs, banks and NBFCs. It is built with React, TypeScript and Vite.

This is a front-end design prototype. It has no backend, no real login and no real data. Every figure, lender name and form result is a labelled sample.

## What the platform communicates

- **Financial information services:** Tally data extraction, standardisation, structured statements (balance sheet, profit and loss, cash flow) and customer-authorised sharing for banks and NBFCs.
- **MSME financial health and loan discovery:** reports, insights, loan categories and lender offers for business owners.

## Pages

| Page | Route |
| --- | --- |
| Home | `/` |
| Financial Data Services | `/financial-data-services` |
| MSME Financial Health | `/msme-financial-health` |
| Loan Products | `/loan-products` |
| Lender Offers | `/lender-offers` |
| Partner With Us | `/partner-with-us` |
| Privacy, Consent and Help | `/privacy-and-help` |

All pages share one header and footer.

## Features

- Responsive layout for desktop, tablet and mobile, with a working mobile menu.
- Interactive dashboard preview with Overview, Statements and Lenders tabs.
- Pop-up boxes for Login, Get Started, lender details, loan quick view and enquiries. They close with the ✕ button, the Escape key or a click outside.
- Floating "Talk to us" button and confirmation messages after forms are sent.
- Interactive consent switches on the Privacy page.
- FAQs, charts and statement tables drawn with plain SVG and CSS, so no chart library is needed.
- Visible keyboard focus, and animations switch off for people who prefer reduced motion.

## Requirements

- Node.js 18 or newer (download from https://nodejs.org). Check with `node -v`.
- A code editor such as VS Code.

## Getting started

1. Unzip the project and open the folder in VS Code.
2. Open the terminal in VS Code (Terminal menu, then New Terminal).
3. Install the libraries (needed only once):

   ```
   npm install
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Open the address it prints, usually http://localhost:5173. The page refreshes when you save a file.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Checks the TypeScript and creates the production files in `dist/` |
| `npm run preview` | Serves the built `dist/` folder so you can test it locally |

## Project structure

```
credit-os-website/
├── index.html          Page shell and Google Fonts link
├── package.json        Libraries and commands
├── tsconfig.json       TypeScript settings
├── vite.config.ts      Vite settings
└── src/
    ├── main.tsx        Starts the app with the router
    ├── App.tsx         The seven routes
    ├── paths.ts        Route paths used by buttons and links
    ├── pages/          One file per page: Home, Services, Health, Loans, Offers, Partner, Privacy
    ├── components.tsx  Header, footer, pop-up boxes and reusable blocks
    └── styles.css      Colours, fonts, spacing and all styling
```

## How to make common changes

- **Change page text:** edit the file for that page in `src/pages/` (`Home.tsx`, `Services.tsx`, `Health.tsx`, `Loans.tsx`, `Offers.tsx`, `Partner.tsx`, `Privacy.tsx`).
- **Change colours:** edit the variables at the top of `src/styles.css`. Changing `--wine` recolours buttons, links and accents across the whole site.
- **Change navigation:** edit `ROUTES` in `src/components.tsx` and the matching routes in `src/App.tsx`.
- **Add a new page:** create a new file in `src/pages/`, add a `<Route>` in `App.tsx`, then add a link in `ROUTES`.
- **Change the pop-up boxes:** edit the `Modal` function in `src/components.tsx`.

## Design system

- **Primary:** rose-wine `#8E2A4D`
- **Secondary:** graphite blue `#2B3A4F` and ink `#18212F`
- **Accent:** pewter `#B8C2CF`
- **Neutrals:** cool grey-white `#F6F7F9`, white cards and light grey borders
- **Fonts:** Bricolage Grotesque for headings and Instrument Sans for body text, loaded from Google Fonts

## Placeholders to replace before launch

- Login is not connected to any account system.
- Forms show a thank-you message but do not send data anywhere.
- All financial figures, lender names and logos are samples.
- `[SUPPORT EMAIL]`, the Privacy Policy and the Terms and Conditions text on the Privacy page are placeholders.
- No interest rates, approvals, certifications or partnerships are claimed, so add real ones only when they are verified.

## Deploying

Run `npm run build` and upload the `dist/` folder to any static host. Because the site uses page routes, set the host to send all unknown paths to `index.html` (often called "SPA fallback" or "rewrite all to index").

## Troubleshooting

- **`npm` is not recognised:** install Node.js, then close and reopen VS Code.
- **Port already in use:** the dev server picks the next free port and prints it.
- **Fonts look different offline:** the fonts load from Google Fonts, so a fallback font is used without internet.
