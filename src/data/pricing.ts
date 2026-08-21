// Single source of truth for plan pricing. The pricing table, the plain-text
// price list and the Product schema all read from here, so a price change only
// ever needs making once.
//
// Annual figures are the per-user, per-month equivalent when billed yearly.
// Monthly figures are per user per month when billed monthly. Annual is the
// price we lead with everywhere.

export interface Price {
  annual: number;
  monthly: number;
}

export interface Tier {
  /** Storage per user, as shown on the size buttons. */
  label: string;
  /** Pill above the size button, or null for no pill. */
  badge: string | null;
  files: Price;
  office: Price;
  groups: Price;
}

export const tiers: Tier[] = [
  {
    label: '100 GB',
    badge: 'From £3.99',
    files: { annual: 3.99, monthly: 4.79 },
    office: { annual: 5.99, monthly: 7.19 },
    groups: { annual: 4.99, monthly: 5.99 },
  },
  {
    label: '500 GB',
    badge: null,
    files: { annual: 6.99, monthly: 8.39 },
    office: { annual: 9.99, monthly: 11.99 },
    groups: { annual: 7.99, monthly: 9.59 },
  },
  {
    label: '1 TB',
    badge: null,
    files: { annual: 9.99, monthly: 11.99 },
    office: { annual: 12.99, monthly: 15.59 },
    groups: { annual: 11.99, monthly: 14.39 },
  },
];

export const topUp = {
  label: '+100 GB',
  annual: 1.49,
  monthly: 1.79,
};

export type PlanKey = 'files' | 'office' | 'groups';

export const planNames: Record<PlanKey, string> = {
  files: 'Just Files',
  office: 'Office',
  groups: 'Groups & Business',
};

/** Plan order used by the price list and the schema. */
export const planKeys: PlanKey[] = ['files', 'office', 'groups'];

export const formatPrice = (value: number) => `£${value.toFixed(2)}`;

const allPrices: Price[] = [...tiers.flatMap((tier) => planKeys.map((plan) => tier[plan])), topUp];

/** Months of monthly billing that a year paid up front saves you. */
const monthsFree = (price: Price) => ((price.monthly - price.annual) * 12) / price.monthly;

/**
 * Every monthly price is its annual price plus a fifth, rounded up to the
 * penny, so paying for a year up front costs the same as ten months paid
 * monthly. That is what lets one claim stand for every plan on the page.
 *
 * It only holds while the prices stay in step. If one of them is ever changed
 * on its own, the claim quietly becomes wrong for the others, and nothing on
 * the page would show it. So check it here and break the build instead.
 */
export const ANNUAL_MONTHS_FREE = 2;

const drift = allPrices.map((price) => Math.abs(monthsFree(price) - ANNUAL_MONTHS_FREE));
const worstDrift = Math.max(...drift);

if (worstDrift > 0.05) {
  throw new Error(
    `Pricing: annual billing no longer saves ${ANNUAL_MONTHS_FREE} months on every plan ` +
      `(worst case is off by ${worstDrift.toFixed(3)} months). Either bring the prices back ` +
      `into step or change the saving claim in PricingTable.astro and drive.astro to match.`,
  );
}

/** What a year on annual billing saves against twelve months paid monthly. */
export const yearlySaving = (price: Price) => (price.monthly - price.annual) * 12;

/** Whole pounds lose the trailing zeroes, so £24.00 reads as £24. */
export const formatSaving = (value: number) =>
  Number.isInteger(value) ? `£${value}` : `£${value.toFixed(2)}`;
