/** 회원가입 상태 */
export const SIGNUP_STATUS = {
  SUCCESS: {
    CREATE: "회원가입이 완료 되었습니다.",
  },
  ERROR: {
    INVALID_INPUT: "입력값 오류입니다.",
    EMAIL_ALREADY_EXISTS: "이미 사용 중인 이메일입니다.",
    SIGNUP_SERVER_ERROR: "회원가입을 다시 해주세요.",
  },
};

/** Auth zod 유효성 검사  */
export const AUTH_VALIDATION = {
  MESSAGES: {
    EMAIL_INVALID: "올바른 이메일 형식이 아닙니다.",
    PHONE_INVALID: "올바른 전화번호 형식이 아닙니다",
    PASSWORD_TOO_SHORT: "비밀번호는 최소 8자 이상이어야 합니다.",
    PASSWORD_TOO_LONG: "비밀번호는 72자 이하여야 합니다.",
    PHONE_TOO_SHORT: "전화번호가 너무 짧습니다.",
    PHONE_TOO_LONG: "전화번호가 너무 깁니다.",
  },
  PHONE_NUMBER: {
    PATTERN: /^010-\d{4}-\d{4}$/,
  },
};
