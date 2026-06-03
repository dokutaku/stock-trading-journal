$filePath = "c:\Users\subin\OneDrive\Desktop\앱개발\웹\주식매매일지\index.html"
$html = Get-Content $filePath -Raw -Encoding UTF8

# Extract Calculator
$calcRegex = '(?s)(<div class="glass-panel">\s*<h2 class="section-title" style="margin-top: 0;">📉 고정 손실 \(Position Sizing\) 계산기</h2>.*?</div>\s*</div>)'
if ($html -match $calcRegex) {
    $calcHtml = $matches[1]
    $html = $html -replace [regex]::Escape($calcHtml), ''
    
    $mainCalc = @"
  <!-- 고정 손실 계산기 탭 -->
  <div id="main-calculator" class="main-content">
    <div class="container-single">
$calcHtml
    </div>
  </div>
"@
    $siteMarker = "  <!-- 7. 관련 사이트 탭 -->"
    $html = $html -replace '  <!-- 7. 사이트 탭 -->', $siteMarker
    $html = $html -replace [regex]::Escape($siteMarker), "$mainCalc`n$siteMarker"
}

# Create Journal Wrapper
$journalNav = @"
  <!-- 매매일지 탭 -->
  <div id="main-journal" class="main-content">
    <div style="max-width: 1200px; margin: 0 auto 1.5rem auto; padding: 0 1rem;">
      <div class="tabs" style="justify-content: center; background: rgba(0,0,0,0.2);">
        <button class="tab jtab active" onclick="switchJournalTab('trade')" id="jnav-trade" style="padding: 0.8rem 1.5rem; font-size: 1.05rem;">일 (Day)</button>
        <button class="tab jtab" onclick="switchJournalTab('week')" id="jnav-week" style="padding: 0.8rem 1.5rem; font-size: 1.05rem;">주 (Week)</button>
        <button class="tab jtab" onclick="switchJournalTab('month')" id="jnav-month" style="padding: 0.8rem 1.5rem; font-size: 1.05rem;">월 (Month)</button>
        <button class="tab jtab" onclick="switchJournalTab('quarter')" id="jnav-quarter" style="padding: 0.8rem 1.5rem; font-size: 1.05rem;">분기 (Quarter)</button>
        <button class="tab jtab" onclick="switchJournalTab('year')" id="jnav-year" style="padding: 0.8rem 1.5rem; font-size: 1.05rem;">년 (Year)</button>
      </div>
    </div>
"@

$html = $html -replace '  <!-- 2. 오늘 매매\(일\) 탭 -->', "$journalNav`n  <!-- 2. 오늘 매매(일) 탭 -->"
$html = $html -replace '<div id="main-trade" class="main-content active">', '<div id="journal-trade" class="journal-content active">'
$html = $html -replace '<div id="main-trade" class="main-content">', '<div id="journal-trade" class="journal-content">'
$html = $html -replace '<div id="main-week" class="main-content">', '<div id="journal-week" class="journal-content">'
$html = $html -replace '<div id="main-month" class="main-content">', '<div id="journal-month" class="journal-content">'
$html = $html -replace '<div id="main-quarter" class="main-content">', '<div id="journal-quarter" class="journal-content">'
$html = $html -replace '<div id="main-year" class="main-content">', '<div id="journal-year" class="journal-content">'

$html = $html -replace [regex]::Escape($siteMarker), "  </div>`n`n$siteMarker"

$html = $html -replace "getElementById\('main-year'\)\.scrollIntoView", "getElementById('journal-year').scrollIntoView"
$html = $html -replace "getElementById\('main-quarter'\)\.scrollIntoView", "getElementById('journal-quarter').scrollIntoView"
$html = $html -replace "getElementById\('main-month'\)\.scrollIntoView", "getElementById('journal-month').scrollIntoView"
$html = $html -replace "getElementById\('main-week'\)\.scrollIntoView", "getElementById('journal-week').scrollIntoView"
$html = $html -replace "getElementById\('main-trade'\)\.scrollIntoView", "getElementById('journal-trade').scrollIntoView"

$oldSwitch = @"
    function switchMainTab(tab) {
      document.querySelectorAll('.main-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
      
      const targetMain = document.getElementById('main-' + tab);
      const targetNav = document.getElementById('nav-' + tab);
      
      if(targetMain) targetMain.classList.add('active');
      if(targetNav) targetNav.classList.add('active');
    }
"@

$newSwitch = @"
    function switchMainTab(tab) {
      document.querySelectorAll('.main-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
      
      const targetMain = document.getElementById('main-' + tab);
      const targetNav = document.getElementById('nav-' + tab);
      
      if(targetMain) targetMain.classList.add('active');
      if(targetNav) targetNav.classList.add('active');
    }

    function switchJournalTab(tab) {
      document.querySelectorAll('.journal-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.jtab').forEach(el => el.classList.remove('active'));
      
      const targetContent = document.getElementById('journal-' + tab);
      const targetTab = document.getElementById('jnav-' + tab);
      
      if(targetContent) targetContent.classList.add('active');
      if(targetTab) targetTab.classList.add('active');
    }
"@

$html = $html -replace [regex]::Escape($oldSwitch), $newSwitch

# Add CSS for journal-content
$oldCss = ".main-content { display: none; }"
$newCss = ".main-content { display: none; }`n     .journal-content { display: none; }`n     .journal-content.active { display: block; animation: fadeIn 0.4s ease; }"
$html = $html -replace [regex]::Escape($oldCss), $newCss

$html | Set-Content $filePath -Encoding UTF8
Write-Output "SUCCESS"
