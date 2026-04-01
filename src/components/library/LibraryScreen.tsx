import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Library, BookOpen, Video, FileText, Search, Plus, Filter, MoreVertical } from 'lucide-react-native';
import { colors, fonts, radius, shadows, spacing } from '../../theme';
import { SearchBar } from '../ui/SearchBar';
import { Button } from '../ui/Button';

const mockBooks = [
  { id: '1', title: 'كتاب الفيزياء المتطور', category: 'العلوم الطبيعية', type: 'PDF', teacher: 'أ. محمد عمر', sales: 120, price: '45 ر.س', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=200' },
  { id: '2', title: 'أساسيات التحليل الكيميائي', category: 'الكيمياء', type: 'Video', teacher: 'أ. سارة أحمد', sales: 85, price: '70 ر.س', image: 'https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&q=80&w=200' },
  { id: '3', title: 'تاريخ الحضارات القديمة', category: 'التاريخ', type: 'PDF', teacher: 'أ. خالد يوسف', sales: 210, price: '30 ر.س', image: 'https://images.unsplash.com/photo-1509249323924-423586aa75e0?auto=format&fit=crop&q=80&w=200' },
];

export const LibraryScreen: React.FC = () => {
  const [search, setSearch] = useState('');

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
           <Button label="إضافة محتوى" onPress={() => {}} variant="primary" icon={<Plus size={18} color={colors.secondary} />} />
        </View>

        <View style={styles.toolbar}>
           <View style={styles.searchWrap}>
              <SearchBar value={search} onChangeText={setSearch} placeholder="ابحث عن كتاب، ملف، أو درس فيديو..." />
           </View>
           <TouchableOpacity style={styles.filterBtn}>
              <Filter size={20} color={colors.textSecondary} />
           </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={mockBooks}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.rowGap}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.bookCard}>
            <Image source={{ uri: item.image }} style={styles.bookThumb} />
            <View style={styles.bookBadge}>
               {item.type === 'Video' ? <Video size={10} color="#fff" /> : <FileText size={10} color="#fff" />}
               <Text style={styles.badgeText}>{item.type}</Text>
            </View>
            
            <View style={styles.cardContent}>
               <Text style={styles.categoryText}>{item.category}</Text>
               <Text style={styles.bookTitle} numberOfLines={1}>{item.title}</Text>
               <Text style={styles.teacherName}>{item.teacher}</Text>
               
               <View style={styles.cardFooter}>
                  <Text style={styles.priceText}>{item.price}</Text>
                  <View style={styles.salesTag}>
                     <Text style={styles.salesText}>{item.sales} مبيعات</Text>
                  </View>
               </View>
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
    gap: 16,
  },
  rowGap: {
    gap: 16,
  },
  bookCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  bookThumb: {
    width: '100%',
    height: 140,
    backgroundColor: colors.background,
  },
  bookBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontFamily: fonts.bold,
  },
  cardContent: {
    padding: 12,
    gap: 4,
  },
  categoryText: {
    fontFamily: fonts.semiBold,
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'right',
  },
  bookTitle: {
    fontFamily: fonts.tajawalBold,
    fontSize: 15,
    color: colors.textPrimary,
    textAlign: 'right',
  },
  teacherName: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  cardFooter: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  priceText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.secondary,
  },
  salesTag: {
    backgroundColor: colors.background,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  salesText: {
    fontFamily: fonts.semiBold,
    fontSize: 10,
    color: colors.textMuted,
  },
});
