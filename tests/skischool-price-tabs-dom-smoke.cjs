// Lightweight event-driven smoke test for the production price-tab script.
// Run from this directory with: node tests/skischool-price-tabs-dom-smoke.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

class Element {
  constructor(dataset = {}) {
    this.dataset = dataset;
    this.handlers = {};
    this.attributes = {};
    this.hidden = false;
    this.tabIndex = 0;
    this.classList = { toggle() {} };
  }
  addEventListener(type, handler) { (this.handlers[type] ||= []).push(handler); }
  setAttribute(name, value) { this.attributes[name] = value; }
  focus() { this.focused = true; }
  dispatch(type, event = {}) {
    for (const handler of this.handlers[type] || []) {
      handler({ ...event, preventDefault() { this.prevented = true; } });
    }
  }
}

const scriptDir = path.join(__dirname, '..', 'js');
const factScript = fs.readFileSync(path.join(scriptDir, 'school-pricing-zh-hans.js'), 'utf8');
const coreScript = fs.readFileSync(path.join(scriptDir, 'lesson-price-core.js'), 'utf8');
const tabsScript = fs.readFileSync(path.join(scriptDir, 'skischool-price-tabs.js'), 'utf8');
for (const lang of ['zh-Hans', 'zh-Hant', 'en']) {
  const tabsRoot = new Element();
  const panelsRoot = new Element();
  let tabs = [];
  let panels = [];
  Object.defineProperty(tabsRoot, 'innerHTML', {
    set(html) {
      this.html = html;
      tabs = [...html.matchAll(/data-price-tab="([^"]+)"/g)]
        .map(([, id]) => new Element({ priceTab: id }));
    }
  });
  Object.defineProperty(panelsRoot, 'innerHTML', {
    set(html) {
      this.html = html;
      panels = [...html.matchAll(/data-price-panel="([^"]+)"/g)]
        .map(([, id]) => new Element({ pricePanel: id }));
    }
  });
  tabsRoot.querySelectorAll = () => tabs;
  panelsRoot.querySelectorAll = () => panels;
  const root = new Element();
  root.querySelector = selector => selector === '[data-price-tabs]' ? tabsRoot : panelsRoot;
  const document = {
    documentElement: { lang },
    querySelector: selector => selector === '[data-school-price-v2]' ? root : null,
    querySelectorAll: () => []
  };
  const window = {};
  vm.runInNewContext(factScript, { window });
  vm.runInNewContext(coreScript, { window, Date, Math, Number, String });
  vm.runInNewContext(tabsScript, { document, window, Intl });

  assert.equal(tabs.length, 7, `${lang}: seven resort tabs`);
  assert.equal(panels.length, 7, `${lang}: seven price panels`);
  assert.equal((tabsRoot.html.match(/官方登记|官方登記|Officially registered/g) || []).length, 4,
    `${lang}: only four registered resorts`);
  assert.match(panelsRoot.html, /¥58,000/);
  assert.match(panelsRoot.html, /¥122,000/);
  assert.match(panelsRoot.html, /2\.5/);
  assert.match(panelsRoot.html, /4 小时教学|共 4 小時教學|4 teaching hours/);
  const prepCopy = lang === 'en'
    ? 'The instructor will meet guests about 30 minutes before the lesson to assist with rental procedures, equipment preparation, and checking that gear is properly worn.'
    : lang === 'zh-Hant'
      ? '教練將於課程開始前約 30 分鐘與學員集合，協助租賃手續、裝備準備及檢查穿戴。'
      : '教练将在课程开始前约 30 分钟与学员集合，协助租赁手续、装备准备及检查穿戴。';
  assert.equal(panelsRoot.html.includes(prepCopy), true, `${lang}: exact Tomamu preparation copy`);
  for (const removedCopy of ['这是课前装备准备协助，不计入教学时长。', '这项准备协助不额外收费。', '此為課前裝備準備協助，不計入教學時數。', '此準備協助不另行收費。', 'This preparation support is outside lesson instruction time.', 'No separate fee is charged for this preparation support.']) {
    assert.equal(panelsRoot.html.includes(removedCopy), false, `${lang}: removed preparation tail`);
  }

  tabs[0].dispatch('keydown', { key: 'ArrowRight' });
  assert.equal(tabs[1].attributes['aria-selected'], 'true', `${lang}: ArrowRight selects next tab`);
  assert.equal(panels[1].hidden, false, `${lang}: ArrowRight reveals next panel`);
  assert.equal(tabs[1].focused, true, `${lang}: ArrowRight moves focus`);
  tabs[6].dispatch('click');
  assert.equal(tabs[6].attributes['aria-selected'], 'true', `${lang}: click selects tab`);
  assert.equal(panels[6].hidden, false, `${lang}: click reveals panel`);
  console.log(`${lang}: passed seven-tab, registration, Tomamu price, keyboard and click checks`);
}
