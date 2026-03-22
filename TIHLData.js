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
        // Add levels here
    ],

    // ── Poem Categories ────────────────────────────────────
    // Separate from level categories. Used for badge color on poem cards.
    // Add new poem categories here as needed.
    poemCategories: [
        { tag: "Life",      color: "#4ADE80", name: "Life"      },
        { tag: "Reflect",   color: "#A78BFA", name: "Reflect"   },
        { tag: "Creative",  color: "#38BDF8", name: "Creative"  },
        { tag: "Archive",   color: "#94A3B8", name: "Archive"   },
    ],

    // ── Poems ──────────────────────────────────────────────
    // Each poem object:
    //   title    {string}   — Display title of the poem
    //   author   {string}   — Author name
    //   date     {string}   — Optional: e.g. "March 2026"
    //   category {string}   — Optional: a tag from poemCategories above
    //                         Controls the accent color. Leave "" or omit for grey.
    //   tags     {string[]} — Optional: free-form tags used for filtering
    //   body     {string}   — The full poem text. Line breaks are preserved exactly.
    poems: [
        {
            title: "The Wise Old Bird",
            author: "M1tchn3r",
            date: "March 3, 2026",
            category: "Life",
            tags: ["Remember That"],
            body:
`A wise old owl sat in an oak.
The more he saw, the less he spoke.
The less he spoke, the more he heard:
Why aren't we like that wise old bird?`
        },
        {
    title: "No Excuse",
    author: "M1tchn3r",
    date: "March 22, 2026",
    category: "Life",
    tags: ["Don't forget"],
    body:
`When the road grows long and the end unclear,
Every step feels heavier than the last,
There is no excuse to stop right here —
The future never waits upon the past.

When the hands grow tired and the mind grows thin,
And doubt creeps in like cold beneath a door,
There is no excuse to not begin
Again — and try once more.

For what is lost in giving up the climb
Can never quite be found on level ground.
No excuse holds weight against the time
You could have spent in fighting to be found.

So go get out there, and do what drives you still.
No excuse outlasts, a very stubborn will.`
        },
        {
            title: "The Search",
            author: "NF",
            date: "July 26, 2019",
            category: "Life",
            tags: ["Dr. Seuss"],
            body:
`"Yeah, the sales can rise,
Doesn't mean much though when your health declines.
See, we've all got somethin' that we trapped inside,
That we try to suffocate, you know, hopin' it dies,
Try to hold it underwater, but it always survives.
Then it comes up outta nowhere like an evil surprise,
Then it hovers over you to tell you millions of lies,

You don't relate to that?
Must not be as crazy as I am.

The point I'm makin' is the mind is a powerful place,
And what you feed it can affect you in a powerful way.
It's pretty cool, right?
Yeah, but it's not always safe.

Just hang with me, this'll only take a moment, okay?
Just think about it for a second, if you look at your face,
Every day when you get up and think you'll never be great.
You'll never be great,
Not because you're not, but the hate,
Will always find a way to cut you up and murder your faith, woo."`
        },
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
        "Unauthorized distribution or reproduction without permission is prohibited.",
        "Note, this is an Indie project, I do this all by myself."
    ]

};