import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Wallet, DollarSign, TrendingUp, ArrowDownLeft, ArrowUpRight, Filter, Download } from 'lucide-react-native';
import { colors, fonts, radius, shadows, spacing } from '../../theme';
import { Button } from '../ui/Button';

const transactions = [
  { id: '1', title: 'عمولة كورس الفيزياء', amount: '+ 450.00 ج.م', date: '٣١ مارس ٢٠٢٤', type: 'credit' },
  { id: '2', title: 'تحويل بنكي للمدرس أ. محمد', amount: '- 1,200.00 ج.م', date: '٣٠ مارس ٢٠٢٤', type: 'debit' },
  { id: '3', title: 'سحب مبيعات سنتر', amount: '- 5,000.00 ج.م', date: '٢٨ مارس ٢٠٢٤', type: 'debit' },
  { id: '4', title: 'عمولة كورس البرمجة', amount: '+ 850.00 ج.م', date: '٢٧ مارس ٢٠٢٤', type: 'credit' },
];

export const FinanceScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
           <View style={styles.iconBox}>
              <Wallet size={24} color={colors.secondary} />
           </View>
           <View style={styles.titleInfo}>
              <Text style={styles.title}>الماليات والعمولات</Text>
              <Text style={styles.subtitle}>تتبع رصيد المؤسسة، المبيعات والحركات المالية</Text>
           </View>
           <Button label="تحميل التقرير" onPress={() => {}} variant="secondary" icon={<Download size={18} color={colors.secondary} />} />
        </View>
      </View>

      <View style={styles.statsGrid}>
         <View style={[styles.statBox, styles.balanceBox]}>
            <Text style={styles.balanceLabel}>الرصيد المتاح حالياً</Text>
            <Text style={styles.balanceVal}>45,820.00 ج.م</Text>
            <TouchableOpacity style={styles.withdrawBtn}>
               <Text style={styles.withdrawText}>طلب سحب رصيد</Text>
            </TouchableOpacity>
         </View>
         
         <View style={styles.smallStats}>
           <View style={styles.statMini}>
              <View style={[styles.miniIcon, { backgroundColor: colors.successLight }]}>
                 <ArrowDownLeft size={16} color={colors.success} />
              </View>
              <View style={styles.miniTextGroup}>
                 <Text style={styles.miniLabel}>إجمالي الوارد</Text>
                 <Text style={styles.miniVal}>120K ج.م</Text>
              </View>
           </View>
           <View style={styles.statMini}>
              <View style={[styles.miniIcon, { backgroundColor: '#FFF1F2' }]}>
                 <ArrowUpRight size={16} color={colors.error} />
              </View>
              <View style={styles.miniTextGroup}>
                 <Text style={styles.miniLabel}>إجمالي الصادر</Text>
                 <Text style={styles.miniVal}>34K ج.م</Text>
              </View>
           </View>
         </View>
      </View>

      <View style={styles.sectionHeader}>
         <Text style={styles.sectionTitle}>آخر الحركات المالية</Text>
         <TouchableOpacity style={styles.filterBtn}>
           <Filter size={18} color={colors.textSecondary} />
           <Text style={styles.filterText}>تصفية</Text>
         </TouchableOpacity>
      </View>

      <View style={styles.transactionsList}>
        {transactions.map((item) => (
          <View key={item.id} style={styles.transactionItem}>
             <View style={styles.transLeft}>
                <Text style={[styles.transAmount, { color: item.type === 'credit' ? colors.success : colors.error }]}>
                   {item.amount}
                </Text>
                <Text style={styles.transDate}>{item.date}</Text>
             </View>
             
             <View style={styles.transRight}>
                <View style={[styles.transIcon, { backgroundColor: colors.background }]}>
                   {item.type === 'credit' ? <ArrowDownLeft size={18} color={colors.success} /> : <ArrowUpRight size={18} color={colors.error} />}
                </View>
                <Text style={styles.transTitle}>{item.title}</Text>
             </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  titleRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: colors.secondary,
  },
  titleInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: fonts.tajawalBold,
    fontSize: 24,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
  },
  statsGrid: {
    flexDirection: 'row-reverse',
    gap: 16,
    marginBottom: spacing.xxl,
  },
  statBox: {
    borderRadius: radius.xl,
    padding: 24,
    borderWidth: 1.2,
    ...shadows.md,
  },
  balanceBox: {
    flex: 1.5,
    backgroundColor: colors.primary,
    borderColor: colors.secondary,
    alignItems: 'flex-end',
  },
  balanceLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
  },
  balanceVal: {
    fontFamily: fonts.tajawalBold,
    fontSize: 32,
    color: colors.secondary,
    marginTop: 8,
  },
  withdrawBtn: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 20,
  },
  withdrawText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: '#fff',
  },
  smallStats: {
    flex: 1,
    gap: 12,
  },
  statMini: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: radius.lg,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  miniIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniTextGroup: {
    alignItems: 'flex-end',
    flex: 1,
  },
  miniLabel: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.textMuted,
  },
  miniVal: {
    fontFamily: fonts.tajawalBold,
    fontSize: 18,
    color: colors.textPrimary,
  },
  sectionHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontFamily: fonts.tajawalBold,
    fontSize: 18,
    color: colors.textPrimary,
  },
  filterBtn: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  filterText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.textSecondary,
  },
  transactionsList: {
    gap: 12,
    paddingBottom: 100,
  },
  transactionItem: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 16,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  transRight: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  transIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transTitle: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  transLeft: {
    alignItems: 'flex-start',
  },
  transAmount: {
    fontFamily: fonts.tajawalBold,
    fontSize: 16,
  },
  transDate: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
});
