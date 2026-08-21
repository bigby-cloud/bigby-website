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

/**
 * Every annual price is 5/6 of its monthly price, so a year up front costs the
 * same as ten months paid monthly. Worked out here rather than hard-coded so
 * the badge cannot drift away from the numbers above.
 */
export const annualSavingPercent = Math.round(
  (1 - tiers[0].files.annual / tiers[0].files.monthly) * 100,
);

/** What a year on annual billing saves against twelve months paid monthly. */
export const yearlySaving = (price: Price) => (price.monthly - price.annual) * 12;

/** Whole pounds lose the trailing zeroes, so £24.00 reads as £24. */
export const formatSaving = (value: number) =>
  Number.isInteger(value) ? `£${value}` : `£${value.toFixed(2)}`;
