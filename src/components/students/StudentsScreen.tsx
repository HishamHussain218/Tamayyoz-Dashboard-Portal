import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { GraduationCap, Search, Filter, Plus, ChevronLeft, Mail, Phone } from 'lucide-react-native';
import { colors, fonts, radius, shadows, spacing } from '../../theme';
import { SearchBar } from '../ui/SearchBar';
import { Badge } from '../ui/Badge';

const students = [
  { id: '1', name: 'أحمد محمود علي', email: 'ahmed@example.com', phone: '0501234567', level: 'المستوى الثاني', joinDate: '١ مارس ٢٠٢٤', avatar: 'https://i.pravatar.cc/150?u=a' },
  { id: '2', name: 'سارة يوسف الجبر', email: 'sara@example.com', phone: '0509876543', level: 'المستوى الثالث', joinDate: '١٠ فبراير ٢٠٢٤', avatar: 'https://i.pravatar.cc/150?u=s' },
  { id: '3', name: 'ياسين علي العمر', email: 'yasin@example.com', phone: '0505554444', level: 'المستوى الأول', joinDate: '٢٥ يناير ٢٠٢٤', avatar: 'https://i.pravatar.cc/150?u=y' },
  { id: '4', name: 'لينا محمد فهد', email: 'lina@example.com', phone: '0501112222', level: 'المستوى الرابع', joinDate: '٥ يناير ٢٠٢٤', avatar: 'https://i.pravatar.cc/150?u=l' },
];

export const StudentsScreen: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
           <View style={styles.iconBox}>
              <GraduationCap size={24} color={colors.secondary} />
           </View>
           <View style={styles.titleInfo}>
              <Text style={styles.title}>إدارة الطلاب</Text>
              <Text style={styles.subtitle}>التحكم في بيانات الطلاب المتقدمين والمستمرين</Text>
           </View>
        </View>

        <View style={styles.toolbar}>
           <View style={styles.searchWrap}>
              <SearchBar value={search} onChangeText={setSearch} placeholder="ابحث عن اسم طالب أو بريده..." />
           </View>
           <TouchableOpacity style={styles.filterBtn}>
              <Filter size={20} color={colors.textSecondary} />
           </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={students}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.studentCard}>
            <View style={styles.row}>
               <Image source={{ uri: item.avatar }} style={styles.avatar} />
               <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  <View style={styles.metaRow}>
                     <Text style={styles.levelText}>{item.level}</Text>
                     <View style={styles.dot} />
                     <Text style={styles.dateText}>انضم {item.joinDate}</Text>
                  </View>
               </View>
               <View style={styles.contactIcons}>
                  <TouchableOpacity style={styles.contactBtn}>
                     <Mail size={16} color={colors.textMuted} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.contactBtn}>
                     <Phone size={16} color={colors.textMuted} />
                  </TouchableOpacity>
               </View>
            </View>
            <View style={styles.footer}>
               <Badge label="منتظم" variant="success" />
               <ChevronLeft size={18} color={colors.textMuted} />
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
    gap: 12,
  },
  studentCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: colors.background,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontFamily: fonts.tajawalBold,
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'right',
  },
  metaRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
  },
  levelText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.textSecondary,
  },
  dot: {
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
  contactIcons: {
    flexDirection: 'row-reverse',
    gap: 8,
  },
  contactBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
});
