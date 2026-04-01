export const colors = {
  primary: '#FFFF00', // Pure Yellow
  primaryLight: '#FFFFE0',
  secondary: '#000000', // Solid Black
  background: '#F9FAFB', // Very light grey background
  surface: '#FFFFFF', // Pure white for cards
  textPrimary: '#111827',
  textSecondary: '#4B5563',
  textMuted: '#9CA3AF',
  border: '#E5E7EB', // Subtle grey border
  borderLight: '#F3F4F6',
  success: '#10B981',
  successLight: '#ECFDF5',
  warning: '#F59E0B',
  warningLight: '#FFFBEB',
  error: '#EF4444',
  info: '#3B82F6',
  infoLight: '#EFF6FF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const radius = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const fonts = {
  regular: 'Alexandria_400Regular',
  semiBold: 'Alexandria_600SemiBold',
  bold: 'Alexandria_700Bold',
  tajawalBold: 'Tajawal_700Bold',
};

export const shadows = {
  none: { elevation: 0, shadowOpacity: 0 },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
  },
};
