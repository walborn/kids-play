// ==========================================================================
// 1. CONSTANTS
// ==========================================================================

const LANG = "ru";

// ==========================================================================
// 2. TRANSLATIONS
// ==========================================================================

// All user-visible strings live here: another language is one more object with the same keys
const STRINGS = {
    ru: {
        locale: "ru-RU",
        appName: "Занятия с ребёнком",

        /* --- Navigation --- */
        navigation: "Основная навигация",
        today: "Сегодня",
        activities: "Занятия",
        history: "История",
        child: "Ребёнок",
        settings: "Настройки",
    },
};

const S = STRINGS[LANG];

// ==========================================================================
// 3. HELPERS
// ==========================================================================

const $ = (id) => document.getElementById(id);

const pad = (n) => String(n).padStart(2, "0");

// Calendar days are local YYYY-MM-DD strings, never UTC conversions
const dateKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const parseDate = (key) => {
    const [y, m, d] = key.split("-").map(Number);
    return new Date(y, m - 1, d);
};

const formatDate = (key, options) => parseDate(key).toLocaleDateString(S.locale, options);

// ==========================================================================
// 4. DOM ELEMENTS
// ==========================================================================

const nav = $("nav");
const navButtons = [...nav.querySelectorAll("button")];
const todayDate = $("today-date");

// ==========================================================================
// 5. LANGUAGE
// ==========================================================================

const translatePage = () => {
    document.documentElement.lang = LANG;
    document.title = S.appName;
    document
        .querySelectorAll("[data-i18n]")
        .forEach((node) => (node.textContent = S[node.dataset.i18n]));
    document
        .querySelectorAll("[data-i18n-label]")
        .forEach((node) => node.setAttribute("aria-label", S[node.dataset.i18nLabel]));
};

// ==========================================================================
// 6. TODAY
// ==========================================================================

const renderToday = () => {
    todayDate.textContent = formatDate(dateKey(), {weekday: "long", day: "numeric", month: "long"});
};

// ==========================================================================
// 7. NAVIGATION
// ==========================================================================

const renderers = {
    today: renderToday,
};

let currentPage = "today";

const render = () => renderers[currentPage]?.();

const showPage = (name) => {
    currentPage = name;
    navButtons.forEach((button) => {
        const active = button.dataset.page === name;
        button.classList.toggle("active", active);
        if (active) button.setAttribute("aria-current", "page");
        else button.removeAttribute("aria-current");
        $(`${button.dataset.page}-page`).classList.toggle("hidden", !active);
    });
    window.scrollTo(0, 0);
    render();
};

nav.onclick = (e) => {
    const button = e.target.closest("button");
    if (button) showPage(button.dataset.page);
};

// ==========================================================================
// 8. INIT
// ==========================================================================

(() => {
    translatePage();
    showPage("today");
    navigator.serviceWorker?.register("sw.js", {updateViaCache: "none"});
})();
