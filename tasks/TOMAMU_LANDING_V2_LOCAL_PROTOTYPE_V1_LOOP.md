# TOMAMU_LANDING_V2_LOCAL_PROTOTYPE_V1_LOOP

状态：ready_for_codex_execution
日期：2026-09-28 JST
项目：雪旅官网制作
正式项目根：`~/AI项目中心/工作区/雪旅官网制作/`

## 0. 本轮目标

制作一个 **Tomamu 落地页 2.0 本地独立草案**，供用户视觉和信息架构确认。

本轮严格禁止修改当前正式网站落地页、正式 URL、正式 Git 发布内容或线上站点。

草案建立在正式项目根内、正式网站源码之外：

`~/AI项目中心/工作区/雪旅官网制作/07_落地页升级草案/Tomamu_v2/`

本轮只做简体中文试点。繁中/英文待用户确认结构后再扩展。

## 1. 启动门禁

Codex 开始前必须：

1. 验证 `~/AI项目中心/AI记忆库/AI_START.md` 存在且可读；
2. 验证 `~/AI项目中心` 指向当前 Mac 正确的 Google Drive 本地同步根；
3. 进入 `~/AI项目中心/工作区/雪旅官网制作/`；
4. 读取项目入口、当前状态、长期记忆、项目工作方法和 `GPT-Codex-云盘协作.md`；
5. 检查 `03_网站源码/` Git 状态并记录 HEAD，但不得为了本任务修改正式源码。

如果统一根目录、同步状态或正式项目根无法确认，停止并报告 blocker；不得另建 Documents/Downloads/workspace 副本。

## 2. 用户已确认的产品方向

Tomamu 作为雪场落地页 2.0 试点。

目标不再只是 SEO 页面，而是同时承担：

1. 滑雪课程销售落地页；
2. 可直接发给已咨询/已预约客人的 Tomamu 实用指南；
3. Tomamu 官方日文资讯的结构化、多语言展示前端；
4. 后续 Rusutsu / Teine / Sapporo Kokusai 等雪场可复用的数据与页面结构样板。

## 3. 外部事实源规则

雪场外部事实只允许使用 **星野リゾート トマム官方日文网页** 作为主事实源。

禁止：
- 用官方英文/简中/繁中页反向覆盖日文事实；
- 从博客、OTA、论坛或第三方攻略填充官方事实字段；
- 因 26/27 未公布而沿用 25/26 数值假装当前；
- 把实时运营信息缓存成长期稳定事实。

流程：

`官方日文页 → 日文原始事实 → 结构化标准字段 → 显示翻译 → 简中页面`

翻译展示不得反向改写日文原始事实。

## 4. 更新策略

不做实时抓取。

默认：
- 每月检查一次；
- 用户可以随时手动触发；
- 每次检查先 diff，再更新变化字段；
- 每条事实单独保存 `season / source_url_ja / source_checked_at / source_status`；
- 不因同一页面其他栏目已更新，就推断所有栏目属于同一雪季。

实时运营类数据（今日 lift 开关、临时停运、天气、当日雪况、库存、巴士临时延误）不进入月度事实库；页面只提供官方实时入口和提示。

## 5. 当前已核验的日文官方来源与种子事实

核验日期：2026-09-28 JST。

### 5.1 Rental
日文源：
`https://www.snowtomamu.jp/winter/ski/rental/`

当前 source season：`2026-2027`

V1 页面重点展示：
- Web 预约预计 2026-10-01 开始；
- 成人 12岁以上 / 儿童 11岁以下；
- Ski full set / Snowboard full set：
  - 5小时：成人 17,000 / 儿童 12,800 日元
  - 1日：成人 18,000 / 儿童 13,500 日元
  - 2日：成人 26,900 / 儿童 20,200 日元
- Ski 3-piece / Snowboard 2-piece：
  - 5小时：成人 8,000 / 儿童 6,000
  - 1日：成人 8,500 / 儿童 6,400
- Helmet：
  - 5小时 1,500
  - 1日 2,000
- Gloves / knit cap：官方页标为销售，各 2,000 日元，不是 rental；
- 5小时方案仅限借出当天、不可跨日；
- 1日方案截至借出日雪场营业结束；
- 连续2日以上截至最终日雪场营业结束；
- Rental locations/hours：
  - Tomamu The Tower：
    - 2026-12-01～12-25 08:30–16:00
    - 2026-12-26～2027-03-31 08:30–17:00
    - 2027-04-01～04-05 08:30–16:00
  - RISONARE Tomamu：
    - 2026-12-12～12-25 08:45–16:00
    - 2026-12-26～2027-03-31 08:45–17:00
  - Resort Center Rental / VECTOR GLIDE Demo Center：
    - 2026-12 mid ～ 2027-03-31 08:45–15:30
- 官方提示：营业期可能因积雪情况变更。

V1 不需要把官网所有 rental SKU 铺满。必须提供“查看完整官方价目”链接。

### 5.2 Lift Ticket
日文源：
`https://www.snowtomamu.jp/winter/ski/ticket/`

当前页面明确：
- `2025-2026年の情報です`
- `2026-2027年のゴンドラ・リフト料金は9月頃に掲載`

因此：
- `season = 2025-2026`
- `source_status = awaiting_2026_2027_update`
- V1 页面不得把 25/26 票价当 26/27；
- 页面显示：
  `2026–27 雪季雪票价格：官方日文页尚未更新；最后核验 2026-09-28。`
- 提供官方日文雪票页链接。

### 5.3 Mountain / Ski Area
日文源：
`https://www.snowtomamu.jp/winter/ski/ski-slope/`

当前 source season：`2026-2027`

已确认：
- 29 courses：advanced 4 / intermediate 14 / beginner 10 / first-timer 1
- total ski distance ~21.5km
- longest run 4,200m
- vertical drop 585m
- 1 gondola + 5 lifts
- operating period：2026-12-01 ～ 2027-04-05
- 页面显示“营业时间可能因天气/其他原因临时变化，实时情况看官方今日运营信息”。

## 6. 雪缘自己的事实层

与 Tomamu 官方事实分开，不混字段。

V1 可沿用当前正式网站已经公开并可确认的雪缘稳定内容：
- Snow Affinity / 雪缘中文滑雪学校；
- Tomamu 已完成官方商业登记/可在规则范围内合规教学；
- 私人课程；
- Ski / Snowboard；
- 主要中文教学，部分教练可英语/粤语等，具体需确认；
- 当前 Tomamu 课程价格继续以正式网站事实源/价格计算器为准；
- 不复制平台专属价格覆盖直客事实。

若某字段不能从当前正式网站事实源确认，不自行补。

## 7. 官方事实与雪旅建议必须视觉区分

页面至少使用两种明确标签：

- `Tomamu 官方信息`
- `雪旅给学员的建议`

官方事实例如：
- Rental location / price / opening hours / ticket status。

雪旅建议例如：
- 上午 9:00 课程不要当天临近上课才去租装备；
- 建议提前完成雪具准备；
- 第一次滑雪客人如何选 full set / 3-piece / 2-piece。

不得把雪旅经验写成“Tomamu 官方规定”。

## 8. V1 页面信息架构

建议顺序：

1. Hero
   - Tomamu 星野中文滑雪课
   - 价值主张
   - CTA：查看课程价格 / 课程前准备指南

2. Quick Guide / 一眼看懂 Tomamu
   - 26/27 营业日期
   - 29条雪道
   - Rental 已更新 26/27
   - Lift ticket 26/27 尚待官方更新
   - 最后核验日期

3. 雪缘课程
   - 课程类型
   - 适合人群
   - 语言
   - 合规登记
   - 价格入口
   - 教练入口

4. 上课前要准备什么
   - ski/snowboard
   - boots
   - helmet
   - gloves / goggles / wear
   - lift ticket
   - 何时准备

5. Snow Gear Rental
   - full set / basic set / helmet
   - adult / child
   - location cards
   - hours
   - Web reservation date
   - Official link
   - Snow Travel advice

6. Lift Ticket
   - 重点突出数据状态
   - 26/27 未发布时绝不展示为当前价格
   - Official link
   - “上线前再检查”提示

7. Tomamu Ski Area
   - 29 courses
   - beginner suitability
   - operating season
   - official current operations link

8. 酒店 / 区域与集合逻辑
   - V1 先建立 UI 区块；
   - 没有足够正式事实时不猜具体集合点；
   - 可显示 Tower / RISONARE / Resort Center 的关系性提示；
   - 具体课程集合规则只使用雪缘正式事实。

9. FAQ
   - 雪具去哪里租？
   - 要不要提前租？
   - full set 包什么？
   - 手套/帽子能租吗？
   - 雪票包不包含在课程费里？
   - 小孩需要雪票吗？
   - 课程当天才租雪具来得及吗？
   - Ski + Snowboard 混合家庭怎么安排？
   - 其他只有正式业务规则支持时才写。

10. Contact / Booking
    - 沿用现有公开联系方式
    - 可复制账号
    - QR 可只读引用当前正式公开 assets

## 9. 草案文件结构

创建：

`~/AI项目中心/工作区/雪旅官网制作/07_落地页升级草案/Tomamu_v2/`

建议：
- `index.html`
- `styles.css`
- `app.js`
- `data/tomamu-official-ja.js`
- `data/tomamu-display-zh-hans.js`
- `data/snow-affinity.js`
- `README.md`
- `SOURCE_MANIFEST.md`

要求：
- 不依赖构建工具；
- 不需要 npm；
- 支持直接双击 `index.html` 用 `file://` 查看；
- 不使用 fetch 读取 JSON，避免 file:// CORS；
- 响应式适配桌面和手机；
- 第一版允许使用现有公开品牌资产的只读相对引用；
- 不接触任何敏感原件。

## 10. 视觉方向

不是重新设计整个品牌。

目标：
- 与当前 Snowtravel / 雪缘网站视觉有亲缘关系；
- 但比现有模板落地页更像“成熟的旅游服务指南 + 课程产品页”；
- 信息密度高但不拥挤；
- 手机端优先可读；
- 价格表避免横向溢出；
- 用卡片、状态徽章、分区标题和清晰 CTA 建立层级；
- “26/27已更新 / 待官方更新 / 实时以官方为准”必须一眼可见；
- 不做花哨大动画；
- 不伪造 Tomamu 官方 Logo、地图或照片；
- 没有合法可用的雪场图片时，先用排版、渐变、当前网站公开素材完成 V1，不从 Google 图片抓图。

## 11. 禁止范围

本轮禁止修改：
- `03_网站源码/tomamu-ski-lesson/`
- `03_网站源码/tcn/tomamu-ski-lesson/`
- `03_网站源码/en/tomamu-ski-lesson/`
- `03_网站源码/css/`
- `03_网站源码/js/`
- sitemap
- robots
- CNAME
- 正式价格核心
- GitHub Pages 配置
- 当前正式 URL
- 线上网站

不 commit / push 草案代码到正式网站 Git main。

如需复用正式源码内容，只读复制/引用，不修改源文件。

## 12. 本轮验收

Codex 完成后至少确认：

1. 正式网站源码 `git status` 与任务开始前一致；
2. 正式 Tomamu 页面未因本任务变化；
3. 草案可以直接双击 `index.html` 查看；
4. desktop 约 1440px 与 mobile 约 390px 均无明显布局溢出；
5. rental 26/27 与 ticket `awaiting update` 状态正确；
6. 官方事实 / 雪旅建议视觉区分明确；
7. 所有外部事实都有日文官方 source manifest；
8. 无第三方来源混入官方事实库；
9. 没有把 25/26 ticket price 显示为 26/27；
10. 没有发布或修改线上网站。

## 13. 回传

Codex 最终回传第一行必须：

`调度模式。Tomamu Landing V2 Local Prototype V1 已完成。`

若遇到真实 blocker：

`调度模式。Tomamu Landing V2 Local Prototype V1 已执行至真实外部阻塞点。`

回传至少说明：
- 草案目录；
- 创建文件；
- 正式源码是否保持未动；
- 数据源和雪季状态；
- 如何打开草案；
- desktop/mobile 自检；
- 尚待用户判断的设计点。

不得声明 GPT acceptance，也不得擅自把草案迁入正式网站。
