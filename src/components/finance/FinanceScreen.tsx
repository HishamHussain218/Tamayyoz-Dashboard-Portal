import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, Modal, TextInput } from 'react-native';
import { 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Filter, 
  Download, 
  Search,
  TrendingUp,
  CreditCard,
  Banknote,
  Send,
  ArrowUp,
  X,
  Printer,
  ChevronDown,
  Building
} from 'lucide-react-native';
import { colors, fonts, radius, shadows, spacing } from '../../theme';
import { Button } from '../ui/Button';

interface Transaction {
  id: string;
  title: string;
  subtitle?: string;
  amount: number;
  date: string;
  time: string;
  type: 'credit' | 'debit';
  status: 'success' | 'pending' | 'failed';
  method: 'wallet' | 'visa' | 'mastercard' | 'fawry' | 'cash';
  thumbnail?: string;
}

const transactions: Transaction[] = [
  { id: 'TX-1005', title: 'عمولة كورس الفيزياء', subtitle: 'طالب: أحمد محمد', amount: 800, date: '2026/04/08', time: '10:30 AM', type: 'credit', status: 'success', method: 'mastercard', thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=150' },
  { id: 'TX-1004', title: 'تحويل بنكي للمدرس أ. محمد', subtitle: 'بنك مصر - **** 1234', amount: -1200, date: '2026/04/07', time: '02:15 PM', type: 'debit', status: 'pending', method: 'visa' },
  { id: 'TX-1003', title: 'سحب مبيعات سنتر', subtitle: 'فرع مدينة نصر', amount: -5000, date: '2026/04/05', time: '11:00 AM', type: 'debit', status: 'success', method: 'cash' },
  { id: 'TX-1002', title: 'عمولة كورس البرمجة', subtitle: 'طالب: سارة أحمد', amount: 850, date: '2026/04/04', time: '04:45 PM', type: 'credit', status: 'success', method: 'fawry' },
  { id: 'TX-1001', title: 'اشتراك باقة المعلم المتميز', subtitle: 'أ. ليلى عبد الله', amount: 2400, date: '2026/04/02', time: '09:20 AM', type: 'credit', status: 'failed', method: 'visa' },
];

const StatusBadge: React.FC<{ status: Transaction['status'] }> = ({ status }) => {
  const config = {
    success: { text: 'ناجحة', color: '#000000', bg: colors.success },
    pending: { text: 'قيد الانتظار', color: '#000000', bg: colors.warning },
    failed: { text: 'فاشلة', color: '#FFFFFF', bg: colors.error },
  };

  const { text, color, bg } = config[status];

  return (
    <View style={[styles.statusBadge, { backgroundColor: bg }]}>
      <Text style={[styles.statusText, { color }]}>{text}</Text>
    </View>
  );
};

const MethodIcon: React.FC<{ method: Transaction['method'] }> = ({ method }) => {
  switch (method) {
    case 'visa':
    case 'mastercard':
      return <CreditCard size={18} color={colors.secondary} />;
    case 'fawry':
      return <Banknote size={18} color={colors.secondary} />;
    default:
      return <Wallet size={18} color={colors.secondary} />;
  }
};

const MethodLabel: React.FC<{ method: Transaction['method'] }> = ({ method }) => {
  const labels = {
    wallet: 'رصيد المحفظة',
    visa: 'فيزا',
    mastercard: 'ماستركارد',
    fawry: 'فوري',
    cash: 'نقدي'
  };
  return <Text style={styles.methodLabelText}>{labels[method]}</Text>;
};

export const FinanceScreen: React.FC = () => {
  const [isPayoutModalOpen, setPayoutModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const neoShadow = {
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4, // For Android
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTitleGroup}>
            <Text style={styles.title}>الماليات والعمولات</Text>
            <Text style={styles.subtitle}>الخزينة والمحاسبة وإدارة عمليات السحب</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={[styles.actionBtn, neoShadow]}>
              <Text style={styles.actionBtnText}>تحميل التقارير 📥</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersRow}>
          {['هذا الأسبوع', 'هذا الشهر', 'هذا العام', 'تاريخ مخصص'].map((f, i) => (
            <TouchableOpacity key={i} style={[styles.filterChipItem, i === 1 ? styles.filterChipActive : {}, neoShadow]}>
              <Text style={[styles.filterChipText, i === 1 ? { color: colors.secondary } : {}]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* KPI Cards Section */}
        <View style={styles.kpiGrid}>
          {/* Main Card: Balance */}
          <View style={[styles.kpiCardMain, neoShadow]}>
            <View style={styles.kpiHeader}>
              <Text style={styles.kpiLabelMain}>الرصيد المتاح حالياً</Text>
              <View style={styles.kpiIconBoxMain}>
                <Wallet size={24} color={colors.secondary} />
              </View>
            </View>
            <View style={styles.kpiBody}>
              <Text style={styles.kpiValueMain}>45,820.00 <Text style={styles.currencyMain}>EGP</Text></Text>
            </View>
            <TouchableOpacity 
              style={[styles.withdrawButton, neoShadow]}
              onPress={() => setPayoutModalOpen(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.withdrawButtonText}>طلب سحب رصيد 💸</Text>
            </TouchableOpacity>
          </View>

          {/* Card 2: Inflow */}
          <View style={[styles.kpiCard, neoShadow]}>
            <View style={styles.kpiHeader}>
              <View style={[styles.kpiIconBox, { backgroundColor: colors.successLight }]}>
                <ArrowDownLeft size={20} color={colors.success} />
              </View>
              <Text style={styles.kpiLabel}>إجمالي الوارد</Text>
            </View>
            <View style={styles.kpiBody}>
               <Text style={styles.kpiValue}>120,450 <Text style={styles.currency}>EGP</Text></Text>
            </View>
            <View style={styles.kpiFooter}>
               <View style={[styles.trendBadge, { backgroundColor: colors.successLight }]}>
                  <TrendingUp size={14} color={colors.success} />
                  <Text style={[styles.trendPercent, { color: colors.success }]}>+12.5%</Text>
               </View>
            </View>
          </View>

          {/* Card 3: Outflow */}
          <View style={[styles.kpiCard, neoShadow]}>
            <View style={styles.kpiHeader}>
              <View style={[styles.kpiIconBox, { backgroundColor: colors.errorLight }]}>
                <ArrowUpRight size={20} color={colors.error} />
              </View>
              <Text style={styles.kpiLabel}>إجمالي الصادر</Text>
            </View>
            <View style={styles.kpiBody}>
              <Text style={styles.kpiValue}>34,120 <Text style={styles.currency}>EGP</Text></Text>
            </View>
            <View style={styles.kpiFooter}>
               <View style={[styles.trendBadge, { backgroundColor: colors.errorLight }]}>
                  <ArrowUp size={14} color={colors.error} />
                  <Text style={[styles.trendPercent, { color: colors.error }]}>+2.4%</Text>
               </View>
            </View>
          </View>
        </View>

        {/* Transactions Section */}
        <View style={[styles.mainTableContainer, neoShadow]}>
          <View style={styles.tableHeaderBar}>
             <Text style={styles.tableTitle}>سجل الحركات المالية</Text>
          </View>

          <View style={styles.tableWrapper}>
            <View style={styles.thead}>
              <Text style={[styles.th, { flex: 2.5 }]}>الحركة / التفصيل</Text>
              <Text style={[styles.th, { flex: 1.5 }]}>التاريخ والوقت</Text>
              <Text style={[styles.th, { flex: 1.2 }]}>المبلغ</Text>
              <Text style={[styles.th, { flex: 1 }]}>الوسيلة</Text>
              <Text style={[styles.th, { flex: 1 }]}>الحالة</Text>
            </View>

            {transactions.map((item, index) => (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.tr, index === transactions.length - 1 && { borderBottomWidth: 0 }]}
                onPress={() => setSelectedTransaction(item)}
              >
                <View style={[styles.td, { flex: 2.5, flexDirection: 'row-reverse', gap: 12 }]}>
                  {item.thumbnail ? (
                    <Image source={{ uri: item.thumbnail }} style={styles.transactionThumb} />
                  ) : (
                    <View style={[styles.iconFrame, { backgroundColor: item.type === 'credit' ? '#E8F5E9' : '#FFEBEE' }]}>
                      {item.type === 'credit' ? <ArrowDownLeft size={20} color={colors.success} /> : <ArrowUpRight size={20} color={colors.error} />}
                    </View>
                  )}
                  <View style={styles.textStack}>
                    <Text style={styles.rowTitle}>{item.title}</Text>
                    <Text style={styles.rowSubtitle}>{item.id} • {item.subtitle}</Text>
                  </View>
                </View>
                <View style={[styles.td, { flex: 1.5 }]}>
                  <Text style={styles.rowDate}>{item.date}</Text>
                  <Text style={styles.rowTime}>{item.time}</Text>
                </View>
                <View style={[styles.td, { flex: 1.2 }]}>
                  <Text style={[styles.rowAmount, { color: item.type === 'credit' ? colors.success : colors.error }]}>
                    {item.type === 'credit' ? '+' : '-'}{Math.abs(item.amount)} EGP
                  </Text>
                </View>
                <View style={[styles.td, { flex: 1, flexDirection: 'row-reverse', alignItems: 'center', gap: 6 }]}>
                  <MethodIcon method={item.method} />
                  <MethodLabel method={item.method} />
                </View>
                <View style={[styles.td, { flex: 1 }]}>
                  <StatusBadge status={item.status} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Payout Modal */}
      <Modal visible={isPayoutModalOpen} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, neoShadow]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>طلب سحب رصيد</Text>
              <TouchableOpacity onPress={() => setPayoutModalOpen(false)} style={styles.closeBtn}>
                <X size={24} color={colors.secondary} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.inputLabel}>المبلغ المراد سحبه (EGP)</Text>
              <TextInput style={[styles.inputField, neoShadow]} keyboardType="numeric" placeholder="مثال: 5000" />
              
              <Text style={styles.inputLabel}>وسيلة السحب</Text>
              <View style={[styles.dropdownField, neoShadow]}>
                <Text style={{ fontFamily: fonts.semiBold, color: colors.secondary }}>تحويل بنكي (بنك مصر **** 1234)</Text>
                <ChevronDown size={20} color={colors.secondary} />
              </View>

              <View style={styles.noticeBox}>
                <Text style={styles.noticeText}>🕒 الوقت المتوقع للمعالجة: من ٢٤ إلى ٤٨ ساعة عمل</Text>
              </View>

              <TouchableOpacity style={[styles.submitPayoutBtn, neoShadow]} onPress={() => setPayoutModalOpen(false)}>
                <Text style={styles.submitPayoutText}>تأكيد الطلب</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Transaction Details Side Drawer */}
      <Modal visible={!!selectedTransaction} transparent animationType="slide">
        <View style={styles.drawerOverlay}>
          <TouchableOpacity style={styles.drawerBg} onPress={() => setSelectedTransaction(null)} />
          <View style={[styles.drawerContent, neoShadow]}>
            {selectedTransaction && (
              <>
                <View style={styles.drawerHeader}>
                  <Text style={styles.drawerTitle}>تفاصيل الفاتورة</Text>
                  <TouchableOpacity onPress={() => setSelectedTransaction(null)}>
                    <X size={24} color={colors.secondary} />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.drawerBody}>
                  <View style={styles.drawerReceipt}>
                    <View style={styles.receiptLogo}>
                      <Building size={32} color={colors.textMuted} />
                    </View>
                    <Text style={styles.receiptAmount}>
                      {selectedTransaction.type === 'credit' ? '+' : '-'}{Math.abs(selectedTransaction.amount)} <Text style={{fontSize: 16}}>EGP</Text>
                    </Text>
                    <StatusBadge status={selectedTransaction.status} />
                  </View>

                  <View style={styles.receiptDetails}>
                    <View style={styles.receiptRow}>
                      <Text style={styles.receiptLabel}>رقم العملية</Text>
                      <Text style={styles.receiptValue}>{selectedTransaction.id}</Text>
                    </View>
                    <View style={styles.receiptRow}>
                      <Text style={styles.receiptLabel}>التاريخ</Text>
                      <Text style={styles.receiptValue}>{selectedTransaction.date} {selectedTransaction.time}</Text>
                    </View>
                    <View style={styles.receiptRow}>
                      <Text style={styles.receiptLabel}>الوصف</Text>
                      <Text style={styles.receiptValue}>{selectedTransaction.title}</Text>
                    </View>
                    <View style={styles.receiptRow}>
                      <Text style={styles.receiptLabel}>التفاصيل</Text>
                      <Text style={styles.receiptValue}>{selectedTransaction.subtitle}</Text>
                    </View>
                    <View style={styles.receiptRow}>
                      <Text style={styles.receiptLabel}>وسيلة الدفع</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                         <MethodLabel method={selectedTransaction.method} />
                         <MethodIcon method={selectedTransaction.method} />
                      </View>
                    </View>
                  </View>

                  <View style={styles.breakdownBox}>
                    <View style={styles.receiptRow}>
                      <Text style={styles.receiptLabel}>المبلغ الإجمالي</Text>
                      <Text style={styles.receiptValue}>{Math.abs(selectedTransaction.amount) + 50} EGP</Text>
                    </View>
                    <View style={styles.receiptRow}>
                      <Text style={styles.receiptLabel}>رسوم البوابة (2.5%)</Text>
                      <Text style={styles.receiptValue}>- 20 EGP</Text>
                    </View>
                    <View style={styles.receiptRow}>
                      <Text style={styles.receiptLabel}>نصيب المعلم (70%)</Text>
                      <Text style={styles.receiptValue}>- 30 EGP</Text>
                    </View>
                    <View style={[styles.receiptRow, { borderTopWidth: 2, borderTopColor: colors.secondary, paddingTop: 12, marginTop: 12 }]}>
                      <Text style={[styles.receiptLabel, { color: colors.secondary, fontFamily: fonts.bold }]}>صافي المؤسسة</Text>
                      <Text style={[styles.receiptValue, { fontSize: 18, fontFamily: fonts.tajawalBold, color: colors.success }]}>
                        {Math.abs(selectedTransaction.amount)} EGP
                      </Text>
                    </View>
                  </View>
                </ScrollView>

                <View style={styles.drawerFooter}>
                  <TouchableOpacity style={[styles.printBtn, neoShadow]}>
                    <Printer size={20} color={colors.secondary} />
                    <Text style={styles.printBtnText}>طباعة الإيصال</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Lighter background for contrast
  },
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  headerTitleGroup: {
    gap: 8,
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: fonts.tajawalBold,
    fontSize: 36,
    color: colors.secondary,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textSecondary,
  },
  headerActions: {
    flexDirection: 'row-reverse',
    gap: 16,
  },
  actionBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    height: 54,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.secondary,
  },
  filtersRow: {
    flexDirection: 'row-reverse',
    gap: 12,
    marginBottom: spacing.xl,
  },
  filterChipItem: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textSecondary,
  },
  kpiGrid: {
    flexDirection: 'row-reverse',
    gap: 24,
    marginBottom: spacing.xl,
    flexWrap: Platform.OS === 'web' ? 'nowrap' : 'wrap',
  },
  kpiCardMain: {
    flex: 2,
    minWidth: 320,
    backgroundColor: colors.primary, // Yellow #FFFF00
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  kpiCard: {
    flex: 1.2,
    minWidth: 240,
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  kpiHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  kpiIconBoxMain: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  kpiIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  kpiLabelMain: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    color: colors.secondary,
  },
  kpiLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.textSecondary,
    flex: 1,
    textAlign: 'right',
  },
  kpiBody: {
    alignItems: 'flex-end',
    marginBottom: spacing.lg,
  },
  kpiValueMain: {
    fontFamily: fonts.tajawalBold,
    fontSize: 42,
    color: colors.secondary,
  },
  kpiValue: {
    fontFamily: fonts.tajawalBold,
    fontSize: 28,
    color: colors.secondary,
  },
  currencyMain: {
    fontSize: 20,
    fontFamily: fonts.bold,
  },
  currency: {
    fontSize: 16,
    color: colors.textMuted,
  },
  kpiFooter: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  withdrawButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.secondary,
    alignItems: 'center',
    marginTop: 10,
  },
  withdrawButtonText: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.secondary,
  },
  trendBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  trendPercent: {
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  mainTableContainer: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.secondary,
    overflow: 'hidden',
  },
  tableHeaderBar: {
    padding: 24,
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
    backgroundColor: '#ffffff',
  },
  tableTitle: {
    fontFamily: fonts.tajawalBold,
    fontSize: 22,
    color: colors.secondary,
    textAlign: 'right',
  },
  tableWrapper: {
    padding: 0,
  },
  thead: {
    flexDirection: 'row-reverse',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
  },
  th: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  tr: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  td: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  transactionThumb: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  iconFrame: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  textStack: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
  },
  rowTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.secondary,
    marginBottom: 4,
  },
  rowSubtitle: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.textMuted,
  },
  rowDate: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 4,
  },
  rowTime: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
  rowAmount: {
    fontFamily: fonts.tajawalBold,
    fontSize: 18,
  },
  methodLabelText: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.secondary,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontFamily: fonts.bold,
    fontSize: 13,
  },
  
  // Modal & Drawer Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.secondary,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
    backgroundColor: colors.primary,
  },
  modalTitle: {
    fontFamily: fonts.tajawalBold,
    fontSize: 24,
    color: colors.secondary,
  },
  closeBtn: {
    padding: 4,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  modalBody: {
    padding: 24,
  },
  inputLabel: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.secondary,
    textAlign: 'right',
    marginBottom: 8,
  },
  inputField: {
    height: 56,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontFamily: fonts.tajawalBold,
    fontSize: 20,
    textAlign: 'right',
    marginBottom: 20,
  },
  dropdownField: {
    height: 56,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  noticeBox: {
    backgroundColor: colors.infoLight,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.info,
    marginBottom: 24,
  },
  noticeText: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.info,
    textAlign: 'right',
  },
  submitPayoutBtn: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitPayoutText: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.secondary,
  },

  drawerOverlay: {
    flex: 1,
    flexDirection: 'row-reverse',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  drawerBg: {
    flex: 1,
  },
  drawerContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderLeftWidth: 2,
    borderLeftColor: colors.secondary,
    height: '100%',
  },
  drawerHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
    backgroundColor: '#F9FAFB',
  },
  drawerTitle: {
    fontFamily: fonts.tajawalBold,
    fontSize: 20,
    color: colors.secondary,
  },
  drawerBody: {
    flex: 1,
    padding: 24,
  },
  drawerReceipt: {
    alignItems: 'center',
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 24,
  },
  receiptLogo: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  receiptAmount: {
    fontFamily: fonts.tajawalBold,
    fontSize: 36,
    color: colors.secondary,
    marginBottom: 16,
  },
  receiptDetails: {
    gap: 16,
    marginBottom: 32,
  },
  receiptRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  receiptLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textSecondary,
  },
  receiptValue: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.secondary,
  },
  breakdownBox: {
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.secondary,
    gap: 12,
  },
  drawerFooter: {
    padding: 24,
    borderTopWidth: 2,
    borderTopColor: colors.secondary,
    backgroundColor: '#ffffff',
  },
  printBtn: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  printBtnText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.secondary,
  },
});



