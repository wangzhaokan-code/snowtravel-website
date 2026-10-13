(() => {
  'use strict';

  const facts = window.SNOWTRAVEL_SCHOOL_PRICING_ZH_HANS;
  if (!facts) return;
  const levelAliases = { '不指定': '不指定', '一級': '一级', '二級': '二级', '三級': '三级', '一级': '一级', '二级': '二级', '三级': '三级' };
  const resortsByAlias = new Map();
  facts.resorts.forEach((resort) => [resort.name, ...(resort.aliases || [])].forEach((alias) => resortsByAlias.set(alias, resort)));
  const levelFees = {
    '': 0, '不指定': facts.fees.instructorLevelPerDay['不指定'],
    '一級': facts.fees.instructorLevelPerDay['一级'],
    '二級': facts.fees.instructorLevelPerDay['二级'],
    '三級': facts.fees.instructorLevelPerDay['三级'],
    '一级': facts.fees.instructorLevelPerDay['一级'],
    '二级': facts.fees.instructorLevelPerDay['二级'],
    '三级': facts.fees.instructorLevelPerDay['三级']
  };
  const resorts = {};
  facts.resorts.forEach((resort) => {
    const price = resort.pricing === 'standard' ? facts.standardResort : { half: 0, full: 0 };
    const compatibleKey = (resort.aliases || [])[0] || resort.name;
    resorts[compatibleKey] = { half: price.halfBase, full: price.fullBase };
  });
  const config = {
    minDate: facts.season.calculatorDateRange.start,
    maxDate: facts.season.calculatorDateRange.end,
    resorts,
    peakRanges: facts.season.peakRanges,
    peakFee: facts.fees.peakPerLesson,
    extraPersonFee: facts.fees.standardAdditionalGuestPerPerson,
    levelFees,
    instructorGenderPerDay: facts.fees.instructorGenderPerDay,
    instructorBackgroundPerDay: facts.fees.instructorBackgroundPerDay
  };

  const parseLocalDate = (value) => {
    if (!value) return null;
    const parts = String(value).split('-').map(Number);
    if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    if (date.getFullYear() !== parts[0] || date.getMonth() !== parts[1] - 1 || date.getDate() !== parts[2]) return null;
    return date;
  };
  const dateToInputValue = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const normalizeDateInput = (value) => {
    const raw = String(value || '').trim();
    const compact = raw.match(/^(\d{4})(\d{2})(\d{2})$/);
    return compact ? `${compact[1]}-${compact[2]}-${compact[3]}` : raw;
  };
  const inRange = (value, start = config.minDate, end = config.maxDate) => {
    const date = parseLocalDate(value);
    const first = parseLocalDate(start);
    const last = parseLocalDate(end);
    return !!date && !!first && !!last && date >= first && date <= last;
  };
  const isPeakDate = (value) => facts.season.peakRanges.some((range) => inRange(value, range.start, range.end));
  const levelRank = (level) => ({ '一级': 1, '二级': 2, '三级': 3 }[levelAliases[level] || level] || 0);
  const higherLevel = (a, b) => levelRank(a) >= levelRank(b) ? (levelAliases[a] || a) : (levelAliases[b] || b);
  const coachLevelForBoard = (coach, board) => {
    if (!coach) return '';
    if (board === '單板' || board === '单板') return coach.snowboardLevel || '';
    if (board === '雙板' || board === '双板') return coach.skiLevel || '';
    if (board === '單板+雙板' || board === '单板+双板') return higherLevel(coach.snowboardLevel, coach.skiLevel);
    return '';
  };
  const resolveResort = (name) => resortsByAlias.get(name) || null;
  const unavailable = (message) => ({ quoteable: false, message, base: 0, peopleFee: 0, peakFee: 0, coachFee: 0, subtotal: 0 });
  const calculateCourse = (course) => {
    const resort = resolveResort(course.resort);
    if (!resort) return unavailable('无法识别雪场，请联系客服确认。');
    if (!inRange(course.date)) return unavailable('课程日期超出当前可估价范围，请联系客服确认。');
    const people = Number(course.people);
    if (!Number.isInteger(people) || people < 1) return unavailable('请填写有效课程人数。');
    if (resort.pricing === 'consult') return unavailable('此雪场暂不提供自动估价，请联系客服确认。');
    if (resort.pricing === 'legacy-unconfirmed') return unavailable('此雪场不在当前公开价目表中，请联系客服确认价格。');
    const type = course.type === 'half' ? 'half' : 'full';
    const peak = isPeakDate(course.date);
    let base;
    let peakFee = 0;
    let peopleFee = 0;
    if (resort.pricing === 'tomamu') {
      if (people > facts.tomamu.maxGuestsPerGroup) return unavailable('Tomamu 每组最多 4 人，超过 4 人请联系客服安排分组。');
      const index = facts.tomamu.flatPricesByGuestTier.findIndex((tier) => people <= tier.maxGuests);
      const flat = facts.tomamu.flatPricesByGuestTier[index];
      const seasonal = (peak ? facts.tomamu.peakPricesByGuestTier : facts.tomamu.flatPricesByGuestTier)[index];
      base = flat[type];
      peakFee = seasonal[type] - flat[type];
    } else {
      base = type === 'half' ? facts.standardResort.halfBase : facts.standardResort.fullBase;
      peopleFee = Math.max(people - facts.guestTiers[0].max, 0) * facts.fees.standardAdditionalGuestPerPerson;
      peakFee = peak ? facts.fees.peakPerLesson : 0;
    }
    const canonicalLevel = levelAliases[course.level] || course.level;
    const conditionFee = course.mode === 'condition'
      ? (facts.fees.instructorLevelPerDay[canonicalLevel] || 0)
        + Number(course.genderFee || 0) + Number(course.backgroundFee || 0)
      : 0;
    const specificLevel = course.mode === 'specific' ? coachLevelForBoard(course.coach, course.board) : '';
    const specificFee = course.mode === 'specific' ? (facts.fees.instructorLevelPerDay[levelAliases[specificLevel] || specificLevel] || 0) : 0;
    const coachFee = conditionFee + specificFee;
    return { quoteable: true, base, peopleFee, peakFee, coachFee, subtotal: base + peopleFee + peakFee + coachFee, specificLevel };
  };

  window.SKI_LESSON_PRICE_CORE = {
    facts, config, parseLocalDate, dateToInputValue, normalizeDateInput, inRange,
    isPeakDate, levelRank, higherLevel, coachLevelForBoard, resolveResort, calculateCourse
  };
})();
