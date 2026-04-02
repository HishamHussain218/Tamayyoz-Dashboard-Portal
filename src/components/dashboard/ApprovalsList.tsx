import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Clock, Check } from 'lucide-react-native';
import { colors, fonts, radius, spacing, shadows } from '../../theme';

const pendingTasks = [
  { id: '1', teacher: 'أ. محمد عمر', course: 'فيزياء الثانوية العامة', date: 'منذ ٢ ساعة' },
  { id: '2', teacher: 'أ. سارة أحمد', course: 'أساسيات البرمجة بلغة C', date: 'منذ ٤ ساعة' },
  { id: '3', teacher: 'أ. خالد يوسف', course: 'كورس القدرات الشامل', date: 'منذ ٦ ساعة' },
];

export const ApprovalsList: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.dot} />
          <Text style={styles.title}>مراجعة وتدقيق المحتوى العاجل (٣ مهام بانتظارك)</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.viewMore}>عرض الكل</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {pendingTasks.map((task) => (
          <View key={task.id} style={styles.row}>
            <View style={styles.info}>
              <Text style={styles.courseName}>{task.course}</Text>
              <View style={styles.meta}>
                 <Text style={styles.teacherName}>{task.teacher}</Text>
                 <View style={styles.separator} />
                 <Text style={styles.dateText}>{task.date}</Text>
              </View>
            </View>
            
            <View style={styles.actions}>
              <TouchableOpacity style={[styles.actionBtn, styles.reviewBtn]}>
                <Text style={styles.reviewBtnText}>مراجعة 👁️</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.approveBtn]}>
                <Text style={styles.approveBtnText}>اعتماد ✅</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: spacing.lg,
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
    marginBottom: spacing.lg,
  },
  titleRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: fonts.tajawalBold,
    fontSize: 18,
    color: colors.secondary,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.error,
  },
  viewMore: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.textMuted,
  },
  list: {
    gap: 12,
  },
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  courseName: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.textPrimary,
    textAlign: 'right',
  },
  meta: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
  },
  teacherName: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.secondary,
  },
  separator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  dateText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
  actions: {
    flexDirection: 'row-reverse',
    gap: 8,
  },
  actionBtn: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  approveBtn: {
    backgroundColor: '#FFFF00',
    borderColor: colors.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  approveBtnText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.secondary,
  },
  reviewBtn: {
    backgroundColor: '#fff',
    borderColor: colors.secondary,
  },
  reviewBtnText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.textSecondary,
  },
});
