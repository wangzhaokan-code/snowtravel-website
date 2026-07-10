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
        { src: 'assets/images/coaches/wang/photo-02.jpg', alt: 'Wang 教練照片 2' },
        { src: 'assets/images/coaches/wang/photo-03.jpg', alt: 'Wang 教練照片 3' },
        { src: 'assets/images/coaches/wang/photo-04.jpg', alt: 'Wang 教練照片 4' },
        { src: 'assets/images/coaches/wang/photo-05.jpg', alt: 'Wang 教練照片 5', layout: 'wide' },
        { src: 'assets/images/coaches/wang/photo-06.jpg', alt: 'Wang 教練照片 6' }
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
      videos: [
        {
          url: 'https://32609586.s21v.faiusr.com/58/ABUIABA6GAAguarrtwYouJG_pQM.mp4',
          title: { zhHans: '视频 1', zhHant: '視頻 1' },
          poster: 'assets/images/coaches/wang/video-01-poster.jpg'
        },
        {
          url: 'https://32609586.s21v.faiusr.com/58/ABUIABA6GAAggJGLuAYo_qWR8AU.mp4',
          title: { zhHans: '视频 2', zhHant: '視頻 2' },
          poster: 'assets/images/coaches/wang/video-02-poster.jpg'
        },
        {
          url: 'https://32609586.s21v.faiusr.com/58/ABUIABA6GAAgjpGLuAYouO_F7QQ.mp4',
          title: { zhHans: '视频 3', zhHant: '視頻 3' },
          poster: 'assets/images/coaches/wang/video-03-poster.jpg'
        },
        {
          url: 'https://32609586.s21v.faiusr.com/58/ABUIABA6GAAgiZGLuAYom7PawAM.mp4',
          title: { zhHans: '视频 4', zhHant: '視頻 4' },
          poster: 'assets/images/coaches/wang/video-04-poster.jpg'
        }
      ],
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
      photos: [
        { src: 'assets/images/coaches/mina/photo-01.jpg', alt: '美娜 教練照片 1', layout: 'tall' },
        { src: 'assets/images/coaches/mina/photo-02.jpg', alt: '美娜 教練照片 2' },
        { src: 'assets/images/coaches/mina/photo-03.jpg', alt: '美娜 教練照片 3' },
        { src: 'assets/images/coaches/mina/photo-04.jpg', alt: '美娜 教練照片 4' },
        { src: 'assets/images/coaches/mina/photo-05.jpg', alt: '美娜 教練照片 5', layout: 'wide' },
        { src: 'assets/images/coaches/mina/photo-06.jpg', alt: '美娜 教練照片 6' }
      ],
      avatar: 'assets/images/coaches/mina/avatar.jpg',
      certificateImages: [
        { title: '紐西蘭雙板指導員 NZSIA 兒童教學 1級', src: 'assets/images/coaches/mina/certificate-nzsia-children-1.jpg' },
        { title: '紐西蘭單板指導員 SBINZ 1級', src: 'assets/images/coaches/mina/certificate-sbinz-1.jpg' },
        { title: '紐西蘭雙板指導員 NZSIA 1級', src: 'assets/images/coaches/mina/certificate-nzsia-1.jpg' }
      ],
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
      certificates: ['加拿大單板指導員 CASI 2級', '日本單板 JSBA C級指導員'],
      photos: [
        { src: 'assets/images/coaches/kay/photo-01.jpg', alt: 'Kay 教練照片 1', layout: 'tall' },
        { src: 'assets/images/coaches/kay/photo-02.jpg', alt: 'Kay 教練照片 2' },
        { src: 'assets/images/coaches/kay/photo-03.jpg', alt: 'Kay 教練照片 3' },
        { src: 'assets/images/coaches/kay/photo-04.jpg', alt: 'Kay 教練照片 4' }
      ],
      avatar: 'assets/images/coaches/kay/avatar.jpg',
      certificateImages: [
        { title: '加拿大單板指導員 CASI 2級', src: 'assets/images/coaches/kay/certificate-casi-2.jpg' },
        { title: '日本單板 JSBA C級指導員', src: 'assets/images/coaches/kay/certificate-jsba-c.jpg' }
      ],
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
      photos: [
        { src: 'assets/images/coaches/anita/photo-01.jpg', alt: 'Anita 教練照片 1', layout: 'tall' },
        { src: 'assets/images/coaches/anita/photo-02.jpg', alt: 'Anita 教練照片 2' },
        { src: 'assets/images/coaches/anita/photo-03.jpg', alt: 'Anita 教練照片 3' },
        { src: 'assets/images/coaches/anita/photo-04.jpg', alt: 'Anita 教練照片 4' },
        { src: 'assets/images/coaches/anita/photo-05.jpg', alt: 'Anita 教練照片 5', layout: 'wide' },
        { src: 'assets/images/coaches/anita/photo-06.jpg', alt: 'Anita 教練照片 6' }
      ],
      avatar: 'assets/images/coaches/anita/avatar.jpg',
      certificateImages: [
        { title: '加拿大雙板指導員 CSIA 2級', src: 'assets/images/coaches/anita/certificate-csia-2.jpg' }
      ],
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
      avatar: 'assets/images/coaches/eddie/avatar.jpg',
      certificateImages: [
        { title: '加拿大雙板指導員 CSIA 2級', src: 'assets/images/coaches/eddie/certificate-csia-2.jpg' },
        { title: '紐西蘭雙板指導員 NZSIA 兒童教學 1級', src: 'assets/images/coaches/eddie/certificate-nzsia-children-1.jpg' },
        { title: '加拿大雙板指導員 CSIA 1級', src: 'assets/images/coaches/eddie/certificate-csia-1.png' }
      ],
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
      avatar: 'assets/images/coaches/tina/avatar.jpeg',
      certificateImages: [
        { title: '加拿大雙板指導員 CSIA 1級', src: 'assets/images/coaches/tina/certificate-csia-1.png' }
      ],
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
      avatar: 'assets/images/coaches/jessika/avatar.jpg',
      certificateImages: [
        { title: '加拿大雙板指導員 CSIA 2級', src: 'assets/images/coaches/jessika/certificate-casi-2.png' }
      ],
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
      photos: [
        { src: 'assets/images/coaches/leo/photo-01.jpg', alt: 'Leo 教練照片 1', layout: 'tall' },
        { src: 'assets/images/coaches/leo/photo-02.jpg', alt: 'Leo 教練照片 2' },
        { src: 'assets/images/coaches/leo/photo-03.jpg', alt: 'Leo 教練照片 3' },
        { src: 'assets/images/coaches/leo/photo-04.jpg', alt: 'Leo 教練照片 4' },
        { src: 'assets/images/coaches/leo/photo-05.jpg', alt: 'Leo 教練照片 5', layout: 'wide' }
      ],
      avatar: 'assets/images/coaches/leo/avatar.jpg',
      certificateImages: [
        { title: '加拿大雙板指導員 CSIA 考官 1級', src: 'assets/images/coaches/leo/certificate-csia-examiner-1.jpg' },
        { title: '加拿大雙板指導員 CSIA 3級', src: 'assets/images/coaches/leo/certificate-csia-3.jpg' }
      ],
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
      photos: [
        { src: 'assets/images/coaches/wulf/photo-01.jpg', alt: 'Wulf 教練照片 1', layout: 'tall' },
        { src: 'assets/images/coaches/wulf/photo-02.jpg', alt: 'Wulf 教練照片 2' },
        { src: 'assets/images/coaches/wulf/photo-03.jpg', alt: 'Wulf 教練照片 3' },
        { src: 'assets/images/coaches/wulf/photo-04.jpg', alt: 'Wulf 教練照片 4' },
        { src: 'assets/images/coaches/wulf/photo-05.jpg', alt: 'Wulf 教練照片 5', layout: 'wide' },
        { src: 'assets/images/coaches/wulf/photo-06.png', alt: 'Wulf 教練照片 6' }
      ],
      avatar: 'assets/images/coaches/wulf/avatar.jpg',
      certificateImages: [
        { title: '加拿大雙板指導員 CSIA 2級', src: 'assets/images/coaches/wulf/certificate-csia-2.jpg' },
        { title: '加拿大單板指導員 CASI 1級', src: 'assets/images/coaches/wulf/certificate-casi-1.png' }
      ],
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
      photos: [
        { src: 'assets/images/coaches/daqiang/photo-01.jpg', alt: '大強 教練照片 1' },
        { src: 'assets/images/coaches/daqiang/photo-02.jpg', alt: '大強 教練照片 2' }
      ],
      avatar: 'assets/images/coaches/daqiang/avatar.jpg',
      certificateImages: [
        { title: 'SAJ 公認單板準指導員', src: 'assets/images/coaches/daqiang/certificate-saj-snowboard-assistant.jpg' },
        { title: 'SAJ 公認單板 C級檢定員', src: 'assets/images/coaches/daqiang/certificate-saj-snowboard-examiner2.jpg' },
        { title: 'JSBA C級指導員', src: 'assets/images/coaches/daqiang/certificate-jsba-c.jpg' }
      ],
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
      photos: [
        { src: 'assets/images/coaches/pagi/photo-01.jpg', alt: 'Pagi 教練照片 1', layout: 'tall' },
        { src: 'assets/images/coaches/pagi/photo-02.jpg', alt: 'Pagi 教練照片 2' },
        { src: 'assets/images/coaches/pagi/photo-03.jpg', alt: 'Pagi 教練照片 3' },
        { src: 'assets/images/coaches/pagi/photo-04.jpg', alt: 'Pagi 教練照片 4' },
        { src: 'assets/images/coaches/pagi/photo-05.jpg', alt: 'Pagi 教練照片 5', layout: 'wide' }
      ],
      avatar: 'assets/images/coaches/pagi/avatar.jpg',
      certificateImages: [
        { title: '澳大利亞雙板指導員 APSI 1級', src: 'assets/images/coaches/pagi/certificate-apsi-1.jpg' },
        { title: '紐西蘭單板指導員 SBINZ 1級', src: 'assets/images/coaches/pagi/certificate-sbinz-1.jpg' }
      ],
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
      certificates: ['加拿大雙板滑雪系統 CSIA Level 1 教練執照', '2024 年廣州融創雙板大迴轉女子精英組冠軍'],
      photos: [
        { src: 'assets/images/coaches/zoe/photo-01.jpg', alt: 'Zoe 教練照片 1', layout: 'tall' },
        { src: 'assets/images/coaches/zoe/photo-02.jpg', alt: 'Zoe 教練照片 2' },
        { src: 'assets/images/coaches/zoe/photo-03.jpg', alt: 'Zoe 教練照片 3' },
        { src: 'assets/images/coaches/zoe/photo-04.jpg', alt: 'Zoe 教練照片 4' },
        { src: 'assets/images/coaches/zoe/photo-05.jpg', alt: 'Zoe 教練照片 5', layout: 'wide' }
      ],
      avatar: 'assets/images/coaches/zoe/avatar.jpg',
      certificateImages: [
        { title: '加拿大雙板滑雪系統 CSIA Level 1 教練執照', src: 'assets/images/coaches/zoe/certificate-csia-1.jpg' },
        { title: '2024 年廣州融創雙板大迴轉女子精英組冠軍', src: 'assets/images/coaches/zoe/certificate-certificate-champion.jpg' }
      ],
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
      photos: [
        { src: 'assets/images/coaches/shaun/photo-01.jpg', alt: 'Shaun 教練照片 1' }
      ],
      avatar: 'assets/images/coaches/shaun/avatar.jpg',
      certificateImages: [
        { title: '紐西蘭單板指導員 SBINZ 1級', src: 'assets/images/coaches/shaun/certificate-sbinz-1.jpg' },
        { title: '加拿大雙板指導員 CSIA 1級', src: 'assets/images/coaches/shaun/certificate-csia-1.jpg' }
      ],
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
      photos: [
        { src: 'assets/images/coaches/momo/photo-01.jpg', alt: 'Momo 教練照片 1' },
        { src: 'assets/images/coaches/momo/photo-02.jpg', alt: 'Momo 教練照片 2' }
      ],
      avatar: 'assets/images/coaches/momo/avatar.jpg',
      certificateImages: [
        { title: '紐西蘭雙板指導員 1級', src: 'assets/images/coaches/momo/certificate-nzsia-1.jpg' },
        { title: '紐西蘭單板指導員 1級', src: 'assets/images/coaches/momo/certificate-sbinz-1.jpg' },
        { title: '日本單板檢定 SAJ 1級', src: 'assets/images/coaches/momo/certificate-saj-snowboard-1.jpg' }
      ],
      videos: [],
      detailId: 'coach-detail-momo',
      showInTeam: true,
      showInCalculator: true
    }
  ];


  const pageLang = () => ((document.documentElement.lang || '').toLowerCase() || (document.body.dataset.lang || '').toLowerCase());
  const isEnglish = () => pageLang().startsWith('en') || document.body.dataset.lang === 'en';
  const isSimplified = () => pageLang().includes('hans') || document.body.dataset.lang === 'zh-Hans';
  const simplifiedPhrases = [
    ['紐西蘭', '新西兰'],
    ['紐西蘭NZSIA', '新西兰NZSIA'],
    ['紐西蘭SBINZ', '新西兰SBINZ'],
    ['教練', '教练'], ['課程', '课程'], ['課費計算器', '课费计算器'], ['價格', '价格'], ['計算器', '计算器'],
    ['雙板', '双板'], ['單板', '单板'], ['預約', '预约'], ['聯絡', '联络'], ['聯繫', '联系'],
    ['諮詢', '咨询'], ['咨詢', '咨询'], ['複製諮詢內容', '复制咨询内容'], ['複製咨詢內容', '复制咨询内容'],
    ['確認', '确认'], ['學員', '学员'], ['適合', '适合'], ['體驗', '体验'], ['網站', '网站'],
    ['資料', '资料'], ['證書', '证书'], ['證照', '证照'], ['指導員', '指导员'], ['資格', '资格'],
    ['費用', '费用'], ['兒童', '儿童'], ['說明', '说明'], ['選擇', '选择'], ['頁面', '页面'],
    ['開始', '开始'], ['服務', '服务'], ['專業', '专业'], ['視頻', '视频'], ['大強', '大强']
  ];
  const simplifiedChars = {
    緣: '缘', 學: '学', 課: '课', 價: '价', 費: '费', 計: '计', 體: '体', 簡: '简', 準: '准', 備: '备',
    隊: '队', 團: '团', 練: '练', 條: '条', 務: '务', 報: '报', 頁: '页', 關: '关', 於: '于', 聯: '联',
    絡: '络', 繫: '系', 電: '电', 話: '话', 點: '点', 擊: '击', 對: '对', 應: '应', 鍵: '键', 複: '复',
    製: '制', 帳: '账', 號: '号', 雙: '双', 單: '单', 場: '场', 壽: '寿', 國: '国', 際: '际', 勝: '胜',
    請: '请', 諮: '咨', 詢: '询', 員: '员', 裝: '装', 纜: '缆', 車: '车', 賃: '赁', 協: '协', 長: '长',
    輪: '轮', 檔: '档', 說: '说', 礎: '础', 級: '级', 導: '导', 師: '师', 證: '证', 書: '书', 資: '资',
    暫: '暂', 態: '态', 顯: '显', 將: '将', 給: '给', 優: '优', 區: '区', 圖: '图', 頭: '头', 語: '语',
    內: '内', 幣: '币', 圓: '圆', 僅: '仅', 種: '种', 別: '别', 歡: '欢', 廣: '广', 東: '东', 粵: '粤',
    韓: '韩', 強: '强', 紐: '纽', 蘭: '兰', 兒: '儿', 當: '当', 預: '预', 訂: '订', 讀: '读', 並: '并',
    細: '细', 則: '则', 購: '购', 買: '买', 險: '险', 過: '过', 發: '发', 該: '该', 負: '负', 責: '责',
    訊: '讯', 實: '实', 約: '约', 開: '开', 餘: '余', 無: '无', 錯: '错', 補: '补', 時: '时', 與: '与',
    覽: '览', 會: '会', 總: '总', 選: '选', 擇: '择', 數: '数', 節: '节', 寫: '写', 結: '结', 貼: '贴',
    屬: '属', 構: '构', 設: '设', 狀: '状', 產: '产', 經: '经', 歷: '历', 驗: '验', 線: '线', 標: '标',
    題: '题', 顧: '顾', 問: '问', 認: '认', 離: '离', 償: '偿', 萬: '万', 齡: '龄', 從: '从', 現: '现',
    駐: '驻', 灣: '湾', 冊: '册', 碼: '码', 掃: '扫', 類: '类', 刪: '删', 據: '据', 隱: '隐', 層: '层',
    進: '进', 變: '变', 項: '项', 網: '网', 連: '连', 們: '们', 溝: '沟', 為: '为', 紹: '绍', 營: '营',
    後: '后', 遊: '游', 記: '记', 間: '间', 彈: '弹', 嚴: '严', 須: '须', 續: '续', 獨: '独', 鈕: '钮',
    終: '终', 詳: '详', 來: '来', 肅: '肃', 訓: '训', 馬: '马', 鳳: '凤', 園: '园', 檢: '检', 盤: '盘',
    許: '许', 統: '统', 閱: '阅', 擔: '担', 純: '纯', 氣: '气', 惡: '恶', 還: '还', 災: '灾', 戰: '战',
    爭: '争', 閉: '闭', 誤: '误', 況: '况', 傷: '伤', 權: '权', 臺: '台', 裡: '里', 愛: '爱', 滿: '满',
    擁: '拥', 點: '点', 幫: '帮', 樂: '乐', 斷: '断', 專: '专', 針: '针', 領: '领', 樹: '树', 樣: '样',
    賽: '赛', 縮: '缩', 壓: '压', 確: '确', 獲: '获', 譽: '誉', 滑: '滑', 較: '较', 動: '动',
    個: '个', 這: '这', 範: '范', 圍: '围', 瀏: '浏', 輸: '输', 視: '视', 頻: '频', 亞: '亚'
  };
  const toSimplified = (value) => {
    let text = String(value || '');
    simplifiedPhrases.forEach(([from, to]) => { text = text.split(from).join(to); });
    return text.replace(/[\u3400-\u9fff]/g, (char) => simplifiedChars[char] || char);
  };
  const englishPhrases = [
    ['Wang 教練', 'Wang'],
    ['美娜 教練', 'Mina'],
    ['美娜', 'Mina'],
    ['Kay 教練', 'Kay'],
    ['Anita 教練', 'Anita'],
    ['Eddie 教練', 'Eddie'],
    ['Tina 教練', 'Tina'],
    ['Jessika 教練', 'Jessika'],
    ['Leo 教練', 'Leo'],
    ['Wulf 教練', 'Wulf'],
    ['大強 教練', 'Daqiang'],
    ['大強', 'Daqiang'],
    ['Pagi 教練', 'Pagi'],
    ['Zoe 教練', 'Zoe'],
    ['Shaun 教練', 'Shaun'],
    ['Momo 教練', 'Momo'],
    ['教練簡介稍後補充。', 'Profile details are being confirmed. Please contact us for current lesson availability.'],
    ['教練簡介', 'Profile'],
    ['教練證照', 'Certifications'],
    ['教練詳情', 'profile'],
    ['教練素材預覽', 'Instructor media preview'],
    ['教練頭像', 'instructor avatar'],
    ['教練', 'Instructor'],
    ['證照資料準備中。', 'Certification details coming soon.'],
    ['照片準備中。', 'Photos coming soon.'],
    ['視頻準備中。', 'Videos coming soon.'],
    ['關閉預覽', 'Close preview'],
    ['證照確認中', 'Certification pending'],
    ['證照', 'Certification'],
    ['照片', 'Photos'],
    ['視頻', 'Video'],
    ['背景：', 'Background:'],
    ['語言：', 'Languages:'],
    ['單板：', 'Snowboard: '],
    ['雙板：', 'Ski: '],
    ['單板', 'Snowboard'],
    ['雙板', 'Ski'],
    ['一級', 'Level 1'],
    ['二級', 'Level 2'],
    ['三級', 'Level 3'],
    ['中文', 'Mandarin Chinese'],
    ['英文', 'English'],
    ['日文', 'Japanese'],
    ['韓文', 'Korean'],
    ['粵語', 'Cantonese'],
    ['來自甘肅，定居日本', 'From Gansu, based in Japan'],
    ['來自廣東，定居日本', 'From Guangdong, based in Japan'],
    ['來自香港，定居日本', 'From Hong Kong, based in Japan'],
    ['來自台灣', 'From Taiwan'],
    ['來自新加坡', 'From Singapore'],
    ['來自廣東', 'From Guangdong'],
    ['來自香港', 'From Hong Kong'],
    ['來自內蒙古，定居日本', 'From Inner Mongolia, based in Japan'],
    ['來自山西，定居日本', 'From Shanxi, based in Japan'],
    ['紐西蘭', 'New Zealand'],
    ['加拿大', 'Canada'],
    ['日本', 'Japan'],
    ['指導員', 'Instructor'],
    ['檢定', 'Certification'],
    ['級', 'Level']
  ];
  const englishIntroByCoach = new Map([
    ['Wang', `Wang began instructor training from his first day skiing.
He has taught in Pyeongchang, Hakuba, and Hokkaido, and is now based in Hokkaido.

Ski qualifications: CSIA Level 3, NZSIA Level 2, KSIA Level 1, and SAJ Level 1.
Snowboard qualifications: CASI Level 2, SBINZ Level 1, and SAJ Level 1.

Skiing experience:
February 2013: ski training at Phoenix Park in Pyeongchang, South Korea.
2013/14 to 2015/16 seasons: ski instructor at Phoenix Park in Pyeongchang, where he obtained KSIA Level 1.
2016/17 season: ski instructor at Tsugaike Kogen in Hakuba, Japan.
2017/18 season: ski instructor at Club Med Tomamu in Hokkaido.
Summer 2018: ski and snowboard training at Treble Cone in New Zealand, obtaining NZSIA Level 2 and SBINZ Level 1.
2018/19 season: ski and snowboard instructor in Niseko, Hokkaido.
Summer 2019: ski training at Treble Cone in New Zealand.
2019/20 to 2024/25 seasons: ski and snowboard instructor at resorts in Hokkaido, with SAJ ski and snowboard training and SAJ Level 1 and Level 2 qualifications.
He later founded Snow Affinity Ski School and the Snow Travel companies.
Summer 2024: ski and snowboard training at Treble Cone, obtaining CSIA Level 3 and CASI Level 2.
Summer 2025: ski and snowboard training at Treble Cone.`],
    ['美娜', `Welcome to my ski instructor profile. I am from Guangdong and have lived in beautiful Hokkaido for 12 years, where I have grown to love life here.

I have nearly 10 years of travel agency experience and extensive knowledge of travel in Hokkaido. I hold SBINZ Level 1 and NZSIA Level 1 instructor qualifications.

As a patient instructor, I create an individualized teaching plan for each guest and aim to help everyone keep improving on snow. I enjoy recording each guest's progress and look forward to enjoying skiing with you.`],
    ['Kay', `I am from Hong Kong and am now based in Japan.

After working at Hakuba Happo-One in 2018, I fell in love with skiing. I later taught at resort schools and worked as an assistant at a JSBA school. I enjoy visiting different resorts across Japan and learning from different instructors and systems, which has helped me understand skiing from multiple perspectives.

Teaching myself as a beginner was difficult. After learning about teaching methods such as CASI and JSBA, I wanted to help others get started more quickly. I enjoy working with children and helping women improve their skiing and build confidence.

Resorts where I have worked include Hakuba Happo-One, Yeti in Shizuoka, Naeba in Niigata, and Dynaland in Gifu.`],
    ['Anita', `I am Anita from Taiwan. After finishing a skiing trip in the Southern Hemisphere, I am returning to Hokkaido, my second home.

I have five seasons of teaching experience and am a patient, gentle, and engaging instructor. Come and enjoy the powder snow in Japan with me.

Teaching experience:
2018/19: Club Med Sahoro.
2019/20: Hoshino Tomamu Ski School in Hokkaido.
2022/23: Club Med Tomamu.
2023/24: Niseko.
2024: Australia Falls Creek Ski School.`],
    ['Eddie', 'Profile details are being confirmed. Eddie can teach in English and Mandarin Chinese, subject to date and resort availability.'],
    ['Tina', 'Profile details are being confirmed. Please contact us to confirm lesson availability and suitable lesson arrangements.'],
    ['Jessika', 'Profile details are being confirmed. Jessika can teach in English, Mandarin Chinese, and Cantonese, subject to date and resort availability.'],
    ['Leo', `I have three years and four seasons of teaching experience, and obtained CSIA Level 3 in my third year.

I am good at explaining ski theory in everyday terms. My varied and engaging teaching methods make learning to ski easier, and I have helped several students obtain international instructor qualifications.

Experience includes Karuizawa Prince Ski School in Japan, assisting at ISKI indoor ski facilities in Taiwan, Hoshino ski resorts in Hokkaido, and Guangzhou Sunac indoor ski facilities in China.`],
    ['Wulf', `Alpine skiing and freestyle skiing offer many ways to progress.

Speed and freestyle can come together as music and snow move together. Enjoy the speed and excitement that skiing brings. My background combines a New Zealand teaching system, Japanese-style skiing, and freestyle skiing.`],
    ['大強', `I have been based in Hokkaido for 10 years.

I encountered skiing in Hokkaido, learned to ski in Hokkaido, and fell in love with skiing in Hokkaido. Through skiing, I have changed and grown.

My skiing style is fully Japanese.`],
    ['Pagi', `Hi, I am Pagi. The sound of flattening things underfoot.

I am a diving instructor in summer and a ski instructor in winter. Let us enjoy the sea of snow together.

2019/20 Japan season: received a top Chinese instructor rating at Hoshino Resort.
2022/23 Japan season: based at Hoshino Resort, with occasional lessons at Teine and Furano.
Summer 2023: trained at Cardrona in New Zealand.
2023/24 Japan season: based in Hokkaido, mainly at Hoshino Resort.`],
    ['Zoe', `My main resort is Hoshino in Hokkaido, and I also have experience at Furano and Sapporo Kokusai. In summer, I work at Guangzhou Sunac indoor ski facilities.

My teaching style is fun and patient. I can think from a beginner's perspective about how to learn efficiently.

Qualifications: CSIA Level 1 ski instructor license and national vocational ski instructor Level 5.
Competition result: 2024 Guangzhou Sunac women's elite ski giant slalom champion.`],
    ['Shaun', `The 2024/25 season was my seventh season teaching. I provide lessons at resorts across Hokkaido.

I began teaching in 2016 and have taught in Hakuba and other resorts in Nagano, Yuzawa in Niigata, and resorts across Hokkaido.

Teaching specialty: beginners. I adjust lessons to each guest's situation, help beginners observe and understand resort terrain, and provide a basic introduction to the resort so they can enjoy skiing more in the future.

Progression training: tree skiing and basic jumps can also be discussed.`],
    ['Momo', `I have been based in Hokkaido for 10 years.

I specialize in lessons for families, children, and adults. I also provide skiing photos and videos during lessons.`]
  ]);
  const toEnglish = (value) => {
    let text = String(value || '');
    if (!text) return '';
    text = text
      .replace(/加拿大雙板指導員\s*CSIA\s*(\d)級/g, 'CSIA Ski Instructor Level $1 (Canada)')
      .replace(/加拿大單板指導員\s*CASI\s*(\d)級/g, 'CASI Snowboard Instructor Level $1 (Canada)')
      .replace(/加拿大CSIA\s*(\d)級[，,]\s*(\d)級考官/g, 'CSIA Level $1, Level $2 Examiner')
      .replace(/加拿大CSIA\s*(\d)級/g, 'CSIA Level $1 (Canada)')
      .replace(/加拿大CASI\s*(\d)級/g, 'CASI Level $1 (Canada)')
      .replace(/紐西蘭雙板指導員\s*NZSIA\s*(\d)級/g, 'NZSIA Ski Instructor Level $1 (New Zealand)')
      .replace(/紐西蘭單板指導員\s*SBINZ\s*(\d)級/g, 'SBINZ Snowboard Instructor Level $1 (New Zealand)')
      .replace(/紐西蘭\s*NZSIA\s*(\d)級/g, 'NZSIA Ski Instructor Level $1 (New Zealand)')
      .replace(/紐西蘭\s*SBINZ\s*(\d)級/g, 'SBINZ Snowboard Instructor Level $1 (New Zealand)')
      .replace(/紐西蘭雙板指導員\s*(\d)級/g, 'NZSIA Level $1')
      .replace(/紐西蘭單板指導員\s*(\d)級/g, 'SBINZ Level $1')
      .replace(/紐西蘭雙板指導員\s*NZSIA\s*兒童教學\s*(\d)級/g, 'NZSIA Ski Instructor Level $1 (Children\'s instruction, New Zealand)')
      .replace(/紐西蘭雙板指導員\s*NZSIA\s*兒童教學/g, 'NZSIA Ski Instructor (Children\'s instruction, New Zealand)')
      .replace(/加拿大雙板指導員\s*CSIA\s*考官\s*(\d)級/g, 'CSIA Ski Instructor Level $1 Examiner (Canada)')
      .replace(/加拿大雙板滑雪系統\s*CSIA\s*Level\s*(\d)\s*教練執照/g, 'CSIA Ski Instructor Level $1 license (Canada)')
      .replace(/加拿大雙板滑雪系統\s*CSIA\s*Level\s*(\d)教練執照/g, 'CSIA Ski Instructor Level $1 license (Canada)')
      .replace(/日本單板\s*JSBA\s*C級指導員/g, 'JSBA C-level snowboard instructor')
      .replace(/JSBA\s*C級指導員/g, 'JSBA C-level instructor')
      .replace(/SAJ\s*公認單板準指導員/g, 'SAJ certified associate snowboard instructor')
      .replace(/SAJ\s*公認單板\s*C級檢定員/g, 'SAJ certified snowboard examiner, C level')
      .replace(/SAJ准指导员/g, 'SAJ associate instructor')
      .replace(/2024\s*年廣州融創雙板大迴轉女子精英組冠軍/g, '2024 Guangzhou Sunac indoor ski resort women\'s elite giant slalom champion')
      .replace(/澳大利亞雙板指導員\s*APSI\s*(\d)級/g, 'APSI Ski Instructor Level $1 (Australia)')
      .replace(/澳大利亞\s*APSI\s*(\d)級/g, 'APSI Ski Instructor Level $1 (Australia)')
      .replace(/日本單板檢定\s*SAJ\s*(\d)級/g, 'SAJ Snowboard Certification Level $1 (Japan)')
      .replace(/日本雙板檢定\s*SAJ\s*(\d)級/g, 'SAJ Ski Certification Level $1 (Japan)')
      .replace(/日本雙板指導員\s*SAJ\s*(\d)級/g, 'SAJ Ski Instructor Level $1 (Japan)')
      .replace(/日本單板指導員\s*SAJ\s*(\d)級/g, 'SAJ Snowboard Instructor Level $1 (Japan)')
      .replace(/韓國雙板指導員\s*KSIA\s*(\d)級/g, 'KSIA Ski Instructor Level $1 (Korea)');
    englishPhrases.forEach(([from, to]) => { text = text.split(from).join(to); });
    text = text
      .replace(/加拿大雙板指導員\s*CSIA\s*(\d)Level/g, 'CSIA Ski Instructor Level $1 (Canada)')
      .replace(/加拿大單板指導員\s*CASI\s*(\d)Level/g, 'CASI Snowboard Instructor Level $1 (Canada)')
      .replace(/加拿大CSIA\s*(\d)Level/g, 'CSIA Level $1 (Canada)')
      .replace(/加拿大CASI\s*(\d)Level/g, 'CASI Level $1 (Canada)')
      .replace(/CanadaSkiInstructor\s*CSIA\s*(\d)Level/g, 'CSIA Ski Instructor Level $1 (Canada)')
      .replace(/CanadaSnowboardInstructor\s*CASI\s*(\d)Level/g, 'CASI Snowboard Instructor Level $1 (Canada)')
      .replace(/CanadaCSIA\s*(\d)Level/g, 'CSIA Level $1 (Canada)')
      .replace(/CanadaCASI\s*(\d)Level/g, 'CASI Level $1 (Canada)')
      .replace(/New Zealand雙板Instructor\s*NZSIA\s*(\d)Level/g, 'NZSIA Ski Instructor Level $1 (New Zealand)')
      .replace(/New Zealand單板Instructor\s*SBINZ\s*(\d)Level/g, 'SBINZ Snowboard Instructor Level $1 (New Zealand)')
      .replace(/New Zealand雙板Instructor\s*(\d)Level/g, 'NZSIA Ski Instructor Level $1 (New Zealand)')
      .replace(/New Zealand單板Instructor\s*(\d)Level/g, 'SBINZ Snowboard Instructor Level $1 (New Zealand)')
      .replace(/New ZealandSkiInstructor\s*NZSIA\s*(\d)Level/g, 'NZSIA Ski Instructor Level $1 (New Zealand)')
      .replace(/New ZealandSnowboardInstructor\s*SBINZ\s*(\d)Level/g, 'SBINZ Snowboard Instructor Level $1 (New Zealand)')
      .replace(/New ZealandSkiInstructor\s*(\d)Level/g, 'NZSIA Ski Instructor Level $1 (New Zealand)')
      .replace(/New ZealandSnowboardInstructor\s*(\d)Level/g, 'SBINZ Snowboard Instructor Level $1 (New Zealand)')
      .replace(/Japan雙板Instructor\s*SAJ\s*(\d)Level/g, 'SAJ Ski Instructor Level $1 (Japan)')
      .replace(/Japan單板Certification\s*SAJ\s*(\d)Level/g, 'SAJ Snowboard Certification Level $1 (Japan)')
      .replace(/Japan滑雪Instructor\s*SAJ\s*(\d)Level/g, 'SAJ Ski Instructor Level $1 (Japan)')
      .replace(/JapanSkiInstructor\s*SAJ\s*(\d)Level/g, 'SAJ Ski Instructor Level $1 (Japan)')
      .replace(/JapanSnowboardCertification\s*SAJ\s*(\d)Level/g, 'SAJ Snowboard Certification Level $1 (Japan)')
      .replace(/Japan滑雪Instructor\s*SAJ\s*(\d)Level/g, 'SAJ Ski Instructor Level $1 (Japan)')
      .replace(/CSIA雙板三LevelInstructor資格/g, 'CSIA Ski Instructor Level 3 certification')
      .replace(/CASI單板二LevelInstructor資格/g, 'CASI Snowboard Instructor Level 2 certification')
      .replace(/(\d+)年(\d+)季教學經驗/g, '$1 years and $2 seasons of teaching experience')
      .replace(/(\d+)年教學經驗/g, '$1 years of teaching experience')
      .replace(/(\d+)季教學/g, '$1 seasons of teaching');
    text = text
      .replace(/CSIA Ski Instructor Level (\d+) Examiner/g, 'CSIA Level $1 Examiner')
      .replace(/CSIA Ski Instructor Level (\d+) license/g, 'CSIA Level $1')
      .replace(/CSIA Ski Instructor Level (\d+)/g, 'CSIA Level $1')
      .replace(/CASI Snowboard Instructor Level (\d+)/g, 'CASI Level $1')
      .replace(/NZSIA Ski Instructor Level (\d+)/g, 'NZSIA Level $1')
      .replace(/SBINZ Snowboard Instructor Level (\d+)/g, 'SBINZ Level $1')
      .replace(/SAJ (?:Snowboard Certification|Ski Certification|Ski Instructor|Snowboard Instructor) Level (\d+)/g, 'SAJ Level $1')
      .replace(/KSIA Ski Instructor Level (\d+)/g, 'KSIA Level $1')
      .replace(/APSI Ski Instructor Level (\d+)/g, 'APSI Level $1')
      .replace(/\s*\((?:Canada|New Zealand|Japan|Korea|Australia)\)/g, '');
    text = text.replace(/\bLevel\s+(\d+)\b/g, 'Lv$1');
    if (/[\u3400-\u9fff]/.test(text)) return 'Profile details are being confirmed. Please contact us for current lesson availability.';
    return text;
  };
  const t = (value) => {
    if (isEnglish()) return toEnglish(value);
    return isSimplified() ? toSimplified(value) : String(value || '');
  };
  const siteBase = () => {
    const path = window.location.pathname || '/';
    const marker = '/snowtravel-website/';
    if (path.startsWith(marker)) return marker;
    return '/';
  };
  const siteAssetUrl = (path) => {
    const cleanPath = String(path || '').replace(/^\/+/, '');
    if (!cleanPath) return '';
    return `${siteBase()}${cleanPath}`;
  };
  const localizedTitle = (title) => {
    if (!title || typeof title !== 'object') return t(title);
    if (isEnglish()) return title.en || '';
    return isSimplified() ? title.zhHans : title.zhHant;
  };
  const localizeMedia = (item) => ({ ...item, alt: item.alt ? t(item.alt) : item.alt, title: item.title ? localizedTitle(item.title) : item.title });
  const localizeVideo = (item) => ({ ...item, title: localizedTitle(item.title) });
  const localizeCoach = (coach) => ({
    ...coach,
    name: t(coach.name),
    displayName: t(coach.displayName),
    skiLevel: coach.skiLevel,
    snowboardLevel: coach.snowboardLevel,
    skiCertLabel: coach.skiCertLabel ? t(coach.skiCertLabel) : '',
    snowboardCertLabel: coach.snowboardCertLabel ? t(coach.snowboardCertLabel) : '',
    background: coach.background ? t(coach.background) : '',
    languages: (coach.languages || []).map(t),
    intro: isEnglish() ? toEnglish(englishIntroByCoach.get(coach.name) || coach.intro) : t(coach.intro),
    certificates: (coach.certificates || []).map(t),
    photos: (coach.photos || []).map(localizeMedia),
    certificateImages: (coach.certificateImages || []).map(localizeMedia),
    videos: (coach.videos || []).map(localizeVideo)
  });
  const localizedCoaches = coaches.map(localizeCoach);

  const teamCoaches = () => localizedCoaches.filter((coach) => coach.showInTeam);
  const certificateSummary = (coach) => {
    const parts = [];
    if (coach.snowboardLevel) parts.push(`${t('單板')} ${t(coach.snowboardLevel)}`);
    if (coach.skiLevel) parts.push(`${t('雙板')} ${t(coach.skiLevel)}`);
    return parts.length ? parts.join(' / ') : t('證照確認中');
  };
  const languageText = (coach) => coach.languages.join(isEnglish() ? ' / ' : '、');
  const coachAssetUrl = siteAssetUrl;
  const mediaButton = (item, index, type) => {
    const layoutClass = item.layout ? ` is-${String(item.layout).replace(/[^a-z0-9-]/gi, '')}` : '';
    const titleClass = type === t('證照') ? ' coach-media-caption-overlay' : '';
    return `
    <button class="coach-media-thumb${layoutClass}" type="button" data-coach-lightbox-src="${escapeHtml(coachAssetUrl(item.src))}" data-coach-lightbox-title="${escapeHtml(item.title || item.alt || '')}">
      <img src="${escapeHtml(coachAssetUrl(item.src))}" alt="${escapeHtml(item.alt || item.title || `${t(type)} ${index + 1}`)}" loading="lazy">
      ${item.title ? `<span class="coach-media-caption${titleClass}">${escapeHtml(item.title)}</span>` : ''}
    </button>`;
  };
  const videoButton = (item, index) => {
    const layoutClass = item.layout ? ` is-${String(item.layout).replace(/[^a-z0-9-]/gi, '')}` : '';
    const title = item.title || `${t('視頻')} ${index + 1}`;
    return `
    <button class="coach-media-thumb coach-video-thumb${layoutClass}" type="button" aria-label="${escapeHtml(title)}" data-coach-lightbox-kind="video" data-coach-lightbox-src="${escapeHtml(item.url)}" data-coach-lightbox-title="${escapeHtml(title)}">
      <span class="coach-video-poster" aria-hidden="true">
        ${item.poster ? `<img src="${escapeHtml(coachAssetUrl(item.poster))}" alt="" loading="lazy">` : ''}
        <span class="coach-video-play">▶</span>
      </span>
    </button>`;
  };
  const richParagraphs = (value, fallback = t('教練簡介稍後補充。')) => String(value || fallback)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`)
    .join('');
  const coachCertLines = (coach) => [
    coach.snowboardCertLabel ? `${t('單板：')}${coach.snowboardCertLabel}` : '',
    coach.skiCertLabel ? `${t('雙板：')}${coach.skiCertLabel}` : ''
  ].filter(Boolean);
  const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

  const tabContent = (coach, tab) => {
    if (tab === 'intro') {
      return `
        <div class="coach-profile-intro">
          <p><strong>${t('背景：')}</strong><span>${escapeHtml(coach.background)}</span></p>
          <p><strong>${t('語言：')}</strong><span>${escapeHtml(languageText(coach))}</span></p>
          ${richParagraphs(coach.intro)}
        </div>`;
    }
    if (tab === 'certificates') {
      const certificateImages = Array.isArray(coach.certificateImages) && coach.certificateImages.length
        ? `<div class="coach-media-grid coach-certificate-grid">${coach.certificateImages.map((item, index) => mediaButton(item, index, t('證照'))).join('')}</div>`
        : '';
      const certificateList = coach.certificates.length && !certificateImages
        ? `<ul>${coach.certificates.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
        : '';
      return certificateList || certificateImages ? `${certificateList}${certificateImages}` : `<p>${t('證照資料準備中。')}</p>`;
    }
    if (tab === 'photos') {
      return Array.isArray(coach.photos) && coach.photos.length
        ? `<div class="coach-media-grid coach-photo-mosaic">${coach.photos.map((item, index) => mediaButton(item, index, t('照片'))).join('')}</div>`
        : `<p>${t('照片準備中。')}</p>`;
    }
    return Array.isArray(coach.videos) && coach.videos.length
      ? `<div class="coach-media-grid coach-video-mosaic">${coach.videos.map(videoButton).join('')}</div>`
      : `<p>${t('視頻準備中。')}</p>`;
  };

  const closeCoachLightbox = () => {
    const existing = document.querySelector('[data-coach-lightbox]');
    if (existing) existing.remove();
  };
  const openCoachLightbox = (src, title, kind = 'image') => {
    if (!src) return;
    closeCoachLightbox();
    const lightbox = document.createElement('div');
    lightbox.className = 'coach-lightbox';
    lightbox.setAttribute('data-coach-lightbox', '');
    const media = kind === 'video'
      ? `<video src="${escapeHtml(src)}" controls autoplay playsinline preload="metadata"></video>`
      : `<img src="${escapeHtml(src)}" alt="${escapeHtml(title || t('教練素材預覽'))}">`;
    lightbox.innerHTML = `
      <button class="coach-lightbox-close" type="button" aria-label="${t('關閉預覽')}">&times;</button>
      <figure>
        ${media}
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
            <span class="coach-avatar-placeholder">${coach.avatar ? `<img src="${escapeHtml(coachAssetUrl(coach.avatar))}" alt="${escapeHtml(coach.name)} ${t('教練頭像')}" loading="lazy">` : escapeHtml(coach.name.slice(0, 1))}</span>
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
        <div class="coach-profile-tabs" role="tablist" aria-label="${escapeHtml(coach.name)} ${t('教練詳情')}">
          ${[
            ['intro', t('教練簡介')],
            ['certificates', t('教練證照')],
            ['photos', t('照片')],
            ['videos', t('視頻')]
          ].map(([id, label]) => `<button type="button" class="${id === tab ? 'is-active' : ''}" data-coach-tab="${id}">${label}</button>`).join('')}
        </div>
        <div class="coach-profile-body" data-coach-tab-panel>${tabContent(coach, tab)}</div>`;
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
        openCoachLightbox(media.dataset.coachLightboxSrc, media.dataset.coachLightboxTitle, media.dataset.coachLightboxKind || 'image');
      }
    });

    const syncFromHash = (event) => {
      const eventHash = event && event.detail && event.detail.hash ? event.detail.hash : '';
      const hash = (eventHash || window.location.hash).replace('#', '');
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

  window.SNOWTRAVEL_COACHES = localizedCoaches;
  window.SNOWTRAVEL_I18N = { isSimplified, isEnglish, toSimplified, toEnglish, t };
  window.SNOWTRAVEL_SITE_ASSET_URL = siteAssetUrl;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderCoachTeam);
  } else {
    renderCoachTeam();
  }
})();
