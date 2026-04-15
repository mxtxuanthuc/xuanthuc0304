export const dictionaries = {
  en: {
    home_title: 'Build your professional future',
    home_subtitle: 'Connect, create and apply with confidence.',
    auth_login: 'Log in',
    auth_register: 'Register',
  },
  vi: {
    home_title: 'Xây dựng tương lai nghề nghiệp',
    home_subtitle: 'Kết nối, tạo hồ sơ và ứng tuyển tự tin.',
    auth_login: 'Đăng nhập',
    auth_register: 'Đăng ký',
  },
} as const;

export type Locale = keyof typeof dictionaries;
