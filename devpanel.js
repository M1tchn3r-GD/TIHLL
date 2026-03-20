(function () {
    "use strict";

    // ── Config ────────────────────────────────────────────────
    const UNLOCK_SEQUENCE = "qwertyuiopasdfghjklzxcvbnm,./123045607890";       // type this anywhere to open
    const PANEL_VERSION   = "v2.0.1";
    const REQUIRE_CONFIRM = true;         // set true to prompt password too
    const CONFIRM_PASS    = "mnbvcxzlkjhgfdsapoiuytrewq032106540987";       // only used if REQUIRE_CONFIRM = true

    // ── State ─────────────────────────────────────────────────
    let inputBuffer   = "";
    let panelOpen     = false;
    let unlocked      = false;
    let history       = [];
    let historyIndex  = -1;
    let commandLog    = [];

    // ── Inject Styles ─────────────────────────────────────────
    const style = document.createElement("style");
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

        #devpanel-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.65);
            backdrop-filter: blur(4px);
            z-index: 99998;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            padding-bottom: 0;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.25s ease;
        }
        #devpanel-overlay.open {
            opacity: 1;
            pointer-events: all;
        }

        #devpanel {
            width: min(860px, 96vw);
            height: 420px;
            background: #0a0005;
            border: 1px solid rgba(255,26,26,0.5);
            border-bottom: none;
            border-radius: 14px 14px 0 0;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 -8px 60px rgba(255,0,0,0.25), 0 0 0 1px rgba(255,26,26,0.1);
            transform: translateY(100%);
            transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
            font-family: 'Share Tech Mono', monospace;
        }
        #devpanel-overlay.open #devpanel {
            transform: translateY(0);
        }

        /* Titlebar */
        #devpanel-titlebar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 16px;
            background: rgba(255,26,26,0.08);
            border-bottom: 1px solid rgba(255,26,26,0.25);
            user-select: none;
            flex-shrink: 0;
        }
        #devpanel-titlebar .title {
            font-size: 0.78rem;
            letter-spacing: 0.12em;
            color: #FF1A1A;
            text-shadow: 0 0 8px rgba(255,26,26,0.6);
            text-transform: uppercase;
        }
        #devpanel-titlebar .controls {
            display: flex;
            gap: 8px;
            align-items: center;
        }
        #devpanel-titlebar .ctrl-btn {
            width: 12px; height: 12px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            padding: 0;
            transition: opacity 0.15s;
        }
        #devpanel-titlebar .ctrl-btn:hover { opacity: 0.75; }
        .ctrl-close  { background: #FF5F57; }
        .ctrl-mini   { background: #FEBC2E; }
        .ctrl-full   { background: #28C840; }

        /* Output area */
        #devpanel-output {
            flex: 1;
            overflow-y: auto;
            padding: 12px 16px;
            font-size: 0.8rem;
            line-height: 1.7;
            color: #FFBBBB;
            scroll-behavior: smooth;
        }
        #devpanel-output::-webkit-scrollbar { width: 4px; }
        #devpanel-output::-webkit-scrollbar-thumb { background: #440000; border-radius: 2px; }

        .dp-line         { display: block; white-space: pre-wrap; word-break: break-all; }
        .dp-line.cmd     { color: #FF6B6B; }
        .dp-line.cmd::before { content: '> '; color: #FF1A1A; }
        .dp-line.info    { color: #94A3B8; }
        .dp-line.success { color: #4ade80; }
        .dp-line.warn    { color: #FFB800; }
        .dp-line.error   { color: #FF4444; }
        .dp-line.data    { color: #38BDF8; }
        .dp-line.muted   { color: #552222; }
        .dp-line.title   { color: #FF1A1A; font-size: 0.72rem; letter-spacing:0.12em; }
        .dp-line.gap     { height: 6px; display: block; }

        /* Input row */
        #devpanel-inputrow {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 16px;
            border-top: 1px solid rgba(255,26,26,0.2);
            background: rgba(255,26,26,0.03);
            flex-shrink: 0;
        }
        #devpanel-inputrow .prompt {
            color: #FF1A1A;
            font-size: 0.85rem;
            white-space: nowrap;
        }
        #devpanel-input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.82rem;
            color: #FFE8E8;
            caret-color: #FF1A1A;
        }
        #devpanel-input::placeholder { color: #440000; }
        #devpanel-hint {
            font-size: 0.68rem;
            color: #440000;
            letter-spacing: 0.06em;
        }

        /* Unlock toast */
        #devpanel-toast {
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #0a0005;
            border: 1px solid rgba(255,26,26,0.5);
            border-radius: 8px;
            padding: 10px 18px;
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.75rem;
            color: #FF1A1A;
            letter-spacing: 0.1em;
            z-index: 99999;
            opacity: 0;
            transform: translateY(8px);
            transition: opacity 0.2s, transform 0.2s;
            pointer-events: none;
        }
        #devpanel-toast.show {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // ── Build DOM ─────────────────────────────────────────────
    const overlay = document.createElement("div");
    overlay.id = "devpanel-overlay";

    overlay.innerHTML = `
        <div id="devpanel">
            <div id="devpanel-titlebar">
                <span class="title">TIHLL DevPanel ${PANEL_VERSION}</span>
                <div class="controls">
                    <button class="ctrl-btn ctrl-mini"  id="dp-btn-clear" title="Clear output"></button>
                    <button class="ctrl-btn ctrl-full"  id="dp-btn-help"  title="Help"></button>
                    <button class="ctrl-btn ctrl-close" id="dp-btn-close" title="Close (Esc)"></button>
                </div>
            </div>
            <div id="devpanel-output"></div>
            <div id="devpanel-inputrow">
                <span class="prompt">TIHLL ❯</span>
                <input id="devpanel-input" type="text" autocomplete="off" spellcheck="false"
                       placeholder="type a command..." />
                <span id="devpanel-hint">TAB to autocomplete · ↑↓ history · ESC to close</span>
            </div>
        </div>
    `;

    const toast = document.createElement("div");
    toast.id = "devpanel-toast";
    toast.textContent = "[ DEVPANEL UNLOCKED ]";

    document.body.appendChild(overlay);
    document.body.appendChild(toast);

    const output    = document.getElementById("devpanel-output");
    const input     = document.getElementById("devpanel-input");

    // ── Output Helpers ─────────────────────────────────────────
    function print(text, cls = "info") {
        const span = document.createElement("span");
        span.className = `dp-line ${cls}`;
        span.textContent = text;
        output.appendChild(span);
        output.scrollTop = output.scrollHeight;
        commandLog.push({ text, cls });
    }

    function gap() { print("", "gap"); }

    function printTable(rows) {
        rows.forEach(r => print(r, "data"));
    }

    function printBanner() {
        gap();
        print("████████╗██╗██╗  ██╗██╗     ██╗",        "title");
        print("   ██╔══╝██║██║  ██║██║     ██║",        "title");
        print("   ██║   ██║███████║██║     ██║",        "title");
        print("   ██║   ██║██╔══██║██║     ██║",        "title");
        print("   ██║   ██║██║  ██║███████╗███████╗",   "title");
        print("   ╚═╝   ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝",  "title");
        gap();
        print(`  DevPanel ${PANEL_VERSION}  ·  type 'help' for commands`, "muted");
        gap();
    }

    // ── Commands ───────────────────────────────────────────────
    const COMMANDS = {

        help: {
            desc: "List all available commands",
            usage: "help",
            run() {
                gap();
                print("─── AVAILABLE COMMANDS ───────────────────────", "muted");
                Object.entries(COMMANDS).forEach(([name, cmd]) => {
                    print(`  ${name.padEnd(16)} ${cmd.desc}`, "info");
                });
                gap();
                print("  Tip: type any command with no args to see usage.", "muted");
                gap();
            }
        },

        levels: {
            desc: "List all levels with rank, tier, and category",
            usage: "levels",
            run() {
                if (typeof TIHLData === "undefined") return print("TIHLData not found on this page.", "error");
                gap();
                print(`  ${"#".padEnd(4)} ${"NAME".padEnd(22)} ${"TIER".padEnd(8)} ${"CATEGORY".padEnd(14)} WR`, "muted");
                print("  " + "─".repeat(70), "muted");
                TIHLData.levels.forEach(l => {
                    print(`  ${String(l.rank).padEnd(4)} ${l.name.padEnd(22)} ${l.tier.padEnd(8)} ${l.category.padEnd(14)} ${l.wr}`, "data");
                });
                gap();
                print(`  Total: ${TIHLData.levels.length} levels`, "success");
                gap();
            }
        },

        level: {
            desc: "Show full details for one level by rank",
            usage: "level <rank>",
            run(args) {
                if (!args[0]) return print("Usage: level <rank>", "warn");
                if (typeof TIHLData === "undefined") return print("TIHLData not found.", "error");
                const rank = parseInt(args[0]);
                const l = TIHLData.levels.find(x => x.rank === rank);
                if (!l) return print(`No level found at rank #${rank}`, "error");
                gap();
                print(`  ── #${l.rank} ${l.name} ──────────────────────`, "title");
                print(`  Creator      : ${l.creator}`,     "data");
                print(`  Level ID     : ${l.levelID}`,     "data");
                print(`  Tier         : ${l.tier}`,        "data");
                print(`  Category     : ${l.category}`,    "data");
                print(`  WR           : ${l.wr}`,          "data");
                print(`  Verified     : ${l.verified}`,    l.verified ? "success" : "warn");
                print(`  CPS          : ${l.cps}`,         "data");
                print(`  Frame Window : ${l.frameWindow}`, "data");
                print(`  Tags         : ${(l.tags||[]).join(", ")}`, "data");
                gap();
                print(`  "${l.description}"`, "info");
                gap();
            }
        },

        search: {
            desc: "Search levels by name, creator, or tag",
            usage: "search <query>",
            run(args) {
                if (!args[0]) return print("Usage: search <query>", "warn");
                if (typeof TIHLData === "undefined") return print("TIHLData not found.", "error");
                const q = args.join(" ").toLowerCase();
                const results = TIHLData.levels.filter(l =>
                    l.name.toLowerCase().includes(q) ||
                    l.creator.toLowerCase().includes(q) ||
                    (l.tags||[]).some(t => t.toLowerCase().includes(q)) ||
                    l.description.toLowerCase().includes(q)
                );
                gap();
                if (results.length === 0) {
                    print(`  No results for "${args.join(" ")}"`, "warn");
                } else {
                    print(`  Found ${results.length} result(s):`, "success");
                    results.forEach(l => print(`  #${l.rank} — ${l.name} (${l.creator}) [${l.tier}]`, "data"));
                }
                gap();
            }
        },

        stats: {
            desc: "Show list statistics",
            usage: "stats",
            run() {
                if (typeof TIHLData === "undefined") return print("TIHLData not found.", "error");
                const lvls = TIHLData.levels;
                gap();
                print("  ── LIST STATS ─────────────────────────────", "muted");
                print(`  Total Levels   : ${lvls.length}`, "data");
                TIHLData.tiers.forEach(t => {
                    const n = lvls.filter(l => l.tier === t.id).length;
                    print(`  ${t.label.padEnd(16)}: ${n}`, "data");
                });
                gap();
                print("  ── CATEGORIES ─────────────────────────────", "muted");
                TIHLData.categories.forEach(c => {
                    const n = lvls.filter(l => l.category === c.tag).length;
                    print(`  ${c.tag.padEnd(16)}: ${n}`, "data");
                });
                gap();
                const verified   = lvls.filter(l => l.verified).length;
                const unverified = lvls.filter(l => !l.verified).length;
                print(`  Verified       : ${verified}`,   "success");
                print(`  Unverified     : ${unverified}`, "warn");
                gap();
            }
        },

        setwr: {
            desc: "Update the WR string for a level (by rank)",
            usage: "setwr <rank> <new WR string>",
            run(args) {
                if (typeof TIHLData === "undefined") return print("TIHLData not found.", "error");
                if (args.length < 2) return print("Usage: setwr <rank> <new WR string>", "warn");
                const rank = parseInt(args[0]);
                const l = TIHLData.levels.find(x => x.rank === rank);
                if (!l) return print(`No level at rank #${rank}`, "error");
                const old = l.wr;
                l.wr = args.slice(1).join(" ");
                print(`  #${rank} ${l.name}`, "success");
                print(`  WR updated: "${old}" → "${l.wr}"`, "success");
                gap();
            }
        },

        verify: {
            desc: "Toggle verified status of a level by rank",
            usage: "verify <rank>",
            run(args) {
                if (typeof TIHLData === "undefined") return print("TIHLData not found.", "error");
                if (!args[0]) return print("Usage: verify <rank>", "warn");
                const rank = parseInt(args[0]);
                const l = TIHLData.levels.find(x => x.rank === rank);
                if (!l) return print(`No level at rank #${rank}`, "error");
                l.verified = !l.verified;
                print(`  #${rank} ${l.name} → verified: ${l.verified}`, l.verified ? "success" : "warn");
                gap();
            }
        },

        export: {
            desc: "Export current TIHLData.levels as JSON to clipboard",
            usage: "export",
            async run() {
                if (typeof TIHLData === "undefined") return print("TIHLData not found.", "error");
                const json = JSON.stringify(TIHLData.levels, null, 2);
                try {
                    await navigator.clipboard.writeText(json);
                    print("  Copied to clipboard!", "success");
                } catch {
                    print("  Clipboard unavailable. Logging to console instead.", "warn");
                    console.log("[TIHLL DevPanel] levels export:\n", json);
                }
                print(`  ${TIHLData.levels.length} levels exported.`, "data");
                gap();
            }
        },

        reload: {
            desc: "Reload the current page",
            usage: "reload",
            run() {
                print("  Reloading...", "warn");
                setTimeout(() => location.reload(), 500);
            }
        },

        goto: {
            desc: "Navigate to index or list page",
            usage: "goto <index|list>",
            run(args) {
                const dest = (args[0] || "").toLowerCase();
                if (dest === "index") { location.href = "index.html"; }
                else if (dest === "list") { location.href = "list.html"; } 
                else { print("Usage: goto <index|list>", "warn"); }
            }
        },

        log: {
            desc: "Show devpanel session command log",
            usage: "log",
            run() {
                gap();
                if (commandLog.length === 0) return print("  No log yet.", "muted");
                commandLog.forEach((entry, i) => {
                    print(`  [${String(i).padStart(3,"0")}] ${entry.text}`, "muted");
                });
                gap();
            }
        },

        clear: {
            desc: "Clear devpanel output",
            usage: "clear",
            run() {
                output.innerHTML = "";
                commandLog = [];
            }
        },

        close: {
            desc: "Close the devpanel",
            usage: "close",
            run() { closePanel(); }
        }
    };

    // ── Command Execution ──────────────────────────────────────
    function exec(raw) {
        const trimmed = raw.trim();
        if (!trimmed) return;

        history.unshift(trimmed);
        historyIndex = -1;

        print(trimmed, "cmd");

        const parts = trimmed.split(/\s+/);
        const name  = parts[0].toLowerCase();
        const args  = parts.slice(1);

        if (COMMANDS[name]) {
            try { COMMANDS[name].run(args); }
            catch (e) { print(`  Runtime error: ${e.message}`, "error"); }
        } else {
            print(`  Unknown command: "${name}" — type 'help' for a list.`, "error");
            gap();
        }
    }

    // ── Panel Open / Close ─────────────────────────────────────
    function openPanel() {
        panelOpen = true;
        overlay.classList.add("open");
        setTimeout(() => input.focus(), 320);
    }

    function closePanel() {
        panelOpen = false;
        overlay.classList.remove("open");
        input.blur();
    }

    function showToast() {
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2200);
    }

    // ── Key Listener — sequence detection ─────────────────────
    document.addEventListener("keydown", (e) => {
        // Don't capture if typing in an existing input/textarea (unless it's our panel)
        const tag = document.activeElement.tagName;
        if ((tag === "INPUT" || tag === "TEXTAREA") && document.activeElement.id !== "devpanel-input") return;

        if (panelOpen) return; // panel handles its own input

        inputBuffer += e.key.toLowerCase();
        if (inputBuffer.length > UNLOCK_SEQUENCE.length) {
            inputBuffer = inputBuffer.slice(-UNLOCK_SEQUENCE.length);
        }

        if (inputBuffer === UNLOCK_SEQUENCE) {
            inputBuffer = "";

            if (!unlocked) {
                unlocked = true;
                console.log(
                    "%c[TIHLL DevPanel] Unlocked.",
                    "color:#FF1A1A; font-family:monospace; font-weight:bold;"
                );
                showToast();
                openPanel();
                printBanner();
                COMMANDS.stats.run([]);
            } else {
                openPanel();
            }

            if (REQUIRE_CONFIRM && !sessionStorage.getItem("tihll_dp_auth")) {
                const pass = prompt("DevPanel password:");
                if (pass !== CONFIRM_PASS) {
                    closePanel();
                    unlocked = false;
                    return;
                }
                sessionStorage.setItem("tihll_dp_auth", "1");
            }
        }
    });

    // ── Panel Input Handling ───────────────────────────────────
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            exec(input.value);
            input.value = "";
            historyIndex = -1;
        }
        else if (e.key === "Escape") {
            closePanel();
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (historyIndex < history.length - 1) {
                historyIndex++;
                input.value = history[historyIndex];
            }
        }
        else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = history[historyIndex];
            } else {
                historyIndex = -1;
                input.value = "";
            }
        }
        else if (e.key === "Tab") {
            e.preventDefault();
            const partial = input.value.trim().toLowerCase();
            const matches = Object.keys(COMMANDS).filter(c => c.startsWith(partial));
            if (matches.length === 1) {
                input.value = matches[0] + " ";
            } else if (matches.length > 1) {
                gap();
                print("  " + matches.join("   "), "muted");
            }
        }
        e.stopPropagation();
    });

    // ── Titlebar Buttons ───────────────────────────────────────
    document.getElementById("dp-btn-close").addEventListener("click", closePanel);
    document.getElementById("dp-btn-clear").addEventListener("click", () => COMMANDS.clear.run());
    document.getElementById("dp-btn-help").addEventListener("click", () => {
        COMMANDS.help.run();
        input.focus();
    });

    // Close on overlay background click
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closePanel();
    });

    // ── Console hint (always visible on page load) ─────────────
    console.log(
        "%c[TIHLL DevPanel] Loaded. Type the unlock sequence on the page to open.",
        "color:#660000; font-family:monospace; font-size:11px;"
    );

})();