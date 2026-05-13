export type SiteTypeId = 'brochure' | 'business' | 'ecommerce' | 'custom';
export type FeatureId =
  | 'cms'
  | 'blog'
  | 'booking'
  | 'payments'
  | 'multilang'
  | 'newsletter'
  | 'seo'
  | 'animations'
  | 'analytics';

export type SiteTypeOption = {
  id: SiteTypeId;
  label: string;
  description: string;
  basePrice: number;
};

export type FeatureOption = {
  id: FeatureId;
  label: string;
  price: number;
};

export type TierMatch = {
  slug: 'starter' | 'business' | 'custom';
  label: string;
  displayPrice: number;
  ctaLabel: string;
  ctaHref: string;
};

export const PRICING_CONFIG = {
  siteTypes: [
    {
      id: 'brochure',
      label: 'Brochure / info site',
      description: 'A clean place to tell people what you do and how to reach you.',
      basePrice: 500,
    },
    {
      id: 'business',
      label: 'Business site',
      description: 'Forms, booking widgets, or anything beyond static info.',
      basePrice: 1200,
    },
    {
      id: 'ecommerce',
      label: 'E-commerce',
      description: 'Online storefront with products, cart, and checkout.',
      basePrice: 2500,
    },
    {
      id: 'custom',
      label: 'Custom application',
      description: 'Bespoke app, dashboard, or platform tailored to your business.',
      basePrice: 3500,
    },
  ] satisfies SiteTypeOption[],

  pagesIncluded: 5,
  pricePerExtraPage: 75,
  maxPages: 30,

  features: [
    { id: 'cms', label: 'CMS / self-edit', price: 300 },
    { id: 'blog', label: 'Blog system', price: 200 },
    { id: 'booking', label: 'Online booking', price: 300 },
    { id: 'payments', label: 'Online payments', price: 500 },
    { id: 'multilang', label: 'Multi-language', price: 400 },
    { id: 'newsletter', label: 'Newsletter integration', price: 150 },
    { id: 'seo', label: 'SEO package', price: 250 },
    { id: 'animations', label: 'Custom animations', price: 400 },
    { id: 'analytics', label: 'Analytics dashboard', price: 200 },
  ] satisfies FeatureOption[],

  tiers: {
    starter: { target: 750, snapWithin: 0.15, displayPrice: 750 },
    business: { target: 2000, snapWithin: 0.15, displayPrice: 2000 },
    custom: { threshold: 3800, displayPrice: 4500 },
  },
} as const;

export type PricingEstimate = {
  raw: number;
  display: number;
  match: TierMatch;
};

export function computeEstimate(input: {
  siteType: SiteTypeId;
  pages: number;
  features: FeatureId[];
}): PricingEstimate {
  const siteType = PRICING_CONFIG.siteTypes.find((s) => s.id === input.siteType);
  if (!siteType) {
    throw new Error(`Unknown site type: ${input.siteType}`);
  }

  const extraPages = Math.max(0, input.pages - PRICING_CONFIG.pagesIncluded);
  const pageCost = extraPages * PRICING_CONFIG.pricePerExtraPage;

  const featureCost = input.features.reduce((sum, id) => {
    const f = PRICING_CONFIG.features.find((f) => f.id === id);
    return sum + (f?.price ?? 0);
  }, 0);

  const raw = siteType.basePrice + pageCost + featureCost;
  const { starter, business, custom } = PRICING_CONFIG.tiers;

  if (raw >= custom.threshold) {
    return {
      raw,
      display: custom.displayPrice,
      match: {
        slug: 'custom',
        label: 'Custom',
        displayPrice: custom.displayPrice,
        ctaLabel: 'Request quote',
        ctaHref: '/pricing#quote',
      },
    };
  }

  if (Math.abs(raw - starter.target) <= starter.target * starter.snapWithin) {
    return {
      raw,
      display: starter.displayPrice,
      match: {
        slug: 'starter',
        label: 'Starter',
        displayPrice: starter.displayPrice,
        ctaLabel: 'Get started',
        ctaHref: '/contact',
      },
    };
  }

  if (Math.abs(raw - business.target) <= business.target * business.snapWithin) {
    return {
      raw,
      display: business.displayPrice,
      match: {
        slug: 'business',
        label: 'Business',
        displayPrice: business.displayPrice,
        ctaLabel: 'Get started',
        ctaHref: '/contact',
      },
    };
  }

  // No snap, no custom threshold — show raw number, route to custom quote
  return {
    raw,
    display: raw,
    match: {
      slug: 'custom',
      label: 'Custom estimate',
      displayPrice: raw,
      ctaLabel: 'Request quote',
      ctaHref: '/pricing#quote',
    },
  };
}
