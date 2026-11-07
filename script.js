/* Renders the whole site from window.SITE_CONTENT (content.js).
   Open the site with ?edit at the end of the address (or click "Edit this page") to edit it in place. */

(function () {
  const ICONS = {
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z"/></svg>',
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 7.2L4 7.3V17h16V7.3l-8 4.9ZM5.4 7l6.6 4 6.6-4H5.4Z"/></svg>'
  };
  // Line icons: medicine and the business of health. Decorative only (hidden from screen readers).
  const svg = (inner) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;
  const VIS = {
    steth: svg('<path d="M5 3H4v5a4 4 0 0 0 8 0V3h-1"/><path d="M8 12v2.5a5.5 5.5 0 0 0 11 0V13"/><circle cx="19" cy="11" r="2"/>'),
    clinic: svg('<path d="M4 21V9l8-5 8 5v12"/><path d="M2.5 21h19"/><path d="M12 10v6M9 13h6"/>'),
    pulse: svg('<path d="M2 12h4l2-5 4 10 2.5-6 1.5 3h6"/>'),
    chart: svg('<path d="M4 4v16h16"/><path d="M8 16v-3M12 16V9M16 16v-5"/><path d="M7.5 9.5 11 6l3 2.5L19 4"/>'),
    trend: svg('<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>'),
    users: svg('<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 4.8a3.2 3.2 0 0 1 0 6.4M21 20a6 6 0 0 0-3.5-5.5"/>'),
    scale: svg('<path d="M12 3v17M6 20h12M4 7h16"/><path d="m7 7-3 7a3 3 0 0 0 6 0zM17 7l-3 7a3 3 0 0 0 6 0z"/>'),
    coin: svg('<circle cx="12" cy="12" r="9"/><path d="M14.8 9.3c-.5-.9-1.5-1.3-2.8-1.3-1.6 0-2.8.8-2.8 1.9s1.2 1.6 2.8 1.9 2.8.9 2.8 2.1-1.2 1.9-2.8 1.9c-1.4 0-2.4-.5-2.9-1.4M12 6.5V8M12 16v1.5"/>'),
    microscope: svg('<path d="M6 21h12M9 17h6"/><path d="m8.5 3.5 3 1.7-3.2 5.6-3-1.7z"/><path d="M11.5 9.5a5.5 5.5 0 0 1 1.5 9.8M10 11.5l1.5.9"/>'),
    cap: svg('<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6"/>'),
    sliders: svg('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),
    mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>'),
    network: svg('<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="M10.8 7.3 6.2 15.7M13.2 7.3l4.6 8.4M7.5 18h9"/>'),
    monitor: svg('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/><path d="M6 10h3l1.5-3 3 6 1.5-3h3"/>'),
    tag: svg('<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="7.5" r="1.5"/>'),
    buildings: svg('<path d="M3 21V9l5-3 5 3v12M13 21v-9l4-2 4 2v9M2 21h20"/><path d="M8 12h.01M8 16h.01M17 15h.01"/>'),
    pill: svg('<rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="M12 8.5v7" transform="rotate(-45 12 12)"/>'),
    briefcase: svg('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>'),
    phone: svg('<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/><path d="M9.5 9h1.5l1-2 1.5 4 1-2h1"/>'),
    spark: svg('<path d="m12 3 2 5.5 5.5 1.5L14 12l-2 5.5-2-5.5-5.5-2L10 8.5z"/><path d="M19 15v4M17 17h4"/>'),
    flask: svg('<path d="M9 3h6M10 3v6l-5.5 9.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7.2 15h9.6"/>'),
    flag: svg('<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>'),
    percent: svg('<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>')
  };
  const ico = (name, cls = "ico") => (VIS[name] ? `<span class="${cls}" aria-hidden="true">${VIS[name]}</span>` : "");
  // Choose an icon from keywords in a piece of text (first rule that matches wins).
  const pick = (text, rules, fallback = "") => { const t = String(text || ""); for (const [re, name] of rules) if (re.test(t)) return name; return fallback; };
  const SEC_ICONS = { about: "steth", harme: "clinic", projects: "chart", experience: "pulse", research: "microscope", education: "cap", skills: "sliders", contact: "mail" };
  const STAT_RULES = [[/margin/i, "percent"], [/visit|patient/i, "pulse"], [/staff/i, "users"], [/\bsites?\b/i, "buildings"], [/revenue|growth/i, "trend"], [/NPV|valuation/i, "coin"], [/cost|Medicare|QALY|model/i, "scale"]];
  const HIGHLIGHT_RULES = [[/referral/i, "network"], [/EHR|record/i, "monitor"], [/pric|P&L/i, "tag"], [/scal|site/i, "buildings"]];
  const PROJECT_RULES = [[/BlueHealer|HEOR|value/i, "scale"], [/Gilead|Market Access/i, "pill"], [/Midwest|acquisition|Semifinal/i, "briefcase"], [/Avinah|digital|Venture/i, "phone"], [/Pro Bono|WELI/i, "users"], [/GlowMatch|Product/i, "spark"]];
  const EXP_RULES = [[/Founder/i, "clinic"], [/Hospital|Emergency/i, "pulse"], [/Practitioner|Clinic/i, "steth"]];
  const CARD_RULES = [[/leader/i, "flag"], [/nutrition|thesis|child/i, "microscope"], [/quant|training|statist/i, "chart"]];
  const SKILL_RULES = [[/\bAI\b/, "spark"], [/tool/i, "chart"], [/method/i, "flask"], [/leader/i, "flag"]];
  // A heartbeat that turns into a rising growth line: medicine into the business of health.
  const PULSE_TO_GROWTH = `<svg class="pulse-art" viewBox="0 0 1000 72" aria-hidden="true" focusable="false">
      <defs><linearGradient id="pulseFade" x1="0" x2="1"><stop offset="0" stop-color="#0a2a6b" stop-opacity="0"/><stop offset=".25" stop-color="#0a2a6b" stop-opacity=".55"/><stop offset="1" stop-color="#0a2a6b"/></linearGradient></defs>
      <g class="pulse-bars"><rect x="590" y="56" width="20" height="12" rx="3"/><rect x="670" y="52" width="20" height="16" rx="3"/><rect x="750" y="44" width="20" height="24" rx="3"/><rect x="830" y="36" width="20" height="32" rx="3"/></g>
      <path class="pulse-ecg" pathLength="1" d="M0 46H330h12l6-10 6 10h10l8-34 10 56 8-22h14l6-6 6 6h104" stroke="url(#pulseFade)"/>
      <path class="pulse-growth" pathLength="1" d="M520 46 600 40l80 2 80-12 80-6 80-12M905.3 8.2 920 12l-12.9 8"/>
      <g class="pulse-dots"><circle cx="600" cy="40" r="4"/><circle cx="680" cy="42" r="4"/><circle cx="760" cy="30" r="4"/><circle cx="840" cy="24" r="4"/></g>
    </svg>`;
  const SECTIONS = ["about", "harme", "projects","experience", "research", "education", "skills", "contact"];
  // Edit mode only works on your own computer, never on the published site.
  const LOCAL = location.protocol === "file:" || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  const EDIT = LOCAL && new URLSearchParams(location.search).has("edit");
  window.__EDIT_MODE = EDIT;

  /* ---------- helpers ---------- */
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const has = (s) => s != null && String(s).trim() !== "";
  const arr = (a) => (Array.isArray(a) ? a : []);
  const ext = (url) => (/^https?:/i.test(url || "") ? ' target="_blank" rel="noopener"' : "");
  const shown = (sec) => sec && (EDIT || sec.show !== false);
  const telHref = (p) => "tel:" + String(p).replace(/[^\d+]/g, "").replace(/^(\d{10})$/, "+1$1");

  // Editable text element. In view mode empty values render nothing; in edit mode they show a placeholder.
  function T(tag, path, value, cls = "", ph = "Add text") {
    if (!has(value) && !EDIT) return "";
    const a = EDIT ? ` data-edit="${path}" data-ph="${esc(ph)}"` : "";
    return `<${tag}${cls ? ` class="${cls}"` : ""}${a}>${esc(value)}</${tag}>`;
  }
  // Attributes for an entry (object or string) inside a list.
  function entry(path, item, cls = "") {
    const hidden = item && typeof item === "object" && item.show === false;
    const c = [cls, hidden ? "ed-hidden" : ""].filter(Boolean).join(" ");
    return `${c ? ` class="${c}"` : ""}${EDIT ? ` data-entry="${path}"` : ""}`;
  }
  const listAttr = (path, label) => (EDIT ? ` data-list="${path}" data-add="${esc(label)}"` : "");
  // Items to show: in edit mode everything (hidden ones dimmed), otherwise only visible ones.
  const items = (a) => arr(a).map((it, i) => ({ it, i })).filter(({ it }) => EDIT || !(it && typeof it === "object" && it.show === false));
  // A list of plain strings (paragraphs, bullets, tags).
  function strList(tag, itemTag, path, a, cls, addLabel) {
    const list = arr(a);
    const filled = list.filter(has);
    if (!filled.length && !EDIT) return "";
    const kids = list.map((v, i) => (EDIT ? `<${itemTag}${entry(path + "." + i, v)} data-edit="${path}.${i}" data-ph="Type here">${esc(v)}</${itemTag}>` : has(v) ? `<${itemTag}>${esc(v)}</${itemTag}>` : "")).join("");
    return `<${tag}${cls ? ` class="${cls}"` : ""}${listAttr(path, addLabel)}>${kids}</${tag}>`;
  }
  const img = (path, src, alt, extra = "") => `<img src="${esc(src)}" alt="${esc(alt)}"${EDIT ? ` data-img="${path}"` : ""} ${extra}/>`;

  function sectionOpen(key, cls) {
    const hidden = window.SITE_CONTENT[key] && window.SITE_CONTENT[key].show === false;
    return `<section id="${key}" class="${cls}${hidden ? " ed-hidden" : ""}"${EDIT ? ` data-section="${key}"` : ""}>`;
  }
  const head = (key, labelField, label, title) => `<div class="label-row">${ico(SEC_ICONS[key], "sec-ico")}${T("p", key + "." + labelField, label, "section-label", "Section label")}</div>${T("h2", key + ".title", title, "", "Section title")}`;

  /* ---------- Side menu ---------- */
  function renderSidebar(c) {
    const p = c.profile || {};
    const links = SECTIONS.filter((k) => c[k] && c[k].show !== false).map((k) => `<a href="#${k}" data-section-link="${k}">${esc(c[k].menuLabel || k)}</a>`).join("");
    return `
      <div class="side-handle" aria-hidden="true"><span></span><span></span><span></span><em>Menu</em></div>
      <a href="#top" class="side-id">
        ${has(p.photo) ? `<img src="${esc(p.photo)}" alt="" class="side-photo" />` : ""}
        <span class="side-name">${esc(p.name)}${has(p.credential) ? `, ${esc(p.credential)}` : ""}</span>
      </a>
      <nav class="side-nav" aria-label="Sections"><a href="#top" data-section-link="top">Home</a>${links}</nav>
      <div class="side-foot">
        ${has(p.resumeFile) ? `<a class="btn btn-side" href="${esc(p.resumeFile)}" download>Download resume</a>` : ""}
        <div class="side-social">
          ${has(p.linkedin) ? `<a href="${esc(p.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICONS.linkedin}</a>` : ""}
          ${has(p.github) ? `<a href="${esc(p.github)}" target="_blank" rel="noopener" aria-label="GitHub">${ICONS.github}</a>` : ""}
          ${has(p.email) ? `<a href="mailto:${esc(p.email)}" aria-label="Email">${ICONS.mail}</a>` : ""}
        </div>
      </div>`;
  }

  /* ---------- Hero ---------- */
  function renderHero(c) {
    const p = c.profile || {};
    return `
    <section class="hero" id="top"${EDIT ? ' data-section="profile"' : ""}>
      <div class="container">
        <div class="hero-grid">
          <div class="hero-text">
            ${T("p", "profile.eyebrow", p.eyebrow, "eyebrow", "Small line above your name")}
            <h1><span${EDIT ? ' data-edit="profile.name" data-ph="Your name"' : ""}>${esc(p.name)}</span>${has(p.credential) || EDIT ? `, <span class="accent"${EDIT ? ' data-edit="profile.credential" data-ph="MD"' : ""}>${esc(p.credential)}</span>` : ""}</h1>
            ${T("p", "profile.intro", p.intro, "lede", "Intro paragraph")}
            ${arr(p.seeking).length || EDIT ? `<div class="seeking">${T("p", "profile.seekingLabel", p.seekingLabel, "seeking-label", "Text before your target roles")}${strList("ul", "li", "profile.seeking", p.seeking, "chips", "+ Add role")}</div>` : ""}
            <div class="hero-actions">
              ${has(p.resumeFile) ? `<a href="${esc(p.resumeFile)}" class="btn btn-primary" download>Download resume</a>` : ""}
              ${c.contact && c.contact.show !== false ? `<a href="#contact" class="btn btn-ghost">Get in touch</a>` : ""}
            </div>
          </div>
          ${has(p.photo) || EDIT ? `<figure class="hero-photo">${img("profile.photo", p.photo, p.photoAlt)}${ico("steth", "hero-chip hc-med")}${ico("trend", "hero-chip hc-biz")}</figure>` : ""}
        </div>
        <div class="hero-pulse">${PULSE_TO_GROWTH}</div>
        ${items(c.stats).length || EDIT ? `<ul class="stats"${listAttr("stats", "+ Add number")}>${items(c.stats).map(({ it, i }) => `<li${entry("stats." + i, it)}>${ico(pick(it.label, STAT_RULES), "stat-ico")}${T("strong", `stats.${i}.value`, it.value, "", "Number")}${T("span", `stats.${i}.label`, it.label, "", "What it means")}</li>`).join("")}</ul>` : ""}
      </div>
    </section>`;
  }

  /* ---------- Sections ---------- */
  function renderAbout(s) {
    return `${sectionOpen("about", "section")}
      <div class="container grid-2">
        <div>${head("about", "menuLabel", s.menuLabel, s.title)}</div>
        <div class="prose">
          ${strList("div", "p", "about.paragraphs", s.paragraphs, "paras", "+ Add paragraph")}
          ${T("p", "about.note", s.note, "muted", "Small note (e.g. languages)")}
        </div>
      </div>
    </section>`;
  }

  const hasSamples = (pr) => { const sm = pr.samples || {}; return arr(sm.slides).length > 0 || arr(sm.keyNumbers).length > 0; };

  function renderProjectCard(pr, i) {
    const P = "projects.items." + i;
    const w = pr.website || {};
    const linkItems = items(pr.links).filter(({ it }) => EDIT || (has(it.label) && has(it.url)));
    const links = linkItems.map(({ it, i: j }) => `<a class="card-link" href="${esc(it.url || "#")}"${ext(it.url)}${entry(`${P}.links.${j}`, it)}><span${EDIT ? ` data-edit="${P}.links.${j}.label" data-ph="Link text"` : ""}>${esc(it.label)}</span></a>`).join("");
    const sampleLink = hasSamples(pr) ? `<a class="card-link" href="#samples-${i}">${esc((pr.samples && pr.samples.linkLabel) || "See the work samples ↓")}</a>` : "";
    return `
      <article${entry(P, pr, "card" + (pr.ongoing ? " card-venture" : "") + (pr.compact ? " card-compact" : ""))}>
        ${ico(pick(pr.title + " " + pr.tag, PROJECT_RULES, "chart"), "card-ico")}
        <div class="card-top">
          ${has(pr.tag) || EDIT ? `<span class="tag${pr.ongoing ? " tag-live" : ""}">${pr.ongoing ? '<span class="dot"></span>' : ""}<span${EDIT ? ` data-edit="${P}.tag" data-ph="Tag"` : ""}>${esc(pr.tag)}</span></span>` : "<span></span>"}
          ${T("span", P + ".date", pr.date, "card-date", "Dates")}
        </div>
        ${T("h3", P + ".title", pr.title, "", "Project title")}
        ${T("p", P + ".role", pr.role, "tl-role card-role", "Your role (optional)")}
        ${T("p", P + ".subtitle", pr.subtitle, "card-client", "Client · course (optional)")}
        ${strList("div", "p", P + ".paragraphs", pr.paragraphs, "paras", "+ Add paragraph")}
        ${has(w.screenshot) && !pr.compact ? `
        <a class="site-preview" href="${esc(w.url || "#")}"${ext(w.url)}>
          <span class="browser-bar"><i></i><i></i><i></i><span class="browser-url">${esc(w.label || w.url)}</span></span>
          ${img(P + ".website.screenshot", w.screenshot, w.alt, 'loading="lazy" ')}
        </a>` : ""}
        ${pr.compact && !EDIT ? "" : strList("ul", "li", P + ".chips", pr.chips, "chips", "+ Add tag")}
        <div class="card-links"${listAttr(P + ".links", "+ Add link")}>${links}${sampleLink}</div>
      </article>`;
  }

  function renderSamples(pr, i) {
    const P = `projects.items.${i}.samples`;
    const sm = pr.samples || {};
    return `
      <div id="samples-${i}" class="samples${pr.show === false ? " ed-hidden" : ""}">
        <div class="samples-head">
          ${T("h3", P + ".title", sm.title || (EDIT ? "" : "Work samples: " + pr.title), "", "Work samples: " + pr.title + " (gallery title)")}
          ${T("p", P + ".note", sm.note, "muted", "Short note about these samples (optional)")}
          ${EDIT ? `<p class="muted ed-hint">Wording of the “see the slides” link on this project’s card (optional, only you see this note): <span data-edit="${P}.linkLabel" data-ph="See the work samples ↓">${esc(sm.linkLabel)}</span></p>` : ""}
        </div>
        ${items(sm.keyNumbers).length || EDIT ? `<div class="model-findings"${listAttr(P + ".keyNumbers", "+ Add key number")}>${items(sm.keyNumbers).map(({ it, i: j }) => `<div${entry(`${P}.keyNumbers.${j}`, it, "mf-stat")}>${T("strong", `${P}.keyNumbers.${j}.value`, it.value, "", "Number")}${T("span", `${P}.keyNumbers.${j}.label`, it.label, "", "What it means")}</div>`).join("")}</div>` : ""}
        ${items(sm.slides).length || EDIT ? `<div class="samples-grid${arr(sm.slides).length === 1 ? " samples-grid-one" : ""}"${listAttr(P + ".slides", "+ Add slide or image")}>${items(sm.slides).map(({ it, i: j }) => `
          <figure${entry(`${P}.slides.${j}`, it, "sample")}>
            <button type="button" class="sample-open" data-full="${esc(it.image)}" data-caption="${esc(it.caption || it.title)}">${img(`${P}.slides.${j}.image`, it.image, it.alt || it.title, 'loading="lazy" ')}</button>
            <figcaption>${T("strong", `${P}.slides.${j}.title`, it.title, "", "Slide title")}${T("span", `${P}.slides.${j}.subtitle`, it.subtitle, "", "Subtitle")}</figcaption>
          </figure>`).join("")}</div>` : ""}
      </div>`;
  }

  function renderProjects(s) {
    const list = items(s.items);
    return `${sectionOpen("projects", "section section-alt")}
      <div class="container">
        ${head("projects", "menuLabel", s.menuLabel, s.title)}
        <div class="cards${list.some(({ it }) => it.compact) ? " cards-featured" : ""}"${listAttr("projects.items", "+ Add project")}>${list.filter(({ it }) => !it.compact).map(({ it, i }) => renderProjectCard(it, i)).join("")}</div>
        ${list.some(({ it }) => it.compact) ? `
        <div class="more-projects">
          ${T("h3", "projects.moreTitle", s.moreTitle, "more-title", "Heading above the smaller cards")}
          <div class="cards cards-compact">${list.filter(({ it }) => it.compact).map(({ it, i }) => renderProjectCard(it, i)).join("")}</div>
        </div>` : ""}
        ${list.filter(({ it }) => hasSamples(it)).map(({ it, i }) => renderSamples(it, i)).join("")}
        ${EDIT ? list.filter(({ it }) => !hasSamples(it)).map(({ it, i }) => `<div class="ed-samples-empty"${listAttr(`projects.items.${i}.samples.slides`, "+ Add work samples (slides or images) for " + (it.title || "this project"))}></div>`).join("") : ""}
      </div>
    </section>`;
  }

  function renderHarme(s) {
    const photos = items(s.photos);
    const lab = items(s.labPhotos);
    const wide = photos.length === 4;
    return `${sectionOpen("harme", "section section-dark")}
      <div class="container">
        <div class="case-head">
          ${has(s.logo) || EDIT ? `<div class="case-logo">${img("harme.logo", s.logo, s.logoAlt)}</div>` : ""}
          <div class="case-head-text">
            ${head("harme", "label", s.label, s.title)}
            ${T("p", "harme.intro", s.intro, "lede case-lede", "Intro paragraph")}
          </div>
        </div>
        ${items(s.stats).length || EDIT ? `<ul class="stats case-stats"${listAttr("harme.stats", "+ Add number")}>${items(s.stats).map(({ it, i }) => `<li${entry("harme.stats." + i, it)}>${ico(pick(it.label, STAT_RULES), "stat-ico")}${T("strong", `harme.stats.${i}.value`, it.value, "", "Number")}${T("span", `harme.stats.${i}.label`, it.label, "", "What it means")}</li>`).join("")}</ul>` : ""}
        ${items(s.highlights).length || EDIT ? `<div class="case-grid"${listAttr("harme.highlights", "+ Add highlight")}>${items(s.highlights).map(({ it, i }, n) => `
          <div${entry("harme.highlights." + i, it, "case-item")}>
            <div class="case-item-top">${ico(pick(it.title + " " + it.text, HIGHLIGHT_RULES), "case-ico")}<span class="case-num">${String(n + 1).padStart(2, "0")}</span></div>
            ${T("h3", `harme.highlights.${i}.title`, it.title, "", "Title")}
            ${T("p", `harme.highlights.${i}.text`, it.text, "", "Text")}
          </div>`).join("")}</div>` : ""}
        <div class="case-gallery">
          ${photos.length || EDIT ? `<div class="case-photos${wide ? " case-photos-wide" : ""}"${listAttr("harme.photos", "+ Add photo")}>${photos.map(({ it, i }, n) => `
            <figure${entry("harme.photos." + i, it, wide && n === 0 ? "photo-lead" : "")}>
              ${img(`harme.photos.${i}.image`, it.image, it.alt || it.caption, 'loading="lazy" ')}
              ${T("figcaption", `harme.photos.${i}.caption`, it.caption, "", "Caption")}
            </figure>`).join("")}</div>` : ""}
          ${lab.length || EDIT ? `<div class="lab-strip"${listAttr("harme.labPhotos", "+ Add small photo")}>
            ${T("span", "harme.labLabel", s.labLabel, "lab-label", "Label")}
            ${lab.map(({ it, i }) => `<button type="button"${entry("harme.labPhotos." + i, it, "sample-open lab-thumb")} data-full="${esc(it.image)}" data-caption="${esc(it.caption)}">${img(`harme.labPhotos.${i}.image`, it.image, it.alt || it.caption, 'loading="lazy" ')}</button>`).join("")}
          </div>` : ""}
        </div>
      </div>
    </section>`;
  }

  function renderExperience(s) {
    return `${sectionOpen("experience", "section")}
      <div class="container">
        ${head("experience", "menuLabel", s.menuLabel, s.title)}
        <ol class="timeline"${listAttr("experience.items", "+ Add job")}>${items(s.items).map(({ it: e, i }) => {
          const P = "experience.items." + i;
          return `
          <li${entry(P, e)}>
            <div class="tl-meta">${ico(pick(e.organization + " " + e.role, EXP_RULES), "tl-ico")}${T("span", P + ".dates", e.dates, "tl-date", "Dates")}${T("span", P + ".place", e.place, "tl-place", "Location")}</div>
            <div class="tl-body">
              ${T("h3", P + ".organization", e.organization, "", "Organization")}
              ${T("p", P + ".role", e.role, "tl-role", "Your role")}
              ${strList("ul", "li", P + ".bullets", e.bullets, "", "+ Add bullet")}
              ${items(e.lessons).length || EDIT ? `
              <div class="lessons">
                ${T("p", P + ".lessonsTitle", e.lessonsTitle, "lessons-label", "Lessons box title (optional)")}
                <ol${listAttr(P + ".lessons", "+ Add lesson")}>${items(e.lessons).map(({ it: l, i: j }) => `<li${entry(`${P}.lessons.${j}`, l)}>${T("strong", `${P}.lessons.${j}.title`, l.title, "", "Lesson")} ${T("span", `${P}.lessons.${j}.text`, l.text, "", "Explanation")}</li>`).join("")}</ol>
              </div>` : ""}
              ${e.link && (has(e.link.label) || EDIT) ? `<a class="card-link" href="${esc(e.link.url || "#")}"${ext(e.link.url)}><span${EDIT ? ` data-edit="${P}.link.label" data-ph="Link text (optional)"` : ""}>${esc(e.link.label)}</span></a>` : ""}
            </div>
          </li>`;
        }).join("")}</ol>
      </div>
    </section>`;
  }

  function renderCards(key, s, alt, headKey, subKey, addLabel) {
    return `${sectionOpen(key, "section" + (alt ? " section-alt" : ""))}
      <div class="container">
        ${head(key, "menuLabel", s.menuLabel, s.title)}
        <div class="grid-2 edu"${listAttr(key + ".items", addLabel)}>${items(s.items).map(({ it, i }) => {
          const P = `${key}.items.${i}`;
          return `
          <div${entry(P, it, "edu-item")}>
            ${has(it.logo) ? `<div class="edu-logo">${img(P + ".logo", it.logo, it.logoAlt || it[headKey] + " logo")}</div>` : ico(pick(it[headKey] + " " + it[subKey], CARD_RULES, key === "education" ? "cap" : "chart"), "edu-ico")}
            ${T("h3", `${P}.${headKey}`, it[headKey], "", "Heading")}
            ${T("p", `${P}.${subKey}`, it[subKey], "tl-role", "Subtitle (optional)")}
            ${T("p", `${P}.meta`, it.meta, "muted", "Location · date (optional)")}
            ${strList("ul", "li", P + ".bullets", it.bullets, "", "+ Add bullet")}
          </div>`;
        }).join("")}</div>
      </div>
    </section>`;
  }

  function renderSkills(s) {
    return `${sectionOpen("skills", "section section-alt")}
      <div class="container">
        ${head("skills", "menuLabel", s.menuLabel, s.title)}
        <div class="skills"${listAttr("skills.groups", "+ Add skill group")}>${items(s.groups).map(({ it: g, i }) => `
          <div${entry("skills.groups." + i, g, "skill-group")}><div class="skill-head">${ico(pick(g.name, SKILL_RULES), "skill-ico")}${T("h3", `skills.groups.${i}.name`, g.name, "", "Group name")}</div>${strList("ul", "li", `skills.groups.${i}.items`, g.items, "chips", "+ Add skill")}</div>`).join("")}</div>
      </div>
    </section>`;
  }

  function renderContact(s, p) {
    return `${sectionOpen("contact", "section contact")}
      <div class="container">
        ${head("contact", "menuLabel", s.menuLabel, s.title)}
        ${T("p", "contact.text", s.text, "lede", "Short message")}
        <div class="contact-art" aria-hidden="true">${PULSE_TO_GROWTH.replace(/pulseFade/g, "pulseFade2")}</div>
        <div class="hero-actions">
          ${has(p.email) ? `<a href="mailto:${esc(p.email)}" class="btn btn-primary">${esc(p.email)}</a>` : ""}
          ${has(p.phone) ? `<a href="${esc(telHref(p.phone))}" class="btn btn-ghost">${esc(p.phone)}</a>` : ""}
          ${has(p.linkedin) ? `<a href="${esc(p.linkedin)}" target="_blank" rel="noopener" class="btn btn-ghost">LinkedIn</a>` : ""}
          ${has(p.github) ? `<a href="${esc(p.github)}" target="_blank" rel="noopener" class="btn btn-ghost">GitHub</a>` : ""}
          ${has(p.resumeFile) ? `<a href="${esc(p.resumeFile)}" class="btn btn-ghost" download>Resume (PDF)</a>` : ""}
        </div>
        ${EDIT ? '<p class="ed-hint">Email, phone, LinkedIn, GitHub and resume file: use “Profile & links” in the bottom bar.</p>' : ""}
      </div>
    </section>`;
  }

  function renderFooter(p) {
    return `
    <div class="container footer-inner">
      <p>© ${new Date().getFullYear()} ${esc(p.name)}${has(p.location) ? ` · ${esc(p.location)}` : ""}</p>
      <p class="footer-links">
        ${has(p.linkedin) ? `<a href="${esc(p.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>` : ""}
        ${has(p.github) ? `<a href="${esc(p.github)}" target="_blank" rel="noopener">GitHub</a>` : ""}
        ${has(p.email) ? `<a href="mailto:${esc(p.email)}">Email</a>` : ""}
      </p>
    </div>`;
  }

  /* ---------- behaviors ---------- */
  function highlightCurrent() {
    const line = window.innerHeight * 0.35;
    let current = "top";
    document.querySelectorAll("main > section[id]").forEach((s) => { if (s.getBoundingClientRect().top <= line) current = s.id; });
    document.querySelectorAll(".side-nav a").forEach((a) => a.classList.toggle("active", a.dataset.sectionLink === current));
  }
  window.addEventListener("scroll", highlightCurrent, { passive: true });
  window.addEventListener("hashchange", highlightCurrent);

  function render(content) {
    const c = content || {};
    if (content) window.SITE_CONTENT = content;
    const p = c.profile || {};
    document.getElementById("sidebar").innerHTML = renderSidebar(c);
    const parts = [renderHero(c)];
    if (shown(c.about)) parts.push(renderAbout(c.about));
    if (shown(c.harme)) parts.push(renderHarme(c.harme));
    if (shown(c.projects)) parts.push(renderProjects(c.projects));
    if (shown(c.experience)) parts.push(renderExperience(c.experience));
    if (shown(c.research)) parts.push(renderCards("research", c.research, true, "title", "role", "+ Add research entry"));
    if (shown(c.education)) parts.push(renderCards("education", c.education, false, "school", "degree", "+ Add education entry"));
    if (shown(c.skills)) parts.push(renderSkills(c.skills));
    if (shown(c.contact)) parts.push(renderContact(c.contact, p));
    document.getElementById("main").innerHTML = parts.join("");
    document.getElementById("footer").innerHTML = renderFooter(p);
    if (has(p.name)) document.title = `${p.name}${has(p.credential) ? ", " + p.credential : ""} | Portfolio`;
    highlightCurrent();
    if (EDIT && window.__decorateEditor) window.__decorateEditor();
  }

  /* ---------- clicks: lightbox and mobile menu ---------- */
  document.addEventListener("click", (e) => {
    if (e.target.closest(".menu-btn")) { document.body.classList.toggle("menu-open"); return; }
    if (e.target.closest(".side-nav a") || e.target.closest(".menu-scrim")) document.body.classList.remove("menu-open");
    // Let the hover menu close once the mouse leaves (a focused link would keep it open)
    const sideLink = e.target.closest(".sidebar a");
    if (sideLink && !sideLink.hasAttribute("download")) setTimeout(() => sideLink.blur(), 0);
    if (EDIT) return; // in edit mode, clicks edit instead of opening images
    const btn = e.target.closest(".sample-open");
    const lightbox = document.querySelector(".lightbox");
    if (btn && lightbox) {
      const im = lightbox.querySelector("img");
      im.src = btn.dataset.full;
      im.alt = (btn.querySelector("img") || {}).alt || "";
      lightbox.querySelector(".lightbox-caption").textContent = btn.dataset.caption || "";
      lightbox.showModal();
      return;
    }
    if (lightbox && (e.target === lightbox || e.target.closest(".lightbox-close"))) lightbox.close();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") document.body.classList.remove("menu-open"); });
  window.matchMedia("(min-width: 1025px)").addEventListener("change", (m) => { if (m.matches) document.body.classList.remove("menu-open"); });

  window.renderSite = render;
  render(window.SITE_CONTENT);

  // "Edit this page" button: only on your own computer, never on the published site.
  const local = location.protocol === "file:" || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  if (local && !EDIT) {
    const a = document.createElement("a");
    a.href = location.pathname + "?edit";
    a.className = "ed-fab";
    a.textContent = "✎ Edit this page";
    document.body.append(a);
  }
  if (EDIT) {
    const s = document.createElement("script");
    s.src = "edit-mode.js";
    document.body.append(s);
  }
})();
