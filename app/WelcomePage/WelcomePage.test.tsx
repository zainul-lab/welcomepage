import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WelcomePage from './page';
import { useRouter } from 'next/navigation';
import { useContent, useSetLocale } from '../../contexts/LocaleContext';

// Mock the hooks and dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../contexts/LocaleContext', () => ({
  useContent: jest.fn(),
  useSetLocale: jest.fn(),
}));

describe('WelcomePage', () => {
  const mockContent = {
    welcomePage: {
      title: 'Welcome to Our Service',
      description: 'This is a description',
      pdfListTitle: 'Documents List',
      pdfItems: ['Document 1', 'Document 2', 'Document 3'],
      buttons: {
        cancel: 'Cancel',
        continue: 'Continue',
      },
      noteHeading: 'Important Note',
      note: 'Please read all documents carefully',
    },
  };

  const mockPush = jest.fn();
  const mockSetLocale = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useContent as jest.Mock).mockReturnValue(mockContent);
    (useSetLocale as jest.Mock).mockReturnValue(mockSetLocale);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the welcome page correctly', () => {
    render(<WelcomePage />);
    
    expect(screen.getByText('Welcome to Our Service')).toBeInTheDocument();
    expect(screen.getByText('This is a description')).toBeInTheDocument();
    expect(screen.getByText('Documents List')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  test('displays all PDF items in the list', () => {
    render(<WelcomePage />);
    
    mockContent.welcomePage.pdfItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test('language selector works correctly', async () => {
    render(<WelcomePage />);
    
    const languageSelect = screen.getByRole('combobox');
    fireEvent.mouseDown(languageSelect);
    
    const frenchOption = await screen.findByText('Français');
    fireEvent.click(frenchOption);
    
    expect(mockSetLocale).toHaveBeenCalledWith('ca-fr');
  });

  test('Continue button navigates to AccountSetup', () => {
    render(<WelcomePage />);
    
    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);
    
    expect(mockPush).toHaveBeenCalledWith('/AccountSetup');
  });

  test('applies correct styles to buttons', () => {
    render(<WelcomePage />);
    
    const cancelButton = screen.getByText('Cancel');
    const continueButton = screen.getByText('Continue');
    
    expect(cancelButton).toHaveStyle({
      color: '#0074bd',
      border: '2px solid #0074bd',
    });
    
    expect(continueButton).toHaveStyle({
      backgroundColor: '#0074bd',
      color: '#fff',
    });
  });

  test('renders responsive layout correctly', () => {
    // Mock window.innerWidth for responsive testing
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));
    
    render(<WelcomePage />);
    
    const flexContainer = screen.getByTestId('buttons-container');
    expect(flexContainer).toHaveStyle('flex-wrap: wrap');
  });

  test('displays the note section correctly', () => {
    render(<WelcomePage />);
    
    expect(screen.getByText('Important Note')).toBeInTheDocument();
    expect(screen.getByText('Please read all documents carefully')).toBeInTheDocument();
  });
});