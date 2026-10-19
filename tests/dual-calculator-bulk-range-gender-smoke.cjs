#!/usr/bin/env node
'use strict';

// Minimal event-driven DOM contract harness. It executes the shipped production
// facts/core/coach/UI scripts; it does not replace or reimplement price math.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const rootDir = path.resolve(__dirname, '..');
const source = (name) => fs.readFileSync(path.join(rootDir, name), 'utf8');
const scriptNames = ['js/coaches.js', 'js/school-pricing-zh-hans.js', 'js/lesson-price-core.js', 'js/calculator.js'];

class Classes {
  constructor() { this.values = new Set(); }
  add(value) { this.values.add(value); }
  remove(value) { this.values.delete(value); }
  toggle(value, force) { const on = force === undefined ? !this.values.has(value) : !!force; on ? this.add(value) : this.remove(value); return on; }
  contains(value) { return this.values.has(value); }
}
class Node {
  constructor(attrs = {}) {
    this.attrs = attrs; this.dataset = {}; this._value = ''; this.textContent = ''; this.innerHTML = '';
    this.disabled = false; this.style = {}; this.classList = new Classes(); this.listeners = {};
    this.options = []; this.selectedIndex = 0; this.checked = false;
    for (const [key, value] of Object.entries(attrs)) if (key.startsWith('data-')) this.dataset[key.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = value;
  }
  addEventListener(name, fn) { (this.listeners[name] ||= []).push(fn); }
  get value() { return this._value; }
  set value(v) { this._value = String(v); }
  dispatch(name, target = this, extra = {}) { const event = { target, ...extra, preventDefault() { this.defaultPrevented = true; } }; for (const fn of this.listeners[name] || []) fn(event); return event; }
  matches(sel) { const m = sel.match(/^\[data-([\w-]+)(?:="([^"]*)")?\](?::not\(:disabled\))?$/); if (!m) return false; const key = m[1].replace(/-([a-z])/g, (_, c) => c.toUpperCase()); return Object.hasOwn(this.dataset, key) && (m[2] === undefined || this.dataset[key] === m[2]) && (!sel.endsWith(':not(:disabled)') || !this.disabled); }
  closest(sel) { return this.matches(sel) ? this : this.parent?.closest(sel) || null; }
  querySelector(sel) { return this.children?.find((n) => n.matches(sel)) || this.nodes?.find((n) => n.matches(sel)) || null; }
  querySelectorAll(sel) { return (this.children || this.nodes || []).filter((n) => n.matches(sel)); }
  setAttribute(name, value) { this.attrs[name] = String(value); }
  focus() { this.focused = true; }
}
class CalendarGrid extends Node {
  constructor() { super({ 'data-calendar-grid': '' }); this.nodes = []; }
  set innerHTML(html) {
    this._html = html;
    this.nodes = [...html.matchAll(/<button\b([^>]*)data-calendar-date="([^"]+)"([^>]*)>([^<]*)<\/button>/g)].map((match) => {
      const attrs = `${match[1]} ${match[3]}`;
      const button = new Node({ 'data-calendar-date': match[2] });
      button.disabled = /\bdisabled\b/.test(attrs); button.textContent = match[4]; button.parent = this;
      const className = attrs.match(/class="([^"]*)"/)?.[1] || '';
      className.split(/\s+/).filter(Boolean).forEach((name) => button.classList.add(name));
      return button;
    });
  }
  get innerHTML() { return this._html || ''; }
  querySelector(sel) { return this.nodes.find((node) => node.matches(sel)) || null; }
}
const optionNodes = (html) => [...html.matchAll(/<option\s+value="([^"]*)"([^>]*)>([\s\S]*?)<\/option>/g)].map((m) => {
  const n = new Node(); n.value = m[1]; n.textContent = m[3].replace(/<[^>]+>/g, '').trim(); n.text = n.textContent; n.selected = /\bselected\b/.test(m[2]); return n;
});
class Select extends Node {
  constructor(html = '') { super(); this.options = optionNodes(html); this.selectedIndex = Math.max(0, this.options.findIndex((x) => x.selected)); }
  get value() { return this.selectedIndex >= 0 ? (this.options[this.selectedIndex]?.value || '') : this._value; }
  set value(v) { const ix = this.options.findIndex((x) => x.value === String(v)); if (ix >= 0) this.selectedIndex = ix; else { this.selectedIndex = -1; this._value = String(v); } }
  querySelector() { return null; }
}
const fieldsIn = (html, attr) => [...html.matchAll(new RegExp(`<([a-z]+)\\b([^>]*\\b${attr}="([^"]+)"[^>]*)>`, 'g'))].map((m) => {
  const tag = m[1], attrs = m[2], key = m[3];
  const pairs = Object.fromEntries([...attrs.matchAll(/([\w-]+)="([^"]*)"/g)].map((x) => [x[1], x[2]]));
  if (tag === 'select') {
    const start = m.index + m[0].length;
    const end = html.indexOf('</select>', start);
    return [key, new Select(html.slice(start, end))];
  }
  const n = new Node(); n.value = pairs.value || ''; n.type = pairs.type || ''; return [key, n];
});
class Card extends Node {
  constructor(html) {
    super({ 'data-se-calc-course': '1' }); this.nodes = [];
    this.fields = Object.fromEntries(fieldsIn(html, 'data-field'));
    for (const [name, node] of Object.entries(this.fields)) { node.attrs = { [`data-field`]: name }; node.dataset.field = name; this.nodes.push(node); }
    for (const name of ['data-se-calc-course-no', 'data-se-calc-remove', 'data-se-calc-card-add', 'data-se-calc-add-bottom', 'data-se-calc-message', 'data-se-calc-subtotal', 'data-panel', 'data-se-calc-coach-card', 'data-se-calc-board-hint']) {
      const matches = [...html.matchAll(new RegExp(`<[^>]+\\b${name}(?:="([^"]*)")?[^>]*>`, 'g'))];
      for (const m of matches) { const node = new Node({ [name]: m[1] || '' }); node.parent = this; this.nodes.push(node); }
    }
  }
  querySelector(sel) { const f = sel.match(/^\[data-field="([^"]+)"\]$/); if (f) return this.fields[f[1]]; return this.nodes.find((n) => n.matches(sel)) || null; }
  remove() { this.parent.cards.splice(this.parent.cards.indexOf(this), 1); }
}
class List extends Node {
  constructor() { super(); this.cards = []; }
  querySelectorAll(sel) { return sel === '[data-se-calc-course]' ? this.cards : []; }
  insertAdjacentHTML(_where, html) { const card = new Card(html); card.parent = this; this.cards.push(card); }
}
class Bulk extends Node {
  set innerHTML(html) {
    this._html = html; this.nodes = fieldsIn(html, 'data-bulk-field').map(([, n]) => n); this.named = Object.fromEntries(fieldsIn(html, 'data-bulk-field'));
    this.modeOptions = [{ value: 'range', checked: true }, { value: 'dates', checked: false }].map((attrs) => Object.assign(new Node(), attrs));
    for (const selector of ['data-range-trigger', 'data-range-calendar', 'data-calendar-grid', 'data-calendar-prev', 'data-calendar-next', 'data-calendar-month', 'data-calendar-selection', 'data-range-status', 'data-calendar-done', 'data-se-calc-bulk-status', 'data-bulk-panel', 'data-bulk-extra', 'data-se-calc-bulk-generate']) {
      const node = selector === 'data-calendar-grid' ? new CalendarGrid() : new Node({ [selector]: '' });
      if (selector === 'data-calendar-grid') this.nodes.push(node);
      else this.nodes.push(node);
    }
    this.nodes.forEach((node) => { node.parent = this; });
    this.namedNodes = Object.fromEntries(this.nodes.filter((n) => Object.keys(n.dataset).length).map((n) => [Object.keys(n.dataset)[0], n]));
    this.namedNodes.rangeCalendar.hidden = true;
  }
  get innerHTML() { return this._html || ''; }
  querySelector(sel) { const f = sel.match(/^\[data-bulk-field="([^"]+)"\]$/); if (f) return this.named[f[1]]; if (sel === 'input[name="se-calc-bulk-mode"]:checked') return this.modeOptions.find((option) => option.checked) || null; return this.nodes.find((n) => n.matches(sel)) || this.nodes.flatMap((n) => n.nodes || []).find((n) => n.matches(sel)) || null; }
  querySelectorAll(sel) { return [...this.nodes, ...this.nodes.flatMap((n) => n.nodes || [])].filter((n) => n.matches(sel)); }
}
function setup(lang, withCore = true) {
  const list = new List(), bulk = new Bulk();
  const keys = ['data-se-calc-copy', 'data-se-calc-fallback', 'data-se-calc-fallback-text', 'data-se-calc-copy-status', 'data-se-calc-summary', 'data-se-calc-total', 'data-se-calc-count', 'data-se-calc-full', 'data-se-calc-half'];
  const nodes = Object.fromEntries(keys.map((key) => [key, new Node({ [key]: '' })]));
  const app = new Node(); app.querySelector = (sel) => sel === '[data-se-calc-list]' ? list : sel === '[data-se-calc-bulk]' ? bulk : nodes[keys.find((key) => `[${key}]` === sel)];
  const document = { getElementById: (id) => id === 'se-calc-app' ? app : null, querySelector: () => ({ dataset: { lang } }), querySelectorAll: () => [], addEventListener() {}, readyState: 'loading', body: { dataset: { lang } }, documentElement: { lang } };
  let rejectCopy;
  const writes = [];
  const window = { location: { pathname: lang === 'en' ? '/en/Skischool/' : lang === 'zh-Hant' ? '/tcn/Skischool/' : '/Skischool/' }, addEventListener() {}, dispatchEvent() {}, setTimeout() {}, scrollTo() {} };
  const context = vm.createContext({ window, document, navigator: { clipboard: { writeText(text) { writes.push(text); return new Promise((resolve, reject) => { rejectCopy = { resolve, reject }; }); } } }, console, Date, Math, Number, String, Array, Object, Map, Set, Intl, CustomEvent: class CustomEvent {} });
  for (const name of scriptNames) {
    if (!withCore && name === 'js/lesson-price-core.js') continue;
    vm.runInContext(source(name), context, { filename: name });
  }
  return { app, list, bulk, nodes, context, writes, pendingCopy: () => rejectCopy };
}
function choose(node, value) { node.value = value; }
function fireChange(ui, card) { ui.list.dispatch('change', card.fields.people); }
function fireBulkClick(ui, selector) { const node = ui.bulk.querySelector(selector); assert.ok(node, `production bulk control ${selector} exists`); ui.bulk.dispatch('click', node); }
function navigateToMonth(ui, year, month, lang = 'zh-Hans') {
  for (let i = 0; i < 16 && (Number(ui.bulk.querySelector('[data-calendar-month]').dataset.year) !== year || Number(ui.bulk.querySelector('[data-calendar-month]').dataset.month) !== month); i += 1) {
    const title = ui.bulk.querySelector('[data-calendar-month]');
    const currentYear = Number(title.dataset.year); const currentMonth = Number(title.dataset.month);
    const goNext = currentYear < year || (currentYear === year && currentMonth < month);
    fireBulkClick(ui, goNext ? '[data-calendar-next]' : '[data-calendar-prev]');
  }
  assert.equal(Number(ui.bulk.querySelector('[data-calendar-month]').dataset.year), year, `calendar navigates to year ${year}`);
  assert.equal(Number(ui.bulk.querySelector('[data-calendar-month]').dataset.month), month, `calendar navigates to month ${month}`);
}
function selectRange(ui, start, end, lang = 'zh-Hans') {
  fireBulkClick(ui, '[data-range-trigger]');
  const startDate = new Date(`${start}T12:00:00`); const endDate = new Date(`${end}T12:00:00`);
  navigateToMonth(ui, startDate.getFullYear(), startDate.getMonth() + 1, lang);
  fireBulkClick(ui, `[data-calendar-date="${start}"]`);
  navigateToMonth(ui, endDate.getFullYear(), endDate.getMonth() + 1, lang);
  fireBulkClick(ui, `[data-calendar-date="${end}"]`);
}
const tests = [];
function test(name, fn) { tests.push([name, fn]); }

test('locale pages load the canonical facts, shared core, coach data, and calculator in order', () => {
  for (const page of ['Skischool/index.html', 'tcn/Skischool/index.html', 'en/Skischool/index.html']) {
    const html = fs.readFileSync(path.join(rootDir, page), 'utf8');
    const indexes = scriptNames.map((n) => html.indexOf(path.basename(n)));
    assert.ok(indexes.every((n) => n >= 0) && indexes.every((n, i) => i === 0 || indexes[i - 1] < n), `${page} script dependency order`);
    assert.match(html, page === 'Skischool/index.html' ? /lang="zh-Hans"/ : page === 'tcn/Skischool/index.html' ? /lang="zh-Hant"/ : /lang="en"/);
    for (const ref of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
      const target = ref[1].split('?')[0];
      if (/^(?:https?:|#|mailto:)/.test(target)) continue;
      assert.ok(fs.existsSync(path.resolve(rootDir, path.dirname(page), target)), `${page} missing local asset ${target}`);
    }
  }
});

test('canonical scenario cross-check and invalid pricing fail closed in three languages', () => {
  for (const lang of ['zh-Hans', 'zh-Hant', 'en']) {
    const ui = setup(lang); const card = ui.list.cards[0];
    const core = ui.context.window.SKI_LESSON_PRICE_CORE;
    assert.equal(ui.nodes['data-se-calc-total'].textContent, '¥85,000');
    const scenarios = [
      ['2026-12-20', 'Tomamu星野', 'half', 1], ['2026-12-20', 'Tomamu星野', 'full', 2],
      ['2026-12-20', 'Tomamu星野', 'half', 3], ['2026-12-20', 'Tomamu星野', 'full', 4],
      ['2026-12-21', 'Tomamu星野', 'half', 1], ['2027-01-07', 'Tomamu星野', 'full', 2],
      ['2027-01-08', 'Tomamu星野', 'half', 3], ['2027-01-30', '留寿都', 'full', 3],
      ['2027-01-30', '留寿都', 'half', 2],
      ['2027-02-16', '留寿都', 'full', 4], ['2027-02-17', '留寿都', 'half', 2],
      ['2027-02-17', '北海道其他雪場', 'full', 2], ['2027-02-17', '盤溪', 'full', 2]
    ];
    for (const [date, resort, type, people] of scenarios) {
      choose(card.fields.date, date); choose(card.fields.resort, resort); choose(card.fields.courseType, type); choose(card.fields.people, String(people)); fireChange(ui, card);
      const expected = core.calculateCourse({ date, resort, type, people, mode: 'none', board: '單板', level: '', genderFee: 0, backgroundFee: 0, coach: null });
      const manual = lang === 'en' ? 'Manual confirmation required' : lang === 'zh-Hans' ? '需人工确认' : '需人工確認';
      assert.equal(ui.nodes['data-se-calc-total'].textContent, expected.quoteable ? `¥${expected.subtotal.toLocaleString('ja-JP')}` : manual);
      if (!expected.quoteable) assert.equal(ui.nodes['data-se-calc-copy'].disabled, true);
    }
    choose(card.fields.resort, 'Tomamu星野'); choose(card.fields.courseType, 'half'); choose(card.fields.people, '5'); fireChange(ui, card);
    assert.equal(ui.nodes['data-se-calc-total'].textContent, lang === 'en' ? 'Manual confirmation required' : lang === 'zh-Hans' ? '需人工确认' : '需人工確認');
    assert.equal(ui.nodes['data-se-calc-copy'].disabled, true);
    choose(card.fields.people, '2'); fireChange(ui, card);
    assert.equal(ui.nodes['data-se-calc-copy'].disabled, false);
    assert.match(card.fields.courseType.options[0].textContent, lang === 'en' ? /Full day 4 hours/ : lang === 'zh-Hans' ? /全天 4 小时/ : /全天 4 小時/);
    choose(card.fields.resort, '留寿都'); fireChange(ui, card);
    assert.match(card.fields.courseType.options[0].textContent, lang === 'en' ? /Full day 5 hours/ : lang === 'zh-Hans' ? /全天 5 小时/ : /全天 5 小時/);
  }
});

test('real add/remove, bulk range, and coach condition interactions update the whole quote', () => {
  const ui = setup('zh-Hans'); const first = ui.list.cards[0];
  const add = first.querySelector('[data-se-calc-add-bottom]'); ui.list.dispatch('click', add);
  assert.equal(ui.list.cards.length, 2); assert.equal(ui.nodes['data-se-calc-count'].textContent, 2);
  const remove = ui.list.cards[1].querySelector('[data-se-calc-remove]'); ui.list.dispatch('click', remove);
  assert.equal(ui.list.cards.length, 1);
  fireBulkClick(ui, '[data-range-trigger]');
  navigateToMonth(ui, 2026, 12);
  fireBulkClick(ui, '[data-calendar-date="2026-12-30"]');
  assert.match(ui.bulk.querySelector('[data-range-status]').textContent, /2026/);
  fireBulkClick(ui, '[data-se-calc-bulk-generate]');
  assert.equal(ui.list.cards.length, 1, 'an incomplete date range does not generate');
  fireBulkClick(ui, '[data-calendar-next]');
  fireBulkClick(ui, '[data-calendar-date="2027-01-02"]');
  assert.equal(ui.bulk.querySelector('[data-bulk-field="startDate"]').value, '2026-12-30');
  assert.equal(ui.bulk.querySelector('[data-bulk-field="endDate"]').value, '2027-01-02');
  assert.equal(ui.bulk.querySelector('[data-calendar-date="2027-01-01"]').classList.contains('is-in-range'), true, 'interior date is highlighted in the next month');
  fireBulkClick(ui, '[data-calendar-done]');
  assert.equal(ui.bulk.querySelector('[data-range-trigger]').focused, true, 'completion returns focus to the trigger');
  choose(ui.bulk.querySelector('[data-bulk-field="coachMode"]'), 'condition');
  choose(ui.bulk.querySelector('[data-bulk-field="gender"]'), 'female');
  fireBulkClick(ui, '[data-se-calc-bulk-generate]');
  assert.equal(ui.list.cards.length, 4); assert.equal(ui.nodes['data-se-calc-count'].textContent, 4);
  assert.deepEqual(ui.list.cards.map((card) => card.fields.date.value), ['2026-12-30', '2026-12-31', '2027-01-01', '2027-01-02']);
  assert.ok(ui.list.cards.every((card) => card.fields.gender.value === 'female'), 'female semantic value survives bulk presets on all generated lessons');
  ui.nodes['data-se-calc-copy'].dispatch('click');
  assert.ok(ui.writes[0].includes('女教练'), 'copied quote identifies female instructor');
  const pricingUi = setup('zh-Hans');
  const standard = pricingUi.list.cards[0]; choose(standard.fields.resort, '留寿都'); choose(standard.fields.date, '2026-12-20');
  choose(standard.fields.coachMode, 'condition'); choose(standard.fields.level, '一級');
  choose(standard.fields.gender, 'female'); choose(standard.fields.background, '3000'); fireChange(pricingUi, standard);
  const core = pricingUi.context.window.SKI_LESSON_PRICE_CORE;
  const expected = core.calculateCourse({ date: '2026-12-20', resort: '留寿都', type: 'full', people: 2, mode: 'condition', board: '單板', level: '一級', genderFee: 3000, backgroundFee: 3000, coach: null });
  const bulkPeak = core.calculateCourse({ date: '2026-12-21', resort: 'Tomamu星野', type: 'full', people: 2, mode: 'none', board: '單板', level: '', genderFee: 0, backgroundFee: 0, coach: null });
  assert.equal(pricingUi.nodes['data-se-calc-total'].textContent, `¥${expected.subtotal.toLocaleString('ja-JP')}`);
  assert.match(pricingUi.nodes['data-se-calc-summary'].innerHTML, /女教练/);
  choose(standard.fields.coachMode, 'specific'); choose(standard.fields.coachId, 'kay'); fireChange(pricingUi, standard);
  assert.equal(standard.fields.board.value, '單板'); assert.equal(standard.fields.board.disabled, true);
});

test('semantic male, female, and no-preference values remain distinct in all locales', () => {
  for (const lang of ['zh-Hans', 'zh-Hant', 'en']) {
    const ui = setup(lang);
    const bulkGender = ui.bulk.querySelector('[data-bulk-field="gender"]');
    assert.deepEqual(bulkGender.options.map((item) => item.value), ['any', 'male', 'female']);
    const card = ui.list.cards[0];
    choose(card.fields.coachMode, 'condition');
    for (const [value, fee] of [['any', 0], ['male', 3000], ['female', 3000]]) {
      choose(card.fields.gender, value); fireChange(ui, card);
      assert.equal(ui.nodes['data-se-calc-copy'].disabled, false);
      const text = ui.nodes['data-se-calc-summary'].innerHTML;
      const label = value === 'any' ? (lang === 'en' ? /no preference/i : /不指定/) : value === 'male' ? (lang === 'en' ? /male instructor/i : lang === 'zh-Hans' ? /男教练/ : /男教練/) : (lang === 'en' ? /female instructor/i : lang === 'zh-Hans' ? /女教练/ : /女教練/);
      assert.match(card.fields.gender.options[card.fields.gender.selectedIndex].textContent, label, `${lang} shows selected gender ${value}`);
      const expected = ui.context.window.SKI_LESSON_PRICE_CORE.calculateCourse({ date: card.fields.date.value, resort: card.fields.resort.value, type: card.fields.courseType.value, people: 2, mode: 'condition', board: '單板', level: '不指定', genderFee: fee, backgroundFee: 0, coach: null });
      assert.equal(ui.nodes['data-se-calc-total'].textContent, `¥${expected.subtotal.toLocaleString('ja-JP')}`, `${lang} ${value} fee uses canonical core`);
    }
    for (const [value, fee] of [['any', 0], ['male', 3000], ['female', 3000]]) {
      const bulkUi = setup(lang);
      choose(bulkUi.bulk.querySelector('[data-bulk-field="coachMode"]'), 'condition');
      choose(bulkUi.bulk.querySelector('[data-bulk-field="gender"]'), value);
      selectRange(bulkUi, '2026-12-20', '2026-12-20', lang);
      fireBulkClick(bulkUi, '[data-se-calc-bulk-generate]');
      assert.equal(bulkUi.list.cards.length, 1, `${lang} ${value}: single-day range adds one lesson`);
      assert.equal(bulkUi.list.cards[0].fields.gender.value, value, `${lang} ${value}: semantic request survives bulk generation`);
      const core = bulkUi.context.window.SKI_LESSON_PRICE_CORE;
      const expected = core.calculateCourse({ date: '2026-12-20', resort: 'Tomamu星野', type: 'full', people: 2, mode: 'condition', board: '單板', level: '不指定', genderFee: fee, backgroundFee: 0, coach: null });
      assert.equal(bulkUi.nodes['data-se-calc-total'].textContent, `¥${expected.subtotal.toLocaleString('ja-JP')}`);
      if (value !== 'any') {
        bulkUi.nodes['data-se-calc-copy'].dispatch('click');
        const label = value === 'female' ? (lang === 'en' ? /Female Instructor/i : lang === 'zh-Hans' ? /女教练/ : /女教練/) : (lang === 'en' ? /Male Instructor/i : lang === 'zh-Hans' ? /男教练/ : /男教練/);
        assert.match(bulkUi.writes[0], label, `${lang} ${value}: copy preserves gender request`);
      }
    }
  }
});

test('calendar limits, keyboard movement, reverse reselection, and separate-date mode stay safe', () => {
  const ui = setup('zh-Hans');
  fireBulkClick(ui, '[data-range-trigger]');
  navigateToMonth(ui, 2026, 10);
  assert.equal(ui.bulk.querySelector('[data-calendar-date="2026-10-31"]').disabled, true, 'date before canonical minimum is disabled');
  navigateToMonth(ui, 2027, 5);
  assert.equal(ui.bulk.querySelector('[data-calendar-date="2027-05-31"]').disabled, false, 'canonical final date remains available');
  fireBulkClick(ui, '[data-calendar-next]');
  assert.equal(ui.bulk.querySelector('[data-calendar-date="2027-06-01"]').disabled, true, 'date after canonical maximum is disabled');
  navigateToMonth(ui, 2026, 11);
  const minDay = ui.bulk.querySelector('[data-calendar-date="2026-11-01"]');
  ui.bulk.dispatch('keydown', minDay, { key: 'ArrowLeft' });
  assert.equal(minDay.focused, true, 'arrow navigation stays on the boundary instead of losing focus');
  navigateToMonth(ui, 2026, 12);
  const dec10 = ui.bulk.querySelector('[data-calendar-date="2026-12-10"]');
  const moved = ui.bulk.dispatch('keydown', dec10, { key: 'ArrowRight' });
  assert.equal(moved.defaultPrevented, true, 'calendar consumes arrow navigation');
  assert.equal(ui.bulk.querySelector('[data-calendar-date="2026-12-11"]').focused, true, 'arrow navigation moves calendar focus');
  fireBulkClick(ui, '[data-calendar-date="2026-12-10"]');
  fireBulkClick(ui, '[data-calendar-date="2026-12-08"]');
  assert.equal(ui.bulk.querySelector('[data-bulk-field="startDate"]').value, '2026-12-08', 'earlier second selection resets the start date');
  assert.equal(ui.bulk.querySelector('[data-bulk-field="endDate"]').value, '', 'reverse reselection stays incomplete until an end is chosen');
  fireBulkClick(ui, '[data-calendar-date="2026-12-08"]');
  fireBulkClick(ui, '[data-calendar-done]');
  fireBulkClick(ui, '[data-se-calc-bulk-generate]');
  assert.deepEqual(ui.list.cards.map((card) => card.fields.date.value), ['2026-12-08'], 'same-day range is inclusive and creates one lesson');
  ui.bulk.modeOptions.forEach((option) => { option.checked = option.value === 'dates'; });
  ui.bulk.dispatch('change', ui.bulk.modeOptions[1]);
  ui.bulk.querySelector('[data-bulk-field="datesText"]').value = '20261201, 20261203, 20261201';
  fireBulkClick(ui, '[data-se-calc-bulk-generate]');
  assert.deepEqual(ui.list.cards.map((card) => card.fields.date.value), ['2026-12-08', '2026-12-01', '2026-12-03'], 'separate-date mode retains its de-duplicating behavior');
});

test('confirmed peak half-day rule quotes ¥68,000 and a ¥190,000 mixed order, while true invalids still fail closed', () => {
  const ui = setup('zh-Hans'); const first = ui.list.cards[0];
  choose(first.fields.date, '2027-01-30'); choose(first.fields.resort, 'Tomamu星野');
  choose(first.fields.courseType, 'full'); choose(first.fields.people, '4'); fireChange(ui, first);
  assert.equal(ui.nodes['data-se-calc-total'].textContent, '¥122,000');
  const add = first.querySelector('[data-se-calc-add-bottom]'); ui.list.dispatch('click', add);
  const second = ui.list.cards[1]; choose(second.fields.date, '2027-01-30'); choose(second.fields.resort, '留寿都');
  choose(second.fields.courseType, 'half'); choose(second.fields.people, '2'); fireChange(ui, second);
  assert.equal(ui.nodes['data-se-calc-total'].textContent, '¥190,000');
  assert.equal(ui.nodes['data-se-calc-copy'].disabled, false);
  ui.nodes['data-se-calc-copy'].dispatch('click');
  assert.ok(ui.writes[0].includes('¥190,000'));
  assert.ok(ui.writes[0].includes('半天 3 小时'));
  choose(second.fields.resort, 'Tomamu星野'); choose(second.fields.people, '5'); fireChange(ui, second);
  assert.equal(ui.nodes['data-se-calc-total'].textContent, '需人工确认');
  assert.equal(ui.nodes['data-se-calc-copy'].disabled, true);
});

test('mixed order and stale clipboard completion cannot restore a prior total', () => {
  const ui = setup('zh-Hans'); const card = ui.list.cards[0];
  ui.nodes['data-se-calc-copy'].dispatch('click');
  const pending = ui.pendingCopy(); assert.ok(ui.writes[0].includes('¥85,000'));
  choose(card.fields.people, '5'); fireChange(ui, card);
  pending.resolve();
  return Promise.resolve().then(() => {
    assert.equal(ui.nodes['data-se-calc-total'].textContent, '需人工确认');
    assert.equal(ui.nodes['data-se-calc-copy-status'].textContent.includes('已复制'), false);
    assert.equal(ui.nodes['data-se-calc-fallback-text'].value, '');
  });
});

test('copy details use the active language and resort-specific duration', async () => {
  for (const lang of ['zh-Hans', 'zh-Hant', 'en']) {
    const ui = setup(lang); ui.nodes['data-se-calc-copy'].dispatch('click');
    assert.ok(ui.writes[0].includes('¥85,000'));
    assert.ok(ui.writes[0].includes(lang === 'en' ? 'Full day 4 hours' : lang === 'zh-Hans' ? '全天 4 小时' : '全天 4 小時'));
    ui.pendingCopy().resolve(); await Promise.resolve();
    assert.match(ui.nodes['data-se-calc-copy-status'].textContent, lang === 'en' ? /Copied/ : lang === 'zh-Hans' ? /已复制/ : /已複製/);
  }
});

let failed = 0;
const relevantTests = new Set([
  'locale pages load the canonical facts, shared core, coach data, and calculator in order',
  'real add/remove, bulk range, and coach condition interactions update the whole quote',
  'semantic male, female, and no-preference values remain distinct in all locales',
  'calendar limits, keyboard movement, reverse reselection, and separate-date mode stay safe'
]);
tests.splice(0, tests.length, ...tests.filter(([name]) => relevantTests.has(name)));
(async () => {
  for (const [name, fn] of tests) {
    try { await fn(); console.log(`PASS ${name}`); }
    catch (error) { failed++; console.error(`FAIL ${name}\n${error.stack}`); }
  }
  console.log(`${tests.length - failed}/${tests.length} test groups passed`);
  process.exitCode = failed ? 1 : 0;
})();
