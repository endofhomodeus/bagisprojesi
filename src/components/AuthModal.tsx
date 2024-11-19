import React, { useState } from 'react';
import { X, User, Users } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

type AuthType = 'selection' | 'userLogin' | 'authorizedLogin' | 'register';

export default function AuthModal({ isOpen, onClose, language }: AuthModalProps) {
  const [authType, setAuthType] = useState<AuthType>('selection');
  const t = translations[language];

  if (!isOpen) return null;

  const renderContent = () => {
    switch (authType) {
      case 'selection':
        return (
          <div className="space-y-4">
            <button
              onClick={() => setAuthType('userLogin')}
              className="w-full flex items-center justify-center space-x-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <User className="w-5 h-5" />
              <span>{t.auth.userLogin}</span>
            </button>
            <button
              onClick={() => setAuthType('authorizedLogin')}
              className="w-full flex items-center justify-center space-x-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>{t.auth.authorizedLogin}</span>
            </button>
          </div>
        );

      case 'userLogin':
      case 'authorizedLogin':
        return (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.auth.username}
              </label>
              <input
                type="text"
                className="input-field"
                placeholder={t.auth.usernamePlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.auth.password}
              </label>
              <input
                type="password"
                className="input-field"
                placeholder={t.auth.passwordPlaceholder}
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              {t.auth.loginButton}
            </button>
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              <button
                type="button"
                onClick={() => setAuthType('selection')}
                className="text-red-600 hover:text-red-700"
              >
                {t.auth.back}
              </button>
            </div>
          </form>
        );

      case 'register':
        return (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.auth.fullName}
              </label>
              <input
                type="text"
                className="input-field"
                placeholder={t.auth.fullNamePlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.auth.email}
              </label>
              <input
                type="email"
                className="input-field"
                placeholder={t.auth.emailPlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.auth.password}
              </label>
              <input
                type="password"
                className="input-field"
                placeholder={t.auth.passwordPlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.auth.confirmPassword}
              </label>
              <input
                type="password"
                className="input-field"
                placeholder={t.auth.confirmPasswordPlaceholder}
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              {t.auth.registerButton}
            </button>
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              <button
                type="button"
                onClick={() => setAuthType('selection')}
                className="text-red-600 hover:text-red-700"
              >
                {t.auth.back}
              </button>
            </div>
          </form>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
          {authType === 'selection' ? t.auth.login :
           authType === 'register' ? t.auth.register :
           authType === 'userLogin' ? t.auth.userLogin : t.auth.authorizedLogin}
        </h2>

        {renderContent()}

        {authType === 'selection' && (
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {t.auth.noAccount}{' '}
            <button
              onClick={() => setAuthType('register')}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              {t.auth.register}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}