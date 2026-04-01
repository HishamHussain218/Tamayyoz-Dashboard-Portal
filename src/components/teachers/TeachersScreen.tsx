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
  Shield,
  X,
  Check
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
  
  // FIXED: Corrected state initialization for Animated values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const profileSlideAnim = useState(new Animated.Value(SCREEN_WIDTH))[0];
  
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [viewTeacher, setViewTeacher] = useState<Teacher | null>(null);
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
  const [banTeacher, setBanTeacher] = useState<Teacher | null>(null);
  const [filterVisible, setFilterVisible] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'courses' | 'finance'>('courses');

  const showToast = (message: string) => {
    setToast(message);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: false }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: false }),
    ]).start(() => setToast(null));
  };

  const openProfileView = (teacher: Teacher) => {
    setViewTeacher(teacher);
    Animated.timing(profileSlideAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start();
  };

  const closeProfileView = () => {
    Animated.timing(profileSlideAnim, { toValue: SCREEN_WIDTH, duration: 250, useNativeDriver: false }).start(() => setViewTeacher(null));
  };

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
           <Button label="دعوة مدرس جديد" onPress={() => setInviteModalVisible(true)} variant="primary" icon={<Plus size={18} color={colors.secondary} />} />
        </View>

        <View style={styles.toolbar}>
           <View style={styles.searchWrap}>
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
           <Text style={styles.hCell}>الإجراءات</Text>
        </View>

        <FlatList
          data={mockTeachers.filter(t => t.name.includes(search))}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
               <View style={[styles.cell, { flex: 2, flexDirection: 'row-reverse', alignItems: 'center' }]}>
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                  <View style={{ marginRight: 12, alignItems: 'flex-end' }}>
                     <Text style={styles.nameText}>{item.name}</Text>
                     <Text style={styles.emailText}>{item.email}</Text>
                  </View>
               </View>
               <View style={styles.cell}><Text style={styles.valText}>{item.courses}</Text></View>
               <View style={styles.cell}><Text style={styles.valText}>{item.sales}</Text></View>
               <View style={[styles.cell, { flexDirection: 'row-reverse', justifyContent: 'center' }]}>
                  <Pressable onPress={() => openProfileView(item)} style={styles.iconButton}><Eye size={18} color={colors.textSecondary} /></Pressable>
                  <Pressable onPress={() => setEditTeacher(item)} style={[styles.iconButton, { marginHorizontal: 8 }]}><View style={styles.dot} /></Pressable>
                  <Pressable onPress={() => setBanTeacher(item)} style={styles.iconButton}><Shield size={16} color={colors.error} /></Pressable>
               </View>
            </View>
          )}
        />
      </View>

      {/* Invite Modal */}
      <Modal visible={inviteModalVisible} onClose={() => setInviteModalVisible(false)} title="دعوة معلم">
         <View style={styles.modalBody}>
            <Text style={styles.label}>البريد الإلكتروني</Text>
            <View style={styles.inputBox}><TextInput style={styles.input} placeholder="teacher@email.com" /></View>
            <Button label="إرسال الدعوة" variant="primary" style={{ marginTop: 10 }} onPress={() => { setInviteModalVisible(false); showToast('تم الإرسال'); }} />
         </View>
      </Modal>

      {/* Edit Modal */}
      <Modal visible={!!editTeacher} onClose={() => setEditTeacher(null)} title="تعديل العمولة">
         <View style={styles.modalBody}>
            <Text style={styles.label}>نسبة العمولة (%)</Text>
            <View style={styles.inputBox}><TextInput style={styles.input} defaultValue="25" keyboardType="numeric" /></View>
            <Button label="حفظ التعديلات" variant="primary" style={{ marginTop: 10 }} onPress={() => { setEditTeacher(null); showToast('تم الحفظ'); }} />
         </View>
      </Modal>

      {/* Ban Confirmation */}
      <Modal visible={!!banTeacher} onClose={() => setBanTeacher(null)} title="تأكيد الإيقاف">
         <View style={styles.modalBody}>
            <Text style={styles.warningText}>هل أنت متأكد من إيقاف حساب المدرس؟</Text>
            <View style={{ flexDirection: 'row-reverse', marginTop: 20 }}>
               <Button label="نعم" variant="destructive" style={{ flex: 1, marginLeft: 10 }} onPress={() => { setBanTeacher(null); showToast('تم الإيقاف'); }} />
               <Button label="تراجع" variant="secondary" style={{ flex: 1 }} onPress={() => setBanTeacher(null)} />
            </View>
         </View>
      </Modal>

      {/* Profile Slide-over */}
      {viewTeacher && (
        <Animated.View style={[styles.profileSide, { transform: [{ translateX: profileSlideAnim }] }]}>
          <View style={[styles.sideContent, { width: Math.min(480, SCREEN_WIDTH * 0.75) }]}>
             <View style={styles.sideHeader}>
                <Pressable onPress={closeProfileView}><ChevronRight size={24} color={colors.secondary} /></Pressable>
                <Text style={styles.sideTitle}>ملف المدرس</Text>
                <Check size={20} color={colors.success} />
             </View>
             <ScrollView contentContainerStyle={{ padding: 20 }}>
                <View style={styles.sideUser}>
                   <Image source={{ uri: viewTeacher.avatar }} style={styles.sideAvatar} />
                   <Text style={styles.sideName}>{viewTeacher.name}</Text>
                   <Text style={styles.sideEmail}>{viewTeacher.email}</Text>
                </View>
                <View style={styles.sideTabs}>
                   <Pressable onPress={() => setActiveTab('courses')} style={[styles.sideTab, activeTab === 'courses' && styles.sideTabActive]}><Text style={styles.sideTabText}>النشاط</Text></Pressable>
                   <Pressable onPress={() => setActiveTab('finance')} style={[styles.sideTab, activeTab === 'finance' && styles.sideTabActive]}><Text style={styles.sideTabText}>المالية</Text></Pressable>
                </View>
                {activeTab === 'courses' ? <Badge label="كورس نشط" variant="success" /> : <Text style={{textAlign: 'center'}}>12,400 ر.س</Text>}
             </ScrollView>
          </View>
        </Animated.View>
      )}

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
  hCell: { flex: 1, fontFamily: fonts.bold, fontSize: 12, color: colors.textMuted, textAlign: 'right' },
  row: { flexDirection: 'row-reverse', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', alignItems: 'center' },
  cell: { flex: 1, alignItems: 'flex-end' },
  avatar: { width: 40, height: 40, borderRadius: 10 },
  nameText: { fontFamily: fonts.bold, fontSize: 14, color: colors.secondary },
  emailText: { fontFamily: fonts.regular, fontSize: 11, color: colors.textMuted },
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
  sideTabs: { flexDirection: 'row-reverse', backgroundColor: '#F5F5F5', borderRadius: 10, padding: 4, marginBottom: 20, marginHorizontal: 15 },
  sideTab: { flex: 1, paddingVertical: 8, alignItems: 'center' },
  sideTabActive: { backgroundColor: '#FFF', borderRadius: 8, ...shadows.sm },
  sideTabText: { fontFamily: fonts.bold, fontSize: 12 },
  toast: { position: 'absolute', bottom: 30, left: 30, backgroundColor: '#F0FDF4', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#10B981', flexDirection: 'row-reverse', alignItems: 'center', zIndex: 2000, ...shadows.md },
  toastText: { color: '#166534', fontFamily: fonts.bold, fontSize: 13, marginRight: 10 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.textMuted },
});
