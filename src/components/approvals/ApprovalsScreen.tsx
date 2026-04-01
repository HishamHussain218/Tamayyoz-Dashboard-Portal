import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { ClipboardCheck, Eye, Check, X, Clock, Filter, Search } from 'lucide-react-native';
import { colors, fonts, radius, shadows, spacing } from '../../theme';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { SearchBar } from '../ui/SearchBar';

const mockApprovals = [
  { id: '1', teacher: 'أ. محمد عمر', course: 'فيزياء الثانوية العامة - الباب الأول', date: 'منذ ٢ ساعة', type: 'درس فيديو', status: 'pending', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', teacher: 'أ. سارة أحمد', course: 'أساسيات البرمجة بلغة C', date: 'منذ ٤ ساعة', type: 'كورس كامل', status: 'pending', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', teacher: 'أ. خالد يوسف', course: 'كورس القدرات الشامل', date: 'منذ ٦ ساعة', type: 'كتاب PDF', status: 'pending', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', teacher: 'أ. ليلى علي', course: 'اللغة الإنجليزية لغير الناطقين بها', date: 'منذ يوم', type: 'درس فيديو', status: 'pending', avatar: 'https://i.pravatar.cc/150?u=4' },
];

export const ApprovalsScreen: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
           <View style={styles.iconBox}>
              <ClipboardCheck size={24} color={colors.secondary} />
           </View>
           <View style={styles.titleInfo}>
              <Text style={styles.title}>طابور المراجعة</Text>
              <Text style={styles.subtitle}>لديك ٤ طلبات تحتاج للمراجعة والاعتماد</Text>
           </View>
        </View>

        <View style={styles.toolbar}>
           <View style={styles.searchWrap}>
              <SearchBar value={search} onChangeText={setSearch} placeholder="ابحث في الطلبات المعلقة..." />
           </View>
           <TouchableOpacity style={styles.filterBtn}>
              <Filter size={20} color={colors.textSecondary} />
           </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={mockApprovals}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.approvalCard}>
            <View style={styles.cardHeader}>
               <View style={styles.teacherInfo}>
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                  <View style={styles.teacherText}>
                     <Text style={styles.teacherName}>{item.teacher}</Text>
                     <Text style={styles.typeLabel}>{item.type}</Text>
                  </View>
               </View>
               <View style={styles.timeBadge}>
                  <Clock size={12} color={colors.textMuted} />
                  <Text style={styles.timeText}>{item.date}</Text>
               </View>
            </View>

            <View style={styles.cardBody}>
               <Text style={styles.courseTitle}>{item.course}</Text>
               <View style={styles.badgeRow}>
                  <Badge label="بانتظار المراجعة" variant="neutral" />
               </View>
            </View>

            <View style={styles.cardActions}>
               <TouchableOpacity style={[styles.actionBtn, styles.viewBtn]}>
                  <Eye size={16} color={colors.textSecondary} />
                  <Text style={styles.viewBtnText}>مراجعة المحتوى</Text>
               </TouchableOpacity>
               
               <View style={styles.confirmGroup}>
                  <TouchableOpacity style={[styles.circleBtn, styles.rejectBtn]}>
                     <X size={18} color={colors.error} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.circleBtn, styles.approveBtn]}>
                     <Check size={18} color={colors.secondary} />
                  </TouchableOpacity>
               </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
    gap: spacing.lg,
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
  toolbar: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  searchWrap: {
    flex: 1,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  listContent: {
    paddingBottom: spacing.xxxl,
    gap: 16,
  },
  approvalCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  teacherInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.background,
  },
  teacherText: {
    alignItems: 'flex-end',
  },
  teacherName: {
    fontFamily: fonts.tajawalBold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  typeLabel: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.textMuted,
  },
  timeBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  timeText: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    color: colors.textMuted,
  },
  cardBody: {
    marginBottom: 20,
    gap: 8,
  },
  courseTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.secondary,
    textAlign: 'right',
  },
  badgeRow: {
    flexDirection: 'row-reverse',
  },
  cardActions: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 16,
  },
  viewBtn: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.md,
  },
  viewBtnText: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.textSecondary,
  },
  confirmGroup: {
    flexDirection: 'row-reverse',
    gap: 8,
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.2,
  },
  approveBtn: {
    backgroundColor: colors.primary,
    borderColor: colors.secondary,
  },
  rejectBtn: {
    backgroundColor: '#fff',
    borderColor: colors.error,
  },
});
