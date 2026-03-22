import assert from "node:assert/strict";
import { createRequire } from "node:module";

function makeSeededRng(seed) {
  let state = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    state ^= seed.charCodeAt(i);
    state = Math.imul(state, 16777619) >>> 0;
  }

  return function rng() {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

// The library expects `new Math.seedrandom(name)` to return a rng function.
Math.seedrandom = function SeedRandom(seed) {
  return makeSeededRng(String(seed));
};

const require = createRequire(import.meta.url);
const CjsCircIdenticon = require("../js/circidenticon.js");
const esmModule = await import("../js/circidenticon.esm.mjs");
const EsmCircIdenticon = esmModule.default;

const sampleNames = ["alice", "bob", "circidenticon", "123456"];

for (const name of sampleNames) {
  const cjs1 = new CjsCircIdenticon(name).buildSVG();
  const cjs2 = new CjsCircIdenticon(name).buildSVG();
  const esm1 = new EsmCircIdenticon(name).buildSVG();
  const esm2 = new EsmCircIdenticon(name).buildSVG();

  assert.equal(cjs1, cjs2, `CJS output should be deterministic for ${name}`);
  assert.equal(esm1, esm2, `ESM output should be deterministic for ${name}`);
  assert.equal(cjs1, esm1, `CJS and ESM output should match for ${name}`);
  assert.ok(cjs1.startsWith("<svg"), "SVG should start with <svg");
  assert.ok(cjs1.endsWith("</svg>"), "SVG should end with </svg>");
}

console.log("Smoke test passed: CommonJS and ESM outputs are deterministic and equivalent.");
