# Copilot Instructions

## Project Snapshot
- Single-page calculator served statically; open [index.html](../index.html) in a browser or run any static server (e.g., VS Code Live Server). No bundlers, builds, or package managers.
- UI is pure HTML/CSS; calculator logic sits entirely in [script.js](../script.js). Keep assets framework-free and avoid introducing tooling unless explicitly asked.

## DOM Structure
- Buttons live inside the `#input` section ([index.html](../index.html#L11-L33)). Event delegation relies on `data-action` / `data-value`; add new controls by following this pattern so the existing click handler picks them up.
- Output is split between `#expression` and `#result`. Always update both through `updateDisplay()` to keep the UI consistent.

## Calculator Logic Patterns
- All button clicks funnel through `buttonClick()` with a switch on `action`. When introducing a new behavior, add a `case` and implement the helper near similar utilities for readability.
- `expression` holds the typed formula, `result` stores the evaluated number. Evaluation always resets `expression` but leaves `result` available so operations can chain via `startFromResult()`.
- Expression evaluation uses `eval()`. Inputs are limited to button presses, so the string stays safe; avoid accepting free-form text without adding validation.
- Decimal handling is custom (`addValue()` + `decimal()`), preventing duplicate dots within the active operand. Reuse these helpers instead of manipulating strings ad hoc.
- `evaluateExpression()` normalizes outputs: values < 1 get up to 10 decimal places, otherwise 2. Match this rounding if you expose results elsewhere.
- Percentage, negate, and operator-guard logic assumes `expression` contains no trailing operators. Use `isLastCharOperator()` before appending new operators to avoid syntax errors.

## Styling Notes
- Layout is a two-section flex column. Buttons share the `.btn` base plus color modifiers (`.light`, `.dark`, `.blue`). Keep new styles in [style.css](../style.css) aligned with this scheme to preserve spacing (`flex-basis: calc(25% - 10px)`).
- Colors rely on hover states for feedback; add focus styles alongside hover for accessibility when adding themes.

## Working Practices
- Manual testing is the norm: refresh the browser, click through scenarios (negatives, decimals, chained ops, divide-by-zero). Document any new edge cases in README if behavior changes.
- Keep README minimal but up to date (currently just a title). If you add workflows or features, summarize them there so future agents have context.
- When touching JS, run a quick pass with browser devtools console (no lint config is present). Prefer vanilla syntax compatible with evergreen browsers.

## Quick Start Checklist
1. Modify markup/styles directly; no build step.
2. Wire new buttons via `data-action` and extend the switch in `buttonClick()`.
3. Use `updateDisplay()` after any state mutation.
4. Re-test core flows: clear, backspace, chained ops, decimals, negate, percent, divide-by-zero.
