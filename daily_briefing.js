const DAILY_BRIEFING = {
  exchangeRate: { value: "1,515.15", change: "0.00" },
  treasuryYield: { value: "4.450%", change: "0.000%p" },
  strategy: "AI 수요 강세와 코스피 랠리에 힘입어 반도체 섹터에 집중하는 한편, 인플레이션과 하반기 한국은행의 금리 인상 가능성을 주시해야 합니다. 부동산의 경우 공급 부족과 선별적 회복세를 고려하여 서울 핵심 지역의 우량 자산을 공략하는 것이 유효합니다.",
  realEstateNews: [
    {
      title: "서울 아파트값 67주 연속 상승세 기록",
      link: "https://busan.fnnews.com/news/202605251909283162",
      summary: "서울 아파트 매매가격이 지속적으로 상승하며 67주째 오름세를 이어가고 있습니다."
    },
    {
      title: "다주택자 양도세 중과 한시 배제 종료 임박에 매물 회수",
      link: "https://search.naver.com/search.naver?where=news&query=%EB%8B%A4%EC%A3%BC%ED%83%9D%EC%9E%90+%EC%96%91%EB%8F%84%EC%84%B8+%EC%A4%91%EA%B3%BC+%ED%95%9C%EC%8B%9C+%EB%B0%B0%EC%A0%9C+%EC%A2%85%EB%A3%8C+%EC%9E%84%EB%B0%95%EC%97%90+%EB%A7%A4%EB%AC%BC+%ED%9A%8C%EC%88%98",
      summary: "양도세 중과 유예 조치 종료를 앞두고 다주택자들이 매물을 거둬들이면서 공급 물량이 감소하고 있습니다."
    },
    {
      title: "정부, 토지거래허가구역 지정으로 수요 억제 및 균형 시도",
      link: "https://search.naver.com/search.naver?where=news&query=%ED%86%A0%EC%A7%80%EA%B1%B0%EB%9E%98%ED%97%88%EA%B0%80%EA%B5%AC%EC%97%AD+%EC%A7%80%EC%A0%95%EC%9C%BC%EB%A1%9C+%EC%88%98%EC%9A%94+%EC%96%B5%EC%A0%9C+%EB%B0%8F+%EA%B7%A0%ED%98%95+%EC%8B%9C%EB%8F%84",
      summary: "부동산 시장 과열을 막기 위해 정부가 토지거래허가구역을 추가 지정하여 수요 억제에 나섰습니다."
    }
  ],
  financeNews: [
    {
      title: "코스피 5월 28.45% 급등, 8,476.15로 사상 최고치 경신",
      link: "https://search.naver.com/search.naver?where=news&query=%EC%BD%94%EC%8A%A4%ED%94%BC+5%EC%9B%94+28.45%25+%EA%B8%89%EB%93%B1%2C+8%2C476.15%EB%A1%9C+%EC%82%AC%EC%83%81+%EC%B5%9C%EA%B3%A0%EC%B9%98+%EA%B2%BD%EC%8B%A0",
      summary: "외국인 매수세와 반도체 강세에 힘입어 코스피가 사상 최고치를 경신했습니다."
    },
    {
      title: "한국은행, 2026년 경제성장률 전망치 2.6%로 상향",
      link: "https://search.naver.com/search.naver?where=news&query=%ED%95%9C%EA%B5%AD%EC%9D%80%ED%96%89%2C+2026%EB%85%84+%EA%B2%BD%EC%A0%9C%EC%84%B1%EC%9E%A5%EB%A5%A0+%EC%A0%84%EB%A7%9D%EC%B9%98+2.6%25%EB%A1%9C+%EC%83%81%ED%96%A5",
      summary: "수출 호조와 내수 회복 기대감을 반영하여 한국은행이 경제성장률 전망치를 상향 조정했습니다."
    },
    {
      title: "코스피 랠리 속 외국인 투자자 44조 7,100억 원 순매도",
      link: "https://search.naver.com/search.naver?where=news&query=%EC%BD%94%EC%8A%A4%ED%94%BC+%EB%9E%A4%EB%A6%AC+%EC%86%8D+%EC%99%B8%EA%B5%AD%EC%9D%B8+%ED%88%AC%EC%9E%90%EC%9E%90+44%EC%A1%B0+7%2C100%EC%96%B5+%EC%9B%90+%EC%88%9C%EB%A7%A4%EB%8F%84",
      summary: "지수 최고치 경신에도 불구하고 외국인 투자자들의 대규모 차익 실현 매물이 쏟아졌습니다."
    }
  ],
  stockNews: [
    {
      title: "삼성전자, 창사 이래 첫 노사 임금협약 체결",
      link: "https://search.naver.com/search.naver?where=news&query=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%2C+%EC%B0%BD%EC%82%AC+%EC%9D%B4%EB%9E%98+%EC%B2%AB+%EB%85%B8%EC%82%AC+%EC%9E%84%EA%B8%88%ED%98%91%EC%95%BD+%EC%B2%B4%EA%B2%B0",
      summary: "삼성전자가 노조와 2026년 임금협약을 체결하며 노사 리스크를 일부 해소했습니다."
    },
    {
      title: "삼성전자, 업계 최초 12단 HBM4E 샘플 출하",
      link: "https://search.naver.com/search.naver?where=news&query=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%2C+%EC%97%85%EA%B3%84+%EC%B5%9C%EC%B4%88+12%EB%8B%A8+HBM4E+%EC%83%98%ED%94%8C+%EC%B6%9C%ED%95%98",
      summary: "AI 메모리 시장 주도권을 확보하기 위해 삼성전자가 차세대 HBM 제품 샘플을 고객사에 공급했습니다."
    },
    {
      title: "한화에어로스페이스, 유럽 국가들과 신규 무기 수출 계약 논의",
      link: "https://search.naver.com/search.naver?where=news&query=%ED%95%9C%ED%99%94%EC%97%90%EC%96%B4%EB%A1%9C%EC%8A%A4%ED%8E%98%EC%9D%B4%EC%8A%A4%2C+%EC%9C%A0%EB%9F%BD+%EA%B5%AD%EA%B0%80%EB%93%A4%EA%B3%BC+%EC%8B%A0%EA%B7%9C+%EB%AC%B4%EA%B8%B0+%EC%88%98%EC%B6%9C+%EA%B3%84%EC%95%BD+%EB%85%BC%EC%9D%98",
      summary: "K-방산의 경쟁력을 바탕으로 한화에어로스페이스가 유럽 주요국과 대규모 수출 협상을 진행 중입니다."
    },
    {
      title: "한화, KASA와 무인기용 4,500파운드급 터보팬 엔진 공동 개발",
      link: "https://search.naver.com/search.naver?where=news&query=%ED%95%9C%ED%99%94%2C+KASA%EC%99%80+%EB%AC%B4%EC%9D%B8%EA%B8%B0%EC%9A%A9+4%2C500%ED%8C%8C%EC%9A%B4%EB%93%9C%EA%B8%89+%ED%84%B0%EB%B3%B4%ED%8C%AC+%EC%97%94%EC%A7%84+%EA%B3%B5%EB%8F%99+%EA%B0%9C%EB%B0%9C",
      summary: "첨단 항공 엔진 기술 국산화를 위해 한화가 정부 기관과 손잡고 핵심 기술 개발에 착수했습니다."
    }
  ]
};
