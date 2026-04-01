import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, radius, spacing, shadows } from '../../theme';

const activityLog = [
  { id: '1', user: 'هشام حسين', action: 'اشترى كورس الفيزياء', time: 'منذ دقيقة', success: true },
  { id: '2', user: 'أ. محمد عمر', action: 'رفع درساً جديداً', time: 'منذ ٥ دقائق', success: false },
  { id: '3', user: 'سارة أحمد', action: 'سجلت في المنصة', time: 'منذ ١٠ دقائق', success: true },
  { id: '4', user: 'أحمد محمود', action: 'اشترى كتاب الرسم', time: 'منذ ١٢ دقيقة', success: true },
  { id: '5', user: 'ياسين علي', action: 'دفع فاتورة اشتراك', time: 'منذ ٢٠ دقيقة', success: true },
];

export const ActivityFeed: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>سجل النشاط الحي للمنصة</Text>
      
      <View style={styles.list}>
        {activityLog.map((log) => (
          <View key={log.id} style={styles.row}>
            <View style={styles.left}>
               <View style={[styles.indicator, { backgroundColor: log.success ? colors.success : colors.warning }]} />
               <View style={styles.info}>
                  <Text style={styles.userText}>{log.user} <Text style={styles.actionText}>{log.action}</Text></Text>
                  <Text style={styles.timeText}>{log.time}</Text>
               </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  title: {
    fontFamily: fonts.tajawalBold,
    fontSize: 18,
    color: colors.secondary,
    textAlign: 'right',
    marginBottom: spacing.lg,
  },
  list: {
    gap: 16,
  },
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  info: {
    gap: 2,
  },
  userText: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.textPrimary,
    textAlign: 'right',
  },
  actionText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  timeText: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'right',
  },
});
