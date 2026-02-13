const TIHLData = {
    rules: [
        {
            category: "Level Requirements",
            items: [
                "Levels must be 'Hell-themed'. Flickering between paradise and Hell is allowed.",
                "Levels should be humanly impossible. Verified human completions will be marked.",
                "List of hacks must be shown before and after completion.",
                "Levels must be finished or confirmed by the creator."
            ]
        },
        {
            category: "Submission Rules",
            items: [
                "Submit levels through https://forms.gle/jHrVfu5AEfzC57XM9. DMs will be ignored.",
                "Creator must be informed of verification or TAS completion.",
                "Both Impossible levels and Hell Demon levels are allowed.",
                "No joke submissions; physically impossible levels submitted in bad faith result in a mute."
            ]
        },
        {
            category: "List Rating Diff.",
            items: [
                "Ranked based on intended route, solo difficulty, memory/blind, and frames/time per input."
            ]
        },
        {
            category: "Spam Speed Limit (SSl)",
            items: [
                "Max CPS: 1.3407807929943E+154 (65536^32).",
                "Max inputs per frame: 6.7039039649713E+153.",
                "2,147,483,647 CPS sustained for 1,073,741,824+ clicks is not allowed.",
                "In 2-player mode, both players counted separately."
            ]
        },
        {
            category: "Respect & Other Stuff",
            items: [
                "No hate speech, offensive content, or triggering political material. Rated 1–5.",
                "Friendly competition: focus on creativity, not who crashes the game first."
            ]
        },
        {
            category: "Exceptions & Misc.",
            items: [
                "Historically significant levels cannot be removed.",
                "Cannot have abusive CPS after placement.",
                "Must show appreciation, former top rank, or kindness to community."
            ]
        }
    ],

    categories: [
        {
            name: "Historically Significant",
            description: "Iconic/legendary levels; cannot be removed. Must have appreciation, former top rank, or community kindness."
        },
        {
            name: "Verified",
            description: "Humanly possible levels completed legitimately."
        },
        {
            name: "TASBot / Bot-Only",
            description: "Levels only completed by TAS or bot; humans unlikely to finish."
        },
        {
            name: "Impossible",
            description: "Physically impossible for humans; usually bot-only."
        },
        {
            name: "Hell Demon",
            description: "Very difficult but humanly possible levels."
        },
        {
            name: "Abusive Content (1–5)",
            description: "Hate/offensive content rated 1–5 by severity."
        },
        {
            name: "Featured / Special Mention",
            description: "Unique creativity or mechanics; can overlap with other categories."
        },
        {
            name: "Marked for Removal",
            description: "Flagged levels that break rules or submitted in bad faith; remains visible until final review."
        }
    ],

    questionnaire: [
        "Level Name",
        "Creator(s)",
        "Level ID",
        "Is the level final/completed?",
        "Describe the Hell-themed design elements",
        "Intended difficulty rating",
        "Memory-based or blind?",
        "Intended route description",
        "Bot(s) used for completion",
        "Was the level verified as humanly impossible?",
        "Showcase proof before completion",
        "Showcase proof after completion",
        "Number of frames/inputs required",
        "Any hacks beyond bot execution?",
        "Additional notes or special features",
        "Historically significant candidate?",
        "Fun factor / creativity rating (1–10)",
        "Estimated CPS during botted completion",
        "Any multi-player mode? If yes, explain",
        "Featured bot nightmare?"
    ]
};
