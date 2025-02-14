'use client';
import { createContext, useContext } from "react";
import zhCN from './zh-CN';

const locales = {
  'zh-CN': zhCN,
} as const;

const I18NContext = createContext<{
  locale: keyof typeof locales;
}>({
  locale: 'zh-CN',
});

export const I18NProvider = ({ children }: { children: React.ReactNode }) => {
  return <I18NContext.Provider value={{ locale: 'zh-CN' }}>{children}</I18NContext.Provider>;
};

export const useI18N = <T extends keyof typeof zhCN>(module: T) => {
  const { locale } = useContext(I18NContext);
  
  return {
    t: (key: keyof typeof zhCN[T]) => {
      return locales[locale][module][key];
    },
  };
};
