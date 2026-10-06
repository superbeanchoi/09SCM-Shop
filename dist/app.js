const categoryGroups = [
  { name: "신선식품", children: ["과일", "채소"] },
  { name: "축산·수산", children: ["정육", "수산"] },
  { name: "간편식·간식", children: ["간편식", "간식"] },
];

const products = [
  { id: 1, category1: "신선식품", category2: "과일", name: "성주 꿀참외 1.5kg", price: 12900, regularPrice: 15900, featured: true, stock: 20, saleMethod: "픽업·배달", composition: "성주 꿀참외 1.5kg 1박스", maxPurchase: 3, origin: "국내산(경북 성주)", expiry: "수령일로부터 냉장 보관 5일", galleryPositions: ["65% center", "50% center", "82% center"], pickup: "9월 13일 오후 2시 이후", deadline: "9월 12일 오후 6시", imagePosition: "65% center" },
  { id: 2, category1: "신선식품", category2: "채소", name: "대저 짭짤이 토마토 2kg", price: 15800, featured: true, stock: 18, saleMethod: "픽업", pickup: "9월 13일 오후 2시 이후", deadline: "9월 12일 오후 6시", imagePosition: "72% center" },
  { id: 3, category1: "축산·수산", category2: "정육", name: "국내산 한돈 삼겹살 600g", price: 14900, featured: true, stock: 12, saleMethod: "배달", pickup: "9월 14일 오후 3시 이후", deadline: "9월 12일 오후 5시" },
  { id: 4, category1: "간편식·간식", category2: "간편식", name: "수제 한우 떡갈비 4팩", price: 18500, regularPrice: 22000, featured: true, stock: 15, saleMethod: "픽업·배달", pickup: "9월 14일 오후 3시 이후", deadline: "9월 12일 오후 5시" },
  { id: 5, category1: "신선식품", category2: "과일", name: "제주 한라봉 3kg", price: 21900, regularPrice: 25900, featured: true, stock: 0, soldOut: true, saleMethod: "배달", pickup: "9월 15일 오전 11시 이후", deadline: "9월 13일 오후 6시", imagePosition: "88% center" },
  { id: 6, category1: "신선식품", category2: "채소", name: "포슬포슬 햇감자 3kg", price: 9900, featured: true, stock: 24, saleMethod: "픽업", pickup: "9월 13일 오후 2시 이후", deadline: "9월 12일 오후 6시", imagePosition: "82% center" },
  { id: 7, category1: "축산·수산", category2: "수산", name: "손질 고등어 5팩", price: 16900, regularPrice: 19900, featured: true, stock: 10, saleMethod: "픽업·배달", pickup: "9월 14일 오후 4시 이후", deadline: "9월 12일 오후 3시" },
  { id: 8, category1: "간편식·간식", category2: "간식", name: "우리쌀 인절미 20개입", price: 11500, featured: true, stock: 14, saleMethod: "픽업", pickup: "9월 13일 오후 1시 이후", deadline: "9월 12일 오후 4시" },
  { id: 9, category1: "신선식품", category2: "과일", name: "샤인머스켓 2송이", price: 19800, regularPrice: 22900, featured: false, stock: 8, saleMethod: "배달", pickup: "9월 15일 오후 1시 이후", deadline: "9월 13일 오후 6시" },
  { id: 10, category1: "신선식품", category2: "채소", name: "무농약 애호박 5개", price: 7900, featured: false, stock: 25, saleMethod: "픽업·배달", pickup: "9월 13일 오후 2시 이후", deadline: "9월 12일 오후 6시" },
  { id: 11, category1: "간편식·간식", category2: "간편식", name: "국산콩 두부 6모", price: 8900, regularPrice: 10900, featured: false, stock: 18, saleMethod: "픽업", pickup: "9월 14일 오전 11시 이후", deadline: "9월 12일 오후 5시" },
  { id: 12, category1: "간편식·간식", category2: "간식", name: "구운 현미 누룽지 500g", price: 6500, featured: false, stock: 30, saleMethod: "픽업·배달", pickup: "상시 수령 가능", deadline: "재고 소진 시" },
];
const DELIVERY_FEE = 3000;

// 목업 상품의 픽업 기간은 접속일을 기준으로 잡아 '오늘 픽업' 사례가 계속 확인되게 한다.
function localDateKey(offset = 0) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
const samplePickupWindows = { 1: [-1, 1], 2: [0, 0], 4: [0, 2], 6: [0, 1], 7: [1, 3], 8: [0, 0], 10: [0, 3], 11: [2, 4], 12: [-2, 7] };
products.forEach((product) => {
  product.retailExposure = "노출중";
  const window = samplePickupWindows[product.id];
  if (window && product.saleMethod !== "배달") {
    product.pickupStart = localDateKey(window[0]);
    product.pickupEnd = localDateKey(window[1]);
  }
});

const mockOrders = [
  {
    orderNumber: "OM260914-102913",
    orderedAt: "2026.09.14",
    orderedTime: "오후 2:30",
    items: [
      { id: 1, quantity: 1 },
      { id: 4, quantity: 1 },
      { id: 8, quantity: 1 },
    ],
    fulfillment: "pickup",
    processStatus: "픽업대기",
    payment: "transfer",
    paymentStatus: "결제대기",
    pickupRequest: "도착 10분 전에 연락 부탁드립니다.",
    customerName: "홍길동",
    phone: "010-1234-5678",
    nicknameCode: "7942",
  },
  {
    orderNumber: "OM260914-102914",
    orderedAt: "2026.09.14",
    orderedTime: "오후 5:10",
    items: [{ id: 2, quantity: 1 }],
    fulfillment: "pickup",
    processStatus: "픽업대기",
    payment: "card",
    paymentStatus: "결제완료",
    orderChannel: "채팅주문",
    chatNickname: "산책러",
    pickupRequest: "도착 전에 연락 부탁드립니다.",
    customerName: "홍길동",
    phone: "010-1234-5678",
    nicknameCode: "7942",
  },
  {
    orderNumber: "OM260913-084216",
    orderedAt: "2026.09.13",
    orderedTime: "오전 11:20",
    items: [{ id: 7, quantity: 1 }],
    fulfillment: "delivery",
    processStatus: "주문접수",
    payment: "card",
    paymentStatus: "결제완료",
    deliveryAddressName: "우리집",
    deliveryAddress: "경기 수원시 영통구 온마을로 18, 온마을아파트 101동 1203호",
    deliveryRequest: "문 앞에 놓아주세요.",
    customerName: "홍길동",
    phone: "010-1234-5678",
    nicknameCode: "7942",
  },
  {
    orderNumber: "OM260912-072811",
    orderedAt: "2026.09.12",
    orderedTime: "오후 5:08",
    items: [{ id: 4, quantity: 2 }],
    fulfillment: "pickup",
    processStatus: "픽업완료",
    payment: "onsite",
    paymentStatus: "결제완료",
    pickupRequest: "요청사항 없음",
    customerName: "홍길동",
    phone: "010-1234-5678",
    nicknameCode: "7942",
  },
  {
    orderNumber: "OM260911-061522",
    orderedAt: "2026.09.11",
    orderedTime: "오후 1:45",
    items: [{ id: 1, quantity: 1 }, { id: 4, quantity: 1 }],
    fulfillment: "delivery",
    processStatus: "배달대기",
    payment: "card",
    paymentStatus: "결제완료",
    deliveryAddressName: "우리집",
    deliveryAddress: "경기 수원시 영통구 온마을로 18, 온마을아파트 101동 1203호",
    deliveryRequest: "경비실에 맡겨주세요.",
    customerName: "홍길동",
    phone: "010-1234-5678",
    nicknameCode: "7942",
  },
  {
    orderNumber: "OM260910-031450",
    orderedAt: "2026.09.10",
    orderedTime: "오전 9:14",
    items: [{ id: 5, quantity: 1 }],
    fulfillment: "delivery",
    processStatus: "배달완료",
    payment: "card",
    paymentStatus: "결제완료",
    deliveryAddressName: "회사",
    deliveryAddress: "경기 수원시 영통구 센트럴로 12, 3층",
    deliveryRequest: "도착하면 전화주세요.",
    customerName: "홍길동",
    phone: "010-1234-5678",
    nicknameCode: "7942",
  },
  {
    orderNumber: "OM260909-092315",
    orderedAt: "2026.09.09",
    orderedTime: "오후 3:15",
    items: [{ id: 1, quantity: 1 }, { id: 12, quantity: 2 }],
    fulfillment: "pickup",
    processStatus: "주문접수",
    payment: "transfer",
    paymentStatus: "결제대기",
    pickupRequest: "도착 전에 연락 부탁드립니다.",
    customerName: "홍길동",
    phone: "010-1234-5678",
    nicknameCode: "7942",
  },
  {
    orderNumber: "OM260908-071922",
    orderedAt: "2026.09.08",
    orderedTime: "오전 11:19",
    items: [{ id: 10, quantity: 2 }],
    fulfillment: "pickup",
    processStatus: "주문접수",
    payment: "onsite",
    paymentStatus: "결제대기",
    pickupRequest: "요청사항 없음",
    customerName: "홍길동",
    phone: "010-1234-5678",
    nicknameCode: "7942",
  },
  {
    orderNumber: "OM260907-063011",
    orderedAt: "2026.09.07",
    orderedTime: "오후 4:30",
    items: [{ id: 11, quantity: 1 }],
    fulfillment: "pickup",
    processStatus: "픽업완료",
    payment: "transfer",
    paymentStatus: "결제완료",
    pickupRequest: "요청사항 없음",
    customerName: "홍길동",
    phone: "010-1234-5678",
    nicknameCode: "7942",
  },
  {
    orderNumber: "OM260906-051418",
    orderedAt: "2026.09.06",
    orderedTime: "오후 1:14",
    items: [{ id: 6, quantity: 1 }],
    fulfillment: "pickup",
    processStatus: "주문접수",
    payment: "transfer",
    paymentStatus: "결제완료",
    cancelRefundStatus: "취소요청",
    actionActor: "구매자 요청",
    requestDate: "2026.09.06 오후 1:40",
    requestReason: "개인 일정으로 픽업이 어렵습니다.",
    refundBank: "국민은행",
    refundAccount: "1234-****-5678",
    refundHolder: "홍길동",
    sellerMemo: "",
    pickupRequest: "요청사항 없음",
    customerName: "홍길동",
    phone: "010-1234-5678",
    nicknameCode: "7942",
  },
  {
    orderNumber: "OM260905-043327",
    orderedAt: "2026.09.05",
    orderedTime: "오전 10:33",
    items: [{ id: 1, quantity: 1 }],
    fulfillment: "pickup",
    processStatus: "주문접수",
    payment: "transfer",
    paymentStatus: "결제완료",
    cancelRefundStatus: "취소반려",
    actionActor: "구매자 요청",
    requestDate: "2026.09.05 오전 11:02",
    resolvedAt: "2026.09.05 오후 12:20",
    requestReason: "다른 상품으로 다시 주문하려고 합니다.",
    refundBank: "신한은행",
    refundAccount: "110-***-123456",
    refundHolder: "홍길동",
    sellerMemo: "상품 준비가 완료되어 취소가 어렵습니다.",
    pickupRequest: "요청사항 없음",
    customerName: "홍길동",
    phone: "010-1234-5678",
    nicknameCode: "7942",
  },
  {
    orderNumber: "OM260904-032140",
    orderedAt: "2026.09.04",
    orderedTime: "오전 9:21",
    items: [{ id: 4, quantity: 1 }],
    fulfillment: "delivery",
    processStatus: "주문접수",
    payment: "card",
    paymentStatus: "결제취소",
    cancelRefundStatus: "취소승인",
    actionActor: "구매자 즉시취소",
    requestDate: "2026.09.04 오전 9:30",
    resolvedAt: "2026.09.04 오전 9:30",
    refundType: "전체환불",
    sellerMemo: "",
    deliveryAddressName: "우리집",
    deliveryAddress: "경기 수원시 영통구 온마을로 18, 온마을아파트 101동 1203호",
    deliveryRequest: "문 앞에 놓아주세요.",
    customerName: "홍길동",
    phone: "010-1234-5678",
    nicknameCode: "7942",
  },
  {
    orderNumber: "OM260903-022515",
    orderedAt: "2026.09.03",
    orderedTime: "오후 5:25",
    items: [{ id: 4, quantity: 1 }],
    fulfillment: "pickup",
    processStatus: "픽업완료",
    payment: "transfer",
    paymentStatus: "결제완료",
    cancelRefundStatus: "반품요청",
    actionActor: "구매자 요청",
    requestDate: "2026.09.03 오후 7:10",
    requestReason: "상품 일부가 손상되어 있었습니다.",
    refundBank: "국민은행",
    refundAccount: "1234-****-5678",
    refundHolder: "홍길동",
    sellerMemo: "",
    pickupRequest: "요청사항 없음",
    customerName: "홍길동",
    phone: "010-1234-5678",
    nicknameCode: "7942",
  },
  {
    orderNumber: "OM260902-011833",
    orderedAt: "2026.09.02",
    orderedTime: "오후 12:18",
    items: [{ id: 7, quantity: 1 }],
    fulfillment: "delivery",
    processStatus: "배달완료",
    payment: "card",
    paymentStatus: "결제취소",
    cancelRefundStatus: "반품승인",
    actionActor: "구매자 요청",
    requestDate: "2026.09.02 오후 5:30",
    resolvedAt: "2026.09.02 오후 6:10",
    refundType: "전체환불",
    requestReason: "주문한 상품과 다른 상품을 받았습니다.",
    sellerMemo: "확인 후 카드 환불을 완료했습니다.",
    deliveryAddressName: "우리집",
    deliveryAddress: "경기 수원시 영통구 온마을로 18, 온마을아파트 101동 1203호",
    deliveryRequest: "문 앞에 놓아주세요.",
    customerName: "홍길동",
    phone: "010-1234-5678",
    nicknameCode: "7942",
  },
  {
    orderNumber: "OM260901-001207",
    orderedAt: "2026.09.01",
    orderedTime: "오전 10:12",
    items: [{ id: 12, quantity: 2 }],
    fulfillment: "pickup",
    processStatus: "픽업완료",
    payment: "onsite",
    paymentStatus: "결제취소",
    cancelRefundStatus: "반품승인",
    actionActor: "구매자 요청",
    requestDate: "2026.09.01 오후 3:42",
    resolvedAt: "2026.09.02 오전 10:15",
    refundType: "부분환불",
    refundAmount: 5000,
    requestReason: "받은 상품 일부에 문제가 있습니다.",
    sellerMemo: "확인된 손상분 5,000원을 현장에서 환불했습니다.",
    pickupRequest: "요청사항 없음",
    customerName: "홍길동",
    phone: "010-1234-5678",
    nicknameCode: "7942",
  },
  {
    orderNumber: "OM260831-001208",
    orderedAt: "2026.08.31",
    orderedTime: "오후 1:12",
    items: [{ id: 3, quantity: 1 }],
    fulfillment: "pickup",
    processStatus: "픽업대기",
    payment: "transfer",
    paymentStatus: "결제취소",
    cancelRefundStatus: "취소승인",
    actionActor: "공급자 직권",
    resolvedAt: "2026.08.31 오후 2:10",
    refundType: "부분환불",
    refundAmount: 3000,
    sellerMemo: "상품 수량 확인 후 3,000원을 환불했습니다.",
    pickupRequest: "요청사항 없음",
    customerName: "홍길동",
    phone: "010-1234-5678",
    nicknameCode: "7942",
  },
  {
    orderNumber: "OM260830-001209",
    orderedAt: "2026.08.30",
    orderedTime: "오전 10:12",
    items: [{ id: 2, quantity: 1 }],
    fulfillment: "pickup",
    processStatus: "픽업대기",
    payment: "onsite",
    paymentStatus: "결제대기",
    cancelRefundStatus: "취소승인",
    actionActor: "노쇼처리",
    resolvedAt: "2026.08.31 오후 9:10",
    sellerMemo: "픽업 기간 종료 후 수령하지 않아 주문을 취소했습니다.",
    pickupRequest: "요청사항 없음",
    customerName: "홍길동",
    phone: "010-1234-5678",
    nicknameCode: "7942",
  },
];

// 주문 시점의 상품별 픽업 기간은 상품 수정과 무관하게 주문 데이터에 보관한다.
mockOrders.forEach((order, orderIndex) => {
  order.orderNumber = `RO20${order.orderNumber.slice(2, 8)}${String(orderIndex + 1).padStart(3, "0")}`;
  order.orderChannel ||= orderIndex === 3 ? "채팅주문" : "링크주문";
  const orderDate = new Date(order.orderedAt.replaceAll(".", "-").replace(/-$/, ""));
  order.items = order.items.map((item, itemIndex) => {
    const product = products.find((candidate) => candidate.id === item.id);
    if (order.fulfillment !== "pickup" || !product) return item;
    const start = new Date(orderDate);
    start.setDate(start.getDate() + (itemIndex === 0 ? 1 : 2));
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    const key = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return { ...item, pickupStart: key(start), pickupEnd: key(end) };
  });
  order.pickupWindow = order.fulfillment === "pickup" ? pickupWindowIntersection(order.items) : null;
});

// 목업에서 주문서로 생성한 주문도 간편 조회와 주문 상세에 이어서 표시한다.
try {
  const placedOrders = JSON.parse(localStorage.getItem("onmaeul-placed-orders") || "[]");
  if (Array.isArray(placedOrders)) {
    placedOrders.slice().reverse().forEach((order) => {
      if (!order?.orderNumber || !/^\d{4}$/.test(order.nicknameCode) || !Array.isArray(order.items)) return;
      if (mockOrders.some((item) => item.orderNumber === order.orderNumber)) return;
      mockOrders.unshift({
        ...order,
        orderedAt: order.orderedDate || String(order.orderedAt || "").slice(0, 12).trim(),
        items: order.items.map(({ id, quantity, pickupStart, pickupEnd }) => ({ id, quantity, pickupStart, pickupEnd })),
        processStatus: order.processStatus || "주문접수",
        paymentStatus: order.paymentStatus || (order.payment === "card" ? "결제완료" : "결제대기"),
      });
    });
  }
} catch {}

const pageContent = document.querySelector("#pageContent");
const categoryOpen = document.querySelector("#categoryOpen");
const categoryClose = document.querySelector("#categoryClose");
const categoryDrawer = document.querySelector("#categoryDrawer");
const drawerBackdrop = document.querySelector("#drawerBackdrop");
const categoryList = document.querySelector("#categoryList");
const searchPanel = document.querySelector("#searchPanel");
const searchOpen = document.querySelector("#searchOpen");
const searchClose = document.querySelector("#searchClose");
const productSearch = document.querySelector("#productSearch");
const cartCounts = document.querySelectorAll("[data-cart-count]");
const mobileSearchToggle = document.querySelector("#mobileSearchToggle");
const toast = document.querySelector("#toast");

let selectedCartKeys = null;
let activeCartFulfillment = "pickup";

function formatPrice(value) {
  return `${value.toLocaleString("ko-KR")}원`;
}

function phoneDigits(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 11);
}

function loggedInPhone() {
  try { return phoneDigits(JSON.parse(localStorage.getItem("onmaeul-login"))?.phone); } catch { return ""; }
}

function formatPhone(value) {
  const digits = phoneDigits(value);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function bindPhoneInputs() {
  document.querySelectorAll('input[type="tel"]').forEach((input) => {
    input.inputMode = "numeric";
    input.maxLength = 13;
    input.pattern = "[0-9]{3}-[0-9]{4}-[0-9]{4}";
    input.value = formatPhone(input.value);
    input.addEventListener("input", () => {
      const digitCount = phoneDigits(input.value.slice(0, input.selectionStart ?? input.value.length)).length;
      input.value = formatPhone(input.value);
      let position = 0;
      let seen = 0;
      while (position < input.value.length && seen < digitCount) {
        if (/\d/.test(input.value[position])) seen += 1;
        position += 1;
      }
      input.setSelectionRange(position, position);
    });
  });
}

function getProductPricing(product) {
  const regularPrice = Number(product.regularPrice) || product.price;
  const hasDiscount = regularPrice > product.price;
  const discountRate = hasDiscount ? Math.round((1 - product.price / regularPrice) * 100) : 0;
  return { regularPrice, hasDiscount, discountRate };
}

function productListPrice(product) {
  const pricing = getProductPricing(product);
  if (!pricing.hasDiscount) return `<span class="product-price-single">${formatPrice(product.price)}</span>`;
  return `<span class="product-sale-line"><b>${pricing.discountRate}%</b><strong>${formatPrice(product.price)}</strong></span><del class="product-regular-price">${formatPrice(pricing.regularPrice)}</del>`;
}

function productFulfillmentOptions(product) {
  const method = product.saleMethod || "픽업·배달";
  if (method === "픽업") return ["pickup"];
  if (method === "배달") return ["delivery"];
  return ["pickup", "delivery"];
}

function pickupPeriodText(start, end) {
  if (!start) return "픽업 일정 확인 필요";
  const short = (value) => value.slice(5, 10).replace("-", "/");
  return end && end !== start ? `${short(start)}~${short(end)}` : short(start);
}

function fulfillmentBadges(product, selected = null) {
  const options = selected ? [selected] : productFulfillmentOptions(product);
  return options.map((option) => `<span class="fulfillment-badge">${fulfillmentName(option)}</span>`).join("");
}

function pickupWindowIntersection(rows) {
  if (!rows.length) return null;
  // 장바구니와 주문서는 현재 상품의 픽업일을 사용하고, 과거 주문은 저장된 주문 시점의 일자를 사용한다.
  const starts = rows.map((row) => row.product?.pickupStart || row.pickupStart).filter(Boolean);
  const ends = rows.map((row) => row.product?.pickupEnd || row.pickupEnd).filter(Boolean);
  if (starts.length !== rows.length || ends.length !== rows.length) return null;
  const start = starts.sort().at(-1);
  const end = ends.sort()[0];
  return start <= end ? { start, end } : null;
}

function productIsPickupAvailableOn(product, dateKey) {
  return productFulfillmentOptions(product).includes("pickup") && product.pickupStart <= dateKey && dateKey <= product.pickupEnd;
}

function isRetailExposed(product) {
  return product.retailExposure === "노출중";
}

function isSoldOut(product) {
  return Boolean(product.soldOut || product.stock < 1);
}

function normalizeFulfillment(product, fulfillment) {
  const options = productFulfillmentOptions(product);
  return options.includes(fulfillment) ? fulfillment : options[0];
}

function cartItemKey(item) {
  return `${item.id}:${item.fulfillment}`;
}

function fulfillmentName(value) {
  return value === "delivery" ? "배달" : "픽업";
}
function readCart() {
  let cart;
  try {
    const stored = JSON.parse(localStorage.getItem("onmaeul-cart"));
    if (Array.isArray(stored)) cart = stored;
  } catch {}
  if (!cart) {
    cart = [{ id: 1, quantity: 1, fulfillment: "pickup" }, { id: 6, quantity: 1, fulfillment: "pickup" }, { id: 3, quantity: 1, fulfillment: "delivery" }, { id: 5, quantity: 1, fulfillment: "delivery" }];
    localStorage.setItem("onmaeul-cart-soldout-seeded-v2", "1");
  }
  else if (cart.length && !localStorage.getItem("onmaeul-cart-soldout-seeded-v2")) {
    if (!cart.some((item) => item.id === 5)) {
      cart.push({ id: 5, quantity: 1, fulfillment: "delivery" });
      localStorage.setItem("onmaeul-cart", JSON.stringify(cart));
    }
    localStorage.setItem("onmaeul-cart-soldout-seeded-v2", "1");
  }
  const normalized = cart.map((item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    if (!product) return item;
    return { ...item, fulfillment: normalizeFulfillment(product, item.fulfillment) };
  });
  if (JSON.stringify(normalized) !== JSON.stringify(cart)) localStorage.setItem("onmaeul-cart", JSON.stringify(normalized));
  else if (!localStorage.getItem("onmaeul-cart")) localStorage.setItem("onmaeul-cart", JSON.stringify(normalized));
  return normalized;
}
function writeCart(cart) {
  localStorage.setItem("onmaeul-cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = String(readCart().reduce((sum, item) => sum + item.quantity, 0));
  cartCounts.forEach((element) => { element.textContent = count; });
}

function showToast(message) {
  window.clearTimeout(showToast.timer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function escapeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll(String.fromCharCode(39), "&#039;");
}

function saveOrderDraft(items, source) {
  const rows = items.map((item) => ({ ...item, product: products.find((product) => product.id === item.id) })).filter((item) => item.product);
  if (rows.some((item) => isSoldOut(item.product))) return showToast("품절 상품은 주문할 수 없습니다. 장바구니를 확인해 주세요.");
  if (rows.some((item) => item.fulfillment === "pickup") && !pickupWindowIntersection(rows)) {
    return showToast("선택한 상품의 픽업 가능일이 겹치지 않습니다. 상품을 나눠 주문해 주세요.");
  }
  sessionStorage.setItem("onmaeul-order-draft", JSON.stringify({ items, source }));
  if (!ensureOrderMember()) return;
  window.location.href = "?view=order";
}

function ensureOrderMember() {
  if (!loggedInPhone()) {
    sessionStorage.setItem("onmaeul-after-login", "?view=order");
    window.alert("주문하려면 로그인이 필요합니다.");
    window.location.href = "?view=login";
    return false;
  }
  const member = readMemberProfile();
  if (!member.customerName?.trim() || !member.email?.trim() || !/^\d{4}$/.test(member.nicknameCode || "")) {
    window.alert("회원정보를 등록한 뒤 주문할 수 있습니다.");
    window.location.href = "?view=my-info";
    return false;
  }
  return true;
}

function readOrderDraft() {
  try {
    const draft = JSON.parse(sessionStorage.getItem("onmaeul-order-draft"));
    if (draft && Array.isArray(draft.items) && draft.items.length) return draft;
  } catch {}
  const cart = readCart();
  const fulfillment = cart[0]?.fulfillment || "pickup";
  return { items: cart.filter((item) => item.fulfillment === fulfillment), source: "cart-all", fulfillment };
}

function orderRowsFromDraft(draft) {
  return draft.items
    .map((item) => ({ ...item, product: products.find((product) => product.id === item.id) }))
    .filter((item) => item.product && item.quantity > 0);
}

function productImage(product, size = "card") {
  if (product.imagePosition) {
    return `<span class="product-image ${size === "detail" ? "is-detail" : ""}"><img src="./banner-seasonal-produce.png" alt="${product.name}" style="object-position:${product.imagePosition}" /></span>`;
  }
    return `<span class="product-image product-placeholder ${size === "detail" ? "is-detail" : ""}"><span>${product.category2} 상품 이미지</span></span>`;
}

function productCard(product) {
  const pickupText = productFulfillmentOptions(product).includes("pickup") ? `<span class="pickup-date-text">${pickupPeriodText(product.pickupStart, product.pickupEnd)}</span>` : "";
  const soldOut = isSoldOut(product);
  return `
    <article class="product-card${soldOut ? " is-soldout" : ""}">
      <a class="product-link" href="?view=product&id=${product.id}" aria-label="${product.name} 상세보기">
        ${productImage(product)}
        ${soldOut ? `<span class="product-soldout-badge">품절</span>` : ""}
        <span class="product-hover">상품 상세보기 →</span>
        <span class="product-copy">
          <span class="product-availability">${fulfillmentBadges(product)}${pickupText}</span>
          <span class="product-category">${product.category1} &gt; ${product.category2}</span>
          <strong class="product-name">${product.name}</strong>
          <span class="product-pricing">${productListPrice(product)}</span>
        </span>
      </a>
    </article>`;
}

function renderMain() {
  const featured = products.filter((product) => isRetailExposed(product) && product.featured).slice(0, 8);
  const todayPickup = products.filter((product) => isRetailExposed(product) && productIsPickupAvailableOn(product, localDateKey())).slice(0, 4);
  const deliveryAvailable = products.filter((product) => isRetailExposed(product) && productFulfillmentOptions(product).includes("delivery")).slice(0, 4);
  pageContent.innerHTML = `
    <section class="store-information" aria-labelledby="storeInfoTitle">
      <h1 id="storeInfoTitle" class="sr-only">매장 정보</h1>
      <div class="site-width store-info-grid">
        <div class="info-item"><span>상호</span><strong>온마을 공동구매</strong></div>
        <div class="info-item"><span>픽업 주소</span><strong>경기 수원시 영통구 온마을로 27, 1층</strong></div>
        <div class="info-item"><span>문의 전화</span><a href="tel:0312050927">031-205-0927</a></div>
        <div class="info-item"><span>영업시간</span><strong>매일 10:00–20:00</strong></div>
        <div class="info-item bank-info">
          <span>계좌이체</span>
          <div><strong id="bankAccount">국민 123456-01-123456 · 온마을마켓</strong><button class="copy-button" id="copyAccount" type="button">복사</button></div>
        </div>
      </div>
    </section>
    <section class="site-width main-content">
      ${todayPickup.length ? `<section class="featured-section availability-section" aria-labelledby="todayPickupTitle">
        <div class="section-heading"><div><h1 id="todayPickupTitle">오늘 픽업 가능 상품</h1><p>오늘 매장에서 픽업할 수 있는 상품을 만나보세요.</p></div><a href="?view=catalog&pickupDate=${localDateKey()}">픽업상품 보기 →</a></div>
        <div class="product-grid">${todayPickup.map(productCard).join("")}</div>
      </section>` : ""}
      ${deliveryAvailable.length ? `<section class="featured-section availability-section" aria-labelledby="deliveryAvailableTitle">
        <div class="section-heading"><div><h1 id="deliveryAvailableTitle">배달 가능 상품</h1><p>우리 동네에서 배달받을 수 있는 상품을 확인해 보세요.</p></div><a href="?view=catalog&fulfillment=delivery">배달상품 보기 →</a></div>
        <div class="product-grid">${deliveryAvailable.map(productCard).join("")}</div>
      </section>` : ""}

      <section class="featured-section" aria-labelledby="featuredTitle">
        <div class="section-heading">
          <div><h1 id="featuredTitle">메인 상품</h1><p>지금 주문할 수 있는 상품을 확인해 보세요.</p></div>
          <a href="?view=catalog">전체상품 보기 →</a>
        </div>
        <div class="product-grid">${featured.map(productCard).join("")}</div>
      </section>
    </section>`;
  bindAccountCopy();
}

function renderCatalog(params) {
  const category1 = params.get("category1") || "";
  const category2 = params.get("category2") || "";
  const query = (params.get("q") || "").trim();
  const pickupDate = params.get("pickupDate") === "today" ? localDateKey() : params.get("pickupDate") || "";
  const fulfillment = params.get("fulfillment") || "";
  const visible = products.filter((product) => {
    const categoryMatch = (!category1 || product.category1 === category1) && (!category2 || product.category2 === category2);
    const queryMatch = !query || product.name.includes(query) || product.category1.includes(query) || product.category2.includes(query);
    const fulfillmentMatch = pickupDate ? productIsPickupAvailableOn(product, pickupDate) : !fulfillment || productFulfillmentOptions(product).includes(fulfillment);
    return isRetailExposed(product) && categoryMatch && queryMatch && fulfillmentMatch;
  });
  const title = query ? `‘${query}’ 검색결과` : pickupDate ? `${pickupPeriodText(pickupDate, pickupDate)} 픽업 가능 상품` : fulfillment === "delivery" ? "배달 가능 상품" : category2 || category1 || "전체상품";
  pageContent.innerHTML = `
    <section class="site-width catalog-page">
      <div class="page-heading">
        <div><span>${query ? "검색 결과" : "상품 카테고리"}</span><h1>${title}</h1></div>
        <strong>총 ${visible.length}개</strong>
      </div>
      ${pickupDate ? `<nav class="pickup-date-nav" aria-label="픽업 가능일 선택">${Array.from({ length: 7 }, (_, index) => {
        const date = localDateKey(index);
        return `<a class="${pickupDate === date ? "is-active" : ""}" href="?view=catalog&pickupDate=${date}">${index === 0 ? "오늘 " : ""}${pickupPeriodText(date, date)}</a>`;
      }).join("")}</nav>` : ""}
      ${visible.length ? `<div class="product-grid">${visible.map(productCard).join("")}</div>` : `<div class="empty-state"><strong>조건에 맞는 상품이 없습니다.</strong><a class="secondary-button" href="?view=catalog">전체상품 보기</a></div>`}
    </section>`;
}

function renderProduct(params) {
  const product = products.find((item) => item.id === Number(params.get("id"))) || products[0];
  const pricing = getProductPricing(product);
  const fulfillmentOptions = productFulfillmentOptions(product);
  const defaultFulfillment = normalizeFulfillment(product);
  const soldOut = isSoldOut(product);
  const maxPurchase = Math.max(1, Math.min(product.maxPurchase || 5, product.stock || 1));
  const galleryPositions = product.galleryPositions || [product.imagePosition || "65% center", "50% center", "82% center"];
  const galleryImages = galleryPositions.map((position, index) => ({
    src: "./banner-seasonal-produce.png",
    position,
    alt: `${product.name} 상품 이미지 ${index + 1}`,
  }));
  pageContent.innerHTML = `
    <section class="site-width detail-page">
      <div class="detail-inner">
        <nav class="breadcrumb" aria-label="현재 위치">
          <a href="./index.html">홈</a><span>›</span>
          <a href="?view=catalog&category1=${encodeURIComponent(product.category1)}">${product.category1}</a><span>›</span>
          <a href="?view=catalog&category1=${encodeURIComponent(product.category1)}&category2=${encodeURIComponent(product.category2)}">${product.category2}</a>
        </nav>
        <div class="detail-layout">
          <div class="product-gallery" aria-label="상품 이미지 갤러리">
            <div class="gallery-stage" id="galleryStage">
              <img id="detailGalleryImage" src="${galleryImages[0].src}" alt="${galleryImages[0].alt}" style="object-position:${galleryImages[0].position}" />
              <button class="gallery-arrow gallery-prev" id="galleryPrev" type="button" aria-label="이전 상품 이미지">‹</button>
              <button class="gallery-arrow gallery-next" id="galleryNext" type="button" aria-label="다음 상품 이미지">›</button>
              <span class="gallery-counter"><b id="galleryCurrent">1</b> / ${galleryImages.length}</span>
            </div>
            <div class="gallery-thumbnails" aria-label="상품 이미지 선택">
              ${galleryImages.map((image, index) => `<button class="gallery-thumbnail ${index === 0 ? "is-active" : ""}" type="button" data-gallery-index="${index}" aria-label="상품 이미지 ${index + 1} 보기"><img src="${image.src}" alt="" style="object-position:${image.position}" /></button>`).join("")}
            </div>
          </div>
          <div class="detail-copy">
            <span class="product-category">${product.category1} &gt; ${product.category2}</span>
            <div class="detail-title-row"><h1>${product.name}</h1>${soldOut ? `<span class="soldout-badge">품절</span>` : ""}</div>
            <div class="detail-price-block">
              ${pricing.hasDiscount
                ? `<div><span class="price-label">할인가</span><strong class="detail-price">${formatPrice(product.price)}</strong><b class="discount-rate">${pricing.discountRate}%</b></div><div class="regular-price"><span class="price-label">소비자가</span><del>${formatPrice(pricing.regularPrice)}</del></div>`
                : `<div><span class="price-label">소비자가</span><strong class="detail-price">${formatPrice(product.price)}</strong></div>`}
            </div>
            <dl class="detail-list">
              <div><dt>상품 구성</dt><dd>${product.composition || `${product.name} 1개`}</dd></div>
              <div><dt>1회 최대구매수량</dt><dd>${maxPurchase}개</dd></div>
              <div><dt>원산지</dt><dd>${product.origin || "국내산"}</dd></div>
              <div><dt>소비기한</dt><dd>${product.expiry || "수령 후 냉장 보관 3일"}</dd></div>
              ${fulfillmentOptions.includes("pickup") ? `<div><dt>픽업가능일</dt><dd>${pickupPeriodText(product.pickupStart, product.pickupEnd)}</dd></div>` : ""}
              ${fulfillmentOptions.includes("delivery") ? `<div><dt>배달비</dt><dd>${formatPrice(DELIVERY_FEE)}</dd></div>` : ""}
            </dl>
            <fieldset class="detail-fulfillment">
              <legend>수령 방식</legend>
              <div class="detail-fulfillment-options">
                ${fulfillmentOptions.map((fulfillment) => `<label><input type="radio" name="productFulfillment" value="${fulfillment}" ${fulfillment === defaultFulfillment ? "checked" : ""} /><span>${fulfillmentName(fulfillment)}</span></label>`).join("")}
              </div>
            </fieldset>
            <div class="quantity-row">
              <span>수량</span>
              <div class="quantity-stepper" aria-label="상품 수량 선택">
                <button id="qtyMinus" type="button" aria-label="수량 줄이기" ${soldOut ? "disabled" : ""}>−</button>
                <input id="productQuantity" type="text" value="1" readonly aria-label="선택 수량" ${soldOut ? "disabled" : ""} />
                <button id="qtyPlus" type="button" aria-label="수량 늘리기" ${soldOut ? "disabled" : ""}>+</button>
              </div>
            </div>
            <div class="detail-total"><span>총 상품금액</span><strong id="detailTotal">${formatPrice(product.price)}</strong></div>
            <div class="detail-actions"><button class="secondary-button" id="addToCart" type="button" ${soldOut ? "disabled" : ""}>장바구니 담기</button><button class="primary-button" id="buyNow" type="button" ${soldOut ? "disabled" : ""}>바로 주문</button></div>
          </div>
        </div>
        <section class="simple-description">
          <div class="description-copy">
            <span>온마을 공동구매 상품</span>
            <h2>싱싱한 제철 먹거리를 함께 준비했습니다</h2>
            <p>산지와 입고 상태를 확인한 상품으로, 공동구매 주문 마감 후 온마을 매장에서 수령할 수 있습니다.</p>
            <dl>
              <div><dt>상품 특징</dt><dd>제철 산지 상품을 공동구매 수량에 맞춰 준비합니다.</dd></div>
              <div><dt>보관 방법</dt><dd>수령 후 냉장 보관하고 가급적 빠르게 드세요.</dd></div>
              <div><dt>수령 안내</dt><dd>수령 예정일에 주문자명과 연락처를 확인해 주세요.</dd></div>
            </dl>
          </div>
          <img src="./banner-seasonal-produce.png" alt="온마을 공동구매에서 준비한 신선한 농산물" />
        </section>
      </div>
    </section>`;

  let activeImage = 0;
  const galleryImage = document.querySelector("#detailGalleryImage");
  const galleryCurrent = document.querySelector("#galleryCurrent");
  const thumbnailButtons = [...document.querySelectorAll("[data-gallery-index]")];
  const updateGallery = (nextIndex) => {
    activeImage = (nextIndex + galleryImages.length) % galleryImages.length;
    const image = galleryImages[activeImage];
    galleryImage.src = image.src;
    galleryImage.alt = image.alt;
    galleryImage.style.objectPosition = image.position;
    galleryCurrent.textContent = String(activeImage + 1);
    thumbnailButtons.forEach((button, index) => button.classList.toggle("is-active", index === activeImage));
  };
  document.querySelector("#galleryPrev").addEventListener("click", () => updateGallery(activeImage - 1));
  document.querySelector("#galleryNext").addEventListener("click", () => updateGallery(activeImage + 1));
  thumbnailButtons.forEach((button) => button.addEventListener("click", () => updateGallery(Number(button.dataset.galleryIndex))));
  let touchStartX = 0;
  const galleryStage = document.querySelector("#galleryStage");
  galleryStage.addEventListener("touchstart", (event) => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
  galleryStage.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 45) updateGallery(activeImage + (distance < 0 ? 1 : -1));
  }, { passive: true });

  let quantity = 1;
  const quantityInput = document.querySelector("#productQuantity");
  const minusButton = document.querySelector("#qtyMinus");
  const plusButton = document.querySelector("#qtyPlus");
  const detailTotal = document.querySelector("#detailTotal");
  const updateQuantity = () => {
    quantityInput.value = String(quantity);
    detailTotal.textContent = formatPrice(product.price * quantity);
    minusButton.disabled = soldOut || quantity <= 1;
    plusButton.disabled = soldOut || quantity >= maxPurchase;
  };
  minusButton.addEventListener("click", () => { quantity = Math.max(1, quantity - 1); updateQuantity(); });
  plusButton.addEventListener("click", () => { quantity = Math.min(maxPurchase, quantity + 1); updateQuantity(); });
  updateQuantity();
  if (!soldOut) {
    const getSelectedFulfillment = () => document.querySelector('[name="productFulfillment"]:checked')?.value || defaultFulfillment;
    document.querySelector("#addToCart").addEventListener("click", () => addProductToCart(product, getSelectedFulfillment()));
    document.querySelector("#buyNow").addEventListener("click", () => {
      const fulfillment = getSelectedFulfillment();
      saveOrderDraft([{ id: product.id, quantity, fulfillment }], "direct", fulfillment);
    });
  }
}

function addProductToCart(product, fulfillment) {
  const quantity = Number(document.querySelector("#productQuantity").value);
  const selectedFulfillment = normalizeFulfillment(product, fulfillment);
  const cart = readCart();
  const existing = cart.find((item) => item.id === product.id && item.fulfillment === selectedFulfillment);
  const limit = Math.max(1, Math.min(product.maxPurchase || 5, product.stock || 1));
  if (existing) existing.quantity = Math.min(limit, existing.quantity + quantity);
  else cart.push({ id: product.id, quantity, fulfillment: selectedFulfillment });
  writeCart(cart);
  showToast(`${product.name} ${quantity}개를 ${fulfillmentName(selectedFulfillment)} 장바구니에 담았습니다.`);
}
function closeFulfillmentChangeModal() {
  document.querySelector("#fulfillmentChangeModal")?.remove();
}

function openFulfillmentChangeModal(item) {
  closeFulfillmentChangeModal();
  const currentName = fulfillmentName(item.fulfillment);
  const modal = document.createElement("div");
  modal.id = "fulfillmentChangeModal";
  modal.className = "fulfillment-modal-backdrop";
  modal.innerHTML = `
    <section class="fulfillment-change-modal" role="dialog" aria-modal="true" aria-labelledby="fulfillmentModalTitle">
      <div class="fulfillment-modal-heading"><div><span>수령방식 변경</span><h2 id="fulfillmentModalTitle">${item.product.name}</h2></div><button type="button" data-fulfillment-close aria-label="닫기">×</button></div>
      <p>변경할 수령방식을 선택해 주세요. 변경한 상품은 선택한 장바구니 탭으로 이동합니다.</p>
      <form id="fulfillmentChangeForm">
        <div class="fulfillment-change-options">
          <label><input type="radio" name="nextFulfillment" value="pickup" ${item.fulfillment === "pickup" ? "checked" : ""} /><span><b>픽업</b><small>매장에서 직접 수령</small></span></label>
          <label><input type="radio" name="nextFulfillment" value="delivery" ${item.fulfillment === "delivery" ? "checked" : ""} /><span><b>배달</b><small>등록한 주소로 배달</small></span></label>
        </div>
        <div class="fulfillment-modal-actions"><button class="secondary-button" type="button" data-fulfillment-close>취소</button><button class="primary-button" type="submit">변경</button></div>
      </form>
    </section>`;
  document.body.appendChild(modal);
  modal.querySelectorAll("[data-fulfillment-close]").forEach((button) => button.addEventListener("click", closeFulfillmentChangeModal));
  modal.addEventListener("click", (event) => { if (event.target === modal) closeFulfillmentChangeModal(); });
  modal.querySelector("#fulfillmentChangeForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const nextFulfillment = event.currentTarget.elements.nextFulfillment.value;
    if (nextFulfillment === item.fulfillment) { closeFulfillmentChangeModal(); return; }
    const cart = readCart();
    const sourceKey = cartItemKey(item);
    const sourceIndex = cart.findIndex((cartItem) => cartItemKey(cartItem) === sourceKey);
    if (sourceIndex < 0) return closeFulfillmentChangeModal();
    const source = cart[sourceIndex];
    const destination = cart.find((cartItem, index) => index !== sourceIndex && cartItem.id === source.id && cartItem.fulfillment === nextFulfillment);
    if (destination) {
      const limit = Math.max(1, Math.min(item.product.maxPurchase || 5, item.product.stock || 1));
      destination.quantity = Math.min(limit, destination.quantity + source.quantity);
      cart.splice(sourceIndex, 1);
    } else {
      source.fulfillment = nextFulfillment;
    }
    writeCart(cart);
    activeCartFulfillment = nextFulfillment;
    selectedCartKeys = null;
    closeFulfillmentChangeModal();
    renderCart();
    showToast(`${item.product.name}을(를) ${fulfillmentName(nextFulfillment)} 장바구니로 이동했습니다.`);
  });
  modal.querySelector(`input[value="${item.fulfillment}"]`)?.focus();
}

function renderCart() {
  const cart = readCart();
  const allRows = cart.map((item) => ({ ...item, product: products.find((product) => product.id === item.id) })).filter((item) => item.product);
  const rows = allRows.filter((item) => item.fulfillment === activeCartFulfillment);
  const orderableRows = rows.filter((item) => !isSoldOut(item.product));
  const activeKeys = new Set(orderableRows.map(cartItemKey));
  if (selectedCartKeys === null) selectedCartKeys = new Set();
  else selectedCartKeys = new Set([...selectedCartKeys].filter((key) => activeKeys.has(key)));
  const selectedRows = rows.filter((item) => selectedCartKeys.has(cartItemKey(item)));
  const selectedPickupWindow = activeCartFulfillment === "pickup" && selectedRows.length ? pickupWindowIntersection(selectedRows) : null;
  const allPickupWindow = activeCartFulfillment === "pickup" && orderableRows.length ? pickupWindowIntersection(orderableRows) : null;
  const selectedTotal = selectedRows.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const allTotal = orderableRows.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const allDeliveryFee = activeCartFulfillment === "delivery" && orderableRows.length ? DELIVERY_FEE : 0;
  const pickupCount = allRows.filter((item) => item.fulfillment === "pickup").length;
  const deliveryCount = allRows.filter((item) => item.fulfillment === "delivery").length;
  pageContent.innerHTML = `
    <section class="site-width cart-page">
      <div class="page-heading"><div><span>주문할 상품 확인</span><h1>장바구니</h1></div><strong>총 ${allRows.length}종</strong></div>
      <div class="cart-tabs" role="tablist" aria-label="수령방식별 장바구니">
        <button type="button" role="tab" data-cart-tab="pickup" aria-selected="${activeCartFulfillment === "pickup"}" class="${activeCartFulfillment === "pickup" ? "is-active" : ""}">픽업 <span>${pickupCount}</span></button>
        <button type="button" role="tab" data-cart-tab="delivery" aria-selected="${activeCartFulfillment === "delivery"}" class="${activeCartFulfillment === "delivery" ? "is-active" : ""}">배달 <span>${deliveryCount}</span></button>
      </div>
      ${rows.length ? `
        <div class="cart-toolbar">
          <label><input id="cartSelectAll" type="checkbox" ${orderableRows.length && selectedRows.length === orderableRows.length ? "checked" : ""} ${orderableRows.length ? "" : "disabled"} /> 전체선택 <span>${selectedRows.length}개 선택</span></label>
          <button class="selection-delete-button" id="deleteSelected" type="button" ${selectedRows.length ? "" : "disabled"}>선택삭제</button>
        </div>
        <div class="cart-list">${rows.map((item) => {
          const { product, quantity } = item;
          const key = cartItemKey(item);
          const canChange = productFulfillmentOptions(product).length > 1;
          const soldOut = isSoldOut(product);
          return `
          <article class="cart-row${soldOut ? " is-soldout" : ""}" data-cart-key="${key}">
            <label class="cart-select"><input type="checkbox" data-cart-select="${key}" ${selectedCartKeys.has(key) ? "checked" : ""} ${soldOut ? "disabled" : ""} aria-label="${product.name} 선택" /></label>
            <div class="cart-image-wrap">${productImage(product)}${soldOut ? `<span class="product-soldout-badge">품절</span>` : ""}</div>
            <div class="cart-product"><span class="product-category">${product.category1} &gt; ${product.category2}</span><a href="?view=product&id=${product.id}">${product.name}</a><span class="product-pricing cart-product-pricing">${productListPrice(product)}</span><div class="cart-fulfillment">${fulfillmentBadges(product, item.fulfillment)}${item.fulfillment === "pickup" ? `<span>${pickupPeriodText(product.pickupStart, product.pickupEnd)}</span>` : ""}${canChange && !soldOut ? `<button type="button" data-change-fulfillment="${key}">변경</button>` : ""}</div></div>
            <div class="cart-row-controls">
              <div class="cart-quantity-stepper" aria-label="${product.name} 수량 조절">
                <button type="button" data-cart-quantity-action="minus" data-cart-key="${key}" aria-label="수량 줄이기" ${soldOut || quantity <= 1 ? "disabled" : ""}>−</button>
                <span>${quantity}</span>
                <button type="button" data-cart-quantity-action="plus" data-cart-key="${key}" aria-label="수량 늘리기" ${soldOut || quantity >= Math.max(1, Math.min(product.maxPurchase || 5, product.stock || 1)) ? "disabled" : ""}>+</button>
              </div>
              <strong class="cart-line-total">${formatPrice(product.price * quantity)}</strong>
            </div>
            <button class="remove-button" type="button" data-remove="${key}">삭제</button>
          </article>`;
        }).join("")}</div>
        <div class="cart-summary">
          <div class="cart-summary-prices">
            <span>선택상품 금액 <strong>${formatPrice(selectedTotal)}</strong></span>
            ${activeCartFulfillment === "delivery" ? `<span>배달비 <strong>${formatPrice(allDeliveryFee)}</strong></span>` : ""}
            <span class="cart-summary-total">총 주문금액 <strong>${formatPrice(allTotal + allDeliveryFee)}</strong></span>
            ${activeCartFulfillment === "pickup" ? `<span class="cart-summary-pickup">${allPickupWindow ? `공통 픽업가능일 <strong>${pickupPeriodText(allPickupWindow.start, allPickupWindow.end)}</strong>` : `공통 픽업가능일이 없습니다. 상품을 나눠 선택해주세요.`}</span>` : ""}
          </div>
          <div class="cart-order-actions"><button class="secondary-button" id="orderSelected" type="button" ${selectedRows.length && (activeCartFulfillment !== "pickup" || selectedPickupWindow) ? "" : "disabled"}>선택상품 주문</button><button class="primary-button" id="orderAll" type="button" ${orderableRows.length && (activeCartFulfillment !== "pickup" || allPickupWindow) ? "" : "disabled"}>전체주문</button></div>
        </div>` : `<div class="empty-state"><strong>${fulfillmentName(activeCartFulfillment)} 장바구니가 비어 있습니다.</strong><p>다른 탭을 확인하거나 상품을 담아 주세요.</p><a class="primary-button" href="?view=catalog">상품 보러가기</a></div>`}
    </section>`;

  document.querySelectorAll("[data-cart-tab]").forEach((button) => button.addEventListener("click", () => {
    activeCartFulfillment = button.dataset.cartTab;
    selectedCartKeys = null;
    renderCart();
  }));
  const selectAll = document.querySelector("#cartSelectAll");
  if (selectAll) {
    selectAll.indeterminate = selectedRows.length > 0 && selectedRows.length < orderableRows.length;
    selectAll.addEventListener("change", () => { selectedCartKeys = selectAll.checked ? new Set(orderableRows.map(cartItemKey)) : new Set(); renderCart(); });
  }
  document.querySelectorAll("[data-cart-select]").forEach((checkbox) => checkbox.addEventListener("change", () => {
    const key = checkbox.dataset.cartSelect;
    if (checkbox.checked) selectedCartKeys.add(key); else selectedCartKeys.delete(key);
    renderCart();
  }));
  document.querySelector("#deleteSelected")?.addEventListener("click", () => {
    writeCart(readCart().filter((item) => !selectedCartKeys.has(cartItemKey(item))));
    selectedCartKeys.clear();
    renderCart();
  });
  document.querySelectorAll("[data-cart-quantity-action]").forEach((button) => button.addEventListener("click", () => {
    const next = readCart();
    const item = next.find((cartItem) => cartItemKey(cartItem) === button.dataset.cartKey);
    const product = item && products.find((productItem) => productItem.id === item.id);
    if (item && product) {
      const limit = Math.max(1, Math.min(product.maxPurchase || 5, product.stock || 1));
      item.quantity = button.dataset.cartQuantityAction === "plus" ? Math.min(limit, item.quantity + 1) : Math.max(1, item.quantity - 1);
    }
    writeCart(next);
    renderCart();
  }));
  document.querySelectorAll("[data-remove]").forEach((button) => button.addEventListener("click", () => {
    const key = button.dataset.remove;
    writeCart(readCart().filter((item) => cartItemKey(item) !== key));
    selectedCartKeys.delete(key);
    renderCart();
  }));
  document.querySelectorAll("[data-change-fulfillment]").forEach((button) => button.addEventListener("click", () => {
    const item = allRows.find((row) => cartItemKey(row) === button.dataset.changeFulfillment);
    if (item) openFulfillmentChangeModal(item);
  }));
  document.querySelector("#orderSelected")?.addEventListener("click", () => saveOrderDraft(selectedRows.map(({ id, quantity, fulfillment }) => ({ id, quantity, fulfillment })), "cart-selected", activeCartFulfillment));
  document.querySelector("#orderAll")?.addEventListener("click", () => saveOrderDraft(orderableRows.map(({ id, quantity, fulfillment }) => ({ id, quantity, fulfillment })), "cart-all", activeCartFulfillment));
  bindNoticeButtons();
}
function renderOrder() {
  if (!ensureOrderMember()) return;
  const draft = readOrderDraft();
  const rows = orderRowsFromDraft(draft);
  const lockedFulfillment = draft.fulfillment || rows[0]?.fulfillment || null;
  if (!rows.length) {
    pageContent.innerHTML = `<section class="site-width checkout-page"><div class="empty-state"><strong>주문할 상품이 없습니다.</strong><a class="primary-button" href="?view=catalog">상품 보러가기</a></div></section>`;
    return;
  }
  const member = readMemberProfile();
  const hasSavedAddress = Boolean(member.address);
  const productTotal = rows.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const pickupWindow = lockedFulfillment === "pickup" ? pickupWindowIntersection(rows) : null;
  if (lockedFulfillment === "pickup" && !pickupWindow) {
    pageContent.innerHTML = `<section class="site-width checkout-page"><div class="empty-state"><strong>상품들의 픽업 가능일이 겹치지 않습니다.</strong><p>장바구니에서 상품을 나눠 주문해 주세요.</p><a class="primary-button" href="?view=cart">장바구니로 돌아가기</a></div></section>`;
    return;
  }
  pageContent.innerHTML = `
    <section class="site-width checkout-page">
      <nav class="breadcrumb" aria-label="현재 위치"><a href="./index.html">홈</a><span>›</span><span>주문서</span></nav>
      <div class="page-heading checkout-heading"><div><span>주문 정보를 확인해 주세요</span><h1>주문서</h1></div></div>
      <form id="orderForm" class="checkout-layout">
        <div class="checkout-main">
          <section class="checkout-section" aria-labelledby="orderProductsTitle">
            <div class="checkout-section-title"><span>01</span><h2 id="orderProductsTitle">주문상품</h2></div>
            <div class="checkout-order-list">
              ${rows.map(({ product, quantity }) => `<article class="checkout-order-row">${productImage(product)}<div><span class="product-category">${product.category1} &gt; ${product.category2}</span><strong>${product.name}</strong><small>수량 ${quantity}개</small>${lockedFulfillment === "pickup" ? `<small>${pickupPeriodText(product.pickupStart, product.pickupEnd)} 픽업</small>` : ""}</div><b>${formatPrice(product.price * quantity)}</b></article>`).join("")}
            </div>
          </section>

          <section class="checkout-section" aria-labelledby="customerTitle">
            <div class="checkout-section-title"><span>02</span><h2 id="customerTitle">주문자 정보</h2></div>
            <div class="checkout-form-grid member-grid">
              <label class="checkout-field"><span>주문자명</span><input id="customerName" name="customerName" type="text" value="${escapeText(member.customerName)}" required /></label>
              <label class="checkout-field"><span>휴대폰번호</span><input id="customerPhone" name="customerPhone" type="tel" value="${escapeText(formatPhone(member.phone))}" required /></label>
              <label class="checkout-field"><span>회원주문 코드</span><input id="customerNicknameCode" type="text" value="${escapeText(member.nicknameCode)}" readonly /><small class="field-message">회원정보에서 불러온 숫자 4자리 코드입니다.</small></label>
            </div>
          </section>

          <section class="checkout-section" aria-labelledby="fulfillmentTitle">
            <div class="checkout-section-title"><span>03</span><h2 id="fulfillmentTitle">수령 방식</h2></div>
            <div class="choice-cards fulfillment-options">
              <label class="choice-card"><input type="radio" name="fulfillment" value="pickup" ${lockedFulfillment === "delivery" ? "disabled" : "checked"} /><span><b>픽업</b><small>매장에서 직접 수령합니다.</small></span></label>
              <label class="choice-card"><input type="radio" name="fulfillment" value="delivery" ${lockedFulfillment === "delivery" ? "checked" : lockedFulfillment === "pickup" ? "disabled" : ""} /><span><b>배달</b><small>입력한 주소로 배달받습니다.</small></span></label>
            </div>
          </section>

          <section class="checkout-section" aria-labelledby="fulfillmentInputTitle">
            <div class="checkout-section-title"><span>04</span><h2 id="fulfillmentInputTitle">픽업 정보</h2></div>
            <div id="pickupFields" class="fulfillment-panel">
              <div class="store-summary"><span>픽업 장소</span><strong>온마을 공동구매</strong><p>경기 수원시 영통구 온마을로 27, 1층</p></div>
              <div class="pickup-summary">공통 픽업가능일 <strong>${pickupWindow ? pickupPeriodText(pickupWindow.start, pickupWindow.end) : "-"}</strong></div>
              <label class="checkout-field"><span>픽업 요청사항</span><textarea id="pickupRequest" rows="3" placeholder="매장에 전달할 요청사항을 입력해 주세요."></textarea></label>
            </div>
            <div id="deliveryFields" class="fulfillment-panel" hidden>
              <div class="delivery-address-heading"><strong>배달지</strong><a class="text-button" href="?view=delivery-address">배달지 관리</a></div>
              ${hasSavedAddress ? `<div class="delivery-address-options">
                <label class="saved-address-card"><input type="radio" name="deliveryAddressMode" value="saved" checked /><span><b>${escapeText(member.addressName || "대표 배달지")}<em>대표</em></b><small>${escapeText(member.address)}</small></span></label>
                <label class="saved-address-card"><input type="radio" name="deliveryAddressMode" value="manual" /><span><b>다른 주소 입력</b><small>이번 주문에 사용할 주소를 직접 입력합니다.</small></span></label>
              </div>` : `<p class="delivery-address-empty">등록된 배달지가 없습니다. 이번 주문에 사용할 주소를 입력해 주세요.</p>`}
              <label class="checkout-field manual-address-field" id="manualDeliveryField" ${hasSavedAddress ? "hidden" : ""}><span>배달 주소</span><input id="deliveryAddress" type="text" placeholder="배달받을 주소를 입력해 주세요." /></label>
              <label class="checkout-field"><span>배달 요청사항</span><textarea id="deliveryRequest" rows="3" placeholder="배달 시 참고할 요청사항을 입력해 주세요.">${escapeText(member.deliveryRequest)}</textarea></label>
              <p class="delivery-note">배달비 ${formatPrice(DELIVERY_FEE)}이 결제금액에 추가됩니다.</p>
            </div>
          </section>

          <section class="checkout-section" aria-labelledby="paymentTitle">
            <div class="checkout-section-title"><span>05</span><h2 id="paymentTitle">결제수단</h2></div>
            <div id="pickupPayments" class="choice-cards payment-options">
              <label class="choice-card is-compact"><input type="radio" name="payment" value="card" checked /><span><b>카드결제</b></span></label>
              <label class="choice-card is-compact"><input type="radio" name="payment" value="transfer" /><span><b>계좌이체</b></span></label>
              <label class="choice-card is-compact"><input type="radio" name="payment" value="onsite" /><span><b>현장결제</b></span></label>
            </div>
            <div id="deliveryPayment" class="delivery-payment" hidden><strong>카드결제</strong></div>
            <div id="transferFields" class="transfer-panel" hidden>
              <div class="transfer-field"><span>입금계좌</span><strong>국민 123456-01-123456 · 온마을마켓</strong></div>
              <label class="transfer-field"><span>입금자명</span><input id="depositorName" type="text" placeholder="입금자명을 입력해 주세요." /></label>
            </div>
          </section>

          <section class="checkout-section agreement-section" aria-labelledby="agreementTitle">
            <div class="checkout-section-title"><span>06</span><h2 id="agreementTitle">주문내용동의</h2></div>
            <label class="order-agreement"><input id="orderAgreement" type="checkbox" required /><span>주문 상품, 수령 방식 및 결제 내용을 확인했으며 주문에 동의합니다.</span></label>
          </section>
        </div>

        <aside class="checkout-summary">
          <h2>결제금액</h2>
          <div class="summary-line"><span>상품금액</span><strong>${formatPrice(productTotal)}</strong></div>
          <div class="summary-line"><span>배달비</span><strong id="deliveryFeeText">0원</strong></div>
          <div class="summary-total"><span>최종 결제금액</span><strong id="finalTotal">${formatPrice(productTotal)}</strong></div>
          <button class="primary-button checkout-submit" id="orderSubmit" type="submit">주문하기</button>
        </aside>
      </form>
    </section>`;

  const form = document.querySelector("#orderForm");
  const fulfillmentTitle = document.querySelector("#fulfillmentInputTitle");
  const pickupFields = document.querySelector("#pickupFields");
  const deliveryFields = document.querySelector("#deliveryFields");
  const pickupPayments = document.querySelector("#pickupPayments");
  const deliveryPayment = document.querySelector("#deliveryPayment");
  const transferFields = document.querySelector("#transferFields");
  const deliveryFeeText = document.querySelector("#deliveryFeeText");
  const finalTotal = document.querySelector("#finalTotal");
  const orderSubmit = document.querySelector("#orderSubmit");
  const manualDeliveryField = document.querySelector("#manualDeliveryField");

  const updateDeliveryAddressMode = () => {
    const selectedMode = form.querySelector("[name=\"deliveryAddressMode\"]:checked")?.value;
    if (manualDeliveryField) manualDeliveryField.hidden = selectedMode === "saved";
  };

  const updatePayment = () => {
    const fulfillment = form.elements.fulfillment.value;
    const payment = fulfillment === "delivery" ? "card" : form.elements.payment.value;
    const deliveryFee = fulfillment === "delivery" ? DELIVERY_FEE : 0;
    const total = productTotal + deliveryFee;
    transferFields.hidden = payment !== "transfer";
    deliveryFeeText.textContent = formatPrice(deliveryFee);
    finalTotal.textContent = formatPrice(total);
    orderSubmit.textContent = "주문하기";
  };
  const updateFulfillment = () => {
    const isDelivery = form.elements.fulfillment.value === "delivery";
    pickupFields.hidden = isDelivery;
    deliveryFields.hidden = !isDelivery;
    pickupPayments.hidden = isDelivery;
    deliveryPayment.hidden = !isDelivery;
    fulfillmentTitle.textContent = isDelivery ? "배달 정보" : "픽업 정보";
    if (isDelivery) form.elements.payment.value = "card";
    updatePayment();
  };
  form.querySelectorAll("[name=\"fulfillment\"]").forEach((input) => input.addEventListener("change", updateFulfillment));
  form.querySelectorAll("[name=\"payment\"]").forEach((input) => input.addEventListener("change", updatePayment));
  form.querySelectorAll("[name=\"deliveryAddressMode\"]").forEach((input) => input.addEventListener("change", updateDeliveryAddressMode));
  bindNoticeButtons();
  updateDeliveryAddressMode();
  updateFulfillment();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!ensureOrderMember()) return;
    const fulfillment = form.elements.fulfillment.value;
    const payment = fulfillment === "delivery" ? "card" : form.elements.payment.value;
    const customerName = document.querySelector("#customerName").value.trim();
    const phone = phoneDigits(document.querySelector("#customerPhone").value);
    const nicknameCode = document.querySelector("#customerNicknameCode").value.trim();
    const deliveryAddressMode = form.querySelector("[name=\"deliveryAddressMode\"]:checked")?.value || "manual";
    const deliveryAddress = deliveryAddressMode === "saved" ? member.address : document.querySelector("#deliveryAddress").value.trim();
    const deliveryAddressName = deliveryAddressMode === "saved" ? member.addressName || "대표 배달지" : "직접 입력";
    const depositorName = document.querySelector("#depositorName").value.trim();
    if (!customerName || phone.length !== 11 || !nicknameCode) return showToast("주문자 정보를 확인해 주세요.");
    if (fulfillment === "delivery" && !deliveryAddress) return showToast("배달 주소를 입력해 주세요.");
    if (payment === "transfer" && !depositorName) return showToast("입금자명을 입력해 주세요.");
    if (!document.querySelector("#orderAgreement").checked) return showToast("주문내용동의가 필요합니다.");
    const deliveryFee = fulfillment === "delivery" ? DELIVERY_FEE : 0;
    const now = new Date();
    const lastOrder = {
      orderNumber: `RO${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(now.getTime()).slice(-3)}`,
      orderedDate: `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`,
      orderedAt: now.toLocaleString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }),
      items: rows.map(({ product, quantity }) => ({ id: product.id, name: product.name, category1: product.category1, category2: product.category2, price: product.price, quantity, pickupStart: fulfillment === "pickup" ? product.pickupStart : null, pickupEnd: fulfillment === "pickup" ? product.pickupEnd : null })),
      source: draft.source,
      fulfillment,
      payment,
      customerName,
      phone,
      nicknameCode,
      pickupWindow,
      orderChannel: "링크주문",
      pickupRequest: document.querySelector("#pickupRequest").value.trim(),
      deliveryAddress,
      deliveryAddressName,
      deliveryRequest: document.querySelector("#deliveryRequest").value.trim(),
      depositorName,
      productTotal,
      deliveryFee,
      finalTotal: productTotal + deliveryFee,
    };
    sessionStorage.setItem("onmaeul-last-order", JSON.stringify(lastOrder));
    try {
      const placedOrders = JSON.parse(localStorage.getItem("onmaeul-placed-orders") || "[]");
      localStorage.setItem("onmaeul-placed-orders", JSON.stringify([lastOrder, ...(Array.isArray(placedOrders) ? placedOrders : [])].slice(0, 30)));
    } catch {}
    if (draft.source.startsWith("cart")) {
      const orderedKeys = new Set(rows.map((item) => cartItemKey(item)));
      writeCart(readCart().filter((item) => !orderedKeys.has(cartItemKey(item))));
      selectedCartKeys = null;
    }
    window.location.href = "?view=order-complete";
  });
}

function renderOrderComplete() {
  let order;
  try { order = JSON.parse(sessionStorage.getItem("onmaeul-last-order")); } catch {}
  if (!order || !Array.isArray(order.items)) {
    const product = products[0];
    order = { orderNumber: "RO20261001001", orderedAt: "2026. 10. 01. 오후 2:30", items: [{ ...product, quantity: 1 }], fulfillment: "pickup", payment: "card", customerName: "홍길동", phone: "010-1234-5678", nicknameCode: "7942", pickupWindow: { start: product.pickupStart, end: product.pickupEnd }, pickupRequest: "도착 전에 연락 부탁드립니다.", productTotal: product.price, deliveryFee: 0, finalTotal: product.price };
  }
  const isDelivery = order.fulfillment === "delivery";
  const status = order.payment === "card" ? "결제완료" : "결제대기";
  const paymentName = order.payment === "card" ? "카드결제" : order.payment === "transfer" ? "계좌이체" : "현장결제";
  pageContent.innerHTML = `
    <section class="site-width order-complete-page">
      <div class="completion-hero"><span class="completion-check">✓</span><span class="completion-status">${status}</span><h1>주문이 완료되었습니다.</h1><p>${escapeText(order.customerName)}님의 주문을 정상적으로 접수했습니다.</p><dl><div><dt>주문번호</dt><dd>${escapeText(order.orderNumber)}</dd></div><div><dt>주문일시</dt><dd>${escapeText(order.orderedAt)}</dd></div></dl></div>
      <div class="completion-layout">
        <div class="completion-main">
          <section class="completion-card"><h2>주문상품</h2><div class="completion-list">${order.items.map((item) => `<div><span><small>${escapeText(item.category1)} &gt; ${escapeText(item.category2)}</small><b>${escapeText(item.name)}</b><small>수량 ${item.quantity}개</small>${!isDelivery ? `<small>${pickupPeriodText(item.pickupStart, item.pickupEnd)} 픽업</small>` : ""}</span><strong>${formatPrice(item.price * item.quantity)}</strong></div>`).join("")}</div></section>
          <section class="completion-card"><h2>주문자 정보</h2><dl class="completion-info"><div><dt>주문자명</dt><dd>${escapeText(order.customerName)}</dd></div><div><dt>휴대폰번호</dt><dd>${formatPhone(order.phone)}</dd></div><div><dt>회원주문 코드</dt><dd>${escapeText(order.nicknameCode || "-")}</dd></div></dl></section>
          <section class="completion-card"><h2>${isDelivery ? "배달 정보" : "픽업 정보"}</h2><dl class="completion-info">${isDelivery ? `<div><dt>배달지</dt><dd>${order.deliveryAddressName ? `<b>${escapeText(order.deliveryAddressName)}</b><br />` : ""}${escapeText(order.deliveryAddress)}</dd></div>${order.deliveryRequest ? `<div><dt>요청사항</dt><dd>${escapeText(order.deliveryRequest)}</dd></div>` : ""}` : `<div><dt>픽업 장소</dt><dd>온마을 공동구매<br />경기 수원시 영통구 온마을로 27, 1층</dd></div><div><dt>공통 픽업가능일</dt><dd>${pickupPeriodText(order.pickupWindow?.start, order.pickupWindow?.end)}</dd></div>${order.pickupRequest ? `<div><dt>요청사항</dt><dd>${escapeText(order.pickupRequest)}</dd></div>` : ""}`}</dl></section>
          <section class="completion-card"><h2>결제 정보</h2><dl class="completion-info"><div><dt>결제수단</dt><dd>${paymentName}</dd></div>${order.payment === "transfer" ? `<div><dt>입금계좌</dt><dd>국민 123456-01-123456 · 온마을마켓</dd></div><div><dt>입금자명</dt><dd>${escapeText(order.depositorName)}</dd></div>` : ""}</dl></section>
        </div>
        <aside class="completion-card completion-payment"><h2>결제금액</h2><div><span>상품금액</span><strong>${formatPrice(order.productTotal)}</strong></div><div><span>배달비</span><strong>${formatPrice(order.deliveryFee)}</strong></div><div class="completion-payment-total"><span>최종 결제금액</span><strong>${formatPrice(order.finalTotal)}</strong></div></aside>
      </div>
      <div class="completion-actions"><a class="secondary-button" href="?view=order-history">주문내역 보기</a><a class="primary-button" href="?view=catalog">쇼핑 계속하기</a></div>
    </section>`;
  bindNoticeButtons();
}

function getMockOrderRows(order) {
  return order.items
    .map((item) => ({ ...item, product: products.find((product) => product.id === item.id) }))
    .filter((item) => item.product);
}

function paymentMethodName(payment) {
  if (payment === "card") return "카드결제";
  if (payment === "transfer") return "계좌이체";
  return "현장결제";
}

function orderTotals(order) {
  if (Number.isFinite(order.finalTotal)) return { productTotal: order.productTotal, deliveryFee: order.deliveryFee, finalTotal: order.finalTotal };
  const productTotal = getMockOrderRows(order).reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = order.fulfillment === "delivery" ? 3000 : 0;
  return { productTotal, deliveryFee, finalTotal: productTotal + deliveryFee };
}

function statusClass(status) {
  if (status === "결제취소") return "is-neutral";
  if (["픽업완료", "배달완료", "결제완료"].includes(status) || status.endsWith("승인")) return "is-success";
  if (["결제실패"].includes(status) || status.endsWith("반려")) return "is-error";
  if (["픽업대기", "배달대기", "결제대기"].includes(status) || status.endsWith("요청")) return "is-warning";
  return "is-neutral";
}

const noOrderDemoMember = {
  customerName: "신규회원",
  phone: "01012341234",
  email: "newmember@example.com",
  nicknameCode: "4826",
  chatNickname: "",
  addressName: "",
  address: "",
  deliveryRequest: "",
};

function readMemberProfile() {
  let storedMember;
  try { storedMember = JSON.parse(localStorage.getItem("onmaeul-member")); } catch {}
  const activePhone = loggedInPhone();
  const demoMember = {
    customerName: "홍길동",
    phone: "01012345678",
    email: "hongildong@example.com",
    nicknameCode: "7942",
    chatNickname: "산책러",
    addressName: "집",
    address: "경기 수원시 영통구 온마을로 27, 101동 101호",
    deliveryRequest: "문 앞에 놓아주세요.",
  };
  const baseMember = activePhone === noOrderDemoMember.phone ? noOrderDemoMember : activePhone && activePhone !== demoMember.phone
    ? { ...noOrderDemoMember, customerName: "", phone: activePhone, email: "", nicknameCode: "" }
    : demoMember;
  const member = storedMember && (!activePhone || phoneDigits(storedMember.phone) === activePhone) ? storedMember : null;
  return member
    ? {
        ...baseMember,
        ...member,
        nicknameCode: member.nicknameCode || member.aliasCode || baseMember.nicknameCode,
        chatNickname: member.chatNickname || "",
        addressName: member.addressName || "",
        address: member.address || "",
        deliveryRequest: member.deliveryRequest || "",
      }
    : baseMember;
}

function writeMemberProfile(member) {
  localStorage.setItem("onmaeul-member", JSON.stringify(member));
}

function ongoingOrders() {
  return mockOrders.filter((order) => phoneDigits(order.phone) === loggedInPhone() && !["픽업완료", "배달완료"].includes(order.processStatus) && order.cancelRefundStatus !== "취소승인");
}

function myPageFrame(content, current = "orders") {
  const pageLabels = { orders: "주문내역", profile: "내정보", address: "배달지관리", withdrawal: "회원탈퇴" };
  const pageLabel = pageLabels[current] || "마이페이지";
  return `
    <section class="site-width mypage-page">
      <nav class="breadcrumb mypage-breadcrumb" aria-label="현재 위치"><a href="./index.html">홈</a><span>›</span><span>마이페이지</span><span>›</span><strong>${pageLabel}</strong></nav>
      <div class="mypage-layout">
        <aside class="mypage-menu">
          <h1>마이페이지</h1>
          <nav aria-label="마이페이지 메뉴">
            <a class="${current === "orders" ? "is-active" : ""}" href="?view=order-history">주문내역</a>
            <a class="${current === "profile" ? "is-active" : ""}" href="?view=my-info">내정보</a>
            <a class="${current === "address" ? "is-active" : ""}" href="?view=delivery-address">배달지관리</a>
            <span></span>
            <a class="withdrawal-link ${current === "withdrawal" ? "is-active" : ""}" href="?view=withdrawal">회원탈퇴</a>
          </nav>
        </aside>
        <div class="mypage-content">${content}</div>
      </div>
    </section>`;
}

function renderMyInfo() {
  const member = readMemberProfile();
  const activeOrders = ongoingOrders();
  const nicknameLocked = activeOrders.length > 0;
  const content = `
    <header class="mypage-content-heading"><div><h2>내정보</h2><p>주문과 수령에 사용하는 회원정보를 확인합니다.</p></div></header>
    <form id="myInfoForm" class="mypage-form">
      <section class="mypage-panel">
        <h3>기본정보</h3>
        <div class="mypage-form-grid">
          <label class="auth-field"><span>이름 *</span><input name="customerName" type="text" value="${escapeText(member.customerName)}" required /></label>
          <label class="auth-field"><span>이메일 *</span><input name="email" type="email" value="${escapeText(member.email)}" required /></label>
        </div>
        <div class="mypage-readonly-field">
          <span>휴대폰번호</span>
          <strong>${formatPhone(member.phone)}</strong>
          <p>휴대폰번호는 회원 식별정보로 사용되어 직접 변경할 수 없습니다. 변경이 필요한 경우 고객센터로 문의해 주세요.</p>
        </div>
      </section>
      <section class="mypage-panel">
        <h3>회원주문 코드</h3>
        <p class="mypage-section-copy">주문 확인과 현장 수령 시 본인확인에 사용하는 숫자 4자리 코드입니다.</p>
        <label class="auth-field">
          <span>회원주문 코드 *</span>
          <span class="inline-field">
            <input id="myNicknameCode" name="nicknameCode" inputmode="numeric" maxlength="4" pattern="[0-9]{4}" value="${escapeText(member.nicknameCode)}" ${nicknameLocked ? "disabled" : ""} required />
            <button class="secondary-button" id="checkMyNickname" type="button" ${nicknameLocked ? "disabled" : ""}>중복 확인</button>
          </span>
          <small class="field-message" id="myNicknameMessage">${nicknameLocked ? `진행 중 주문 ${activeOrders.length}건이 있어 변경할 수 없습니다. 픽업완료 또는 배달완료 후 변경해 주세요.` : "변경하려면 새 코드를 입력하고 중복 확인을 진행해 주세요."}</small>
        </label>
        <label class="auth-field"><span>채팅주문 닉네임</span><input name="chatNickname" type="text" value="${escapeText(member.chatNickname)}" placeholder="오픈채팅방에서 사용하는 닉네임" /><small class="field-message">채팅주문을 이용할 때 회원 확인에 사용합니다.</small></label>
      </section>
      <section class="mypage-panel mypage-password-row">
        <div><h3>비밀번호</h3><p>비밀번호를 잊었거나 변경하려면 본인인증 후 재설정할 수 있습니다.</p></div>
        <a class="secondary-button" href="?view=reset-password">비밀번호 변경</a>
      </section>
      <div class="mypage-actions"><button class="primary-button" type="submit">저장</button></div>
    </form>`;
  pageContent.innerHTML = myPageFrame(content, "profile");
  const form = document.querySelector("#myInfoForm");
  const nicknameInput = document.querySelector("#myNicknameCode");
  const nicknameMessage = document.querySelector("#myNicknameMessage");
  let nicknameChecked = false;
  if (!nicknameLocked) {
    document.querySelector("#checkMyNickname").addEventListener("click", () => {
      if (!/^\d{4}$/.test(nicknameInput.value)) return showToast("회원주문 코드 숫자 4자리를 입력해 주세요.");
      nicknameChecked = true;
      nicknameMessage.textContent = "사용할 수 있는 회원주문 코드입니다.";
      nicknameMessage.classList.add("is-success");
    });
    nicknameInput.addEventListener("input", () => {
      nicknameInput.value = nicknameInput.value.replace(/\D/g, "").slice(0, 4);
      nicknameChecked = false;
      nicknameMessage.textContent = "변경하려면 새 코드를 입력하고 중복 확인을 진행해 주세요.";
      nicknameMessage.classList.remove("is-success");
    });
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const nextNickname = nicknameLocked ? member.nicknameCode : nicknameInput.value.trim();
    if (!nicknameLocked && nextNickname !== member.nicknameCode && !nicknameChecked) return showToast("회원주문 코드 중복 확인을 완료해 주세요.");
    writeMemberProfile({
      ...member,
      customerName: form.elements.customerName.value.trim(),
      email: form.elements.email.value.trim(),
      nicknameCode: nextNickname,
      chatNickname: form.elements.chatNickname.value.trim(),
    });
    showToast("회원정보가 저장되었습니다.");
  });
}

function renderDeliveryAddress() {
  const member = readMemberProfile();
  const content = `
    <header class="mypage-content-heading"><div><h2>배달지관리</h2><p>주문서에서 불러올 대표 배달지를 관리합니다.</p></div></header>
    <form id="deliveryAddressForm" class="mypage-form">
      <section class="mypage-panel">
        <div class="mypage-panel-title"><h3>대표 배달지</h3><span>1건</span></div>
        <div class="mypage-form-grid address-form-grid">
          <label class="auth-field"><span>배달지명</span><input name="addressName" type="text" value="${escapeText(member.addressName)}" placeholder="예: 집" /></label>
          <label class="auth-field"><span>배달 주소</span><input name="address" type="text" value="${escapeText(member.address)}" placeholder="배달받을 주소를 입력해 주세요." /></label>
        </div>
        <label class="auth-field"><span>배달 요청사항</span><textarea name="deliveryRequest" rows="4" placeholder="예: 문 앞에 놓아주세요.">${escapeText(member.deliveryRequest)}</textarea></label>
      </section>
      <div class="mypage-actions"><button class="primary-button" type="submit">저장</button></div>
    </form>`;
  pageContent.innerHTML = myPageFrame(content, "address");
  document.querySelector("#deliveryAddressForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const address = form.elements.address.value.trim();
    if (!address) return showToast("배달 주소를 입력해 주세요.");
    writeMemberProfile({
      ...member,
      addressName: form.elements.addressName.value.trim() || "대표 배달지",
      address,
      deliveryRequest: form.elements.deliveryRequest.value.trim(),
    });
    showToast("대표 배달지가 저장되었습니다.");
  });
}

function renderWithdrawal() {
  const activeOrders = ongoingOrders();
  const isBlocked = activeOrders.length > 0;
  const content = `
    <header class="mypage-content-heading"><div><h2>회원탈퇴</h2><p>탈퇴 전 진행 중인 주문과 안내사항을 확인해 주세요.</p></div></header>
    <form id="withdrawalForm" class="mypage-form">
      <section class="mypage-panel withdrawal-panel">
        <h3>회원탈퇴 안내</h3>
        <ul>
          <li>탈퇴 후에는 현재 계정으로 로그인하거나 회원 서비스를 이용할 수 없습니다.</li>
          <li>주문·결제 기록은 관련 법령에서 정한 기간 동안 보관될 수 있습니다.</li>
          <li>진행 중인 주문 또는 취소·반품 요청이 있으면 처리가 끝난 후 탈퇴할 수 있습니다.</li>
        </ul>
        ${isBlocked ? `<p class="mypage-alert">진행 중인 주문 ${activeOrders.length}건이 있어 현재 회원탈퇴할 수 없습니다.</p>` : ""}
        <label class="auth-field"><span>비밀번호 확인</span><input name="password" type="password" placeholder="비밀번호를 입력해 주세요." ${isBlocked ? "disabled" : ""} required /></label>
        <label class="auth-checkbox"><input name="agreeWithdrawal" type="checkbox" ${isBlocked ? "disabled" : ""} required /><span>회원탈퇴 안내 내용을 확인했습니다.</span></label>
      </section>
      <div class="mypage-actions"><button class="danger-button" type="submit" ${isBlocked ? "disabled" : ""}>회원탈퇴</button></div>
    </form>`;
  pageContent.innerHTML = myPageFrame(content, "withdrawal");
  document.querySelector("#withdrawalForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (isBlocked) return showToast("진행 중인 주문을 먼저 완료해 주세요.");
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    localStorage.removeItem("onmaeul-login");
    showToast("회원탈퇴가 완료되었습니다.");
    window.setTimeout(() => { window.location.href = "./index.html"; }, 600);
  });
}

function orderAction(order) {
  if (order.cancelRefundStatus) {
    return `<button class="secondary-button order-case-action" type="button" data-request-detail="${order.orderNumber}">취소·반품 상세</button>`;
  }
  if (order.processStatus === "주문접수") {
    const label = order.payment === "card" || order.paymentStatus === "결제대기" ? "주문 취소" : "취소 요청";
    return `<button class="secondary-button order-case-action" type="button" data-order-request="cancel" data-order-number="${order.orderNumber}">${label}</button>`;
  }
  if (["픽업완료", "배달완료"].includes(order.processStatus)) {
    return `<button class="secondary-button order-case-action" type="button" data-order-request="return" data-order-number="${order.orderNumber}">반품 요청</button>`;
  }
  return "";
}

function closeOrderModal() {
  const modal = document.querySelector("#orderRequestModal");
  if (modal) modal.remove();
  document.body.style.overflow = "";
}

function orderModalProductSummary(order) {
  const rows = getMockOrderRows(order);
  const first = rows[0];
  const title = rows.length > 1 ? `${first.product.name} 외 ${rows.length - 1}개` : first.product.name;
  return `
    <div class="request-product-summary">
      ${productImage(first.product)}
      <div><small>주문번호 ${order.orderNumber}</small><strong>${title}</strong><span>총 ${rows.reduce((sum, row) => sum + row.quantity, 0)}개 상품</span></div>
    </div>`;
}

function openOrderRequestModal(orderNumber, requestKind) {
  const order = mockOrders.find((item) => item.orderNumber === orderNumber);
  if (!order) return;
  const totals = orderTotals(order);
  const isCancel = requestKind === "cancel";
  const isDirectCardCancel = isCancel && order.payment === "card";
  const isDirectCancel = isCancel && (isDirectCardCancel || order.paymentStatus === "결제대기");
  const title = isDirectCancel ? "주문 취소" : isCancel ? "취소 요청" : "반품 요청";
  const submitLabel = title;
  const note = isDirectCardCancel
    ? "주문과 카드결제가 즉시 취소됩니다."
    : isDirectCancel
      ? "주문이 즉시 취소되며 판매가능수량이 복구됩니다."
    : isCancel
      ? "판매자 확인 후 주문이 취소됩니다."
      : "판매자 확인 후 반품이 처리됩니다.";
  const refundFields = !isDirectCancel && order.payment !== "card"
    ? `
      <fieldset class="request-refund-fields">
        <legend>환불정보</legend>
        <label><span>은행</span><select name="refundBank" required><option value="">은행을 선택해 주세요</option><option>국민은행</option><option>신한은행</option><option>우리은행</option><option>하나은행</option><option>농협은행</option></select></label>
        <label><span>계좌번호</span><input name="refundAccount" type="text" placeholder="계좌번호를 입력해 주세요" required /></label>
        <label><span>예금주</span><input name="refundHolder" type="text" placeholder="예금주를 입력해 주세요" required /></label>
      </fieldset>`
    : "";

  document.body.insertAdjacentHTML("beforeend", `
    <div class="order-modal-backdrop" id="orderRequestModal">
      <section class="order-request-modal" role="dialog" aria-modal="true" aria-labelledby="requestModalTitle">
        <header><h2 id="requestModalTitle">${title}</h2><button type="button" data-modal-close aria-label="닫기">×</button></header>
        <form id="orderRequestForm">
          ${orderModalProductSummary(order)}
          ${isDirectCancel ? "" : `<div class="request-form-fields"><label><span>요청 사유</span><textarea name="requestReason" rows="3" placeholder="요청 사유를 입력해 주세요" required></textarea></label></div>`}
          <dl class="request-payment-summary">
            <div><dt>결제금액</dt><dd>${formatPrice(totals.finalTotal)}</dd></div>
            <div><dt>결제방식</dt><dd>${paymentMethodName(order.payment)}</dd></div>
          </dl>
          ${refundFields}
          <p class="request-notice">${note}</p>
          <footer><button class="secondary-button" type="button" data-modal-close>닫기</button><button class="primary-button" type="submit">${submitLabel}</button></footer>
        </form>
      </section>
    </div>`);
  document.body.style.overflow = "hidden";

  const modal = document.querySelector("#orderRequestModal");
  modal.querySelectorAll("[data-modal-close]").forEach((button) => button.addEventListener("click", closeOrderModal));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeOrderModal();
  });
  modal.querySelector("#orderRequestForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    order.cancelRefundStatus = isCancel ? (isDirectCancel ? "취소승인" : "취소요청") : "반품요청";
    order.actionActor = isDirectCancel ? "구매자 즉시취소" : "구매자 요청";
    order.requestDate = new Date().toLocaleString("ko-KR");
    order.resolvedAt = isDirectCancel ? order.requestDate : "";
    order.requestReason = String(data.get("requestReason") || "").trim();
    order.sellerMemo = "";
    order.refundType = isDirectCardCancel ? "전체환불" : "";
    order.refundAmount = isDirectCardCancel ? totals.finalTotal : 0;
    if (refundFields) {
      order.refundBank = data.get("refundBank");
      order.refundAccount = data.get("refundAccount");
      order.refundHolder = data.get("refundHolder");
    }
    if (isDirectCardCancel) order.paymentStatus = "결제취소";
    if (isDirectCancel) order.items.forEach((item) => { const product = products.find((candidate) => candidate.id === item.id); if (product) product.stock += item.quantity; });
    try {
      const placedOrders = JSON.parse(localStorage.getItem("onmaeul-placed-orders") || "[]");
      const placedOrder = Array.isArray(placedOrders) && placedOrders.find((item) => item.orderNumber === order.orderNumber);
      if (placedOrder) {
        Object.assign(placedOrder, { cancelRefundStatus: order.cancelRefundStatus, actionActor: order.actionActor, requestDate: order.requestDate, resolvedAt: order.resolvedAt, requestReason: order.requestReason, sellerMemo: order.sellerMemo, refundType: order.refundType, refundAmount: order.refundAmount, refundBank: order.refundBank, refundAccount: order.refundAccount, refundHolder: order.refundHolder, paymentStatus: order.paymentStatus });
        localStorage.setItem("onmaeul-placed-orders", JSON.stringify(placedOrders));
      }
    } catch {}
    closeOrderModal();
    if (new URLSearchParams(window.location.search).get("view") === "quick-order-lookup") {
      quickLookupTab = quickLookupIsComplete(order) ? "complete" : "active";
    }
    renderPage();
    showToast(isDirectCardCancel ? "주문과 카드결제가 취소되었습니다." : isDirectCancel ? "주문이 취소되고 판매가능수량이 복구되었습니다." : isCancel ? "취소 요청이 접수되었습니다." : "반품 요청이 접수되었습니다.");
  });
}

function openRequestDetailModal(orderNumber) {
  const order = mockOrders.find((item) => item.orderNumber === orderNumber);
  if (!order || !order.cancelRefundStatus) return;
  const totals = orderTotals(order);
  const isPending = order.cancelRefundStatus.endsWith("요청");
  const isApproved = order.cancelRefundStatus.endsWith("승인");
  const refundAmount = order.refundType === "전체환불" ? totals.finalTotal : order.refundAmount;
  const maskedAccount = String(order.refundAccount || "").replace(/\d(?=\d{4})/g, "*");
  const refundInfo = order.payment !== "card" && order.refundAccount
    ? `<div><dt>환불계좌</dt><dd>${escapeText(order.refundBank || "-")} / ${escapeText(maskedAccount)} / ${escapeText(order.refundHolder || "-")}</dd></div>`
    : "";
  document.body.insertAdjacentHTML("beforeend", `
    <div class="order-modal-backdrop" id="orderRequestModal">
      <section class="order-request-modal request-detail-modal" role="dialog" aria-modal="true" aria-labelledby="requestModalTitle">
        <header><h2 id="requestModalTitle">취소·반품 상세</h2><button type="button" data-modal-close aria-label="닫기">×</button></header>
        <div class="request-detail-body">
          ${orderModalProductSummary(order)}
          <dl class="request-detail-list">
            <div><dt>취소·반품상태</dt><dd><span class="status-badge ${statusClass(order.cancelRefundStatus)}">${order.cancelRefundStatus}</span></dd></div>
            <div><dt>처리주체</dt><dd>${escapeText(order.actionActor || "구매자 요청")}</dd></div>
            <div><dt>결제수단</dt><dd>${paymentMethodName(order.payment)}</dd></div>
            <div><dt>결제상태</dt><dd><span class="status-badge ${statusClass(order.paymentStatus)}">${order.paymentStatus}</span></dd></div>
            ${order.requestDate ? `<div><dt>요청일시</dt><dd>${escapeText(order.requestDate)}</dd></div>` : ""}
            ${order.requestReason ? `<div><dt>요청 사유</dt><dd>${escapeText(order.requestReason)}</dd></div>` : ""}
            ${!isPending && order.resolvedAt ? `<div><dt>처리일시</dt><dd>${escapeText(order.resolvedAt)}</dd></div>` : ""}
            ${isApproved && order.refundType && refundAmount ? `<div><dt>환불구분</dt><dd>${escapeText(order.refundType)}</dd></div><div><dt>환불금액</dt><dd>${formatPrice(refundAmount)}</dd></div>` : ""}
            ${refundInfo}
          </dl>
          ${!isPending && order.sellerMemo ? `<section class="seller-memo"><h3>판매자 메모</h3><p>${escapeText(order.sellerMemo)}</p></section>` : ""}
          <footer><button class="primary-button" type="button" data-modal-close>확인</button></footer>
        </div>
      </section>
    </div>`);
  document.body.style.overflow = "hidden";
  const modal = document.querySelector("#orderRequestModal");
  modal.querySelectorAll("[data-modal-close]").forEach((button) => button.addEventListener("click", closeOrderModal));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeOrderModal();
  });
}

function bindOrderRequestActions() {
  document.querySelectorAll("[data-order-request]").forEach((button) => {
    button.addEventListener("click", () => openOrderRequestModal(button.dataset.orderNumber, button.dataset.orderRequest));
  });
  document.querySelectorAll("[data-request-detail]").forEach((button) => {
    button.addEventListener("click", () => openRequestDetailModal(button.dataset.requestDetail));
  });
}

function quickLookupIsComplete(order) {
  if (order.cancelRefundStatus?.endsWith("요청")) return false;
  return order.cancelRefundStatus?.endsWith("승인") || ["픽업완료", "배달완료"].includes(order.processStatus);
}

function quickLookupOrderCard(order, showActions = true) {
  const rows = getMockOrderRows(order);
  const action = order.cancelRefundStatus
    ? `<button class="secondary-button" type="button" data-quick-action="request-detail" data-order-number="${escapeText(order.orderNumber)}">취소·반품 상세</button>`
    : order.processStatus === "주문접수"
      ? `<button class="secondary-button" type="button" data-quick-action="cancel" data-order-number="${escapeText(order.orderNumber)}">${order.payment === "card" || order.paymentStatus === "결제대기" ? "주문 취소" : "취소 요청"}</button>`
      : ["픽업완료", "배달완료"].includes(order.processStatus)
        ? `<button class="secondary-button" type="button" data-quick-action="return" data-order-number="${escapeText(order.orderNumber)}">반품 요청</button>`
        : "";
  return `<article class="quick-order-card">
    <header><strong>${escapeText(order.orderedAt)}</strong><span>주문번호 ${escapeText(order.orderNumber)}</span></header>
    <div class="quick-order-card-body">
      <div class="quick-order-items">
        <span class="fulfillment-badge">${fulfillmentName(order.fulfillment)}</span>
        ${order.fulfillment === "pickup" && order.pickupWindow ? `<span>${pickupPeriodText(order.pickupWindow.start, order.pickupWindow.end)} 픽업</span>` : ""}
        <ul>${rows.map(({ product, quantity }) => `<li>${escapeText(product.name)} <span>${quantity}개</span></li>`).join("")}</ul>
      </div>
      <dl class="quick-order-facts">
        <div><dt>처리상태</dt><dd><span class="status-badge ${statusClass(order.processStatus)}">${escapeText(order.processStatus)}</span></dd></div>
        <div><dt>결제상태</dt><dd><span class="status-badge ${statusClass(order.paymentStatus)}">${escapeText(order.paymentStatus)}</span></dd></div>
        ${order.cancelRefundStatus ? `<div><dt>취소·반품</dt><dd><span class="status-badge ${statusClass(order.cancelRefundStatus)}">${escapeText(order.cancelRefundStatus)}</span></dd></div>` : ""}
        <div><dt>결제금액</dt><dd><strong>${formatPrice(orderTotals(order).finalTotal)}</strong></dd></div>
      </dl>
      ${showActions ? `<div class="quick-order-actions"><button class="primary-button" type="button" data-quick-action="detail" data-order-number="${escapeText(order.orderNumber)}">주문 상세</button>${action}</div>` : ""}
    </div>
  </article>`;
}

function openQuickOrder(orderNumber, action) {
  const order = mockOrders.find((item) => item.orderNumber === orderNumber);
  if (!order) return;
  let login;
  try { login = JSON.parse(localStorage.getItem("onmaeul-login")); } catch {}
  if (!login?.phone) {
    sessionStorage.setItem("onmaeul-quick-order-intent", JSON.stringify({ orderNumber, action }));
    window.alert("로그인 후 이용할 수 있습니다.");
    window.location.href = "?view=login";
    return;
  }
  if (String(login.phone).replace(/\D/g, "") !== String(order.phone).replace(/\D/g, "")) {
    sessionStorage.setItem("onmaeul-quick-order-intent", JSON.stringify({ orderNumber, action }));
    window.location.href = "?view=login";
    return;
  }
  if (action === "detail") {
    window.location.href = `?view=order-detail&order=${encodeURIComponent(orderNumber)}`;
  } else if (action === "request-detail") {
    openRequestDetailModal(orderNumber);
  } else if (action === "cancel" || action === "return") {
    openOrderRequestModal(orderNumber, action);
  }
}

let quickLookupCode = "";
let quickLookupTab = "active";

function renderQuickOrderLookup() {
  pageContent.innerHTML = `<section class="site-width quick-lookup-page">
    <nav class="breadcrumb" aria-label="현재 위치"><a href="./index.html">홈</a><span>›</span><strong>간편 주문 조회</strong></nav>
    <header class="quick-lookup-heading"><h1>간편 주문 조회</h1><p>회원주문 코드로 주문 현황을 확인해 보세요.</p></header>
    <form class="quick-lookup-search" id="quickLookupForm">
      <label for="quickLookupCode">회원주문 코드</label>
      <div><input id="quickLookupCode" name="code" type="text" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" placeholder="숫자 4자리" autocomplete="off" required /><button class="primary-button" type="submit">조회</button></div>
    </form>
    <div id="quickLookupResult" aria-live="polite"></div>
  </section>`;
  const input = document.querySelector("#quickLookupCode");
  const result = document.querySelector("#quickLookupResult");
  const showOrders = (code, initialTab = quickLookupTab) => {
    quickLookupCode = code;
    const orders = mockOrders.filter((order) => order.nicknameCode === code);
    const member = readMemberProfile();
    if (!orders.length && member.nicknameCode !== code && noOrderDemoMember.nicknameCode !== code) {
      result.innerHTML = `<p class="quick-lookup-empty" role="status">일치하는 회원주문 코드가 없습니다.</p>`;
      return;
    }
    const nickname = code === member.nicknameCode ? member.chatNickname : orders.find((order) => order.chatNickname)?.chatNickname;
    result.innerHTML = `<div class="quick-lookup-member"><span>회원주문 코드 <strong>${escapeText(code)}</strong></span><span>채팅주문 닉네임 <strong>${escapeText(nickname || "미등록")}</strong></span></div>
      <div class="quick-lookup-tabs" role="tablist" aria-label="주문 진행 상태"><button type="button" class="is-active" data-quick-tab="active" aria-selected="true">진행 중 주문 <b>${orders.filter((order) => !quickLookupIsComplete(order)).length}</b></button><button type="button" data-quick-tab="complete" aria-selected="false">완료된 주문 <b>${orders.filter(quickLookupIsComplete).length}</b></button></div>
      <div class="quick-lookup-list" id="quickLookupList"></div>`;
    const list = document.querySelector("#quickLookupList");
    const selectTab = (tab) => {
      quickLookupTab = tab;
      result.querySelectorAll("[data-quick-tab]").forEach((button) => {
        const selected = button.dataset.quickTab === tab;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-selected", String(selected));
      });
      const visible = orders.filter((order) => quickLookupIsComplete(order) === (tab === "complete"));
      list.innerHTML = visible.length ? visible.map(quickLookupOrderCard).join("") : `<p class="quick-lookup-empty">${tab === "complete" ? "완료된" : "진행 중인"} 주문이 없습니다.</p>`;
      list.querySelectorAll("[data-quick-action]").forEach((button) => button.addEventListener("click", () => openQuickOrder(button.dataset.orderNumber, button.dataset.quickAction)));
    };
    result.querySelectorAll("[data-quick-tab]").forEach((button) => button.addEventListener("click", () => selectTab(button.dataset.quickTab)));
    selectTab(initialTab);
  };
  document.querySelector("#quickLookupForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const code = input.value.replace(/\D/g, "").slice(0, 4);
    input.value = code;
    if (code.length !== 4) return showToast("회원주문 코드 숫자 4자리를 입력해 주세요.");
    showOrders(code);
  });
  input.addEventListener("input", () => { input.value = input.value.replace(/\D/g, "").slice(0, 4); });
  let intent;
  try { intent = JSON.parse(sessionStorage.getItem("onmaeul-quick-order-intent")); } catch {}
  const pendingOrder = intent?.orderNumber && mockOrders.find((order) => order.orderNumber === intent.orderNumber);
  let login;
  try { login = JSON.parse(localStorage.getItem("onmaeul-login")); } catch {}
  if (pendingOrder && intent.action !== "detail" && phoneDigits(login?.phone) === phoneDigits(pendingOrder.phone)) {
    sessionStorage.removeItem("onmaeul-quick-order-intent");
    input.value = pendingOrder.nicknameCode;
    showOrders(pendingOrder.nicknameCode, quickLookupIsComplete(pendingOrder) ? "complete" : "active");
    if (intent.action === "request-detail") openRequestDetailModal(pendingOrder.orderNumber);
    else if (intent.action === "cancel" || intent.action === "return") openOrderRequestModal(pendingOrder.orderNumber, intent.action);
  } else if (quickLookupCode) {
    input.value = quickLookupCode;
    showOrders(quickLookupCode);
  }
}

function renderUnavailable() {
  pageContent.innerHTML = `<section class="unavailable-page">
    <div class="unavailable-topbar"><div class="unavailable-topbar-inner"><span class="unavailable-brand-mark">09SCM</span><strong class="unavailable-brand">온마을 공동구매</strong></div></div>
    <div class="unavailable-content">
      <div class="unavailable-notice">
        <span class="unavailable-eyebrow">서비스 안내</span>
        <h1>현재 쇼핑몰을 이용할 수 없습니다.</h1>
        <p>주문 내역은 아래에서 확인할 수 있습니다.</p>
      </div>
      <section class="unavailable-lookup" aria-labelledby="unavailableLookupTitle">
        <header class="quick-lookup-heading"><h2 id="unavailableLookupTitle">간편 주문 조회</h2><p>회원주문 코드로 주문 현황을 확인해 보세요.</p></header>
        <form class="quick-lookup-search" id="unavailableLookupForm">
          <label for="unavailableLookupCode">회원주문 코드</label>
          <div><input id="unavailableLookupCode" type="text" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" placeholder="숫자 4자리" autocomplete="off" required /><button class="primary-button" type="submit">조회</button></div>
        </form>
        <div id="unavailableLookupResult" aria-live="polite"></div>
      </section>
    </div>
  </section>`;
  const input = document.querySelector("#unavailableLookupCode");
  const result = document.querySelector("#unavailableLookupResult");
  input.addEventListener("input", () => { input.value = input.value.replace(/\D/g, "").slice(0, 4); });
  document.querySelector("#unavailableLookupForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const code = input.value.replace(/\D/g, "").slice(0, 4);
    input.value = code;
    if (code.length !== 4) return showToast("회원주문 코드 숫자 4자리를 입력해 주세요.");
    const orders = mockOrders.filter((order) => order.nicknameCode === code);
    const member = readMemberProfile();
    if (!orders.length && member.nicknameCode !== code && noOrderDemoMember.nicknameCode !== code) {
      result.innerHTML = `<p class="quick-lookup-empty" role="status">일치하는 회원주문 코드가 없습니다.</p>`;
      return;
    }
    const nickname = code === member.nicknameCode ? member.chatNickname : orders.find((order) => order.chatNickname)?.chatNickname;
    result.innerHTML = `<div class="quick-lookup-member"><span>회원주문 코드 <strong>${escapeText(code)}</strong></span><span>채팅주문 닉네임 <strong>${escapeText(nickname || "미등록")}</strong></span></div>
      <div class="quick-lookup-tabs" role="tablist" aria-label="주문 진행 상태"><button type="button" data-unavailable-tab="active">진행 중 주문 <b>${orders.filter((order) => !quickLookupIsComplete(order)).length}</b></button><button type="button" data-unavailable-tab="complete">완료된 주문 <b>${orders.filter(quickLookupIsComplete).length}</b></button></div>
      <div class="quick-lookup-list" id="unavailableLookupList"></div>`;
    const list = result.querySelector("#unavailableLookupList");
    const selectTab = (tab) => {
      result.querySelectorAll("[data-unavailable-tab]").forEach((button) => {
        const selected = button.dataset.unavailableTab === tab;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-selected", String(selected));
      });
      const visible = orders.filter((order) => quickLookupIsComplete(order) === (tab === "complete"));
      list.innerHTML = visible.length ? visible.map((order) => quickLookupOrderCard(order, false)).join("") : `<p class="quick-lookup-empty">${tab === "complete" ? "완료된" : "진행 중인"} 주문이 없습니다.</p>`;
    };
    result.querySelectorAll("[data-unavailable-tab]").forEach((button) => button.addEventListener("click", () => selectTab(button.dataset.unavailableTab)));
    selectTab("active");
  });
}

function orderListCard(order) {
  const rows = getMockOrderRows(order);
  const first = rows[0];
  const totals = orderTotals(order);
  return `
    <article class="order-history-card" data-process-status="${order.processStatus}" data-cancel-refund-status="${order.cancelRefundStatus || ""}" data-order-channel="${order.orderChannel}">
      <header>
        <strong>${order.orderedAt}</strong>
        <div class="order-history-header-meta">${order.fulfillment === "pickup" && order.pickupWindow ? `<span>공통 픽업가능일 <b>${pickupPeriodText(order.pickupWindow.start, order.pickupWindow.end)}</b></span>` : ""}<span>주문번호 <b>${order.orderNumber}</b></span></div>
      </header>
      <div class="order-history-body">
        <a class="order-history-product" href="?view=order-detail&order=${order.orderNumber}">
          ${productImage(first.product)}
          <span><small>주문상품 ${rows.length}종</small><span class="order-item-lines">${rows.map((item) => `<span><b>${escapeText(item.product.name)} · ${item.quantity}개</b>${order.fulfillment === "pickup" ? `<small>${pickupPeriodText(item.pickupStart, item.pickupEnd)} 픽업</small>` : ""}</span>`).join("")}</span></span>
        </a>
        <dl class="order-history-meta">
          <div><dt>주문경로</dt><dd>${order.orderChannel || "링크주문"}</dd></div>
          <div><dt>수령 방식</dt><dd>${fulfillmentName(order.fulfillment)}</dd></div>
          <div><dt>처리상태</dt><dd><span class="status-badge ${statusClass(order.processStatus)}">${order.processStatus}</span></dd></div>
          <div><dt>결제수단</dt><dd>${paymentMethodName(order.payment)}</dd></div>
          <div><dt>결제상태</dt><dd><span class="status-badge ${statusClass(order.paymentStatus)}">${order.paymentStatus}</span></dd></div>
          <div><dt>결제금액</dt><dd><strong>${formatPrice(totals.finalTotal)}</strong></dd></div>
          <div class="cancel-refund-row"><dt>취소·반품</dt><dd>${order.cancelRefundStatus ? `<span class="status-badge ${statusClass(order.cancelRefundStatus)}">${order.cancelRefundStatus}</span>` : "-"}</dd></div>
        </dl>
        <div class="order-history-actions">
          ${orderAction(order)}
          <a class="primary-button" href="?view=order-detail&order=${order.orderNumber}">주문 상세</a>
        </div>
      </div>
    </article>`;
}

function renderOrderHistory() {
  const memberOrders = mockOrders.filter((order) => phoneDigits(order.phone) === loggedInPhone());
  const content = `
    <header class="mypage-content-heading"><h2>주문내역</h2><p>주문상품과 수령·결제 상태를 확인할 수 있습니다.</p></header>
    <div class="order-channel-tabs" role="tablist" aria-label="주문경로"><button type="button" class="is-active" data-order-channel-filter="">전체</button><button type="button" data-order-channel-filter="링크주문">링크주문</button><button type="button" data-order-channel-filter="채팅주문">채팅주문</button></div>
    <div class="order-history-filter">
      <div class="period-buttons" aria-label="조회 기간"><button class="is-active" type="button">1개월</button><button type="button">3개월</button><button type="button">6개월</button></div>
      <label><span class="sr-only">처리상태</span><select id="orderStatusFilter"><option value="">전체 상태</option><optgroup label="주문상태"><option>주문접수</option><option>픽업대기</option><option>픽업완료</option><option>배달대기</option><option>배달중</option><option>배달완료</option></optgroup><optgroup label="취소·반품상태"><option>취소요청</option><option>취소승인</option><option>취소반려</option><option>반품요청</option><option>반품승인</option><option>반품반려</option></optgroup></select></label>
      <button class="secondary-button" id="orderHistorySearch" type="button">조회</button>
    </div>
    <div class="order-history-count">총 <strong id="orderHistoryCount">${memberOrders.length}</strong>건</div>
    <div class="order-history-list" id="orderHistoryList">${memberOrders.length ? memberOrders.map(orderListCard).join("") : '<p class="quick-lookup-empty">주문내역이 없습니다.</p>'}</div>`;
  pageContent.innerHTML = myPageFrame(content);
  bindNoticeButtons();
  bindOrderRequestActions();

  document.querySelectorAll(".period-buttons button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".period-buttons button").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
    });
  });
  let activeChannel = "";
  const applyOrderFilters = () => {
    const selected = document.querySelector("#orderStatusFilter").value;
    let visibleCount = 0;
    document.querySelectorAll(".order-history-card").forEach((card) => {
      const statusMatch = !selected || card.dataset.processStatus === selected || card.dataset.cancelRefundStatus === selected;
      const visible = statusMatch && (!activeChannel || card.dataset.orderChannel === activeChannel);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    document.querySelector("#orderHistoryCount").textContent = String(visibleCount);
    if (!visibleCount) showToast("선택한 상태의 주문이 없습니다.");
  };
  document.querySelector("#orderHistorySearch").addEventListener("click", applyOrderFilters);
  document.querySelectorAll("[data-order-channel-filter]").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll("[data-order-channel-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
    activeChannel = button.dataset.orderChannelFilter;
    applyOrderFilters();
  }));
}

function renderOrderDetail(params) {
  const orderNumber = params.get("order");
  const order = mockOrders.find((item) => item.orderNumber === orderNumber);
  if (!order) {
    pageContent.innerHTML = `<section class="site-width quick-lookup-page"><p class="quick-lookup-empty">주문을 찾을 수 없습니다.</p><a class="secondary-button" href="?view=quick-order-lookup">간편 주문 조회로</a></section>`;
    return;
  }
  let login;
  try { login = JSON.parse(localStorage.getItem("onmaeul-login")); } catch {}
  if (!login?.phone) {
    sessionStorage.setItem("onmaeul-quick-order-intent", JSON.stringify({ orderNumber, action: params.get("action") || "detail" }));
    window.alert("로그인 후 이용할 수 있습니다.");
    window.location.href = "?view=login";
    return;
  }
  if (String(login.phone).replace(/\D/g, "") !== String(order.phone).replace(/\D/g, "")) {
    sessionStorage.setItem("onmaeul-quick-order-intent", JSON.stringify({ orderNumber, action: params.get("action") || "detail" }));
    window.location.href = "?view=login";
    return;
  }
  const rows = getMockOrderRows(order);
  const totals = orderTotals(order);
  const isDelivery = order.fulfillment === "delivery";
  const content = `
    <div class="order-detail-top">
      <a class="back-link" href="?view=order-history">← 주문내역으로</a>
      <header class="mypage-content-heading">
        <div><h2>주문 상세</h2><p>${order.orderedAt} ${order.orderedTime}</p></div>
        <span>주문번호 <strong>${order.orderNumber}</strong></span>
      </header>
      <div class="order-status-summary ${order.cancelRefundStatus ? "has-request-status" : ""}">
        <div><span>수령 방식</span><strong>${fulfillmentName(order.fulfillment)}</strong></div>
        <div><span>처리상태</span><strong class="status-badge ${statusClass(order.processStatus)}">${order.processStatus}</strong></div>
        <div><span>결제상태</span><strong class="status-badge ${statusClass(order.paymentStatus)}">${order.paymentStatus}</strong></div>
        ${order.cancelRefundStatus ? `<div class="order-request-status"><span>취소·반품상태</span><strong class="status-badge ${statusClass(order.cancelRefundStatus)}">${order.cancelRefundStatus}</strong></div>` : ""}
      </div>
    </div>
    <section class="order-detail-section">
      <h3>주문상품 <span>${rows.length}종</span></h3>
      <div class="order-detail-products">
        ${rows.map(({ product, quantity, pickupStart, pickupEnd }) => `
          <article>
            <a href="?view=product&id=${product.id}">${productImage(product)}</a>
            <div><small>${product.category1} &gt; ${product.category2}</small><a href="?view=product&id=${product.id}"><strong>${product.name}</strong></a><span>수량 ${quantity}개 · 개당 ${formatPrice(product.price)}</span>${!isDelivery ? `<span>${pickupPeriodText(pickupStart, pickupEnd)} 픽업</span>` : ""}</div>
            <b>${formatPrice(product.price * quantity)}</b>
          </article>`).join("")}
      </div>
    </section>
    <div class="order-detail-grid">
      <section class="order-detail-section">
        <h3>주문자 정보</h3>
        <dl class="order-detail-info"><div><dt>주문경로</dt><dd>${order.orderChannel || "링크주문"}</dd></div><div><dt>주문자명</dt><dd>${order.customerName}</dd></div><div><dt>휴대폰번호</dt><dd>${formatPhone(order.phone)}</dd></div><div><dt>회원주문 코드</dt><dd>${order.nicknameCode}</dd></div>${order.orderChannel === "채팅주문" ? `<div><dt>채팅주문 닉네임</dt><dd>${escapeText(order.chatNickname || "산책러")}</dd></div>` : ""}</dl>
      </section>
      <section class="order-detail-section">
        <h3>${isDelivery ? "배달 정보" : "픽업 정보"}</h3>
        <dl class="order-detail-info">
          ${isDelivery
            ? `<div><dt>배달지</dt><dd>${order.deliveryAddressName ? `<b>${order.deliveryAddressName}</b><br />` : ""}${order.deliveryAddress}</dd></div><div><dt>요청사항</dt><dd>${order.deliveryRequest}</dd></div>`
            : `<div><dt>픽업 장소</dt><dd>온마을 공동구매<br />경기 수원시 영통구 온마을로 27, 1층</dd></div><div><dt>공통 픽업가능일</dt><dd>${pickupPeriodText(order.pickupWindow?.start, order.pickupWindow?.end)}</dd></div><div><dt>요청사항</dt><dd>${order.pickupRequest}</dd></div>`}
        </dl>
      </section>
    </div>
    <section class="order-detail-section order-detail-payment">
      <h3>결제 정보</h3>
      <div class="order-payment-layout">
        <dl class="order-detail-info"><div><dt>결제수단</dt><dd>${paymentMethodName(order.payment)}</dd></div><div><dt>결제상태</dt><dd><span class="status-badge ${statusClass(order.paymentStatus)}">${order.paymentStatus}</span></dd></div>${order.payment === "transfer" ? "<div><dt>입금계좌</dt><dd>국민 123456-01-123456 · 온마을마켓</dd></div>" : ""}</dl>
        <dl class="order-payment-total"><div><dt>상품금액</dt><dd>${formatPrice(totals.productTotal)}</dd></div><div><dt>배달비</dt><dd>${formatPrice(totals.deliveryFee)}</dd></div><div><dt>최종 결제금액</dt><dd>${formatPrice(totals.finalTotal)}</dd></div></dl>
      </div>
    </section>
    <div class="order-detail-actions">${orderAction(order)}<a class="secondary-button" href="?view=order-history">목록으로</a></div>`;
  pageContent.innerHTML = myPageFrame(content);
  bindNoticeButtons();
  bindOrderRequestActions();
  const quickAction = params.get("action");
  if (quickAction === "request-detail" && order.cancelRefundStatus) openRequestDetailModal(order.orderNumber);
  if (["cancel", "return"].includes(quickAction) && !order.cancelRefundStatus) openOrderRequestModal(order.orderNumber, quickAction);
}

function bindPasswordToggles() {
  document.querySelectorAll("[data-password-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.querySelector(`#${button.dataset.passwordToggle}`);
      if (!input) return;
      const isVisible = input.type === "text";
      input.type = isVisible ? "password" : "text";
      button.textContent = isVisible ? "보기" : "숨기기";
      button.setAttribute("aria-label", isVisible ? "비밀번호 보기" : "비밀번호 숨기기");
    });
  });
}

function renderLogin() {
  pageContent.innerHTML = `
    <section class="site-width auth-page">
      <div class="auth-card auth-card-small">
        <header class="auth-heading"><span>MEMBER</span><h1>로그인</h1><p>가입한 휴대폰번호로 로그인해 주세요.</p></header>
        <form id="loginForm" class="auth-form">
          <label class="auth-field"><span>휴대폰번호</span><input name="phone" type="tel" placeholder="010-0000-0000" autocomplete="tel" required /></label>
          <label class="auth-field"><span>비밀번호</span><span class="password-field"><input id="loginPassword" name="password" type="password" placeholder="비밀번호를 입력해 주세요." autocomplete="current-password" required /><button type="button" data-password-toggle="loginPassword" aria-label="비밀번호 보기">보기</button></span></label>
          <label class="auth-checkbox"><input name="keepLogin" type="checkbox" /><span>로그인 상태 유지</span></label>
          <button class="primary-button auth-submit" type="submit">로그인</button>
        </form>
        <nav class="auth-links" aria-label="회원 메뉴"><a href="?view=signup">회원가입</a><a href="?view=reset-password">비밀번호 재설정</a></nav>
      </div>
    </section>`;
  bindPasswordToggles();
  document.querySelector("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const phone = phoneDigits(data.get("phone"));
    if (phone.length !== 11) return showToast("휴대폰번호 11자리를 입력해 주세요.");
    let intent;
    try { intent = JSON.parse(sessionStorage.getItem("onmaeul-quick-order-intent")); } catch {}
    if (intent?.orderNumber) {
      const order = mockOrders.find((item) => item.orderNumber === intent.orderNumber);
      localStorage.setItem("onmaeul-login", JSON.stringify({ phone, keepLogin: data.get("keepLogin") === "on" }));
      if (order && phone === phoneDigits(order.phone)) {
        if (intent.action === "detail") {
          sessionStorage.removeItem("onmaeul-quick-order-intent");
          window.location.href = `?view=order-detail&order=${encodeURIComponent(order.orderNumber)}`;
        } else {
          window.location.href = "?view=quick-order-lookup";
        }
      } else {
        sessionStorage.removeItem("onmaeul-quick-order-intent");
        window.location.href = "./index.html";
      }
      return;
    }
    localStorage.setItem("onmaeul-login", JSON.stringify({ phone, keepLogin: data.get("keepLogin") === "on" }));
    const afterLogin = sessionStorage.getItem("onmaeul-after-login");
    sessionStorage.removeItem("onmaeul-after-login");
    showToast("로그인되었습니다.");
    window.setTimeout(() => { window.location.href = afterLogin || "./index.html"; }, 500);
  });
}

function renderSignup() {
  pageContent.innerHTML = `
    <section class="site-width auth-page">
      <div class="auth-card">
        <header class="auth-heading"><span>JOIN</span><h1>회원가입</h1><p>주문과 수령에 필요한 정보만 입력합니다.</p></header>
        <form id="signupForm" class="auth-form auth-form-long">
          <section class="auth-form-section">
            <div class="auth-section-title"><span>01</span><h2>휴대폰번호 인증</h2></div>
            <label class="auth-field"><span>휴대폰번호 *</span><span class="inline-field"><input id="signupPhone" name="phone" type="tel" placeholder="010-0000-0000" autocomplete="tel" required /><button class="secondary-button" id="sendSignupCode" type="button">인증번호 발송</button></span></label>
            <label class="auth-field"><span>인증번호 *</span><span class="inline-field"><input id="signupCode" type="text" inputmode="numeric" maxlength="6" pattern="[0-9]{6}" placeholder="숫자 6자리" /><button class="secondary-button" id="verifySignupCode" type="button">확인</button></span><small class="field-message" id="signupPhoneMessage">목업에서는 숫자 6자리를 입력하면 인증됩니다.</small></label>
          </section>

          <section class="auth-form-section">
            <div class="auth-section-title"><span>02</span><h2>로그인 정보</h2></div>
            <label class="auth-field"><span>비밀번호 *</span><span class="password-field"><input id="signupPassword" name="password" type="password" minlength="8" placeholder="영문·숫자 조합 8자 이상" autocomplete="new-password" required /><button type="button" data-password-toggle="signupPassword" aria-label="비밀번호 보기">보기</button></span></label>
            <label class="auth-field"><span>비밀번호 확인 *</span><span class="password-field"><input id="signupPasswordConfirm" name="passwordConfirm" type="password" minlength="8" placeholder="비밀번호를 다시 입력해 주세요." autocomplete="new-password" required /><button type="button" data-password-toggle="signupPasswordConfirm" aria-label="비밀번호 보기">보기</button></span></label>
          </section>

          <section class="auth-form-section">
            <div class="auth-section-title"><span>03</span><h2>회원정보</h2></div>
            <div class="auth-form-grid">
              <label class="auth-field"><span>주문자명 *</span><input name="customerName" type="text" placeholder="이름을 입력해 주세요." autocomplete="name" required /></label>
              <label class="auth-field"><span>이메일 *</span><input name="email" type="email" placeholder="example@email.com" autocomplete="email" required /></label>
            </div>
            <label class="auth-field"><span>회원주문 코드 *</span><span class="inline-field"><input id="aliasCode" name="nicknameCode" inputmode="numeric" maxlength="4" pattern="[0-9]{4}" placeholder="숫자 4자리" required /><button class="secondary-button" id="checkAliasCode" type="button">중복 확인</button></span><small class="field-message" id="aliasMessage">주문 확인과 현장 수령에 사용하는 숫자 4자리 코드입니다.</small></label>
            <label class="auth-field"><span>채팅주문 닉네임</span><input name="chatNickname" type="text" placeholder="오픈채팅방에서 사용하는 닉네임" /><small class="field-message">채팅주문을 이용하는 경우에 입력해 주세요.</small></label>
          </section>

          <section class="auth-form-section optional-section">
            <div class="auth-section-title"><span>04</span><h2>대표 배달지 등록</h2></div>
            <p class="auth-section-description">입력한 주소는 마이페이지의 대표 배달지로 저장됩니다. 픽업만 이용한다면 입력하지 않아도 됩니다.</p>
            <div class="auth-form-grid address-grid">
              <label class="auth-field"><span>배달지명</span><input name="addressName" type="text" placeholder="예: 집" /></label>
              <label class="auth-field"><span>배달 주소</span><input name="address" type="text" placeholder="배달받을 주소를 입력해 주세요." autocomplete="street-address" /></label>
            </div>
          </section>

          <section class="auth-form-section agreement-list">
            <div class="auth-section-title"><span>05</span><h2>약관 동의</h2></div>
            <label class="auth-checkbox agreement-all"><input id="agreeAll" type="checkbox" /><span>전체 동의</span></label>
            <div class="agreement-row"><label class="auth-checkbox"><input name="agreeTerms" type="checkbox" required /><span>이용약관 동의 *</span></label><a href="?view=terms">보기</a></div>
            <div class="agreement-row"><label class="auth-checkbox"><input name="agreePrivacy" type="checkbox" required /><span>개인정보처리방침 동의 *</span></label><a href="?view=privacy">보기</a></div>
          </section>

          <button class="primary-button auth-submit" type="submit">회원가입 완료</button>
        </form>
        <p class="auth-bottom-copy">이미 회원이신가요? <a href="?view=login">로그인</a></p>
      </div>
    </section>`;
  bindPasswordToggles();
  const form = document.querySelector("#signupForm");
  const phoneMessage = document.querySelector("#signupPhoneMessage");
  const aliasMessage = document.querySelector("#aliasMessage");
  let phoneVerified = false;
  let aliasChecked = false;
  document.querySelector("#signupPhone").addEventListener("input", () => {
    phoneVerified = false;
    phoneMessage.textContent = "휴대폰번호 인증이 필요합니다.";
    phoneMessage.classList.remove("is-success");
  });
  document.querySelector("#sendSignupCode").addEventListener("click", () => {
    const phone = phoneDigits(document.querySelector("#signupPhone").value);
    if (phone.length !== 11) return showToast("휴대폰번호 11자리를 입력해 주세요.");
    phoneVerified = false;
    phoneMessage.textContent = "인증번호가 발송되었습니다. 유효시간 03:00";
    phoneMessage.classList.remove("is-success");
  });
  document.querySelector("#signupCode").addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/\D/g, "").slice(0, 6);
    phoneVerified = false;
    phoneMessage.textContent = "휴대폰번호 인증이 필요합니다.";
    phoneMessage.classList.remove("is-success");
  });
  document.querySelector("#verifySignupCode").addEventListener("click", () => {
    if (!/^\d{6}$/.test(document.querySelector("#signupCode").value)) return showToast("인증번호 6자리를 입력해 주세요.");
    phoneVerified = true;
    phoneMessage.textContent = "휴대폰번호 인증이 완료되었습니다.";
    phoneMessage.classList.add("is-success");
  });
  document.querySelector("#checkAliasCode").addEventListener("click", () => {
    if (!/^\d{4}$/.test(document.querySelector("#aliasCode").value)) return showToast("회원주문 코드 숫자 4자리를 입력해 주세요.");
    aliasChecked = true;
    aliasMessage.textContent = "사용할 수 있는 회원주문 코드입니다.";
    aliasMessage.classList.add("is-success");
  });
  document.querySelector("#aliasCode").addEventListener("input", () => {
    document.querySelector("#aliasCode").value = document.querySelector("#aliasCode").value.replace(/\D/g, "").slice(0, 4);
    aliasChecked = false;
    aliasMessage.textContent = "주문 확인과 현장 수령에 사용하는 숫자 4자리 코드입니다.";
    aliasMessage.classList.remove("is-success");
  });
  const agreeAll = document.querySelector("#agreeAll");
  const requiredAgreements = [...form.querySelectorAll("[name^=agree]")];
  agreeAll.addEventListener("change", () => requiredAgreements.forEach((input) => { input.checked = agreeAll.checked; }));
  requiredAgreements.forEach((input) => input.addEventListener("change", () => { agreeAll.checked = requiredAgreements.every((item) => item.checked); }));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!phoneVerified) return showToast("휴대폰번호 인증을 완료해 주세요.");
    if (!aliasChecked) return showToast("회원주문 코드 중복 확인을 완료해 주세요.");
    if (form.elements.password.value !== form.elements.passwordConfirm.value) return showToast("비밀번호가 일치하지 않습니다.");
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    data.phone = phoneDigits(data.phone);
    localStorage.setItem("onmaeul-member", JSON.stringify(data));
    localStorage.setItem("onmaeul-login", JSON.stringify({ phone: data.phone, keepLogin: true }));
    showToast("회원가입이 완료되었습니다.");
    window.setTimeout(() => { window.location.href = "./index.html"; }, 600);
  });
}

const franchiseAgreementContents = {
  service: { title: "09SCM 서비스 이용약관", sections: [["제1조 목적", "본 약관은 09SCM 가맹점 서비스 이용에 필요한 기본 사항을 정하기 위한 목업용 예시 문구입니다."], ["제2조 서비스 이용", "가맹점은 소속 본사의 승인과 필요한 후속 절차를 완료한 뒤 서비스를 이용할 수 있습니다."], ["제3조 이용자의 의무", "이용자는 가입 정보와 사업자 정보를 정확하게 입력하고 계정 정보를 안전하게 관리해야 합니다."]] },
  privacy: { title: "개인정보 수집·이용 동의", sections: [["수집 항목", "이름, 이메일, 휴대폰번호, 사업자 정보 등 가맹점 가입 심사와 서비스 제공에 필요한 정보를 수집합니다."], ["이용 목적", "본인 확인, 가맹점 가입 심사, 계정 생성, 서비스 이용 안내 및 문의 처리 목적으로 이용합니다."], ["보유 기간", "관련 법령과 운영 정책에서 정한 기간 동안 보관하며 실제 기간은 최종 약관 확정 시 반영합니다."]] },
  headOffice: { title: "소속 본사에 가입정보 제공 동의", sections: [["제공받는 자", "가입 신청 화면에 표시된 소속 프랜차이즈 본사입니다."], ["제공 항목", "회원정보와 사업자 정보 등 가맹점 가입 심사에 필요한 정보를 제공합니다."], ["제공 목적", "가맹점 가입 심사, 가맹 계약 관리 및 09SCM 서비스 운영을 위해 사용합니다."]] },
  marketing: { title: "마케팅 정보 수신 동의", sections: [["수신 내용", "09SCM 서비스 소식, 공동구매 상품 및 운영 관련 혜택 안내를 받을 수 있습니다."], ["수신 채널", "문자메시지, 이메일 등 동의한 연락처를 통해 안내할 수 있습니다."], ["동의 철회", "선택 동의 항목으로 동의하지 않아도 가입 신청이 가능하며 추후 철회할 수 있습니다."]] },
};

function closeFranchiseTermsModal() {
  const modal = document.querySelector("#franchiseTermsModal");
  if (!modal) return;
  const triggerId = modal.dataset.triggerId;
  modal.remove();
  document.body.style.overflow = "";
  if (triggerId) document.getElementById(triggerId)?.focus();
}

function showFranchiseTermsModal(type, trigger) {
  const agreement = franchiseAgreementContents[type];
  if (!agreement) return;
  closeFranchiseTermsModal();
  if (!trigger.id) trigger.id = `franchiseTermsTrigger-${type}`;
  const modal = document.createElement("div");
  modal.id = "franchiseTermsModal";
  modal.className = "franchise-terms-modal-backdrop";
  modal.dataset.triggerId = trigger.id;
  modal.innerHTML = `<section class="franchise-terms-modal" role="dialog" aria-modal="true" aria-labelledby="franchiseTermsTitle"><header class="franchise-terms-heading"><h2 id="franchiseTermsTitle">${agreement.title}</h2><button type="button" data-franchise-terms-close aria-label="닫기">×</button></header><div class="franchise-terms-content"><p class="franchise-terms-placeholder">현재 내용은 목업용 예시이며 추후 확정된 가맹 서비스 약관으로 교체됩니다.</p>${agreement.sections.map(([heading, body]) => `<section><h3>${heading}</h3><p>${body}</p></section>`).join("")}</div><footer><button class="primary-button" type="button" data-franchise-terms-close>확인</button></footer></section>`;
  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";
  modal.querySelectorAll("[data-franchise-terms-close]").forEach((button) => button.addEventListener("click", closeFranchiseTermsModal));
  modal.addEventListener("click", (event) => { if (event.target === modal) closeFranchiseTermsModal(); });
  modal.querySelector("[data-franchise-terms-close]").focus();
}

function bindFranchiseTermsButtons() {
  document.querySelectorAll("[data-franchise-terms]").forEach((button) => button.addEventListener("click", () => showFranchiseTermsModal(button.dataset.franchiseTerms, button)));
}

function renderFranchiseSignup() {
  pageContent.innerHTML = `
    <section class="site-width auth-page franchise-signup-page">
      <div class="auth-card franchise-signup-card">
        <header class="auth-heading franchise-signup-heading">
          <span>PARTNER JOIN</span>
          <h1>가맹점 가입 신청</h1>
          <p>회원가입 후 소속 본사의 승인을 거쳐 09SCM을 이용할 수 있습니다.</p>
        </header>

        <div class="franchise-guide" aria-label="가입 안내">
          <dl>
            <div><dt>소속 본사</dt><dd>온마을 공동구매 본사</dd></div>
            <div><dt>월 이용료</dt><dd>월 30,000원</dd></div>
          </dl>
          <p>PayApp 가입·연동과 이용료 결제는 본사 승인 후 진행합니다.</p>
        </div>

        <form id="franchiseSignupForm" class="auth-form auth-form-long">
          <section class="auth-form-section">
            <div class="auth-section-title"><span>01</span><h2>회원정보</h2></div>
            <div class="auth-form-grid">
              <label class="auth-field"><span>이름 *</span><input name="memberName" type="text" placeholder="이름을 입력해 주세요." autocomplete="name" required /></label>
              <label class="auth-field"><span>이메일 *</span><input name="email" type="email" placeholder="example@email.com" autocomplete="email" required /></label>
            </div>
            <label class="auth-field"><span>아이디 *</span><span class="inline-field"><input id="franchiseUserId" name="userId" type="text" minlength="4" pattern="[A-Za-z0-9]{4,}" placeholder="영문·숫자 4자리 이상" autocomplete="username" required /><button class="secondary-button" id="checkFranchiseUserId" type="button">중복 확인</button></span><small class="field-message" id="franchiseUserIdMessage">해당 아이디로 개별 소매몰 URL이 생성됩니다. (ex: 아이디 09shop → 09shop.09scm.com)</small></label>
            <div class="auth-form-grid">
              <label class="auth-field"><span>비밀번호 *</span><span class="password-field"><input id="franchisePassword" name="password" type="password" minlength="8" placeholder="영문·숫자 조합 8자 이상" autocomplete="new-password" required /><button type="button" data-password-toggle="franchisePassword" aria-label="비밀번호 보기">보기</button></span></label>
              <label class="auth-field"><span>비밀번호 확인 *</span><span class="password-field"><input id="franchisePasswordConfirm" name="passwordConfirm" type="password" minlength="8" placeholder="비밀번호를 다시 입력해 주세요." autocomplete="new-password" required /><button type="button" data-password-toggle="franchisePasswordConfirm" aria-label="비밀번호 보기">보기</button></span></label>
            </div>
            <label class="auth-field"><span>휴대폰번호 *</span><span class="inline-field"><input id="franchisePhone" name="phone" type="tel" placeholder="010-0000-0000" autocomplete="tel" required /><button class="secondary-button" id="sendFranchiseCode" type="button">인증번호 발송</button></span></label>
            <label class="auth-field"><span>인증번호 *</span><span class="inline-field"><input id="franchiseCode" type="text" inputmode="numeric" maxlength="6" pattern="[0-9]{6}" placeholder="숫자 6자리" required /><button class="secondary-button" id="verifyFranchiseCode" type="button">인증하기</button></span><small class="field-message" id="franchisePhoneMessage">목업에서는 숫자 6자리를 입력하면 인증됩니다.</small></label>
          </section>

          <section class="auth-form-section">
            <div class="auth-section-title"><span>02</span><h2>사업자 정보</h2></div>
            <fieldset class="business-type-field">
              <legend>사업자 유형 *</legend>
              <label><input type="radio" name="businessType" value="individual" checked /> 개인사업자</label>
              <label><input type="radio" name="businessType" value="corporation" /> 법인사업자</label>
            </fieldset>
            <div class="auth-form-grid">
              <label class="auth-field"><span id="businessNameLabel">상호명 *</span><input name="businessName" type="text" placeholder="사업자등록증의 상호명을 입력해 주세요." required /></label>
              <label class="auth-field"><span>대표자명 *</span><input name="representativeName" type="text" placeholder="대표자명을 입력해 주세요." required /></label>
            </div>
            <label class="auth-field"><span>사업자등록번호 *</span><span class="inline-field"><input id="businessNumber" name="businessNumber" type="text" inputmode="numeric" maxlength="12" pattern="[0-9]{3}-[0-9]{2}-[0-9]{5}" placeholder="000-00-00000" required /><button class="secondary-button" id="verifyBusinessNumber" type="button">사업자 인증</button></span><small class="field-message" id="businessNumberMessage">사업자등록번호 인증이 필요합니다.</small></label>
            <label class="auth-field corporation-only" id="corporationNumberField" hidden><span>법인등록번호 *</span><input id="corporationNumber" name="corporationNumber" type="text" inputmode="numeric" maxlength="14" pattern="[0-9]{6}-[0-9]{7}" placeholder="000000-0000000" /></label>
            <div class="auth-form-grid">
              <label class="auth-field"><span>업태</span><input name="businessCondition" type="text" placeholder="예: 도소매업" /></label>
              <label class="auth-field"><span>업종</span><input name="businessCategory" type="text" placeholder="예: 농산물" /></label>
            </div>
            <label class="auth-field"><span>사업장 주소 *</span><span class="inline-field address-search-field"><input id="businessPostalCode" name="postalCode" type="text" placeholder="우편번호" readonly required /><button class="secondary-button" id="findBusinessAddress" type="button">주소 찾기</button></span></label>
            <label class="auth-field"><span class="visually-hidden">기본주소</span><input id="businessAddress" name="businessAddress" type="text" placeholder="기본주소" readonly required /></label>
            <label class="auth-field"><span class="visually-hidden">상세주소</span><input name="businessAddressDetail" type="text" placeholder="상세주소를 입력해 주세요." required /></label>
          </section>

          <section class="auth-form-section agreement-list">
            <div class="auth-section-title"><span>03</span><h2>서비스 이용 및 약관 동의</h2></div>
            <label class="auth-checkbox agreement-all"><input id="franchiseAgreeAll" type="checkbox" /><span>전체 동의</span></label>
            <div class="agreement-row"><label class="auth-checkbox"><input name="agreeServiceTerms" type="checkbox" required /><span>09SCM 서비스 이용약관 동의 *</span></label><button class="agreement-detail-button" type="button" data-franchise-terms="service">보기</button></div>
            <div class="agreement-row"><label class="auth-checkbox"><input name="agreePrivacy" type="checkbox" required /><span>개인정보 수집·이용 동의 *</span></label><button class="agreement-detail-button" type="button" data-franchise-terms="privacy">보기</button></div>
            <div class="agreement-row"><label class="auth-checkbox"><input name="agreeHeadOffice" type="checkbox" required /><span>소속 본사에 가입정보 제공 동의 *</span></label><button class="agreement-detail-button" type="button" data-franchise-terms="headOffice">보기</button></div>
            <div class="agreement-row"><label class="auth-checkbox"><input name="agreeMarketing" type="checkbox" /><span>마케팅 정보 수신 동의</span></label><button class="agreement-detail-button" type="button" data-franchise-terms="marketing">보기</button></div>
          </section>

          <div class="franchise-form-actions">
            <a class="secondary-button" href="./index.html">취소</a>
            <button class="primary-button" type="submit">가입 신청</button>
          </div>
        </form>
      </div>
    </section>`;

  bindPasswordToggles();
  bindNoticeButtons();
  bindFranchiseTermsButtons();
  const form = document.querySelector("#franchiseSignupForm");
  const userIdInput = document.querySelector("#franchiseUserId");
  const userIdMessage = document.querySelector("#franchiseUserIdMessage");
  const phoneMessage = document.querySelector("#franchisePhoneMessage");
  const businessNumberInput = document.querySelector("#businessNumber");
  const businessNumberMessage = document.querySelector("#businessNumberMessage");
  const corporationNumberField = document.querySelector("#corporationNumberField");
  const corporationNumberInput = document.querySelector("#corporationNumber");
  const businessNameLabel = document.querySelector("#businessNameLabel");
  const franchiseIdGuide = "해당 아이디로 개별 소매몰 URL이 생성됩니다. (ex: 아이디 09shop → 09shop.09scm.com)";
  let userIdChecked = false;
  let phoneVerified = false;
  let businessVerified = false;

  document.querySelector("#checkFranchiseUserId").addEventListener("click", () => {
    if (!/^[A-Za-z0-9]{4,}$/.test(userIdInput.value)) return showToast("아이디 입력 형식을 확인해 주세요.");
    userIdChecked = true;
    userIdMessage.textContent = `사용할 수 있는 아이디입니다. ${franchiseIdGuide}`;
    userIdMessage.classList.add("is-success");
  });
  userIdInput.addEventListener("input", () => {
    userIdChecked = false;
    userIdMessage.textContent = franchiseIdGuide;
    userIdMessage.classList.remove("is-success");
  });
  document.querySelector("#sendFranchiseCode").addEventListener("click", () => {
    const phone = phoneDigits(document.querySelector("#franchisePhone").value);
    if (phone.length !== 11) return showToast("휴대폰번호 11자리를 입력해 주세요.");
    phoneVerified = false;
    phoneMessage.textContent = "인증번호가 발송되었습니다. 유효시간 03:00";
    phoneMessage.classList.remove("is-success");
  });
  document.querySelector("#franchiseCode").addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/\D/g, "").slice(0, 6);
    phoneVerified = false;
    phoneMessage.textContent = "휴대폰번호 인증이 필요합니다.";
    phoneMessage.classList.remove("is-success");
  });
  document.querySelector("#verifyFranchiseCode").addEventListener("click", () => {
    if (!/^\d{6}$/.test(document.querySelector("#franchiseCode").value)) return showToast("인증번호 6자리를 입력해 주세요.");
    phoneVerified = true;
    phoneMessage.textContent = "휴대폰번호 인증이 완료되었습니다.";
    phoneMessage.classList.add("is-success");
  });
  document.querySelector("#verifyBusinessNumber").addEventListener("click", () => {
    const number = businessNumberInput.value.replace(/\D/g, "");
    if (number.length !== 10) return showToast("사업자등록번호 10자리를 입력해 주세요.");
    businessVerified = true;
    businessNumberMessage.textContent = "사업자등록번호 인증이 완료되었습니다.";
    businessNumberMessage.classList.add("is-success");
  });
  businessNumberInput.addEventListener("input", () => {
    const digits = businessNumberInput.value.replace(/\D/g, "").slice(0, 10);
    businessNumberInput.value = [digits.slice(0, 3), digits.slice(3, 5), digits.slice(5)].filter(Boolean).join("-");
    businessVerified = false;
    businessNumberMessage.textContent = "사업자등록번호 인증이 필요합니다.";
    businessNumberMessage.classList.remove("is-success");
  });
  corporationNumberInput.addEventListener("input", () => {
    const digits = corporationNumberInput.value.replace(/\D/g, "").slice(0, 13);
    corporationNumberInput.value = [digits.slice(0, 6), digits.slice(6)].filter(Boolean).join("-");
  });
  form.querySelectorAll("[name=businessType]").forEach((radio) => {
    radio.addEventListener("change", () => {
      if (!radio.checked) return;
      const isCorporation = radio.value === "corporation";
      corporationNumberField.hidden = !isCorporation;
      corporationNumberInput.required = isCorporation;
      businessNameLabel.textContent = isCorporation ? "법인명 *" : "상호명 *";
    });
  });
  document.querySelector("#findBusinessAddress").addEventListener("click", () => {
    document.querySelector("#businessPostalCode").value = "16690";
    document.querySelector("#businessAddress").value = "경기 수원시 영통구 온마을로 27";
    showToast("목업 주소가 입력되었습니다.");
  });
  const agreeAll = document.querySelector("#franchiseAgreeAll");
  const agreements = [...form.querySelectorAll("[name^=agree]")];
  agreeAll.addEventListener("change", () => agreements.forEach((input) => { input.checked = agreeAll.checked; }));
  agreements.forEach((input) => input.addEventListener("change", () => { agreeAll.checked = agreements.every((item) => item.checked); }));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!userIdChecked) return showToast("아이디 중복 확인을 완료해 주세요.");
    if (form.elements.password.value !== form.elements.passwordConfirm.value) return showToast("비밀번호가 일치하지 않습니다.");
    if (!phoneVerified) return showToast("휴대폰번호 인증을 완료해 주세요.");
    if (!businessVerified) return showToast("사업자등록번호 인증을 완료해 주세요.");
    if (!form.reportValidity()) return;
    showFranchiseApplicationModal();
  });
}

function showFranchiseApplicationModal() {
  const modal = document.createElement("div");
  modal.className = "franchise-modal-backdrop";
  modal.innerHTML = `
    <section class="franchise-complete-modal" role="dialog" aria-modal="true" aria-labelledby="franchiseCompleteTitle">
      <span class="complete-mark" aria-hidden="true">✓</span>
      <h2 id="franchiseCompleteTitle">가입 신청이 접수되었습니다.</h2>
      <p>소속 본사에서 신청 내용을 확인한 후<br />입력한 휴대폰번호로 승인 결과를 안내드립니다.</p>
      <div class="franchise-modal-actions">
        <a class="secondary-button" href="./index.html">메인화면 복귀</a>
        <a class="primary-button" href="https://0scm.com/">09SCM 솔루션 소개 홈페이지 이동</a>
      </div>
    </section>`;
  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";
  modal.querySelector(".primary-button").focus();
}

function renderPasswordReset() {
  pageContent.innerHTML = `
    <section class="site-width auth-page">
      <div class="auth-card auth-card-small">
        <div id="resetStepOne" class="auth-step">
          <header class="auth-heading"><span>RESET PASSWORD</span><h1>비밀번호 재설정</h1><p>가입한 휴대폰번호를 인증해 주세요.</p></header>
          <div class="auth-form">
            <label class="auth-field"><span>휴대폰번호</span><span class="inline-field"><input id="resetPhone" type="tel" placeholder="010-0000-0000" autocomplete="tel" /><button class="secondary-button" id="sendResetCode" type="button">인증번호 발송</button></span></label>
            <label class="auth-field"><span>인증번호</span><span class="inline-field"><input id="resetCode" inputmode="numeric" maxlength="6" placeholder="숫자 6자리" /><button class="secondary-button" id="verifyResetCode" type="button">확인</button></span><small class="field-message" id="resetMessage">목업에서는 숫자 6자리를 입력하면 인증됩니다.</small></label>
            <button class="primary-button auth-submit" id="resetNext" type="button" disabled>다음</button>
          </div>
          <p class="auth-bottom-copy"><a href="?view=login">로그인으로 돌아가기</a></p>
        </div>
        <div id="resetStepTwo" class="auth-step" hidden>
          <header class="auth-heading"><span>NEW PASSWORD</span><h1>새 비밀번호 설정</h1><p>새로 사용할 비밀번호를 입력해 주세요.</p></header>
          <form id="newPasswordForm" class="auth-form">
            <label class="auth-field"><span>새 비밀번호</span><span class="password-field"><input id="newPassword" name="newPassword" type="password" minlength="8" placeholder="영문·숫자 조합 8자 이상" autocomplete="new-password" required /><button type="button" data-password-toggle="newPassword" aria-label="비밀번호 보기">보기</button></span></label>
            <label class="auth-field"><span>새 비밀번호 확인</span><span class="password-field"><input id="newPasswordConfirm" name="newPasswordConfirm" type="password" minlength="8" placeholder="비밀번호를 다시 입력해 주세요." autocomplete="new-password" required /><button type="button" data-password-toggle="newPasswordConfirm" aria-label="비밀번호 보기">보기</button></span></label>
            <button class="primary-button auth-submit" type="submit">비밀번호 변경 완료</button>
          </form>
        </div>
      </div>
    </section>`;
  bindPasswordToggles();
  const resetMessage = document.querySelector("#resetMessage");
  const resetNext = document.querySelector("#resetNext");
  document.querySelector("#sendResetCode").addEventListener("click", () => {
    const phone = phoneDigits(document.querySelector("#resetPhone").value);
    if (phone.length !== 11) return showToast("휴대폰번호 11자리를 입력해 주세요.");
    resetNext.disabled = true;
    resetMessage.textContent = "인증번호가 발송되었습니다. 유효시간 03:00";
    resetMessage.classList.remove("is-success");
  });
  document.querySelector("#verifyResetCode").addEventListener("click", () => {
    if (!/^\d{6}$/.test(document.querySelector("#resetCode").value)) return showToast("인증번호 6자리를 입력해 주세요.");
    resetNext.disabled = false;
    resetMessage.textContent = "휴대폰번호 인증이 완료되었습니다.";
    resetMessage.classList.add("is-success");
  });
  resetNext.addEventListener("click", () => {
    document.querySelector("#resetStepOne").hidden = true;
    document.querySelector("#resetStepTwo").hidden = false;
    document.querySelector("#newPassword").focus();
  });
  document.querySelector("#newPasswordForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.elements.newPassword.value !== form.elements.newPasswordConfirm.value) return showToast("비밀번호가 일치하지 않습니다.");
    if (!form.reportValidity()) return;
    showToast("비밀번호가 변경되었습니다.");
    window.setTimeout(() => { window.location.href = "?view=login"; }, 600);
  });
}

function renderPolicyPage(type) {
  const isPrivacy = type === "privacy";
  const title = isPrivacy ? "개인정보처리방침" : "이용약관";
  const sections = isPrivacy
    ? [
        ["1. 개인정보의 수집 항목", "회사는 서비스 제공을 위해 이름, 휴대폰번호, 주문정보 등 필요한 최소한의 정보를 수집할 수 있습니다. 실제 수집 항목은 운영 정책 확정 후 변경될 예정입니다."],
        ["2. 개인정보의 이용 목적", "수집한 정보는 회원 식별, 주문 접수, 결제 확인, 상품 픽업 및 배달 안내, 고객 문의 처리 목적으로 이용합니다."],
        ["3. 개인정보의 보유 및 이용기간", "개인정보는 이용 목적을 달성한 후 관련 법령과 내부 정책에서 정한 기간 동안 보관한 뒤 지체 없이 파기합니다."],
        ["4. 개인정보의 제3자 제공", "회사는 이용자의 동의가 있거나 법령상 근거가 있는 경우를 제외하고 개인정보를 외부에 제공하지 않습니다."],
        ["5. 개인정보 처리업무의 위탁", "원활한 서비스 제공을 위해 결제, 알림 발송 등 일부 업무를 외부 전문업체에 위탁할 수 있으며 세부 내용은 추후 고지합니다."],
        ["6. 이용자의 권리와 행사방법", "이용자는 자신의 개인정보에 대해 열람, 정정, 삭제 및 처리정지를 요청할 수 있습니다."],
        ["7. 개인정보의 안전성 확보조치", "회사는 개인정보가 분실, 도난, 유출 또는 훼손되지 않도록 필요한 관리적·기술적 보호조치를 적용합니다."],
        ["8. 개인정보 관련 문의", "개인정보 관련 문의처와 책임자 정보는 운영 주체가 확정된 후 실제 정보로 교체할 예정입니다."],
      ]
    : [
        ["제1조 목적", "본 약관은 온마을 공동구매 소매몰에서 제공하는 상품 주문 및 관련 서비스 이용에 필요한 기본 사항을 정하는 것을 목적으로 합니다."],
        ["제2조 회원가입 및 계정", "이용자는 정확한 정보를 입력하여 회원가입을 진행하며, 자신의 계정 정보를 안전하게 관리해야 합니다."],
        ["제3조 상품 주문", "이용자는 상품 정보, 가격, 수량, 수령 방식 등을 확인한 후 주문해야 하며 상품별 판매 조건은 달라질 수 있습니다."],
        ["제4조 결제", "주문 시 제공되는 카드결제, 계좌이체 또는 현장결제 방식 중 이용 가능한 수단을 선택할 수 있습니다."],
        ["제5조 픽업 및 배달", "픽업 장소와 시간 또는 배달 주소는 주문 과정에서 확인하며, 운영 상황에 따라 수령 가능 시간과 배달 조건이 변경될 수 있습니다."],
        ["제6조 주문 취소 및 환불", "주문 취소와 환불은 상품 준비 상태 및 판매자의 운영 정책에 따라 제한될 수 있으며 세부 기준은 추후 확정합니다."],
        ["제7조 서비스 이용 제한", "서비스 운영을 방해하거나 타인의 권리를 침해하는 행위가 확인될 경우 서비스 이용이 제한될 수 있습니다."],
        ["제8조 기타", "본 약관에서 정하지 않은 사항은 관련 법령과 일반적인 상관례를 따릅니다."],
      ];
  pageContent.innerHTML = `
    <section class="site-width policy-page">
      <nav class="breadcrumb" aria-label="현재 위치"><a href="./index.html">홈</a><span>›</span><span>${title}</span></nav>
      <header class="policy-heading">
        <span>${isPrivacy ? "개인정보 보호 안내" : "서비스 이용 안내"}</span>
        <h1>${title}</h1>
        <p>시행일 2026년 9월 1일</p>
      </header>
      <div class="policy-placeholder"><strong>임시 안내</strong><p>현재 페이지는 화면 구성을 확인하기 위한 목업용 문구입니다. 정식 운영 전 확정된 내용으로 교체됩니다.</p></div>
      <article class="policy-content">
        <p class="policy-intro">온마을 공동구매는 이용자가 서비스를 이해하고 안심하여 이용할 수 있도록 아래 내용을 안내합니다.</p>
        ${sections.map(([heading, body]) => `<section><h2>${heading}</h2><p>${body}</p></section>`).join("")}
      </article>
    </section>`;
}

function renderPage() {
  const params = new URLSearchParams(window.location.search);
  const view = params.get("view") || "home";
  document.body.classList.toggle("is-unavailable", view === "unavailable");
  if (["order-history", "my-info", "delivery-address", "withdrawal"].includes(view) && !loggedInPhone()) {
    sessionStorage.setItem("onmaeul-after-login", window.location.search);
    window.alert("로그인이 필요합니다.");
    window.location.replace("?view=login");
    return;
  }
  if (view === "unavailable") renderUnavailable();
  else if (view === "product") renderProduct(params);
  else if (view === "cart") renderCart();
  else if (view === "order") renderOrder();
  else if (view === "order-complete") renderOrderComplete();
  else if (view === "login") renderLogin();
  else if (view === "signup") renderSignup();
  else if (view === "franchise-signup") renderFranchiseSignup();
  else if (view === "reset-password") renderPasswordReset();
  else if (view === "terms") renderPolicyPage("terms");
  else if (view === "privacy") renderPolicyPage("privacy");
  else if (view === "order-history") renderOrderHistory();
  else if (view === "quick-order-lookup") renderQuickOrderLookup();
  else if (view === "order-detail") renderOrderDetail(params);
  else if (view === "my-info") renderMyInfo();
  else if (view === "delivery-address") renderDeliveryAddress();
  else if (view === "withdrawal") renderWithdrawal();
  else if (view === "catalog") renderCatalog(params);
  else renderMain();
  bindPhoneInputs();
  updateLoginLinks();
  const quickLink = document.querySelector("#quickOrderLookup");
  if (quickLink) quickLink.hidden = view === "quick-order-lookup" || view === "unavailable";
  updateCartCount();
  window.scrollTo(0, 0);
}

function updateLoginLinks() {
  let login;
  try { login = JSON.parse(localStorage.getItem("onmaeul-login")); } catch {}
  const isLoggedIn = phoneDigits(login?.phone).length === 11;
  document.querySelectorAll(".login-action, .drawer-member-menu > a:first-child").forEach((link) => {
    link.textContent = isLoggedIn ? "로그아웃" : "로그인";
    link.href = isLoggedIn ? "#logout" : "?view=login";
  });
}

document.querySelectorAll(".login-action, .drawer-member-menu > a:first-child").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.getAttribute("href") !== "#logout") return;
    event.preventDefault();
    localStorage.removeItem("onmaeul-login");
    sessionStorage.removeItem("onmaeul-quick-order-intent");
    sessionStorage.removeItem("onmaeul-after-login");
    window.location.href = "./index.html";
  });
});

function renderCategories() {
  categoryList.innerHTML = `
    <a class="category-all" href="?view=catalog">전체상품</a>
    ${categoryGroups.map((group) => `
      <section class="category-group">
        <a class="category-parent" href="?view=catalog&category1=${encodeURIComponent(group.name)}">${group.name}</a>
        <div class="category-children">
          ${group.children.map((child) => `<a href="?view=catalog&category1=${encodeURIComponent(group.name)}&category2=${encodeURIComponent(child)}">${child}</a>`).join("")}
        </div>
      </section>
    `).join("")}
  `;
}

function openCategoryDrawer() {
  setSearchOpen(false);
  categoryDrawer.classList.add("is-open");
  categoryDrawer.setAttribute("aria-hidden", "false");
  categoryOpen.setAttribute("aria-expanded", "true");
  drawerBackdrop.hidden = false;
  document.body.style.overflow = "hidden";
  categoryClose.focus();
}

function closeCategoryDrawer() {
  categoryDrawer.classList.remove("is-open");
  categoryDrawer.setAttribute("aria-hidden", "true");
  categoryOpen.setAttribute("aria-expanded", "false");
  drawerBackdrop.hidden = true;
  document.body.style.overflow = "";
}

function bindNoticeButtons() {
  document.querySelectorAll("[data-notice]").forEach((button) => {
    if (button.dataset.noticeBound) return;
    button.dataset.noticeBound = "true";
    button.addEventListener("click", () => showToast(button.dataset.notice));
  });
}

function bindAccountCopy() {
  const copyButton = document.querySelector("#copyAccount");
  const accountElement = document.querySelector("#bankAccount");
  if (!copyButton || !accountElement) return;
  copyButton.addEventListener("click", async () => {
    const account = accountElement.textContent;
    try {
      await navigator.clipboard.writeText(account);
      showToast("계좌이체 계좌를 복사했습니다.");
    } catch {
      showToast(`입금계좌: ${account}`);
    }
  });
}

function setSearchOpen(isOpen) {
  if (isOpen) closeCategoryDrawer();
  searchPanel.classList.toggle("is-open", isOpen);
  searchOpen.setAttribute("aria-expanded", String(isOpen));
  mobileSearchToggle.setAttribute("aria-expanded", String(isOpen));
  mobileSearchToggle.classList.toggle("is-open", isOpen);
  mobileSearchToggle.setAttribute("aria-label", isOpen ? "상품 검색 닫기" : "상품 검색 열기");
  if (isOpen) productSearch.focus();
}

categoryOpen.addEventListener("click", openCategoryDrawer);
categoryClose.addEventListener("click", closeCategoryDrawer);
drawerBackdrop.addEventListener("click", closeCategoryDrawer);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCategoryDrawer();
    setSearchOpen(false);
  }
});

searchOpen.addEventListener("click", () => {
  setSearchOpen(!searchPanel.classList.contains("is-open"));
});
mobileSearchToggle.addEventListener("click", () => {
  setSearchOpen(!searchPanel.classList.contains("is-open"));
});
searchClose.addEventListener("click", () => {
  setSearchOpen(false);
});
searchPanel.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = productSearch.value.trim();
  if (query) window.location.href = `?view=catalog&q=${encodeURIComponent(query)}`;
});

renderCategories();
renderPage();
bindNoticeButtons();

