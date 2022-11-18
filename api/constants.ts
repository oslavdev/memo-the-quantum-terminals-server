export const PasswordPattern =
  `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-/|\\\\,._:';~"§±#+?!@$%^&*<>(){}[\\]]).{8,}$` as string;
export const EmailPattern = '^\\S+@\\S+\\.\\S{2,}$' as string;

export const TOKEN_URL = 'https://github.com/login/oauth/access_token' as string;
export const USER_URL = 'https://api.github.com/user' as string;

