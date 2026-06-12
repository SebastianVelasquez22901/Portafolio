import { createContext, useContext, useState, type ReactNode } from 'react';
import constantsES from '../data/constants.es';
import constantsEN from '../data/constants.en';
import type { Constants, ModalState } from '../types';

interface PortfolioContextValue {
  lang: 'es' | 'en';
  setLang: (lang: 'es' | 'en') => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  openModal: ModalState;
  setOpenModal: (modal: ModalState) => void;
  constants: Constants;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState<ModalState>({ state: false, project: null });

  const constants: Constants = lang === 'es' ? constantsES : constantsEN;

  return (
    <PortfolioContext.Provider value={{ lang, setLang, darkMode, setDarkMode, openModal, setOpenModal, constants }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
