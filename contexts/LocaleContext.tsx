'use client';
import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import enContent from '../locales/ca-en.json';
import frContent from '../locales/ca-fr.json';

interface ContentContextType {
  welcomePage: {
    title: string;
    description: string;
    pdfListTitle: string;
    pdfItems: string[];
    buttons: {
      cancel: string;
      continue: string;
    };
    noteHeading: string;
    note: string;
  };
}

type Locale = "ca-en" | "ca-fr";

const ContentContext = createContext<ContentContextType>(enContent as ContentContextType);
const SetLocaleContext = createContext<(locale: Locale) => void>(() => {});

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentContextType>(enContent as ContentContextType);

  const setLocale = useCallback((locale: Locale) => {
    if (locale === "ca-fr") {
      setContent(frContent as ContentContextType);
    } else {
      setContent(enContent as ContentContextType);
    }
  }, []);

  return (
    <ContentContext.Provider value={content}>
      <SetLocaleContext.Provider value={setLocale}>
        {children}
      </SetLocaleContext.Provider>
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
export const useSetLocale = () => useContext(SetLocaleContext);

export const useLocale = () => {
  const content = useContent();
  return content.welcomePage;
};