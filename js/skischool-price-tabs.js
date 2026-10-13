(() => {
  'use strict';
  const root = document.querySelector('[data-school-price-v2]');
  const core = window.SKI_LESSON_PRICE_CORE;
  if (!root || !core) return;
  const facts = core.facts;
  const lang = (document.documentElement.lang || 'zh-Hans').toLowerCase();
  const english = lang.startsWith('en');
  const traditional = lang.includes('hant');
  const text = english ? {
    labels: { tomamu: 'Tomamu', rusutsu: 'Rusutsu', teine: 'Sapporo Teine', kokusai: 'Sapporo Kokusai', moiwa: 'Mt. Moiwa', kamui: 'Kamui Ski Links', other: 'Other Hokkaido resorts' },
    registered: 'Officially registered', flat: 'Regular season', peak: 'Peak season', guests: 'Guests',
    half: 'Half day', full: 'Full day', service: 'Lesson & service notes', feeNote: 'Lesson fees cover instruction and costs incurred by the instructor only. Guest equipment, lift tickets, transportation, meals, and accommodation are not included.',
    consult: 'Please contact us', consultText: 'Please contact our team to confirm lesson availability and price at this resort.',
    peakHalf: 'Please contact our team to confirm whether a half-day lesson can be arranged on your date.',
    lessonTime: 'Lesson time', lunch: 'including a lunch break', fixed: 'Times are fixed and must be followed.',
    fullTimeDetails: '{duration} teaching hours, with a {lunch}-hour lunch break.',
    prep: 'The instructor will meet guests about {minutes} minutes before the lesson to assist with rental procedures, equipment preparation, and checking that gear is properly worn.',
    rental: 'If instructor assistance is needed for rentals, that time is included in the lesson.',
    extra: 'If the instructor schedule allows, lessons can be extended at {amount} per hour.',
    turns: 'When group members take turns, the fee is based on the total group size.',
    availability: 'Instructor availability is not held during inquiry. A lesson is confirmed after the deposit is paid.',
    groups: 'We recommend no more than {count} guests per lesson group. Please contact us to arrange groups for larger parties.',
    arrangement: 'Lesson arrangements', rentalTitle: 'Rental assistance', extraTitle: 'Extended lessons', turnsTitle: 'Taking turns', availabilityTitle: 'Availability', groupsTitle: 'Group size', prepTitle: 'Pre-lesson preparation',
    offStart: 'From the start of the resort season', offEnd: 'through the end of the resort season', to: ' through ', groupTotal: 'Group total (JPY)', morning: 'Morning ', afternoon: 'Afternoon ', or: ' or ', hours: 'h',
    unsupported: 'Price details are unavailable. Please contact our team.'
  } : traditional ? {
    labels: { tomamu: 'Tomamu 星野', rusutsu: '留壽都', teine: '手稻', kokusai: '札幌國際', moiwa: '藻岩山', kamui: '神居', other: '北海道其他雪場' },
    registered: '官方登記', flat: '平季', peak: '旺季', guests: '課程人數',
    half: '半天', full: '全天', service: '課程與服務說明', feeNote: '課程費用僅包含教學及教練自身產生的費用，不包含學員的雪具、纜車票、交通、餐飲或住宿。',
    consult: '請直接諮詢', consultText: '此雪場的課程安排與價格請聯絡客服確認。',
    peakHalf: '旺季半天課程請直接聯絡客服確認指定日期是否可以安排。',
    lessonTime: '課程時間', lunch: '含午休', fixed: '時間無彈性，必須嚴格遵守。',
    fullTimeDetails: '共 {duration} 小時教學，含 {lunch} 小時午休。',
    prep: '教練將於課程開始前約 {minutes} 分鐘與學員集合，協助租賃手續、裝備準備及檢查穿戴。',
    rental: '如需教練協助租賃，全天與半天課程均會計入租賃所用時間。',
    extra: '如教練檔期允許，可延長課程；延長或超時統一按 {amount} 日圓 / 小時計算。',
    turns: '同一團隊不同成員輪流上課，按團隊總人數計算費用。',
    availability: '諮詢過程中教練檔期不會保留，支付定金後才確認課程。',
    groups: '建議每組課程人數控制在 {count} 人以內；超出請聯絡客服安排分組。',
    arrangement: '課程安排', rentalTitle: '租賃協助', extraTitle: '延長課程', turnsTitle: '輪流上課', availabilityTitle: '檔期保留', groupsTitle: '分組建議', prepTitle: '課前準備',
    offStart: '雪季開始日至', offEnd: '至雪季結束日', to: '至', groupTotal: '全組總價（日圓）', morning: '上午 ', afternoon: '下午 ', or: ' 或 ', hours: ' 小時',
    unsupported: '目前無法顯示價格，請聯絡客服確認。'
  } : {
    labels: { tomamu: 'Tomamu 星野', rusutsu: '留寿都', teine: '手稻', kokusai: '札幌国际', moiwa: '藻岩山', kamui: '神居', other: '北海道其他雪场' },
    registered: '官方登记', flat: '平季', peak: '旺季', guests: '课程人数',
    half: '半天', full: '全天', service: '课程与服务说明', feeNote: '课程费用仅包含教学及教练自身产生的费用，不包含学员的雪具、缆车票、交通、餐饮或住宿。',
    consult: '请直接咨询', consultText: '此雪场的课程安排与价格请联系客服确认。',
    peakHalf: '旺季半天课程请直接联系客服确认指定日期是否可以安排。',
    lessonTime: '课程时间', lunch: '含午休', fixed: '时间无弹性，必须严格遵守。',
    fullTimeDetails: '共 {duration} 小时教学，含 {lunch} 小时午休。',
    prep: '教练将在课程开始前约 {minutes} 分钟与学员集合，协助租赁手续、装备准备及检查穿戴。',
    rental: '如需教练协助租赁，全天与半天课程均会计入租赁所用时间。',
    extra: '如教练档期允许，可延长课程；延长或超时统一按 {amount} 日元 / 小时计算。',
    turns: '同一团队不同成员轮流上课，按团队总人数计算费用。',
    availability: '咨询过程中教练档期不会保留，支付定金后才确认课程。',
    groups: '建议每组课程人数控制在 {count} 人以内；超出请联系客服安排分组。',
    arrangement: '课程安排', rentalTitle: '租赁协助', extraTitle: '延长课程', turnsTitle: '轮流上课', availabilityTitle: '档期保留', groupsTitle: '分组建议', prepTitle: '课前准备',
    offStart: '雪季开始日至', offEnd: '至雪季结束日', to: '至', groupTotal: '全组总价（日元）', morning: '上午 ', afternoon: '下午 ', or: ' 或 ', hours: ' 小时',
    unsupported: '目前无法显示价格，请联系客服确认。'
  };
  const resorts = facts.resorts.filter((resort) => resort.publicPriceTable);
  const tabsRoot = root.querySelector('[data-price-tabs]');
  const panelsRoot = root.querySelector('[data-price-panels]');
  if (!tabsRoot || !panelsRoot) return;
  const money = value => `¥${new Intl.NumberFormat(english ? 'en-US' : 'zh-CN').format(value)}`;
  const fees = {
    level1: facts.fees.instructorLevelPerDay['一级'],
    level2: facts.fees.instructorLevelPerDay['二级'],
    level3: facts.fees.instructorLevelPerDay['三级'],
    gender: facts.fees.instructorGenderPerDay
  };
  if (document.querySelectorAll) document.querySelectorAll('[data-school-fee]').forEach((node) => {
    const amount = fees[node.dataset.schoolFee];
    if (amount !== undefined) node.textContent = new Intl.NumberFormat(english ? 'en-US' : 'zh-CN').format(amount);
  });
  const date = iso => {
    const [year, month, day] = iso.split('-').map(Number);
    if (english) return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1, day)));
    return `${year} 年 ${month} 月 ${day} 日`;
  };
  const shiftDate = (iso, delta) => {
    const [year, month, day] = iso.split('-').map(Number);
    const value = new Date(Date.UTC(year, month - 1, day + delta));
    return `${value.getUTCFullYear()}-${String(value.getUTCMonth() + 1).padStart(2, '0')}-${String(value.getUTCDate()).padStart(2, '0')}`;
  };
  const offSeasonDates = () => {
    const peaks = facts.season.peakRanges;
    return [
      `${text.offStart} ${date(shiftDate(peaks[0].start, -1))}`,
      `${date(shiftDate(peaks[0].end, 1))}${text.to}${date(shiftDate(peaks[1].start, -1))}`,
      `${date(shiftDate(peaks[1].end, 1))} ${text.offEnd}`
    ];
  };
  const peakDates = () => facts.season.peakRanges.map(range => `${date(range.start)}${text.to}${date(range.end)}`);
  const durationLabel = (type, isTomamu = false) => {
    const rule = (isTomamu ? facts.tomamu.courseTypes : facts.courseTypes)[type];
    return `${type === 'half' ? text.half : text.full} ${rule.lessonHours}${text.hours}`;
  };
  const timeLabel = (rule) => {
    if (rule.time.length === 2) return `${rule.time[0]}–${rule.time[1]}`;
    return `${text.morning}${rule.time[0]}–${rule.time[1]}${text.or}${text.afternoon}${rule.time[2]}–${rule.time[3]}`;
  };
  const rowsFor = (resort, isPeak) => {
    const dateValue = isPeak ? facts.season.peakRanges[0].start : shiftDate(facts.season.peakRanges[0].start, -1);
    return facts.guestTiers.map((tier) => {
      const people = tier.min;
      const aliases = resort.aliases || [];
      const resortKey = aliases[0] || resort.name;
      const half = core.calculateCourse({ date: dateValue, resort: resortKey, type: 'half', people, mode: 'none' });
      const full = core.calculateCourse({ date: dateValue, resort: resortKey, type: 'full', people, mode: 'none' });
      return { tier, half, full };
    });
  };
  const guestLabel = tier => {
    const label = tier.min === tier.max ? String(tier.min) : `${tier.min}–${tier.max}`;
    return english ? `${label} ${tier.max === 1 ? 'guest' : 'guests'}` : `${label} 人`;
  };
  const table = (resort, isPeak) => {
    if (resort.pricing === 'consult') return `<div class="school-price-v2-consult"><strong>${text.consult}</strong><span>${text.consultText}</span></div>`;
    const rows = rowsFor(resort, isPeak);
    const isTomamu = resort.pricing === 'tomamu';
    const headers = `<th scope="col">${durationLabel('half', isTomamu)}</th><th scope="col">${durationLabel('full', isTomamu)}</th>`;
    const body = rows.map((row, index) => {
      return `<tr><th scope="row">${guestLabel(row.tier)}</th><td>${money(row.half.subtotal)}</td><td>${row.full.quoteable ? money(row.full.subtotal) : text.unsupported}</td></tr>`;
    }).join('');
    const groupTotal = english ? 'Group total (JPY)' : text.groupTotal;
    const tableLabel = `${text.labels[resort.id]} · ${isPeak ? text.peak : text.flat} · ${groupTotal}`;
    return `<div class="table-wrap price-table-wrap"><table class="price-table refined-price-table school-price-v2-table" aria-label="${tableLabel}"><thead><tr><th scope="col">${text.guests}</th>${headers}</tr></thead><tbody>${body}</tbody></table></div>`;
  };
  const serviceRows = resort => {
    if (resort.pricing === 'consult') return [[text.arrangement, text.consultText], [text.rentalTitle, text.rental]];
    const tomamu = resort.pricing === 'tomamu';
    const rules = tomamu ? facts.tomamu.courseTypes : facts.courseTypes;
    const full = rules.full;
    const half = rules.half;
    const fullCopy = `${text.lessonTime}: ${timeLabel(full)}. ${full.lunchBreakHours ? text.fullTimeDetails.replace('{duration}', String(full.lessonHours)).replace('{lunch}', String(full.lunchBreakHours)) : ''}`.trim();
    const halfCopy = `${text.lessonTime}: ${timeLabel(half)}${half.lessonHours ? `, ${half.lessonHours}${text.hours}` : ''}. ${half.fixed ? text.fixed : ''}`.trim();
    const result = [
      [durationLabel('full', tomamu), fullCopy],
      [durationLabel('half', tomamu), halfCopy],
      ...(!tomamu ? [[text.extraTitle, text.extra.replace('{amount}', money(facts.fees.lessonExtensionPerHour))]] : []),
      [text.turnsTitle, text.turns],
      [text.availabilityTitle, text.availability]
    ];
    if (tomamu) {
      const prep = text.prep.replace('{minutes}', String(facts.tomamu.preLessonPreparationMinutes));
      result.splice(2, 0, [text.prepTitle, prep]);
      result.push([text.groupsTitle, text.groups.replace('{count}', String(facts.tomamu.maxGuestsPerGroup))]);
    } else result.splice(2, 0, [text.rentalTitle, text.rental]);
    return result;
  };
  tabsRoot.innerHTML = resorts.map((resort, index) => `<button class="school-price-v2-tab${index === 0 ? ' is-active' : ''}" id="price-tab-${resort.id}" type="button" role="tab" aria-selected="${index === 0}" aria-controls="price-panel-${resort.id}" tabindex="${index === 0 ? 0 : -1}" data-price-tab="${resort.id}">${text.labels[resort.id]}</button>`).join('');
  panelsRoot.innerHTML = resorts.map((resort, index) => {
    const seasons = [false, true].map(isPeak => {
      const dates = isPeak ? peakDates() : offSeasonDates();
      const peakNote = isPeak && resort.pricing !== 'tomamu' ? `<span class="school-price-v2-peak-note">${text.peakHalf}</span>` : '';
      return `<section class="school-price-v2-season" aria-labelledby="${resort.id}-${isPeak ? 'peak' : 'off'}"><h4 id="${resort.id}-${isPeak ? 'peak' : 'off'}">${isPeak ? text.peak : text.flat}</h4><div class="terms-lead school-price-v2-dates">${dates.map(value => `<span>${value}</span>`).join('')}${peakNote}</div>${table(resort, isPeak)}</section>`;
    }).join('');
    const service = serviceRows(resort).map(([title, copyText]) => `<div class="lesson-row"><strong>${title}</strong><span>${copyText}</span></div>`).join('');
    return `<section class="school-price-v2-panel${index === 0 ? ' is-active' : ''}" id="price-panel-${resort.id}" role="tabpanel" aria-labelledby="price-tab-${resort.id}" tabindex="0" data-price-panel="${resort.id}"${index ? ' hidden' : ''}><div class="school-price-v2-heading"><h3>${text.labels[resort.id]}</h3>${resort.officiallyRegistered ? `<span class="status-pill">${text.registered}</span>` : ''}</div>${seasons}<section class="school-price-v2-service"><div class="section-heading"><h4>${text.service}</h4><p class="terms-lead service-fee-note">${text.feeNote}</p></div><div class="lesson-service-panel">${service}</div></section></section>`;
  }).join('');
  const tabs = [...tabsRoot.querySelectorAll('[role="tab"]')];
  const panels = [...panelsRoot.querySelectorAll('[role="tabpanel"]')];
  const activate = (tab, focus = false) => {
    tabs.forEach(item => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panels.forEach(panel => {
      const active = panel.dataset.pricePanel === tab.dataset.priceTab;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      const next = event.key === 'ArrowRight' ? tabs[(index + 1) % tabs.length]
        : event.key === 'ArrowLeft' ? tabs[(index - 1 + tabs.length) % tabs.length]
        : event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs[tabs.length - 1] : null;
      if (!next) return;
      event.preventDefault();
      activate(next, true);
    });
  });
})();
