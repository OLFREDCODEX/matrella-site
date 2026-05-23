(function () {
  const GA_ID = "G-FL9Z4EHSEL";
  const STORAGE_KEY = "matrella_cookie_consent_v1";
  const isEnglish = document.documentElement.lang && document.documentElement.lang.toLowerCase().startsWith("en");

  const copy = isEnglish
    ? {
        title: "Privacy preferences",
        text: "This site uses only technical storage by default. With your consent, Google Analytics is used to understand aggregate visits and improve the site.",
        necessary: "Necessary technical functions",
        necessaryText: "Always active. They keep the site working and remember your privacy choice.",
        analytics: "Analytics",
        analyticsText: "Optional. Anonymous aggregate statistics via Google Analytics, with IP anonymization.",
        save: "Save preferences",
        accept: "Accept analytics",
        reject: "Reject",
        manage: "Cookie settings",
        info: "Privacy and data notice",
        link: "/en/transparency.html"
      }
    : {
        title: "Preferenze privacy",
        text: "Questo sito usa solo funzioni tecniche di base. Con il tuo consenso, Google Analytics viene usato per statistiche aggregate e per migliorare il sito.",
        necessary: "Funzioni tecniche necessarie",
        necessaryText: "Sempre attive. Servono al funzionamento del sito e a ricordare la tua scelta privacy.",
        analytics: "Analytics",
        analyticsText: "Facoltativo. Statistiche aggregate anonime tramite Google Analytics, con IP anonimizzato.",
        save: "Salva preferenze",
        accept: "Accetta analytics",
        reject: "Rifiuta",
        manage: "Impostazioni cookie",
        info: "Informativa dati e privacy",
        link: "/trasparenza.html"
      };

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    const command = arguments[0];
    const canTrack = getConsent().analytics === true;
    if (command === "consent" || canTrack) {
      window.dataLayer.push(arguments);
    }
  };

  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });

  let analyticsLoaded = false;

  function getConsent() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "accepted") return { necessary: true, analytics: true };
    if (raw === "rejected") return { necessary: true, analytics: false };

    try {
      const parsed = JSON.parse(raw || "{}");
      return {
        necessary: true,
        analytics: parsed.analytics === true
      };
    } catch (error) {
      return { necessary: true, analytics: false };
    }
  }

  function saveConsent(analytics) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      necessary: true,
      analytics: analytics === true,
      updatedAt: new Date().toISOString()
    }));
  }

  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;

    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.appendChild(script);

    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });
  }

  function denyAnalytics() {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
  }

  function injectStyles() {
    if (document.getElementById("mg-cookie-style")) return;

    const style = document.createElement("style");
    style.id = "mg-cookie-style";
    style.textContent = `
      .mg-cookie-banner {
        position: fixed;
        left: 18px;
        right: 18px;
        bottom: 18px;
        z-index: 9999;
        max-width: 760px;
        margin: 0 auto;
        padding: 18px;
        border: 1px solid rgba(42, 91, 132, 0.22);
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.97);
        box-shadow: 0 18px 46px rgba(31, 41, 51, 0.18);
        color: #1f2933;
        font-family: inherit;
      }

      .mg-cookie-banner h2 {
        margin: 0 0 8px;
        font-size: 1rem;
        line-height: 1.25;
      }

      .mg-cookie-banner p {
        margin: 0;
        color: #516173;
        font-size: 0.92rem;
        line-height: 1.55;
      }

      .mg-cookie-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
        margin-top: 14px;
      }

      .mg-cookie-actions button,
      .mg-cookie-manage {
        border: 1px solid #2a5b84;
        border-radius: 999px;
        padding: 10px 14px;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
      }

      .mg-cookie-accept {
        background: #2a5b84;
        color: #ffffff;
      }

      .mg-cookie-save {
        background: #1f2933;
        color: #ffffff;
        border-color: #1f2933;
      }

      .mg-cookie-reject,
      .mg-cookie-manage {
        background: #ffffff;
        color: #2a5b84;
      }

      .mg-cookie-link {
        color: #2a5b84;
        font-weight: 700;
        text-decoration: none;
      }

      .mg-cookie-link:hover {
        text-decoration: underline;
      }

      .mg-cookie-preferences {
        display: grid;
        gap: 10px;
        margin-top: 14px;
      }

      .mg-cookie-row {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 10px;
        align-items: center;
        padding: 12px;
        border: 1px solid rgba(42, 91, 132, 0.16);
        border-radius: 12px;
        background: #f8fafc;
      }

      .mg-cookie-row strong {
        display: block;
        margin-bottom: 2px;
        color: #1f2933;
      }

      .mg-cookie-row small {
        display: block;
        color: #516173;
        line-height: 1.45;
      }

      .mg-cookie-row input {
        width: 18px;
        height: 18px;
        accent-color: #2a5b84;
      }

      .mg-cookie-manage {
        position: fixed;
        left: 18px;
        bottom: 18px;
        z-index: 9998;
        box-shadow: 0 10px 28px rgba(31, 41, 51, 0.12);
      }

      @media (max-width: 640px) {
        .mg-cookie-banner {
          left: 12px;
          right: 12px;
          bottom: 12px;
          padding: 16px;
        }

        .mg-cookie-actions {
          align-items: stretch;
          flex-direction: column;
        }

        .mg-cookie-actions button,
        .mg-cookie-actions a {
          text-align: center;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function removeBanner() {
    const banner = document.getElementById("mg-cookie-banner");
    if (banner) banner.remove();
  }

  function showManageButton() {
    if (document.getElementById("mg-cookie-manage")) return;

    const button = document.createElement("button");
    button.id = "mg-cookie-manage";
    button.className = "mg-cookie-manage";
    button.type = "button";
    button.textContent = "Cookie";
    button.addEventListener("click", showBanner);
    document.body.appendChild(button);
  }

  function showBanner() {
    injectStyles();
    removeBanner();
    const consent = getConsent();

    const manage = document.getElementById("mg-cookie-manage");
    if (manage) manage.remove();

    const banner = document.createElement("section");
    banner.id = "mg-cookie-banner";
    banner.className = "mg-cookie-banner";
    banner.setAttribute("aria-label", copy.title);
    banner.innerHTML = `
      <h2>${copy.title}</h2>
      <p>${copy.text}</p>
      <div class="mg-cookie-preferences">
        <label class="mg-cookie-row">
          <input type="checkbox" checked disabled>
          <span>
            <strong>${copy.necessary}</strong>
            <small>${copy.necessaryText}</small>
          </span>
        </label>
        <label class="mg-cookie-row">
          <input id="mg-cookie-analytics" type="checkbox" ${consent.analytics ? "checked" : ""}>
          <span>
            <strong>${copy.analytics}</strong>
            <small>${copy.analyticsText}</small>
          </span>
        </label>
      </div>
      <div class="mg-cookie-actions">
        <button class="mg-cookie-save" type="button">${copy.save}</button>
        <button class="mg-cookie-accept" type="button">${copy.accept}</button>
        <button class="mg-cookie-reject" type="button">${copy.reject}</button>
        <a class="mg-cookie-link" href="${copy.link}">${copy.info}</a>
      </div>
    `;

    banner.querySelector(".mg-cookie-save").addEventListener("click", () => {
      const analytics = banner.querySelector("#mg-cookie-analytics").checked;
      saveConsent(analytics);
      if (analytics) {
        loadAnalytics();
        window.gtag("event", "cookie_consent_update", { consent_choice: "analytics_enabled" });
      } else {
        denyAnalytics();
      }
      removeBanner();
      showManageButton();
    });

    banner.querySelector(".mg-cookie-accept").addEventListener("click", () => {
      saveConsent(true);
      loadAnalytics();
      removeBanner();
      showManageButton();
      window.gtag("event", "cookie_consent_update", { consent_choice: "accepted" });
    });

    banner.querySelector(".mg-cookie-reject").addEventListener("click", () => {
      saveConsent(false);
      denyAnalytics();
      removeBanner();
      showManageButton();
    });

    document.body.appendChild(banner);
  }

  const savedChoice = localStorage.getItem(STORAGE_KEY);
  const savedConsent = getConsent();
  if (savedConsent.analytics === true) {
    loadAnalytics();
  } else if (savedChoice) {
    denyAnalytics();
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectStyles();
    if (savedChoice) {
      showManageButton();
    } else {
      showBanner();
    }
  });
})();
