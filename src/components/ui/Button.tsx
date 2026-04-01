import React from 'react';
import { Text, StyleSheet, ActivityIndicator, ViewStyle, View, Pressable, Platform } from 'react-native';
import { colors, fonts, radius } from '../../theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  style,
  size = 'md',
}) => {
  const isDisabled = disabled || loading;

  const variantStyles = {
    primary: { bg: colors.primary, text: colors.secondary, border: colors.secondary },
    secondary: { bg: colors.surface, text: colors.secondary, border: colors.border },
    destructive: { bg: colors.error, text: '#fff', border: colors.secondary },
    outline: { bg: 'transparent', text: colors.secondary, border: colors.border },
  };

  const sizeStyles = {
    sm: { height: 32, paddingHorizontal: 12, fontSize: 13, radius: radius.md },
    md: { height: 44, paddingHorizontal: 20, fontSize: 14, radius: radius.lg },
    lg: { height: 52, paddingHorizontal: 28, fontSize: 16, radius: radius.xl },
  };

  const v = variantStyles[variant];
  const s = sizeStyles[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: isDisabled ? colors.borderLight : v.bg,
          borderColor: v.border,
          height: s.height,
          paddingHorizontal: s.paddingHorizontal,
          borderRadius: 24,
          opacity: pressed ? 0.7 : 1,
        } as ViewStyle,
        Platform.select({
          web: { cursor: isDisabled ? 'default' : 'pointer' } as any,
          default: {},
        }),
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={v.text} />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text
            style={[
              styles.label,
              { color: isDisabled ? colors.textMuted : v.text, fontSize: s.fontSize },
            ]}
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderWidth: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginLeft: 8,
  },
  label: {
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
});
