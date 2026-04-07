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
  LogOut,
  Check,
  Camera,
  Star,
  Trash2,
} from 'lucide-react-native';
import { colors, fonts, spacing } from '../../theme';

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
const mockCourses = [
  {
    name: 'تطبيقات التصميم التفاعلي',
    type: 'كورس',
    date: '2026/03/25',
    amount: '800 EGP',
    payMethod: 'ماستر كارد',
    payColor: '#EB001B',
    payBg: '#FFF1F0',
    status: 'ناجحة',
    statusOk: true,
    active: true,
    thumb: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=120&h=120&fit=crop',
  },
  {
    name: 'تصميم واجهات المستخدم\nUX/UI',
    type: 'كتاب',
    date: '2026/03/25',
    amount: '1200 EGP',
    payMethod: 'فيزا',
    payColor: '#1A1F71',
    payBg: '#EEF0FF',
    status: 'قيد الانتظار',
    statusOk: false,
    active: false,
    thumb: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=120&h=120&fit=crop',
  },
  {
    name: 'مقدمة في أدوات التصميم\nالحديثة',
    type: 'حزمة',
    date: '2026/04/01',
    amount: '650 EGP',
    payMethod: 'فوري',
    payColor: '#E8850C',
    payBg: '#FFF8EE',
    status: 'ناجحة',
    statusOk: true,
    active: true,
    thumb: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=120&h=120&fit=crop',
  },
  {
    name: 'كورس أساسيات التصميم\nالرقمي',
    type: 'كتاب',
    date: '2026/04/08',
    amount: '940 EGP',
    payMethod: 'كاش',
    payColor: '#047857',
    payBg: '#ECFDF5',
    status: 'قيد الانتظار',
    statusOk: false,
    active: false,
    thumb: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=120&h=120&fit=crop',
  },
];

const mockActivity = [
  { label: 'تسجيل دخول', detail: 'Chrome — Cairo, EG', time: 'اليوم، ١٠:٣٠ ص' },
  { label: 'مشاهدة درس', detail: 'مقدمة في الـ Typography', time: 'اليوم، ٩:١٥ ص' },
  { label: 'شراء كورس', detail: 'أساسيات تصميم UI/UX', time: 'أمس، ٣:٠٠ م' },
  { label: 'تحميل كتاب', detail: 'الخط العربي الحديث', time: 'منذ يومين' },
];

// ─── Toggle Switch ────────────────────────────────────────────────────
const ToggleSwitch: React.FC<{ value: boolean; onToggle: () => void }> = ({ value, onToggle }) => (
  <TouchableOpacity
    onPress={onToggle}
    activeOpacity={0.8}
    style={[togSt.track, value && togSt.trackOn]}
  >
    <View style={[togSt.thumb, value && togSt.thumbOn]} />
  </TouchableOpacity>
);

const togSt = StyleSheet.create({
  track: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#7C3AED',
    justifyContent: 'center',
    paddingHorizontal: 2,
    ...Platform.select({ web: { cursor: 'pointer' as any }, default: {} }),
  },
  trackOn: { backgroundColor: '#7C3AED' },
  thumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#7C3AED',
    alignSelf: 'flex-end',
  },
  thumbOn: { 
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
});

// ─── Main Component ───────────────────────────────────────────────────
export const StudentDetailScreen: React.FC<{
  student: Student;
  onBack: () => void;
  onStatusChange: (id: string, status: 'منتظم' | 'موقوف') => void;
}> = ({ student, onBack, onStatusChange }) => {
  const [accountOn, setAccountOn] = useState(student.status === 'منتظم');
  const [multiDevice, setMultiDevice] = useState(false);
  const [pushAlerts, setPushAlerts] = useState(false);

  // Toast
  const [toast, setToast] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const showToast = (msg: string) => {
    setToast(msg);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: false }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: false }),
    ]).start(() => setToast(null));
  };

  const toggleAccount = () => {
    const next = !accountOn;
    setAccountOn(next);
    onStatusChange(student.id, next ? 'منتظم' : 'موقوف');
    showToast(next ? 'تم تفعيل الحساب' : 'تم تعطيل الحساب');
  };

  return (
    <View style={s.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* Action Row - top area where back could go, but we remove the text text and rely on a cleaner look */}
        {/* We can place the back button on top right of the container for context */}
        <TouchableOpacity style={s.backBtn} onPress={onBack}>
          <Text style={s.backLabel}>العودة لقائمة الطلاب ←</Text>
        </TouchableOpacity>

        {/* ═══════════════════════════════════════════════════════
            CARD 1 — بيانات الهوية
        ═══════════════════════════════════════════════════════ */}
        <View style={s.card}>
          {/* Action button - now yellow with 2px black border matching reference */}
          <TouchableOpacity style={s.saveBtn}>
            <Text style={s.saveBtnText}>حفظ التغييرات</Text>
          </TouchableOpacity>

          <View style={s.heroRow}>
            {/* Info */}
            <View style={s.heroInfo}>
              <Text style={s.heroName}>{student.name}</Text>
              <Text style={s.heroMeta}>010XXXXXXXX</Text>
              <Text style={s.heroMeta}>تاريخ الانضمام: يناير 2025</Text>
              <View style={s.heroStatusBadge}>
                <Star size={10} color="#fff" fill="#fff" />
                <Text style={s.heroStatusText}>متعلم نشط</Text>
              </View>
            </View>

            {/* Avatar with camera overlay */}
            <View style={s.avatarWrap}>
              <Image source={{ uri: student.avatar }} style={s.heroAvatar} />
              <View style={s.cameraBadge}>
                <Camera size={12} color="#fff" />
              </View>
            </View>
          </View>

          {/* Progress bar */}
          <View style={s.progressSection}>
            <View style={s.progressTrack}>
              <View style={[s.progressFill, { width: '62%' }]} />
            </View>
            <Text style={s.progressXP}>XP2,000 / 1,240</Text>
          </View>
        </View>

        {/* ═══════════════════════════════════════════════════════
            CARD 2 — صلاحيات الوصول
        ═══════════════════════════════════════════════════════ */}
        <View style={s.card}>
          <Text style={s.cardTitle}>صلاحيات الوصول</Text>

          <View style={s.settingItem}>
            <ToggleSwitch value={accountOn} onToggle={toggleAccount} />
            <Text style={s.settingLabel}>حالة الحساب ( مفعل / معطل )</Text>
          </View>

          <View style={s.settingItem}>
            <ToggleSwitch value={multiDevice} onToggle={() => { setMultiDevice(!multiDevice); showToast(multiDevice ? 'جهاز واحد فقط' : 'أجهزة متعددة'); }} />
            <Text style={s.settingLabel}>السماح بالدخول من اجهزة متعددة</Text>
          </View>

          <View style={[s.settingItem, { borderBottomWidth: 0 }]}>
            <ToggleSwitch value={pushAlerts} onToggle={() => { setPushAlerts(!pushAlerts); showToast(pushAlerts ? 'تم إيقاف التنبيهات' : 'تم تفعيل التنبيهات'); }} />
            <Text style={s.settingLabel}>إرسال تنبيهات</Text>
          </View>
        </View>

        {/* ═══════════════════════════════════════════════════════
            CARD 3 — كورسات الطالب
        ═══════════════════════════════════════════════════════ */}
        <View style={s.card}>
          <Text style={s.cardTitle}>كورسات الطالب</Text>

          {/* Table Header - No background, just text */}
          <View style={s.courseHeader}>
            <Text style={[s.chCell, { width: 110 }]}>الإجراءات</Text>
            <Text style={[s.chCell, { width: 70 }]}>الحالة</Text>
            <Text style={[s.chCell, { width: 100 }]}>وسيلة الدفع</Text>
            <Text style={[s.chCell, { width: 80 }]}>المبلغ</Text>
            <Text style={[s.chCell, { width: 80 }]}>التاريخ</Text>
            <Text style={[s.chCell, { width: 60 }]}>النوع</Text>
            <Text style={[s.chCell, { flex: 1 }]}>اسم المنتج</Text>
          </View>

          {/* Table Rows */}
          {mockCourses.map((c, i) => (
            <View key={i} style={s.courseRow}>
              {/* Action */}
              <View style={{ width: 110, alignItems: 'flex-end' }}>
                <TouchableOpacity
                  style={[s.courseActionBtn, c.active ? s.actionStop : s.actionActivate]}
                  onPress={() => showToast(c.active ? 'تم إيقاف الاشتراك' : 'تم تفعيل الاشتراك')}
                >
                  <Text style={[s.actionBtnText, c.active ? { color: '#fff' } : { color: '#000' }]}>
                    {c.active ? 'ايقاف الاشتراك' : 'تفعيل الاشتراك'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Status */}
              <View style={{ width: 70, flexDirection: 'row-reverse', alignItems: 'center', gap: 4 }}>
                <View style={[s.statusDot, { borderColor: c.statusOk ? '#10B981' : '#F59E0B', borderWidth: 2 }]} />
                <Text style={[s.courseCell, { fontSize: 11, color: c.statusOk ? '#10B981' : '#F59E0B', fontFamily: fonts.bold }]}>{c.status}</Text>
              </View>

              {/* Pay Method */}
              <View style={{ width: 100, flexDirection: 'row-reverse', alignItems: 'center', gap: 6 }}>
                <Text style={s.courseCell}>{c.payMethod}</Text>
                <View style={[s.payIcon, { backgroundColor: c.payBg }]}>
                  <Text style={{ fontSize: 8, fontFamily: fonts.bold, color: c.payColor }}>$</Text>
                </View>
              </View>

              {/* Amount */}
              <Text style={[s.courseCell, { width: 80, fontFamily: fonts.bold }]}>{c.amount}</Text>

              {/* Date */}
              <Text style={[s.courseCell, { width: 80 }]}>{c.date}</Text>

              {/* Type */}
              <Text style={[s.courseCell, { width: 60 }]}>{c.type}</Text>

              {/* Product name + image */}
              <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center', gap: 10 }}>
                <Image source={{ uri: c.thumb }} style={s.courseThumb} />
                <Text style={[s.courseProductName, { flex: 1 }]}>{c.name}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* ═══════════════════════════════════════════════════════
            CARD 4 — سجل نشاط الطالب
        ═══════════════════════════════════════════════════════ */}
        <View style={s.card}>
          <Text style={s.cardTitle}>سجل نشاط الطالب</Text>

          {mockActivity.map((a, i) => (
            <View key={i} style={s.activityRow}>
              {/* Time (Left) */}
              <Text style={s.actTime}>{a.time}</Text>

              {/* Dot */}
              <View style={s.actDotCol}>
                <View style={s.actDot} />
                {i < mockActivity.length - 1 && <View style={s.actLine} />}
              </View>

              {/* Content (Right) */}
              <View style={s.actContent}>
                <Text style={s.actLabel}>{a.label}</Text>
                <Text style={s.actDetail}>{a.detail}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* ═══════════════════════════════════════════════════════
            CARD 5 — الخروج والأمان
        ═══════════════════════════════════════════════════════ */}
        <View style={s.card}>
          <Text style={s.cardTitle}>الخروج والأمان</Text>

          <TouchableOpacity
            style={s.logoutBtn}
            onPress={() => showToast('تم إزالة جميع الأجهزة')}
            activeOpacity={0.8}
          >
            <LogOut size={16} color={colors.secondary} />
            <Text style={s.logoutBtnText}>ازالة جميع الاجهزة المسجلة</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={s.deleteBtn}
            onPress={() => showToast('تم إيقاف الحساب')}
            activeOpacity={0.8}
          >
            <Trash2 size={16} color={colors.error} />
            <Text style={s.deleteBtnText}>ايقاف حساب الطالب</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 48 }} />
      </ScrollView>

      {/* Toast */}
      {toast && (
        <Animated.View style={[s.toast, { opacity: fadeAnim }]}>
          <Check size={16} color="#166534" />
          <Text style={s.toastText}>{toast}</Text>
        </Animated.View>
      )}
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FAFAFA' },
  // Notice we let it fill 100% width with nice comfortable padding
  scroll: { paddingVertical: 24, paddingHorizontal: 32 },

  // Optional back button positioned properly
  backBtn: { marginBottom: 12, alignSelf: 'flex-start' },
  backLabel: { fontFamily: fonts.semiBold, fontSize: 13, color: '#6B7280' },

  /* ── Card ── */
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 24,
    marginBottom: 20,
  },
  cardTitle: {
    fontFamily: fonts.tajawalBold,
    fontSize: 18,
    color: colors.secondary,
    textAlign: 'right',
    marginBottom: 24,
  },

  /* ── Hero ── */
  saveBtn: {
    position: 'absolute',
    top: 24,
    left: 24,
    backgroundColor: '#FFFF00',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#000',
    zIndex: 5,
    ...Platform.select({ web: { cursor: 'pointer' as any }, default: {} }),
  },
  saveBtnText: { fontFamily: fonts.bold, fontSize: 12, color: '#000' },

  heroRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: 20 },

  avatarWrap: { position: 'relative' },
  heroAvatar: {
    width: 82,
    height: 82,
    borderRadius: 41, // Fully round like in the second image
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2, // Moved to bottom-right per typical RTL UI if the image matches
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },

  heroInfo: { flex: 1, alignItems: 'flex-end', gap: 4 },
  heroName: { fontFamily: fonts.tajawalBold, fontSize: 24, color: colors.secondary, lineHeight: 32 },
  heroMeta: { fontFamily: fonts.regular, fontSize: 13, color: colors.textMuted },
  heroStatusBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#10B981', // Clean green
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 4,
  },
  heroStatusText: { fontFamily: fonts.bold, fontSize: 11, color: '#fff' },

  progressSection: { marginTop: 24, alignItems: 'center' },
  progressTrack: {
    width: '40%', // Centered progress bar
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#7C3AED', borderRadius: 3 },
  progressXP: { fontFamily: fonts.semiBold, fontSize: 11, color: colors.textMuted, marginTop: 8 },

  /* ── Settings ── */
  settingItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLabel: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.secondary, flex: 1, textAlign: 'right', marginLeft: 12 },

  /* ── Courses Table ── */
  courseHeader: {
    flexDirection: 'row-reverse',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  chCell: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.textMuted, textAlign: 'right' },

  courseRow: {
    flexDirection: 'row-reverse',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    alignItems: 'center',
  },
  courseCell: { fontFamily: fonts.regular, fontSize: 13, color: colors.secondary, textAlign: 'right' },
  courseProductName: { fontFamily: fonts.bold, fontSize: 13, color: colors.secondary, textAlign: 'right', lineHeight: 20 },
  courseThumb: { width: 44, height: 44, borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB' },

  statusDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#fff' },

  payIcon: {
    width: 28,
    height: 18,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  courseActionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({ web: { cursor: 'pointer' as any }, default: {} }),
  },
  actionStop: { backgroundColor: '#DC2626' },
  actionActivate: { backgroundColor: '#FFFF00' },
  actionBtnText: { fontFamily: fonts.bold, fontSize: 11 },

  /* ── Activity Timeline ── */
  activityRow: { flexDirection: 'row-reverse', minHeight: 64 },
  actContent: { flex: 1, alignItems: 'flex-end', paddingBottom: 20 },
  actLabel: { fontFamily: fonts.tajawalBold, fontSize: 15, color: colors.secondary },
  actDetail: { fontFamily: fonts.regular, fontSize: 13, color: colors.textMuted, marginTop: 4, textAlign: 'right' },
  actDotCol: { alignItems: 'center', width: 24, marginHorizontal: 16 },
  actDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#7C3AED', marginTop: 4 },
  actLine: { width: 2, flex: 1, backgroundColor: '#E5E7EB', marginTop: 4 },
  actTime: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, width: 100, textAlign: 'left', paddingTop: 3 },

  /* ── Danger Zone ── */
  logoutBtn: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
    marginBottom: 12,
    ...Platform.select({ web: { cursor: 'pointer' as any }, default: {} }),
  },
  logoutBtnText: { fontFamily: fonts.bold, fontSize: 14, color: colors.secondary },
  deleteBtn: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
    backgroundColor: '#fff',
    ...Platform.select({ web: { cursor: 'pointer' as any }, default: {} }),
  },
  deleteBtnText: { fontFamily: fonts.bold, fontSize: 14, color: '#DC2626' },

  /* ── Toast ── */
  toast: {
    position: 'absolute',
    bottom: 32,
    left: 32,
    backgroundColor: colors.successLight,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.success,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 10,
    zIndex: 999,
  },
  toastText: { fontFamily: fonts.bold, fontSize: 14, color: '#166534' },
});
