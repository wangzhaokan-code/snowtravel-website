(() => {
  'use strict';

  const root = document.getElementById('se-calc-app');
  if (!root) return;

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
      publicBio: coach.intro || '教練簡介稍後補充。',
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
      coach.snowboardCertLabel ? `<div><dt>單板：</dt><dd>${safeText(coach.snowboardCertLabel)}</dd></div>` : '',
      coach.skiCertLabel ? `<div><dt>雙板：</dt><dd>${safeText(coach.skiCertLabel)}</dd></div>` : ''
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
    if (!date) return '未選擇日期';
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
  const resortOptions = () => Object.keys(config.resorts).map((name) => `<option value="${name}"${name === 'Tomamu星野' ? ' selected' : ''}>${name}</option>`).join('');
  const coachOptions = () => enabledCoaches().map((coach) => `<option value="${coach.id}">${coach.displayText}</option>`).join('');
  const field = (card, name) => card.querySelector(`[data-field="${name}"]`);
  const selectedText = (selectEl) => selectEl.options[selectEl.selectedIndex] ? selectEl.options[selectEl.selectedIndex].text : '';


  const bulkTemplate = () => `
    <details class="se-calc-bulk-tool" data-se-calc-bulk-tool>
      <summary><span>批量添加課程</span></summary>
      <div class="se-calc-bulk-body">
        <div class="se-calc-bulk-mode" role="radiogroup" aria-label="批量添加方式">
          <label><input type="radio" name="se-calc-bulk-mode" value="range" checked> 連續日期</label>
          <label><input type="radio" name="se-calc-bulk-mode" value="dates"> 非連續日期</label>
        </div>
        <div class="se-calc-bulk-panel is-visible" data-bulk-panel="range">
          <div class="se-calc-grid">
            <div class="se-calc-field"><label class="se-calc-label">開始日期</label><input class="se-calc-input" type="date" min="${config.minDate}" max="${config.maxDate}" data-bulk-field="startDate" value="${defaultDateValue()}"></div>
            <div class="se-calc-field"><label class="se-calc-label">結束日期</label><input class="se-calc-input" type="date" min="${config.minDate}" max="${config.maxDate}" data-bulk-field="endDate" value="${defaultDateValue()}"></div>
          </div>
        </div>
        <div class="se-calc-bulk-panel" data-bulk-panel="dates">
          <div class="se-calc-field"><label class="se-calc-label">課程日期</label><textarea class="se-calc-textarea" data-bulk-field="datesText" placeholder="例如：20261201, 20261203, 20261206"></textarea><p class="se-calc-hint">日期格式：yyyymmdd</p><p class="se-calc-hint">可用逗號、空格或換行分隔多個日期。</p></div>
        </div>
        <div class="se-calc-bulk-shared">
          <div class="se-calc-grid">
            <div class="se-calc-field"><label class="se-calc-label">雪場</label><select class="se-calc-select" data-bulk-field="resort">${resortOptions()}</select></div>
            <div class="se-calc-field"><label class="se-calc-label">課程時長</label><select class="se-calc-select" data-bulk-field="courseType"><option value="full">全天 5小時</option><option value="half">半天 3小時</option></select></div>
<div class="se-calc-field"><label class="se-calc-label">人數</label><input class="se-calc-input" type="number" min="1" step="1" value="2" data-bulk-field="people"></div>
            <div class="se-calc-field"><label class="se-calc-label">滑行程度</label><select class="se-calc-select" data-bulk-field="skiLevel"><option value="初學/第一次">初學/第一次</option><option value="初級/綠線">初級/綠線</option><option value="中級/紅藍線">中級/紅藍線</option><option value="高級/黑線">高級/黑線</option></select></div>
            <div class="se-calc-field"><label class="se-calc-label">教練安排</label><select class="se-calc-select" data-bulk-field="coachMode"><option value="none">不指定</option><option value="condition">指定教練條件</option><option value="specific">指定具體教練</option></select></div>
            <div class="se-calc-field"><label class="se-calc-label">單/雙板</label><select class="se-calc-select" data-bulk-field="board"><option value="單板">單板</option><option value="雙板">雙板</option><option value="單板+雙板">單板+雙板</option></select></div>
          </div>
          <div class="se-calc-bulk-extra" data-bulk-extra="condition">
            <div class="se-calc-grid">
              <div class="se-calc-field"><label class="se-calc-label">指定等級</label><select class="se-calc-select" data-bulk-field="level"><option value="不指定">不指定</option><option value="一級">一級 +3000</option><option value="二級">二級 +5000</option><option value="三級">三級 +8000</option></select></div>
              <div class="se-calc-field"><label class="se-calc-label">性別</label><select class="se-calc-select" data-bulk-field="gender"><option value="0">不指定</option><option value="3000">男教練 +3000</option><option value="3000">女教練 +3000</option></select></div>
              <div class="se-calc-field"><label class="se-calc-label">教練背景</label><select class="se-calc-select" data-bulk-field="background"><option value="0">不指定</option><option value="3000">指定教練背景 +3000</option></select></div>
            </div>
          </div>
          <div class="se-calc-bulk-extra" data-bulk-extra="specific">
            <div class="se-calc-grid">
              <div class="se-calc-field"><label class="se-calc-label">請選擇教練</label><select class="se-calc-select" data-bulk-field="coachId">${coachOptions()}</select></div>
            </div>
          </div>
        </div>
        <div class="se-calc-bulk-actions">
          <button class="se-calc-button" type="button" data-se-calc-bulk-generate>批量添加課程</button>
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
      if (!start || !end) return { dates: [], error: '請選擇有效的開始日期和結束日期。' };
      if (end < start) return { dates: [], error: '結束日期不能早於開始日期。' };
      const dates = [];
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) dates.push(dateToInputValue(d));
      return { dates, note: `已按連續日期加入 ${dates.length} 節課程。` };
    }
    const raw = (bulkField('datesText').value || '').trim();
    if (!raw) return { dates: [], error: '請輸入至少一個課程日期。' };
    const tokens = raw.split(/[\s,，;；、]+/).map((item) => item.trim()).filter(Boolean);
    if (!tokens.length) return { dates: [], error: '請輸入至少一個課程日期。' };
    const invalid = tokens.filter((item) => !validateDateValue(item));
    if (invalid.length) return { dates: [], error: `日期格式或範圍不正確：${invalid.join('、')}。請使用 20261201 這樣的格式。` };
    const unique = Array.from(new Set(tokens.map(normalizeDateInput))).sort();
    const duplicateCount = tokens.length - unique.length;
    return { dates: unique, note: duplicateCount ? `已自動去除 ${duplicateCount} 個重複日期，加入 ${unique.length} 節課程。` : `已按非連續日期加入 ${unique.length} 節課程。` };
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
    if (!Number.isFinite(peopleValue) || peopleValue < 1) { setBulkStatus('請輸入有效人數。', 'error'); return; }
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
      <div class="se-calc-card-head"><h3 class="se-calc-card-title">課程 <span data-se-calc-course-no></span></h3><button class="se-calc-button se-calc-button-danger" type="button" data-se-calc-remove>刪除本節課</button></div>
      <div class="se-calc-grid">
        <div class="se-calc-field"><label class="se-calc-label">日期</label><input class="se-calc-input" type="date" min="${config.minDate}" max="${config.maxDate}" value="${defaultDateValue()}" data-field="date"></div>
        <div class="se-calc-field"><label class="se-calc-label">雪場</label><select class="se-calc-select" data-field="resort">${resortOptions()}</select></div>
        <div class="se-calc-field"><label class="se-calc-label">課程類型</label><select class="se-calc-select" data-field="courseType"><option value="full">全天 5小時</option><option value="half">半天 3小時</option></select></div>
<div class="se-calc-field"><label class="se-calc-label">人數</label><input class="se-calc-input" type="number" min="1" step="1" value="2" data-field="people"></div>
        <div class="se-calc-field"><label class="se-calc-label">滑行程度</label><select class="se-calc-select" data-field="skiLevel"><option value="初學/第一次">初學/第一次</option><option value="初級/綠線">初級/綠線</option><option value="中級/紅藍線">中級/紅藍線</option><option value="高級/黑線">高級/黑線</option></select></div>
        <div class="se-calc-field"><label class="se-calc-label">教練安排方式</label><select class="se-calc-select" data-field="coachMode"><option value="none">不指定</option><option value="condition">指定教練條件</option><option value="specific">指定具體教練</option></select></div>
        <div class="se-calc-field"><label class="se-calc-label">單/雙板</label><select class="se-calc-select" data-field="board"><option value="單板">單板</option><option value="雙板">雙板</option><option value="單板+雙板">單板+雙板</option></select><p class="se-calc-hint" data-se-calc-board-hint></p></div>
        <div class="se-calc-panel" data-panel="condition"><div class="se-calc-panel-grid">
          <div class="se-calc-field"><label class="se-calc-label">指定等級</label><select class="se-calc-select" data-field="level"><option value="不指定">不指定</option><option value="一級">一級 +3000</option><option value="二級">二級 +5000</option><option value="三級">三級 +8000</option></select></div>
          <div class="se-calc-field"><label class="se-calc-label">性別</label><select class="se-calc-select" data-field="gender"><option value="0">不指定</option><option value="3000">男教練 +3000</option><option value="3000">女教練 +3000</option></select></div>
          <div class="se-calc-field"><label class="se-calc-label">教練背景</label><select class="se-calc-select" data-field="background"><option value="0">不指定</option><option value="3000">指定教練背景 +3000</option></select></div>
        </div></div>
        <div class="se-calc-panel" data-panel="specific"><div class="se-calc-panel-grid">
          <div class="se-calc-field"><label class="se-calc-label">請選擇教練</label><select class="se-calc-select" data-field="coachId">${coachOptions()}</select></div>
        </div></div>
        <div class="se-calc-coach-card" data-se-calc-coach-card></div>
        <div class="se-calc-field se-calc-field-wide"><label class="se-calc-label">備註</label><textarea class="se-calc-textarea" data-field="note" placeholder="例如：兒童年齡、詳細滑行程度、多人水平不同等"></textarea></div>
      </div>
      <div class="se-calc-card-foot"><div class="se-calc-card-message" data-se-calc-message></div><div class="se-calc-foot-actions"><div class="se-calc-subtotal"><span>本節小計</span><strong data-se-calc-subtotal>¥0</strong></div><div class="se-calc-card-add" data-se-calc-card-add><button class="se-calc-button" type="button" data-se-calc-add-bottom>添加下一節課程</button></div></div></div>
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
    if (ability === 'snowboard') { board.value = '單板'; board.disabled = true; boardHint.textContent = '該教練僅支持單板，已自動匹配。'; }
    else if (ability === 'ski') { board.value = '雙板'; board.disabled = true; boardHint.textContent = '該教練僅支持雙板，已自動匹配。'; }
    else if (ability === 'both') { board.disabled = false; boardHint.textContent = '該教練支持單板/雙板，可選擇單板、雙板或單板+雙板。'; }
    if (coach) {
      const detailButton = coach.detailUrl ? `<a class="se-calc-button se-calc-button-secondary" href="${coach.detailUrl}">查看教練詳情</a>` : '';
      const levelRows = coachLevelRows(coach);
      coachCard.classList.add('is-visible');
      coachCard.innerHTML = `<dl>${levelRows}<div><dt>背景：</dt><dd>${safeText(coach.background || '資料準備中')}</dd></div><div><dt>語言：</dt><dd>${safeText(coach.language || '資料準備中')}</dd></div></dl>${detailButton}`;
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
    let coachText = `不指定；${board}`;
    if (mode === 'condition') {
      coachFee = (config.levelFees[field(card, 'level').value] || 0) + Number(field(card, 'gender').value || 0) + Number(field(card, 'background').value || 0);
      const conditionParts = ['指定教練條件', board, selectedText(field(card, 'level')), selectedText(field(card, 'gender')), selectedText(field(card, 'background'))].filter((item) => item && item !== '不指定');
      coachText = conditionParts.join('；');
    } else if (mode === 'specific') {
      const coach = getCoach(field(card, 'coachId').value);
      const level = coachLevelForBoard(coach, board);
      coachFee = config.levelFees[level] || 0;
      coachText = `指定具體教練：${coach ? coach.displayText : "未選擇"}；${board}`;
      if (!coach) message = '請選擇具體教練';
      else if (!level) message = '該教練不支持所選板類，請重新選擇';
    }
    if (outOfSeason) message = '請選擇 2026/11/01～2027/05/31 期間的日期';
    else if (!peopleValid) message = '請輸入有效人數';
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
      type,
      typeText: type === 'full' ? '全天 5小時' : '半天 3小時',
      people,
      skiLevel,
      board,
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
  const feeText = (value) => value ? money(value) : '無';
  const feeRow = (label, value) => value ? `<div><dt>${label}</dt><dd>${money(value)}</dd></div>` : '';
  const renderSummary = (validCourses) => {
    const summary = root.querySelector('[data-se-calc-summary]');
    if (!validCourses.length) { summary.innerHTML = '<li class="se-calc-summary-empty">請先填寫至少一節有效課程。</li>'; return; }
    summary.innerHTML = validCourses.map((item, index) => `
      <li class="se-calc-summary-item">
        <div class="se-calc-summary-head"><strong>第 ${index + 1} 節</strong><span>${money(item.subtotal)}</span></div>
        <div class="se-calc-summary-meta">${item.dateText} · ${item.resort} · ${item.typeText} · ${item.people}人 · ${item.skiLevel}</div>
        <dl class="se-calc-fee-list">
          <div><dt>基礎價格</dt><dd>${money(item.base)}</dd></div>
          ${feeRow('旺季加價', item.peakFee)}
          ${feeRow('人數加價', item.peopleFee)}
          ${feeRow('指定條件加價', item.coachFee)}
        </dl>
        <p class="se-calc-summary-coach">教練安排：${item.coachText}</p>
      </li>`).join('');
  };
  const render = () => {
    const courses = cards().map((card) => {
      const data = readCourse(card);
      card.querySelector('[data-se-calc-message]').textContent = data.message;
      card.querySelector('[data-se-calc-subtotal]').textContent = data.valid ? money(data.subtotal) : '待完善';
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
    const notes = courses.map((item, index) => item.note ? `第 ${index + 1} 節：${item.note}` : '').filter(Boolean);
    const courseCountLines = [];
    if (fullCount) courseCountLines.push(`全天：${fullCount} 節`);
    if (halfCount) courseCountLines.push(`半天：${halfCount} 節`);
    const lines = ['【課程價格】', ...courseCountLines, `總價：${money(total)}`, '', '【課程明細】'];
    if (!validCourses.length) lines.push('尚未填寫有效課程。');
    else validCourses.forEach((item, index) => {
      lines.push(`第 ${index + 1} 節`);
      lines.push(`日期：${item.dateText}`);
      lines.push(`雪場：${item.resort}`);
      lines.push(`課程時長：${item.typeText}`);
      lines.push(`人數：${item.people} 人`);
      lines.push(`滑行程度：${item.skiLevel}`);
      lines.push(`基礎價格：${money(item.base)}`);
      if (item.peakFee) lines.push(`旺季加價：${money(item.peakFee)}`);
      if (item.peopleFee) lines.push(`人數加價：${money(item.peopleFee)}`);
      if (item.coachFee) lines.push(`指定條件加價：${money(item.coachFee)}`);
      lines.push(`教練安排：${item.coachText}`);
      lines.push(`小計：${money(item.subtotal)}`);
      lines.push('');
    });
    if (notes.length) lines.push('【客人備註】', notes.join('\n'));
    return lines.join('\n');
  };
  const copyText = () => {
    const text = buildCopyText();
    fallbackText.value = text;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => { copyStatus.textContent = '已複製，可直接發給客服確認。'; fallback.classList.remove('is-visible'); }).catch(() => { fallback.classList.add('is-visible'); copyStatus.textContent = '目前瀏覽器不支持自動複製，請手動複製下方內容。'; });
    } else { fallback.classList.add('is-visible'); copyStatus.textContent = '目前瀏覽器不支持自動複製，請手動複製下方內容。'; }
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
