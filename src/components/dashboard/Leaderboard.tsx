import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Trophy, ChevronLeft, Star } from 'lucide-react-native';
import { colors, fonts, radius, spacing, shadows } from '../../theme';
import { teachers } from '../../data/mockData';

export const Leaderboard: React.FC = () => {
  const topTeachers = [...teachers]
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, 3);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Trophy size={20} color={colors.warning} />
          <Text style={styles.title}>نجوم السنتر هذا الشهر</Text>
        </View>
        <Text style={styles.subtitle}>أعلى أداء تعليمي ومبيعات</Text>
      </View>

      {topTeachers.map((teacher, idx) => (
        <View key={teacher.id} style={styles.row}>
          <Image source={{ uri: teacher.avatar }} style={styles.avatar} />
          
          <View style={styles.info}>
            <View style={styles.topInfo}>
              <Text style={styles.name}>{teacher.name}</Text>
              <View style={styles.rating}>
                <Text style={styles.ratingText}>4.9</Text>
                <Star size={12} color={colors.warning} fill={colors.warning} />
              </View>
            </View>
            <Text style={styles.sales}>
              {(teacher.totalSales / 1000).toFixed(0)}K ر.س المبيعات
            </Text>
          </View>
          
          <TouchableOpacity style={styles.actionBtn}>
             <Text style={styles.btnText}>مشاهدة الملف الإداري</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1.2,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  titleRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: fonts.tajawalBold,
    fontSize: 20,
    color: colors.secondary,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    gap: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: colors.border,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  topInfo: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontFamily: fonts.tajawalBold,
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'right',
  },
  rating: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.warningLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: colors.warning,
  },
  sales: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  actionBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: colors.secondary,
  },
  btnText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: colors.secondary,
  },
});
