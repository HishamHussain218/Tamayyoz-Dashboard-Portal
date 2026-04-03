import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { GraduationCap, Search, Filter, Plus, Mail, Phone, MoreVertical, User } from 'lucide-react-native';
import { colors, fonts, radius, shadows, spacing } from '../../theme';
import { SearchBar } from '../ui/SearchBar';

const students = [
  { id: '1', name: 'أحمد محمود علي', email: 'ahmed@example.com', phone: '0501234567', level: 'المستوى الثاني', joinDate: '١ مارس ٢٠٢٤', avatar: 'https://i.pravatar.cc/150?u=a', status: 'منتظم' },
  { id: '2', name: 'سارة يوسف الجبر', email: 'sara@example.com', phone: '0509876543', level: 'المستوى الثالث', joinDate: '١٠ فبراير ٢٠٢٤', avatar: 'https://i.pravatar.cc/150?u=s', status: 'منتظم' },
  { id: '3', name: 'ياسين علي العمر', email: 'yasin@example.com', phone: '0505554444', level: 'المستوى الأول', joinDate: '٢٥ يناير ٢٠٢٤', avatar: 'https://i.pravatar.cc/150?u=y', status: 'منتظم' },
  { id: '4', name: 'لينا محمد فهد', email: 'lina@example.com', phone: '0501112222', level: 'المستوى الرابع', joinDate: '٥ يناير ٢٠٢٤', avatar: 'https://i.pravatar.cc/150?u=l', status: 'منتظم' },
];

const StudentCard: React.FC<{ student: typeof students[0] }> = ({ student }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        {/* Actions - Left Side */}
        <View style={styles.actions}>
           <TouchableOpacity style={styles.actionCircle}>
              <Mail size={16} color={colors.textSecondary} />
           </TouchableOpacity>
           <TouchableOpacity style={styles.actionCircle}>
              <Phone size={16} color={colors.textSecondary} />
           </TouchableOpacity>
        </View>

        {/* Content - Middle/Right */}
        <View style={styles.contentRow}>
          <View style={styles.textDetails}>
            <View style={styles.nameRow}>
               <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>{student.status}</Text>
               </View>
               <Text style={styles.studentName}>{student.name}</Text>
            </View>
            
            <View style={styles.studentMeta}>
               <Text style={styles.studentLevel}>{student.level}</Text>
               <View style={styles.separator} />
               <Text style={styles.joinDate}>انضم {student.joinDate}</Text>
            </View>
          </View>

          {/* Avatar - Far Right */}
          <View style={styles.avatarContainer}>
             <Image source={{ uri: student.avatar }} style={styles.studentAvatar} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const StudentsScreen: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
             <View style={styles.headerTitleGroup}>
                <Text style={styles.headerTitle}>إدارة الطلاب</Text>
                <Text style={styles.headerSubtitle}>التحكم في بيانات الطلاب المتقدمين والمستمرين</Text>
             </View>
             <View style={[styles.headerIconBox, { backgroundColor: colors.primary }]}>
                <GraduationCap size={24} color={colors.secondary} />
             </View>
          </View>

          <View style={styles.searchBarRow}>
             <View style={styles.searchContainer}>
                <SearchBar value={search} onChangeText={setSearch} placeholder="ابحث عن اسم طالب أو بريده..." />
             </View>
             <TouchableOpacity style={styles.filterButton}>
                <Filter size={20} color={colors.textSecondary} />
             </TouchableOpacity>
          </View>
        </View>

        <View style={styles.studentsList}>
          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: 40,
  },
  header: {
    marginBottom: spacing.xl,
  },
  headerTop: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 16,
    marginBottom: spacing.lg,
  },
  headerIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  headerTitleGroup: {
    flex: 1,
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontFamily: fonts.tajawalBold,
    fontSize: 26,
    color: colors.secondary,
  },
  headerSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
  },
  searchBarRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  studentsList: {
    gap: 12,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  studentAvatar: {
    width: '100%',
    height: '100%',
  },
  textDetails: {
    flex: 1,
    alignItems: 'flex-end',
    gap: 6,
  },
  nameRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  studentName: {
    fontFamily: fonts.tajawalBold,
    fontSize: 18,
    color: colors.secondary,
  },
  statusBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.md,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  statusText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: colors.success,
  },
  studentMeta: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
  },
  studentLevel: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.textSecondary,
  },
  separator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  joinDate: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
  },
  actions: {
    flexDirection: 'row-reverse',
    gap: 10,
  },
  actionCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
});

