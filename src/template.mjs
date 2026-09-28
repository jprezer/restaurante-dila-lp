import { resolveTheme } from "./themes.mjs";

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const jsonForHtml = (value) =>
  JSON.stringify(value, null, 2).replaceAll("<", "\\u003c");

const safeUrl = (value = "") => {
  const url = String(value).trim();
  return /^(https?:|mailto:|tel:|\/|#)/i.test(url) ? escapeHtml(url) : "#";
};

const externalAttrs = (url = "") =>
  /^https?:/i.test(url) ? ' target="_blank" rel="noreferrer"' : "";

const safeImagePosition = (value) => {
  const position = String(value ?? "").trim();
  const token = "(?:left|center|right|top|bottom|(?:100|[0-9]{1,2})(?:\\.[0-9]+)?%)";
  return new RegExp(`^${token}(?:\\s+${token})?$`, "i").test(position)
    ? position
    : "58% center";
};

const renderArrow = () => `
  <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20">
    <path d="M4 10h11M10.5 4.5 16 10l-5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
  </svg>`;

const renderTitleLines = (lines, accentLine) =>
  lines
    .map(
      (line, index) =>
        `<span${index === accentLine ? ' class="accent-line"' : ""}>${escapeHtml(line)}</span>`,
    )
    .join("");

const highlightPhrase = (text, phrase) => {
  if (!phrase || !text.includes(phrase)) return escapeHtml(text);
  const [before, after] = text.split(phrase);
  return `${escapeHtml(before)}<strong>${escapeHtml(phrase)}</strong>${escapeHtml(after)}`;
};

const renderServices = (items) =>
  items
    .map(
      (item) => `
        <article class="service-item">
          <div class="service-mark" aria-hidden="true">${renderArrow()}</div>
          <div class="service-copy">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
          </div>
          <p class="service-detail">${escapeHtml(item.detail)}</p>
        </article>`,
    )
    .join("");

const renderGallery = (items = []) =>
  items
    .map(
      (item, index) => `
        <figure class="gallery-item gallery-item-${index + 1}">
          <img src="${safeUrl(item.image)}" alt="${escapeHtml(item.alt)}" width="900" height="1200" loading="lazy" />
          <figcaption>${escapeHtml(item.caption)}</figcaption>
        </figure>`,
    )
    .join("");

const renderReviews = (items) => {
  const [featured, ...rest] = items;
  if (!featured) return "";

  return `
    <article class="review-featured">
      <div class="quote-mark" aria-hidden="true">“</div>
      <blockquote>${escapeHtml(featured.quote)}</blockquote>
      <p>${escapeHtml(featured.author)} <span>${escapeHtml(featured.score)}</span></p>
    </article>
    <div class="review-list">
      ${rest
        .map(
          (review) => `
            <article>
              <blockquote>“${escapeHtml(review.quote)}”</blockquote>
              <p>${escapeHtml(review.author)} <span>${escapeHtml(review.score)}</span></p>
            </article>`,
        )
        .join("")}
    </div>`;
};

const renderThemeVariables = (theme) => `
  :root {
    --color-ink: ${theme.colors.ink};
    --color-ink-soft: ${theme.colors.inkSoft};
    --color-paper: ${theme.colors.paper};
    --color-accent: ${theme.colors.accent};
    --color-accent-strong: ${theme.colors.accentStrong};
    --color-muted-dark: ${theme.colors.mutedOnDark};
    --color-muted-light: ${theme.colors.mutedOnLight};
    --font-display: ${theme.fonts.display};
    --font-body: ${theme.fonts.body};
    --radius-surface: ${theme.shape.radius};
    --radius-button: ${theme.shape.buttonRadius};
  }`;

export function renderPage(config) {
  const theme = resolveTheme(config);
  const canonical = config.seo.canonical;
  const heroImage = new URL(config.hero.image, canonical).href;
  const schema = {
    "@context": "https://schema.org",
    "@type": config.seo.schemaType,
    name: config.brand.name,
    description: config.seo.description,
    url: canonical,
    logo: new URL(config.brand.logo, canonical).href,
    image: heroImage,
    telephone: config.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.location.address.street,
      addressLocality: config.location.address.city,
      addressRegion: config.location.address.region,
      postalCode: config.location.address.postalCode,
      addressCountry: config.location.address.country,
    },
    openingHoursSpecification: config.location.openingHours.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    })),
    sameAs: [config.contact.instagramUrl],
  };
  const faviconLetter = encodeURIComponent(config.brand.shortName.slice(0, 1));
  const accent = encodeURIComponent(theme.colors.accent);
  const ink = encodeURIComponent(theme.colors.ink);

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeHtml(config.seo.description)}" />
    <meta name="keywords" content="${escapeHtml(config.seo.keywords.join(", "))}" />
    <meta name="author" content="${escapeHtml(config.brand.name)}" />
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="${escapeHtml(theme.colors.ink)}" />
    <link rel="canonical" href="${safeUrl(canonical)}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="${escapeHtml(config.seo.locale)}" />
    <meta property="og:site_name" content="${escapeHtml(config.brand.name)}" />
    <meta property="og:title" content="${escapeHtml(config.seo.title)}" />
    <meta property="og:description" content="${escapeHtml(config.seo.description)}" />
    <meta property="og:url" content="${safeUrl(canonical)}" />
    <meta property="og:image" content="${safeUrl(heroImage)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(config.seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(config.seo.description)}" />
    <meta name="twitter:image" content="${safeUrl(heroImage)}" />
    <title>${escapeHtml(config.seo.title)}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="${safeUrl(theme.fonts.google)}" rel="stylesheet" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='10' fill='${accent}'/%3E%3Ctext x='32' y='43' text-anchor='middle' font-family='Arial' font-size='36' font-weight='900' fill='${ink}'%3E${faviconLetter}%3C/text%3E%3C/svg%3E" />
    <link rel="stylesheet" href="/assets/styles.css" />
    <style>${renderThemeVariables(theme)}</style>
    <script type="application/ld+json">${jsonForHtml(schema)}</script>
    <script src="/assets/client.js" defer></script>
  </head>
  <body data-preset="${escapeHtml(config.preset)}">
    <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>

    <div class="announcement">
      <span>${escapeHtml(config.announcement.label)}</span>
      <a href="${safeUrl(config.contact.primaryUrl)}"${externalAttrs(config.contact.primaryUrl)}>
        ${escapeHtml(config.announcement.actionLabel)}${renderArrow()}
      </a>
    </div>

    <header class="site-header" data-header>
      <a class="brand-lockup" href="#inicio" aria-label="${escapeHtml(config.brand.name)}, início">
        <img src="${safeUrl(config.brand.logo)}" alt="${escapeHtml(config.brand.logoAlt)}" width="310" height="164" />
        <span class="brand-name">${escapeHtml(config.brand.name)}</span>
      </a>
      <nav class="desktop-nav" aria-label="Navegação principal">
        ${config.navigation
          .map((item) => `<a href="${safeUrl(item.href)}">${escapeHtml(item.label)}</a>`)
          .join("")}
      </nav>
      <a class="header-cta" href="${safeUrl(config.contact.primaryUrl)}"${externalAttrs(config.contact.primaryUrl)}>
        ${escapeHtml(config.contact.primaryLabel)}
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir menu">
        <span></span><span></span>
      </button>
      <div class="mobile-menu" id="mobile-menu" hidden>
        ${config.navigation
          .map((item) => `<a href="${safeUrl(item.href)}">${escapeHtml(item.label)}</a>`)
          .join("")}
        <a href="${safeUrl(config.contact.primaryUrl)}"${externalAttrs(config.contact.primaryUrl)}>${escapeHtml(config.contact.primaryLabel)}</a>
      </div>
    </header>

    <main id="conteudo">
      <section class="hero" id="inicio" style="--hero-position: ${safeImagePosition(config.hero.imagePosition)}">
        <img class="hero-media" src="${safeUrl(config.hero.image)}" alt="${escapeHtml(config.hero.imageAlt)}" width="1600" height="1067" fetchpriority="high" />
        <div class="hero-shade"></div>
        <div class="hero-content">
          <p class="kicker">${escapeHtml(config.hero.kicker)}</p>
          <h1>${renderTitleLines(config.hero.title, config.hero.accentLine)}</h1>
          <p class="hero-description">${escapeHtml(config.hero.description)}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="${safeUrl(config.contact.primaryUrl)}"${externalAttrs(config.contact.primaryUrl)}>
              ${escapeHtml(config.contact.primaryLabel)}${renderArrow()}
            </a>
            <a class="text-link" href="${safeUrl(config.contact.instagramUrl)}"${externalAttrs(config.contact.instagramUrl)}>
              ${escapeHtml(config.contact.instagramLabel)}
            </a>
          </div>
          <div class="brand-proof"><span>${escapeHtml(config.hero.proofLabel)}</span><strong>${escapeHtml(config.hero.proofValue)}</strong></div>
        </div>
        <a class="scroll-cue" href="#servicos"><span>${escapeHtml(config.hero.scrollLabel)}</span><i aria-hidden="true"></i></a>
      </section>

      <section class="statement section-shell">
        <p class="section-label">${escapeHtml(config.statement.label)}</p>
        <h2>${highlightPhrase(config.statement.text, config.statement.accent)}</h2>
      </section>

      <section class="services section-shell section-dark" id="servicos">
        <div class="section-heading">
          <h2>${escapeHtml(config.services.title)}</h2>
          <p>${escapeHtml(config.services.description)}</p>
        </div>
        <div class="service-list">${renderServices(config.services.items)}</div>
      </section>

${config.gallery?.items?.length ? `
      <section class="gallery section-shell" id="momentos">
        <div class="gallery-heading">
          <p class="section-label">${escapeHtml(config.gallery.label)}</p>
          <h2>${escapeHtml(config.gallery.title)}</h2>
        </div>
        <div class="gallery-grid">${renderGallery(config.gallery.items)}</div>
      </section>` : ""}

      <section class="reviews section-shell" id="avaliacoes">
        <div class="reviews-heading">
          <div>
            <p class="section-label">${escapeHtml(config.reviews.label)}</p>
            <h2>${escapeHtml(config.reviews.title)}</h2>
          </div>
          <div class="rating" aria-label="Nota ${escapeHtml(config.reviews.rating)} de 5">
            <strong>${escapeHtml(config.reviews.rating)}</strong>
            <span aria-hidden="true">★★★★★</span>
            <small>${escapeHtml(config.reviews.total)}</small>
          </div>
        </div>
        <div class="review-layout">${renderReviews(config.reviews.items)}</div>
        <a class="source-link" href="${safeUrl(config.contact.mapsUrl)}"${externalAttrs(config.contact.mapsUrl)}>
          ${escapeHtml(config.reviews.sourceLabel)}${renderArrow()}
        </a>
      </section>

      <section class="visit" id="visite">
        <div class="visit-intro section-shell">
          <div class="visit-copy">
            <p class="kicker">${escapeHtml(config.location.label)}</p>
            <h2>${escapeHtml(config.location.title)}</h2>
            <p>${escapeHtml(config.location.description)}</p>
            <a class="button button-inverse" href="${safeUrl(config.contact.mapsUrl)}"${externalAttrs(config.contact.mapsUrl)}>
              ${escapeHtml(config.location.actionLabel)}${renderArrow()}
            </a>
          </div>
          <div class="visit-details">
            <div>
              <p class="detail-label">Endereço</p>
              <address>${config.location.addressLines.map(escapeHtml).join("<br />")}</address>
            </div>
            <div>
              <p class="detail-label">Horário de funcionamento</p>
              <p class="hours">${config.location.hours.map(escapeHtml).join("<br />")}</p>
            </div>
          </div>
        </div>
        <div class="map-frame">
          <iframe title="Localização de ${escapeHtml(config.brand.name)}" src="${safeUrl(config.location.mapEmbedUrl)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <a href="${safeUrl(config.contact.mapsUrl)}"${externalAttrs(config.contact.mapsUrl)}>Abrir no mapa${renderArrow()}</a>
        </div>
      </section>
    </main>

    <footer class="site-footer section-shell">
      <a class="brand-lockup footer-brand" href="#inicio" aria-label="Voltar ao início">
        <img src="${safeUrl(config.brand.logo)}" alt="" width="310" height="164" loading="lazy" />
      </a>
      <p>${escapeHtml(config.brand.tagline)}</p>
      <div>
        <a href="${safeUrl(config.contact.instagramUrl)}"${externalAttrs(config.contact.instagramUrl)}>${escapeHtml(config.contact.socialLabel)}</a>
        <span aria-hidden="true">·</span>
        <a href="${safeUrl(config.contact.primaryUrl)}"${externalAttrs(config.contact.primaryUrl)}>${escapeHtml(config.contact.footerPrimaryLabel)}</a>
      </div>
      <small>© <span data-year></span> ${escapeHtml(config.brand.name)}</small>
    </footer>
  </body>
</html>`;
}
