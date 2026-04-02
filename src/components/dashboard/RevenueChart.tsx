import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, radius, spacing, shadows } from '../../theme';
import { revenueData } from '../../data/mockData';

export const RevenueChart: React.FC = () => {
  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
  const BAR_MAX_H = 160;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
           <Text style={styles.title}>نمو المبيعات وصافي الأرباح</Text>
           <Text style={styles.subtitle}>مقارنة الأداء المالي خلال الـ ٦ أشهر الماضية</Text>
        </View>
        
        <View style={styles.legend}>
           <View style={styles.legendItem}>
             <Text style={styles.legendText}>إجمالي المبيعات</Text>
             <View style={[styles.legendBox, { backgroundColor: colors.borderLight }]} />
           </View>
           <View style={styles.legendItem}>
             <Text style={styles.legendText}>صافي الربح</Text>
             <View style={[styles.legendBox, { backgroundColor: '#FFFF00' }]} />
           </View>
        </View>
      </View>

      <View style={styles.chartArea}>
        {revenueData.map((item, idx) => {
          const salesH = (item.revenue / maxRevenue) * BAR_MAX_H;
          const profitH = salesH * 0.3; // Dummy profit calc for visual
          
          return (
            <View key={idx} style={styles.barGroup}>
              <View style={styles.barsContainer}>
                <View style={[styles.bar, { height: salesH, backgroundColor: colors.borderLight }]} />
                <View style={[styles.bar, { height: profitH, backgroundColor: '#FFFF00', marginRight: -8 }]} />
              </View>
              <Text style={styles.monthLabel}>{item.month}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: spacing.xl,
    borderWidth: 2,
    borderColor: colors.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  titleGroup: {
    gap: 4,
  },
  title: {
    fontFamily: fonts.tajawalBold,
    fontSize: 20,
    color: colors.secondary,
    textAlign: 'right',
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'right',
  },
  legend: {
    flexDirection: 'row-reverse',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
  },
  legendBox: {
    width: 14,
    height: 14,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  legendText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.textSecondary,
  },
  chartArea: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 220,
    paddingTop: 20,
  },
  barGroup: {
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  barsContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    width: 40,
    height: 180,
    justifyContent: 'center',
  },
  bar: {
    width: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  monthLabel: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.textSecondary,
  },
});
