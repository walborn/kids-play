// ==========================================================================
// 1. CONSTANTS
// ==========================================================================

const STORAGE_KEY = "childActivityPlanner";
const DATA_VERSION = 1;
const LANG = "ru";

// Shared vocabulary: the same ids are used in the catalogue, the child profile, feedback and scoring

const AREAS = ["gross_motor", "fine_motor", "sensory", "cognitive", "communication", "social_emotional"];

const SKILLS = {
    gross_motor: ["head_control", "rolling", "sitting", "crawling", "standing"],
    fine_motor: ["grasping", "reaching", "hand_transfer", "releasing", "finger_skills"],
    sensory: ["visual_tracking", "auditory_attention", "tactile_exploration"],
    cognitive: ["attention_focus", "cause_effect", "object_permanence"],
    communication: ["responding_to_voice", "cooing_babbling", "gestures", "understanding_words"],
    social_emotional: ["social_smile", "joint_attention", "turn_taking", "imitation"],
};

const SKILL_LEVELS = ["unknown", "emerging", "developing", "confident"];

const INTERESTS = [
    "music",
    "sounds",
    "faces",
    "moving_objects",
    "colors",
    "books",
    "textures",
    "water",
    "movement",
    "calm",
];

const MATERIALS = [
    "blanket",
    "rattle",
    "soft_toy",
    "ball",
    "mirror",
    "contrast_cards",
    "book",
    "fabric",
    "scarf",
    "container",
    "blocks",
    "cups",
    "pot_and_spoon",
    "bowl",
    "bubbles",
    "button_toy",
    "pillows",
];

const GENDERS = ["unspecified", "female", "male"];
const DURATION_LIMITS = [0, 5, 10, 15]; // minutes, 0 means no limit
const ENVIRONMENT_PREFS = ["either", "home", "outdoors"];
const INTENSITY_PREFS = ["either", "calm", "active"];

// Manual interest marks cycle: none → like → dislike → none
const NEXT_MANUAL = {like: "dislike", dislike: null};

// ==========================================================================
// 2. TRANSLATIONS
// ==========================================================================

// All user-visible strings live here: another language is one more object with the same keys
const STRINGS = {
    ru: {
        locale: "ru-RU",
        appName: "Занятия с ребёнком",
        units: {days: "дн.", weeks: "нед.", months: "мес.", years: "г.", minutes: "мин"},

        /* --- Navigation --- */
        navigation: "Основная навигация",
        today: "Сегодня",
        activities: "Занятия",
        history: "История",
        child: "Ребёнок",
        settings: "Настройки",

        /* --- Common --- */
        save: "Сохранить",
        cancel: "Отмена",
        close: "Закрыть",
        delete: "Удалить",
        edit: "Изменить",
        storageError: "Не удалось сохранить данные: в браузере закончилось место.",

        /* --- Today --- */
        welcomeTitle: "Здравствуйте!",
        welcomeText: "Добавьте профиль ребёнка, и приложение будет каждый день предлагать одно подходящее занятие.",
        localDataNote: "Все данные хранятся только на этом устройстве и никуда не отправляются.",

        /* --- Child profile --- */
        selectChild: "Выбрать ребёнка",
        noChildText: "Пока нет ни одного профиля.",
        addChild: "Добавить ребёнка",
        addAnotherChild: "Добавить ещё ребёнка",
        newChild: "Новый ребёнок",
        editChild: "Профиль ребёнка",
        name: "Имя",
        birthDate: "Дата рождения",
        gender: "Пол (необязательно)",
        genders: {unspecified: "Не указан", female: "Девочка", male: "Мальчик"},
        deleteChild: "Удалить профиль",
        deleteChildQuestion: (name) =>
            `Удалить профиль «${name}» вместе с историей занятий? Это действие нельзя отменить.`,

        skillsTitle: "Навыки",
        skillsNote:
            "Отмечайте то, что замечаете сами. Это ваши наблюдения, а не медицинская " +
            "или стандартизированная оценка развития. Каждый ребёнок развивается в своём темпе.",
        observed: (n) => (n ? `отмечено: ${n}` : ""),
        interestsTitle: "Интересы",
        interestsNote: "Нажмите, чтобы отметить: нравится → не нравится → не указано.",
        interestStates: {like: "нравится", dislike: "не нравится"},
        conditionsTitle: "Условия для занятий",
        conditionsNote: "Необязательно. Помогает подбирать занятия, которые удобно провести.",
        durationLabel: "Сколько есть времени",
        environmentLabel: "Где заниматься",
        intensityLabel: "Какие занятия",
        materialsLabel: "Что есть под рукой",
        durationLimits: {0: "Неважно", 5: "До 5 мин", 10: "До 10 мин", 15: "До 15 мин"},
        environmentPrefs: {either: "Неважно", home: "Дома", outdoors: "На улице"},
        intensityPrefs: {either: "Любые", calm: "Спокойные", active: "Подвижные"},

        /* --- Vocabulary --- */
        areas: {
            gross_motor: "Крупная моторика",
            fine_motor: "Мелкая моторика",
            sensory: "Сенсорика",
            cognitive: "Познание",
            communication: "Ранняя речь",
            social_emotional: "Общение и эмоции",
        },
        skills: {
            head_control: "Держит голову",
            rolling: "Переворачивается",
            sitting: "Сидит",
            crawling: "Ползает",
            standing: "Стоит с опорой",
            grasping: "Захватывает игрушку",
            reaching: "Тянется к предметам",
            hand_transfer: "Перекладывает из руки в руку",
            releasing: "Кладёт и отпускает предметы",
            finger_skills: "Нажимает и тычет пальчиком",
            visual_tracking: "Следит глазами за предметом",
            auditory_attention: "Прислушивается к звукам",
            tactile_exploration: "Исследует на ощупь",
            attention_focus: "Сосредотачивается на игрушке",
            cause_effect: "Повторяет действие ради результата",
            object_permanence: "Ищет спрятанную игрушку",
            responding_to_voice: "Откликается на голос",
            cooing_babbling: "Гулит и лепечет",
            gestures: "Использует жесты",
            understanding_words: "Понимает знакомые слова",
            social_smile: "Улыбается в ответ",
            joint_attention: "Смотрит туда же, куда взрослый",
            turn_taking: "Играет по очереди",
            imitation: "Подражает действиям и звукам",
        },
        levels: {
            unknown: "Пока не замечали",
            emerging: "Только появляется",
            developing: "Иногда получается",
            confident: "Получается уверенно",
        },
        interests: {
            music: "Музыка",
            sounds: "Звуки",
            faces: "Лица и общение",
            moving_objects: "Движущиеся предметы",
            colors: "Яркие предметы",
            books: "Книжки и картинки",
            textures: "Разные текстуры",
            water: "Вода",
            movement: "Движение",
            calm: "Спокойные занятия",
        },
        materials: {
            blanket: "Коврик или плед",
            rattle: "Погремушка",
            soft_toy: "Мягкая игрушка",
            ball: "Мягкий мяч",
            mirror: "Небьющееся детское зеркало",
            contrast_cards: "Контрастные картинки",
            book: "Книжка с плотными страницами",
            fabric: "Лоскутки разных тканей",
            scarf: "Лёгкий платок",
            container: "Корзинка или коробка",
            blocks: "Крупные кубики",
            cups: "Пластиковые стаканчики",
            pot_and_spoon: "Кастрюля и деревянная ложка",
            bowl: "Неглубокая миска",
            bubbles: "Мыльные пузыри",
            button_toy: "Игрушка с кнопками",
            pillows: "Подушки",
        },
    },
};

const S = STRINGS[LANG];

// ==========================================================================
// 3. HELPERS
// ==========================================================================

const $ = (id) => document.getElementById(id);

const pad = (n) => String(n).padStart(2, "0");

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

const now = () => new Date().toISOString();

const toggle = (list, item) => (list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);

// Calendar days are local YYYY-MM-DD strings, never UTC conversions
const dateKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const parseDate = (key) => {
    const [y, m, d] = key.split("-").map(Number);
    return new Date(y, m - 1, d);
};

const formatDate = (key, options) => parseDate(key).toLocaleDateString(S.locale, options);

// Day numbers come from UTC so that daylight saving changes never shift them
const dayNumber = (key) => {
    const [y, m, d] = key.split("-").map(Number);
    return Date.UTC(y, m - 1, d) / 86400000;
};

const daysBetween = (from, to) => dayNumber(to) - dayNumber(from);

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

// Completed months plus the days since the last monthly birthday.
// A birthday on the 31st falls on the last day of shorter months.
const ageOf = (birthDate, today = dateKey()) => {
    const [by, bm, bd] = birthDate.split("-").map(Number);
    const [ty, tm, td] = today.split("-").map(Number);
    let months = (ty - by) * 12 + (tm - bm);
    if (td < Math.min(bd, daysInMonth(ty, tm - 1))) months--;
    const year = by + Math.floor((bm - 1 + months) / 12);
    const month = (bm - 1 + months) % 12;
    const anniversary = dateKey(new Date(year, month, Math.min(bd, daysInMonth(year, month))));
    return {months, days: daysBetween(anniversary, today)};
};

const formatAge = (birthDate) => {
    const {months, days} = ageOf(birthDate);
    const weeks = Math.floor(days / 7);
    const u = S.units;
    if (months === 0) return weeks ? `${weeks} ${u.weeks}` : `${days} ${u.days}`;
    if (months < 3 && weeks) return `${months} ${u.months} ${weeks} ${u.weeks}`;
    if (months < 24) return `${months} ${u.months}`;
    const rest = months % 12;
    return `${Math.floor(months / 12)} ${u.years}` + (rest ? ` ${rest} ${u.months}` : "");
};

// Builds an element. Strings become text nodes, so catalogue and user text is never parsed as HTML.
const el = (tag, props, ...children) => {
    const node = Object.assign(document.createElement(tag), props);
    node.append(...children);
    return node;
};

// ==========================================================================
// 4. DOM ELEMENTS
// ==========================================================================

const header = $("top");
const childSelect = $("child-select");
const childAge = $("child-age");

const nav = $("nav");
const navButtons = [...nav.querySelectorAll("button")];

/* --- Today --- */
const todayDate = $("today-date");
const welcome = $("welcome");

/* --- Child --- */
const childNone = $("child-none");
const childProfile = $("child-profile");
const childName = $("child-name");
const childInfo = $("child-info");
const childEdit = $("child-edit");
const childDelete = $("child-delete");
const skillsList = $("skills");
const interestsList = $("interests");
const conditionDuration = $("condition-duration");
const conditionEnvironment = $("condition-environment");
const conditionIntensity = $("condition-intensity");
const conditionMaterials = $("condition-materials");

/* --- Child form --- */
const childDialog = $("child-dialog");
const childForm = $("child-form");
const childFormTitle = $("child-form-title");
const childNameInput = $("child-name-input");
const childBirthInput = $("child-birth-input");
const childGender = $("child-gender");

/* --- Confirmation --- */
const confirmDialog = $("confirm-dialog");
const confirmText = $("confirm-text");
const confirmYes = $("confirm-yes");
const confirmNo = $("confirm-no");

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
// 6. STORAGE
// ==========================================================================

let data;

const emptyData = () => ({
    version: DATA_VERSION,
    children: [],
    activeChildId: null,
    recommendations: [],
    feedback: [],
    preferences: [],
    settings: {},
});

// Data of an older version would be migrated here, based on data.version
const loadData = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    try {
        data = {...emptyData(), ...JSON.parse(raw)};
    } catch {
        // keep unreadable data aside instead of overwriting it
        localStorage.setItem(`${STORAGE_KEY}-unreadable-${Date.now()}`, raw);
        data = emptyData();
    }
};

const saveData = () => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
        showMessage(S.storageError);
    }
};

const updateData = (change) => {
    change(data);
    saveData();
};

// ==========================================================================
// 7. PROFILE
// ==========================================================================

const activeChild = () => data.children.find((c) => c.id === data.activeChildId);

const createChild = (fields) =>
    updateData((d) => {
        const time = now();
        const child = {
            id: uid(),
            ...fields,
            createdAt: time,
            updatedAt: time,
            skills: [],
            conditions: {duration: 0, materials: [], environment: "either", intensity: "either"},
        };
        d.children.push(child);
        d.activeChildId = child.id;
    });

const editChild = (child, fields) => updateData(() => Object.assign(child, fields, {updatedAt: now()}));

const deleteChild = (id) =>
    updateData((d) => {
        const other = (item) => item.childId !== id;
        d.children = d.children.filter((c) => c.id !== id);
        d.recommendations = d.recommendations.filter(other);
        d.feedback = d.feedback.filter(other);
        d.preferences = d.preferences.filter(other);
        d.activeChildId = d.children[0]?.id ?? null;
    });

const skillLevel = (child, id) => child.skills.find((s) => s.id === id)?.level ?? "unknown";

const setSkillLevel = (child, id, level) =>
    updateData(() => {
        const time = now();
        const skill = child.skills.find((s) => s.id === id);
        if (skill) Object.assign(skill, {level, updatedAt: time});
        else child.skills.push({id, level, updatedAt: time});
        child.updatedAt = time;
    });

const setCondition = (child, key, value) =>
    updateData(() => {
        child.conditions[key] = value;
        child.updatedAt = now();
    });

/* --- Preferences: interests, activities and difficulty per area --- */

const findPreference = (childId, kind, id) =>
    data.preferences.find((p) => p.childId === childId && p.kind === kind && p.id === id);

const getPreference = (childId, kind, id) => {
    let p = findPreference(childId, kind, id);
    if (!p) data.preferences.push((p = {childId, kind, id, score: 0, manual: null, updatedAt: now()}));
    return p;
};

const toggleInterest = (child, tag) =>
    updateData(() => {
        const p = getPreference(child.id, "interest", tag);
        p.manual = p.manual ? NEXT_MANUAL[p.manual] : "like";
        p.updatedAt = now();
    });

// ==========================================================================
// 8. UI COMPONENTS
// ==========================================================================

// Chips for single or multiple choice
const renderChoices = (container, options, labels, isSelected, onSelect) =>
    container.replaceChildren(
        ...options.map((option) =>
            el("button", {
                type: "button",
                className: isSelected(option) ? "tap selected" : "tap",
                ariaPressed: isSelected(option),
                textContent: labels[option],
                onclick: () => onSelect(option),
            }),
        ),
    );

let onConfirm = null;

const confirmAction = (text, yesLabel, action) => {
    confirmText.textContent = text;
    confirmYes.textContent = yesLabel;
    confirmNo.classList.toggle("hidden", !action);
    onConfirm = action;
    confirmDialog.returnValue = "";
    confirmDialog.showModal();
};

const showMessage = (text) => confirmAction(text, "OK", null);

confirmDialog.onclose = () => {
    if (confirmDialog.returnValue === "yes") onConfirm?.();
};

document.querySelectorAll("dialog .close").forEach((button) => {
    button.onclick = () => button.closest("dialog").close();
});

// ==========================================================================
// 9. HEADER
// ==========================================================================

const renderHeader = () => {
    const child = activeChild();
    header.classList.toggle("hidden", !child);
    if (!child) return;
    childSelect.replaceChildren(
        ...data.children.map((c) => el("option", {value: c.id, textContent: c.name, selected: c === child})),
    );
    childAge.textContent = formatAge(child.birthDate);
};

childSelect.onchange = () => {
    updateData((d) => (d.activeChildId = childSelect.value));
    render();
};

// ==========================================================================
// 10. TODAY
// ==========================================================================

const renderToday = () => {
    todayDate.textContent = formatDate(dateKey(), {weekday: "long", day: "numeric", month: "long"});
    welcome.classList.toggle("hidden", !!activeChild());
};

// ==========================================================================
// 11. CHILD
// ==========================================================================

const renderSkills = (child) =>
    skillsList.replaceChildren(
        ...AREAS.map((area) => {
            const count = el("span", {className: "help small"});
            const updateCount = () =>
                (count.textContent = S.observed(
                    SKILLS[area].filter((id) => skillLevel(child, id) !== "unknown").length,
                ));
            updateCount();
            return el(
                "details",
                {},
                el("summary", {}, el("span", {textContent: S.areas[area]}), count),
                ...SKILLS[area].map((id) =>
                    el(
                        "label",
                        {className: "skill"},
                        el("span", {textContent: S.skills[id]}),
                        el(
                            "select",
                            {
                                className: "input",
                                onchange: (e) => {
                                    setSkillLevel(child, id, e.target.value);
                                    updateCount();
                                },
                            },
                            ...SKILL_LEVELS.map((level) =>
                                el("option", {
                                    value: level,
                                    textContent: S.levels[level],
                                    selected: skillLevel(child, id) === level,
                                }),
                            ),
                        ),
                    ),
                ),
            );
        }),
    );

const renderInterests = (child) =>
    interestsList.replaceChildren(
        ...INTERESTS.map((tag) => {
            const manual = findPreference(child.id, "interest", tag)?.manual;
            return el("button", {
                type: "button",
                className: `tap ${{like: "selected", dislike: "excluded"}[manual] ?? ""}`,
                ariaLabel: manual ? `${S.interests[tag]}: ${S.interestStates[manual]}` : S.interests[tag],
                textContent: S.interests[tag],
                onclick: () => {
                    toggleInterest(child, tag);
                    renderInterests(child);
                },
            });
        }),
    );

const renderConditions = (child) => {
    const {conditions} = child;
    const choose = (key) => (value) => {
        setCondition(child, key, value);
        renderConditions(child);
    };
    renderChoices(conditionDuration, DURATION_LIMITS, S.durationLimits, (v) => v === conditions.duration, choose("duration"));
    renderChoices(conditionEnvironment, ENVIRONMENT_PREFS, S.environmentPrefs, (v) => v === conditions.environment, choose("environment"));
    renderChoices(conditionIntensity, INTENSITY_PREFS, S.intensityPrefs, (v) => v === conditions.intensity, choose("intensity"));
    renderChoices(conditionMaterials, MATERIALS, S.materials, (v) => conditions.materials.includes(v), (v) =>
        choose("materials")(toggle(conditions.materials, v)),
    );
};

const renderChild = () => {
    const child = activeChild();
    childNone.classList.toggle("hidden", !!child);
    childProfile.classList.toggle("hidden", !child);
    if (!child) return;
    childName.textContent = child.name;
    childInfo.textContent = [
        formatDate(child.birthDate, {day: "numeric", month: "long", year: "numeric"}),
        formatAge(child.birthDate),
        child.gender !== "unspecified" && S.genders[child.gender],
    ]
        .filter(Boolean)
        .join(" · ");
    renderSkills(child);
    renderInterests(child);
    renderConditions(child);
};

childDelete.onclick = () => {
    const child = activeChild();
    confirmAction(S.deleteChildQuestion(child.name), S.delete, () => {
        deleteChild(child.id);
        render();
    });
};

/* --- Child form --- */

let editedChild = null;
let formGender = "unspecified";

const renderGender = () =>
    renderChoices(childGender, GENDERS, S.genders, (g) => g === formGender, (g) => {
        formGender = g;
        renderGender();
    });

const openChildForm = (child) => {
    editedChild = child;
    childFormTitle.textContent = child ? S.editChild : S.newChild;
    childNameInput.value = child?.name ?? "";
    childBirthInput.value = child?.birthDate ?? "";
    childBirthInput.max = dateKey();
    formGender = child?.gender ?? "unspecified";
    renderGender();
    childDialog.showModal();
};

childForm.onsubmit = () => {
    const fields = {name: childNameInput.value.trim(), birthDate: childBirthInput.value, gender: formGender};
    if (editedChild) editChild(editedChild, fields);
    else createChild(fields);
    render();
};

childEdit.onclick = () => openChildForm(activeChild());

document.querySelectorAll(".add-child").forEach((button) => {
    button.onclick = () => openChildForm(null);
});

// ==========================================================================
// 12. NAVIGATION
// ==========================================================================

const renderers = {
    today: renderToday,
    child: renderChild,
};

let currentPage = "today";

const render = () => {
    renderHeader();
    renderers[currentPage]?.();
};

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
// 13. INIT
// ==========================================================================

(() => {
    translatePage();
    loadData();
    showPage("today");
    navigator.serviceWorker?.register("sw.js", {updateViaCache: "none"});

    // the date changes while the app stays open: refresh age and the daily screen
    let renderedDay = dateKey();
    document.addEventListener("visibilitychange", () => {
        if (document.hidden || dateKey() === renderedDay) return;
        renderedDay = dateKey();
        render();
    });
})();
