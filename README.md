# 주식 트레이딩 저널 (Stock Trading Journal)

AI 에이전트와 주도적으로 협업하여 개발한 주식 매매 일지 및 데이터 관리 플랫폼입니다.
단순히 코드를 생성하는 것에 그치지 않고, 모바일 환경 최적화 및 Vercel을 통한 실제 배포까지 완료했습니다.

# 사용 기술
- Frontend: HTML, JavaScript (Tailwind CSS 기반 반응형 UI)
- Script/Data: Python (데이터 처리 스크립트), PowerShell
- Deployment: Vercel (실제 배포 완료)

# AI (Cursor / Claude) 협업 및 문제 해결 기록

1. Vercel 빌드 오류 해결 (Next.js 관련 정적 설정)**
   - 문제: 배포 초기 과정에서 vercel.json 설정 누락으로 빌드 에러 발생.
   - 협업: 프로젝트 구조에 맞게 vercel.json을 직접 수정 및 보완하여 최종 배포 성공.

2. 모바일 레이아웃 탭 오버플로우 수정
   - 문제: 모바일 화면에서 네비게이션 라벨이 깨지고 탭이 화면 밖으로 넘치는 현상 발생.
   - 협업: AI에게 CSS 수정안을 요구한 뒤, 가독성과 유지보수성을 고려하여 필요한 반응형 클래스만 index.html에 선별적으로 반영.
