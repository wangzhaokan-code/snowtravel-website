// Exercise the production calculator's locale conversion helpers without a browser dependency.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const calculatorPath = path.join(__dirname, '..', 'js', 'calculator.js');
const calculatorSource = fs.readFileSync(calculatorPath, 'utf8');
const injectionPoint = '  const i18n = window.SNOWTRAVEL_I18N || {};';
assert.ok(calculatorSource.includes(injectionPoint), 'production locale helper test seam exists');
const instrumentedSource = calculatorSource.replace(
  injectionPoint,
  `  window.__localeSmoke = { localToSimplified, localToTraditional, localToEnglish };\n  return;\n${injectionPoint}`
);

const messages = [
  ['Tomamu 每组最多 4 人，超过 4 人请联系客服安排分组。', 'Tomamu 每組最多 4 人，超過 4 人請聯繫客服安排分組。', 'Tomamu groups are limited to 4 guests. Please contact us to arrange larger groups.'],
  ['旺季半天课程请联系客服确认指定日期是否可以安排。', '旺季半天課程請聯繫客服確認指定日期是否可以安排。', 'Please contact us to confirm whether a peak-season half-day lesson is available on your date.'],
  ['此雪场暂不提供自动估价，请联系客服确认。', '此雪場暫不提供自動估價，請聯繫客服確認。', 'Automatic pricing is unavailable for this resort. Please contact our team.'],
  ['此雪场不在当前公开价目表中，请联系客服确认价格。', '此雪場不在當前公開價目表中，請聯繫客服確認價格。', 'This resort is not on the current public price list. Please contact our team to confirm pricing.'],
  ['课程日期超出当前可估价范围，请联系客服确认。', '課程日期超出當前可估價範圍，請聯繫客服確認。', 'This date is outside the current estimate range. Please contact our team.'],
  ['无法识别雪场，请联系客服确认。', '無法識別雪場，請聯繫客服確認。', 'This resort could not be identified. Please contact our team.'],
  ['请填写有效课程人数。', '請填寫有效課程人數。', 'Please enter a valid number of guests.'],
  ['指定教练费用按天计算，同一天安排多节课程时请联系客服确认总价。', '指定教練費用按天計算，同一天安排多節課程時請聯繫客服確認總價。', 'Instructor request fees are daily. Please contact us to confirm the total when multiple lessons are booked on the same day.'],
  ['请输入有效人数。', '請輸入有效人數。', 'Please enter a valid number of guests.']
];

for (const [locale, index, helper] of [['zh-Hans', 0, 'localToSimplified'], ['zh-Hant', 1, 'localToTraditional'], ['en', 2, 'localToEnglish']]) {
  const window = {};
  vm.runInNewContext(instrumentedSource, {
    window,
    document: { getElementById: () => ({}), documentElement: { lang: locale }, body: { dataset: { lang: locale } } }
  });
  for (const row of messages) assert.equal(window.__localeSmoke[helper](row[0]), row[index], `${locale}: ${row[0]}`);
  if (locale === 'en') {
    for (const row of messages) assert.doesNotMatch(window.__localeSmoke[helper](row[0]), /[\u3400-\u9fff]/, `${locale}: no CJK remains in ${row[0]}`);
  }
  console.log(`${locale}: ${messages.length} production calculator error messages rendered correctly`);
}
