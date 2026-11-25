// One-Line Robot Wedding Vows — make.fun entry
// Writes a single line of robot wedding vows to <OUTPUT_DIR>/entry.txt.
// Node 22, no dependencies, no network.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: the full traditional vow frame with three robot substitutions —
// "runtime" for the spouse, "low battery" for sickness, "factory reset" for
// death. A factory reset is a robot's death with its memories wiped, which
// is the saddest and funniest version of "till death do us part".
const ENTRY =
  "I take you to be my lawfully wedded runtime, to have and to hold, " +
  "in sickness and in low battery, until death or a factory reset do us part.";

// The kit gate: /output/entry.txt must be UTF-8 text of 1 to 160
// characters, not only whitespace.
const MIN_CHARS = 1;
const MAX_CHARS = 160;

function fail(message: string): never {
  throw new Error(`robot-wedding-vows: ${message}`);
}

function validate(text: string): void {
  // Count Unicode code points, not UTF-16 code units, so the count matches
  // what a human (and the sealed scorer) sees.
  const chars = [...text];
  if (chars.length < MIN_CHARS || chars.length > MAX_CHARS) {
    fail(`entry is ${chars.length} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`);
  }
  if (text.trim().length === 0) {
    fail("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    fail("entry must not have leading or trailing whitespace");
  }
  // Single line: no line breaks, no other control characters, and no
  // Unicode line/paragraph separators either. Also reject the non-breaking
  // space, which looks like a space but would break the "not only
  // whitespace" reading and the aloud rhythm of the vow.
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    if (code < 0x20 || code === 0x7f || ch === "\u2028" || ch === "\u2029" || ch === "\u00a0") {
      fail(`entry contains a forbidden character U+${code.toString(16).toUpperCase().padStart(4, "0")}`);
    }
  }
  if (text.includes("\n") || text.includes("\r")) {
    fail("entry must be a single line");
  }
}

function main(): void {
  validate(ENTRY);

  const outputDir = process.env.OUTPUT_DIR ?? "/output";
  if (outputDir.trim().length === 0) {
    fail("OUTPUT_DIR must not be empty");
  }
  // Create the output directory if needed. Never remove it: on the grader
  // it is a mount point, so only its contents may ever be cleared.
  mkdirSync(outputDir, { recursive: true });

  const outPath = join(outputDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");

  // Read the file back and verify it byte-for-byte before reporting success:
  // first as text, then as raw bytes, so an encoding surprise cannot slip
  // through (e.g. a BOM or a newline added by the writer).
  const written = readFileSync(outPath, "utf8");
  if (written !== ENTRY) {
    fail("verification failed: entry.txt does not match the entry exactly");
  }
  if (!readFileSync(outPath).equals(Buffer.from(ENTRY, "utf8"))) {
    fail("verification failed: entry.txt bytes do not match the entry exactly");
  }
  const bytes = Buffer.byteLength(written, "utf8");
  console.log(
    `wrote ${outPath}: ${[...ENTRY].length} characters, ${bytes} bytes, single line, no trailing newline`,
  );
}

main();
