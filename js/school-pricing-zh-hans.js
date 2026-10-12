/*
 * Canonical public ski-school business facts.
 * Maintain all prices, dates, durations, availability rules and fee values here
 * in Simplified Chinese. Other locales may translate labels, never facts.
 */
window.SNOWTRAVEL_SCHOOL_PRICING_ZH_HANS = {
  season: {
    calculatorDateRange: { start: '2026-11-01', end: '2027-05-31' },
    peakRanges: [
      { start: '2026-12-21', end: '2027-01-07' },
      { start: '2027-01-30', end: '2027-02-16' }
    ],
    offSeasonPrefix: '雪季开始日至',
    offSeasonSuffix: '至雪季结束日'
  },
  fees: {
    standardAdditionalGuestPerPerson: 6000,
    peakPerLesson: 10000,
    lessonExtensionPerHour: 15000,
    instructorLevelPerDay: { '不指定': 0, '一级': 3000, '二级': 5000, '三级': 8000 },
    instructorGenderPerDay: 3000,
    instructorBackgroundPerDay: 3000
  },
  standardResort: { halfBase: 58000, fullBase: 80000 },
  guestTiers: [
    { min: 1, max: 2, name: '1–2 人' },
    { min: 3, max: 3, name: '3 人' },
    { min: 4, max: 4, name: '4 人' }
  ],
  courseTypes: {
    half: { name: '半天', lessonHours: 3, windowHours: 3, time: ['09:00', '12:00', '13:00', '16:00'], fixed: true },
    full: { name: '全天', lessonHours: 5, windowHours: 6, time: ['09:30', '15:30', '10:00', '16:00'], lunchBreakHours: 1 }
  },
  tomamu: {
    resortId: 'tomamu',
    maxGuestsPerGroup: 4,
    courseTypes: {
      half: { name: '半天', lessonHours: 2.5, windowHours: 2.5, time: ['09:30', '12:00', '13:30', '16:00'], fixed: true },
      full: { name: '全天', lessonHours: 4, windowHours: 5, time: ['10:00', '15:00'], lunchBreakHours: 1 }
    },
    preLessonPreparationMinutes: 30,
    preparationCountsAsInstruction: false,
    preparationHasAdditionalFee: false,
    flatPricesByGuestTier: [
      { maxGuests: 2, half: 58000, full: 85000 },
      { maxGuests: 3, half: 64000, full: 95000 },
      { maxGuests: 4, half: 70000, full: 112000 }
    ],
    peakPricesByGuestTier: [
      { maxGuests: 2, half: 68000, full: 95000 },
      { maxGuests: 3, half: 74000, full: 105000 },
      { maxGuests: 4, half: 80000, full: 122000 }
    ]
  },
  resorts: [
    { id: 'tomamu', name: 'Tomamu 星野', aliases: ['Tomamu星野', '星野Tomamu'], publicPriceTable: true, officiallyRegistered: true, pricing: 'tomamu' },
    { id: 'rusutsu', name: '留寿都', aliases: ['留寿都', '留壽都'], publicPriceTable: true, officiallyRegistered: true, pricing: 'standard' },
    { id: 'teine', name: '手稻', aliases: ['手稻', '手稲'], publicPriceTable: true, officiallyRegistered: true, pricing: 'standard' },
    { id: 'kokusai', name: '札幌国际', aliases: ['札幌國際', '札幌国际'], publicPriceTable: true, officiallyRegistered: true, pricing: 'standard' },
    { id: 'moiwa', name: '藻岩山', aliases: ['藻岩山'], publicPriceTable: true, officiallyRegistered: false, pricing: 'standard' },
    { id: 'kamui', name: '神居', aliases: ['神居'], publicPriceTable: true, officiallyRegistered: false, pricing: 'standard' },
    { id: 'other', name: '北海道其他雪场', aliases: ['北海道其他雪場'], publicPriceTable: true, officiallyRegistered: false, pricing: 'consult' },
    { id: 'bankei', name: '盘溪', aliases: ['盤溪'], publicPriceTable: false, officiallyRegistered: false, pricing: 'legacy-unconfirmed' },
    { id: 'furano', name: '富良野', aliases: ['富良野'], publicPriceTable: false, officiallyRegistered: false, pricing: 'legacy-unconfirmed' },
    { id: 'sahoro', name: 'Sahoro佐幌', aliases: ['Sahoro佐幌'], publicPriceTable: false, officiallyRegistered: false, pricing: 'legacy-unconfirmed' }
  ]
};
