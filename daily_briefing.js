// daily_briefing.js
const FALLBACK_BRIEFING = {
  exchangeRate: { value: "1,385.15", change: "0.00" },
  treasuryYield: { value: "4.250%", change: "0.000%p" },
  strategy: "데이터를 불러오지 못했습니다. 설정(우측 상단 톱니바퀴)에서 API 키를 입력해주세요. 현재는 임시 데이터입니다.\n시드머니와 목표금액을 설정하시면 맞춤형 전략이 제공됩니다.",
  realEstateNews: [
    { title: "[임시] 서울 아파트값 67주 연속 상승세", link: "#", summary: "API 연동 전 임시 데이터입니다." },
    { title: "[임시] 다주택자 매물 회수", link: "#", summary: "API 연동 전 임시 데이터입니다." }
  ],
  financeNews: [
    { title: "[임시] 코스피 외국인 순매도", link: "#", summary: "API 연동 전 임시 데이터입니다." },
    { title: "[임시] 한국은행 금리 동결", link: "#", summary: "API 연동 전 임시 데이터입니다." }
  ]
};

// 설정을 로컬 스토리지에 저장하고 불러오는 함수
window.saveAISettings = function() {
  const seed = document.getElementById('settingSeedMoney').value;
  const target = document.getElementById('settingTargetMoney').value;
  const naverId = document.getElementById('settingNaverId').value;
  const naverSecret = document.getElementById('settingNaverSecret').value;
  const openaiKey = document.getElementById('settingOpenAiKey').value;

  localStorage.setItem('ai_seed', seed);
  localStorage.setItem('ai_target', target);
  localStorage.setItem('ai_naver_id', naverId);
  localStorage.setItem('ai_naver_secret', naverSecret);
  localStorage.setItem('ai_openai_key', openaiKey);

  showToast('AI 설정이 저장되었습니다. 페이지를 새로고침하면 반영됩니다.');
}

window.loadAISettings = function() {
  document.getElementById('settingSeedMoney').value = localStorage.getItem('ai_seed') || '';
  document.getElementById('settingTargetMoney').value = localStorage.getItem('ai_target') || '';
  document.getElementById('settingNaverId').value = localStorage.getItem('ai_naver_id') || '';
  document.getElementById('settingNaverSecret').value = localStorage.getItem('ai_naver_secret') || '';
  document.getElementById('settingOpenAiKey').value = localStorage.getItem('ai_openai_key') || '';
}

// 네이버 뉴스 검색 (CORS 프록시 사용)
async function fetchNaverNews(query, clientId, clientSecret) {
  try {
    const url = `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(query)}&display=5&sort=sim`;
    // 주의: 브라우저 직접 호출은 CORS 에러가 발생하므로 allorigins 프록시 사용
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(proxyUrl, {
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret
      }
    });
    
    if (!response.ok) return [];
    
    const proxyData = await response.json();
    const data = JSON.parse(proxyData.contents);
    
    if (data.items) {
      return data.items.map(item => ({
        title: item.title.replace(/<[^>]+>/g, ''), // HTML 태그 제거
        link: item.link,
        summary: item.description.replace(/<[^>]+>/g, '')
      }));
    }
    return [];
  } catch (e) {
    console.error("Naver API Error:", e);
    return [];
  }
}

// OpenAI API 요약 요청
async function fetchOpenAISummary(openaiKey, realEstate, finance, seed, target) {
  try {
    const prompt = `
너는 20년 차 경제 애널리스트야. 매일 아침 9시에 브리핑을 하는 상황이야.
아래의 오늘자 뉴스 데이터(부동산, 금융)를 읽고, 아래 규칙에 따라 브리핑해줘.

[뉴스 데이터]
부동산: ${JSON.stringify(realEstate)}
금융: ${JSON.stringify(finance)}

[내 자산 현황]
현재 시드머니: ${seed}원
올해 목표 금액: ${target}원

[작성 규칙]
1. 오늘 시장의 핵심 3줄 요약 (초등학생도 이해할 수 있게 아주 쉽게)
2. 기사에 나온 주요 경제 용어 2~3개를 골라서 괄호로 풀어서 설명
3. 내 현재 시드머니와 목표 금액을 바탕으로, 오늘 하루 어떤 마음가짐으로 자산을 지키거나 투자해야 하는지 맞춤형 전략 제시 (현실적이고 구체적으로)

출력 형식 (Markdown 금지, 일반 텍스트로 자연스럽게 작성):
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // 비용을 위해 mini 모델 사용
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    }
    return "AI 분석을 불러오는 데 실패했습니다. 키 설정을 확인해주세요.";
  } catch (e) {
    console.error("OpenAI API Error:", e);
    return "AI 서버와의 통신에 실패했습니다.";
  }
}

// 메인 실행 함수
window.generateAIBriefing = async function() {
  const container = document.getElementById('dailyBriefingContent');
  if(!container) return;

  const naverId = localStorage.getItem('ai_naver_id');
  const naverSecret = localStorage.getItem('ai_naver_secret');
  const openaiKey = localStorage.getItem('ai_openai_key');
  const seed = localStorage.getItem('ai_seed') || '0';
  const target = localStorage.getItem('ai_target') || '0';

  // API 키가 하나라도 없으면 Fallback 데이터 표시
  if (!naverId || !naverSecret || !openaiKey) {
    renderBriefing(FALLBACK_BRIEFING);
    return;
  }

  container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem 0;">네이버 뉴스를 검색하고 20년 차 애널리스트 AI가 분석 중입니다... (약 10~15초 소요)</p>';

  // 1. 뉴스 데이터 가져오기
  const realEstateNews = await fetchNaverNews('부동산 시장 전망', naverId, naverSecret);
  const financeNews = await fetchNaverNews('증시 코스피 환율 금리', naverId, naverSecret);

  // 2. AI 요약 가져오기
  const strategy = await fetchOpenAISummary(openaiKey, realEstateNews, financeNews, seed, target);

  // 3. 화면 렌더링
  renderBriefing({
    exchangeRate: { value: "API 연동중", change: "-" }, // 한국은행 API는 CORS 우회 등 추가 설정이 필요하므로 보류
    treasuryYield: { value: "API 연동중", change: "-" },
    strategy: strategy,
    realEstateNews: realEstateNews,
    financeNews: financeNews
  });
}

function renderBriefing(data) {
  const container = document.getElementById('dailyBriefingContent');
  if(!container) return;

  let html = `
    <div style="background: rgba(99, 102, 241, 0.1); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(99, 102, 241, 0.3); margin-bottom: 1.5rem;">
      <h3 style="color: #a5b4fc; margin-bottom: 1rem; font-size: 1.1rem;">👨‍💼 20년 차 애널리스트의 맞춤형 브리핑</h3>
      <p style="font-size: 0.95rem; line-height: 1.6; white-space: pre-wrap; color: #fff;">${data.strategy}</p>
    </div>

    <div class="grid-2">
      <div>
        <h4 style="color: var(--text-secondary); margin-bottom: 0.8rem; border-bottom: 1px solid var(--panel-border); padding-bottom: 0.5rem;">🏢 오늘의 부동산 뉴스 Top 5</h4>
        <ul style="list-style: none; padding: 0;">
          ${data.realEstateNews.map(news => `
            <li style="margin-bottom: 0.8rem;">
              <a href="${news.link}" target="_blank" style="color: var(--accent-color); text-decoration: none; font-weight: 500; font-size: 0.95rem;">${news.title}</a>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.2rem;">${news.summary.substring(0, 50)}...</p>
            </li>
          `).join('')}
        </ul>
      </div>
      <div>
        <h4 style="color: var(--text-secondary); margin-bottom: 0.8rem; border-bottom: 1px solid var(--panel-border); padding-bottom: 0.5rem;">💰 오늘의 금융/증시 뉴스 Top 5</h4>
        <ul style="list-style: none; padding: 0;">
          ${data.financeNews.map(news => `
            <li style="margin-bottom: 0.8rem;">
              <a href="${news.link}" target="_blank" style="color: var(--success-color); text-decoration: none; font-weight: 500; font-size: 0.95rem;">${news.title}</a>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.2rem;">${news.summary.substring(0, 50)}...</p>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;
  container.innerHTML = html;
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  // 모달을 열 때 셋팅값 로드하도록 추가
  const originalOpenSettings = window.openSettingsModal;
  window.openSettingsModal = function() {
    if(originalOpenSettings) originalOpenSettings();
    loadAISettings();
  };

  // 뉴스 탭을 누르거나 초기 로딩 시 브리핑 생성
  setTimeout(() => {
    generateAIBriefing();
  }, 1000);
});
