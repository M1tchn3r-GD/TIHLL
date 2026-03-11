const TIHLData = {

    rules: [
        {
            category: "Level Requirements",
            items: [
                "Levels must be Hell-themed in design and intent.",
                "Levels must be humanly impossible or near-impossible under normal conditions.",
                "Hack list must be shown before and after any completion attempt.",
                "Levels must be finished or officially confirmed as final versions.",
                "Levels relying solely on broken physics or unintended bugs are disqualified."
            ]
        },
        {
            category: "Submission Standards",
            items: [
                "All submissions must include a Level ID or video showcase.",
                "A written explanation of why the level qualifies is required.",
                "Submissions lacking context or evidence may be rejected without review.",
                "Re-submissions after rejection are allowed if new evidence is provided.",
                "Impersonating a level creator during submission results in a permanent ban."
            ]
        },
        {
            category: "Placement & Ranking",
            items: [
                "Placements are determined solely by TIHLL staff and reviewers.",
                "Theoretical difficulty is used when no completion data exists.",
                "Completion records (TAS, macro, bot) may be referenced but do not affect rank.",
                "Levels may be moved, archived, or removed at any time.",
                "Reworks or major updates to a level trigger a mandatory re-evaluation."
            ]
        },
        {
            category: "Community Conduct",
            items: [
                "Respectful discussion is required at all times.",
                "Harassment, slander, or targeted attacks will result in removal.",
                "Constructive criticism of placements is welcome; personal attacks are not.",
                "Submitting fabricated evidence or fake levels results in a permanent ban.",
                "Staff decisions are final unless a formal appeal is submitted."
            ]
        }
    ],

    categories: [
        {
            name: "Historically Significant",
            tag: "HISTORIC",
            color: "#FFD700",
            description: "Foundational or iconic levels that defined impossible hell design. These cannot be removed from the list."
        },
        {
            name: "Theoretical Placement",
            tag: "THEORY",
            color: "#A78BFA",
            description: "Levels placed based on theoretical difficulty analysis rather than any completion data. Difficulty gap is explicitly noted."
        },
        {
            name: "TAS / Bot Verified",
            tag: "TAS",
            color: "#38BDF8",
            description: "Levels completed only via tool-assisted runs, macros, or bots. Human completion is considered impossible."
        },
        {
            name: "Unverified",
            tag: "UNVERIFIED",
            color: "#FB923C",
            description: "Levels with no completion of any kind on record. Placement is based purely on design analysis."
        },
        {
            name: "Marked for Removal",
            tag: "REMOVAL",
            color: "#F87171",
            description: "Levels flagged for potential removal due to rule violations, reworks, or disqualifying mechanics. Under active review."
        },
        {
            name: "Legacy / Archive",
            tag: "LEGACY",
            color: "#94A3B8",
            description: "Older levels that no longer meet current standards but are preserved for historical and archival purposes."
        }
    ],

    tiers: [
        { id: "upper", label: "Upper TIHLL", color: "#FF1A1A", description: "The absolute pinnacle. Levels that represent the theoretical ceiling of impossible design." },
        { id: "mid",   label: "Mid TIHLL",   color: "#FF6B00", description: "Extreme difficulty. Human completion is practically inconceivable." },
        { id: "lower", label: "Lower TIHLL", color: "#FFB800", description: "Near-impossible. Theoretically completable under perfect conditions only." },
        { id: "legacy",label: "Legacy / Archive", color: "#94A3B8", description: "Preserved for history. No longer actively ranked." }
    ],

    levels: [
        {
            rank: 1,
            name: "Abnormal Reality",
            creator: "M1tchn3r",
            levelID: "UNKNOWN",
            wr: "2% by M1tchn3r",
            verified: false,
            tier: "upper",
            category: "UNVERIFIED",
            cps: "~42 avg",
            frameWindow: "<2f",
            description: "An oppressive, layered hell assault with sub-2-frame timing windows throughout. No consistent route has ever been mapped.",
            tags: ["dual", "wave", "memory"]
        },
        {
            rank: 2,
            name: "Void Protocol",
            creator: "NullShift",
            levelID: "95112847",
            wr: "0% — No attempts",
            verified: false,
            tier: "upper",
            category: "THEORY",
            cps: "~55 peak",
            frameWindow: "<1f",
            description: "A fully theoretical placement. The level's final stretch demands sub-1-frame precision sustained over 12 seconds.",
            tags: ["theory", "wave", "extreme-density"]
        },
        {
            rank: 3,
            name: "Eternal Descent",
            creator: "KhaosEdge",
            levelID: "88204913",
            wr: "0% (TAS: Full) by KhaosEdge",
            verified: true,
            tier: "upper",
            category: "TAS",
            cps: "~38 avg",
            frameWindow: "2–3f",
            description: "TAS-only verified. The dual ship section in the final 15% has never been replicated by any human attempt.",
            tags: ["TAS", "dual-ship", "hell-theme"]
        },
        {
            rank: 4,
            name: "Fracture Point",
            creator: "BreakCore99",
            levelID: "91774302",
            wr: "34% by Absyss",
            verified: false,
            tier: "mid",
            category: "UNVERIFIED",
            cps: "~30 avg",
            frameWindow: "3–4f",
            description: "The highest legitimate human percentage on record for any Upper/Mid TIHLL entry. Placement debated heavily by staff.",
            tags: ["wave", "micro-timing", "hell-theme"]
        },
        {
            rank: 5,
            name: "Hellfire Axiom",
            creator: "PyroVex & DarkScribe",
            levelID: "93841055",
            wr: "0% — Macro: 100% by PyroVex",
            verified: true,
            tier: "mid",
            category: "TAS",
            cps: "~47 avg",
            frameWindow: "<2f",
            description: "A collab hell level. Macro completion exists but the final dual sequence is considered macro-only due to input density.",
            tags: ["collab", "macro", "dual", "density"]
        },
        {
            rank: 6,
            name: "Obsidian Theorem",
            creator: "VoidCraft",
            levelID: "86610029",
            wr: "71% by ShadowMark",
            verified: false,
            tier: "mid",
            category: "UNVERIFIED",
            cps: "~22 avg",
            frameWindow: "4–5f",
            description: "Has seen multiple 70%+ runs. The final corridor is considered the hardest 8 seconds on the entire list.",
            tags: ["corridor", "hell-theme", "late-spike"]
        },
        {
            rank: 7,
            name: "Ashen Collapse",
            creator: "M1tchn3r",
            levelID: "94003871",
            wr: "88% by M1tchn3r",
            verified: false,
            tier: "lower",
            category: "HISTORIC",
            cps: "~18 avg",
            frameWindow: "5–6f",
            description: "One of the first levels designed specifically for TIHLL. Historic status locked. Creator's closest attempt sits at 88%.",
            tags: ["historic", "wave", "hell-theme"]
        },
        {
            rank: 8,
            name: "Red Meridian",
            creator: "Solstice_GD",
            levelID: "90254780",
            wr: "100% (Hack) by Anonymous",
            verified: false,
            tier: "lower",
            category: "UNVERIFIED",
            cps: "~20 avg",
            frameWindow: "5f",
            description: "A hack completion exists but is disputed. No legitimate or TAS run has been submitted. Under review.",
            tags: ["disputed", "hack", "hell-theme"]
        },
        {
            rank: 9,
            name: "Pyroclasm",
            creator: "KhaosEdge",
            levelID: "79944102",
            wr: "100% by KhaosEdge (Macro)",
            verified: true,
            tier: "legacy",
            category: "LEGACY",
            cps: "~15 avg",
            frameWindow: "6–7f",
            description: "An early KhaosEdge creation that shaped the hell list format. Now considered lower-difficulty relative to current entries.",
            tags: ["legacy", "historic", "macro"]
        },
        {
            rank: 10,
            name: "Crimson Static",
            creator: "NullShift",
            levelID: "82103948",
            wr: "100% by ByteRun (TAS)",
            verified: true,
            tier: "legacy",
            category: "LEGACY",
            cps: "~17 avg",
            frameWindow: "5–6f",
            description: "Legacy status. Instrumental in proving TAS verification as a valid archival tool for impossible levels.",
            tags: ["legacy", "TAS", "archival"]
        }
    ],

    questionnaire: [
        "What is the Level Name?",
        "Who is the Creator (or all creators for collabs)?",
        "What is the Level ID?",
        "What bot or tool was used, if any? (e.g., MegaHack, TAS, Macro)",
        "Provide a Proof Link (video, showcase, or bot run).",
        "What is your estimated difficulty tier? (Upper / Mid / Lower / Legacy)",
        "What is the estimated CPS (clicks per second) requirement?",
        "What is the tightest frame window required (in frames)?",
        "Are there any special mechanics? (dual, mini, memory, etc.)",
        "Why does this level qualify for TIHLL specifically?",
        "Has the level been reworked or updated? If so, provide both versions.",
        "Any additional notes or context staff should know?"
    ],

    copyright: [
        "© 2026 TIHLL — The Impossible Hell Levels List.",
        "All original written content, design, and site code are protected.",
        "Geometry Dash and all listed levels belong to their respective creators.",
        "TIHLL is an unofficial fan project. Not affiliated with RobTopGames.",
        "Unauthorized distribution or reproduction without permission is prohibited."
    ]

};
