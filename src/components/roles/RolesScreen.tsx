import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Shield, Plus, ChevronLeft, CheckCircle2, UserCog, Key } from 'lucide-react-native';
import { colors, fonts, radius, shadows, spacing } from '../../theme';
import { Button } from '../ui/Button';

const roles = [
  { id: '1', title: 'سوبر أدمن (المالك)', users: 2, description: 'كافة الصلاحيات عبر النظام المالي والتعليمي', active: true },
  { id: '2', title: 'مدير العمليات', users: 5, description: 'إدارة المعلمين، الموافقات، وطابور المراجعة', active: true },
  { id: '3', title: 'محاسب مالي', users: 1, description: 'عرض التقارير والعمولات فقط دون تعديل', active: true },
  { id: '4', title: 'دعم فني', users: 12, description: 'إدارة الطلاب وحل المشكلات البسيطة', active: true },
];

export const RolesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
           <View style={styles.iconBox}>
              <Shield size={24} color={colors.secondary} />
           </View>
           <View style={styles.titleInfo}>
              <Text style={styles.title}>الصلاحيات والأدوار</Text>
              <Text style={styles.subtitle}>توزيع الأدوار الإدارية والتحكم في وصول الموظفين</Text>
           </View>
           <Button label="إضافة دور" onPress={() => {}} variant="primary" icon={<Plus size={18} color={colors.secondary} />} />
        </View>
      </View>

      <FlatList
        data={roles}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.roleCard}>
            <View style={styles.cardHeader}>
               <View style={styles.iconRow}>
                  <View style={styles.roleIcon}>
                     <Key size={18} color={colors.secondary} />
                  </View>
                  <Text style={styles.roleTitle}>{item.title}</Text>
               </View>
               <View style={styles.userCount}>
                  <UserCog size={14} color={colors.textMuted} />
                  <Text style={styles.countText}>{item.users} موظف</Text>
               </View>
            </View>
            
            <Text style={styles.description}>{item.description}</Text>
            
            <View style={styles.cardFooter}>
               <View style={styles.activeLabel}>
                  <CheckCircle2 size={14} color={colors.success} />
                  <Text style={styles.statusText}>مفعل</Text>
               </View>
               <TouchableOpacity style={styles.manageBtn}>
                  <Text style={styles.manageText}>تعديل الصلاحيات</Text>
                  <ChevronLeft size={16} color={colors.textMuted} />
               </TouchableOpacity>
            </View>
          </TouchableOpacity>
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
  listContent: {
    paddingBottom: spacing.xxxl,
    gap: 16,
  },
  roleCard: {
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
    alignItems: 'center',
    marginBottom: 12,
  },
  iconRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  roleIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleTitle: {
    fontFamily: fonts.tajawalBold,
    fontSize: 18,
    color: colors.secondary,
  },
  userCount: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  countText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.textSecondary,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'right',
    marginBottom: 20,
    lineHeight: 22,
  },
  cardFooter: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  activeLabel: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.success,
  },
  manageBtn: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
  },
  manageText: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.textMuted,
  },
});
