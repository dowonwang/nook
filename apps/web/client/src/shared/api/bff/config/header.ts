// 앱이 BFF(/api, /action)를 호출할 때 붙이는 헤더
// 값은 비밀이 아님. 다른 사이트는 커스텀 헤더를 CORS preflight 없이 보낼 수 없고, 주소창 이동은 헤더를 붙일 수 없다는 점을 이용
export const BFF_REQUEST_HEADER = {
  name: 'x-nook-request',
  value: 'bff',
} as const;
