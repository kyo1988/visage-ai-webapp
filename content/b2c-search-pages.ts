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
    title: "Is My Skincare Routine Enough? Here's How to Tell",
    description:
      "\"Enough\" isn't about how many steps you use — it's about whether your routine covers what you're actually prioritizing right now. Here's a straightforward way to check.",
    h1: "Is My Skincare Routine Enough?",
    shortAnswer:
      "Your routine is enough when it already covers the one thing you're prioritizing right now — it isn't a function of how many products are on your shelf. To find out, name your current priority first, then check whether something you already use is actually addressing it.",
    sections: [
      {
        heading: "\"Enough\" is about coverage, not count",
        paragraphs: [
          "It's tempting to judge a routine by how many steps it has — three products feels minimal, ten feels thorough. But step count doesn't tell you anything about whether those steps are doing the right job. A five-step routine that covers your actual priority is enough. A ten-step routine that doesn't touch it isn't.",
          "The more useful question isn't \"how much am I doing,\" it's \"is what I'm doing pointed at the right thing.\"",
        ],
      },
      {
        heading: "Start by naming one priority",
        paragraphs: [
          "Before you can judge whether a routine is enough, you need to know what it's supposed to be enough for. Skin priorities shift — with season, sleep, stress, and sun exposure — so the honest starting point is figuring out what actually matters today, rather than defaulting to whatever you focused on last year.",
          "This is the first step in how Visage AI approaches it: a photo-based check that surfaces one clear priority instead of a long list of scores to interpret yourself.",
        ],
      },
      {
        heading: "Then check what you already use against it",
        paragraphs: [
          "Once you know the priority, look at your current products one by one and ask whether any of them is actually built to address it — not adjacent to it, not \"probably helps,\" but actually doing that job.",
          "If something already covers it, your routine is enough for that priority, even if the routine looks simple from the outside. If nothing does, that's a real gap — but it's a specific, nameable one, not a vague sense that you should \"do more.\"",
        ],
      },
      {
        heading: "Enough today doesn't mean enough forever",
        paragraphs: [
          "Because priorities change, \"enough\" is worth re-checking periodically rather than deciding once and forgetting about it. That doesn't mean adding something new every time you check — often the answer is that your current routine still holds up, and no action is needed.",
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
          "It helps to look at your skin's current state rather than guess from memory. Visage AI's photo-based check is built for exactly this — it surfaces one priority based on today's analysis instead of asking you to self-diagnose.",
      },
      {
        question: "What if my routine covers my priority but I still feel unsure?",
        answer:
          "That's normal, and it's also a reasonable time to do nothing new. \"No extra purchase needed\" is a legitimate outcome, not a failure to find something to buy.",
      },
    ],
    hypothesis: "H4",
    cta: {
      heading: "Check your own routine against today's priority",
      body: "Take a photo in Visage AI to see one clear priority, then check whether your current routine already covers it.",
      label: "Check My Routine",
    },
    image: {
      src: "/images/app-landing/priority.png",
      alt: "Visage AI analysis result highlighting a single, clear skin priority",
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
          "This is the core idea behind Visage AI's routine check: before suggesting anything new, it looks at what you already use and whether it already covers the priority at hand.",
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
          "That's exactly what a routine check is for. Visage AI compares your stated priority against what you've logged in My Routine and tells you plainly whether it's already covered.",
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
      body: "See whether your current routine already covers the gap before you add anything new.",
      label: "Check Before I Buy",
    },
    image: {
      src: "/images/app-landing/routine-covered.png",
      alt: "Visage AI screen showing a routine that already covers the relevant category",
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
          "This is the same idea behind My Routine in Visage AI: it reflects what you're actually using today, not an idealized list, so the roles you see are grounded in reality rather than good intentions.",
        ],
      },
      {
        heading: "Cut duplication first",
        paragraphs: [
          "A common source of an overcomplicated routine is the same role being covered more than once. Two products doing the same job add steps and cost without adding coverage. Once you've listed roles, genuine duplication can be a practical place to simplify.",
        ],
      },
      {
        heading: "Keep what maps to a current priority",
        paragraphs: [
          "After removing duplication, check the remaining products against what you're actually prioritizing right now. A step that once mattered but no longer maps to a current priority is a reasonable candidate to pause, even if it isn't hurting anything.",
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
      heading: "See your current routine's roles laid out plainly",
      body: "My Routine in Visage AI reflects what you're actually using today, so simplifying starts from what's real.",
      label: "See My Routine",
    },
    image: {
      src: "/images/app-landing/my-routine.png",
      alt: "Visage AI My Routine screen listing current products by role",
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
          "This is where dated, before-and-after comparisons help more than memory does. Skin Journey in Visage AI keeps measured results attached to dates, so you're comparing against an actual record instead of a recollection.",
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
          "That's not something a routine check can tell you — irritation and skin reactions are medical questions best handled by a dermatologist. What a routine check can tell you is whether your steps are clear, non-duplicated, and purposeful.",
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
      body: "Visage AI lays out your current routine and priority in plain terms, so you can judge complexity from clarity, not guesswork.",
      label: "Check My Routine",
    },
    image: {
      src: "/images/app-landing/my-routine.png",
      alt: "Visage AI My Routine screen listing current products for review",
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
          "This is what Skin Journey in Visage AI is built around: it keeps your measured results tied to dates, so a first analysis and a later one can be compared directly, in context, rather than from memory.",
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
          "Frequent enough to catch real change, but not so frequent that you're comparing noise to noise. Spacing check-ins by several weeks tends to give a more meaningful comparison than day-to-day tracking.",
      },
      {
        question: "Does Visage AI guarantee visible improvement over time?",
        answer:
          "No — it shows measured results across your check-ins so you can see what actually changed, without promising a specific outcome.",
      },
      {
        question: "What if my routine changed between two check-ins?",
        answer:
          "That's exactly why routine context matters alongside the dates. Knowing what you were using at each point makes the comparison meaningful instead of ambiguous.",
      },
    ],
    hypothesis: "H3",
    cta: {
      heading: "Start a comparison you can trust",
      body: "Skin Journey keeps your measured results tied to dates, so your next check-in is a real comparison, not a guess.",
      label: "Start My Skin Journey",
    },
    image: {
      src: "/images/app-landing/skin-journey.png",
      alt: "Visage AI Skin Journey comparing a first and latest measurement",
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
          "Marketing describes what a product could theoretically do; it doesn't know what's already in your routine. A short checklist run against your own routine catches most unnecessary purchases before they happen — no product research required.",
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
          "If your current routine already covers the gap, the checklist has done its job — the answer is that you don't need to buy anything right now. That's a valid, complete outcome, not an incomplete one.",
        ],
      },
      {
        heading: "If a real gap remains",
        paragraphs: [
          "When the checklist surfaces a specific, currently relevant gap that nothing you own addresses, that's a reasonable basis to consider a product, because it's tied to something concrete, not a hunch.",
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
          "That's worth sorting out first. My Routine in Visage AI keeps a plain list of what you're actually using, so the checklist has something concrete to check against.",
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
      body: "Visage AI checks your current products against today's priority, so you know before you buy.",
      label: "Check Before I Buy",
    },
    image: {
      src: "/images/app-landing/routine-covered.png",
      alt: "Visage AI screen showing a routine that already covers the relevant category",
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
