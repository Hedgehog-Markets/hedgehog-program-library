import type { Ratio } from "./generated";

/**
 * Reduces a ratio to it's simplest form.
 */
export function reduceRatio(ratio: Ratio): Ratio {
  let { yes, no } = ratio;

  const divisor = gcd(yes, no);

  yes = (yes / divisor) >>> 0;
  no = (no / divisor) >>> 0;

  return { yes, no };
}

// Binary GCD implementation based on:
// https://en.wikipedia.org/wiki/Binary_GCD_algorithm#Implementation
function gcd(u: number, v: number): number {
  u >>>= 0;
  v >>>= 0;

  // gcd(n, 0) = gcd(0, n) = n.
  if (u === 0) {
    return v;
  } else if (v === 0) {
    return u;
  }

  const i = ctz32(u);
  const j = ctz32(v);
  const k = Math.min(i, j);

  // gcd(2ⁱ u, 2ʲ v) = 2ᵏ gcd(u, v) with u, v odd and k = min(i, j).
  // 2ᵏ is the greatest power of two that divides both 2ⁱ u and 2ʲ v.
  u >>>= i;
  v >>>= j;

  for (;;) {
    // u and v are odd at the start of the loop.

    // Swap u and v if necessary so u ≤ v.
    if (u > v) {
      const w = u;
      u = v;
      v = w;
    }

    // gcd(u, v) = gcd(u, v - u) as u ≤ v and u, v are both odd.
    v -= u;
    // v is now even.

    // gcd(u, 0) = u.
    if (v === 0) {
      // Add back the 2ᵏ factor that was removed before the loop.
      return u << k;
    }

    // gcd(u, 2ʲ v) = gcd(u, v) as u is odd.
    v >>>= ctz32(v);
  }
}

// Count trailing zeros.
function ctz32(x: number): number {
  x >>>= 0;

  return x !== 0 ? 31 - Math.clz32(x ^ (x - 1)) : 32;
}
