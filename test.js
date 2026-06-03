
    const todayStr = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(el => el.value = todayStr);

    let currentFilter = 'all';

    const DEFAULT_SITES = [
      { category: "ê±°ì¥ ?¬íŠ¸?´ë¦¬??, title: "WhaleWisdom", url: "https://whalewisdom.com", desc: "ë¯¸êµ­ ê±°ì¥?¤ì˜ ?¬íŠ¸?´ë¦¬??ì¶”ì " },
      { category: "ê±°ì¥ ?¬íŠ¸?´ë¦¬??, title: "Dataroma", url: "https://www.dataroma.com", desc: "ê°€ì¹˜íˆ¬?ì?¤ì˜ ë§¤ë§¤ ?´ì—­ ?•ì¸" },
      { category: "ê¸°ì—… ë¶„ì„", title: "Seeking Alpha", url: "https://seekingalpha.com", desc: "ê¸°ì—… ?¤ì  ë°?? ë„ë¦¬ìŠ¤??ë¶„ì„" },
      { category: "ê¸°ì—… ë¶„ì„", title: "Finviz", url: "https://finviz.com", desc: "ì£¼ì‹ ?¤í¬ë¦¬ë‹ ë°??œê°?? },
      { category: "ê²½ì œ?ë¦„", title: "Investing.com", url: "https://kr.investing.com", desc: "ê¸€ë¡œë²Œ ì§€??ë°?ê²½ì œ ì§€?? },
      { category: "ê²½ì œ?ë¦„", title: "Fed Watch", url: "https://www.cmegroup.com/markets/interest-rates/cme-fedwatch-tool.html", desc: "?°ì? ê¸ˆë¦¬ ê²°ì • ?•ë¥ " },
      { category: "ê²½ì œ ?¬ì´??, title: "?„êµ­?¬ì?êµ?¡í˜‘?˜íšŒ", url: "https://www.kcie.or.kr", desc: "?¬í…Œ??ê¸°ì´ˆê°•ì˜ ?˜ê°•" },
      { category: "ê²½ì œ ?¬ì´??, title: "?œêµ­?€??, url: "https://www.bok.or.kr", desc: "ê¸°ì´ˆ ê²½ì œ ?´ë¡ " },
      { category: "ê²½ì œ ?¬ì´??, title: "ê¸ˆìœµê°ë…??, url: "https://www.fss.or.kr", desc: "?ì• ì£¼ê¸°ë³?ê¸ˆìœµ ?¤ê³„" },
      { category: "ê²½ì œ ?¬ì´??, title: "?œêµ­ê°œë°œ?°êµ¬??, url: "https://www.kdi.re.kr", desc: "?œì‚¬ ê²½ì œ ë¶„ì„" },
      { category: "ê²½ì œ ?¬ì´??, title: "ì²?†Œ??ê¸ˆìœµêµìœ¡?‘ì˜??, url: "https://www.fq.or.kr", desc: "ì´ˆë³´ ?ˆë†’???ì‹" },
      { category: "ê²½ì œ ?¬ì´??, title: "?œë?ê¸ˆìœµì§„í¥??, url: "https://www.kinfa.or.kr", desc: "?¬íšŒì´ˆë…„??ê¸ˆìœµêµìœ¡" },
      { category: "ê²½ì œ ?¬ì´??, title: "? ìš©?Œë³µ?„ì›??, url: "https://www.ccrs.or.kr", desc: "ê±´ì „??? ìš© êµìœ¡" },
      { category: "ê²½ì œ ?¬ì´??, title: "ê²½ì œë°°ì?e", url: "https://www.econedu.go.kr", desc: "ê²½ì œ ?¹íˆ° ?´ì¦ˆ" },
      { category: "ê²½ì œ ?¬ì´??, title: "?œìš¸?œí‰?í•™?µí¬??, url: "https://sll.seoul.go.kr", desc: "?¸ë¬¸ ê²½ì œ, ?ì‚° ê´€ë¦? },
      { category: "ê²½ì œ ?¬ì´??, title: "ë§¤ê²½ test", url: "https://exam.mk.co.kr", desc: "ê²½ì œ, ê²½ì˜ ?ì‹ ?´ì¦ˆ" }
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
           
           if (parsed.sites.length === 0 && !parsed.sitesSeeded) {
             parsed.sites = DEFAULT_SITES;
             parsed.sitesSeeded = true;
             localStorage.setItem('tradingJournalData', JSON.stringify(parsed));
           } else {
             // Migrate existing user sites to favorites if missing flag
             let migrated = false;
             parsed.sites.forEach(s => {
               if (s.isFavorite === undefined) {
                 s.isFavorite = (s.id && typeof s.id === 'string' && s.id.startsWith('seed-')) ? false : true;
                 migrated = true;
               }
             });
             if (migrated) localStorage.setItem('tradingJournalData', JSON.stringify(parsed));
           }
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
      if(!confirm('?•ë§ ?? œ?˜ì‹œê² ìŠµ?ˆê¹Œ?')) return;
      const data = getStorageData();
      if (type === 'daily') data.dailyLogs = data.dailyLogs.filter(item => item.id !== id);
      else if (type === 'trade') data.trades = data.trades.filter(item => item.id !== id);
      else if (type === 'news') data.news = data.news.filter(item => item.id !== id);
      else if (type === 'period') data.periodLogs = data.periodLogs.filter(item => item.id !== id);
      else if (type === 'site') data.sites = data.sites.filter(item => item.id !== id);
      
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
      alert('?¤ëŠ˜??ê¸°ë¡???€?¥ë˜?ˆìŠµ?ˆë‹¤.');
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
      alert('ë§¤ë§¤ ?¼ì?ê°€ ?€?¥ë˜?ˆìŠµ?ˆë‹¤.');
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
      alert('?´ìŠ¤ê°€ ?€?¥ë˜?ˆìŠµ?ˆë‹¤.');
    }

    function savePeriodLog(e, periodType) {
      e.preventDefault();
      const form = e.target;
      const dateVal = form.querySelector('.period-date').value;
      const planVal = form.querySelector('.period-plan').value;
      const summaryVal = form.querySelector('.period-summary').value;

      const data = getStorageData();
      const newLog = {
        id: Date.now().toString(), type: 'period', periodType: periodType,
        date: dateVal, plan: planVal, summary: summaryVal,
        createdAt: new Date().toISOString()
      };
      data.periodLogs.push(newLog);
      setStorageData(data);
      form.reset();
      form.querySelector('.period-date').value = todayStr;
      alert('ê¸°ë¡???€?¥ë˜?ˆìŠµ?ˆë‹¤.');
    }

    function saveSite(e) {
      e.preventDefault();
      const data = getStorageData();
      const newSite = {
        id: Date.now().toString(), type: 'site',
        category: document.getElementById('siteCategory').value,
        title: document.getElementById('siteTitle').value,
        url: document.getElementById('siteUrl').value,
        desc: document.getElementById('siteDesc').value,
        isFavorite: true,
        createdAt: new Date().toISOString()
      };
      data.sites.push(newSite);
      setStorageData(data);
      e.target.reset();
      alert('?¬ì´?¸ê? ì¶”ê??˜ì—ˆ?µë‹ˆ??');
    }

    // Calculator
    function calculatePositionSize() {
      const capital = parseFloat(document.getElementById('calcTotalCapital').value);
      const riskPct = parseFloat(document.getElementById('calcRiskPercent').value);
      const stopLossPct = parseFloat(document.getElementById('calcStopLossPercent').value);
      const maxLossAmountEl = document.getElementById('calcMaxLossAmount');
      const resultAmountEl = document.getElementById('calcResultAmount');

      if (isNaN(capital) || isNaN(riskPct) || isNaN(stopLossPct) || stopLossPct === 0) {
        maxLossAmountEl.innerText = '0';
        resultAmountEl.innerText = '0 ??;
        return;
      }
      const maxLoss = capital * (riskPct / 100);
      const positionSize = maxLoss / (stopLossPct / 100);
      maxLossAmountEl.innerText = maxLoss.toLocaleString();
      resultAmountEl.innerText = Math.floor(positionSize).toLocaleString() + ' ??;
    }

    function formatCurrency(n) { return n.toLocaleString() + ' ??; }

    function switchInnerTab(tab) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
      document.getElementById(`${tab}-tab`).classList.add('active');
      event.target.classList.add('active');
    }

    function switchMainTab(tab) {
      document.querySelectorAll('.main-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
      
      const targetMain = document.getElementById('main-' + tab);
      const targetNav = document.getElementById('nav-' + tab);
      
      if(targetMain) targetMain.classList.add('active');
      if(targetNav) targetNav.classList.add('active');
    }

    function filterHistory(filter) {
      currentFilter = filter;
      document.querySelectorAll('#filter-all, #filter-daily, #filter-trade').forEach(el => el.classList.remove('active'));
      document.getElementById(`filter-${filter}`).classList.add('active');
      renderTrades();
    }

    // Render Logic
    function renderAll() {
      const data = getStorageData();
      renderBriefing();
      renderTrades(data);
      renderNews(data);
      renderPeriods(data);
      renderSites(data);
    }

    function renderBriefing() {
      const container = document.getElementById('dailyBriefingContent');
      if (typeof DAILY_BRIEFING === 'undefined') {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem 0;">ë¸Œë¦¬???°ì´?°ê? ?†ìŠµ?ˆë‹¤. ?„ì¹¨ 7?œì— ?ë™ ?…ë°?´íŠ¸?©ë‹ˆ??</p>';
        return;
      }
      
      const b = DAILY_BRIEFING;
      let html = `
        <div style="margin-bottom: 1.5rem;">
          <h3 style="color: #a5b4fc; margin-bottom: 0.5rem; font-size: 1.1rem;">?“Š ê¸ˆìœµ ì§€??/h3>
          <div class="grid-2">
            <div class="stat-box" style="padding: 1rem;">
              <div class="stat-label">???¬ëŸ¬ ?˜ìœ¨</div>
              <div class="stat-value" style="font-size: 1.2rem;">${b.exchangeRate.value}</div>
              <div style="font-size: 0.8rem; color: ${b.exchangeRate.change.includes('+') ? 'var(--danger-color)' : 'var(--success-color)'}; margin-top: 0.3rem;">?„ì¼ ?€ë¹?${b.exchangeRate.change}</div>
            </div>
            <div class="stat-box" style="padding: 1rem;">
              <div class="stat-label">ë¯?10?„ë¬¼ êµ?±„ ê¸ˆë¦¬</div>
              <div class="stat-value" style="font-size: 1.2rem;">${b.treasuryYield.value}</div>
              <div style="font-size: 0.8rem; margin-top: 0.3rem; color: var(--text-secondary)">${b.treasuryYield.change}</div>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h3 style="color: #a5b4fc; margin-bottom: 0.5rem; font-size: 1.1rem;">?’¡ ?¤ëŠ˜???„ëµ ?œí™© ì¶”ì²œ</h3>
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
              ${news.terms ? `<p style="font-size: 0.85rem; color: var(--text-secondary); background: rgba(0,0,0,0.2); padding: 0.5rem; border-radius: 4px; line-height: 1.4;"><strong>?©ì–´ ?´ì„¤:</strong> ${news.terms}</p>` : ''}
              ${news.impact ? `<p style="font-size: 0.85rem; color: #a5b4fc; margin-top: 0.5rem; line-height: 1.4;"><strong>?‘‰ ???ì‚° ?í–¥:</strong> ${news.impact}</p>` : ''}
            </div>
          `;
        });
        catHtml += '</div>';
        return catHtml;
      };

      html += renderNewsCategory('?¢ ë¶€?™ì‚° ì£¼ìš” ?´ìŠ¤', b.realEstateNews);
      html += renderNewsCategory('?’° ê¸ˆìœµ ì£¼ìš” ?´ìŠ¤', b.financeNews);
      html += renderNewsCategory('?“ˆ ë³´ìœ  ì¢…ëª© ?´ìŠ¤ (?¼ì„±?„ì, ?œí™”?ì–´ë¡œìŠ¤?˜ì´??', b.stockNews);

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
        todayTableBody.innerHTML = '<tr><td colspan="5" class="empty-row">?¤ëŠ˜ ê¸°ë¡??ë§¤ë§¤ ?´ì—­???†ìŠµ?ˆë‹¤.</td></tr>';
      } else {
        todaysTrades.forEach(t => {
          let profitHtml = '-', returnHtml = '-';
          if (t.profitAmount !== null) {
            const isProfit = t.profitAmount > 0;
            const sign = isProfit ? '+' : '';
            const cName = isProfit ? 'profit' : (t.profitAmount < 0 ? 'loss' : '');
            profitHtml = `<span class="${cName}">${sign}${t.profitAmount.toLocaleString()}??/span>`;
            returnHtml = `<span class="${cName}">${sign}${t.returnRate}%</span>`;
          }
          todayTableBody.innerHTML += `
            <tr>
              <td><strong>${t.stockName}</strong></td>
              <td>${t.entryPrice.toLocaleString()}??/td>
              <td>${t.exitPrice ? t.exitPrice.toLocaleString() + '?? : '<span style="color:var(--text-secondary)">ë³´ìœ ì¤?/span>'}</td>
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
        listContainer.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem 0;">ê¸°ë¡???†ìŠµ?ˆë‹¤.</p>';
      } else {
        combined.forEach(item => {
          const card = document.createElement('div');
          card.className = 'history-card';
          if (item.type === 'daily') {
            card.innerHTML = `
              <div class="history-header">
                <span class="date-badge">?Œ… ?°ì¼ë¦??¸íŠ¸</span>
                <div style="display:flex; align-items:center; gap: 10px;">
                  <span style="font-size: 0.85rem; color: var(--text-secondary);">${item.date}</span>
                  <button class="delete-btn" onclick="deleteItem('${item.id}', 'daily')" title="?? œ">??/button>
                </div>
              </div>
              <div class="card-body">
                <p><strong>[ê³„íš]</strong> ${item.plan}</p>
                <p><strong>[ë³µê¸°]</strong> ${item.summary}</p>
              </div>`;
          } else {
            let returnHtml = '', profitText = '';
            if (item.returnRate !== null) {
               const retClass = item.returnRate > 0 ? 'profit' : (item.returnRate < 0 ? 'loss' : '');
               const retSign = item.returnRate > 0 ? '+' : '';
               returnHtml = `<span class="${retClass}" style="font-size:1.1rem;">${retSign}${item.returnRate}%</span>`;
               profitText = `<span class="${retClass}" style="margin-right:1rem;">(${retSign}${item.profitAmount.toLocaleString()}??</span>`;
            } else { returnHtml = `<span style="color: var(--text-secondary)">ë³´ìœ ì¤?/span>`; }
            card.innerHTML = `
              <div class="history-header">
                <div><span class="badge ${item.isWin === null ? 'badge-buy' : (item.isWin ? 'badge-buy' : 'badge-sell')}">${item.stockName}</span></div>
                <div style="display:flex; align-items:center; gap: 10px;">
                  <span style="font-size: 0.85rem; color: var(--text-secondary);">${item.date}</span>
                  <button class="delete-btn" onclick="deleteItem('${item.id}', 'trade')" title="?? œ">??/button>
                </div>
              </div>
              <div class="card-meta">
                <span>ì§„ì…: ${item.entryPrice.toLocaleString()} (${item.quantity}ì£?</span>
                ${item.exitPrice ? `<span>ì²?‚°: ${item.exitPrice.toLocaleString()}</span>` : ''}
                <div style="margin-left: auto;">${profitText}${returnHtml}</div>
              </div>
              <div class="card-body">
                <p><strong>?´ìœ :</strong> ${item.entryReason}</p>
                <p><strong>ë³µê¸°:</strong> ${item.reviewGoodBad}</p>
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
      if(sorted.length===0) list.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem 0;">?±ë¡???´ìŠ¤ê°€ ?†ìŠµ?ˆë‹¤.</p>';
      
      sorted.forEach(item => {
        const card = document.createElement('div');
        card.className = 'history-card';
        card.innerHTML = `
          <div class="history-header">
            <span class="date-badge">?“° ?´ìŠ¤</span>
            <div style="display:flex; align-items:center; gap: 10px;">
              <span style="font-size: 0.85rem; color: var(--text-secondary);">${item.date}</span>
              <button class="delete-btn" onclick="deleteItem('${item.id}', 'news')" title="?? œ">??/button>
            </div>
          </div>
          <div class="card-body">
            <p><strong>?´ìŠˆ:</strong> ${item.title}</p>
            ${item.link ? `<p><strong>ë§í¬:</strong> <a href="${item.link}" target="_blank" style="color:var(--accent-color);">${item.link}</a></p>` : ''}
            <p><strong>ì½”ë©˜??</strong> ${item.comment}</p>
          </div>
        `;
        list.appendChild(card);
      });
    }

    function renderPeriods(data) {
      ['week', 'month', 'quarter', 'year'].forEach(type => {
        const list = document.getElementById(`${type}List`);
        list.innerHTML = '';
        const filtered = data.periodLogs.filter(p => p.periodType === type).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        if(filtered.length===0) {
          list.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem 0;">ê¸°ë¡???†ìŠµ?ˆë‹¤.</p>';
          return;
        }
        
        filtered.forEach(item => {
          const card = document.createElement('div');
          card.className = 'history-card';
          card.innerHTML = `
            <div class="history-header">
              <span class="date-badge">?“ ê¸°ë¡</span>
              <div style="display:flex; align-items:center; gap: 10px;">
                <span style="font-size: 0.85rem; color: var(--text-secondary);">${item.date}</span>
                <button class="delete-btn" onclick="deleteItem('${item.id}', 'period')" title="?? œ">??/button>
              </div>
            </div>
            <div class="card-body">
              <p><strong>[ê³„íš/ëª©í‘œ]</strong><br/>${item.plan}</p>
              <br/>
              <p><strong>[ë³µê¸°/ì´í‰]</strong><br/>${item.summary}</p>
            </div>
          `;
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
      const recommended = data.sites.filter(s => !s.isFavorite);

      // Render Favorites
      if (favorites.length === 0) {
        favGrid.innerHTML = '<p style="color: var(--text-secondary); padding: 1rem 0; grid-column: 1/-1;">?±ë¡??ì¦ê²¨ì°¾ê¸°ê°€ ?†ìŠµ?ˆë‹¤. ?„ë˜ ì¶”ì²œ ?¬ì´?¸ì—??ë³??????´ë¦­?˜ê±°??ì§ì ‘ ì¶”ê??´ë³´?¸ìš”.</p>';
      } else {
        favorites.forEach(item => {
          const div = document.createElement('div');
          div.className = 'site-card';
          div.style.cursor = 'default';
          div.style.position = 'relative';
          div.innerHTML = `
            <h3><a href="${item.url}" target="_blank" style="color: inherit; text-decoration: none;">${item.title}</a></h3>
            <p>${item.desc}</p>
            <button class="delete-btn site-delete" onclick="deleteItem('${item.id}', 'site')" title="?? œ">??/button>
            <button onclick="toggleFavoriteSite('${item.id}')" style="position: absolute; bottom: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; color: #fbbf24; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'" title="ì¦ê²¨ì°¾ê¸° ?´ì œ">??/button>
          `;
          favGrid.appendChild(div);
        });
      }

      // Render Recommended
      if (recommended.length === 0) {
        recGrid.innerHTML = '<p style="color: var(--text-secondary); padding: 1rem 0; grid-column: 1/-1;">ëª¨ë“  ì¶”ì²œ ?¬ì´?¸ê? ì¦ê²¨ì°¾ê¸°???ˆìŠµ?ˆë‹¤.</p>';
        return;
      }

      const categories = {};
      recommended.forEach(item => {
        const cat = item.category || 'ê¸°í?';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(item);
      });
      
      const catOrder = ["ê±°ì¥ ?¬íŠ¸?´ë¦¬??, "ê¸°ì—… ë¶„ì„", "ê²½ì œ?ë¦„", "ê²½ì œ ?¬ì´??, "ê¸°í?"];
      
      catOrder.forEach(cat => {
        if (!categories[cat] || categories[cat].length === 0) return;
        
        const catTitle = document.createElement('h3');
        catTitle.style.color = '#a5b4fc';
        catTitle.style.marginTop = '1.5rem';
        catTitle.style.marginBottom = '0.5rem';
        catTitle.style.fontSize = '1.1rem';
        catTitle.style.gridColumn = '1 / -1';
        catTitle.innerText = `?“‚ ${cat}`;
        recGrid.appendChild(catTitle);
        
        categories[cat].forEach(item => {
          const div = document.createElement('div');
          div.className = 'site-card';
          div.style.cursor = 'default';
          div.innerHTML = `
            <h3><a href="${item.url}" target="_blank" style="color: inherit; text-decoration: none;">${item.title}</a></h3>
            <p>${item.desc}</p>
            <button onclick="toggleFavoriteSite('${item.id}')" style="position: absolute; bottom: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; color: var(--text-secondary); cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'" title="ì¦ê²¨ì°¾ê¸° ì¶”ê?">??/button>
          `;
          recGrid.appendChild(div);
        });
      });
    }

    // Start App
    renderAll();
  
