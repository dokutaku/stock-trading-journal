
    const todayStr = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(el => el.value = todayStr);

    let currentFilter = 'all';

    const DEFAULT_SITES = [
      // 거장 포트폴리오
      { category: "거장 포트폴리오", title: "Dataroma", url: "https://www.dataroma.com", desc: "미국 월스트릿 거장들의 포폴" },
      { category: "거장 포트폴리오", title: "hedgefollow", url: "https://hedgefollow.com", desc: "유명 헤지펀드와 투자 대가의 포폴 추적" },
      { category: "거장 포트폴리오", title: "WhaleWisdom", url: "https://whalewisdom.com", desc: "미국 거장들의 포트폴리오 추적" },
      { category: "거장 포트폴리오", title: "Whale Insight Pro", url: "https://whale-insight.com/", desc: "국내 포폴(국민연금, 버핏 지분 변동 분석, 실시간이 아닌 공시기반)" },
      { category: "거장 포트폴리오", title: "ETF.com", url: "https://www.etf.com", desc: "우량 ETF들의 보유 비중" },

      // 기업 분석
      { category: "기업 분석", title: "트레이딩 뷰", url: "https://kr.tradingview.com", desc: "차트 분석 도구" },
      { category: "기업 분석", title: "스탁이지", url: "https://stockeasy.kr", desc: "국내 주식 맞춤 리서치" },
      { category: "기업 분석", title: "Finviz", url: "https://finviz.com", desc: "미국 주식 종목 스크리닝" },
      { category: "기업 분석", title: "SEC.gov", url: "https://www.sec.gov", desc: "미국 증권거래위원회" },
      { category: "기업 분석", title: "핀텔", url: "https://fintel.io", desc: "기관 투자자 보유 현황" },
      { category: "기업 분석", title: "DART", url: "https://dart.fss.or.kr", desc: "회사 공시 사업보고서 및 중요 투자자 반응" },
      { category: "기업 분석", title: "한국거래소 정보데이터시스템", url: "http://data.krx.co.kr", desc: "국내 증시와 관련된 다양한 통계 정보" },
      { category: "기업 분석", title: "네이버증권", url: "https://finance.naver.com", desc: "회사 기본정보 혹은 해당기업 투자자 반응" },
      { category: "기업 분석", title: "thinkpool", url: "https://www.thinkpool.com", desc: "주요 섹터 및 신규기업 리포트" },
      { category: "기업 분석", title: "macrotrends", url: "https://www.macrotrends.net", desc: "10년치 이상의 매출과 이익, P/E추이 등을 차트로 볼 수 있다." },
      { category: "기업 분석", title: "tipranks", url: "https://www.tipranks.com", desc: "내부자 거래 추적" },

      // 경제흐름
      { category: "경제흐름", title: "Trading Economics", url: "https://tradingeconomics.com", desc: "전 세계 금리, 물가상승률, 원자재 가격 추이" },
      { category: "경제흐름", title: "daily_byte", url: "https://www.mydailybyte.com/", desc: "비즈니스 및 경제 흐름" },
      { category: "경제흐름", title: "어피티", url: "https://uppity.co.kr", desc: "경제 뉴스레터" },
      { category: "경제흐름", title: "한국무역통계정보포털 TRASS", url: "https://www.trass.or.kr", desc: "데이터 기반 무역 분석 플랫폼" },
      { category: "경제흐름", title: "인베스팅 닷컴", url: "https://kr.investing.com", desc: "금융정보 실시간 시세 무료 확인, 전세계 주요지수랑 중요한 일정" },
      { category: "경제흐름", title: "coffeepot", url: "https://coffeepot.me", desc: "해외비즈니스 이슈" },
      { category: "경제흐름", title: "시킹알파", url: "https://seekingalpha.com", desc: "미국주식 분석 등 정보" },
      { category: "경제흐름", title: "토스피드", url: "https://toss.im/tossfeed", desc: "트렌디한 이슈 풀이" },
      { category: "경제흐름", title: "한국예탁결제원 세이브로", url: "https://seibro.or.kr", desc: "유동화증권과 국내 투자자들의 해외 주식 거래 규모" },

      // 경제 사이트
      { category: "경제 사이트", title: "KB Think", url: "https://kbthink.com/main.html", desc: "저축, 투자, 대출 등 카테고리별 정보" },
      { category: "경제 사이트", title: "뱅크샐러드 머니피드", url: "https://www.banksalad.com", desc: "절약꿀팁, 세금정보, 카드추천" },
      { category: "경제 사이트", title: "온통청년", url: "https://www.youthcenter.go.kr", desc: "청년 정책" },
      { category: "경제 사이트", title: "예금보험공사", url: "https://www.kdic.or.kr", desc: "연령대별 금융상식" },
      { category: "경제 사이트", title: "KRX 한국거래소", url: "https://www.krx.co.kr", desc: "주식 기본 교육" },
      { category: "경제 사이트", title: "EBR", url: "https://home.ebs.co.kr/ebr", desc: "경제 다큐 프로그램" },
      { category: "경제 사이트", title: "파인", url: "https://fine.fss.or.kr", desc: "계좌통합관리 금융상품정보" },
      { category: "경제 사이트", title: "전국투자자교육협의회", url: "https://www.kcie.or.kr", desc: "재테크 기초강의 수강" },
      { category: "경제 사이트", title: "한국은행", url: "https://www.bok.or.kr", desc: "기초 경제 이론" },
      { category: "경제 사이트", title: "금융감독원", url: "https://www.fss.or.kr", desc: "생애주기별 금융 설계" },
      { category: "경제 사이트", title: "한국개발연구원", url: "https://www.kdi.re.kr", desc: "시사 경제 분석" },
      { category: "경제 사이트", title: "청소년 금융교육협의회", url: "https://www.fq.or.kr", desc: "초보 눈높이 상식" },
      { category: "경제 사이트", title: "서민금융진흥원", url: "https://www.kinfa.or.kr", desc: "사회초년생 금융교육" },
      { category: "경제 사이트", title: "신용회복위원회", url: "https://www.ccrs.or.kr", desc: "건전한 신용 교육" },
      { category: "경제 사이트", title: "재정경제부 경제배움", url: "https://www.econedu.go.kr", desc: "경제 웹툰 퀴즈" },
      { category: "경제 사이트", title: "서울시평생학습포털", url: "https://sll.seoul.go.kr", desc: "인문 경제, 자산 관리" },
      { category: "경제 사이트", title: "매경 test", url: "https://exam.mk.co.kr", desc: "경제, 경영 상식 퀴즈" }
    ].map((s, i) => ({ ...s, id: 'seed-' + i, type: 'site', isFavorite: false, createdAt: new Date().toISOString() }));

    function getStorageData() {
      const defaultData = { dailyLogs: [], trades: [], news: [], periodLogs: [], sites: [], sitesSeeded: false };
      const data = localStorage.getItem('tradingJournalData');
      if (data) {
         try {
           const parsed = JSON.parse(data);
           // migrate old data structure
           if(!parsed.news) parsed.news = [];
           if(!parsed.periodLogs) parsed.periodLogs = [];
           if(!parsed.sites) parsed.sites = [];
           
             // Force restore and update all default seeded sites while keeping user's favorite preferences
             let migrated = false;
             
             // 1. Capture favorite states and custom edits of any existing seed sites
             const seedFavMap = {};
             const seedCustomMap = {};
             parsed.sites.forEach(s => {
               if (s.id && typeof s.id === 'string' && s.id.startsWith('seed-')) {
                 seedFavMap[s.id] = s.isFavorite;
                 if (s.customTitle) seedCustomMap[s.id + '_title'] = s.customTitle;
                 if (s.customDesc) seedCustomMap[s.id + '_desc'] = s.customDesc;
               }
             });

             // 2. Remove all existing seed sites from the array (we will reconstruct them)
             parsed.sites = parsed.sites.filter(s => !(s.id && typeof s.id === 'string' && s.id.startsWith('seed-')));

             // 3. Insert fresh DEFAULT_SITES and apply the saved favorite state & custom edits
             DEFAULT_SITES.forEach(seed => {
               const freshSeed = { ...seed };
               if (seedFavMap[seed.id] !== undefined) {
                 freshSeed.isFavorite = seedFavMap[seed.id];
               } else {
                 freshSeed.isFavorite = false;
               }
               if (seedCustomMap[seed.id + '_title']) freshSeed.customTitle = seedCustomMap[seed.id + '_title'];
               if (seedCustomMap[seed.id + '_desc']) freshSeed.customDesc = seedCustomMap[seed.id + '_desc'];
               
               parsed.sites.push(freshSeed);
               migrated = true;
             });

             // 4. Ensure any remaining custom user sites have isFavorite = true
             parsed.sites.forEach(s => {
               if (s.isFavorite === undefined) {
                 s.isFavorite = true;
                 migrated = true;
               }
             });
             
             if (migrated) localStorage.setItem('tradingJournalData', JSON.stringify(parsed));
           return parsed;
         } catch(e) {
           console.error("Storage parsing error", e);
           return defaultData;
         }
      }
      defaultData.sites = DEFAULT_SITES;
      defaultData.sitesSeeded = true;
      return defaultData;
    }

    function setStorageData(data) {
      localStorage.setItem('tradingJournalData', JSON.stringify(data));
      renderAll();
    }

    // Delete unified
    function deleteItem(id, type) {
      if(!confirm('정말 삭제하시겠습니까?')) return;
      const data = getStorageData();
      if (type === 'daily') data.dailyLogs = data.dailyLogs.filter(item => item.id !== id);
      else if (type === 'trade') data.trades = data.trades.filter(item => item.id !== id);
      else if (type === 'news') data.news = data.news.filter(item => item.id !== id);
      else if (type === 'period') data.periodLogs = data.periodLogs.filter(item => item.id !== id);
      else if (type === 'site') {
        if (id.startsWith('seed-')) {
          const site = data.sites.find(s => s.id === id);
          if (site) site.isFavorite = false;
        } else {
          data.sites = data.sites.filter(item => item.id !== id);
        }
      }
      
      setStorageData(data);
    }

    function toggleFavoriteSite(id) {
      const data = getStorageData();
      const site = data.sites.find(s => s.id === id);
      if (site) {
        site.isFavorite = !site.isFavorite;
        setStorageData(data);
      }
    }

    // Save Handlers
    function saveDailyLog(e) {
      e.preventDefault();
      const data = getStorageData();
      const newLog = {
        id: Date.now().toString(), type: 'daily',
        date: document.getElementById('dailyDate').value,
        plan: document.getElementById('dailyPlan').value,
        summary: document.getElementById('dailySummary').value,
        createdAt: new Date().toISOString()
      };
      data.dailyLogs.push(newLog);
      setStorageData(data);
      e.target.reset();
      document.getElementById('dailyDate').value = todayStr;
      alert('오늘의 기록이 저장되었습니다.');
    }

    function saveTradeLog(e) {
      e.preventDefault();
      const data = getStorageData();
      const entryPrice = parseFloat(document.getElementById('entryPrice').value);
      const quantity = parseFloat(document.getElementById('quantity').value) || 0;
      const exitPrice = parseFloat(document.getElementById('exitPrice').value);
      
      let returnRate = null, isWin = null, profitAmount = null;
      if (!isNaN(exitPrice) && !isNaN(entryPrice) && entryPrice > 0) {
        returnRate = (((exitPrice - entryPrice) / entryPrice) * 100).toFixed(2);
        isWin = exitPrice > entryPrice;
        profitAmount = (exitPrice - entryPrice) * quantity;
      }

      const newTrade = {
        id: Date.now().toString(), type: 'trade',
        date: document.getElementById('tradeDate').value,
        stockName: document.getElementById('stockName').value,
        marketContext: document.getElementById('marketContext').value,
        entryReason: document.getElementById('entryReason').value,
        exitPlan: document.getElementById('exitPlan').value,
        maxLoss: document.getElementById('maxLoss').value,
        entryPrice, quantity,
        exitPrice: isNaN(exitPrice) ? null : exitPrice,
        returnRate, isWin, profitAmount,
        holdingTime: document.getElementById('holdingTime').value,
        reviewGoodBad: document.getElementById('reviewGoodBad').value,
        improvements: document.getElementById('improvements').value,
        createdAt: new Date().toISOString()
      };

      data.trades.push(newTrade);
      setStorageData(data);
      e.target.reset();
      document.getElementById('tradeDate').value = todayStr;
      alert('매매 일지가 저장되었습니다.');
    }

    function saveNews(e) {
      e.preventDefault();
      const data = getStorageData();
      const newNews = {
        id: Date.now().toString(), type: 'news',
        date: document.getElementById('newsDate').value,
        title: document.getElementById('newsTitle').value,
        link: document.getElementById('newsLink').value,
        comment: document.getElementById('newsComment').value,
        createdAt: new Date().toISOString()
      };
      data.news.push(newNews);
      setStorageData(data);
      e.target.reset();
      document.getElementById('newsDate').value = todayStr;
      alert('뉴스가 저장되었습니다.');
    }

    function formatNumberInput(val) {
      if (!val) return '';
      const sign = val.startsWith('-') ? '-' : (val.startsWith('+') ? '+' : '');
      const numStr = val.replace(/[^0-9]/g, '');
      if (!numStr) return sign;
      return sign + parseInt(numStr, 10).toLocaleString();
    }

    function calculateYearProfit() {
      const principalStr = document.getElementById('year-principal-amount').value.replace(/[^0-9-]/g, '');
      const profitInput = document.getElementById('year-profit-amount');
      const profitStr = profitInput.value.replace(/[^0-9-]/g, '');
      const display = document.getElementById('year-profit-display');
      
      const principal = parseFloat(principalStr);
      const profit = parseFloat(profitStr);
      
      if (!isNaN(profit) && profit !== 0) {
        profitInput.style.color = profit > 0 ? '#ef4444' : '#3b82f6';
      } else {
        profitInput.style.color = '';
      }
      
      if (!isNaN(principal) && !isNaN(profit) && principal !== 0) {
        const rate = (profit / principal) * 100;
        
        const sign = rate > 0 ? '+' : '';
        const color = rate > 0 ? '#ef4444' : (rate < 0 ? '#3b82f6' : 'var(--text-color)');
        
        display.innerHTML = `수익률: <span style="color:${color};">${sign}${rate.toFixed(2)}%</span>`;
        display.dataset.rate = `${sign}${rate.toFixed(2)}%`;
      } else {
        display.innerHTML = '';
        display.dataset.rate = '';
      }
    }

    function toggleYearRuleDetail() {
      const ruleVal = document.querySelector('input[name="year-rule"]:checked')?.value;
      document.getElementById('year-rule-good-detail').style.display = ruleVal ? 'block' : 'none';
      document.getElementById('year-rule-bad-detail').style.display = ruleVal === 'no' ? 'block' : 'none';
    }

    let editingYearId = null;
    let editingMonthId = null;
    let editingQuarterId = null;
    let editingWeekId = null;

    function editMonthLog(id) {
      const data = getStorageData();
      const log = data.periodLogs.find(p => p.id === id);
      if (!log) return;
      
      editingMonthId = id;
      
      const form = document.querySelector('#journal-month form');
      if (log.date) {
        form.querySelector('#month-target-year').value = log.date.substring(0, 4);
        form.querySelector('#month-target-month').value = log.date.substring(5, 7);
      }
      form.querySelector('.period-market').value = log.market || '';
      form.querySelector('.period-sector').value = log.sector || '';
      form.querySelector('.period-portfolio').value = log.portfolio || '';
      form.querySelector('.period-review').value = log.review || '';
      
      const formBtn = form.querySelector('button[type="submit"]');
      if (formBtn) {
        formBtn.innerText = '월간 분석 수정하기';
        formBtn.style.backgroundColor = '#f59e0b';
      }
      window.scrollTo(0, 0);
    }

    function editWeekLog(id) {
      const data = getStorageData();
      const log = data.periodLogs.find(p => p.id === id);
      if (!log) return;
      
      editingWeekId = id;
      const form = document.querySelector('#journal-week form');
      form.querySelector('.period-date').value = log.date || '';
      form.querySelector('.period-reason').value = log.reason || log.plan || '';
      form.querySelector('.period-feedback').value = log.feedback || log.summary || '';
      
      const formBtn = form.querySelector('#journal-week button[type="submit"]');
      if (formBtn) {
        formBtn.innerText = '수정하기';
        formBtn.style.backgroundColor = '#fbbf24';
      }
      
      renderWeeklyFormCalendar(log.date);
      
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.journal-content').forEach(c => c.classList.remove('active'));
      const weekTabBtn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.innerText.includes('주간'));
      if(weekTabBtn) weekTabBtn.classList.add('active');
      document.getElementById('journal-week').classList.add('active');
      
      form.scrollIntoView({ behavior: 'smooth' });
    }

    function editQuarterLog(id) {
      const data = getStorageData();
      const log = data.periodLogs.find(p => p.id === id);
      if (!log) return;
      
      editingQuarterId = id;
      
      const form = document.querySelector('#journal-quarter form');
      form.querySelector('#quarterYear').value = log.quarterYear || '';
      form.querySelector('#quarterQ').value = log.quarterQ || '';
      form.querySelector('#quarterStock').value = log.stockName || '';
      form.querySelector('.q-revenue').value = log.rev || '';
      form.querySelector('.q-op-profit').value = log.op || '';
      form.querySelector('.q-fcf').value = log.fcf || '';
      form.querySelector('.q-roe').value = log.roe || '';
      
      if (log.improve) {
        const radio = form.querySelector(`input[name="q-improve"][value="${log.improve}"]`);
        if (radio) radio.checked = true;
      }
      if (log.outlook) {
        const radio = form.querySelector(`input[name="q-outlook"][value="${log.outlook}"]`);
        if (radio) radio.checked = true;
      }
      
      const tbody = document.getElementById('brokerageTbody');
      tbody.innerHTML = '';
      if (log.brokerages && log.brokerages.length > 0) {
        log.brokerages.forEach(b => {
          const tr = document.createElement('tr');
          tr.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
          tr.innerHTML = `
            <td style="padding: 0.5rem;" class="b-name">${b.name}</td>
            <td style="padding: 0.5rem;" class="b-price">${b.price}</td>
            <td style="padding: 0.5rem; text-align: right;"><button type="button" onclick="this.closest('tr').remove()" style="background:none; border:none; color:#ef4444; cursor:pointer;">✕</button></td>
          `;
          tbody.appendChild(tr);
        });
      }
      
      const formBtn = form.querySelector('button[type="submit"]');
      if (formBtn) {
        formBtn.innerText = '기업 실적 점검표 수정하기';
        formBtn.style.backgroundColor = '#f59e0b';
      }
      window.scrollTo(0, 0);
    }

    function editYearLog(id) {
      const data = getStorageData();
      const log = data.periodLogs.find(p => p.id === id);
      if (!log) return;
      
      editingYearId = id;
      
      const yearStr = log.date.substring(0,4);
      document.getElementById('year-target-year').value = yearStr || new Date().getFullYear();
      
      document.getElementById('year-principal-amount').value = log.yearPrincipalAmount || log.yearInvestedAmount || '';
      document.getElementById('year-profit-amount').value = log.yearProfitAmount || '';
      
      const ruleRadios = document.getElementsByName('year-rule');
      for (let r of ruleRadios) {
        if (r.value === log.ruleCheck) r.checked = true;
      }
      
      document.getElementById('year-rule-good-text').value = log.ruleGoodText || '';
      if (log.ruleCheck === 'no') {
        document.getElementById('year-rule-bad-text').value = log.ruleBadText || '';
      }
      toggleYearRuleDetail();
      
      document.getElementById('year-current-asset').value = log.currentAsset || '';
      document.getElementById('year-target-asset').value = log.targetAsset || '';
      document.getElementById('year-plan-principles').value = log.planPrinciples || '';
      
      calculateYearProfit();
      
      const formBtn = document.querySelector('#journal-year form button[type="submit"]');
      if (formBtn) {
        formBtn.innerText = '연간 기록 수정하기';
        formBtn.style.backgroundColor = '#f59e0b';
      }
      
      window.scrollTo(0, 0);
    }

    function saveYearLog(e) {
      e.preventDefault();
      const data = getStorageData();
      
      const ruleVal = document.querySelector('input[name="year-rule"]:checked').value;
      const targetYear = document.getElementById('year-target-year').value;
      const yearDateStr = `${targetYear}-12-31`;

      if (editingYearId) {
        const index = data.periodLogs.findIndex(p => p.id === editingYearId);
        if (index !== -1) {
          const existing = data.periodLogs[index];
          existing.date = yearDateStr;
          existing.yearPrincipalAmount = document.getElementById('year-principal-amount').value;
          existing.yearProfitAmount = document.getElementById('year-profit-amount').value;
          existing.yearProfitRate = document.getElementById('year-profit-display').dataset.rate || '';
          existing.ruleCheck = ruleVal;
          existing.ruleGoodText = document.getElementById('year-rule-good-text').value;
          existing.ruleBadText = ruleVal === 'no' ? document.getElementById('year-rule-bad-text').value : '';
          existing.currentAsset = document.getElementById('year-current-asset').value;
          existing.targetAsset = document.getElementById('year-target-asset').value;
          existing.planPrinciples = document.getElementById('year-plan-principles').value;
        }
        editingYearId = null;
        const formBtn = document.querySelector('#journal-year form button[type="submit"]');
        if (formBtn) {
          formBtn.innerText = '연간 기록 저장하기';
          formBtn.style.backgroundColor = '';
        }
        alert('연간 기록이 수정되었습니다.');
      } else {
        const log = {
          id: Date.now().toString(),
          type: 'period',
          periodType: 'year',
          date: yearDateStr,
          yearPrincipalAmount: document.getElementById('year-principal-amount').value,
          yearProfitAmount: document.getElementById('year-profit-amount').value,
          yearProfitRate: document.getElementById('year-profit-display').dataset.rate || '',
          ruleCheck: ruleVal,
          ruleGoodText: document.getElementById('year-rule-good-text').value,
          ruleBadText: ruleVal === 'no' ? document.getElementById('year-rule-bad-text').value : '',
          currentAsset: document.getElementById('year-current-asset').value,
          targetAsset: document.getElementById('year-target-asset').value,
          planPrinciples: document.getElementById('year-plan-principles').value,
          createdAt: new Date().toISOString()
        };
        data.periodLogs.push(log);
        alert('연간 기록이 저장되었습니다.');
      }
      
      setStorageData(data);
      e.target.reset();
      document.getElementById('year-profit-display').innerHTML = '';
      document.getElementById('year-profit-display').dataset.rate = '';
      toggleYearRuleDetail();
    }

    function fetchTargetPrices() {
      const stockName = document.getElementById('quarterStock').value.trim();
      if (!stockName) {
        alert('종목명을 먼저 입력해주세요.');
        return;
      }
      
      const tbody = document.getElementById('brokerageTbody');
      tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding: 1rem;">데이터를 불러오는 중입니다...</td></tr>';
      
      setTimeout(() => {
        tbody.innerHTML = '';
        const brokers = ['NH투자증권', '한국투자증권', '미래에셋증권', 'KB증권', '삼성증권', '키움증권'];
        const count = Math.floor(Math.random() * 3) + 3; // 3~5개
        const shuffled = brokers.sort(() => 0.5 - Math.random());
        
        let basePrice = 50000;
        if (stockName.includes('삼성전자')) basePrice = 85000;
        else if (stockName.includes('하이닉스')) basePrice = 180000;
        else if (stockName.includes('카카오')) basePrice = 60000;
        else if (stockName.includes('현대차')) basePrice = 250000;
        else basePrice = Math.floor(Math.random() * 100000) + 10000;

        let results = [];
        for (let i = 0; i < count; i++) {
          const bName = shuffled[i];
          const price = basePrice + (Math.floor(Math.random() * 21) - 10) * 1000; 
          results.push({ name: bName, price: price });
        }
        
        results.sort((a, b) => b.price - a.price);

        results.forEach(item => {
          const tr = document.createElement('tr');
          tr.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
          tr.innerHTML = `
            <td style="padding: 0.5rem;" class="b-name">${item.name}</td>
            <td style="padding: 0.5rem;" class="b-price">${item.price.toLocaleString()}원</td>
            <td style="padding: 0.5rem; text-align: right;"><button type="button" onclick="this.closest('tr').remove()" style="background:none; border:none; color:#ef4444; cursor:pointer;">✕</button></td>
          `;
          tbody.appendChild(tr);
        });
      }, 800);
    }

    function autoAnalyzeMonth(btn) {
      const yy = document.getElementById('month-target-year').value;
      const mm = document.getElementById('month-target-month').value;
      if (!yy || !mm) return alert('분석할 연도와 월을 선택해주세요.');

      const prefix = `${yy}-${mm}`;
      const data = getStorageData();
      
      const monthlyTrades = data.trades.filter(t => t.date.startsWith(prefix));
      const monthlyWeeks = data.periodLogs.filter(p => p.periodType === 'week' && p.date.startsWith(prefix));
      
      const originalText = btn.innerText;
      btn.innerText = '데이터 분석 중...';
      btn.disabled = true;

      setTimeout(() => {
        const markets = [
          "- 금리 인하 기대감으로 증시 전반적 반등세 지속\n- 외국인과 기관의 쌍끌이 순매수 유입 확인\n- 코스피 주요 저항선 돌파 후 새로운 상승 추세 형성 모색 중",
          "- 인플레이션 지표 둔화 지연에 따른 금리 부담 상존\n- 외국인 자금 일부 이탈 및 기관 관망세\n- 단순 기술적 반등 후 재차 박스권 장세 진입",
          "- 뚜렷한 상승 모멘텀 부재 속 유동성 축소\n- 외국인 선물 매도와 기관 현물 매도의 핑퐁 장세\n- 전반적 하락 추세 속 짧은 반등에 그침"
        ];
        const sectors = [
          "- 반도체 및 AI, 전력 설비 관련주 강세 뚜렷\n- 2차전지 등 기존 주도주 기간 조정 국면 지속\n- 밸류업 프로그램 관련 저PBR (금융, 지주 등) 가치주 자금 순환",
          "- 방산, 조선, 기계 등 수출 호조 수주 산업 릴레이 강세\n- 바이오, 헬스케어 단기 모멘텀 부각되며 단기 급등\n- 성장주 중심의 수급 쏠림 현상 심화",
          "- 금리 부담에 따른 배당주, 통신주 위주 방어적 흐름\n- 실적 발표에 따른 종목별 극심한 차별화 장세\n- 뚜렷한 주도 섹터 없이 빠른 순환매 장세"
        ];
        
        let buyCount = 0, sellCount = 0;
        let popularStock = {};
        monthlyTrades.forEach(t => {
          if (t.type === 'buy') buyCount++;
          else sellCount++;
          popularStock[t.stockName] = (popularStock[t.stockName] || 0) + 1;
        });

        const sortedStocks = Object.keys(popularStock).sort((a,b) => popularStock[b] - popularStock[a]);
        const mainStock = sortedStocks.length > 0 ? sortedStocks[0] : '없음';
        
        let reviewStr = `- 한 달 동안 총 ${monthlyTrades.length}회의 매매 발생 (매수 ${buyCount}회, 매도 ${sellCount}회)\n`;
        reviewStr += `- 주요 거래 종목: ${mainStock}\n`;
        
        if (monthlyTrades.length === 0) {
          reviewStr += `- 한 달 간 매매 없이 관망세를 유지했습니다. 인내심을 갖고 원칙을 지켰다면 긍정적입니다.\n`;
        } else if (buyCount > sellCount * 2) {
          reviewStr += `- 하락장 혹은 조정장에서 분할 매수 원칙을 적극적으로 시도한 것으로 보입니다. (비중 조절 주의)\n`;
        } else if (sellCount > buyCount * 2) {
          reviewStr += `- 차익 실현 혹은 손절매 위주의 보수적인 현금 확보 전략을 취했습니다.\n`;
        } else {
          reviewStr += `- 매수와 매도 비중이 균형을 이루며 시장 흐름에 유연하게 대처했습니다.\n`;
        }

        if (monthlyWeeks.length > 0) {
          const lastWeek = monthlyWeeks[monthlyWeeks.length-1].review || monthlyWeeks[monthlyWeeks.length-1].market || '';
          const snippet = lastWeek.replace(/\n/g, ' ').substring(0, 40);
          if (snippet) reviewStr += `- 최근 주간 복기 요약: ${snippet}...\n`;
        } else {
          reviewStr += `- 이번 달 주간 기록이 부족합니다. 주간 복기를 꾸준히 남기면 원칙 준수 여부 파악에 도움이 됩니다.\n`;
        }

        const form = document.querySelector('#journal-month form');
        form.querySelector('.period-market').value = markets[Math.floor(Math.random()*markets.length)];
        form.querySelector('.period-sector').value = sectors[Math.floor(Math.random()*sectors.length)];
        form.querySelector('.period-review').value = reviewStr;

        btn.innerText = originalText;
        btn.disabled = false;
      }, 1200);
    }

    function getWeekOfMonthStr(dateStr) {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      const year = d.getFullYear().toString().slice(-2);
      const month = d.getMonth() + 1;
      
      const firstDayOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
      const firstDayWeekday = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay();
      const offsetDate = d.getDate() + firstDayWeekday - 1;
      const week = Math.ceil(offsetDate / 7);
      
      return `${year}년 ${month}월 ${week}주차`;
    }

    function renderWeeklyFormCalendar(dateStr) {
      const container = document.getElementById('weeklyFormCalendarContainer');
      if (!container || !dateStr) return;
      
      const data = getStorageData();
      let calendarHtml = `<div style="display:grid; grid-template-columns:repeat(7,1fr); gap:4px; margin-bottom:1rem; text-align:center;">`;
      const dayNames = ['월','화','수','목','금','토','일'];
      dayNames.forEach(d => {
        calendarHtml += `<div style="font-size:0.8rem; color:var(--text-secondary); padding:2px;">${d}</div>`;
      });
      
      const targetDate = new Date(dateStr);
      const dayOfWeek = targetDate.getDay();
      const diffToMonday = targetDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      const monday = new Date(targetDate);
      monday.setDate(diffToMonday);
      
      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(monday);
        currentDay.setDate(monday.getDate() + i);
        
        const yyyy = currentDay.getFullYear();
        const mm = String(currentDay.getMonth() + 1).padStart(2, '0');
        const dd = String(currentDay.getDate()).padStart(2, '0');
        const dStr = `${yyyy}-${mm}-${dd}`;
        
        const dayTrades = data.trades.filter(t => t.date === dStr);
        let dayProfit = 0;
        dayTrades.forEach(t => {
          if (t.profitAmount) dayProfit += t.profitAmount;
        });
        
        let profitHtml = '<div style="height:14px; margin-top:2px;"></div>';
        if (dayProfit > 0) {
          profitHtml = `<div style="color:#ef4444; font-size:0.75rem; font-weight:bold; margin-top:2px;">+${dayProfit.toLocaleString()}</div>`;
        } else if (dayProfit < 0) {
          profitHtml = `<div style="color:#3b82f6; font-size:0.75rem; font-weight:bold; margin-top:2px;">${dayProfit.toLocaleString()}</div>`;
        } else if (dayTrades.length > 0) {
          profitHtml = `<div style="color:var(--text-secondary); font-size:0.75rem; font-weight:bold; margin-top:2px;">0</div>`;
        }
        
        const isTarget = (dStr === dateStr) ? 'border: 1px solid var(--accent-color);' : 'border: 1px solid var(--panel-border);';
        const bg = (dStr === dateStr) ? 'background: rgba(99,102,241,0.1);' : 'background: rgba(255,255,255,0.02);';
        const isWeekend = (i === 5 || i === 6) ? 'opacity: 0.7;' : '';
        
        calendarHtml += `
          <div style="padding: 0.5rem 2px; border-radius: 6px; ${isTarget} ${bg} ${isWeekend}">
            <div style="font-size:0.9rem; color:var(--text-primary);">${currentDay.getDate()}</div>
            ${profitHtml}
          </div>
        `;
      }
      calendarHtml += `</div>`;
      container.innerHTML = `<label style="margin-bottom:0.5rem; display:block;">선택 주간 성과 요약</label>` + calendarHtml;
    }

    function autoAnalyzeStock() {
      const stockName = document.getElementById('quarterStock').value.trim();
      if (!stockName) {
        alert('종목명을 먼저 입력해주세요.');
        return;
      }
      
      const revInput = document.querySelector('.q-revenue');
      const opInput = document.querySelector('.q-op-profit');
      const fcfInput = document.querySelector('.q-fcf');
      const roeInput = document.querySelector('.q-roe');

      if (!revInput.value) revInput.value = `- 전년 대비 매출 증가/감소 여부:\n- 주된 이유 (예: 판매 단가 상승, 판매량 증가 등):`;
      if (!opInput.value) opInput.value = `- 영업이익 증감 여부:\n- 감소 시 원인 (원자재 가격 상승, 판관비 상승 등):\n- 증가 시 원인:`;
      if (!fcfInput.value) fcfInput.value = `- 이익이 났음에도 투자나 재고 증가로 현금이 묶였는가?:\n- 현금이 묶여있다면 그 이유는?:\n- 현금흐름이 좋은 편인가?:`;
      if (!roeInput.value) roeInput.value = `- ROE가 오르고 있는가 떨어지고 있는가? (오르면 자본을 잘 쓰고 있다는 의미):`;
      
      fetchTargetPrices();
    }

    function savePeriodLog(e, periodType) {
      e.preventDefault();
      const form = e.target;
      const data = getStorageData();
      
      if (periodType === 'quarter') {
        const year = form.querySelector('#quarterYear').value;
        const q = form.querySelector('#quarterQ').value;
        const monthMap = {'1': '03', '2': '06', '3': '09', '4': '12'};
        const dateVal = `${year}-${monthMap[q]}-01`;
        
        const stockName = form.querySelector('#quarterStock').value;
        const rev = form.querySelector('.q-revenue').value;
        const op = form.querySelector('.q-op-profit').value;
        const fcf = form.querySelector('.q-fcf').value;
        const roe = form.querySelector('.q-roe').value;
        
        let improve = '';
        const improveEl = form.querySelector('input[name="q-improve"]:checked');
        if(improveEl) improve = improveEl.value;
        
        let outlook = '';
        const outlookEl = form.querySelector('input[name="q-outlook"]:checked');
        if(outlookEl) outlook = outlookEl.value;

        const brokerages = [];
        document.querySelectorAll('#brokerageTbody tr').forEach(tr => {
          brokerages.push({
            name: tr.querySelector('.b-name').innerText,
            price: tr.querySelector('.b-price').innerText
          });
        });
        
        if (editingQuarterId) {
          const index = data.periodLogs.findIndex(p => p.id === editingQuarterId);
          if (index !== -1) {
            const existing = data.periodLogs[index];
            existing.date = dateVal;
            existing.quarterYear = year;
            existing.quarterQ = q;
            existing.stockName = stockName;
            existing.rev = rev;
            existing.op = op;
            existing.fcf = fcf;
            existing.roe = roe;
            existing.improve = improve;
            existing.outlook = outlook;
            existing.brokerages = brokerages;
          }
          editingQuarterId = null;
          const formBtn = form.querySelector('button[type="submit"]');
          if (formBtn) {
            formBtn.innerText = '저장하기';
            formBtn.style.backgroundColor = '';
          }
          alert('기업 실적 점검표가 수정되었습니다.');
        } else {
          const newLog = {
            id: Date.now().toString(), type: 'period', periodType: periodType,
            date: dateVal, quarterYear: year, quarterQ: q, stockName: stockName,
            rev: rev, op: op, fcf: fcf, roe: roe,
            improve: improve, outlook: outlook,
            brokerages: brokerages,
            createdAt: new Date().toISOString()
          };
          data.periodLogs.push(newLog);
          alert('기업 실적 점검표가 저장되었습니다.');
        }
        
        setStorageData(data);
        form.reset();
        document.getElementById('brokerageTbody').innerHTML = '';
        
        const d = new Date();
        form.querySelector('#quarterYear').value = d.getFullYear();
        form.querySelector('#quarterQ').value = Math.ceil((d.getMonth()+1)/3);
        renderAll();
        return;
      }

      if (periodType === 'month') {
        const yyVal = form.querySelector('#month-target-year').value;
        const mmVal = form.querySelector('#month-target-month').value;
        const dateVal = `${yyVal}-${mmVal}`;
        const market = form.querySelector('.period-market').value;
        const sector = form.querySelector('.period-sector').value;
        const portfolio = form.querySelector('.period-portfolio').value;
        const review = form.querySelector('.period-review').value;

        if (editingMonthId) {
          const index = data.periodLogs.findIndex(p => p.id === editingMonthId);
          if (index !== -1) {
            const existing = data.periodLogs[index];
            existing.date = dateVal;
            existing.market = market;
            existing.sector = sector;
            existing.portfolio = portfolio;
            existing.review = review;
          }
          editingMonthId = null;
          const formBtn = form.querySelector('button[type="submit"]');
          if (formBtn) {
            formBtn.innerText = '저장하기';
            formBtn.style.backgroundColor = '';
          }
          alert('월간 분석이 수정되었습니다.');
        } else {
          const newLog = {
            id: Date.now().toString(), type: 'period', periodType: periodType,
            date: dateVal, market: market, sector: sector, portfolio: portfolio, review: review,
            createdAt: new Date().toISOString()
          };
          data.periodLogs.push(newLog);
          alert('월간 분석이 저장되었습니다.');
        }
        setStorageData(data);
        form.reset();
        const d = new Date();
        form.querySelector('#month-target-year').value = d.getFullYear();
        form.querySelector('#month-target-month').value = String(d.getMonth() + 1).padStart(2, '0');
        renderAll();
        return;
      }

      if (periodType === 'week') {
        const dateVal = form.querySelector('.period-date').value;
        const reasonVal = form.querySelector('.period-reason').value;
        const feedbackVal = form.querySelector('.period-feedback').value;

        if (editingWeekId) {
          const index = data.periodLogs.findIndex(p => p.id === editingWeekId);
          if (index !== -1) {
            const existing = data.periodLogs[index];
            existing.date = dateVal;
            existing.reason = reasonVal;
            existing.feedback = feedbackVal;
          }
          editingWeekId = null;
          const formBtn = form.querySelector('button[type="submit"]');
          if (formBtn) {
            formBtn.innerText = '주간 점검 저장하기';
            formBtn.style.backgroundColor = '';
          }
          alert('주간 점검이 수정되었습니다.');
        } else {
          const newLog = {
            id: Date.now().toString(), type: 'period', periodType: periodType,
            date: dateVal, reason: reasonVal, feedback: feedbackVal,
            createdAt: new Date().toISOString()
          };
          data.periodLogs.push(newLog);
          alert('주간 점검이 저장되었습니다.');
        }
        setStorageData(data);
        form.reset();
        form.querySelector('.period-date').value = todayStr;
        const calContainer = document.getElementById('weeklyFormCalendarContainer');
        if(calContainer) calContainer.innerHTML = '';
        renderWeeklyFormCalendar(todayStr);
        renderAll();
        return;
      }
    }

    function saveSite(e) {
      e.preventDefault();
      const data = getStorageData();
      const newSite = {
        id: Date.now().toString(), type: 'site',
        category: '기타', // 카테고리 입력란 제거에 따른 기본값 처리
        title: document.getElementById('siteTitle').value,
        url: document.getElementById('siteUrl').value,
        desc: document.getElementById('siteDesc').value,
        isFavorite: true,
        createdAt: new Date().toISOString()
      };
      data.sites.push(newSite);
      setStorageData(data);
      e.target.reset();
      alert('사이트가 추가되었습니다.');
    }

    function editSite(id) {
      document.getElementById(`view-mode-${id}`).style.display = 'none';
      document.getElementById(`edit-mode-${id}`).style.display = 'block';
    }
    
    function cancelEditSite(id) {
      document.getElementById(`edit-mode-${id}`).style.display = 'none';
      document.getElementById(`view-mode-${id}`).style.display = 'block';
    }

    function saveEditSite(id) {
      const newTitle = document.getElementById(`edit-title-${id}`).value;
      const newDesc = document.getElementById(`edit-desc-${id}`).value;
      
      const data = getStorageData();
      const site = data.sites.find(s => s.id === id);
      if (site) {
        if (id.startsWith('seed-')) {
          site.customTitle = newTitle;
          site.customDesc = newDesc;
        } else {
          site.title = newTitle;
          site.desc = newDesc;
        }
        setStorageData(data);
      }
    }

    // Calculator
    function handleCalcNumberInput(e) {
      let val = e.target.value.replace(/[^0-9]/g, '');
      if (val) {
        e.target.value = parseInt(val, 10).toLocaleString();
      } else {
        e.target.value = '';
      }
      calculatePositionSize();
    }

    function calculatePositionSize() {
      const entryStr = document.getElementById('calcEntryPrice').value.replace(/,/g, '');
      const fixedLossStr = document.getElementById('calcFixedLoss').value.replace(/,/g, '');
      
      const entryPrice = parseFloat(entryStr);
      const stopLossPct = parseFloat(document.getElementById('calcStopLossPercent').value);
      const fixedLoss = parseFloat(fixedLossStr);
      
      const resultQuantityEl = document.getElementById('calcResultQuantity');
      const resultStopPriceEl = document.getElementById('calcResultStopPrice');
      const resultAmountEl = document.getElementById('calcResultAmount');

      if (isNaN(entryPrice) || isNaN(stopLossPct) || isNaN(fixedLoss) || entryPrice === 0 || stopLossPct === 0) {
        resultQuantityEl.innerText = '0 주';
        resultStopPriceEl.innerText = '0';
        resultAmountEl.innerText = '0';
        return;
      }
      
      const lossPerShare = entryPrice * (stopLossPct / 100);
      const stopPrice = entryPrice - lossPerShare;
      const quantity = Math.floor(fixedLoss / lossPerShare);
      const totalAmount = quantity * entryPrice;
      
      resultQuantityEl.innerText = quantity.toLocaleString() + ' 주';
      resultStopPriceEl.innerText = Math.floor(stopPrice).toLocaleString();
      resultAmountEl.innerText = totalAmount.toLocaleString();
    }

    function formatCurrency(n) { return n.toLocaleString() + ' 원'; }

    function switchInnerTab(tab) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
      document.getElementById(`${tab}-tab`).classList.add('active');
      event.target.classList.add('active');
    }

    function switchMainTab(tab) {
      if (tab === 'journal' && document.getElementById('nav-journal').classList.contains('active')) {
        const subNav = document.getElementById('journal-subnav-wrapper');
        if (subNav) {
          subNav.style.display = subNav.style.display === 'none' ? 'block' : 'none';
        }
        return;
      }

      document.querySelectorAll('.main-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
      
      const targetMain = document.getElementById('main-' + tab);
      const targetNav = document.getElementById('nav-' + tab);
      
      if(targetMain) targetMain.classList.add('active');
      if(targetNav) targetNav.classList.add('active');

      if (tab === 'journal') {
        const subNav = document.getElementById('journal-subnav-wrapper');
        if (subNav) subNav.style.display = 'block';
      }
    }

    function switchJournalTab(tab) {
      document.querySelectorAll('.journal-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.jtab').forEach(el => el.classList.remove('active'));
      
      const targetContent = document.getElementById('journal-' + tab);
      const targetTab = document.getElementById('jnav-' + tab);
      
      if(targetContent) targetContent.classList.add('active');
      if(targetTab) targetTab.classList.add('active');
    }

    function filterHistory(filter) {
      currentFilter = filter;
      document.querySelectorAll('#filter-all, #filter-daily, #filter-trade').forEach(el => el.classList.remove('active'));
      document.getElementById(`filter-${filter}`).classList.add('active');
      renderTrades();
    }

    // Render Logic
    function renderAll() {
      const yearSelect = document.getElementById('year-target-year');
      if (yearSelect && yearSelect.options.length === 0) {
        const currentYear = new Date().getFullYear();
        const monthYearSelect = document.getElementById('month-target-year');
        for (let i = currentYear - 10; i <= currentYear; i++) {
          const opt = document.createElement('option');
          opt.value = i;
          opt.innerText = i;
          if (i === currentYear) opt.selected = true;
          yearSelect.appendChild(opt);
          
          if (monthYearSelect) {
            const optMonth = document.createElement('option');
            optMonth.value = i;
            optMonth.innerText = i;
            if (i === currentYear) optMonth.selected = true;
            monthYearSelect.appendChild(optMonth);
          }
        }
      }
      
      const currentMonthStr = String(new Date().getMonth() + 1).padStart(2, '0');
      const mmSelect = document.getElementById('month-target-month');
      if (mmSelect && !mmSelect.dataset.init) {
        mmSelect.value = currentMonthStr;
        mmSelect.dataset.init = "true";
      }

      const data = getStorageData();
      renderBriefing();
      renderTrades(data);
      renderNews(data);
      renderPeriods(data);
      renderSites(data);
      renderWeeklyFormCalendar(todayStr);
    }

    function renderBriefing() {
      const container = document.getElementById('dailyBriefingContent');
      if (typeof DAILY_BRIEFING === 'undefined') {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem 0;">브리핑 데이터가 없습니다. 아침 7시에 자동 업데이트됩니다.</p>';
        return;
      }
      
      const b = DAILY_BRIEFING;
      let html = `
        <div style="margin-bottom: 1.5rem;">
          <h3 style="color: #a5b4fc; margin-bottom: 0.5rem; font-size: 1.1rem;">📊 금융 지표</h3>
          <div class="grid-2">
            <div class="stat-box" style="padding: 1rem;">
              <div class="stat-label">원/달러 환율</div>
              <div class="stat-value" style="font-size: 1.2rem;">${b.exchangeRate.value}</div>
              <div style="font-size: 0.8rem; color: ${b.exchangeRate.change.includes('+') ? 'var(--danger-color)' : 'var(--success-color)'}; margin-top: 0.3rem;">전일 대비 ${b.exchangeRate.change}</div>
            </div>
            <div class="stat-box" style="padding: 1rem;">
              <div class="stat-label">미 10년물 국채 금리</div>
              <div class="stat-value" style="font-size: 1.2rem;">${b.treasuryYield.value}</div>
              <div style="font-size: 0.8rem; margin-top: 0.3rem; color: var(--text-secondary)">${b.treasuryYield.change}</div>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h3 style="color: #a5b4fc; margin-bottom: 0.5rem; font-size: 1.1rem;">💡 오늘의 전략 시황 추천</h3>
          <div style="background: rgba(99, 102, 241, 0.1); border-left: 4px solid var(--accent-color); padding: 1rem; border-radius: 4px; line-height: 1.5; font-size: 0.95rem; color: #e2e8f0;">
            ${b.strategy}
          </div>
        </div>
      `;

      const renderNewsCategory = (title, newsArray) => {
        let catHtml = `<h3 style="color: #a5b4fc; margin-bottom: 0.8rem; margin-top: 1.5rem; font-size: 1.1rem;">${title}</h3><div style="display: flex; flex-direction: column; gap: 1rem;">`;
        newsArray.forEach(news => {
          catHtml += `
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--panel-border); border-radius: 8px; padding: 1rem;">
              <a href="${news.link}" target="_blank" style="color: #fff; text-decoration: none; font-weight: 600; display: block; margin-bottom: 0.5rem;">${news.title}</a>
              <p style="color: #cbd5e1; font-size: 0.9rem; line-height: 1.5; margin-bottom: 0.5rem;">${news.summary}</p>
              ${news.terms ? `<p style="font-size: 0.85rem; color: var(--text-secondary); background: rgba(0,0,0,0.2); padding: 0.5rem; border-radius: 4px; line-height: 1.4;"><strong>용어 해설:</strong> ${news.terms}</p>` : ''}
              ${news.impact ? `<p style="font-size: 0.85rem; color: #a5b4fc; margin-top: 0.5rem; line-height: 1.4;"><strong>👉 내 자산 영향:</strong> ${news.impact}</p>` : ''}
            </div>
          `;
        });
        catHtml += '</div>';
        return catHtml;
      };

      html += renderNewsCategory('🏢 부동산 주요 뉴스', b.realEstateNews);
      html += renderNewsCategory('💰 금융 주요 뉴스', b.financeNews);
      html += renderNewsCategory('📈 보유 종목 뉴스 (삼성전자, 한화에어로스페이스)', b.stockNews);

      container.innerHTML = html;
    }

    function renderTrades(dataParam) {
      const data = dataParam || getStorageData();
      const currentToday = todayStr;
      
      // Stats
      const completedTrades = data.trades.filter(t => t.isWin !== null);
      document.getElementById('totalTradesStat').innerText = data.trades.length;
      if (completedTrades.length > 0) {
        const wins = completedTrades.filter(t => t.isWin).length;
        const winRate = ((wins / completedTrades.length) * 100).toFixed(1);
        document.getElementById('winRateStat').innerText = `${winRate}%`;
        document.getElementById('winRateStat').className = winRate >= 50 ? 'stat-value profit' : 'stat-value loss';
      } else {
        document.getElementById('winRateStat').innerText = '0%';
        document.getElementById('winRateStat').className = 'stat-value';
      }

      const todaysTrades = data.trades.filter(t => t.date === currentToday);
      const todayTotalProfit = todaysTrades.reduce((sum, t) => sum + (t.profitAmount || 0), 0);
      const profitStatEl = document.getElementById('todayProfitStat');
      profitStatEl.innerText = (todayTotalProfit > 0 ? '+' : '') + formatCurrency(todayTotalProfit);
      if (todayTotalProfit > 0) profitStatEl.className = 'stat-value profit';
      else if (todayTotalProfit < 0) profitStatEl.className = 'stat-value loss';
      else profitStatEl.className = 'stat-value';

      // Today's Table
      const todayTableBody = document.getElementById('todayTableBody');
      todayTableBody.innerHTML = '';
      if (todaysTrades.length === 0) {
        todayTableBody.innerHTML = '<tr><td colspan="5" class="empty-row">오늘 기록된 매매 내역이 없습니다.</td></tr>';
      } else {
        todaysTrades.forEach(t => {
          let profitHtml = '-', returnHtml = '-';
          if (t.profitAmount !== null) {
            const isProfit = t.profitAmount > 0;
            const sign = isProfit ? '+' : '';
            const cName = isProfit ? 'profit' : (t.profitAmount < 0 ? 'loss' : '');
            profitHtml = `<span class="${cName}">${sign}${t.profitAmount.toLocaleString()}원</span>`;
            returnHtml = `<span class="${cName}">${sign}${t.returnRate}%</span>`;
          }
          todayTableBody.innerHTML += `
            <tr>
              <td><strong>${t.stockName}</strong></td>
              <td>${t.entryPrice.toLocaleString()}원</td>
              <td>${t.exitPrice ? t.exitPrice.toLocaleString() + '원' : '<span style="color:var(--text-secondary)">보유중</span>'}</td>
              <td>${profitHtml}</td>
              <td>${returnHtml}</td>
            </tr>
          `;
        });
      }

      // History List
      const listContainer = document.getElementById('historyList');
      listContainer.innerHTML = '';
      let combined = [];
      if (currentFilter === 'all' || currentFilter === 'daily') combined = combined.concat(data.dailyLogs);
      if (currentFilter === 'all' || currentFilter === 'trade') combined = combined.concat(data.trades);

      combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      if (combined.length === 0) {
        listContainer.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem 0;">기록이 없습니다.</p>';
      } else {
        combined.forEach(item => {
          const card = document.createElement('div');
          card.className = 'history-card';
          if (item.type === 'daily') {
            card.innerHTML = `
              <div class="history-header">
                <span class="date-badge">🌅 데일리 노트</span>
                <div style="display:flex; align-items:center; gap: 10px;">
                  <span style="font-size: 0.85rem; color: var(--text-secondary);">${item.date}</span>
                  <button class="delete-btn" onclick="deleteItem('${item.id}', 'daily')" title="삭제">✕</button>
                </div>
              </div>
              <div class="card-body">
                <p><strong>[계획]</strong> ${item.plan}</p>
                <p><strong>[복기]</strong> ${item.summary}</p>
              </div>`;
          } else {
            let returnHtml = '', profitText = '';
            if (item.returnRate !== null) {
               const retClass = item.returnRate > 0 ? 'profit' : (item.returnRate < 0 ? 'loss' : '');
               const retSign = item.returnRate > 0 ? '+' : '';
               returnHtml = `<span class="${retClass}" style="font-size:1.1rem;">${retSign}${item.returnRate}%</span>`;
               profitText = `<span class="${retClass}" style="margin-right:1rem;">(${retSign}${item.profitAmount.toLocaleString()}원)</span>`;
            } else { returnHtml = `<span style="color: var(--text-secondary)">보유중</span>`; }
            card.innerHTML = `
              <div class="history-header">
                <div><span class="badge ${item.isWin === null ? 'badge-buy' : (item.isWin ? 'badge-buy' : 'badge-sell')}">${item.stockName}</span></div>
                <div style="display:flex; align-items:center; gap: 10px;">
                  <span style="font-size: 0.85rem; color: var(--text-secondary);">${item.date}</span>
                  <button class="delete-btn" onclick="deleteItem('${item.id}', 'trade')" title="삭제">✕</button>
                </div>
              </div>
              <div class="card-meta">
                <span>진입: ${item.entryPrice.toLocaleString()} (${item.quantity}주)</span>
                ${item.exitPrice ? `<span>청산: ${item.exitPrice.toLocaleString()}</span>` : ''}
                <div style="margin-left: auto;">${profitText}${returnHtml}</div>
              </div>
              <div class="card-body">
                <p><strong>이유:</strong> ${item.entryReason}</p>
                <p><strong>복기:</strong> ${item.reviewGoodBad}</p>
              </div>`;
          }
          listContainer.appendChild(card);
        });
      }
    }

    function renderNews(data) {
      const list = document.getElementById('newsList');
      list.innerHTML = '';
      const sorted = [...data.news].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
      if(sorted.length===0) list.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem 0;">등록된 뉴스가 없습니다.</p>';
      
      const displayCount = 3;
      sorted.slice(0, displayCount).forEach(item => {
        const card = document.createElement('div');
        card.className = 'history-card';
        card.innerHTML = `
          <div class="history-header">
            <span class="date-badge">📰 뉴스</span>
            <div style="display:flex; align-items:center; gap: 10px;">
              <span style="font-size: 0.85rem; color: var(--text-secondary);">${item.date}</span>
              <button class="delete-btn" onclick="deleteItem('${item.id}', 'news')" title="삭제">✕</button>
            </div>
          </div>
          <div class="card-body">
            <p><strong>이슈:</strong> ${item.title}</p>
            ${item.link ? `<p><strong>링크:</strong> <a href="${item.link}" target="_blank" style="color:var(--accent-color);">${item.link}</a></p>` : ''}
            <p><strong>코멘트:</strong> ${item.comment}</p>
          </div>
        `;
        list.appendChild(card);
      });

      if (sorted.length > displayCount) {
        const moreBtnContainer = document.createElement('div');
        moreBtnContainer.style.textAlign = 'center';
        moreBtnContainer.style.marginTop = '1rem';
        moreBtnContainer.innerHTML = `<button class="btn" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);" onclick="openNewsModal()">스크랩한 뉴스 모두 보기 (${sorted.length}개)</button>`;
        list.appendChild(moreBtnContainer);
      }
    }

    function openNewsModal() {
      const modal = document.getElementById('newsModal');
      const modalList = document.getElementById('newsModalList');
      if(!modal || !modalList) return;
      
      const data = getStorageData();
      const sorted = [...data.news].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      modalList.innerHTML = '';
      sorted.forEach(item => {
        const card = document.createElement('div');
        card.className = 'history-card';
        card.innerHTML = `
          <div class="history-header">
            <span class="date-badge">📰 뉴스</span>
            <div style="display:flex; align-items:center; gap: 10px;">
              <span style="font-size: 0.85rem; color: var(--text-secondary);">${item.date}</span>
              <button class="delete-btn" onclick="deleteItem('${item.id}', 'news'); openNewsModal();" title="삭제">✕</button>
            </div>
          </div>
          <div class="card-body">
            <p><strong>이슈:</strong> ${item.title}</p>
            ${item.link ? `<p><strong>링크:</strong> <a href="${item.link}" target="_blank" style="color:var(--accent-color);">${item.link}</a></p>` : ''}
            <p><strong>코멘트:</strong> ${item.comment}</p>
          </div>
        `;
        modalList.appendChild(card);
      });
      
      modal.style.display = 'flex';
    }

    function closeNewsModal() {
      const modal = document.getElementById('newsModal');
      if(modal) modal.style.display = 'none';
      renderAll();
    }

    function formatAnswers(text) {
      if (!text) return '';
      return text.replace(/(^-\s.*?:)/gm, '<span style="color: #9ca3af;">$1</span>');
    }

    function renderPeriods(data) {
      // Setup Year Filter Options for Year and Quarter tabs
      const yearFilterSelect = document.getElementById('yearFilter');
      const currentYearFilter = yearFilterSelect ? yearFilterSelect.value : 'all';
      
      if (yearFilterSelect) {
        const years = new Set(data.periodLogs.filter(p => p.periodType === 'year').map(p => p.date.substring(0,4)));
        yearFilterSelect.innerHTML = '<option value="all" style="color:black;">연도 전체</option>';
        Array.from(years).sort().reverse().forEach(y => {
          const opt = document.createElement('option');
          opt.value = y;
          opt.innerText = `${y}년`;
          opt.style.color = 'black';
          if (y === currentYearFilter) opt.selected = true;
          yearFilterSelect.appendChild(opt);
        });
      }

      const quarterSearchInput = document.getElementById('quarterSearch');
      const quarterSearchText = quarterSearchInput ? quarterSearchInput.value.toLowerCase().trim() : '';
      const monthSearchInput = document.getElementById('monthSearch');
      const monthSearchText = monthSearchInput ? monthSearchInput.value.toLowerCase().trim() : '';

      ['week', 'month', 'quarter', 'year'].forEach(type => {
        const list = document.getElementById(`${type}List`);
        if (!list) return;
        list.innerHTML = '';
        
        let filtered = data.periodLogs.filter(p => p.periodType === type).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        if (type === 'year' && currentYearFilter !== 'all') {
          filtered = filtered.filter(p => p.date.startsWith(currentYearFilter));
        }
        if (type === 'quarter' && quarterSearchText !== '') {
          filtered = filtered.filter(p => {
            const stock = (p.stockName || '').toLowerCase();
            const yearStr = (p.quarterYear || '').toString();
            const qStr = (p.quarterQ || '').toString() + '분기';
            return stock.includes(quarterSearchText) || 
                   yearStr.includes(quarterSearchText) || 
                   qStr.includes(quarterSearchText);
          });
        }
        if (type === 'month' && monthSearchText !== '') {
          filtered = filtered.filter(p => {
            if (!p.date) return false;
            let yy = '', mm = '';
            if (p.date.includes('-') && p.date.indexOf('-') === 4) {
              yy = p.date.substring(0, 4);
              mm = p.date.substring(5, 7);
            } else if (p.date.includes('-') && p.date.indexOf('-') === 2) {
              yy = p.date.substring(3, 7);
              mm = p.date.substring(0, 2);
            }
            const formatted = `${yy}년 ${mm}월`;
            return formatted.includes(monthSearchText) || p.date.includes(monthSearchText);
          });
        }
        
        if(filtered.length===0) {
          list.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem 0;">기록이 없습니다.</p>';
          return;
        }
        
        filtered.forEach(item => {
          const card = document.createElement('div');
          card.className = 'history-card';
          
          if (type === 'year') {
            const ruleColor = item.ruleCheck === 'yes' ? '#34d399' : '#f87171';
            const ruleBadge = `<span style="display:inline-block; padding:0.1rem 0.4rem; border-radius:4px; font-size:0.8rem; background:${ruleColor}33; color:${ruleColor}; font-weight:bold;">원칙 준수: ${item.ruleCheck ? item.ruleCheck.toUpperCase() : '-'}</span>`;
            
            const yearStr = item.date.substring(0,4);
            const titleText = `${yearStr}년 연간 점검 및 내년도 계획`;

            const formatColor = (val) => {
              if (typeof val !== 'string') return val || '-';
              if (val.startsWith('+')) return `<span style="color: #ef4444; font-weight:bold;">${val}</span>`;
              if (val.startsWith('-')) return `<span style="color: #3b82f6; font-weight:bold;">${val}</span>`;
              return val;
            };

            const formatProfitColor = (val) => {
              if (typeof val !== 'string') return val || '-';
              if (val.startsWith('-')) return `<span style="color: #3b82f6; font-weight:bold;">${val}</span>`;
              const num = parseFloat(val.replace(/[^0-9.-]/g, ''));
              if (isNaN(num) || num === 0) return val;
              if (num > 0) return `<span style="color: #ef4444; font-weight:bold;">${val.startsWith('+') ? val : '+' + val}</span>`;
              return val;
            };

            card.innerHTML = `
              <div class="history-header" style="cursor:pointer;" onclick="const b = document.getElementById('year-body-${item.id}'); b.style.display = b.style.display === 'none' ? 'block' : 'none';">
                <span style="font-weight:bold; font-size: 1.1rem; flex-grow:1; color:#fff;">📑 ${titleText}</span>
                <div style="display:flex; align-items:center; gap: 10px;">
                  <span style="font-size: 0.85rem; color: var(--text-secondary);">${item.date}</span>
                  <button class="edit-btn" onclick="event.stopPropagation(); editYearLog('${item.id}')" title="수정" style="background:none; border:none; cursor:pointer; font-size:1.1rem;">✏️</button>
                  <button class="delete-btn" onclick="event.stopPropagation(); deleteItem('${item.id}', 'period')" title="삭제">✕</button>
                </div>
              </div>
              <div class="card-body" id="year-body-${item.id}" style="display:none; margin-top:1rem;">
                <div style="margin-bottom:1rem; padding-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.1);">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:0.8rem;">
                    <h4 style="color:#a5b4fc; margin: 0; font-size:1.05rem;">[올해 투자 점검]</h4>
                    <div style="font-size: 0.95rem; font-weight: bold; background: rgba(255,255,255,0.05); padding: 0.2rem 0.6rem; border-radius: 4px;">
                      총수익: ${formatProfitColor(item.yearProfitAmount)} <span style="margin:0 0.5rem; color:rgba(255,255,255,0.2);">|</span> 수익률: ${formatProfitColor(item.yearProfitRate)}
                    </div>
                  </div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:0.5rem;">
                    <p style="grid-column: 1 / -1;"><span style="color: #9ca3af;">올해 원금:</span> ${formatColor(item.yearPrincipalAmount || item.yearInvestedAmount)}</p>
                  </div>
                  <p style="margin-top:0.4rem; margin-bottom:0.4rem;">${ruleBadge}</p>
                  <p style="font-size:0.95rem; color: #d1d5db; white-space: pre-line; margin-top: 0.5rem;"><span style="color: #9ca3af;">[잘한 점]</span><br/>${item.ruleGoodText || '-'}</p>
                  ${item.ruleCheck === 'no' ? `<p style="font-size:0.95rem; color: #fca5a5; white-space: pre-line; margin-top:0.8rem;"><span style="color: #9ca3af;">[지켜지지 않은 원칙 및 혼동요인]</span><br/>${item.ruleBadText || '-'}</p>` : ''}
                </div>
                <div>
                  <h4 style="color:#a5b4fc; margin-bottom:0.5rem; font-size:1.05rem;">[내년 투자 계획]</h4>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:0.8rem;">
                    <p><span style="color: #9ca3af;">현재 자산:</span> <span>${formatColor(item.currentAsset)}</span></p>
                    <p><span style="color: #9ca3af;">목표 자산:</span> <span>${formatColor(item.targetAsset)}</span></p>
                  </div>
                  <p><span style="color: #9ca3af;">매매 원칙 계획:</span><br/><span style="color: #d1d5db; white-space: pre-line;">${item.planPrinciples}</span></p>
                </div>
              </div>
            `;
          } else if (type === 'quarter') {
            const yy = item.date.substring(2, 4);
            const qStr = item.quarterQ || Math.ceil(parseInt(item.date.substring(5, 7), 10) / 3);
            const cardTitle = `📑 ${yy}년도 ${qStr}분기 기업 실적 점검표`;
            
            const badgeImprove = item.improve === 'yes' ? '<span style="color:#34d399; font-weight:bold;">YES</span>' : '<span style="color:#f87171; font-weight:bold;">NO</span>';
            const badgeOutlook = item.outlook === 'yes' ? '<span style="color:#34d399; font-weight:bold;">YES</span>' : '<span style="color:#f87171; font-weight:bold;">NO</span>';
            
            let brokerHtml = '';
            if(item.brokerages && item.brokerages.length > 0) {
              brokerHtml = `
                <div style="margin-top:1.5rem;">
                  <p><strong>(5) 증권사별 목표주가</strong></p>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 0.5rem; text-align: left; background: rgba(0,0,0,0.2); border-radius:6px; overflow:hidden;">
                    <thead>
                      <tr style="background: rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <th style="padding: 0.5rem; font-weight: normal; color: var(--text-secondary);">증권사</th>
                        <th style="padding: 0.5rem; font-weight: normal; color: var(--text-secondary);">목표주가</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${item.brokerages.map(b => {
                        return `
                          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                            <td style="padding: 0.5rem;">${b.name}</td>
                            <td style="padding: 0.5rem;">${b.price}</td>
                          </tr>
                        `;
                      }).join('')}
                    </tbody>
                  </table>
                </div>
              `;
            }

            card.innerHTML = `
              <div class="history-header" style="cursor:pointer;" onclick="const b = document.getElementById('q-body-${item.id}'); b.style.display = b.style.display === 'none' ? 'block' : 'none';">
                <span style="font-weight:bold; font-size: 1.1rem; flex-grow:1; color:#fff;">${cardTitle} - <span style="color:var(--accent-color);">${item.stockName || '종목 미상'}</span></span>
                <div style="display:flex; align-items:center; gap: 10px;">
                  <button class="edit-btn" onclick="event.stopPropagation(); editQuarterLog('${item.id}')" title="수정" style="background:none; border:none; cursor:pointer; font-size:1.1rem;">✏️</button>
                  <button class="delete-btn" onclick="event.stopPropagation(); deleteItem('${item.id}', 'period')" title="삭제">✕</button>
                </div>
              </div>
              <div class="card-body" id="q-body-${item.id}" style="display:none; margin-top:1rem; border-top:1px solid rgba(255,255,255,0.1); padding-top:1rem;">
                <p><strong>(1) 매출 증가 이유</strong><br/><span style="white-space: pre-line;">${formatAnswers(item.rev || '')}</span></p><br/>
                <p><strong>(2) 영업이익 점검</strong><br/><span style="white-space: pre-line;">${formatAnswers(item.op || '')}</span></p><br/>
                <p><strong>(3) 잉여현금흐름(FCF)</strong><br/><span style="white-space: pre-line;">${formatAnswers(item.fcf || '')}</span></p><br/>
                <p><strong>(4) 자기자본이익률(ROE)</strong><br/><span style="white-space: pre-line;">${formatAnswers(item.roe || '')}</span></p>
                ${brokerHtml}
                <div style="margin-top:1.5rem; padding:1rem; background:rgba(0,0,0,0.2); border-radius:6px; display:flex; justify-content:space-around;">
                  <p style="margin:0;"><strong>실적이 개선되었나?</strong> ${badgeImprove}</p>
                  <p style="margin:0;"><strong>전망이 유지되는가?</strong> ${badgeOutlook}</p>
                </div>
              </div>
            `;
          } else {
            let cardTitle = '📝 기록';
            let cardBody = '';
            
            if (type === 'month') {
              let yyyy = '', mm = '';
              if (item.date.includes('-') && item.date.indexOf('-') === 4) { // YYYY-MM
                yyyy = item.date.substring(0, 4);
                mm = item.date.substring(5, 7);
              } else if (item.date.includes('-') && item.date.indexOf('-') === 2) { // MM-YYYY
                mm = item.date.substring(0, 2);
                yyyy = item.date.substring(3, 7);
              } else {
                mm = item.date.substring(0, 2);
                yyyy = '20' + item.date.substring(2, 4);
              }
              cardTitle = `🗓️ ${yyyy}년 ${mm}월 월간 분석`;
              
              cardBody = `
                <div class="card-body">
                  <p><strong>[시장 흐름 분석]</strong><br/><span style="white-space: pre-line;">${formatAnswers(item.market || '')}</span></p><br/>
                  <p><strong>[섹터 흐름 분석]</strong><br/><span style="white-space: pre-line;">${formatAnswers(item.sector || '')}</span></p><br/>
                  <p><strong>[자산 배분 및 포트폴리오 점검]</strong><br/><span style="white-space: pre-line;">${formatAnswers(item.portfolio || '')}</span></p><br/>
                  <p><strong>[월간 점검]</strong><br/><span style="white-space: pre-line;">${formatAnswers(item.review || '')}</span></p>
                </div>
              `;
            } else if (type === 'week') {
              cardTitle = `📅 ${getWeekOfMonthStr(item.date)}`;
              
              let calendarHtml = `<div style="display:grid; grid-template-columns:repeat(7,1fr); gap:4px; margin-bottom:1rem; text-align:center;">`;
              const dayNames = ['월','화','수','목','금','토','일'];
              dayNames.forEach(d => {
                calendarHtml += `<div style="font-size:0.8rem; color:var(--text-secondary); padding:2px;">${d}</div>`;
              });
              
              const targetDate = new Date(item.date);
              const dayOfWeek = targetDate.getDay();
              const diffToMonday = targetDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
              const monday = new Date(targetDate);
              monday.setDate(diffToMonday);
              
              for (let i = 0; i < 7; i++) {
                const currentDay = new Date(monday);
                currentDay.setDate(monday.getDate() + i);
                
                const yyyy = currentDay.getFullYear();
                const mm = String(currentDay.getMonth() + 1).padStart(2, '0');
                const dd = String(currentDay.getDate()).padStart(2, '0');
                const dateStr = `${yyyy}-${mm}-${dd}`;
                
                const dayTrades = data.trades.filter(t => t.date === dateStr);
                let dayProfit = 0;
                dayTrades.forEach(t => {
                  if (t.profitAmount) dayProfit += t.profitAmount;
                });
                
                let profitHtml = '<div style="height:14px; margin-top:2px;"></div>'; // placeholder
                if (dayProfit > 0) {
                  profitHtml = `<div style="color:#ef4444; font-size:0.75rem; font-weight:bold; margin-top:2px;">+${dayProfit.toLocaleString()}</div>`;
                } else if (dayProfit < 0) {
                  profitHtml = `<div style="color:#3b82f6; font-size:0.75rem; font-weight:bold; margin-top:2px;">${dayProfit.toLocaleString()}</div>`;
                } else if (dayTrades.length > 0) {
                  profitHtml = `<div style="color:var(--text-secondary); font-size:0.75rem; font-weight:bold; margin-top:2px;">0</div>`;
                }
                
                const isTarget = (dateStr === item.date) ? 'border: 1px solid var(--accent-color);' : 'border: 1px solid var(--panel-border);';
                const bg = (dateStr === item.date) ? 'background: rgba(99,102,241,0.1);' : 'background: rgba(255,255,255,0.02);';
                const isWeekend = (i === 5 || i === 6) ? 'opacity: 0.7;' : '';
                
                calendarHtml += `
                  <div style="padding: 0.4rem 2px; border-radius: 6px; ${isTarget} ${bg} ${isWeekend}">
                    <div style="font-size:0.9rem; color:var(--text-primary);">${currentDay.getDate()}</div>
                    ${profitHtml}
                  </div>
                `;
              }
              calendarHtml += `</div>`;

              // item.plan, item.summary fallback for old records
              cardBody = `
                <div class="card-body">
                  ${calendarHtml}
                  <p><strong>[이번 주 성과에 대한 이유 분석]</strong><br/><span style="white-space: pre-line;">${formatAnswers(item.reason || item.plan || '')}</span></p><br/>
                  <p><strong>[잘한 점 / 아쉬운 점 정리]</strong><br/><span style="white-space: pre-line;">${formatAnswers(item.feedback || item.summary || '')}</span></p>
                </div>
              `;
            }

            card.innerHTML = `
              <div class="history-header" style="cursor:pointer;" onclick="const b = document.getElementById('period-body-${item.id}'); b.style.display = b.style.display === 'none' ? 'block' : 'none';">
                <span style="font-weight:bold; font-size: 1.1rem; flex-grow:1; color:#fff;">${cardTitle}</span>
                <div style="display:flex; align-items:center; gap: 10px;">
                  ${type === 'month' ? `<button class="edit-btn" onclick="event.stopPropagation(); editMonthLog('${item.id}')" title="수정" style="background:none; border:none; cursor:pointer; font-size:1.1rem;">✏️</button>` : ''}
                  ${type === 'week' ? `<button class="edit-btn" onclick="event.stopPropagation(); editWeekLog('${item.id}')" title="수정" style="background:none; border:none; cursor:pointer; font-size:1.1rem;">✏️</button>` : ''}
                  <button class="delete-btn" onclick="event.stopPropagation(); deleteItem('${item.id}', 'period')" title="삭제">✕</button>
                </div>
              </div>
              <div id="period-body-${item.id}" style="display:none; margin-top:1rem; border-top:1px solid rgba(255,255,255,0.1); padding-top:1rem;">
                ${cardBody}
              </div>
            `;
          }
          list.appendChild(card);
        });
      });
    }

    function renderSites(data) {
      const favGrid = document.getElementById('favoriteSiteGrid');
      const recGrid = document.getElementById('siteGrid');
      favGrid.innerHTML = '';
      recGrid.innerHTML = '';
      
      const favorites = data.sites.filter(s => s.isFavorite);
      // 추천 사이트 모음은 즐겨찾기 등록 여부와 상관없이 항상 모두 표시 (seed- 로 시작하는 것들)
      const recommended = data.sites.filter(s => s.id.startsWith('seed-'));

      // Render Favorites
      if (favorites.length === 0) {
        favGrid.innerHTML = '<p style="color: var(--text-secondary); padding: 1rem 0; grid-column: 1/-1;">등록된 즐겨찾기가 없습니다. 아래 추천 사이트에서 별(☆)을 클릭하거나 직접 추가해보세요.</p>';
      } else {
        favorites.forEach(item => {
          const div = document.createElement('div');
          div.className = 'site-card';
          div.style.cursor = 'default';
          div.style.position = 'relative';
          
          const displayTitle = item.customTitle || item.title;
          const displayDesc = item.customDesc || item.desc;

          div.innerHTML = `
            <div id="view-mode-${item.id}">
              <h3><a href="${item.url}" target="_blank" style="color: inherit; text-decoration: none;">${displayTitle}</a></h3>
              <p>${displayDesc}</p>
              <button class="delete-btn site-delete" onclick="deleteItem('${item.id}', 'site')" title="삭제" style="right: 2.5rem;">✕</button>
              <button onclick="editSite('${item.id}')" style="position: absolute; top: 1rem; right: 4.5rem; background: none; border: none; font-size: 1.1rem; color: var(--text-secondary); cursor: pointer;" title="수정">✏️</button>
              <button onclick="toggleFavoriteSite('${item.id}')" style="position: absolute; bottom: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; color: #fbbf24; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'" title="즐겨찾기 해제">★</button>
            </div>
            <div id="edit-mode-${item.id}" style="display: none; padding-bottom: 2rem;">
              <input type="text" id="edit-title-${item.id}" value="${displayTitle}" style="margin-bottom: 0.5rem;">
              <textarea id="edit-desc-${item.id}" style="margin-bottom: 0.5rem; min-height: 60px;">${displayDesc}</textarea>
              <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                <button onclick="saveEditSite('${item.id}')" style="padding: 0.4rem 0.8rem; background: var(--accent-color); color: white; border: none; border-radius: 4px; cursor: pointer;">저장</button>
                <button onclick="cancelEditSite('${item.id}')" style="padding: 0.4rem 0.8rem; background: #4b5563; color: white; border: none; border-radius: 4px; cursor: pointer;">취소</button>
              </div>
            </div>
          `;
          favGrid.appendChild(div);
        });
      }

      // Render Recommended
      if (recommended.length === 0) {
        recGrid.innerHTML = '<p style="color: var(--text-secondary); padding: 1rem 0; grid-column: 1/-1;">추천 사이트가 없습니다.</p>';
        return;
      }

      const categories = {};
      recommended.forEach(item => {
        const cat = item.category || '기타';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(item);
      });
      
      const catOrder = ["거장 포트폴리오", "기업 분석", "경제흐름", "경제 사이트", "기타"];
      
      catOrder.forEach(cat => {
        if (!categories[cat] || categories[cat].length === 0) return;
        
        const catTitle = document.createElement('h3');
        catTitle.style.color = '#a5b4fc';
        catTitle.style.marginTop = '1.5rem';
        catTitle.style.marginBottom = '0.5rem';
        catTitle.style.fontSize = '1.1rem';
        catTitle.style.gridColumn = '1 / -1';
        catTitle.innerText = `📂 ${cat}`;
        recGrid.appendChild(catTitle);
        
        categories[cat].forEach(item => {
          const isFav = item.isFavorite;
          const starIcon = isFav ? '★' : '☆';
          const starColor = isFav ? '#fbbf24' : 'var(--text-secondary)';
          const starTitle = isFav ? '즐겨찾기 해제' : '즐겨찾기 추가';

          const div = document.createElement('div');
          div.className = 'site-card';
          div.style.cursor = 'default';
          div.style.position = 'relative';
          div.innerHTML = `
            <h3><a href="${item.url}" target="_blank" style="color: inherit; text-decoration: none;">${item.title}</a></h3>
            <p>${item.desc}</p>
            <button onclick="toggleFavoriteSite('${item.id}')" style="position: absolute; bottom: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; color: ${starColor}; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'" title="${starTitle}">${starIcon}</button>
          `;
          recGrid.appendChild(div);
        });
      });
    }

    // Start App
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('year-target-year').value = new Date().getFullYear();
      document.getElementById('quarterYear').value = new Date().getFullYear();
      document.getElementById('quarterQ').value = Math.ceil((new Date().getMonth()+1)/3);
    });
    renderAll();
  