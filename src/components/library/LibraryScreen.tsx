import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Pressable, useWindowDimensions, ScrollView, TextInput } from 'react-native';
import { Library, BookOpen, Video, FileText, Search, Plus, Filter, MoreVertical, Edit3, Eye, Trash2, BarChart2 } from 'lucide-react-native';
import { colors, fonts, radius, shadows, spacing } from '../../theme';
import { SearchBar } from '../ui/SearchBar';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

const mockBooks = [
  { id: '1', title: 'كتاب الفيزياء المتطور', category: 'العلوم الطبيعية', type: 'PDF', teacher: 'أ. محمد عمر', sales: 120, price: '45 ج.م', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=200' },
  { id: '2', title: 'أساسيات التحليل الكيميائي', category: 'الكيمياء', type: 'Video', teacher: 'أ. سارة أحمد', sales: 85, price: '70 ج.م', image: 'https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&q=80&w=200' },
  { id: '3', title: 'تاريخ الحضارات القديمة', category: 'التاريخ', type: 'PDF', teacher: 'أ. خالد يوسف', sales: 210, price: '30 ج.م', image: 'https://images.unsplash.com/photo-1509249323924-423586aa75e0?auto=format&fit=crop&q=80&w=200' },
  { id: '4', title: 'تفاضل وتكامل 101', category: 'الرياضيات', type: 'Video', teacher: 'أ. إبراهيم علي', sales: 156, price: '85 ج.م', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=200' },
];

const FILTERS = ['الكل', 'الكتب 📚', 'الفيديوهات 🎥', 'الملخصات 📄', 'الاختبارات 📝'];

export const LibraryScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [editItem, setEditItem] = useState<any>(null);
  const [previewItem, setPreviewItem] = useState<any>(null);
  const [archiveItem, setArchiveItem] = useState<any>(null);
  const { width } = useWindowDimensions();
  const numCols = width > 1200 ? 4 : width > 800 ? 3 : width > 600 ? 2 : 1;

  const filteredBooks = mockBooks.filter(book => {
    if (activeFilter === 'الكتب 📚' && book.type !== 'PDF') return false;
    if (activeFilter === 'الفيديوهات 🎥' && book.type !== 'Video') return false;
    if (activeFilter === 'الاختبارات 📝') return false; // no mock data, will trigger empty state
    if (activeFilter === 'الملخصات 📄') return false; // no mock data
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
           <View style={styles.iconBox}>
              <Library size={24} color={colors.secondary} />
           </View>
           <View style={styles.titleInfo}>
              <Text style={styles.title}>المكتبة المركزية</Text>
              <Text style={styles.subtitle}>إدارة الكتب والدروس والمحتوى التعليمي</Text>
           </View>
        </View>

        <View style={styles.toolbar}>
           <View style={styles.searchWrap}>
              <SearchBar value={search} onChangeText={setSearch} placeholder="ابحث عن كتاب، ملف، أو درس فيديو..." />
           </View>
           <TouchableOpacity style={styles.filterBtn}>
              <Filter size={20} color={colors.textSecondary} />
           </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingVertical: 8, flexDirection: 'row-reverse' }}>
          {FILTERS.map(f => (
            <TouchableOpacity key={f} onPress={() => setActiveFilter(f)} style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}>
              <Text style={[styles.filterChipText, activeFilter === f && styles.filterChipTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {filteredBooks.length > 0 ? (
        <FlatList
          key={numCols}
          data={filteredBooks}
          numColumns={numCols}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={numCols > 1 ? styles.rowGap : undefined}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable style={styles.bookCardWrapper}>
              {({ hovered }: any) => (
                <View style={styles.bookCard}>
                  <View style={{ overflow: 'hidden', borderTopRightRadius: 22, borderTopLeftRadius: 22 }}>
                     <Image source={{ uri: item.image }} style={styles.bookThumb} />
                     <View style={styles.bookBadge}>
                        {item.type === 'Video' ? <Video size={12} color="#fff" /> : <FileText size={12} color="#fff" />}
                        <Text style={styles.badgeText}>{item.type}</Text>
                     </View>
                     
                     {/* Hover Action Overlay */}
                     {hovered && (
                       <View style={styles.overlay}>
                          <TouchableOpacity onPress={() => setEditItem(item)} style={[styles.actionIcon, { backgroundColor: '#FFFF00' }]}><Edit3 size={20} color={colors.secondary} /></TouchableOpacity>
                          <TouchableOpacity onPress={() => setPreviewItem(item)} style={[styles.actionIcon, { backgroundColor: '#FFF' }]}><Eye size={20} color={colors.secondary} /></TouchableOpacity>
                          <TouchableOpacity onPress={() => setArchiveItem(item)} style={[styles.actionIcon, { backgroundColor: '#FFF' }]}><Trash2 size={20} color={colors.error} /></TouchableOpacity>
                       </View>
                     )}
                  </View>
                  
                  <View style={styles.cardContent}>
                     <Text style={styles.categoryText}>{item.category}</Text>
                     <Text style={styles.bookTitle} numberOfLines={1}>{item.title}</Text>
                     <Text style={styles.teacherName}>{item.teacher}</Text>
                     
                     <View style={styles.cardFooter}>
                        <View style={styles.priceTag}>
                           <Text style={styles.priceText}>{item.price}</Text>
                        </View>
                        <View style={styles.salesTag}>
                           <BarChart2 size={12} color={colors.secondary} strokeWidth={3} />
                           <Text style={styles.salesText}>{item.sales} مبيعات</Text>
                        </View>
                     </View>
                  </View>
                </View>
              )}
            </Pressable>
          )}
        />
      ) : (
        <View style={styles.emptyState}>
           <FileText size={80} color={colors.borderLight} />
           <Text style={styles.emptyTitle}>لا يوجد محتوى في هذا القسم حالياً،</Text>
           <Text style={styles.emptySubtitle}>ابدأ بإضافة أول ملف!</Text>
        </View>
      )}

      {/* Edit Modal */}
      <Modal visible={!!editItem} onClose={() => setEditItem(null)} title="تعديل إعدادات المحتوى">
         <View style={{ padding: 24, gap: 20 }}>
            <View>
              <Text style={{ fontFamily: fonts.tajawalBold, fontSize: 14, color: colors.secondary, marginBottom: 8 }}>سعر البيع</Text>
              <View style={{ flexDirection: 'row-reverse', alignItems: 'center', borderWidth: 2, borderColor: colors.secondary, borderRadius: 12, backgroundColor: '#FFF', height: 50, paddingHorizontal: 12 }}>
                 <TextInput style={{ flex: 1, fontFamily: fonts.tajawalBold, fontSize: 16, textAlign: 'right' }} defaultValue={editItem?.price?.replace(/[^0-9]/g, '') || "0"} keyboardType="numeric" />
                 <Text style={{ fontFamily: fonts.tajawalBold, color: colors.textMuted, marginLeft: 8 }}>ج.م</Text>
              </View>
            </View>

            <View>
              <Text style={{ fontFamily: fonts.tajawalBold, fontSize: 14, color: colors.secondary, marginBottom: 8 }}>القسم</Text>
              <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', borderWidth: 2, borderColor: colors.secondary, borderRadius: 12, backgroundColor: '#FFF', height: 50, paddingHorizontal: 16 }}>
                 <Text style={{ fontFamily: fonts.tajawalBold, fontSize: 14, color: colors.secondary }}>{editItem?.category || 'عام'}</Text>
                 <Text style={{ fontFamily: fonts.bold, fontSize: 12, color: colors.textMuted }}>▼</Text>
              </View>
            </View>

            <View>
               <Text style={{ fontFamily: fonts.tajawalBold, fontSize: 14, color: colors.secondary, marginBottom: 8 }}>حالة النشر</Text>
               <View style={{ flexDirection: 'row-reverse', gap: 8 }}>
                  <TouchableOpacity style={{ flex: 1, height: 40, backgroundColor: '#FFFF00', borderWidth: 2, borderColor: colors.secondary, borderRadius: 8, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 2 }}><Text style={{ fontFamily: fonts.tajawalBold, fontSize: 13, color: colors.secondary }}>منشور</Text></TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, height: 40, backgroundColor: '#FFF', borderWidth: 2, borderColor: colors.borderLight, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontFamily: fonts.tajawalBold, fontSize: 13, color: colors.textMuted }}>مخفي</Text></TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, height: 40, backgroundColor: '#FFF', borderWidth: 2, borderColor: colors.borderLight, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontFamily: fonts.tajawalBold, fontSize: 11, color: colors.textMuted }}>مجاني لفترة</Text></TouchableOpacity>
               </View>
            </View>

            <View>
              <Text style={{ fontFamily: fonts.tajawalBold, fontSize: 14, color: colors.secondary, marginBottom: 8 }}>الكمية المتاحة للبيع (للكتب المطبوعة)</Text>
              <View style={{ flexDirection: 'row-reverse', alignItems: 'center', borderWidth: 2, borderColor: colors.secondary, borderRadius: 12, backgroundColor: '#FFF', height: 50, paddingHorizontal: 12 }}>
                 <TextInput style={{ flex: 1, fontFamily: fonts.tajawalBold, fontSize: 16, textAlign: 'right' }} defaultValue="مفتوح" keyboardType="numeric" />
              </View>
            </View>

            <Button label="حفظ التغييرات" variant="primary" style={{ backgroundColor: '#FFFF00', borderWidth: 2, borderColor: colors.secondary, borderRadius: 24, height: 50, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4, marginTop: 10 }} onPress={() => setEditItem(null)} />
         </View>
      </Modal>

      {/* Preview Modal */}
      <Modal visible={!!previewItem} onClose={() => setPreviewItem(null)} title="معاينة وإحصائيات">
         <View style={{ flexDirection: 'row-reverse', padding: 24, gap: 24, minHeight: 400 }}>
            {/* 70% Preview */}
            <View style={{ flex: 7, backgroundColor: '#E5E7EB', borderRadius: 16, borderWidth: 2, borderColor: colors.secondary, justifyContent: 'center', alignItems: 'center' }}>
               {previewItem?.type === 'Video' ? <Video size={48} color={colors.textMuted} style={{ marginBottom: 16 }} /> : <FileText size={48} color={colors.textMuted} style={{ marginBottom: 16 }} />}
               <Text style={{ fontFamily: fonts.tajawalBold, fontSize: 18, color: colors.secondary }}>{previewItem?.type === 'Video' ? 'مشغّل الفيديو' : 'قارئ الـ PDF'}</Text>
            </View>

            {/* 30% Stats */}
            <View style={{ flex: 3, gap: 16 }}>
               <View style={{ backgroundColor: '#F3F4F6', padding: 16, borderRadius: 12, borderWidth: 2, borderColor: colors.secondary }}>
                  <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted }}>إجمالي المشاهدات/التحميلات</Text>
                  <Text style={{ fontFamily: fonts.tajawalBold, fontSize: 24, color: colors.secondary }}>{previewItem?.sales ? previewItem.sales * 10 : '0'}</Text>
               </View>
               <View style={{ backgroundColor: '#F3F4F6', padding: 16, borderRadius: 12, borderWidth: 2, borderColor: colors.secondary }}>
                  <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted }}>تقييم الطلاب</Text>
                  <Text style={{ fontFamily: fonts.tajawalBold, fontSize: 24, color: colors.secondary }}>4.8 ⭐</Text>
               </View>
               <View style={{ backgroundColor: '#F3F4F6', padding: 16, borderRadius: 12, borderWidth: 2, borderColor: colors.secondary }}>
                  <Text style={{ fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted }}>تاريخ آخر تحديث</Text>
                  <Text style={{ fontFamily: fonts.tajawalBold, fontSize: 15, color: colors.secondary }}>15 سبتمبر 2026</Text>
               </View>

               <Button label="إغلاق المعاينة" variant="secondary" style={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: colors.secondary, borderRadius: 24, marginTop: 'auto' }} onPress={() => setPreviewItem(null)} />
            </View>
         </View>
      </Modal>

      {/* Archive Modal */}
      <Modal visible={!!archiveItem} onClose={() => setArchiveItem(null)} title="هل أنت متأكد من أرشفة هذا المحتوى؟">
         <View style={{ padding: 24, alignItems: 'center' }}>
            <Trash2 size={48} color={colors.error} style={{ marginBottom: 16 }} />
            <Text style={{ fontFamily: fonts.regular, fontSize: 15, color: colors.textSecondary, textAlign: 'center', lineHeight: 24, paddingHorizontal: 20 }}>
               سيختفي المحتوى من متجر الطلاب، لكنه سيظل متاحاً لك في قسم (الأرشيف) مع كامل بيانات مبيعاته.
            </Text>
            <View style={{ flexDirection: 'row-reverse', gap: 16, marginTop: 32, width: '100%' }}>
               <Button label="نعم، أرشفة المحتوى" variant="primary" style={{ flex: 2, backgroundColor: '#FF4D4D', borderWidth: 2, borderColor: colors.secondary, borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4 }} onPress={() => setArchiveItem(null)} />
               <Button label="تراجع" variant="secondary" style={{ flex: 1, backgroundColor: '#FFF', borderWidth: 2, borderColor: colors.secondary, borderRadius: 24 }} onPress={() => setArchiveItem(null)} />
            </View>
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
  rowGap: {
    gap: 16,
  },
  bookCardWrapper: {
    flex: 1,
    minWidth: 250,
    maxWidth: '100%',
  },
  bookCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  bookThumb: {
    width: '100%',
    height: 200,
    backgroundColor: colors.background,
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
  },
  bookBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.secondary,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    gap: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: fonts.tajawalBold,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    gap: 16,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 16,
    gap: 6,
  },
  categoryText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'right',
  },
  bookTitle: {
    fontFamily: fonts.tajawalBold,
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'right',
  },
  teacherName: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'right',
  },
  cardFooter: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: colors.borderLight,
  },
  priceTag: {
    backgroundColor: '#FFFF00',
    borderWidth: 2,
    borderColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  priceText: {
    fontFamily: fonts.tajawalBold,
    fontSize: 14,
    color: colors.secondary,
  },
  salesTag: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  salesText: {
    fontFamily: fonts.tajawalBold,
    fontSize: 12,
    color: colors.secondary,
  },
  filterChip: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
  },
  filterChipActive: {
    backgroundColor: '#FFFF00',
    borderWidth: 2,
  },
  filterChipText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.textMuted,
  },
  filterChipTextActive: {
    color: colors.secondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontFamily: fonts.tajawalBold,
    fontSize: 18,
    color: colors.textSecondary,
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textMuted,
    marginTop: 8,
    textAlign: 'center',
  },
});
