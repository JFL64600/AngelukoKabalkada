import { setLocaleFromUrl } from "./localization.js";
import { LOCALE_STATUS_EVENT } from "@lit/localize";
import { html, render } from "lit";
import "./ak-header.js";
import "./ak-main-index.js";
import "./ak-footer.js";

// Update the locale to match the URL when the user moves backwards or forwards
// through history.
window.addEventListener("popstate", () => {
  setLocaleFromUrl();
});

// Display a spinner whenever a new locale is loading.
window.addEventListener(LOCALE_STATUS_EVENT, ({ detail }) => {
  if (detail.status === "loading") {
    console.log(`Loading new locale: ${detail.loadingLocale}`);
  } else if (detail.status === "ready") {
    console.log(`Loaded new locale: ${detail.readyLocale}`);
  } else if (detail.status === "error") {
    console.error(
      `Error loading locale ${detail.errorLocale}: ` + detail.errorMessage
    );
  }
});

(async () => {
  try {
    // Defer first render until our initial locale is ready, to avoid a flash of
    // the wrong locale.
    await setLocaleFromUrl();
  } catch (e) {
    // Either the URL locale code was invalid, or there was a problem loading
    // the locale module.
    console.error(`Error loading locale: ${e.message}`);
  }
  render(
    html`<ak-header></ak-header>
      <ak-main-index></ak-main-index>
      <ak-footer></ak-footer>`,
    document.querySelector("body")
  );
})();
