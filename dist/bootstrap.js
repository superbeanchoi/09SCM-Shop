const app = document.querySelector("#app");
const telecomSalesRegistrationNumber = window.retailMallSettings?.telecomSalesRegistrationNumber ?? "제2026-수원영통-0001호";

app.innerHTML = `
  <div class="utility-bar">
    <div class="site-width utility-inner">
      <span>동네에서 함께 사는 즐거움</span>
      <nav class="utility-links" aria-label="서비스 메뉴">
        <a href="?view=franchise-signup">가맹점 가입신청</a>
        <a href="https://claude.ai/artifact/8XjyU153zPooyw813v1Bam" target="_blank" rel="noopener noreferrer">관리자 로그인</a>
      </nav>
    </div>
  </div>

  <header class="main-header">
    <div class="site-width header-inner">
      <div class="header-left">
        <button class="icon-text-button" id="categoryOpen" type="button" aria-label="카테고리 열기" aria-expanded="false">
          <span class="menu-icon" aria-hidden="true"><i></i><i></i><i></i></span><span>카테고리</span>
        </button>
        <button class="icon-text-button desktop-search-toggle" id="searchOpen" type="button" aria-label="상품 검색 열기" aria-expanded="false">
          <span class="search-icon" aria-hidden="true"></span><span>검색</span>
        </button>
      </div>
      <a class="store-brand" href="./index.html" aria-label="온마을 공동구매 홈"><strong>온마을 공동구매</strong></a>
      <nav class="header-right desktop-member-menu" aria-label="회원 메뉴">
        <a class="header-action login-action" href="?view=login">로그인</a>
        <a class="header-action cart-action" href="?view=cart" aria-label="장바구니">장바구니 <b data-cart-count>0</b></a>
        <a class="header-action my-action" href="?view=order-history">마이페이지</a>
      </nav>
      <button class="mobile-search-toggle" id="mobileSearchToggle" type="button" aria-label="상품 검색 열기" aria-expanded="false">
        <span class="search-icon" aria-hidden="true"></span><span class="close-icon" aria-hidden="true">×</span>
      </button>
    </div>
    <form class="search-panel" id="searchPanel" role="search">
      <div class="site-width search-panel-inner">
        <label for="productSearch">상품 검색</label>
        <input id="productSearch" type="search" placeholder="상품명을 입력해 주세요" autocomplete="off" />
        <button class="primary-button" type="submit">검색</button>
        <button class="secondary-button desktop-only" id="searchClose" type="button">닫기</button>
      </div>
    </form>
  </header>

  <div class="drawer-backdrop" id="drawerBackdrop" hidden></div>
  <aside class="category-drawer" id="categoryDrawer" aria-label="전체 메뉴" aria-hidden="true">
    <div class="drawer-header">
      <h2>메뉴</h2>
      <button class="icon-button" id="categoryClose" type="button" aria-label="메뉴 닫기">×</button>
    </div>
    <nav class="drawer-member-menu" aria-label="회원 메뉴">
      <a href="?view=login">로그인</a>
      <a href="?view=cart">장바구니 <b data-cart-count>0</b></a>
      <a href="?view=order-history">마이페이지</a>
    </nav>
    <nav class="drawer-fulfillment-links" aria-label="수령방식별 상품">
      <a href="?view=catalog&pickupDate=today">픽업상품</a>
      <a href="?view=catalog&fulfillment=delivery">배달상품</a>
    </nav>
    <strong class="drawer-category-title">카테고리</strong>
    <nav class="category-list" id="categoryList" aria-label="카테고리 목록"></nav>
    <a class="drawer-admin-login" href="https://claude.ai/artifact/8XjyU153zPooyw813v1Bam" target="_blank" rel="noopener noreferrer">관리자 로그인</a>
    <a class="drawer-franchise-link" href="?view=franchise-signup">가맹점 가입신청</a>
  </aside>

  <main class="page-root" id="pageContent"></main>

  <a class="quick-order-lookup" id="quickOrderLookup" href="?view=quick-order-lookup" aria-label="간편 주문 조회"><span class="quick-order-desktop">주문 조회</span><span class="quick-order-mobile">간편 주문조회 →</span></a>

  <footer class="site-footer">
    <div class="site-width footer-inner">
      <div class="footer-business">
        <div>
          <span>상호명 <strong>온마을마켓</strong></span>
          <span>대표자명 <strong>김하늘</strong></span>
          <span>사업자등록번호 <strong>123-45-67890</strong></span>
          ${telecomSalesRegistrationNumber ? `<span>통신판매업 신고번호 <strong>${String(telecomSalesRegistrationNumber).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character])}</strong></span>` : ""}
          <span>사업장주소 <strong>경기 수원시 영통구 온마을로 27</strong></span>
        </div>
        <nav aria-label="약관 메뉴"><a href="?view=terms">이용약관</a><a class="privacy-link" href="?view=privacy">개인정보처리방침</a></nav>
      </div>
      <div class="footer-service"><strong>공동구매 운영 솔루션 - 09SCM</strong><a href="https://zero-scm-homepage-mockup.csb62929.chatgpt.site" target="_blank" rel="noreferrer">0SCM 회사소개 →</a></div>
    </div>
  </footer>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>
`;

const logic = document.createElement("script");
logic.src = "./app.js?v=20261006-13";
document.body.appendChild(logic);

