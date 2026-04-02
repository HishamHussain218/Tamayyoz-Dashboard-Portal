import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Pressable, Animated } from 'react-native';
import { ClipboardCheck, Eye, Check, X, Clock, Filter, Search } from 'lucide-react-native';
import { colors, fonts, radius, shadows, spacing } from '../../theme';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { SearchBar } from '../ui/SearchBar';
import { Modal } from '../ui/Modal';

const mockApprovals = [
  { id: '1', teacher: 'أ. محمد عمر', course: 'فيزياء الثانوية العامة - الباب الأول', subject: 'فيزياء', date: 'منذ ٢ ساعة', type: 'درس فيديو', status: 'pending', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', teacher: 'أ. سارة أحمد', course: 'أساسيات البرمجة بلغة C', subject: 'حاسبات', date: 'منذ ٤ ساعة', type: 'كورس كامل', status: 'pending', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', teacher: 'أ. خالد يوسف', course: 'كورس القدرات الشامل', subject: 'قدرات', date: 'منذ ٦ ساعة', type: 'كتاب PDF', status: 'pending', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', teacher: 'أ. ليلى علي', course: 'اللغة الإنجليزية لغير الناطقين بها', subject: 'لغات', date: 'منذ يوم', type: 'اختبار', status: 'pending', avatar: 'https://i.pravatar.cc/150?u=4' },
];

export const ApprovalsScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [approvals, setApprovals] = useState(mockApprovals);
  const [rejectItem, setRejectItem] = useState<any>(null);
  const [previewItem, setPreviewItem] = useState<any>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: false }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: false })
    ]).start(() => setToast(null));
  };

  const getFormatTag = (type: string) => {
    if (type.includes('فيديو') || type.includes('كورس')) return '[فيديو 🎥]';
    if (type.includes('PDF')) return '[ملف PDF 📄]';
    if (type.includes('اختبار')) return '[اختبار 📝]';
    return `[${type}]`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
           <View style={styles.iconBox}>
              <ClipboardCheck size={24} color={colors.secondary} />
           </View>
           <View style={styles.titleInfo}>
              <Text style={styles.title}>مراجعة وتدقيق المحتوى</Text>
              <Text style={styles.subtitle}>لديك ٤ طلبات تحتاج للمراجعة والاعتماد</Text>
           </View>
           <View style={{ backgroundColor: '#F0FDF4', borderWidth: 2, borderColor: colors.secondary, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 8, marginLeft: 'auto' }}>
              <Text style={{ fontFamily: fonts.bold, fontSize: 13, color: '#166534' }}>تم مراجعة 5 من أصل 8 اليوم</Text>
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
        data={approvals}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.approvalCard}>
            <View style={styles.cardHeader}>
               <View style={styles.teacherInfo}>
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                  <View style={styles.teacherText}>
                     <Text style={styles.teacherName}>{item.teacher} - {item.subject}</Text>
                  </View>
               </View>
               <View style={styles.timeBadge}>
                  <Clock size={12} color={item.date.includes('يوم') ? colors.error : colors.textMuted} />
                  <Text style={[styles.timeText, item.date.includes('يوم') && { color: colors.error }]}>{item.date}</Text>
               </View>
            </View>

            <View style={styles.cardBody}>
               <View style={{ flexDirection: 'row-reverse', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                  <Text style={styles.courseTitle}>{item.course}</Text>
                  <View style={{ backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: colors.secondary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                     <Text style={{ fontFamily: fonts.bold, fontSize: 10, color: colors.secondary }}>{getFormatTag(item.type)}</Text>
                  </View>
               </View>
            </View>

            <View style={[styles.cardActions, { justifyContent: 'flex-start' }]}>
               <Pressable 
                  onPress={() => setPreviewItem(item)}
                  style={({ pressed, hovered }: any) => [
                     styles.viewBtn, 
                     { width: '100%', justifyContent: 'center', backgroundColor: '#FFF', borderColor: colors.secondary, borderWidth: 2, borderRadius: 12, paddingVertical: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 2 },
                     (pressed || hovered) && { backgroundColor: '#F9FAFB' }
                  ]}
               >
                  <Text style={[styles.viewBtnText, { fontFamily: fonts.tajawalBold, fontSize: 14 }]}>مراجعة واعتماد المحتوى 👁️</Text>
               </Pressable>
            </View>
          </View>
        )}
      />
      {/* Toast */}
      {toast && (
        <Animated.View style={[{ position: 'absolute', bottom: 30, left: 30, backgroundColor: '#F0FDF4', padding: 16, borderRadius: 12, borderWidth: 2, borderColor: '#10B981', flexDirection: 'row-reverse', alignItems: 'center', zIndex: 2000 }, { opacity: fadeAnim }]}>
          <Check size={20} color="#166534" />
          <Text style={{ color: '#166534', fontFamily: fonts.bold, fontSize: 13, marginRight: 10 }}>{toast}</Text>
        </Animated.View>
      )}

      {/* Preview Modal */}
      <Modal visible={!!previewItem} onClose={() => setPreviewItem(null)} title="مراجعة المحتوى المعلق">
         <View style={{ paddingHorizontal: 16, paddingBottom: 20, alignItems: 'center' }}>
            {previewItem && (
               <View style={{ width: '100%', marginBottom: 16, backgroundColor: '#FFFF00', padding: 12, borderRadius: 12, borderWidth: 2, borderColor: colors.secondary }}>
                  <Text style={{ fontFamily: fonts.tajawalBold, fontSize: 14, color: colors.secondary, textAlign: 'center' }}>
                     مراجعة {getFormatTag(previewItem.type).replace(/[\[\]]/g, '')} المقدم من {previewItem.teacher}
                  </Text>
               </View>
            )}
            <View style={{ width: '100%', height: 350, backgroundColor: '#E5E7EB', borderRadius: 24, borderWidth: 2, borderColor: colors.secondary, justifyContent: 'center', alignItems: 'center', marginBottom: 24 }}>
               <Eye size={48} color={colors.textMuted} style={{ marginBottom: 16 }} />
               <Text style={{ fontFamily: fonts.tajawalBold, fontSize: 18, color: colors.secondary }}>منطقة عرض المحتوى</Text>
               <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.textMuted, marginTop: 8 }}>(Video Player / PDF Viewer)</Text>
            </View>
            <View style={{ flexDirection: 'row-reverse', gap: 16, width: '100%' }}>
               <Button 
                  label="اعتماد ونشر" 
                  icon={<Check size={18} color={colors.secondary} strokeWidth={3} />}
                  variant="primary" 
                  style={{ flex: 2, backgroundColor: '#FFFF00', borderRadius: 24, borderWidth: 2, borderColor: colors.secondary, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4 }} 
                  onPress={() => { 
                     setApprovals(prev => prev.filter(a => a.id !== previewItem.id)); 
                     setPreviewItem(null); 
                     showToast('تم الاعتماد والنشر بنجاح'); 
                  }} 
               />
               <Button 
                  label="رفض المحتوى" 
                  icon={<X size={18} color={colors.secondary} strokeWidth={3} />}
                  variant="secondary" 
                  style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 24, borderWidth: 2, borderColor: colors.secondary }} 
                  onPress={() => { setRejectItem(previewItem); setPreviewItem(null); }} 
               />
            </View>
         </View>
      </Modal>

      {/* Reject Modal */}
      <Modal visible={!!rejectItem} onClose={() => { setPreviewItem(rejectItem); setRejectItem(null); }} title="سبب الرفض والطلب من المعلم">
         <View style={{ paddingHorizontal: 16, paddingBottom: 20 }}>
            <Text style={{ fontFamily: fonts.tajawalBold, fontSize: 14, color: colors.secondary, marginBottom: 12 }}>أسباب الرفض (إجابات سريعة):</Text>
            <View style={{ flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
               {['جودة الصوت ضعيفة', 'المحتوى غير مكتمل', 'يحتاج تعديل فني'].map(reason => (
                 <TouchableOpacity key={reason} style={{ backgroundColor: '#F3F4F6', borderWidth: 2, borderColor: colors.secondary, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 }}>
                    <Text style={{ fontFamily: fonts.tajawalBold, fontSize: 12, color: colors.secondary }}>{reason}</Text>
                 </TouchableOpacity>
               ))}
            </View>
            <Text style={{ fontFamily: fonts.tajawalBold, fontSize: 14, color: colors.secondary, marginBottom: 8 }}>ملاحظات أُخرى:</Text>
            <TextInput 
               style={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: colors.secondary, borderRadius: 16, padding: 12, height: 100, textAlignVertical: 'top', fontFamily: fonts.regular, marginBottom: 20 }} 
               placeholder="اكتب ملاحظاتك للمعلم..."
               multiline
            />
            <Button 
               label="إرسال الرفض" 
               variant="primary" 
               style={{ backgroundColor: '#FF4D4D', borderColor: colors.secondary, borderWidth: 2, borderRadius: 24, height: 50, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4 }} 
               onPress={() => { 
                  setApprovals(prev => prev.filter(a => a.id !== rejectItem.id)); 
                  setRejectItem(null); 
                  showToast('تم إرسال الرفض للمعلم'); 
               }} 
            />
            <TouchableOpacity onPress={() => { setPreviewItem(rejectItem); setRejectItem(null); }} style={{ marginTop: 16, alignItems: 'center' }}>
               <Text style={{ fontFamily: fonts.tajawalBold, color: colors.textMuted, textDecorationLine: 'underline' }}>إلغاء وتراجع</Text>
            </TouchableOpacity>
         </View>
      </Modal>
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
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.secondary,
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
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionBtn: {
    // This is used alongside viewBtn, any specific styles for general action buttons can go here
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
