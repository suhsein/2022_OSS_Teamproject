# 💡프로젝트 소개
전북대학교 학생들을 위한 챗봇 서비스를 개발하였습니다.<br>
학생들에게 필요한 학사일정이나 학과 사무실 위치, 학식 정보를 챗봇을 통해 간편하게 제공할 수 있습니다.<br>
<br>

📌 Tools & Language 📌<br>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat&logo=Visual Studio Code&logoColor=white"/>
<br>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/>
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=ESLint&logoColor=white"/> 
<img src="https://img.shields.io/badge/Mocha-8D6748?style=flat&logo=Mocha&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=flat&logo=GitHub Actions&logoColor=white"/>
<br>
<br>
Node.js 버전: v18.12.1


## 챗봇 기능 소개
- ✋Hi라고 인사를 하면 랜덤 인사를 한다.<br>
- '학사일정' 을 입력하고 원하는 날짜를 입력하면 해당 날짜의 전북대 학사일정을 안내한다. <br>
- '오늘 밥 뭐야' 를 입력하면 진수당의 🍴오늘의 점심 메뉴🥄를 알려주고 평가 결과를 안내한다.<br>
- '이번주 뭐 나와' 를 입력하면 주간 메뉴🥄의 평가 결과를 보여준다.<br>
- '학과 사무실' 을 입력하고 원하는 학과 이름을 영문으로 입력하면 📣학과사무실의 위치📣를 알려준다.<br>
<br>

## 팀원 소개

| **이혜인** | **서세인** | **이진형** |
|:-----:|:-----:|:-----: |
 **Github**: [hyein0229](https://github.com/hyein0229) | **Github**: [suhsein](https://github.com/suhsein) | **Github**: [Jinnyzinny](https://github.com/Jinnyzinny) |
 <br>

# ⚡구현한 기능
### 랜덤 인사하기
- 난수를 생성하여 랜덤으로 3개의 인사 패턴 중 하나를 출력합니다.
- Have a nice day!, Hello!, Nice to meet you 의 세 가지로 인사를 합니다.

### 학사일정 안내하기
- 학사일정을 haksa.txt 파일에서 읽어와 딕셔너리에 key: 날짜, value: 학사일정 형식으로 저장합니다.
- '학사일정' 을 입력받으면 안내 받을 날짜를 입력해달라는 메세지를 보냅니다.
- 입력된 날짜 양식이 월/일 형식이고 유효한 날짜인 경우 학사일정 딕셔너리에서 해당날짜의 학사일정을 찾습니다.
- 날짜가 알맞게 입력되었지만 학사일정이 없는 경우 해당 날짜의 학사일정이 없다는 메세지를 보냅니다.
- 입력이 날짜 양식에 맞지 않는 경우엔 잘못된 입력이라고 메세지를 보냅니다.

### 식단 안내 및 평가하기
- '오늘 밥 뭐야' 를 입력받으면 전북대 주간 식단 안내 웹사이트에서 오늘의 날짜에 해당하는 메뉴를 웹스크래핑하여<br> 식단을 메세지로 안내하고 해당 식단의 평가 결과를 보여줍니다.
- '이번주 뭐 나와' 를 입력받으면 주간 식단 평가 결과를 보여줍니다.

### 학과 사무실 안내하기
- 학과 사무실 정보를 dept.txt 파일에서 읽어와 딕셔너리에 key: 학과, value: 사무실 위치 형식으로 저장합니다.
- '학과 사무실'을 입력받으면 학과 이름을 입력하라는 메세지를 보냅니다.
- 딕셔너리에 있는 학과 이름을 알맞게 입력했을 시 학과 사무실 위치를 안내합니다. 이때, 대소문자나 띄어쓰기가 맞지 않아도 모두 허용해주도록 하였습니다.
- 학과 이름을 입력받았을 때 오탈자가 있을 시 Levenshtein distance 알고리즘으로 가장 유사한 학과를 찾아 해당 학과의 사무실 위치를 안내하도록 하였습니다.

### 단위 테스트
- Node.js 테스트 프레임워크인 Mocha를 사용하여 단위테스트 진행
- if 구문으로 입력에 대한 결과값을 검사

### 통합 테스트
- 학생 역할을 할 테스트 봇을 따로 만들어 테스트할 문구를 보내고 개발한 챗봇에서 응답을 주어 확인하는 형식
- 메세지 입력에 대한 메세지 출력값을 확인
- 만약, 다른 봇이 개입할 것을 고려하여 테스트 대상인 챗봇의 ID 에서 온 메세지만 구분하도록 처리 
- 1번부터 4번기능까지 순차적 진행 
<br>


# 🛠프로젝트 시작 방법
repository를 clone 해오거나 zip을 다운받아 압축을 해제하여 작업공간에 코드를 가져옵니다.<br>
- clone 방법:

      git clone https://github.com/suhsein/2022_OSS_Teamproject.git
    
npm install 하여 package.json 에 있는 의존성 패키지들을 설치하여 환경을 세팅합니다. (필수!)<br>
⚠️개발에만 필요한 패키지인 devDependencies을 제외하고 싶다면 --production 플래그를 사용할 수 있습니다.
- 모든 패키지 설치:

      npm install 

- devDependencies 제외하고 설치:<br>
  ⚠️ package.json 에서 'prepare': 'husky install' 은 삭제하고 설치해야함 

      npm install --production  
      
 
 dependencies: 어플 동작에 필수적인 패키지
- @slack/rtm-api
- axios
- cheerio
- dotenv
- js-levenshtein<br>

devDependencies: 개발 보조 패키지
- eslint*: Lint 검사
- husky: hook 에 사용
- mocha: Node.js 테스트 프레임워크, 단위테스트에 필요
 
<br>
 
      
# 👬협업 컨벤션 세팅
ESLint를 사용한 코드 컨벤션을 검사하였습니다.<br>
기본적으로 Airbnb 규칙을 기반으로 ESLint를 수행하고 추가된 규칙은 eslintrc.js 에 설정하였습니다.
- ESLint 세팅:

        sudo npm install -g eslint eslint-config-airbnb-base eslint-plugin-import
        eslint --init
        npx install-peerdeps --dev eslint-config-airbnb
        eslintrc.js 에 'extends': ['airbnb-base'] 추가
        
- ESLint 강제를 위해 husky를 사용하여 commit 시에 자동으로 코드 컨벤션을 검사하도록 하였습니다.
      
        npx husky-init && npm install
        npx husky add .husky/pre-commit 'eslint . --ext .js'
      
        
커밋 메세지 양식을 통일하기 위해 커밋 템플릿을 사용하였습니다.
<details>
    <summary>커밋 템플릿 양식 보기</summary>
      
      ################
      # <타입> : <제목> 의 형식으로 제목을 아래 공백줄에 작성
      # 제목은 50자 이내 / 변경사항이 "무엇"인지 명확히 작성
      # 예) feat : 로그인 기능 추가

      # 바로 아래 공백은 지우지 마세요 (제목과 본문의 분리를 위함)

      ################
      # 본문(구체적인 내용)을 아랫줄에 작성
      # 여러 줄의 메시지를 작성할 땐 "-"로 구분 (한 줄은 72자 이내)

      ################
      # 꼬릿말(footer)을 아랫줄에 작성 (현재 커밋과 관련된 이슈 번호 추가 등)
      # 예) Close #7

      ################
      # feat : 새로운 기능 추가
      # fix : 버그 수정
      # docs : 문서 수정
      # test : 테스트 코드 추가
      # refact : 코드 리팩토링
      # style : 코드 의미에 영향을 주지 않는 변경사항
      # chore : 빌드 부분 혹은 패키지 매니저 수정사항
      ################

</details>
      
- 커밋 템플릿 설정 방법:
      
       vim .gitmessage.txt (커밋 템플릿 양식 넣기)
       git config --global commit.template .gitmessage.txt
       
       
# 💬라이센스
- MIT License
       
       

     
      
      

