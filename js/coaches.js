(() => {
  'use strict';

  const coaches = [
    {
      id: 'wang',
      name: 'Wang',
      displayName: 'Wang 教練',
      skiLevel: '三級',
      snowboardLevel: '二級',
      skiCertLabel: '加拿大CSIA 3級',
      snowboardCertLabel: '加拿大CASI 2級',
      background: '來自甘肅，定居日本',
      languages: ['中文', '韓文', '英文', '日文'],
      intro: `從第一天滑雪就作為教練參加訓練
曾在韓國平昌、日本白馬、北海道教學
現常駐日本北海道

雙板：加拿大CSIA 3級、紐西蘭NZSIA 2級、韓國KSIA 1級、日本SAJ檢定 1級
單板：加拿大CASI 2級、紐西蘭SBINZ 1級、日本SAJ檢定1級

滑雪經歷：
2013年2月：韓國平昌鳳凰公園滑雪場（Phoenix Park）參加雙板訓練
13/14雪季～15/16雪季：韓國平昌鳳凰公園滑雪場（Phoenix Park）雙板教練，考取韓國雙板指導員KSIA 1級
16/17雪季：日本白馬栂池高原雙板教練
17/18雪季：北海道Clubmed Tomamu雙板教練
2018年夏：紐西蘭三錐山滑雪場（Treble Cone）參加單/雙板訓練，考取紐西蘭雙板指導員NZSIA 2級、紐西蘭單板指導員SBINZ 1級
18/19雪季：北海道二世古（Niseko）單/雙板教練
2019年夏：紐西蘭三錐山滑雪場（Treble Cone）參加雙板訓練
19/20雪季～24/25雪季：日本北海道單/雙板教練，參加日本SAJ單/雙板訓練，考取日本SAJ雙板檢定2級/1級、日本SAJ單板檢定2級/1級
成立：合同會社雪縁、株式會社雪旅及雪緣中文滑雪學校
2024年夏：紐西蘭三錐山滑雪場（Treble Cone）參加單/雙板訓練，考取加拿大雙板指導員CSIA 3級、加拿大單板指導員CASI 2級
2025年夏：紐西蘭三錐山滑雪場（Treble Cone）參加單/雙板訓練`,
      certificates: ['加拿大雙板指導員 CSIA 3級', '加拿大單板指導員 CASI 2級', '紐西蘭雙板指導員 NZSIA 2級', '紐西蘭單板指導員 SBINZ 1級', '日本單板檢定 SAJ 1級', '日本雙板檢定 SAJ 1級', '韓國雙板指導員 KSIA 1級'],
      avatar: 'assets/images/coaches/wang/avatar.jpg',
      photos: [
        { src: 'assets/images/coaches/wang/photo-01.jpg', alt: 'Wang 教練照片 1', layout: 'tall' },
        { src: 'assets/images/coaches/wang/photo-05.jpg', alt: 'Wang 教練照片 5', layout: 'wide' },
        { src: 'assets/images/coaches/wang/photo-02.jpg', alt: 'Wang 教練照片 2', layout: 'wide' },
        { src: 'assets/images/coaches/wang/photo-03.jpg', alt: 'Wang 教練照片 3', layout: 'wide' },
        { src: 'assets/images/coaches/wang/photo-06.jpg', alt: 'Wang 教練照片 6', layout: 'wide' },
        { src: 'assets/images/coaches/wang/photo-04.jpg', alt: 'Wang 教練照片 4', layout: 'wide' }
      ],
      certificateImages: [
        { title: '加拿大雙板指導員 CSIA 3級', src: 'assets/images/coaches/wang/certificate-csia-3.jpg' },
        { title: '加拿大單板指導員 CASI 2級', src: 'assets/images/coaches/wang/certificate-casi-2.jpg' },
        { title: '紐西蘭雙板指導員 NZSIA 2級', src: 'assets/images/coaches/wang/certificate-nzsia-2.jpg' },
        { title: '紐西蘭單板指導員 SBINZ 1級', src: 'assets/images/coaches/wang/certificate-sbinz-1.jpg' },
        { title: '日本單板檢定 SAJ 1級', src: 'assets/images/coaches/wang/certificate-saj-snowboard-1.jpg' },
        { title: '日本雙板檢定 SAJ 1級', src: 'assets/images/coaches/wang/certificate-saj-ski-1.jpg' },
        { title: '韓國雙板指導員 KSIA 1級', src: 'assets/images/coaches/wang/certificate-ksia-1.jpg' }
      ],
      videos: [],
      detailId: 'coach-detail-wang',
      showInTeam: true,
      showInCalculator: true
    },
    {
      id: 'mina',
      name: '美娜',
      displayName: '美娜 教練',
      skiLevel: '一級',
      snowboardLevel: '一級',
      skiCertLabel: '紐西蘭NZSIA 1級',
      snowboardCertLabel: '紐西蘭SBINZ 1級',
      background: '來自廣東，定居日本',
      languages: ['中文', '粵語', '日文'],
      intro: `歡迎來到我的滑雪教練主頁！我是來自廣東的女孩，已經在美麗的北海道生活了12年，對這裡的生活充滿熱愛。

擁有近10年的旅行社工作經驗，關於北海道旅遊非常有經驗。我獲得了SBINZ一級和NZSIA一級教練證。

作為一名耐心的教練，我會根據每位學員的特點制定個性化的教學方案，致力於幫助大家在滑雪中不斷進步。我熱衷於記錄每位學員的成長歷程，期待與你一起享受滑雪的樂趣！`,
      certificates: ['紐西蘭雙板指導員 NZSIA 兒童教學 1級', '紐西蘭單板指導員 SBINZ 1級', '紐西蘭雙板指導員 NZSIA 1級'],
      photos: [],
      videos: [],
      detailId: 'coach-detail-mina',
      showInTeam: true,
      showInCalculator: true
    },
    {
      id: 'kay',
      name: 'Kay',
      displayName: 'Kay 教練',
      skiLevel: '',
      snowboardLevel: '二級',
      snowboardCertLabel: '加拿大CASI 2級',
      background: '來自香港，定居日本',
      languages: ['中文', '粵語', '英文', '日文'],
      intro: `來自香港，現在長居日本。

2018年白馬八方尾根雪場工作後愛上滑雪，其後曾於雪場官方學校任教及JSBA日本學校助教。喜歡去日本全國不同雪場及求教於不同教練及體制，從而多角度了解滑雪。

自己初學時是自學十分辛苦，在接觸CASI及JSBA等教學方法後，希望協助大家更加快上手！喜歡照顧小孩滑雪及提升女士滑雪技術，建立自信。

曾工作過雪場：白馬八方尾根滑雪場、靜岡Yeti滑雪場、新潟苗場滑雪場、岐阜Dynaland滑雪場。`,
      certificates: ['加拿大單板指導員 CASI 2級', '日本單板 JSBA C級指導員', 'JSBA 1st Class badge'],
      photos: [],
      videos: [],
      detailId: 'coach-detail-kay',
      showInTeam: true,
      showInCalculator: true
    },
    {
      id: 'anita',
      name: 'Anita',
      displayName: 'Anita 教練',
      skiLevel: '二級',
      snowboardLevel: '',
      skiCertLabel: '加拿大CSIA 2級',
      background: '來自台灣',
      languages: ['中文', '英文'],
      intro: `我是Anita，來自台灣。結束南半球滑雪之旅後，又要回到我第二個家北海道。

我有五季的教學經驗，是個有耐心、溫柔、有趣的教練，所以快來加入我，享受蓬鬆的日本雪吧：））

教學經歷：2018/2019 Clubmed Sahoro、2019/2020 北海道Tomamu星野滑雪學校、2022/2023 Clubmed Tomamu、2023/2024 二世谷Niseko、2024 南半球 Australia Falls Creek Ski School。`,
      certificates: ['加拿大雙板指導員 CSIA 2級'],
      photos: [],
      videos: [],
      detailId: 'coach-detail-anita',
      showInTeam: true,
      showInCalculator: true
    },
    {
      id: 'eddie',
      name: 'Eddie',
      displayName: 'Eddie 教練',
      skiLevel: '二級',
      snowboardLevel: '一級',
      skiCertLabel: '加拿大CSIA 2級',
      snowboardCertLabel: '加拿大CASI 1級',
      background: '來自新加坡',
      languages: ['中文', '英文'],
      intro: `教練簡介稍後補充。`,
      certificates: ['加拿大雙板指導員 CSIA 2級', '紐西蘭雙板指導員 NZSIA 兒童教學 1級', '加拿大雙板指導員 CSIA 1級'],
      photos: [],
      videos: [],
      detailId: 'coach-detail-eddie',
      showInTeam: true,
      showInCalculator: true
    },
    {
      id: 'tina',
      name: 'Tina',
      displayName: 'Tina 教練',
      skiLevel: '一級',
      snowboardLevel: '',
      skiCertLabel: '加拿大CSIA 1級',
      background: '來自廣東',
      languages: ['中文', '粵語'],
      intro: `教練簡介稍後補充。`,
      certificates: ['加拿大雙板指導員 CSIA 1級'],
      photos: [],
      videos: [],
      detailId: 'coach-detail-tina',
      showInTeam: true,
      showInCalculator: true
    },
    {
      id: 'jessika',
      name: 'Jessika',
      displayName: 'Jessika 教練',
      skiLevel: '二級',
      snowboardLevel: '',
      skiCertLabel: '加拿大CSIA 2級',
      background: '來自香港',
      languages: ['中文', '英文', '粵語'],
      intro: `教練簡介稍後補充。`,
      certificates: ['加拿大雙板指導員 CSIA 2級'],
      photos: [],
      videos: [],
      detailId: 'coach-detail-jessika',
      showInTeam: true,
      showInCalculator: true
    },
    {
      id: 'leo',
      name: 'Leo',
      displayName: 'Leo 教練',
      skiLevel: '三級',
      snowboardLevel: '',
      skiCertLabel: '加拿大CSIA 3級，1級考官',
      background: '來自台灣',
      languages: ['中文'],
      intro: `3年4季教學經驗，在第三年即取得CSIA雙板三級教練資格。

擅長將滑雪理論生活化，多樣有趣的教學方式，讓學滑雪變得更簡單。目前已培訓出多位學生取得國際教練證。

經歷：日本輕井澤王子滑雪學校教練、臺灣ISKI室內滑雪機助教、日本北海道星野滑雪場教練、中國廣州融創室內滑雪場教練。`,
      certificates: ['加拿大雙板指導員 CSIA 考官 1級', '加拿大雙板指導員 CSIA 3級'],
      photos: [],
      videos: [],
      detailId: 'coach-detail-leo',
      showInTeam: true,
      showInCalculator: true
    },
    {
      id: 'wulf',
      name: 'Wulf',
      displayName: 'Wulf 教練',
      skiLevel: '二級',
      snowboardLevel: '一級',
      skiCertLabel: '加拿大CSIA 2級',
      snowboardCertLabel: '加拿大CASI 1級',
      background: '來自內蒙古，定居日本',
      languages: ['中文'],
      intro: `高山滑雪及自由式滑行自由進階選擇。

速度與花式並存，音樂和雪花共舞，一起享受滑雪帶來的速度與激情！紐西蘭教學體系，日系滑行出身 + Freestyle 花式雙板。`,
      certificates: ['加拿大單板指導員 CASI 1級', '加拿大雙板指導員 CSIA 2級'],
      photos: [],
      videos: [],
      detailId: 'coach-detail-wulf',
      showInTeam: true,
      showInCalculator: true
    },
    {
      id: 'daqiang',
      name: '大強',
      displayName: '大強 教練',
      skiLevel: '',
      snowboardLevel: '二級',
      snowboardCertLabel: 'SAJ准指导员',
      background: '來自山西，定居日本',
      languages: ['中文'],
      intro: `北海道在地十年。

在北海道接觸滑雪，在北海道學習滑雪，在北海道愛上滑雪。透過滑雪，改變自己，收穫成長。

完全日式滑行風格。`,
      certificates: ['SAJ 公認單板準指導員', 'SAJ 公認單板 C級檢定員', 'JSBA C級指導員'],
      photos: [],
      videos: [],
      detailId: 'coach-detail-daqiang',
      showInTeam: true,
      showInCalculator: true
    },
    {
      id: 'pagi',
      name: 'Pagi',
      displayName: 'Pagi 教練',
      skiLevel: '一級',
      snowboardLevel: '一級',
      skiCertLabel: '澳大利亞APSI 1級',
      snowboardCertLabel: '紐西蘭SBINZ 1級',
      background: '來自台灣',
      languages: ['中文'],
      intro: `嗨，我是Pagi。踩到東西壓扁的聲音。

夏天是潛水教練，冬天是滑雪教練，讓我們一起徜徉在雪海之間。

19/20日本雪季：星野渡假村評價最佳中文教練。
22/23日本雪季：駐點星野度假村，偶爾手稻/富良野。
23夏季：紐西蘭Cardrona滑雪。
23/24日本雪季：北海道，主要駐點星野度假村。`,
      certificates: ['澳大利亞雙板指導員 APSI 1級', '紐西蘭單板指導員 SBINZ 1級'],
      photos: [],
      videos: [],
      detailId: 'coach-detail-pagi',
      showInTeam: true,
      showInCalculator: true
    },
    {
      id: 'zoe',
      name: 'Zoe',
      displayName: 'Zoe 教練',
      skiLevel: '一級',
      snowboardLevel: '',
      skiCertLabel: '加拿大CSIA 1級',
      background: '來自台灣',
      languages: ['中文'],
      intro: `長駐雪場是北海道星野，也有富良野、札幌國際等雪場經驗。夏天在廣州融創室內滑雪場。

教學風趣有耐心，能以初學者的角度思考如何高效學習。

證照：加拿大雙板滑雪系統CSIA Level 1教練執照、國職雙板滑雪指導員五級。
比賽成績：2024年廣州融創雙板大迴轉女子精英組冠軍。`,
      certificates: ['加拿大雙板滑雪系統 CSIA Level 1 教練執照', '國職雙板滑雪指導員五級', '2024 年廣州融創雙板大迴轉女子精英組冠軍'],
      photos: [],
      videos: [],
      detailId: 'coach-detail-zoe',
      showInTeam: true,
      showInCalculator: true
    },
    {
      id: 'shaun',
      name: 'Shaun',
      displayName: 'Shaun 教練',
      skiLevel: '一級',
      snowboardLevel: '一級',
      skiCertLabel: '加拿大CSIA 1級',
      snowboardCertLabel: '紐西蘭SBINZ 1級',
      background: '來自台灣',
      languages: ['中文'],
      intro: `2024-25教學第七個雪季，在北海道各雪場提供教學服務。

2016開始教學，曾在長野白馬、新潟湯澤、北海道各雪場教學。

教學專長：初學者。擅長初學者教學，針對個人狀況做教學調整，帶領初學者觀察並認識雪場地形，做基本雪場介紹，增加往後滑行樂趣。

進階訓練：進階滑行包括樹林滑及基礎跳台亦可洽詢。`,
      certificates: ['紐西蘭單板指導員 SBINZ 1級', '加拿大雙板指導員 CSIA 1級'],
      photos: [],
      videos: [],
      detailId: 'coach-detail-shaun',
      showInTeam: true,
      showInCalculator: true
    },
    {
      id: 'momo',
      name: 'Momo',
      displayName: 'Momo 教練',
      skiLevel: '一級',
      snowboardLevel: '一級',
      skiCertLabel: '紐西蘭雙板指導員 1級',
      snowboardCertLabel: '紐西蘭單板指導員 1級',
      background: '來自廣東',
      languages: ['中文', '粵語', '英文', '日文'],
      intro: `北海道在地10年。

擅長親子教學、兒童教學、大人教學，都會提供滑雪拍照、影片。`,
      certificates: ['紐西蘭雙板指導員 1級', '紐西蘭單板指導員 1級', '日本單板檢定 SAJ 1級'],
      photos: [],
      videos: [],
      detailId: 'coach-detail-momo',
      showInTeam: true,
      showInCalculator: true
    }
  ];

  const teamCoaches = () => coaches.filter((coach) => coach.showInTeam);
  const certificateSummary = (coach) => {
    const parts = [];
    if (coach.snowboardLevel) parts.push(`單板 ${coach.snowboardLevel}`);
    if (coach.skiLevel) parts.push(`雙板 ${coach.skiLevel}`);
    return parts.length ? parts.join(' / ') : '證照確認中';
  };
  const languageText = (coach) => coach.languages.join('、');
  const coachAssetUrl = (path) => {
    const cleanPath = String(path || '').replace(/^\/+/, '');
    if (!cleanPath) return '';
    const pagePath = window.location.pathname;
    const prefix = pagePath.includes('/tcn/Skischool/') ? '../../' : (pagePath.includes('/tcn/') ? '../' : '');
    return `${prefix}${cleanPath}`;
  };
  const mediaButton = (item, index, type) => {
    const layoutClass = item.layout ? ` is-${String(item.layout).replace(/[^a-z0-9-]/gi, '')}` : '';
    return `
    <button class="coach-media-thumb${layoutClass}" type="button" data-coach-lightbox-src="${escapeHtml(coachAssetUrl(item.src))}" data-coach-lightbox-title="${escapeHtml(item.title || item.alt || '')}">
      <img src="${escapeHtml(coachAssetUrl(item.src))}" alt="${escapeHtml(item.alt || item.title || `${type} ${index + 1}`)}" loading="lazy">
      ${item.title ? `<span>${escapeHtml(item.title)}</span>` : ''}
    </button>`;
  };
  const richParagraphs = (value, fallback = '教練簡介稍後補充。') => String(value || fallback)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`)
    .join('');
  const coachCertLines = (coach) => [
    coach.snowboardCertLabel ? `單板：${coach.snowboardCertLabel}` : '',
    coach.skiCertLabel ? `雙板：${coach.skiCertLabel}` : ''
  ].filter(Boolean);
  const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

  const tabContent = (coach, tab) => {
    if (tab === 'intro') {
      return `
        <div class="coach-profile-intro">
          <p><strong>背景：</strong><span>${escapeHtml(coach.background)}</span></p>
          <p><strong>語言：</strong><span>${escapeHtml(languageText(coach))}</span></p>
          ${richParagraphs(coach.intro)}
        </div>`;
    }
    if (tab === 'certificates') {
      const certificateList = coach.certificates.length
        ? `<ul>${coach.certificates.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
        : '<p>證照資料準備中。</p>';
      const certificateImages = Array.isArray(coach.certificateImages) && coach.certificateImages.length
        ? `<div class="coach-media-grid coach-certificate-grid">${coach.certificateImages.map((item, index) => mediaButton(item, index, '證照')).join('')}</div>`
        : '';
      return `${certificateList}${certificateImages}`;
    }
    if (tab === 'photos') {
      return Array.isArray(coach.photos) && coach.photos.length
        ? `<div class="coach-media-grid coach-photo-mosaic">${coach.photos.map((item, index) => mediaButton(item, index, '照片')).join('')}</div>`
        : '<p>照片準備中。</p>';
    }
    return '<p>視頻準備中。</p>';
  };

  const closeCoachLightbox = () => {
    const existing = document.querySelector('[data-coach-lightbox]');
    if (existing) existing.remove();
  };
  const openCoachLightbox = (src, title) => {
    if (!src) return;
    closeCoachLightbox();
    const lightbox = document.createElement('div');
    lightbox.className = 'coach-lightbox';
    lightbox.setAttribute('data-coach-lightbox', '');
    lightbox.innerHTML = `
      <button class="coach-lightbox-close" type="button" aria-label="關閉預覽">&times;</button>
      <figure>
        <img src="${escapeHtml(src)}" alt="${escapeHtml(title || '教練素材預覽')}">
        ${title ? `<figcaption>${escapeHtml(title)}</figcaption>` : ''}
      </figure>`;
    document.body.appendChild(lightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox || event.target.closest('.coach-lightbox-close')) closeCoachLightbox();
    });
  };
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeCoachLightbox();
  });

  const renderCoachTeam = () => {
    const oldGrid = document.querySelector('.coach-detail-grid');
    if (!oldGrid) return;
    const coachesForTeam = teamCoaches();
    const summary = document.querySelector('.coach-summary-strip');
    if (summary) summary.remove();
    oldGrid.className = 'coach-team-app';
    oldGrid.innerHTML = `
      <div class="coach-list-grid" data-coach-list>
        ${coachesForTeam.map((coach, index) => {
          const certLines = coachCertLines(coach);
          return `
          <button id="coach-card-${coach.id}" class="coach-list-card" type="button" data-coach-id="${coach.id}" aria-expanded="false">
            <span class="coach-avatar-placeholder">${coach.avatar ? `<img src="${escapeHtml(coachAssetUrl(coach.avatar))}" alt="${escapeHtml(coach.name)} 教練頭像" loading="lazy">` : escapeHtml(coach.name.slice(0, 1))}</span>
            <span class="coach-list-main${certLines.length === 1 ? ' is-single-cert' : ''}">
              <strong>${escapeHtml(coach.name)}</strong>
              ${certLines.map((line) => `<small>${escapeHtml(line)}</small>`).join('')}
            </span>
          </button>`;
        }).join('')}
        <article class="coach-profile-panel" data-coach-profile aria-live="polite"></article>
      </div>
      `;

    const list = oldGrid.querySelector('[data-coach-list]');
    const profile = oldGrid.querySelector('[data-coach-profile]');
    const getCoachCards = () => Array.from(list.querySelectorAll('[data-coach-id]'));
    const clearSelection = () => {
      list.querySelectorAll('[data-coach-id]').forEach((button) => {
        button.classList.remove('is-active');
        button.setAttribute('aria-expanded', 'false');
      });
      profile.removeAttribute('id');
      profile.dataset.activeCoach = '';
      profile.innerHTML = '';
      if (profile.parentElement) profile.remove();
    };
    const moveProfileAfterSelectedRow = (selectedCard) => {
      if (!selectedCard) return;
      if (profile.parentElement) profile.remove();
      const cards = getCoachCards();
      if (!cards.includes(selectedCard)) return;
      const selectedTop = selectedCard.offsetTop;
      const rowCards = cards.filter((card) => Math.abs(card.offsetTop - selectedTop) < 4);
      const rowEndCard = rowCards[rowCards.length - 1] || selectedCard;
      rowEndCard.insertAdjacentElement('afterend', profile);
    };
    const selectCoach = (coachId, tab = 'intro', shouldPush = true) => {
      const coach = coachesForTeam.find((item) => item.id === coachId) || coachesForTeam[0];
      if (!coach) return;
      list.querySelectorAll('[data-coach-id]').forEach((button) => {
        const isActive = button.dataset.coachId === coach.id;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      });
      const selectedCard = list.querySelector(`[data-coach-id="${coach.id}"]`);
      if (selectedCard) moveProfileAfterSelectedRow(selectedCard);
      profile.id = coach.detailId;
      profile.dataset.activeCoach = coach.id;
      profile.innerHTML = `
        <div class="coach-profile-tabs" role="tablist" aria-label="${escapeHtml(coach.name)} 教練詳情">
          ${[
            ['intro', '教練簡介'],
            ['certificates', '教練證照'],
            ['photos', '照片'],
            ['videos', '視頻']
          ].map(([id, label]) => `<button type="button" class="${id === tab ? 'is-active' : ''}" data-coach-tab="${id}">${label}</button>`).join('')}
        </div>
        <div class="coach-profile-body" data-coach-tab-panel>${tabContent(coach, tab)}</div>`;
      if (shouldPush && window.location.hash !== `#${coach.detailId}`) {
        window.history.pushState(null, '', `#${coach.detailId}`);
      }
    };

    oldGrid.addEventListener('click', (event) => {
      const card = event.target.closest('[data-coach-id]');
      if (card) {
        selectCoach(card.dataset.coachId);
        return;
      }
      const tab = event.target.closest('[data-coach-tab]');
      if (tab) {
        const coachId = profile.dataset.activeCoach;
        selectCoach(coachId, tab.dataset.coachTab, false);
        return;
      }
      const media = event.target.closest('[data-coach-lightbox-src]');
      if (media) {
        openCoachLightbox(media.dataset.coachLightboxSrc, media.dataset.coachLightboxTitle);
      }
    });

    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      const coach = coachesForTeam.find((item) => item.detailId === hash || `coach-card-${item.id}` === hash);
      if (coach) {
        selectCoach(coach.id, 'intro', false);
        return;
      }
      if (!hash || hash === 'coaches') clearSelection();
    };
    window.addEventListener('hashchange', syncFromHash);
    window.addEventListener('snowtravel:coachHashChange', syncFromHash);
    window.addEventListener('resize', () => {
      const selectedCard = list.querySelector('.coach-list-card.is-active');
      if (selectedCard) moveProfileAfterSelectedRow(selectedCard);
    });
    clearSelection();
    syncFromHash();
  };

  window.SNOWTRAVEL_COACHES = coaches;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderCoachTeam);
  } else {
    renderCoachTeam();
  }
})();
