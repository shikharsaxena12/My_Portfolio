// Utility functions for theme management

export const applyThemeSettings = (themeSettings) => {
  if (!themeSettings) return;

  const root = document.documentElement;
  
  // Apply custom CSS variables for colors
  if (themeSettings.primaryColor) {
    root.style.setProperty('--primary-color', themeSettings.primaryColor);
  }
  
  if (themeSettings.secondaryColor) {
    root.style.setProperty('--secondary-color', themeSettings.secondaryColor);
  }
  
  if (themeSettings.accentColor) {
    root.style.setProperty('--accent-color', themeSettings.accentColor);
  }
};

export const getThemeMode = (themeSettings) => {
  return themeSettings?.defaultMode || 'dark';
};

export const initializeTheme = (themeSettings, toggleTheme, isDark) => {
  const defaultMode = getThemeMode(themeSettings);
  
  // Apply theme mode if different from current
  if ((defaultMode === 'dark' && !isDark) || (defaultMode === 'light' && isDark)) {
    toggleTheme();
  }
  
  // Apply color settings
  applyThemeSettings(themeSettings);
};