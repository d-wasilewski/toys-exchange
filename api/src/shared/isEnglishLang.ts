import { User } from '@prisma/client';

export const IsEnglishLang = (user: User) => {
  return user.language === 'EN';
};

export const getConfirmationSubject = (user: User) => {
  return IsEnglishLang(user)
    ? 'Welcome to Toylink App! Confirm your email'
    : 'Witaj w aplikacji Toylink! Potwierdź swój email';
};

export const getResetPasswordSubject = (user: User) => {
  return IsEnglishLang(user) ? 'Password reset' : 'Reset hasła';
};
