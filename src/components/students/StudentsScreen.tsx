import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Platform,
} from 'react-native';
import {
  GraduationCap,
  Filter,
  Mail,
  Lock,
  Unlock,
  Bell,
  ArrowUpDown,
  Ban,
  Check,
  X,
} from 'lucide-react-native';
import { colors, fonts, radius, shadows, spacing } from '../../theme';
import { SearchBar } from '../ui/SearchBar';
import { StudentDetailScreen } from './StudentDetailScreen';

// ─── Types ────────────────────────────────────────────────────────────
interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  level: string;
  joinDate: string;
  avatar: string;
  status: 'منتظم' | 'موقوف';
}

// ─── Mock Data ────────────────────────────────────────────────────────
const initialStudents: Student[] = [
  { id: '1', name: 'أحمد محمود علي', email: 'ahmed@example.com', phone: '0501234567', level: 'المستوى الثاني', joinDate: '١ مارس ٢٠٢٤', avatar: 'https://i.pravatar.cc/150?u=a', status: 'منتظم' },
  { id: '2', name: 'سارة يوسف الجبر', email: 'sara@example.com', phone: '0509876543', level: 'المستوى الثالث', joinDate: '١٠ فبراير ٢٠٢٤', avatar: 'https://i.pravatar.cc/150?u=s', status: 'منتظم' },
  { id: '3', name: 'ياسين علي العمر', email: 'yasin@example.com', phone: '0505554444', level: 'المستوى الأول', joinDate: '٢٥ يناير ٢٠٢٤', avatar: 'https://i.pravatar.cc/150?u=y', status: 'موقوف' },
  { id: '4', name: 'لينا محمد فهد', email: 'lina@example.com', phone: '0501112222', level: 'المستوى الرابع', joinDate: '٥ يناير ٢٠٢٤', avatar: 'https://i.pravatar.cc/150?u=l', status: 'منتظم' },
];

// ─── NeoCheckbox ──────────────────────────────────────────────────────
const NeoCheckbox: React.FC<{ checked: boolean; onToggle: () => void }> = ({ checked, onToggle }) => (
  <TouchableOpacity onPress={onToggle} style={[s.checkbox, checked && s.checkboxChecked]}>
    {checked && <Check size={14} color={colors.secondary} strokeWidth={3} />}
  </TouchableOpacity>
);

// ─── Status Badge (Static — Click navigates) ─────────────────────────
const StatusBadge: React.FC<{ status: 'منتظم' | 'موقوف' }> = ({ status }) => {
  const isActive = status === 'منتظم';
  return (
    <View style={[s.statusBadge, !isActive && { backgroundColor: colors.errorLight, borderColor: colors.error }]}>
      {isActive ? (
        <Unlock size={10} color={colors.success} strokeWidth={2.5} />
      ) : (
        <Lock size={10} color={colors.error} strokeWidth={2.5} />
      )}
      <Text style={[s.statusText, !isActive && { color: colors.error }]}>{status}</Text>
    </View>
  );
};

// ─── Student Card (Simplified) ────────────────────────────────────────
const StudentCard: React.FC<{
  student: Student;
  selected: boolean;
  onSelectToggle: () => void;
  onPress: () => void;
  onMailPress: () => void;
}> = ({ student, selected, onSelectToggle, onPress, onMailPress }) => (
  <View style={[s.card, selected && s.cardSelected]}>
    <View style={s.cardInner}>
      {/* Mail — Left side */}
      <TouchableOpacity style={s.actionCircle} onPress={onMailPress}>
        <Mail size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      {/* Main Content (Clickable) */}
      <TouchableOpacity style={s.contentRow} onPress={onPress} activeOpacity={0.7}>
        <View style={s.textDetails}>
          <View style={s.nameRow}>
            <StatusBadge status={student.status} />
            <Text style={s.studentName}>{student.name}</Text>
          </View>
          <View style={s.studentMeta}>
            <Text style={s.studentLevel}>{student.level}</Text>
            <View style={s.separator} />
            <Text style={s.joinDate}>انضم {student.joinDate}</Text>
          </View>
        </View>

        {/* Avatar */}
        <View style={s.avatarContainer}>
          <Image source={{ uri: student.avatar }} style={s.studentAvatar} />
        </View>
      </TouchableOpacity>

      {/* Checkbox — Far Right */}
      <NeoCheckbox checked={selected} onToggle={onSelectToggle} />
    </View>
  </View>
);

// ─── Bulk Actions Bar ─────────────────────────────────────────────────
const BulkActionsBar: React.FC<{
  count: number;
  onNotify: () => void;
  onMove: () => void;
  onBan: () => void;
  onClear: () => void;
}> = ({ count, onNotify, onMove, onBan, onClear }) => {
  if (count === 0) return null;
  return (
    <View style={s.bulkBar}>
      <TouchableOpacity style={s.bulkClose} onPress={onClear}>
        <X size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      <View style={s.bulkActions}>
        <TouchableOpacity style={s.bulkBtn} onPress={onBan}>
          <Text style={[s.bulkBtnText, { color: colors.error }]}>حظر جماعي</Text>
          <Ban size={16} color={colors.error} />
        </TouchableOpacity>
        <TouchableOpacity style={s.bulkBtn} onPress={onMove}>
          <Text style={s.bulkBtnText}>نقل لمستوى آخر</Text>
          <ArrowUpDown size={16} color={colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity style={[s.bulkBtn, { backgroundColor: colors.primary, borderColor: colors.secondary }]} onPress={onNotify}>
          <Text style={[s.bulkBtnText, { color: colors.secondary }]}>إرسال تنبيه جماعي</Text>
          <Bell size={16} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <View style={s.bulkCount}>
        <Text style={s.bulkCountText}>{count}</Text>
      </View>
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────
export const StudentsScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);

  // Toast
  const [toast, setToast] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const showToast = (msg: string) => {
    setToast(msg);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: false }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: false }),
    ]).start(() => setToast(null));
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const changeStatus = (id: string, status: 'منتظم' | 'موقوف') => {
    setStudents((prev) => prev.map((st) => st.id === id ? { ...st, status } : st));
  };

  const filteredStudents = students.filter(
    (st) => st.name.includes(search) || st.email.includes(search)
  );

  // ─── If a student is selected → show full detail screen ───
  if (activeStudent) {
    // Find the latest version of the student from state
    const freshStudent = students.find(s => s.id === activeStudent.id) || activeStudent;
    return (
      <StudentDetailScreen
        student={freshStudent}
        onBack={() => setActiveStudent(null)}
        onStatusChange={changeStatus}
      />
    );
  }

  // ─── Main List ───
  return (
    <View style={s.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scrollContent}>
        {/* Header */}
        <View style={s.header}>
          <View style={s.headerTop}>
            <View style={s.headerTitleGroup}>
              <Text style={s.headerTitle}>إدارة الطلاب</Text>
              <Text style={s.headerSubtitle}>اضغط على اسم الطالب لفتح مركز التحكم الكامل</Text>
            </View>
            <View style={[s.headerIconBox, { backgroundColor: colors.primary }]}>
              <GraduationCap size={24} color={colors.secondary} />
            </View>
          </View>

          <View style={s.searchBarRow}>
            <View style={s.searchContainer}>
              <SearchBar value={search} onChangeText={setSearch} placeholder="ابحث عن اسم طالب أو بريده..." />
            </View>
            <TouchableOpacity style={s.filterButton}>
              <Filter size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Student List */}
        <View style={s.studentsList}>
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              selected={selectedIds.has(student.id)}
              onSelectToggle={() => toggleSelect(student.id)}
              onPress={() => setActiveStudent(student)}
              onMailPress={() => showToast('سيتم التوجيه لصفحة المحادثات')}
            />
          ))}

          {filteredStudents.length === 0 && (
            <View style={s.emptyState}>
              <Text style={s.emptyText}>لا توجد نتائج</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bulk Actions Floating Bar */}
      <BulkActionsBar
        count={selectedIds.size}
        onNotify={() => showToast('تم إرسال التنبيه الجماعي')}
        onMove={() => showToast('تم نقل الطلاب لمستوى آخر')}
        onBan={() => showToast('تم حظر الطلاب المحددين')}
        onClear={() => setSelectedIds(new Set())}
      />

      {/* Toast */}
      {toast && (
        <Animated.View style={[s.toastBox, { opacity: fadeAnim }]}>
          <Check size={18} color="#166534" />
          <Text style={s.toastText}>{toast}</Text>
        </Animated.View>
      )}
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: spacing.lg, paddingBottom: 100 },

  // Header
  header: { marginBottom: spacing.xl },
  headerTop: { flexDirection: 'row-reverse', alignItems: 'center', gap: 16, marginBottom: spacing.lg },
  headerIconBox: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.secondary },
  headerTitleGroup: { flex: 1, alignItems: 'flex-end' },
  headerTitle: { fontFamily: fonts.tajawalBold, fontSize: 26, color: colors.secondary },
  headerSubtitle: { fontFamily: fonts.regular, fontSize: 14, color: colors.textMuted },
  searchBarRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: 12 },
  searchContainer: { flex: 1 },
  filterButton: { width: 48, height: 48, borderRadius: radius.md, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.secondary },

  // Cards
  studentsList: { gap: 12 },
  card: { backgroundColor: colors.surface, borderRadius: radius.xl, padding: 16, borderWidth: 2, borderColor: colors.borderLight, ...shadows.sm },
  cardSelected: { borderColor: colors.primary, backgroundColor: '#FFFFEE' },
  cardInner: { flexDirection: 'row-reverse', alignItems: 'center', gap: 12 },
  contentRow: { flexDirection: 'row-reverse', alignItems: 'center', flex: 1, gap: 14 },
  avatarContainer: { width: 56, height: 56, borderRadius: 20, overflow: 'hidden', backgroundColor: colors.background, borderWidth: 2, borderColor: colors.secondary },
  studentAvatar: { width: '100%', height: '100%' },
  textDetails: { flex: 1, alignItems: 'flex-end', gap: 6 },
  nameRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: 10 },
  studentName: { fontFamily: fonts.tajawalBold, fontSize: 17, color: colors.secondary, textDecorationLine: 'underline' },
  studentMeta: { flexDirection: 'row-reverse', alignItems: 'center', gap: 8 },
  studentLevel: { fontFamily: fonts.semiBold, fontSize: 13, color: colors.textSecondary },
  separator: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.border },
  joinDate: { fontFamily: fonts.regular, fontSize: 13, color: colors.textMuted },

  // Checkbox
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2.5, borderColor: colors.secondary, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.surface },
  checkboxChecked: { backgroundColor: colors.primary },

  // Status
  statusBadge: { flexDirection: 'row-reverse', alignItems: 'center', gap: 4, backgroundColor: colors.successLight, paddingHorizontal: 8, paddingVertical: 4, borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.success },
  statusText: { fontFamily: fonts.bold, fontSize: 11, color: colors.success },

  // Actions
  actionCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: colors.borderLight },

  // Bulk Bar
  bulkBar: { position: 'absolute', bottom: 24, left: 24, right: 24, backgroundColor: colors.secondary, borderRadius: radius.xl, padding: 14, flexDirection: 'row-reverse', alignItems: 'center', gap: 12, borderWidth: 3, borderColor: colors.primary, shadowColor: colors.secondary, shadowOffset: { width: 6, height: 6 }, shadowOpacity: 1, shadowRadius: 0, elevation: 12 },
  bulkCount: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.secondary },
  bulkCountText: { fontFamily: fonts.bold, fontSize: 16, color: colors.secondary },
  bulkActions: { flex: 1, flexDirection: 'row-reverse', gap: 8, justifyContent: 'center' },
  bulkBtn: { flexDirection: 'row-reverse', alignItems: 'center', gap: 6, backgroundColor: colors.surface, borderRadius: radius.lg, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 2, borderColor: colors.borderLight },
  bulkBtnText: { fontFamily: fonts.bold, fontSize: 12, color: colors.secondary },
  bulkClose: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },

  // Empty
  emptyState: { alignItems: 'center', padding: 60 },
  emptyText: { fontFamily: fonts.semiBold, fontSize: 16, color: colors.textMuted },

  // Toast
  toastBox: { position: 'absolute', bottom: 30, left: 30, backgroundColor: colors.successLight, padding: 14, borderRadius: radius.md, borderWidth: 2, borderColor: colors.success, flexDirection: 'row-reverse', alignItems: 'center', gap: 10, zIndex: 2000 },
  toastText: { fontFamily: fonts.bold, fontSize: 13, color: '#166534' },
});
