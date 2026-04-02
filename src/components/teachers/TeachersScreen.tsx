import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Pressable, 
  Image, 
  TextInput, 
  Animated, 
  useWindowDimensions,
  ScrollView
} from 'react-native';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  ChevronRight,
  ChevronDown,
  Shield,
  X,
  Check,
  Settings,
  Mail,
  User,
  BookOpen
} from 'lucide-react-native';
import { colors, fonts, radius, shadows, spacing } from '../../theme';
import { Button } from '../ui/Button';
import { SearchBar } from '../ui/SearchBar';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';

type Teacher = {
  id: string;
  name: string;
  email: string;
  courses: number;
  sales: string;
  commission: string;
  avatar: string;
  specialty?: string;
  status: 'active' | 'suspended';
};

const mockTeachers: Teacher[] = [
  { id: '1', name: 'أ. أحمد محمد', email: 'ahmed@tamayyoz.com', courses: 5, sales: '45,200', commission: '25%', avatar: 'https://i.pravatar.cc/150?u=1', specialty: 'فيزياء', status: 'active' },
  { id: '2', name: 'أ. سارة علي', email: 'sara@tamayyoz.com', courses: 3, sales: '32,150', commission: '20%', avatar: 'https://i.pravatar.cc/150?u=2', specialty: 'كيمياء', status: 'active' },
  { id: '3', name: 'أ. محمد عمر', email: 'omar@tamayyoz.com', courses: 7, sales: '78,400', commission: '30%', avatar: 'https://i.pravatar.cc/150?u=3', specialty: 'رياضيات', status: 'active' },
  { id: '4', name: 'أ. فاطمة حسن', email: 'fatma@tamayyoz.com', courses: 2, sales: '15,000', commission: '25%', avatar: 'https://i.pravatar.cc/150?u=4', specialty: 'أحياء', status: 'active' },
  { id: '5', name: 'أ. خالد إبراهيم', email: 'khaled@tamayyoz.com', courses: 4, sales: '62,800', commission: '20%', avatar: 'https://i.pravatar.cc/150?u=5', specialty: 'جيولوجيا', status: 'active' },
];

export const TeachersScreen: React.FC = () => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [viewTeacher, setViewTeacher] = useState<Teacher | null>(null);
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
  const [banTeacher, setBanTeacher] = useState<Teacher | null>(null);
  const [filterVisible, setFilterVisible] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'courses' | 'finance'>('courses');
  const [newCommission, setNewCommission] = useState('');
  const [autoPublish, setAutoPublish] = useState(false);

  const openEditModal = (teacher: Teacher) => {
     setEditTeacher(teacher);
     setNewCommission(teacher.commission.replace('%', ''));
     setAutoPublish(false);
  };

  const showToast = (message: string) => {
    setToast(message);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: false }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: false }),
    ]).start(() => setToast(null));
  };

  const handleBlockTeacher = (id: string) => {
    setTeachers(prev => prev.map(t => t.id === id 
      ? { ...t, status: t.status === 'active' ? 'suspended' : 'active' } 
      : t
    ));
    setBanTeacher(null);
    showToast('تم تحديث حالة المعلم بنجاح');
  };

  const openProfileView = (teacher: Teacher) => {
    setViewTeacher(teacher);
  };

  let parsedSales = 0;
  let parsedComm = 0;
  if (viewTeacher) {
    parsedSales = parseFloat(viewTeacher.sales.replace(/,/g, '')) || 0;
    parsedComm = parseFloat(viewTeacher.commission.replace('%', '')) || 0;
  }
  const centerCut = parsedSales * (parsedComm / 100);
  const teacherCut = parsedSales - centerCut;

  return (
    <View style={styles.container}>
      {/* Header Area */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
           <View style={styles.iconBox}>
              <Users size={24} color={colors.secondary} />
           </View>
           <View style={styles.titleInfo}>
              <Text style={styles.title}>إدارة فريق العمل</Text>
              <Text style={styles.subtitle}>التحكم في بيانات المعلمين والعمولات</Text>
           </View>
           <Button 
              label="إضافة معلم جديد" 
              onPress={() => setCreateModalVisible(true)} 
              variant="primary" 
              icon={<Plus size={18} color={colors.secondary} />} 
           />
        </View>

        <View style={styles.toolbar}>
           <View style={styles.searchWrap}>
              <Search style={{position: 'absolute', right: 12, top: 12, zIndex: 1}} size={20} color={colors.textMuted} />
              <SearchBar value={search} onChangeText={setSearch} placeholder="ابحث عن معلم..." />
           </View>
           <Pressable style={styles.filterBtn} onPress={() => setFilterVisible(!filterVisible)}>
              <Filter size={20} color={colors.textSecondary} />
           </Pressable>
        </View>
      </View>

      {filterVisible && (
        <View style={styles.filterDropdown}>
           <Text style={styles.filterTitle}>البحث المتقدم</Text>
           <View style={styles.divider} />
           <Pressable style={styles.filterItem} onPress={() => setFilterVisible(false)}><Text style={styles.filterText}>حسب التخصص</Text></Pressable>
           <Pressable style={styles.filterItem} onPress={() => setFilterVisible(false)}><Text style={styles.filterText}>ترتيب حسب المبيعات</Text></Pressable>
        </View>
      )}

      {/* Table Container */}
      <View style={styles.tableCard}>
        <View style={styles.tableHeader}>
           <Text style={[styles.hCell, { flex: 2 }]}>المعلم</Text>
           <Text style={styles.hCell}>الكورسات</Text>
           <Text style={styles.hCell}>المبيعات</Text>
           <Text style={styles.hCell}>العمولة</Text>
           <Text style={styles.hCell}>الإجراءات</Text>
        </View>

        <FlatList
          data={teachers.filter(t => t.name.includes(search))}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={[styles.row, item.status === 'suspended' && { opacity: 0.6 }]}>
               <View style={[styles.cell, { flex: 2, flexDirection: 'row-reverse', alignItems: 'center' }]}>
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                  <View style={{ marginRight: 12, alignItems: 'flex-end' }}>
                     <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                        <Text style={styles.nameText}>{item.name}</Text>
                        {item.status === 'suspended' && (
                           <View style={[styles.statusDot, { backgroundColor: colors.error, marginRight: 6 }]} />
                        )}
                     </View>
                     <Text style={styles.emailText}>{item.email}</Text>
                  </View>
               </View>
               <View style={styles.cell}><Text style={styles.valText}>{item.courses}</Text></View>
               <View style={styles.cell}><Text style={styles.valText}>{item.sales} <Text style={{fontSize: 10, color: colors.textMuted}}>ج.م</Text></Text></View>
               <View style={styles.cell}><Text style={styles.valText}>{item.commission}</Text></View>
               <View style={[styles.cell, { flexDirection: 'row-reverse', justifyContent: 'center' }]}>
                  <Pressable onPress={() => openProfileView(item)} style={styles.iconButton}>
                    <Eye size={18} color={colors.textSecondary} />
                  </Pressable>
                  <Pressable onPress={() => openEditModal(item)} style={[styles.iconButton, { marginHorizontal: 8 }]}>
                    <Settings size={18} color={colors.textSecondary} />
                  </Pressable>
                  <Pressable onPress={() => setBanTeacher(item)} style={styles.iconButton}>
                    <Shield size={16} color={item.status === 'suspended' ? colors.textMuted : colors.error} />
                  </Pressable>
               </View>
            </View>
          )}
        />
      </View>

      {/* Institutional Teacher Invitation Modal */}
      <Modal visible={createModalVisible} onClose={() => setCreateModalVisible(false)} title="دعوة معلم للانضمام للمؤسسة">
         <ScrollView style={[styles.modalBody, { paddingHorizontal: 32, paddingVertical: 10 }]} showsVerticalScrollIndicator={false}>
            {/* Contextual Logic / Header */}
            <Text style={{ fontFamily: fonts.regular, fontSize: 13, color: colors.textSecondary, textAlign: 'center', marginBottom: 24, lineHeight: 22 }}>
               سيتم إرسال رابط تفعيل رسمي لبريد المعلم لإتمام إعداد حسابه الشخصي.
            </Text>

            {/* Smart Fields */}
            <Text style={[styles.label, { fontSize: 14, fontFamily: fonts.bold }]}>البريد الإلكتروني للمعلم</Text>
            <View style={[styles.inputBox, { borderWidth: 2, borderColor: colors.secondary, backgroundColor: '#FFF', height: 50, paddingHorizontal: 12 }]}>
               <Mail size={18} color={colors.secondary} />
               <TextInput style={[styles.input, { fontFamily: fonts.bold }]} placeholder="teacher@email.com" keyboardType="email-address" />
            </View>

            <Text style={[styles.label, { fontSize: 14, fontFamily: fonts.bold }]}>التخصص (القسم العلمي)</Text>
            <Pressable style={[styles.inputBox, { borderWidth: 2, borderColor: colors.secondary, backgroundColor: '#FFF', height: 50, paddingHorizontal: 12, justifyContent: 'space-between' }]}>
               <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
                  <BookOpen size={18} color={colors.secondary} style={{marginLeft: 8}} />
                  <Text style={[styles.input, { fontFamily: fonts.bold, color: colors.textMuted }]}>اختر القسم (مثال: اللغات)</Text>
               </View>
               <ChevronDown size={18} color={colors.secondary} />
            </Pressable>

            <Text style={[styles.label, { fontSize: 14, fontFamily: fonts.bold }]}>نسبة العمولة (%)</Text>
            <View style={[styles.inputBox, { borderWidth: 2, borderColor: colors.secondary, backgroundColor: '#FFF', height: 50, paddingHorizontal: 12, marginBottom: 8 }]}>
               <Settings size={18} color={colors.secondary} />
               <TextInput style={[styles.input, { fontFamily: fonts.bold }]} placeholder="25" keyboardType="numeric" />
            </View>
            <Text style={{ fontFamily: fonts.regular, fontSize: 11, color: colors.textMuted, textAlign: 'right', marginTop: -4, marginBottom: 20 }}>
               نسبة استقطاع المؤسسة من مبيعات المعلم.
            </Text>

            {/* Management Permissions */}
            <Text style={[styles.label, { fontSize: 14, fontFamily: fonts.bold }]}>صلاحيات النشر والرقابة</Text>
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F9F9F9', padding: 16, borderRadius: 12, borderWidth: 2, borderColor: colors.border, marginBottom: 32 }}>
               <Text style={{ fontFamily: fonts.bold, fontSize: 14, color: colors.secondary }}>تفعيل النشر التلقائي للمحتوى</Text>
               <Pressable 
                  onPress={() => setAutoPublish(!autoPublish)} 
                  style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: autoPublish ? colors.primary : '#E5E7EB', borderWidth: 2, borderColor: colors.secondary, justifyContent: 'center', paddingHorizontal: 2 }}
               >
                  <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: autoPublish ? colors.secondary : '#FFF', borderWidth: autoPublish ? 0 : 2, borderColor: colors.secondary, alignSelf: autoPublish ? 'flex-start' : 'flex-end' }} />
               </Pressable>
            </View>

            {/* Action Buttons */}
            <View style={{ flexDirection: 'row-reverse', gap: 16, paddingBottom: 20 }}>
               <Button 
                  label="إرسال دعوة الانضمام" 
                  variant="primary" 
                  style={{ flex: 2, height: 50, borderRadius: 24, borderWidth: 2, borderColor: colors.secondary, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4 }} 
                  onPress={() => { setCreateModalVisible(false); showToast('تم إرسال الدعوة بنجاح'); }} 
               />
               <Button 
                  label="إلغاء" 
                  variant="secondary" 
                  style={{ flex: 1, height: 50, borderRadius: 24, borderWidth: 2, borderColor: colors.secondary }} 
                  onPress={() => setCreateModalVisible(false)} 
               />
            </View>
         </ScrollView>
      </Modal>

      {/* Edit Modal */}
      <Modal visible={!!editTeacher} onClose={() => setEditTeacher(null)} title="">
         <View style={[styles.modalBody, { paddingBottom: 10 }]}>
            {/* Contextual Header */}
            <View style={{flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 24, paddingBottom: 16, borderBottomWidth: 2, borderBottomColor: colors.borderLight}}>
               <Image source={{uri: editTeacher?.avatar}} style={{width: 40, height: 40, borderRadius: 20, marginLeft: 12, borderWidth: 2, borderColor: colors.secondary}} />
               <Text style={{fontFamily: fonts.tajawalBold, fontSize: 18, color: colors.secondary}}>إعدادات {editTeacher?.name}</Text>
            </View>

            {/* Smart Commission Field */}
            <Text style={[styles.label, { fontSize: 14, marginBottom: 8 }]}>نسبة العمولة الجديدة</Text>
            <View style={[styles.inputBox, { height: 56, borderWidth: 2, borderColor: colors.secondary, borderRadius: 16, backgroundColor: '#FFF', paddingHorizontal: 16, marginBottom: 8 }]}>
               <Text style={{fontFamily: fonts.bold, fontSize: 18, color: colors.secondary, marginLeft: 8}}>%</Text>
               <TextInput 
                  style={[styles.input, { fontFamily: fonts.tajawalBold, fontSize: 24 }]} 
                  value={newCommission} 
                  onChangeText={setNewCommission}
                  keyboardType="numeric" 
               />
            </View>
            <Text style={{fontFamily: fonts.regular, fontSize: 12, color: colors.textSecondary, textAlign: 'right', marginBottom: 24}}>
               العمولة الحالية: <Text style={{fontFamily: fonts.tajawalBold}}>{editTeacher?.commission}</Text> ⬅️ العمولة الجديدة: <Text style={{fontFamily: fonts.tajawalBold}}>{newCommission || 0}%</Text>
            </Text>

            {/* Permissions Toggle */}
            <Text style={[styles.label, { fontSize: 14, marginBottom: 8 }]}>صلاحيات المعلم</Text>
            <View style={{flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F9F9F9', padding: 16, borderRadius: 16, borderWidth: 2, borderColor: '#EEE', marginBottom: 24}}>
               <Text style={{fontFamily: fonts.bold, fontSize: 14, color: colors.secondary}}>تجاوز مراجعة المحتوى (نشر تلقائي)</Text>
               <Pressable 
                  onPress={() => setAutoPublish(!autoPublish)} 
                  style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: autoPublish ? colors.primary : '#E5E7EB', borderWidth: 2, borderColor: colors.secondary, justifyContent: 'center', paddingHorizontal: 2 }}
               >
                  <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: autoPublish ? colors.secondary : '#FFF', borderWidth: autoPublish ? 0 : 2, borderColor: colors.secondary, alignSelf: autoPublish ? 'flex-start' : 'flex-end' }} />
               </Pressable>
            </View>

            {/* Impact Preview */}
            <View style={{backgroundColor: '#F3F4F6', padding: 16, borderRadius: 16, marginBottom: 24}}>
               <Text style={{fontFamily: fonts.regular, fontSize: 12, color: colors.textSecondary, textAlign: 'center', lineHeight: 20}}>
                  💡 توضيح: لكل 1,000 ج.م مبيعات، سيكون صافي ربح السنتر {(1000 * (parseFloat(newCommission || '0') / 100)).toLocaleString('en-US')} ج.م
               </Text>
            </View>

            {/* Action Buttons */}
            <View style={{ flexDirection: 'row-reverse', gap: 16, marginTop: 8 }}>
               <Button 
                  label="حفظ التعديلات" 
                  variant="primary" 
                  style={{ flex: 2, height: 50, borderRadius: 24, borderWidth: 2, borderColor: colors.secondary, shadowColor: '#000', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4 }} 
                  onPress={() => { setEditTeacher(null); showToast('تم الحفظ وتحديث الصلاحيات'); }} 
               />
               <Button 
                  label="إلغاء" 
                  variant="secondary" 
                  style={{ flex: 1, height: 50, borderRadius: 24, borderWidth: 2, borderColor: colors.secondary }} 
                  onPress={() => setEditTeacher(null)} 
               />
            </View>
         </View>
      </Modal>

      {/* Ban Confirmation */}
      <Modal visible={!!banTeacher} onClose={() => setBanTeacher(null)} title={banTeacher?.status === 'suspended' ? 'إلغاء الإيقاف' : 'تأكيد الإيقاف'}>
         <View style={styles.modalBody}>
            <Text style={styles.warningText}>
               {banTeacher?.status === 'suspended' 
                  ? 'هل أنت متأكد من إعادة تفعيل حساب المدرس؟'
                  : 'هل أنت متأكد من إيقاف حساب المدرس؟ هذا سيمنعه من الوصول للوحة التحكم.'}
            </Text>
            <View style={{ flexDirection: 'row-reverse', marginTop: 20 }}>
               <Button 
                  label={banTeacher?.status === 'suspended' ? "تفعيل الحساب" : "نعم، إيقاف"} 
                  variant={banTeacher?.status === 'suspended' ? "primary" : "destructive"} 
                  style={{ flex: 1, marginLeft: 10 }} 
                  onPress={() => handleBlockTeacher(banTeacher!.id)} 
               />
               <Button label="تراجع" variant="secondary" style={{ flex: 1 }} onPress={() => setBanTeacher(null)} />
            </View>
         </View>
      </Modal>

      {/* Teacher Profile Modal */}
      <Modal visible={!!viewTeacher} onClose={() => setViewTeacher(null)} title="ملف المدرس">
         {viewTeacher && (
            <View style={styles.profileModalBody}>
               <View style={styles.sideUser}>
                  <Image source={{ uri: viewTeacher.avatar }} style={styles.sideAvatar} />
                  <Text style={styles.sideName}>{viewTeacher.name}</Text>
                  <Text style={styles.sideEmail}>{viewTeacher.email}</Text>
                  <View style={{marginTop: 8}}>
                     <Badge label={viewTeacher.status === 'active' ? 'حساب نشط' : 'حساب موقف'} variant={viewTeacher.status === 'active' ? 'success' : 'error'} />
                  </View>
               </View>

               <View style={[styles.sideTabs, { marginHorizontal: 0 }]}>
                  <Pressable onPress={() => setActiveTab('courses')} style={[styles.sideTab, activeTab === 'courses' && styles.sideTabActive]}>
                     <Text style={[styles.sideTabText, { color: activeTab === 'courses' ? colors.secondary : colors.textMuted }]}>النشاط والكورسات</Text>
                  </Pressable>
                  <Pressable onPress={() => setActiveTab('finance')} style={[styles.sideTab, activeTab === 'finance' && styles.sideTabActive]}>
                     <Text style={[styles.sideTabText, { color: activeTab === 'finance' ? colors.secondary : colors.textMuted }]}>العمولات والأرباح</Text>
                  </Pressable>
               </View>

               <View style={styles.tabContent}>
                  {activeTab === 'courses' ? (
                     <View style={styles.statsCard}>
                        <View style={styles.statItem}>
                           <Text style={styles.statLabel}>إجمالي الكورسات</Text>
                           <Text style={styles.statVal}>{viewTeacher.courses}</Text>
                        </View>
                        <View style={{ width: 2, backgroundColor: colors.secondary, marginVertical: 8 }} />
                        <View style={styles.statItem}>
                           <Text style={styles.statLabel}>التخصص</Text>
                           <Text style={styles.statVal}>{viewTeacher.specialty}</Text>
                        </View>
                     </View>
                  ) : (
                     <View>
                        <View style={styles.statsCard}>
                           <View style={styles.statItem}>
                              <Text style={styles.statLabel}>إجمالي المبيعات</Text>
                              <Text style={styles.statVal}>{viewTeacher.sales} ج.م</Text>
                           </View>
                           <View style={{ width: 2, backgroundColor: colors.secondary, marginVertical: 8 }} />
                           <View style={styles.statItem}>
                              <Text style={styles.statLabel}>العمولة الراهنة</Text>
                              <Text style={styles.statVal}>{viewTeacher.commission}</Text>
                           </View>
                        </View>
                        <View style={styles.financeCardsRow}>
                           <View style={[styles.financeMiniCard, { backgroundColor: colors.primaryLight, shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4 }]}>
                              <Text style={styles.statLabel}>صافي ربح المؤسسة</Text>
                              <Text style={styles.financeVal}>{centerCut.toLocaleString('en-US')} <Text style={{fontSize: 10}}>ج.م</Text></Text>
                           </View>
                           <View style={styles.financeMiniCard}>
                              <Text style={styles.statLabel}>مستحقات المعلم</Text>
                              <Text style={styles.financeVal}>{teacherCut.toLocaleString('en-US')} <Text style={{fontSize: 10}}>ج.م</Text></Text>
                           </View>
                        </View>
                     </View>
                  )}
               </View>

               <Button label="إغلاق" variant="secondary" onPress={() => setViewTeacher(null)} style={{marginTop: 24, borderWidth: 2, borderColor: colors.secondary, borderRadius: 24}} />
            </View>
         )}
      </Modal>

      {/* Toast Notification */}
      {toast && (
        <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
           <Check size={18} color={colors.success} />
           <Text style={styles.toastText}>{toast}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { marginBottom: 20 },
  titleRow: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 20 },
  iconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.secondary },
  titleInfo: { flex: 1, marginRight: 12 },
  title: { fontFamily: fonts.tajawalBold, fontSize: 22, color: colors.secondary, textAlign: 'right' },
  subtitle: { fontFamily: fonts.regular, fontSize: 13, color: colors.textMuted, textAlign: 'right' },
  toolbar: { flexDirection: 'row-reverse', alignItems: 'center' },
  searchWrap: { flex: 1 },
  filterBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFF', borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  filterDropdown: { position: 'absolute', top: 155, right: 20, width: 200, backgroundColor: '#FFF', borderRadius: 16, borderWidth: 2, borderColor: colors.secondary, padding: 12, zIndex: 100, ...shadows.md },
  filterTitle: { fontFamily: fonts.bold, fontSize: 13, textAlign: 'right', marginBottom: 8 },
  divider: { height: 1, backgroundColor: colors.border, marginBottom: 8 },
  filterItem: { paddingVertical: 8 },
  filterText: { fontFamily: fonts.regular, fontSize: 13, textAlign: 'right' },
  tableCard: { flex: 1, backgroundColor: '#FFF', borderRadius: 24, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  tableHeader: { flexDirection: 'row-reverse', padding: 16, backgroundColor: '#FAFAFA', borderBottomWidth: 1, borderBottomColor: colors.border },
  hCell: { flex: 1, fontFamily: fonts.bold, fontSize: 12, color: colors.textSecondary, textAlign: 'right' },
  row: { flexDirection: 'row-reverse', padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border, alignItems: 'center' },
  cell: { flex: 1, alignItems: 'flex-end' },
  avatar: { width: 40, height: 40, borderRadius: 10 },
  nameText: { fontFamily: fonts.bold, fontSize: 14, color: colors.secondary },
  emailText: { fontFamily: fonts.regular, fontSize: 11, color: colors.textMuted, marginTop: 4 },
  valText: { fontFamily: fonts.tajawalBold, fontSize: 15 },
  iconButton: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
  modalBody: { paddingVertical: 10 },
  label: { fontFamily: fonts.bold, fontSize: 13, marginBottom: 6, textAlign: 'right' },
  inputBox: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#F9F9F9', borderRadius: 10, paddingHorizontal: 12, height: 44, borderWidth: 1, borderColor: '#DDD', marginBottom: 16 },
  input: { flex: 1, textAlign: 'right', fontFamily: fonts.regular, fontSize: 14 },
  warningText: { fontFamily: fonts.regular, fontSize: 14, textAlign: 'center', color: colors.textSecondary },
  profileSide: { position: 'absolute', top: 0, bottom: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', flexDirection: 'row-reverse', zIndex: 1000 },
  sideContent: { height: '100%', backgroundColor: '#FFF', borderLeftWidth: 2, borderColor: colors.secondary },
  sideHeader: { flexDirection: 'row-reverse', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#EEE', marginTop: 40, justifyContent: 'space-between' },
  sideTitle: { fontFamily: fonts.bold, fontSize: 16 },
  sideUser: { alignItems: 'center', paddingVertical: 20 },
  sideAvatar: { width: 70, height: 70, borderRadius: 15, marginBottom: 12 },
  sideName: { fontFamily: fonts.tajawalBold, fontSize: 18 },
  sideEmail: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted },
  sideTabs: { flexDirection: 'row-reverse', backgroundColor: '#F3F4F6', borderRadius: 12, padding: 4, marginBottom: 20, marginHorizontal: 15 },
  sideTab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  sideTabActive: { backgroundColor: '#FFF', borderWidth: 0, borderBottomWidth: 4, borderBottomColor: colors.primary },
  sideTabText: { fontFamily: fonts.bold, fontSize: 12 },
  financeCardsRow: { flexDirection: 'row-reverse', gap: 16, marginTop: 16 },
  financeMiniCard: { flex: 1, backgroundColor: '#FFF', borderWidth: 2, borderColor: colors.secondary, borderBottomWidth: 4, borderBottomColor: colors.secondary, borderRadius: 16, padding: 16, alignItems: 'center', justifyContent: 'center' },
  financeVal: { fontFamily: fonts.tajawalBold, fontSize: 22, color: colors.secondary, marginTop: 4, textAlign: 'center' },
  toast: { position: 'absolute', bottom: 30, left: 30, backgroundColor: '#F0FDF4', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#10B981', flexDirection: 'row-reverse', alignItems: 'center', zIndex: 2000, ...shadows.md },
  toastText: { color: '#166534', fontFamily: fonts.bold, fontSize: 13, marginRight: 10 },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginLeft: 6 },
  profileModalBody: { paddingBottom: 20, paddingHorizontal: 16 },
  tabContent: { marginTop: 12 },
  statsCard: { flexDirection: 'row-reverse', backgroundColor: '#FFF', borderRadius: 16, padding: 16, borderWidth: 2, borderColor: colors.secondary, borderBottomWidth: 4, borderBottomColor: colors.secondary },
  statItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  statLabel: { fontFamily: fonts.regular, fontSize: 10, color: colors.textMuted, marginBottom: 8, textAlign: 'center' },
  statVal: { fontFamily: fonts.tajawalBold, fontSize: 20, color: colors.secondary, textAlign: 'center' },
});
