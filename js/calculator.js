(() => {
  'use strict';

  const root = document.getElementById('se-calc-app');
  if (!root) return;

  const i18n = window.SNOWTRAVEL_I18N || {};
  const t = typeof i18n.t === 'function' ? i18n.t : (value) => String(value || '');

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
      '十勝Sahoro': { full: 85000, half: 58000 },
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

  const coachData = (window.SNOWTRAVEL_COACHES || [])
    .filter((coach) => coach.showInCalculator)
    .map((coach) => ({
      ...coach,
      displayText: coach.displayName,
      language: (coach.languages || []).join('、'),
      publicBio: coach.intro || t('教練簡介稍後補充。'),
      detailUrl: coach.id ? `#coach-card-${coach.id}` : (coach.detailId ? `#${coach.detailId}` : ''),
      enabled: true
    }));

  const listEl = root.querySelector('[data-se-calc-list]');
  const copyBtn = root.querySelector('[data-se-calc-copy]');
  const fallback = root.querySelector('[data-se-calc-fallback]');
  const fallbackText = root.querySelector('[data-se-calc-fallback-text]');
  const copyStatus = root.querySelector('[data-se-calc-copy-status]');
  const bulkRoot = root.querySelector('[data-se-calc-bulk]');
  let nextId = 1;

  const activateCoachPanel = () => {
    const coachPanel = document.getElementById('coach-panel');
    if (!coachPanel) return;
    document.querySelectorAll('.school-book-panel').forEach((panel) => {
      const active = panel === coachPanel;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
    document.querySelectorAll('.school-book-tab').forEach((tab) => {
      const active = tab.dataset.panel === 'coach-panel';
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  };

  root.addEventListener('click', (event) => {
    const detailLink = event.target.closest('.se-calc-coach-card a[href^="#coach-card-"]');
    if (!detailLink) return;
    const targetId = detailLink.getAttribute('href').slice(1);
    event.preventDefault();
    activateCoachPanel();
    if (window.location.hash !== `#${targetId}`) {
      window.history.pushState(null, '', `#${targetId}`);
    }
    window.dispatchEvent(new CustomEvent('snowtravel:coachHashChange', { detail: { hash: `#${targetId}` } }));
    window.setTimeout(() => {
      const target = document.getElementById(targetId);
      if (!target) return;
      const header = document.querySelector('.site-header');
      const headerOffset = (header ? header.getBoundingClientRect().height : 0) + 18;
      const top = window.scrollY + target.getBoundingClientRect().top - headerOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }, 90);
  });

  const money = (value) => `¥${Math.round(value || 0).toLocaleString('ja-JP')}`;
  const safeText = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const coachLevelRows = (coach) => {
    if (!coach) return '';
    return [
      coach.snowboardCertLabel ? `<div><dt>${t('單板：')}</dt><dd>${safeText(coach.snowboardCertLabel)}</dd></div>` : '',
      coach.skiCertLabel ? `<div><dt>${t('雙板：')}</dt><dd>${safeText(coach.skiCertLabel)}</dd></div>` : ''
    ].filter(Boolean).join('');
  };
  const parseLocalDate = (value) => {
    if (!value) return null;
    const parts = value.split('-').map(Number);
    if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
    return new Date(parts[0], parts[1] - 1, parts[2]);
  };
  const formatDate = (value) => {
    const date = parseLocalDate(value);
    if (!date) return t('未選擇日期');
    return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  };
  const dateToInputValue = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const normalizeDateInput = (value) => {
    const raw = String(value || '').trim();
    const compact = raw.match(/^(\d{4})(\d{2})(\d{2})$/);
    if (compact) return `${compact[1]}-${compact[2]}-${compact[3]}`;
    return raw;
  };
  const defaultDateValue = () => {
    const todayRaw = new Date();
    const today = new Date(todayRaw.getFullYear(), todayRaw.getMonth(), todayRaw.getDate());
    const min = parseLocalDate(config.minDate);
    const max = parseLocalDate(config.maxDate);
    if (today < min) return config.minDate;
    if (today > max) return config.maxDate;
    return dateToInputValue(today);
  };
  const inRange = (value, start, end) => {
    const date = parseLocalDate(value);
    return !!date && date >= parseLocalDate(start) && date <= parseLocalDate(end);
  };
  const isPeakDate = (value) => config.peakRanges.some((range) => inRange(value, range.start, range.end));
  const enabledCoaches = () => coachData.filter((coach) => coach.enabled);
  const getCoach = (id) => enabledCoaches().find((coach) => coach.id === id) || null;
  const levelRank = (level) => ({ '一級': 1, '二級': 2, '三級': 3 }[level] || 0);
  const higherLevel = (a, b) => levelRank(a) >= levelRank(b) ? a : b;
  const boardAbility = (coach) => {
    if (!coach) return 'none';
    if (coach.snowboardLevel && coach.skiLevel) return 'both';
    if (coach.snowboardLevel) return 'snowboard';
    if (coach.skiLevel) return 'ski';
    return 'none';
  };
  const coachLevelForBoard = (coach, board) => {
    if (!coach) return '';
    if (board === '單板') return coach.snowboardLevel;
    if (board === '雙板') return coach.skiLevel;
    if (board === '單板+雙板') return higherLevel(coach.snowboardLevel, coach.skiLevel);
    return '';
  };
  const resortOptions = () => Object.keys(config.resorts).map((name) => `<option value="${name}"${name === 'Tomamu星野' ? ' selected' : ''}>${t(name)}</option>`).join('');
  const coachOptions = () => enabledCoaches().map((coach) => `<option value="${coach.id}">${coach.displayText}</option>`).join('');
  const field = (card, name) => card.querySelector(`[data-field="${name}"]`);
  const selectedText = (selectEl) => selectEl.options[selectEl.selectedIndex] ? selectEl.options[selectEl.selectedIndex].text : '';


  const bulkTemplate = () => `
    <details class="se-calc-bulk-tool" data-se-calc-bulk-tool>
      <summary><span>${t('批量添加課程')}</span></summary>
      <div class="se-calc-bulk-body">
        <div class="se-calc-bulk-mode" role="radiogroup" aria-label="${t('批量添加方式')}">
          <label><input type="radio" name="se-calc-bulk-mode" value="range" checked> ${t('連續日期')}</label>
          <label><input type="radio" name="se-calc-bulk-mode" value="dates"> ${t('非連續日期')}</label>
        </div>
        <div class="se-calc-bulk-panel is-visible" data-bulk-panel="range">
          <div class="se-calc-grid">
            <div class="se-calc-field"><label class="se-calc-label">${t('開始日期')}</label><input class="se-calc-input" type="date" min="${config.minDate}" max="${config.maxDate}" data-bulk-field="startDate" value="${defaultDateValue()}"></div>
            <div class="se-calc-field"><label class="se-calc-label">${t('結束日期')}</label><input class="se-calc-input" type="date" min="${config.minDate}" max="${config.maxDate}" data-bulk-field="endDate" value="${defaultDateValue()}"></div>
          </div>
        </div>
        <div class="se-calc-bulk-panel" data-bulk-panel="dates">
          <div class="se-calc-field"><label class="se-calc-label">${t('課程日期')}</label><textarea class="se-calc-textarea" data-bulk-field="datesText" placeholder="${t('例如：20261201, 20261203, 20261206')}"></textarea><p class="se-calc-hint">${t('日期格式：yyyymmdd')}</p><p class="se-calc-hint">${t('可用逗號、空格或換行分隔多個日期。')}</p></div>
        </div>
        <div class="se-calc-bulk-shared">
          <div class="se-calc-grid">
            <div class="se-calc-field"><label class="se-calc-label">${t('雪場')}</label><select class="se-calc-select" data-bulk-field="resort">${resortOptions()}</select></div>
            <div class="se-calc-field"><label class="se-calc-label">${t('課程時長')}</label><select class="se-calc-select" data-bulk-field="courseType"><option value="full">${t('全天 5小時')}</option><option value="half">${t('半天 3小時')}</option></select></div>
<div class="se-calc-field"><label class="se-calc-label">${t('人數')}</label><input class="se-calc-input" type="number" min="1" step="1" value="2" data-bulk-field="people"></div>
            <div class="se-calc-field"><label class="se-calc-label">${t('滑行程度')}</label><select class="se-calc-select" data-bulk-field="skiLevel"><option value="初學/第一次">${t('初學/第一次')}</option><option value="初級/綠線">${t('初級/綠線')}</option><option value="中級/紅藍線">${t('中級/紅藍線')}</option><option value="高級/黑線">${t('高級/黑線')}</option></select></div>
            <div class="se-calc-field"><label class="se-calc-label">${t('教練安排')}</label><select class="se-calc-select" data-bulk-field="coachMode"><option value="none">${t('不指定')}</option><option value="condition">${t('指定教練條件')}</option><option value="specific">${t('指定具體教練')}</option></select></div>
            <div class="se-calc-field"><label class="se-calc-label">${t('單/雙板')}</label><select class="se-calc-select" data-bulk-field="board"><option value="單板">${t('單板')}</option><option value="雙板">${t('雙板')}</option><option value="單板+雙板">${t('單板+雙板')}</option></select></div>
          </div>
          <div class="se-calc-bulk-extra" data-bulk-extra="condition">
            <div class="se-calc-grid">
              <div class="se-calc-field"><label class="se-calc-label">${t('指定等級')}</label><select class="se-calc-select" data-bulk-field="level"><option value="不指定">${t('不指定')}</option><option value="一級">${t('一級')} +3000</option><option value="二級">${t('二級')} +5000</option><option value="三級">${t('三級')} +8000</option></select></div>
              <div class="se-calc-field"><label class="se-calc-label">${t('性別')}</label><select class="se-calc-select" data-bulk-field="gender"><option value="0">${t('不指定')}</option><option value="3000">${t('男教練')} +3000</option><option value="3000">${t('女教練')} +3000</option></select></div>
              <div class="se-calc-field"><label class="se-calc-label">${t('教練背景')}</label><select class="se-calc-select" data-bulk-field="background"><option value="0">${t('不指定')}</option><option value="3000">${t('指定教練背景')} +3000</option></select></div>
            </div>
          </div>
          <div class="se-calc-bulk-extra" data-bulk-extra="specific">
            <div class="se-calc-grid">
              <div class="se-calc-field"><label class="se-calc-label">${t('請選擇教練')}</label><select class="se-calc-select" data-bulk-field="coachId">${coachOptions()}</select></div>
            </div>
          </div>
        </div>
        <div class="se-calc-bulk-actions">
          <button class="se-calc-button" type="button" data-se-calc-bulk-generate>${t('批量添加課程')}</button>
          <p class="se-calc-bulk-status" data-se-calc-bulk-status></p>
        </div>
      </div>
    </details>`;

  const bulkField = (name) => bulkRoot ? bulkRoot.querySelector(`[data-bulk-field="${name}"]`) : null;
  const bulkMode = () => {
    const checked = bulkRoot ? bulkRoot.querySelector('input[name="se-calc-bulk-mode"]:checked') : null;
    return checked ? checked.value : 'range';
  };
  const setBulkStatus = (message, tone = '') => {
    const status = bulkRoot ? bulkRoot.querySelector('[data-se-calc-bulk-status]') : null;
    if (!status) return;
    status.textContent = message;
    status.dataset.tone = tone;
  };
  const syncBulkTool = () => {
    if (!bulkRoot) return;
    const mode = bulkMode();
    bulkRoot.querySelectorAll('[data-bulk-panel]').forEach((panel) => panel.classList.toggle('is-visible', panel.dataset.bulkPanel === mode));
    const coachMode = bulkField('coachMode') ? bulkField('coachMode').value : 'none';
    bulkRoot.querySelectorAll('[data-bulk-extra]').forEach((panel) => panel.classList.toggle('is-visible', panel.dataset.bulkExtra === coachMode));
  };
  const validateDateValue = (value) => {
    const normalized = normalizeDateInput(value);
    const date = parseLocalDate(normalized);
    if (!date || dateToInputValue(date) !== normalized) return null;
    if (!inRange(normalized, config.minDate, config.maxDate)) return null;
    return date;
  };
  const parseBulkDateList = () => {
    if (bulkMode() === 'range') {
      const startValue = bulkField('startDate').value;
      const endValue = bulkField('endDate').value;
      const start = validateDateValue(startValue);
      const end = validateDateValue(endValue);
      if (!start || !end) return { dates: [], error: t('請選擇有效的開始日期和結束日期。') };
      if (end < start) return { dates: [], error: t('結束日期不能早於開始日期。') };
      const dates = [];
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) dates.push(dateToInputValue(d));
      return { dates, note: t(`已按連續日期加入 ${dates.length} 節課程。`) };
    }
    const raw = (bulkField('datesText').value || '').trim();
    if (!raw) return { dates: [], error: t('請輸入至少一個課程日期。') };
    const tokens = raw.split(/[\s,，;；、]+/).map((item) => item.trim()).filter(Boolean);
    if (!tokens.length) return { dates: [], error: t('請輸入至少一個課程日期。') };
    const invalid = tokens.filter((item) => !validateDateValue(item));
    if (invalid.length) return { dates: [], error: t(`日期格式或範圍不正確：${invalid.join('、')}。請使用 20261201 這樣的格式。`) };
    const unique = Array.from(new Set(tokens.map(normalizeDateInput))).sort();
    const duplicateCount = tokens.length - unique.length;
    return { dates: unique, note: duplicateCount ? t(`已自動去除 ${duplicateCount} 個重複日期，加入 ${unique.length} 節課程。`) : t(`已按非連續日期加入 ${unique.length} 節課程。`) };
  };
  const bulkPreset = (date) => ({
    date,
    resort: bulkField('resort').value,
    courseType: bulkField('courseType').value,
    people: bulkField('people').value,
    skiLevel: bulkField('skiLevel').value,
    coachMode: bulkField('coachMode').value,
    board: bulkField('board').value,
    level: bulkField('level').value,
    gender: bulkField('gender').value,
    background: bulkField('background').value,
    coachId: bulkField('coachId').value
  });
  const applyCoursePreset = (card, preset = {}) => {
    Object.entries(preset).forEach(([name, value]) => {
      const input = field(card, name);
      if (input && value !== undefined && value !== null) input.value = value;
    });
    syncCard(card);
  };
  const isBlankDefaultCourse = (card) => {
    if (!card) return false;
    return field(card, 'date').value === defaultDateValue()
      && field(card, 'resort').value === 'Tomamu星野'
      && field(card, 'courseType').value === 'full'
      && field(card, 'people').value === '2'
      && field(card, 'skiLevel').value === '初學/第一次'
      && field(card, 'coachMode').value === 'none'
      && field(card, 'board').value === '單板'
      && !field(card, 'note').value.trim();
  };
  const generateBulkCourses = () => {
    const parsed = parseBulkDateList();
    if (parsed.error) { setBulkStatus(parsed.error, 'error'); return; }
    const peopleValue = Number(bulkField('people').value);
    if (!Number.isFinite(peopleValue) || peopleValue < 1) { setBulkStatus(t('請輸入有效人數。'), 'error'); return; }
    let datesToAdd = parsed.dates;
    const existingCards = cards();
    if (existingCards.length === 1 && isBlankDefaultCourse(existingCards[0])) {
      applyCoursePreset(existingCards[0], bulkPreset(datesToAdd[0]));
      datesToAdd = datesToAdd.slice(1);
    }
    datesToAdd.forEach((date) => addCourse(bulkPreset(date), false));
    updateCourseNumbers();
    render();
    setBulkStatus(parsed.note, 'success');
  };
  const setupBulkTool = () => {
    if (!bulkRoot) return;
    bulkRoot.innerHTML = bulkTemplate();
    syncBulkTool();
    bulkRoot.addEventListener('change', syncBulkTool);
    bulkRoot.addEventListener('click', (event) => {
      if (event.target.closest('[data-se-calc-bulk-generate]')) generateBulkCourses();
    });
  };

  const courseTemplate = (id) => `
    <article class="se-calc-course-card" data-se-calc-course="${id}">
      <div class="se-calc-card-head"><h3 class="se-calc-card-title">${t('課程')} <span data-se-calc-course-no></span></h3><button class="se-calc-button se-calc-button-danger" type="button" data-se-calc-remove>${t('刪除本節課')}</button></div>
      <div class="se-calc-grid">
        <div class="se-calc-field"><label class="se-calc-label">${t('日期')}</label><input class="se-calc-input" type="date" min="${config.minDate}" max="${config.maxDate}" value="${defaultDateValue()}" data-field="date"></div>
        <div class="se-calc-field"><label class="se-calc-label">${t('雪場')}</label><select class="se-calc-select" data-field="resort">${resortOptions()}</select></div>
        <div class="se-calc-field"><label class="se-calc-label">${t('課程類型')}</label><select class="se-calc-select" data-field="courseType"><option value="full">${t('全天 5小時')}</option><option value="half">${t('半天 3小時')}</option></select></div>
<div class="se-calc-field"><label class="se-calc-label">${t('人數')}</label><input class="se-calc-input" type="number" min="1" step="1" value="2" data-field="people"></div>
        <div class="se-calc-field"><label class="se-calc-label">${t('滑行程度')}</label><select class="se-calc-select" data-field="skiLevel"><option value="初學/第一次">${t('初學/第一次')}</option><option value="初級/綠線">${t('初級/綠線')}</option><option value="中級/紅藍線">${t('中級/紅藍線')}</option><option value="高級/黑線">${t('高級/黑線')}</option></select></div>
        <div class="se-calc-field"><label class="se-calc-label">${t('教練安排方式')}</label><select class="se-calc-select" data-field="coachMode"><option value="none">${t('不指定')}</option><option value="condition">${t('指定教練條件')}</option><option value="specific">${t('指定具體教練')}</option></select></div>
        <div class="se-calc-field"><label class="se-calc-label">${t('單/雙板')}</label><select class="se-calc-select" data-field="board"><option value="單板">${t('單板')}</option><option value="雙板">${t('雙板')}</option><option value="單板+雙板">${t('單板+雙板')}</option></select><p class="se-calc-hint" data-se-calc-board-hint></p></div>
        <div class="se-calc-panel" data-panel="condition"><div class="se-calc-panel-grid">
          <div class="se-calc-field"><label class="se-calc-label">${t('指定等級')}</label><select class="se-calc-select" data-field="level"><option value="不指定">${t('不指定')}</option><option value="一級">${t('一級')} +3000</option><option value="二級">${t('二級')} +5000</option><option value="三級">${t('三級')} +8000</option></select></div>
          <div class="se-calc-field"><label class="se-calc-label">${t('性別')}</label><select class="se-calc-select" data-field="gender"><option value="0">${t('不指定')}</option><option value="3000">${t('男教練')} +3000</option><option value="3000">${t('女教練')} +3000</option></select></div>
          <div class="se-calc-field"><label class="se-calc-label">${t('教練背景')}</label><select class="se-calc-select" data-field="background"><option value="0">${t('不指定')}</option><option value="3000">${t('指定教練背景')} +3000</option></select></div>
        </div></div>
        <div class="se-calc-panel" data-panel="specific"><div class="se-calc-panel-grid">
          <div class="se-calc-field"><label class="se-calc-label">${t('請選擇教練')}</label><select class="se-calc-select" data-field="coachId">${coachOptions()}</select></div>
        </div></div>
        <div class="se-calc-coach-card" data-se-calc-coach-card></div>
        <div class="se-calc-field se-calc-field-wide"><label class="se-calc-label">${t('備註')}</label><textarea class="se-calc-textarea" data-field="note" placeholder="${t('例如：兒童年齡、詳細滑行程度、多人水平不同等')}"></textarea></div>
      </div>
      <div class="se-calc-card-foot"><div class="se-calc-card-message" data-se-calc-message></div><div class="se-calc-foot-actions"><div class="se-calc-subtotal"><span>${t('本節小計')}</span><strong data-se-calc-subtotal>¥0</strong></div><div class="se-calc-card-add" data-se-calc-card-add><button class="se-calc-button" type="button" data-se-calc-add-bottom>${t('添加下一節課程')}</button></div></div></div>
    </article>`;

  const syncCard = (card) => {
    const mode = field(card, 'coachMode').value;
    const board = field(card, 'board');
    const conditionPanel = card.querySelector('[data-panel="condition"]');
    const specificPanel = card.querySelector('[data-panel="specific"]');
    const coachCard = card.querySelector('[data-se-calc-coach-card]');
    const boardHint = card.querySelector('[data-se-calc-board-hint]');
    conditionPanel.classList.toggle('is-visible', mode === 'condition');
    specificPanel.classList.toggle('is-visible', mode === 'specific');
    board.disabled = false;
    boardHint.textContent = '';
    coachCard.classList.remove('is-visible');
    coachCard.innerHTML = '';
    if (mode !== 'specific') return;
    const coach = getCoach(field(card, 'coachId').value);
    const ability = boardAbility(coach);
    if (ability === 'snowboard') { board.value = '單板'; board.disabled = true; boardHint.textContent = t('該教練僅支持單板，已自動匹配。'); }
    else if (ability === 'ski') { board.value = '雙板'; board.disabled = true; boardHint.textContent = t('該教練僅支持雙板，已自動匹配。'); }
    else if (ability === 'both') { board.disabled = false; boardHint.textContent = t('該教練支持單板/雙板，可選擇單板、雙板或單板+雙板。'); }
    if (coach) {
      const detailButton = coach.detailUrl ? `<a class="se-calc-button se-calc-button-secondary" href="${coach.detailUrl}">${t('查看教練詳情')}</a>` : '';
      const levelRows = coachLevelRows(coach);
      coachCard.classList.add('is-visible');
      coachCard.innerHTML = `<dl>${levelRows}<div><dt>${t('背景：')}</dt><dd>${safeText(coach.background || t('資料準備中'))}</dd></div><div><dt>${t('語言：')}</dt><dd>${safeText(coach.language || t('資料準備中'))}</dd></div></dl>${detailButton}`;
    }
  };

  const readCourse = (card) => {
    syncCard(card);
    const dateInput = field(card, 'date');
    if (!dateInput.value) dateInput.value = defaultDateValue();
    const dateValue = dateInput.value;
    const resort = field(card, 'resort').value;
    const type = field(card, 'courseType').value;
    const mode = field(card, 'coachMode').value;
    const skiLevel = field(card, 'skiLevel').value;
    const board = field(card, 'board').value;
    const peopleRaw = Number(field(card, 'people').value);
    const peopleValid = Number.isFinite(peopleRaw) && peopleRaw >= 1;
    const people = peopleValid ? Math.floor(peopleRaw) : 0;
    const outOfSeason = dateValue && !inRange(dateValue, config.minDate, config.maxDate);
    let message = '';
    let coachFee = 0;
    let coachText = `${t('不指定')}；${t(board)}`;
    if (mode === 'condition') {
      coachFee = (config.levelFees[field(card, 'level').value] || 0) + Number(field(card, 'gender').value || 0) + Number(field(card, 'background').value || 0);
      const conditionParts = [t('指定教練條件'), t(board), selectedText(field(card, 'level')), selectedText(field(card, 'gender')), selectedText(field(card, 'background'))].filter((item) => item && item !== t('不指定'));
      coachText = conditionParts.join('；');
    } else if (mode === 'specific') {
      const coach = getCoach(field(card, 'coachId').value);
      const level = coachLevelForBoard(coach, board);
      coachFee = config.levelFees[level] || 0;
      coachText = `${t('指定具體教練：')}${coach ? coach.displayText : t('未選擇')}；${t(board)}`;
      if (!coach) message = t('請選擇具體教練');
      else if (!level) message = t('該教練不支持所選板類，請重新選擇');
    }
    if (outOfSeason) message = t('請選擇 2026/11/01～2027/05/31 期間的日期');
    else if (!peopleValid) message = t('請輸入有效人數');
    const invalid = !!message;
    const base = config.resorts[resort][type === 'full' ? 'full' : 'half'];
    const peopleFee = Math.max(people - 2, 0) * config.extraPersonFee;
    const peak = dateValue && !outOfSeason && isPeakDate(dateValue);
    const peakFee = peak ? config.peakFee : 0;
    const subtotal = invalid ? 0 : base + peopleFee + peakFee + coachFee;
    return {
      valid: !invalid,
      dateText: formatDate(dateValue),
      resort,
      resortText: t(resort),
      type,
      typeText: type === 'full' ? t('全天 5小時') : t('半天 3小時'),
      people,
      skiLevel,
      skiLevelText: t(skiLevel),
      board,
      boardText: t(board),
      mode,
      coachText,
      note: field(card, 'note').value.trim(),
      peak: !!peak,
      base,
      peopleFee,
      peakFee,
      coachFee,
      subtotal,
      message
    };
  };

  const cards = () => Array.from(listEl.querySelectorAll('[data-se-calc-course]'));
  const updateCourseNumbers = () => cards().forEach((card, index, all) => {
    card.querySelector('[data-se-calc-course-no]').textContent = index + 1;
    card.querySelector('[data-se-calc-remove]').style.display = all.length > 1 ? '' : 'none';
    card.querySelector('[data-se-calc-card-add]').classList.toggle('is-visible', index === all.length - 1);
  });
  const feeText = (value) => value ? money(value) : t('無');
  const feeRow = (label, value) => value ? `<div><dt>${label}</dt><dd>${money(value)}</dd></div>` : '';
  const renderSummary = (validCourses) => {
    const summary = root.querySelector('[data-se-calc-summary]');
    if (!validCourses.length) { summary.innerHTML = `<li class="se-calc-summary-empty">${t('請先填寫至少一節有效課程。')}</li>`; return; }
    summary.innerHTML = validCourses.map((item, index) => `
      <li class="se-calc-summary-item">
        <div class="se-calc-summary-head"><strong>${t(`第 ${index + 1} 節`)}</strong><span>${money(item.subtotal)}</span></div>
        <div class="se-calc-summary-meta">${item.dateText} · ${item.resortText} · ${item.typeText} · ${item.people}${t('人')} · ${item.skiLevelText}</div>
        <dl class="se-calc-fee-list">
          <div><dt>${t('基礎價格')}</dt><dd>${money(item.base)}</dd></div>
          ${feeRow(t('旺季加價'), item.peakFee)}
          ${feeRow(t('人數加價'), item.peopleFee)}
          ${feeRow(t('指定條件加價'), item.coachFee)}
        </dl>
        <p class="se-calc-summary-coach">${t('教練安排：')}${item.coachText}</p>
      </li>`).join('');
  };
  const render = () => {
    const courses = cards().map((card) => {
      const data = readCourse(card);
      card.querySelector('[data-se-calc-message]').textContent = data.message;
      card.querySelector('[data-se-calc-subtotal]').textContent = data.valid ? money(data.subtotal) : t('待完善');
      return data;
    });
    const validCourses = courses.filter((item) => item.valid);
    const total = validCourses.reduce((sum, item) => sum + item.subtotal, 0);
    root.querySelector('[data-se-calc-count]').textContent = validCourses.length;
    root.querySelector('[data-se-calc-full]').textContent = validCourses.filter((item) => item.type === 'full').length;
    root.querySelector('[data-se-calc-half]').textContent = validCourses.filter((item) => item.type === 'half').length;
    root.querySelector('[data-se-calc-total]').textContent = money(total);
    renderSummary(validCourses);
    copyStatus.textContent = '';
    fallback.classList.remove('is-visible');
  };
  const buildCopyText = () => {
    const courses = cards().map(readCourse);
    const validCourses = courses.filter((item) => item.valid);
    const total = validCourses.reduce((sum, item) => sum + item.subtotal, 0);
    const fullCount = validCourses.filter((item) => item.type === 'full').length;
    const halfCount = validCourses.filter((item) => item.type === 'half').length;
    const notes = courses.map((item, index) => item.note ? `${t(`第 ${index + 1} 節：`)}${item.note}` : '').filter(Boolean);
    const courseCountLines = [];
    if (fullCount) courseCountLines.push(t(`全天：${fullCount} 節`));
    if (halfCount) courseCountLines.push(t(`半天：${halfCount} 節`));
    const lines = [t('【課程價格】'), ...courseCountLines, `${t('總價：')}${money(total)}`, '', t('【課程明細】')];
    if (!validCourses.length) lines.push(t('尚未填寫有效課程。'));
    else validCourses.forEach((item, index) => {
      lines.push(t(`第 ${index + 1} 節`));
      lines.push(`${t('日期：')}${item.dateText}`);
      lines.push(`${t('雪場：')}${item.resortText}`);
      lines.push(`${t('課程時長：')}${item.typeText}`);
      lines.push(`${t('人數：')}${item.people} ${t('人')}`);
      lines.push(`${t('滑行程度：')}${item.skiLevelText}`);
      lines.push(`${t('基礎價格：')}${money(item.base)}`);
      if (item.peakFee) lines.push(`${t('旺季加價：')}${money(item.peakFee)}`);
      if (item.peopleFee) lines.push(`${t('人數加價：')}${money(item.peopleFee)}`);
      if (item.coachFee) lines.push(`${t('指定條件加價：')}${money(item.coachFee)}`);
      lines.push(`${t('教練安排：')}${item.coachText}`);
      lines.push(`${t('小計：')}${money(item.subtotal)}`);
      lines.push('');
    });
    if (notes.length) lines.push(t('【客人備註】'), notes.join('\n'));
    return lines.join('\n');
  };
  const copyText = () => {
    const text = buildCopyText();
    fallbackText.value = text;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => { copyStatus.textContent = t('已複製，可直接發給客服確認。'); fallback.classList.remove('is-visible'); }).catch(() => { fallback.classList.add('is-visible'); copyStatus.textContent = t('目前瀏覽器不支持自動複製，請手動複製下方內容。'); });
    } else { fallback.classList.add('is-visible'); copyStatus.textContent = t('目前瀏覽器不支持自動複製，請手動複製下方內容。'); }
  };
  const addCourse = (preset = {}, shouldRender = true) => {
    listEl.insertAdjacentHTML('beforeend', courseTemplate(nextId++));
    const card = cards()[cards().length - 1];
    applyCoursePreset(card, preset);
    updateCourseNumbers();
    if (shouldRender) render();
    return card;
  };
  listEl.addEventListener('input', render);
  listEl.addEventListener('change', render);
  listEl.addEventListener('click', (event) => {
    if (event.target.closest('[data-se-calc-add-bottom]')) { addCourse(); return; }
    const btn = event.target.closest('[data-se-calc-remove]');
    if (btn && cards().length > 1) { btn.closest('[data-se-calc-course]').remove(); updateCourseNumbers(); render(); }
  });
  copyBtn.addEventListener('click', copyText);
  setupBulkTool();
  addCourse();
})();
