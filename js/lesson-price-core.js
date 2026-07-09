(() => {
  'use strict';

  const config = {
    minDate: '2026-11-01',
    maxDate: '2027-05-31',
    resorts: {
      '藻岩山': { full: 80000, half: 58000 },
      '盤溪': { full: 80000, half: 58000 },
      '手稻': { full: 80000, half: 58000 },
      '留寿都': { full: 80000, half: 58000 },
      '富良野': { full: 80000, half: 58000 },
      '神居': { full: 80000, half: 58000 },
      '札幌國際': { full: 80000, half: 58000 },
      'Tomamu星野': { full: 85000, half: 58000 },
      'Sahoro佐幌': { full: 85000, half: 58000 },
      '北海道其他雪場': { full: 80000, half: 58000 }
    },
    peakRanges: [
      { start: '2026-12-21', end: '2027-01-07' },
      { start: '2027-01-30', end: '2027-02-16' }
    ],
    peakFee: 10000,
    extraPersonFee: 6000,
    levelFees: { '': 0, '不指定': 0, '一級': 3000, '二級': 5000, '三級': 8000 }
  };

  const parseLocalDate = (value) => {
    if (!value) return null;
    const parts = String(value).split('-').map(Number);
    if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
    return new Date(parts[0], parts[1] - 1, parts[2]);
  };

  const dateToInputValue = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const normalizeDateInput = (value) => {
    const raw = String(value || '').trim();
    const compact = raw.match(/^(\d{4})(\d{2})(\d{2})$/);
    if (compact) return `${compact[1]}-${compact[2]}-${compact[3]}`;
    return raw;
  };

  const inRange = (value, start = config.minDate, end = config.maxDate) => {
    const date = parseLocalDate(value);
    return !!date && date >= parseLocalDate(start) && date <= parseLocalDate(end);
  };

  const isPeakDate = (value) => config.peakRanges.some((range) => inRange(value, range.start, range.end));

  const levelRank = (level) => ({ '一級': 1, '二級': 2, '三級': 3 }[level] || 0);
  const higherLevel = (a, b) => levelRank(a) >= levelRank(b) ? a : b;

  const coachLevelForBoard = (coach, board) => {
    if (!coach) return '';
    if (board === '單板') return coach.snowboardLevel || '';
    if (board === '雙板') return coach.skiLevel || '';
    if (board === '單板+雙板') return higherLevel(coach.snowboardLevel, coach.skiLevel);
    return '';
  };

  const calculateCourse = (course) => {
    const resortPrice = config.resorts[course.resort] || config.resorts['Tomamu星野'];
    const people = Number.isFinite(course.people) ? Math.max(Math.floor(course.people), 0) : 0;
    const base = resortPrice[course.type === 'half' ? 'half' : 'full'];
    const peopleFee = Math.max(people - 2, 0) * config.extraPersonFee;
    const peakFee = course.date && inRange(course.date) && isPeakDate(course.date) ? config.peakFee : 0;
    const conditionFee = course.mode === 'condition'
      ? (config.levelFees[course.level] || 0) + Number(course.genderFee || 0) + Number(course.backgroundFee || 0)
      : 0;
    const specificLevel = course.mode === 'specific' ? coachLevelForBoard(course.coach, course.board) : '';
    const specificFee = course.mode === 'specific' ? (config.levelFees[specificLevel] || 0) : 0;
    const coachFee = conditionFee + specificFee;
    return {
      base,
      peopleFee,
      peakFee,
      coachFee,
      subtotal: base + peopleFee + peakFee + coachFee,
      specificLevel
    };
  };

  window.SKI_LESSON_PRICE_CORE = {
    config,
    parseLocalDate,
    dateToInputValue,
    normalizeDateInput,
    inRange,
    isPeakDate,
    levelRank,
    higherLevel,
    coachLevelForBoard,
    calculateCourse
  };
})();
