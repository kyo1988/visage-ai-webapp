// Typed content source for the /learn organic-acquisition surface.
// Each entry drives a statically generated page at /learn/[slug].
//
// `hypothesis` tags each page against the canonical Growth hypothesis
// taxonomy (H1-H4), so CTA analytics (seo_app_cta_click) can be grouped
// by message rather than URL.

export type Hypothesis = "H1" | "H2" | "H3" | "H4";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContentSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface CtaCopy {
  heading: string;
  body: string;
  label: string;
}

export interface PageImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface B2CSearchPage {
  slug: string;
  title: string;
  description: string;
  h1: string;
  shortAnswer: string;
  sections: ContentSection[];
  faqs: FaqItem[];
  hypothesis: Hypothesis;
  cta: CtaCopy;
  image: PageImage;
  relatedSlugs: string[];
  /** Descriptive anchor text used by other pages when linking to this one. */
  linkLabel: string;
}

export const b2cSearchPages: B2CSearchPage[] = [
  {
    slug: "is-my-skincare-routine-enough",
    title: "Is My Skincare Routine Enough? What a Routine Check Can Tell You",
    description:
      "A product count cannot establish whether a routine is adequate. Identify a current priority, then review your saved categories without treating category presence as proof of effectiveness.",
    h1: "Is My Skincare Routine Enough?",
    shortAnswer:
      "A product count or a photo cannot establish whether your routine is adequate. Start with a current priority, then review what you have saved. Visage AI's Routine Check reports saved category presence; it does not determine whether products address that priority.",
    sections: [
      {
        heading: "\"Enough\" is about coverage, not count",
        paragraphs: [
          "It's tempting to judge a routine by how many steps it has — three products feels minimal, ten feels thorough. Step count alone does not show whether products are suitable or effective. A list of saved categories cannot establish that either.",
          "The more useful question isn't \"how much am I doing,\" it's \"is what I'm doing pointed at the right thing.\"",
        ],
      },
      {
        heading: "Start by naming one priority",
        paragraphs: [
          "Before you can judge whether a routine is enough, you need to know what it's supposed to be enough for. Skin priorities shift — with season, sleep, stress, and sun exposure — so the honest starting point is figuring out what actually matters today, rather than defaulting to whatever you focused on last year.",
          "Visage AI starts with a photo-based assessment and a suggested Today's Priority based on available measurements. Limited results may require another photo. It is beauty guidance, not a medical diagnosis.",
        ],
      },
      {
        heading: "Then review your saved categories separately",
        paragraphs: [
          "Review the products you have saved and their categories. Routine Check looks for category registration in that list; the category being checked may differ from Today's Priority.",
          "A listed category means it is registered, not that its ingredients or effects address a priority. An unlisted category is a saved-list gap, not proof that another purchase is necessary.",
        ],
      },
      {
        heading: "Enough today doesn't mean enough forever",
        paragraphs: [
          "You can revisit your saved routine when it changes. The list does not confirm consistent use, ingredient compatibility or overall adequacy. Re-checking a category does not require buying another product.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does using more products make a routine more likely to be enough?",
        answer:
          "Not on its own. More steps only help if they cover something your current routine is missing. If they duplicate what you already have, they add effort without adding coverage.",
      },
      {
        question: "How do I know what my current priority even is?",
        answer:
          "Visage AI can suggest one Today's Priority from the measurements available in a photo-based assessment. It does not provide a medical diagnosis, and a suggestion is not guaranteed for every photo.",
      },
      {
        question: "What if my routine covers my priority but I still feel unsure?",
        answer:
          "That's normal, and it's also a reasonable time to do nothing new. \"No extra purchase needed\" is a legitimate outcome, not a failure to find something to buy.",
      },
    ],
    hypothesis: "H4",
    cta: {
      heading: "Start with a suggested priority",
      body: "Take a photo for a suggested priority, then separately review saved product categories. Routine Check does not establish ingredient compatibility or product effectiveness.",
      label: "Explore Visage AI",
    },
    image: {
      src: "/images/app-landing/496/todays-priority.png",
      width: 1086,
      height: 660,
      alt: "Captured Today's Priority capture showing a suggested Age-Defying Glow priority",
    },
    relatedSlugs: [
      "do-i-need-another-skincare-product",
      "skincare-checklist-before-buying",
      "how-to-simplify-skincare-routine",
    ],
    linkLabel: "how to tell if your routine is enough",
  },
  {
    slug: "do-i-need-another-skincare-product",
    title: "Do I Need Another Skincare Product? A 3-Question Framework",
    description:
      "Before adding anything new, run it through three questions: what gap you're solving, whether something you own already covers it, and whether it replaces a step or just adds one.",
    h1: "Do I Need Another Skincare Product?",
    shortAnswer:
      "Often, no — and that's a legitimate answer, not an evasion. Before buying, work through three questions: what specific gap are you solving, does something you already use cover that role, and would the new product replace a step or just pile on top of it?",
    sections: [
      {
        heading: "Start with the gap, not the product",
        paragraphs: [
          "It's easy to get pulled toward a product because it's popular, on sale, or recommended by someone whose skin looks nothing like yours. None of that tells you whether you actually need it.",
          "A more reliable starting point is naming the specific gap you're trying to close. \"My skin looks dull\" is a start; \"I don't have anything addressing dullness right now\" is a gap you can actually check against.",
        ],
      },
      {
        heading: "Question 1: What specific gap are you trying to solve?",
        paragraphs: [
          "Be precise. \"General improvement\" isn't a gap you can check a routine against — it's too broad to ever resolve. A specific role, such as hydration, sun protection, or a particular texture concern, is something you can actually verify against what you own.",
        ],
      },
      {
        heading: "Question 2: Does something you already use cover that role?",
        paragraphs: [
          "This is the step most people skip. Look at your current products and check, honestly, whether one of them is already built for that role. If it is, the gap may already be closed — you just haven't been using it consistently, or hadn't connected it to this priority.",
          "Visage AI's Routine Check checks whether a category is registered in the products you saved. That category may differ from Today's Priority; it does not evaluate whether products cover the priority.",
        ],
      },
      {
        heading: "Question 3: Would it replace something, or just add another layer?",
        paragraphs: [
          "If a new product would genuinely replace something that isn't working, that's a real decision to weigh. If it would just sit on top of an already-full routine without displacing anything, it's worth asking what problem the extra layer is actually solving — more steps aren't automatically more coverage.",
        ],
      },
      {
        heading: "You may not need another product",
        paragraphs: [
          "If your current routine already covers the gap you named, the honest answer is that you don't need to buy anything right now. That's not a consolation prize — it's the outcome this framework is designed to surface when it's true.",
        ],
      },
    ],
    faqs: [
      {
        question: "Isn't it safer to just add a product in case it helps?",
        answer:
          "Not necessarily — adding products without a clear, uncovered gap mostly adds cost and routine complexity without a defined purpose. It's more useful to confirm the gap first.",
      },
      {
        question: "What if I can't tell whether my current products cover the gap?",
        answer:
          "Routine Check cannot answer whether your products address a concern. It checks saved category presence only, not ingredient compatibility, product effectiveness or whether your routine is sufficient.",
      },
      {
        question: "Does this mean I should never buy new skincare?",
        answer:
          "No — when a real, specific gap remains after checking what you already own, considering a product for that gap makes sense. The framework just makes sure the gap is real before you spend on it.",
      },
    ],
    hypothesis: "H2",
    cta: {
      heading: "Run your next purchase through the check first",
      body: "Begin with a photo-based assessment and a suggested priority. Then review your saved categories; an unlisted category alone is not a reason to buy.",
      label: "Explore Visage AI",
    },
    image: {
      src: "/images/app-landing/496/routine-check.png",
      width: 1080,
      height: 970,
      alt: "Captured Routine Check share card: Cleanser not listed in My Routine; category presence only",
    },
    relatedSlugs: [
      "is-my-skincare-routine-enough",
      "skincare-checklist-before-buying",
      "how-to-simplify-skincare-routine",
    ],
    linkLabel: "a 3-question framework for deciding if you need a new product",
  },
  {
    slug: "how-to-simplify-skincare-routine",
    title: "How to Simplify Your Skincare Routine, by Role Not Rules",
    description:
      "Skip the arbitrary product-count rules. Simplifying a routine means knowing what job each step is doing, cutting what duplicates, and keeping what covers a real role.",
    h1: "How to Simplify Your Skincare Routine",
    shortAnswer:
      "Simplifying isn't about hitting a magic number of products — it's about knowing what role each step in your routine is actually playing, keeping the ones that cover something real, and dropping the ones that duplicate another step or don't map to a clear purpose.",
    sections: [
      {
        heading: "Forget the product-count rule",
        paragraphs: [
          "Advice like \"use no more than five products\" treats every routine as identical, which they aren't. Two people with three products each can have very different levels of actual coverage — one might be missing something essential, the other might have real duplication hiding in those same three steps.",
          "A count-based rule can't tell the difference. A role-based approach can.",
        ],
      },
      {
        heading: "List what each product is actually for",
        paragraphs: [
          "Go through your current routine and, for each product, write down the one role it's playing — not the marketing description, but what you're actually using it for. If you can't state a clear role for something, that's worth noting.",
          "My Routine in Visage AI holds the products you choose to save. It does not verify that you use them consistently. Routine Check reports saved category presence, not a product's actual role or effectiveness.",
        ],
      },
      {
        heading: "Cut duplication first",
        paragraphs: [
          "A role list can help you ask whether products overlap. Category labels alone cannot prove duplication: two products in one category may differ. Routine Check does not assess that overlap or tell you which product to remove.",
        ],
      },
      {
        heading: "Keep what maps to a current priority",
        paragraphs: [
          "Review the purpose of each product yourself rather than treating a suggested priority as a reason to stop everything else. Routine Check does not determine whether a product is needed, should be paused or addresses Today's Priority.",
          "This is a routine check, not a skin diagnosis — the goal is clarity about what each step is for, not judgments about skin health or conditions.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a shorter routine always simpler and better?",
        answer:
          "Shorter isn't automatically simpler in the sense that matters. A short routine with unclear roles can be just as confusing as a long one — the goal is clarity about purpose, not step count.",
      },
      {
        question: "How do I know if two products are actually duplicating each other?",
        answer:
          "Compare the role you'd assign each one, not the product category. Two items can share a category but serve different roles, and two differently labeled products can quietly do the same job.",
      },
      {
        question: "Should I remove everything I'm unsure about at once?",
        answer:
          "Gradual changes make it easier to notice what a removal actually affects. Removing several unclear steps at once makes it harder to tell what changed and why.",
      },
    ],
    hypothesis: "H4",
    cta: {
      heading: "See what you have saved",
      body: "Start with a photo-based assessment and a suggested priority, then review the products you have saved in My Routine. Category registration does not prove duplication or effectiveness.",
      label: "Explore Visage AI",
    },
    image: {
      src: "/images/app-landing/496/routine-check.png",
      width: 1080,
      height: 970,
      alt: "Captured Routine Check share card showing saved category registration, not the My Routine editor",
    },
    relatedSlugs: [
      "is-my-skincare-routine-too-complicated",
      "is-my-skincare-routine-enough",
      "how-to-track-skincare-routine-progress",
    ],
    linkLabel: "simplifying a routine by role instead of product count",
  },
  {
    slug: "is-my-skincare-routine-too-complicated",
    title: "Is My Skincare Routine Too Complicated? Signs to Look For",
    description:
      "Complexity shows up as duplication, confusion about what changed, and steps with no clear purpose — not as a specific product count. Here's how to spot it.",
    h1: "Is My Skincare Routine Too Complicated?",
    shortAnswer:
      "A routine is too complicated when you can't clearly say what each step is for, when steps quietly duplicate each other, or when you can no longer tell what changed after adding or dropping something — not simply because it has many steps.",
    sections: [
      {
        heading: "Complexity isn't about the number of steps",
        paragraphs: [
          "A routine with eight carefully chosen steps, each serving a distinct role, can be easier to manage than a four-step routine where you're not sure what each product is actually doing. The signal to look for isn't length — it's clarity.",
        ],
      },
      {
        heading: "Sign 1: Duplication you didn't notice",
        paragraphs: [
          "Over time it's common to accumulate more than one product covering the same role, especially after switching brands without removing the old one. If you lined up your products and grouped them by actual purpose, would any group have more than one item in it?",
        ],
      },
      {
        heading: "Sign 2: You can't say what changed",
        paragraphs: [
          "If you added or removed something recently and can't clearly connect it to a specific reason or a specific result, that's a sign the routine has outpaced your ability to track it. This isn't about diagnosing a reaction — it's simply about whether the routine is legible to you.",
          "Skin Journey in Visage AI compares available measured results across saved analyses. Those differences do not establish which product caused a change, or whether skin improved.",
        ],
      },
      {
        heading: "Sign 3: Steps with no clear purpose",
        paragraphs: [
          "Ask, honestly, why each product is in your routine. \"It was recommended\" or \"I've always used it\" aren't roles — they're history. A step that can't be tied to a current purpose is a candidate to simplify, not because it's doing harm, but because it isn't doing an identifiable job.",
        ],
      },
      {
        heading: "What this isn't",
        paragraphs: [
          "None of this is meant to diagnose irritation, sensitivity, or any skin condition — that's a matter for a dermatologist, not a routine check. This is about whether your routine is legible and intentional, which is a separate question from whether your skin is reacting to something.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does a complicated routine cause skin problems?",
        answer:
          "Routine Check cannot diagnose irritation or skin reactions, or determine whether steps are non-duplicated and purposeful. It checks saved category presence only. For skin conditions or reactions, seek a dermatologist's advice.",
      },
      {
        question: "How many products is too many?",
        answer:
          "There isn't a universal number. The more useful check is whether every product has a distinct, current role — a routine can be long and still be clear, or short and still be confusing.",
      },
      {
        question: "What's the easiest first step to reduce complexity?",
        answer:
          "Identify genuinely duplicated roles first. Consolidating genuine duplication can preserve the intended role while reducing complexity.",
      },
    ],
    hypothesis: "H4",
    cta: {
      heading: "Get a clear read on what you're actually using",
      body: "See a photo-based suggested priority, then separately review your saved routine. Routine Check reports category registration, not whether the whole routine is adequate.",
      label: "Explore Visage AI",
    },
    image: {
      src: "/images/app-landing/496/routine-check.png",
      width: 1080,
      height: 970,
      alt: "Captured Routine Check share card showing saved category registration, not the My Routine editor",
    },
    relatedSlugs: [
      "how-to-simplify-skincare-routine",
      "do-i-need-another-skincare-product",
      "how-to-track-skincare-routine-progress",
    ],
    linkLabel: "the signs a skincare routine has become too complicated",
  },
  {
    slug: "how-to-track-skincare-routine-progress",
    title: "How to Track Skincare Routine Progress Without Guessing",
    description:
      "Reliable tracking means consistent comparisons over time, tied to dates and routine context — not vague impressions. Here's how to do it.",
    h1: "How to Track Skincare Routine Progress",
    shortAnswer:
      "Tracking progress reliably means comparing measurements taken the same way over time, tied to specific dates and to what your routine actually was at the time — not relying on memory or a general sense of \"looking better.\"",
    sections: [
      {
        heading: "Memory is an unreliable baseline",
        paragraphs: [
          "It's hard to accurately recall what your skin looked like a month ago, let alone three months ago — and it's even harder to separate a real change from normal day-to-day variation like sleep, lighting, stress, and weather. Without something dated to compare against, \"progress\" is mostly a feeling, not a measurement.",
        ],
      },
      {
        heading: "Compare like with like",
        paragraphs: [
          "A useful comparison needs some consistency — similar conditions, a similar method, and enough time between checks for a real change to be visible. Comparing a photo from a bright morning against one from a dim evening will show lighting differences more than skin differences.",
        ],
      },
      {
        heading: "Attach dates and routine context, not just images",
        paragraphs: [
          "A photo alone doesn't tell you why anything changed. What makes a comparison useful is knowing when it was taken and what your routine looked like at that point — otherwise, even a real change is hard to attribute to anything.",
          "Skin Journey in Visage AI compares a saved baseline with later available measured results. It does not establish product causation or automatically reconstruct what your routine was at each analysis; keep any routine-change notes separately.",
        ],
      },
      {
        heading: "Be careful with what \"progress\" means",
        paragraphs: [
          "Tracking is about seeing measured differences over time — it isn't a promise that a particular result will happen, or that a specific product caused a specific change. Multiple things affect skin between two check-ins, and an honest comparison acknowledges that rather than crediting one variable outright.",
        ],
      },
    ],
    faqs: [
      {
        question: "How often should I check in to see progress?",
        answer:
          "No fixed interval guarantees a meaningful change. Compare available measured results under similar capture conditions, and treat differences as measurements rather than proof of improvement.",
      },
      {
        question: "Does Visage AI guarantee visible improvement over time?",
        answer:
          "No — it shows measured results across your check-ins so you can see what actually changed, without promising a specific outcome.",
      },
      {
        question: "What if my routine changed between two check-ins?",
        answer:
          "Keep your own dated notes about routine changes. Skin Journey's measured comparison does not establish which change caused a result, and Routine Check does not supply a verified historical usage record.",
      },
    ],
    hypothesis: "H3",
    cta: {
      heading: "Start with a photo-based assessment",
      body: "Start with a photo for a suggested priority based on available measurements. Return later to compare saved measurements in Skin Journey; a difference is not proof of improvement.",
      label: "Explore Visage AI",
    },
    image: {
      src: "/images/app-landing/496/skin-journey.png",
      width: 1146,
      height: 2355,
      alt: "Captured Skin Journey comparison: 47 to 47, with no measurable score change",
    },
    relatedSlugs: [
      "is-my-skincare-routine-enough",
      "how-to-simplify-skincare-routine",
      "skincare-checklist-before-buying",
    ],
    linkLabel: "tracking skincare progress with dated comparisons",
  },
  {
    slug: "skincare-checklist-before-buying",
    title: "Skincare Checklist: What to Check Before Buying Anything New",
    description:
      "A compact, five-point checklist to run through before adding a new skincare product — based on your actual routine coverage, not marketing claims.",
    h1: "A Skincare Checklist Before You Buy",
    shortAnswer:
      "Before buying, check five things: what specific gap you're solving, whether a current product already covers it, whether the new item would replace or duplicate something, whether it maps to a priority you actually have right now, and whether you could confirm coverage without spending anything.",
    sections: [
      {
        heading: "Why check before you buy",
        paragraphs: [
          "Marketing does not know what you have saved in your routine. Reviewing that list can inform a buying decision, but it cannot establish product suitability or replace product research.",
        ],
      },
      {
        heading: "The checklist",
        list: [
          "What specific gap am I trying to solve? Name it precisely, not as a general wish for better skin.",
          "Does something I already own cover that role? Check honestly, not optimistically.",
          "Would this replace a step, or just add another layer on top? Replacing something can be worth it; adding on top of full coverage rarely is.",
          "Does this map to a priority I actually have right now? A product aimed at a concern that isn't currently relevant is easy to postpone.",
          "Could I confirm the gap without spending anything first? Checking your routine costs nothing; buying does.",
        ],
      },
      {
        heading: "If the checklist comes back clear",
        paragraphs: [
          "If a category is already registered, you have confirmed a fact about the saved list. That does not establish whether a concern is addressed. You can still choose not to buy; a purchase is not required to complete the check.",
        ],
      },
      {
        heading: "If a real gap remains",
        paragraphs: [
          "An unlisted category is not proof that you need a product. Consider what you want to change and review product information separately. Routine Check does not guarantee suitability or effects.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I run this checklist for every purchase, even small ones?",
        answer:
          "It takes little effort and mostly prevents adding things that duplicate what you already have, so it's reasonable to use it as a habit, however small the purchase.",
      },
      {
        question: "What if I don't know what's actually in my current routine?",
        answer:
          "My Routine holds the products you save, so keep it up to date yourself. It does not verify actual use. Routine Check checks whether a saved category is listed, not whether products address a priority.",
      },
      {
        question: "Can this checklist replace advice from a dermatologist?",
        answer:
          "No — it's a purchasing checklist about routine coverage, not medical guidance. Skin conditions or reactions are a separate question for a dermatologist.",
      },
    ],
    hypothesis: "H2",
    cta: {
      heading: "Run the checklist against your real routine",
      body: "Start with a photo and a suggested priority, then separately review saved categories. Routine Check does not evaluate products against Today's Priority or determine a purchase need.",
      label: "Explore Visage AI",
    },
    image: {
      src: "/images/app-landing/496/routine-check.png",
      width: 1080,
      height: 970,
      alt: "Captured Routine Check share card: Cleanser not listed in My Routine; category presence only",
    },
    relatedSlugs: [
      "do-i-need-another-skincare-product",
      "is-my-skincare-routine-enough",
      "how-to-track-skincare-routine-progress",
    ],
    linkLabel: "a checklist to run before buying a new skincare product",
  },
];

export function getB2CSearchPage(slug: string): B2CSearchPage | undefined {
  return b2cSearchPages.find((page) => page.slug === slug);
}

export function getRelatedPages(page: B2CSearchPage): B2CSearchPage[] {
  return page.relatedSlugs
    .map((slug) => getB2CSearchPage(slug))
    .filter((related): related is B2CSearchPage => Boolean(related));
}
