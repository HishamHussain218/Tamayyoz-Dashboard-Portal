import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Filter, 
  Download, 
  Search,
  ArrowRight,
  TrendingUp,
  CreditCard,
  Banknote,
  Send,
  ArrowUp,
  ArrowLeft
} from 'lucide-react-native';
import { colors, fonts, radius, shadows, spacing } from '../../theme';
import { Button } from '../ui/Button';

interface Transaction {
  id: string;
  title: string;
  subtitle?: string;
  amount: string;
  date: string;
  type: 'credit' | 'debit';
  status: 'success' | 'pending' | 'failed';
  method: string;
}

const transactions: Transaction[] = [
  { id: '1', title: 'عمولة كورس الفيزياء', subtitle: 'طالب: أحمد محمد', amount: '+ 450.00 ج.م', date: '٣١ مارس ٢٠٢٤', type: 'credit', status: 'success', method: 'رصيد المحفظة' },
  { id: '2', title: 'تحويل بنكي للمدرس أ. محمد', subtitle: 'بنك مصر - **** 1234', amount: '- 1,200.00 ج.م', date: '٣٠ مارس ٢٠٢٤', type: 'debit', status: 'pending', method: 'تحويل بنكي' },
  { id: '3', title: 'سحب مبيعات سنتر', subtitle: 'فرع مدينة نصر', amount: '- 5,000.00 ج.م', date: '٢٨ مارس ٢٠٢٤', type: 'debit', status: 'success', method: 'نقدي' },
  { id: '4', title: 'عمولة كورس البرمجة', subtitle: 'طالب: سارة أحمد', amount: '+ 850.00 ج.م', date: '٢٧ مارس ٢٠٢٤', type: 'credit', status: 'success', method: 'رصيد المحفظة' },
  { id: '5', title: 'اشتراك باقة المعلم المتميز', subtitle: 'أ. ليلى عبد الله', amount: '+ 2,400.00 ج.م', date: '٢٦ مارس ٢٠٢٤', type: 'credit', status: 'failed', method: 'بطاقة خصم' },
];

const StatusBadge: React.FC<{ status: Transaction['status'] }> = ({ status }) => {
  const config = {
    success: { text: 'ناجحة', color: colors.success, bg: colors.successLight },
    pending: { text: 'قيد الانتظار', color: colors.warning, bg: colors.warningLight },
    failed: { text: 'فاشلة', color: colors.error, bg: colors.errorLight },
  };

  const { text, color, bg } = config[status];

  return (
    <View style={[styles.statusBadge, { backgroundColor: bg }]}>
      <View style={[styles.statusDot, { backgroundColor: color }]} />
      <Text style={[styles.statusText, { color }]}>{text}</Text>
    </View>
  );
};

export const FinanceScreen: React.FC = () => {
  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTitleGroup}>
          <Text style={styles.title}>الماليات والعمولات</Text>
          <Text style={styles.subtitle}>تتبع رصيد المؤسسة، المبيعات والحركات المالية في مكان واحد</Text>
        </View>
        <Button 
          label="تحميل التقرير" 
          onPress={() => {}} 
          variant="secondary" 
          icon={<Download size={18} color={colors.secondary} />}
          style={styles.downloadBtn}
        />
      </View>

      {/* KPI Cards Section */}
      <View style={styles.kpiGrid}>
        {/* Card 1: Balance (Prominent Button) */}
        <View style={styles.kpiCard}>
          <View style={styles.kpiHeader}>
            <View style={[styles.kpiIconBox, { backgroundColor: colors.primary }]}>
              <Wallet size={20} color={colors.secondary} />
            </View>
            <Text style={styles.kpiLabel}>الرصيد المتاح حالياً</Text>
          </View>
          <View style={styles.kpiBody}>
            <Text style={styles.kpiValue}>45,820.00 <Text style={styles.currency}>ج.م</Text></Text>
          </View>
          <View style={styles.kpiFooter}>
            <TouchableOpacity style={styles.withdrawButton}>
              <Text style={styles.withdrawButtonText}>طلب سحب رصيد</Text>
              <Send size={16} color={colors.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Card 2: Inflow */}
        <View style={styles.kpiCard}>
          <View style={styles.kpiHeader}>
            <View style={[styles.kpiIconBox, { backgroundColor: colors.successLight }]}>
              <ArrowDownLeft size={20} color={colors.success} />
            </View>
            <Text style={styles.kpiLabel}>إجمالي الوارد (هذا الشهر)</Text>
          </View>
          <View style={styles.kpiBody}>
             <Text style={styles.kpiValue}>120,450 <Text style={styles.currency}>ج.م</Text></Text>
          </View>
          <View style={styles.kpiFooter}>
             <View style={[styles.trendBadge, { backgroundColor: colors.successLight }]}>
                <TrendingUp size={12} color={colors.success} />
                <Text style={[styles.trendPercent, { color: colors.success }]}>+12.5%</Text>
             </View>
             <Text style={styles.trendPeriod}>من الشهر الماضي</Text>
          </View>
        </View>

        {/* Card 3: Outflow */}
        <View style={styles.kpiCard}>
          <View style={styles.kpiHeader}>
            <View style={[styles.kpiIconBox, { backgroundColor: colors.errorLight }]}>
              <ArrowUpRight size={20} color={colors.error} />
            </View>
            <Text style={styles.kpiLabel}>إجمالي الصادر (هذا الشهر)</Text>
          </View>
          <View style={styles.kpiBody}>
            <Text style={styles.kpiValue}>34,120 <Text style={styles.currency}>ج.م</Text></Text>
          </View>
          <View style={styles.kpiFooter}>
             <View style={[styles.trendBadge, { backgroundColor: colors.errorLight }]}>
                <ArrowUp size={12} color={colors.error} />
                <Text style={[styles.trendPercent, { color: colors.error }]}>+2.4%</Text>
             </View>
             <Text style={styles.trendPeriod}>من الشهر الماضي</Text>
          </View>
        </View>
      </View>

      {/* Transactions Section */}
      <View style={styles.mainTableContainer}>
        <View style={styles.tableHeaderBar}>
          <View style={styles.tableTitleGroup}>
            <Text style={styles.tableTitle}>آخر الحركات المالية</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>128 حركة</Text>
            </View>
          </View>
          <View style={styles.tableActions}>
            <TouchableOpacity style={styles.filterChip}>
              <Filter size={16} color={colors.textSecondary} />
              <Text style={styles.chipLabel}>تصفية</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Search size={16} color={colors.textSecondary} />
              <Text style={styles.chipLabel}>بحث</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tableWrapper}>
          <View style={styles.thead}>
            <Text style={[styles.th, { flex: 2 }]}>الحركة / التفصيل</Text>
            <Text style={[styles.th, { flex: 1 }]}>التاريخ</Text>
            <Text style={[styles.th, { flex: 1 }]}>المبلغ</Text>
            <Text style={[styles.th, { flex: 1 }]}>الوسيلة</Text>
            <Text style={[styles.th, { flex: 1 }]}>الحالة</Text>
          </View>

          {transactions.map((item, index) => (
            <View key={item.id} style={[styles.tr, index === transactions.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={[styles.td, { flex: 2, flexDirection: 'row-reverse', gap: 12 }]}>
                <View style={[styles.iconFrame, { backgroundColor: item.type === 'credit' ? colors.successLight : colors.errorLight }]}>
                  {item.type === 'credit' ? <Banknote size={16} color={colors.success} /> : <CreditCard size={16} color={colors.error} />}
                </View>
                <View style={styles.textStack}>
                  <Text style={styles.rowTitle}>{item.title}</Text>
                  <Text style={styles.rowSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <View style={[styles.td, { flex: 1 }]}>
                <Text style={styles.rowDate}>{item.date}</Text>
              </View>
              <View style={[styles.td, { flex: 1 }]}>
                <Text style={[styles.rowAmount, { color: item.type === 'credit' ? colors.success : colors.secondary }]}>
                  {item.amount}
                </Text>
              </View>
              <View style={[styles.td, { flex: 1 }]}>
                <Text style={styles.rowMethod}>{item.method}</Text>
              </View>
              <View style={[styles.td, { flex: 1 }]}>
                <StatusBadge status={item.status} />
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingTop: spacing.md,
  },
  headerTitleGroup: {
    gap: 4,
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: fonts.tajawalBold,
    fontSize: 32,
    color: colors.secondary,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textMuted,
  },
  downloadBtn: {
    paddingHorizontal: 20,
    height: 52,
    borderRadius: radius.xl,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  kpiGrid: {
    flexDirection: 'row-reverse',
    gap: 16,
    marginBottom: spacing.xl,
    flexWrap: Platform.OS === 'web' ? 'nowrap' : 'wrap',
  },
  kpiCard: {
    flex: 1,
    minWidth: 280,
    backgroundColor: colors.surface,
    borderRadius: radius.xxl,
    padding: 24,
    borderWidth: 1.2,
    borderColor: colors.border,
    ...shadows.sm,
  },
  kpiHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  kpiIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  kpiLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
    textAlign: 'right',
  },
  kpiBody: {
    alignItems: 'flex-end',
    marginBottom: spacing.lg,
  },
  kpiValue: {
    fontFamily: fonts.tajawalBold,
    fontSize: 28,
    color: colors.secondary,
  },
  currency: {
    fontSize: 15,
    color: colors.textMuted,
  },
  kpiFooter: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  withdrawButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: radius.xl,
    borderWidth: 2,
    borderColor: colors.secondary,
    flex: 1,
    ...shadows.sm,
  },
  withdrawButtonText: {
    fontFamily: fonts.tajawalBold,
    fontSize: 14,
    color: colors.secondary,
  },
  trendBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.md,
  },
  trendPercent: {
    fontFamily: fonts.bold,
    fontSize: 12,
  },
  trendPeriod: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.textMuted,
  },
  mainTableContainer: {
    backgroundColor: colors.surface,
    borderRadius: radius.xxl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.md,
  },
  tableHeaderBar: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  tableTitleGroup: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  tableTitle: {
    fontFamily: fonts.tajawalBold,
    fontSize: 18,
    color: colors.secondary,
  },
  countBadge: {
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  countText: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    color: colors.textSecondary,
  },
  tableActions: {
    flexDirection: 'row-reverse',
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.lg,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.textSecondary,
  },
  tableWrapper: {
    padding: 0,
  },
  thead: {
    flexDirection: 'row-reverse',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  th: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'right',
  },
  tr: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    alignItems: 'center',
  },
  td: {
    alignItems: 'flex-end',
  },
  iconFrame: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStack: {
    alignItems: 'flex-end',
    flex: 1,
  },
  rowTitle: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.secondary,
  },
  rowSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  rowDate: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  rowAmount: {
    fontFamily: fonts.tajawalBold,
    fontSize: 15,
  },
  rowMethod: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.textSecondary,
  },
  statusBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.md,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontFamily: fonts.bold,
    fontSize: 12,
  },
});



