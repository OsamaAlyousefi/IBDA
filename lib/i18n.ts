import type { Language } from "./types";

/**
 * All user-facing UI strings, in both languages.
 * Content returned by the AI is already localised by the prompt; this covers
 * the static chrome (labels, buttons, headings).
 */
export const COPY = {
  en: {
    dir: "ltr",
    brand: "Ibda",
    brandSub: "Begin",
    // Landing
    landingKicker: "Built for Al Qua'a, Al Ain",
    landingHeadline: "An idea is not a business. The first step is.",
    landingSub:
      "Tell Ibda what you can do or what you dream of building. You'll get a real, doable plan — a name, three steps for this week, the licence you need, and the words to win your first customer.",
    start: "Start now",
    landingNote: "No account. No jargon. One honest plan.",
    // Form
    formKicker: "Tell us about you",
    formTitle: "What do you want to begin?",
    formLead:
      "Answer what you can. Even a rough idea is enough to start.",
    ideaLabel: "Your idea",
    ideaPlaceholder:
      "e.g. Sell fresh camel milk and dates to families in Al Ain",
    skillLabel: "Your skill or what you already have",
    skillPlaceholder: "e.g. I keep camels and know the farms nearby",
    budgetLabel: "Rough starting budget",
    budgetPlaceholder: "e.g. around 5,000 AED",
    generate: "Build my plan",
    generating: "Building your plan…",
    formHint: "Ibda will think for a moment, then show your plan.",
    // Plan
    planFor: "Your plan",
    actionTitle: "Your first three steps",
    actionLead: "Each one is doable this week.",
    licensingTitle: "Making it official",
    licenseType: "Licence type",
    estCost: "Estimated cost",
    authority: "Where to do it",
    notes: "Good to know",
    canvasTitle: "How the business works",
    valueProp: "What you offer",
    customerSegment: "Who it's for",
    revenue: "How you earn",
    keyResource: "What you rely on",
    firstCustomerTitle: "Your first customer",
    whoToApproach: "Who to approach",
    where: "Where to find them",
    script: "What to say",
    timeframe: "Time",
    startOver: "Start a new plan",
    print: "Print / Save as PDF",
    // States
    loadingTitle: "Shaping your plan",
    loadingSub: "Ibda is thinking through your first steps.",
    errorTitle: "That didn't go through",
    errorSub: "Something interrupted the plan. Let's try once more.",
    retry: "Try again",
    backToStart: "Back to start",
    noPlanTitle: "No plan yet",
    noPlanSub: "Start by telling Ibda about your idea.",
    // Landing meta
    issueLine: "A first-step guide",
    landingStat1: "1 plan",
    landingStat1Sub: "made for you",
    landingStat2: "3 steps",
    landingStat2Sub: "for this week",
    landingStat3: "0 jargon",
    landingStat3Sub: "plain language",
    // Form examples
    examplesLabel: "Need a spark? Try one",
    examples: [
      {
        idea: "Sell fresh camel milk and dates to families in Al Ain",
        skill: "I keep camels and know the local farms",
      },
      {
        idea: "Weekend desert tours for visitors near Al Qua'a",
        skill: "I know the dunes, the wildlife, and the old routes",
      },
      {
        idea: "Handmade sadu weaving and palm-leaf crafts",
        skill: "I weave the traditional way my mother taught me",
      },
    ],
    // Copy / actions
    copy: "Copy",
    copied: "Copied",
    copyScript: "Copy script",
    copyPlan: "Copy whole plan",
    regenerate: "Try another angle",
    regenerating: "Rethinking…",
    // Rotating loader microcopy
    loadingMessages: [
      "Reading your idea closely…",
      "Checking Al Ain licensing routes…",
      "Pricing things in realistic AED…",
      "Shaping three doable steps…",
      "Writing your first pitch…",
    ],
  },
  ar: {
    dir: "rtl",
    brand: "إبدأ",
    brandSub: "Begin",
    // Landing
    landingKicker: "صُنع لأهل القوع، العين",
    landingHeadline: "الفكرة ليست مشروعًا. الخطوة الأولى هي البداية.",
    landingSub:
      "أخبر «إبدأ» بما تجيده أو بما تحلم ببنائه، وستحصل على خطة حقيقية وقابلة للتنفيذ — اسم، وثلاث خطوات لهذا الأسبوع، والرخصة التي تحتاجها، والكلمات التي تكسب بها أول زبون.",
    start: "ابدأ الآن",
    landingNote: "بلا حساب. بلا تعقيد. خطة واحدة صادقة.",
    // Form
    formKicker: "أخبرنا عنك",
    formTitle: "ما الذي تريد أن تبدأه؟",
    formLead: "أجب بما تستطيع. حتى الفكرة البسيطة تكفي للبداية.",
    ideaLabel: "فكرتك",
    ideaPlaceholder: "مثال: بيع حليب الإبل الطازج والتمر لعائلات العين",
    skillLabel: "مهارتك أو ما تملكه الآن",
    skillPlaceholder: "مثال: أربّي الإبل وأعرف المزارع المجاورة",
    budgetLabel: "ميزانية البداية التقريبية",
    budgetPlaceholder: "مثال: حوالي ٥٠٠٠ درهم",
    generate: "ابنِ خطتي",
    generating: "نُجهّز خطتك…",
    formHint: "سيفكّر «إبدأ» للحظة ثم يعرض خطتك.",
    // Plan
    planFor: "خطتك",
    actionTitle: "خطواتك الثلاث الأولى",
    actionLead: "كل خطوة يمكن تنفيذها هذا الأسبوع.",
    licensingTitle: "لجعلها رسمية",
    licenseType: "نوع الرخصة",
    estCost: "التكلفة التقديرية",
    authority: "أين تُنجزها",
    notes: "من الجيد أن تعرف",
    canvasTitle: "كيف يعمل المشروع",
    valueProp: "ما الذي تقدّمه",
    customerSegment: "لمن هو",
    revenue: "كيف تربح",
    keyResource: "على ماذا تعتمد",
    firstCustomerTitle: "أول زبون لك",
    whoToApproach: "من تخاطب",
    where: "أين تجده",
    script: "ماذا تقول",
    timeframe: "المدة",
    startOver: "ابدأ خطة جديدة",
    print: "اطبع / احفظ PDF",
    // States
    loadingTitle: "نُشكّل خطتك",
    loadingSub: "يفكّر «إبدأ» في خطواتك الأولى.",
    errorTitle: "لم تكتمل العملية",
    errorSub: "حدث ما قطع الخطة. لنحاول مرة أخرى.",
    retry: "حاول مجددًا",
    backToStart: "العودة للبداية",
    noPlanTitle: "لا توجد خطة بعد",
    noPlanSub: "ابدأ بإخبار «إبدأ» عن فكرتك.",
    // Landing meta
    issueLine: "دليل الخطوة الأولى",
    landingStat1: "خطة واحدة",
    landingStat1Sub: "مصنوعة لك",
    landingStat2: "٣ خطوات",
    landingStat2Sub: "لهذا الأسبوع",
    landingStat3: "بلا تعقيد",
    landingStat3Sub: "لغة بسيطة",
    // Form examples
    examplesLabel: "تحتاج فكرة؟ جرّب واحدة",
    examples: [
      {
        idea: "بيع حليب الإبل الطازج والتمر لعائلات العين",
        skill: "أربّي الإبل وأعرف المزارع المجاورة",
      },
      {
        idea: "جولات صحراوية في عطلة نهاية الأسبوع للزوار قرب القوع",
        skill: "أعرف الكثبان والحياة البرية والطرق القديمة",
      },
      {
        idea: "حياكة السدو اليدوية وحرف سعف النخيل",
        skill: "أحوك بالطريقة التقليدية التي علّمتني إياها أمي",
      },
    ],
    // Copy / actions
    copy: "نسخ",
    copied: "تم النسخ",
    copyScript: "انسخ النص",
    copyPlan: "انسخ الخطة كاملة",
    regenerate: "جرّب زاوية أخرى",
    regenerating: "نعيد التفكير…",
    // Rotating loader microcopy
    loadingMessages: [
      "نقرأ فكرتك بعناية…",
      "نراجع مسارات الترخيص في العين…",
      "نقدّر التكاليف بالدرهم بواقعية…",
      "نُشكّل ثلاث خطوات قابلة للتنفيذ…",
      "نكتب أول عرض لك…",
    ],
  },
} as const;

export type Copy = (typeof COPY)["en"];

export function getCopy(lang: Language): Copy {
  return COPY[lang] as Copy;
}

/** sessionStorage keys shared between the form and the /plan page. */
export const PLAN_STORAGE_KEY = "ibda:plan"; // the generated BusinessPlan
export const REQUEST_STORAGE_KEY = "ibda:request"; // the form input that produced it
/** localStorage key for the persisted UI language. */
export const LANG_STORAGE_KEY = "ibda:lang";
