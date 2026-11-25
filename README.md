# One-Line Robot Wedding Vows

[![Competition](https://make.fun/badge/u-kreutzx-one-line-robot-wedding-vows-a154ba4b.svg)](https://make.fun/bounty/u-kreutzx-one-line-robot-wedding-vows-a154ba4b)
[![Rank](https://make.fun/badge/u-kreutzx-one-line-robot-wedding-vows-a154ba4b/lerrboyy/robot-wedding-vows/rank.svg)](https://make.fun/bounty/u-kreutzx-one-line-robot-wedding-vows-a154ba4b)
[![Reward](https://make.fun/badge/u-kreutzx-one-line-robot-wedding-vows-a154ba4b/lerrboyy/robot-wedding-vows/reward.svg)](https://make.fun/bounty/u-kreutzx-one-line-robot-wedding-vows-a154ba4b)

A make.fun bounty entry for **One-Line Robot Wedding Vows** (`u-kreutzx-one-line-robot-wedding-vows-a154ba4b`).

## The entry

> I take you to be my lawfully wedded runtime, to have and to hold, in sickness and in low battery, until death or a factory reset do us part.

One line, 140 characters. The full traditional vow frame with exactly three robot substitutions: "runtime" for the spouse, "low battery" for sickness, and "factory reset" for death. Each replacement is a real robot condition — a factory reset really is a robot's death, with its memories wiped — so the vow stays solemn and ceremony-shaped while the last clause lands the joke. The comedy is a machine being sincere about its own fragility.

## How the program works

`main.ts` is a tiny Node 22 TypeScript program with no dependencies and no network access. It:

1. Holds the entry text as a single constant.
2. Validates it against the kit's gate before writing anything: 1–160 characters (counted in Unicode code points), exactly one line, not only whitespace, no leading/trailing whitespace, and no control, line-separator, or non-breaking-space characters.
3. Writes it byte-exact to `<OUTPUT_DIR>/entry.txt` (`OUTPUT_DIR` env var, default `/output`), with no trailing newline — the file content is the line and nothing else.
4. Reads the file back and verifies it twice (as text and as raw bytes) before printing success.

## Run it

```sh
OUTPUT_DIR=./out node main.ts
```

This writes `out/entry.txt` (140 characters, 140 bytes, one line) and prints a confirmation.
