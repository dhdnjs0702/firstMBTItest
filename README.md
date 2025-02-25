프로젝트 구조등 전반적인 구조에 생각보다 크게 신경을 쓰지 못하여 다소 중구난방인 느낌이 있습니다.
02/25/10:25기준 test브랜치에서 확인하시면 되겠습니다. -> main브랜치에도 정상 적용되어있습니다.
vercel배포링크 -> https://first-mbt-itest-git-test-mzsobas-projects.vercel.app/

publicroute -> 로그인하기 전에 접근이 가능합니다.
privateroute -> 로그인 후 접근이 가능합니다.

-src/pages/homepage-> 프로젝트 시작시 가장 먼저 접근 하는 페이지이자 메인 페이지 입니다.
-src/pages/profilepage->api명세서 상으로는 프로필사진도 업데이트만 가능하지만 현재는 닉네임 변경만 가능합니다.

-src/pages/signuppage-> 로그인과 회원가입이 가능한 페이지로 조건부 렌더리을 하여 로그인과 회원가입 페이지를 자유롭게 이동할 수 있습니다.
&& 로그인시 서버로 부터 응답받은 accesstoken을 로컬 스토리지에 저장하고 accesstoken이 있는 경우 zustand로 isLogin이라는 상태를 생성하여 전역으로 로그인상태를 관리합니다.

-src/pages/testpage: src/data/question.js에 존재하는 질문을 렌더링 하고 해당 결과를 handlesubmit함수로 가공하여 src/utils/mbticalculator의 calculateMBTI로 결과를 뽑아냅니다. 그 후 json서버에 해당 결과를 유저가 제출한 시간, 닉네임, 아이디, 인덱스, 테스트 결과와 같은 정보를 저장합니다. 이후 ?mbti=~꼴의 쿼리 스트링으로 새로 url을 생성하여 testresult페이지로 이동합니다.

-src/pages/testresult: useEffect를 사용하여 렌더링 후 앞선 페이지에서 제대로된 테스트 결과를 받지 못한경우 testpage로 리다이렉트 시킵니다. useSearchParams훅을 사용하여 쿼리스트링의 값을 뽑아와서 유저에게 상세 테스트 결과를 보여주게 됩니다.

-src/pages/testresultspage: 본인을 포함한 다른 유저들의 테스트 결과들도 한번에 볼 수 있는 페이지로 테스트를한 당사자의 게시물의 경우 조건부 렌더링을 활용하여 비공개/공개 및 삭제 버튼이 노출되게 됩니다. tanstackquery를 가장 많이 사용한 페이지입니다.
useQuery훅을 사용하여 모든 테스트 결과를 Json서버로부터 get하고 해당 결과들을 useMutation훅을 사용해 수정하게 됩니다(삭제, 공개/비공개 여부) invalidateQueries를 사용하면 자동으로 다 동기화가 되는줄 알았는데 저의 오해였다는걸 뒤늦게 꺠닫고 낙관적 업데이트방식을 채용해 공개 비공개 버튼간의 이동이 자연스러워졌습니다.

-src/component/compnavbar: 컴포넌트이기에 comp를 prefix로 하였습니다. 네비게이션 바에 뜨는 메뉴의 경우 조건부렌더링 방식을 사용해 로그인 여부에 따로 노출되는 메뉴가 다르며, 로그아웃 버튼 클릭시 로컬스토리지에 저장되어있는 아이디, 닉네임, 액세스토큰을 삭제합니다.

-src/api/auth.js: json서버와 jwt서버로 접근하기 위한 axios인스턴스화 및 기타 tanstackquery에서 사용해야하는 여러 요청메서드가 작성이 되어있습니다.

-src/zustand/mbtistore.js: 전역상태관리 라이브러리인 zustand파일 입니다. 제가 생각하기에 로컬 전역 변수로 사용하면 좋겠다. 싶은 닉네임, 로그인 여부, 로그인화면/회원가입화면 여부, 전체 테스트 결과를 관리합니다.

-간단후기: 이전기술들에 비해 학습곡선이 제법 있었다고 생각하고(tanstackquery에서 애를 많이 먹었기 때문), 그로 인해 학습시간이 생각보다 길어 정말 촉박하게 구현을 하게 되었습니다. 이번 프로젝트에서는 항상 지적받았던 적절한 파일명 설정, 컴포넌트와 아닌것들간의 분리, 좀 더 정갈한 코드의 분리 등을 신경쓰고 싶었는데 정말 급급하게 구현에만 집중해서 작성하게 되어 시간이 더 있었으면 깔끔하게 작성이 가능했을거 같은데라는 아쉬움이 남게됩니다. 그래도 rtk보다는 훨씬 쉽고 구현에 필요한 복잡성이 줄어들어 배우고 실습하면서 재밌었던거 같습니다.
