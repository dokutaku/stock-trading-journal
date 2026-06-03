import re
import sys

try:
    with open(r'c:\Users\subin\OneDrive\Desktop\앱개발\웹\주식매매일지\index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Update Top Nav
    nav_old = '''  <nav class="top-nav">
    <div class="nav-container">
      <div class="logo">📈 Journal</div>
      <button class="nav-btn" onclick="switchMainTab('news')" id="nav-news">오늘 뉴스</button>
      <button class="nav-btn active" onclick="switchMainTab('trade')" id="nav-trade">일</button>
      <button class="nav-btn" onclick="switchMainTab('week')" id="nav-week">주</button>
      <button class="nav-btn" onclick="switchMainTab('month')" id="nav-month">월</button>
      <button class="nav-btn" onclick="switchMainTab('quarter')" id="nav-quarter">분기</button>
      <button class="nav-btn" onclick="switchMainTab('year')" id="nav-year">년</button>
      <button class="nav-btn" onclick="switchMainTab('site')" id="nav-site">사이트</button>
    </div>
  </nav>'''

    nav_new = '''  <nav class="top-nav">
    <div class="nav-container">
      <div class="logo">📈 Journal</div>
      <button class="nav-btn active" onclick="switchMainTab('news')" id="nav-news">오늘 뉴스</button>
      <button class="nav-btn" onclick="switchMainTab('journal')" id="nav-journal">매매일지</button>
      <button class="nav-btn" onclick="switchMainTab('calculator')" id="nav-calculator">고정 손실 계산기</button>
      <button class="nav-btn" onclick="switchMainTab('site')" id="nav-site">관련 사이트</button>
    </div>
  </nav>'''

    html = html.replace(nav_old, nav_new)

    # 2. Extract Calculator
    calc_regex = re.compile(r'(<div class="glass-panel">\s*<h2 class="section-title" style="margin-top: 0;">📉 고정 손실 \(Position Sizing\) 계산기</h2>.*?</div>\s*</div>)', re.DOTALL)
    calc_match = calc_regex.search(html)

    if calc_match:
        calc_html = calc_match.group(1)
        # Remove from main-news
        html = html.replace(calc_html, '')
        
        # Create main-calculator wrapper
        main_calc = f'''
  <!-- 3. 고정 손실 계산기 탭 -->
  <div id="main-calculator" class="main-content" style="display:none;">
    <div class="container-single">
      {calc_html}
    </div>
  </div>
'''
        # We will insert it before main-site
        site_marker = '  <!-- 7. 사이트 탭 -->'
        html = html.replace(site_marker, main_calc + '\n  <!-- 4. 관련 사이트 탭 -->')

    # 3. Create main-journal and wrap the period tabs
    journal_nav = '''
  <!-- 2. 매매일지 탭 -->
  <div id="main-journal" class="main-content" style="display:none;">
    <div style="max-width: 1200px; margin: 0 auto 1.5rem auto; padding: 0 1rem;">
      <div class="tabs" style="justify-content: center; background: rgba(0,0,0,0.2);">
        <button class="tab active" onclick="switchJournalTab('trade')" id="jnav-trade" style="padding: 0.8rem 1.5rem; font-size: 1.05rem;">일 (Day)</button>
        <button class="tab" onclick="switchJournalTab('week')" id="jnav-week" style="padding: 0.8rem 1.5rem; font-size: 1.05rem;">주 (Week)</button>
        <button class="tab" onclick="switchJournalTab('month')" id="jnav-month" style="padding: 0.8rem 1.5rem; font-size: 1.05rem;">월 (Month)</button>
        <button class="tab" onclick="switchJournalTab('quarter')" id="jnav-quarter" style="padding: 0.8rem 1.5rem; font-size: 1.05rem;">분기 (Quarter)</button>
        <button class="tab" onclick="switchJournalTab('year')" id="jnav-year" style="padding: 0.8rem 1.5rem; font-size: 1.05rem;">년 (Year)</button>
      </div>
    </div>
'''

    html = html.replace('  <!-- 2. 오늘 매매(일) 탭 -->', journal_nav + '\n  <!-- 일 탭 -->')
    html = html.replace('  <!-- 3. 주간 탭 -->', '  <!-- 주 탭 -->')
    html = html.replace('  <!-- 4. 월간 탭 -->', '  <!-- 월 탭 -->')
    html = html.replace('  <!-- 5. 분기 탭 -->', '  <!-- 분기 탭 -->')
    html = html.replace('  <!-- 6. 연간 탭 -->', '  <!-- 년 탭 -->')

    # Change main-trade -> journal-trade and main-content -> journal-content
    html = html.replace('<div id="main-trade" class="main-content" style="display:none;">', '<div id="journal-trade" class="journal-content">')
    html = html.replace('<div id="main-week" class="main-content" style="display:none;">', '<div id="journal-week" class="journal-content" style="display:none;">')
    html = html.replace('<div id="main-month" class="main-content" style="display:none;">', '<div id="journal-month" class="journal-content" style="display:none;">')
    html = html.replace('<div id="main-quarter" class="main-content" style="display:none;">', '<div id="journal-quarter" class="journal-content" style="display:none;">')
    html = html.replace('<div id="main-year" class="main-content" style="display:none;">', '<div id="journal-year" class="journal-content" style="display:none;">')

    # Close main-journal div before main-calculator
    html = html.replace('  <!-- 3. 고정 손실 계산기 탭 -->', '  </div>\n\n  <!-- 3. 고정 손실 계산기 탭 -->')

    # 4. Update main-* IDs inside JS edit functions
    html = html.replace("document.getElementById('main-year').scrollIntoView", "document.getElementById('journal-year').scrollIntoView")
    html = html.replace("document.getElementById('main-quarter').scrollIntoView", "document.getElementById('journal-quarter').scrollIntoView")
    html = html.replace("document.getElementById('main-month').scrollIntoView", "document.getElementById('journal-month').scrollIntoView")
    html = html.replace("document.getElementById('main-week').scrollIntoView", "document.getElementById('journal-week').scrollIntoView")
    html = html.replace("document.getElementById('main-trade').scrollIntoView", "document.getElementById('journal-trade').scrollIntoView")

    # 5. Update switchMainTab logic
    old_switch = '''    function switchMainTab(tabId) {
      const tabs = ['news', 'trade', 'week', 'month', 'quarter', 'year', 'site'];
      tabs.forEach(t => {
        document.getElementById(`main-${t}`).style.display = t === tabId ? 'block' : 'none';
        document.getElementById(`nav-${t}`).classList.toggle('active', t === tabId);
      });
    }'''

    new_switch = '''    function switchMainTab(tabId) {
      const tabs = ['news', 'journal', 'calculator', 'site'];
      tabs.forEach(t => {
        const el = document.getElementById(`main-${t}`);
        if(el) el.style.display = t === tabId ? 'block' : 'none';
        const navEl = document.getElementById(`nav-${t}`);
        if(navEl) navEl.classList.toggle('active', t === tabId);
      });
    }
    
    function switchJournalTab(periodId) {
      const periods = ['trade', 'week', 'month', 'quarter', 'year'];
      periods.forEach(p => {
        const el = document.getElementById(`journal-${p}`);
        if(el) el.style.display = p === periodId ? 'block' : 'none';
        const navEl = document.getElementById(`jnav-${p}`);
        if(navEl) navEl.classList.toggle('active', p === periodId);
      });
    }'''
    html = html.replace(old_switch, new_switch)

    with open(r'c:\Users\subin\OneDrive\Desktop\앱개발\웹\주식매매일지\index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print('SUCCESS')

except Exception as e:
    print('ERROR:', str(e))
    sys.exit(1)
