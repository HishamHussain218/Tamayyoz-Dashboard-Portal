import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ScrollView, 
  Platform,
  Image,
  Alert,
  Modal,
  TextInput,
  Switch
} from 'react-native';
import { 
  Shield, 
  Plus, 
  Settings, 
  UserPlus, 
  Trash2, 
  AlertTriangle,
  Info,
  Lock,
  Eye,
  CheckCircle2,
  X,
  Search,
  Check
} from 'lucide-react-native';
import { colors, fonts, radius, spacing } from '../../theme';

// Extended roles data based on the prompt
const rolesData = [
  { 
    id: '1', 
    title: 'سوبر أدمن (المالك)', 
    users: 2, 
    description: 'كافة الصلاحيات عبر النظام المالي والتعليمي، مراجعة التقارير الحساسة وإدارة الطواقم.', 
    active: true,
    avatars: ['https://randomuser.me/api/portraits/men/32.jpg', 'https://randomuser.me/api/portraits/women/44.jpg'],
    permissionsCount: 12,
    totalPermissions: 12,
    isSensitive: true
  },
  { 
    id: '2', 
    title: 'مدير العمليات', 
    users: 5, 
    description: 'إدارة المعلمين، الموافقات، ومراجعة وتدقيق المحتوى وضمان جودة العملية التعليمية.', 
    active: true,
    avatars: [
      'https://randomuser.me/api/portraits/men/1.jpg', 
      'https://randomuser.me/api/portraits/women/2.jpg',
      'https://randomuser.me/api/portraits/men/3.jpg',
      'https://randomuser.me/api/portraits/women/4.jpg'
    ],
    permissionsCount: 8,
    totalPermissions: 12,
    isSensitive: false
  },
  { 
    id: '3', 
    title: 'محاسب مالي', 
    users: 1, 
    description: 'عرض التقارير والعمولات فقط دون تعديل، وإدارة فواتير الطلاب والمعلمين.', 
    active: true,
    avatars: ['https://randomuser.me/api/portraits/men/45.jpg'],
    permissionsCount: 4,
    totalPermissions: 12,
    isSensitive: true
  },
  { 
    id: '4', 
    title: 'دعم فني', 
    users: 0, 
    description: 'إدارة الطلاب وحل المشكلات التقنية البسيطة وتلقي البلاغات.', 
    active: true,
    avatars: [],
    permissionsCount: 3,
    totalPermissions: 12,
    isSensitive: false
  },
];

const permissionGroups = [
  {
    title: 'النظام المالي',
    permissions: [
      { id: 'fin_1', label: 'عرض الأرباح والتقارير المالية', isSensitive: true },
      { id: 'fin_2', label: 'تعديل فواتير الطلاب', isSensitive: true },
      { id: 'fin_3', label: 'صرف عمولات المدرسين', isSensitive: true },
    ]
  },
  {
    title: 'إدارة المحتوى',
    permissions: [
      { id: 'cont_1', label: 'إضافة ومراجعة الدروس', isSensitive: false },
      { id: 'cont_2', label: 'إدارة الامتحانات', isSensitive: false },
      { id: 'cont_3', label: 'حذف المحتوى التعليمي', isSensitive: true },
    ]
  },
  {
    title: 'إدارة المستخدمين',
    permissions: [
      { id: 'user_1', label: 'إدارة الطلاب الجدد', isSensitive: false },
      { id: 'user_2', label: 'دعوة مدرسين جدد', isSensitive: false },
      { id: 'user_3', label: 'تعديل صلاحيات الأدوار', isSensitive: true },
    ]
  }
];

const AvatarStack = ({ avatars, count }: { avatars: string[], count: number }) => {
  return (
    <View style={styles.avatarStack}>
      {avatars.slice(0, 3).map((uri, idx) => (
        <Image 
          key={idx} 
          source={{ uri }} 
          style={[styles.stackAvatar, { zIndex: 10 - idx, marginRight: idx === 0 ? 0 : -12 }]} 
        />
      ))}
      {count > 3 && (
        <View style={styles.avatarBadge}>
          <Text style={styles.badgeText}>+{count - 3}</Text>
        </View>
      )}
      {count === 0 && (
        <View style={styles.emptyAvatar}>
          <UserPlus size={14} color={colors.textMuted} />
        </View>
      )}
    </View>
  );
};

export const RolesScreen: React.FC = () => {
  const [roles, setRoles] = useState(rolesData);
  const [activeModal, setActiveModal] = useState<'edit' | 'assign' | 'add' | null>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  const handleDeleteRole = (id: string, title: string) => {
    if (title.includes('المالك')) {
      Alert.alert('تنبيه أمني', 'لا يمكن حذف دور المالك الأساسي للنظام.');
      return;
    }
    Alert.alert(
      'حذف الدور',
      `هل أنت متأكد من حذف دور "${title}"؟ هذا الإجراء سيقوم بإزالة الصلاحيات عن جميع الموظفين المرتبطين به.`,
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'حذف', style: 'destructive', onPress: () => setRoles(r => r.filter(x => x.id !== id)) }
      ]
    );
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedRole(null);
  };

  const renderPermissionModal = () => (
    <Modal visible={activeModal === 'edit'} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.brutalistModal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal} style={styles.closeBtn}>
              <X size={24} color={colors.secondary} />
            </TouchableOpacity>
            <View style={styles.modalTitleGroup}>
              <Text style={styles.modalTitle}>تعديل صلاحيات الدخول</Text>
              <Text style={styles.modalSubtitle}>{selectedRole?.title}</Text>
            </View>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {permissionGroups.map((group, gIdx) => (
              <View key={gIdx} style={styles.permGroup}>
                <Text style={styles.groupHeader}>{group.title}</Text>
                <View style={styles.groupContent}>
                  {group.permissions.map((perm) => (
                    <View key={perm.id} style={styles.permRow}>
                      <View style={styles.permInfo}>
                        <Text style={styles.permLabel}>{perm.label}</Text>
                        {perm.isSensitive && <AlertTriangle size={14} color={colors.error} />}
                      </View>
                      <View style={styles.permActions}>
                        <TouchableOpacity style={[styles.permOption, styles.activePerm]}>
                          <Text style={[styles.permOpText, { color: colors.secondary }]}>تحكم كامل</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.permOption}>
                          <Text style={styles.permOpText}>عرض فقط</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.permOption}>
                          <Text style={styles.permOpText}>لا يمكن</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.saveBtn} onPress={closeModal}>
              <Text style={styles.saveBtnText}>حفظ التغييرات</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderAddModal = () => (
    <Modal visible={activeModal === 'add'} animationType="fade" transparent>
      <View style={styles.modalOverlay}>
        <View style={[styles.brutalistModal, { maxHeight: '60%' }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal} style={styles.closeBtn}>
              <X size={24} color={colors.secondary} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>إضافة دور جديد</Text>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>اسم الدور</Text>
              <TextInput 
                placeholder="مثال: سكرتارية، مشرف مبيعات..."
                style={styles.brutalistInput}
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.toggleMatrix}>
              <Text style={styles.inputLabel}>فتح الأقسام الأساسية</Text>
              {['المكتبة المركزية', 'إدارة الطلاب', 'الماليات', 'الموافقات'].map((item, id) => (
                <View key={id} style={styles.toggleRow}>
                  <Text style={styles.toggleLabel}>{item}</Text>
                  <Switch 
                    value={true} 
                    trackColor={{ false: '#ddd', true: colors.primary }}
                    thumbColor={colors.secondary}
                  />
                </View>
              ))}
            </View>
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.saveBtn} onPress={closeModal}>
              <Text style={styles.saveBtnText}>تأكيد الإضافة</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {renderPermissionModal()}
      {renderAddModal()}
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
           <View style={styles.iconBox}>
              <Shield size={28} color={colors.secondary} />
           </View>
           <View style={styles.titleInfo}>
              <Text style={styles.title}>مركز إدارة الصلاحيات</Text>
              <Text style={styles.subtitle}>تحكم في مستويات الوصول والأمان لمؤسستك التعليمية</Text>
           </View>
           <TouchableOpacity 
            style={styles.mainAddBtn} 
            activeOpacity={0.8}
            onPress={() => setActiveModal('add')}
           >
              <Plus size={24} color={colors.secondary} />
              <Text style={styles.addBtnText}>إضافة دور جديد</Text>
           </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={roles}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isEmpty = item.users === 0;
          return (
            <View 
              style={[
                styles.roleCard, 
                isEmpty && { opacity: 0.7 }
              ]}
            >
              {/* Identity Section (Right) */}
              <View style={styles.cardRight}>
                <View style={[styles.roleIconContainer, item.isSensitive && styles.sensitiveIcon]}>
                  {item.isSensitive ? (
                    <Lock size={24} color={colors.secondary} />
                  ) : (
                    <Shield size={24} color={colors.secondary} />
                  )}
                </View>
              </View>

              {/* Content Section (Middle) */}
              <View style={styles.cardMain}>
                <View style={styles.cardHeaderRow}>
                  <View style={styles.titleGroup}>
                    <Text style={styles.roleTitleFull}>{item.title}</Text>
                    {item.isSensitive && (
                      <View style={styles.warningTag}>
                        <AlertTriangle size={12} color={colors.error} />
                        <Text style={styles.warningText}>صلاحية حساسة</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.accessBadge}>
                    <Text style={styles.accessText}>{item.permissionsCount}/{item.totalPermissions} صلاحية</Text>
                  </View>
                </View>

                <Text style={styles.descriptionText} numberOfLines={2}>
                  {item.description}
                </Text>

                <View style={styles.cardFooter}>
                  <View style={styles.teamContainer}>
                    <AvatarStack avatars={item.avatars} count={item.users} />
                    <Text style={styles.teamText}>
                      {isEmpty ? 'لم يتم تعيين موظفين بعد' : `${item.users} موظفين نشطين`}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Actions Section (Left) */}
              <View style={styles.cardLeft}>
                <TouchableOpacity 
                  style={[styles.brutalistAction, { backgroundColor: colors.surface }]}
                  onPress={() => {
                    setSelectedRole(item);
                    setActiveModal('edit');
                  }}
                >
                  <Settings size={20} color={colors.secondary} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.brutalistAction, { backgroundColor: colors.surface }]}
                  onPress={() => setActiveModal('assign')}
                >
                  <UserPlus size={20} color={colors.secondary} />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.brutalistAction, { backgroundColor: colors.errorLight }]}
                  onPress={() => handleDeleteRole(item.id, item.title)}
                >
                  <Trash2 size={20} color={colors.error} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
    direction: 'rtl',
  },
  header: {
    marginBottom: spacing.xl,
  },
  titleRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 20,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
    shadowColor: colors.secondary,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  titleInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: fonts.tajawalBold,
    fontSize: 32,
    color: colors.secondary,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textSecondary,
  },
  mainAddBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.secondary,
    gap: 12,
    shadowColor: colors.secondary,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  addBtnText: {
    fontFamily: fonts.tajawalBold,
    fontSize: 16,
    color: colors.secondary,
  },
  listContent: {
    paddingBottom: spacing.xxxl,
    gap: 28,
  },
  roleCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
    shadowColor: colors.secondary,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
  },
  cardRight: {
    marginLeft: 0,
    marginRight: 4,
  },
  roleIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  sensitiveIcon: {
    backgroundColor: colors.errorLight,
    borderColor: colors.error,
  },
  cardMain: {
    flex: 1,
    alignItems: 'flex-end',
    marginHorizontal: 24,
  },
  cardHeaderRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  titleGroup: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  roleTitleFull: {
    fontFamily: fonts.tajawalBold,
    fontSize: 22,
    color: colors.secondary,
  },
  warningTag: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.errorLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.error,
  },
  warningText: {
    fontFamily: fonts.semiBold,
    fontSize: 10,
    color: colors.error,
  },
  accessBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.secondary,
  },
  accessText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.secondary,
  },
  descriptionText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'right',
    lineHeight: 22,
    marginBottom: 16,
  },
  cardFooter: {
    width: '100%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  teamText: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.textMuted,
  },
  avatarStack: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  stackAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  avatarBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -10,
    zIndex: 20,
    borderWidth: 1.5,
    borderColor: colors.surface,
  },
  badgeText: {
    color: colors.surface,
    fontSize: 10,
    fontFamily: fonts.bold,
  },
  emptyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  cardLeft: {
    gap: 10,
  },
  brutalistAction: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
    shadowColor: colors.secondary,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  brutalistModal: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.secondary,
    padding: 24,
    shadowColor: colors.secondary,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: colors.borderLight,
    paddingBottom: 20,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.secondary,
  },
  modalTitleGroup: {
    alignItems: 'flex-end',
  },
  modalTitle: {
    fontFamily: fonts.tajawalBold,
    fontSize: 24,
    color: colors.secondary,
  },
  modalSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
  },
  modalContent: {
    paddingBottom: 20,
  },
  permGroup: {
    marginBottom: 24,
  },
  groupHeader: {
    fontFamily: fonts.tajawalBold,
    fontSize: 18,
    color: colors.textPrimary,
    textAlign: 'right',
    marginBottom: 12,
  },
  groupContent: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 12,
    gap: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  permRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  permInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
  },
  permLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  permActions: {
    flexDirection: 'row-reverse',
    gap: 6,
  },
  permOption: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: colors.surface,
  },
  activePerm: {
    backgroundColor: colors.primary,
    borderColor: colors.secondary,
  },
  permOpText: {
    fontFamily: fonts.semiBold,
    fontSize: 10,
    color: colors.textMuted,
  },
  modalFooter: {
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: colors.borderLight,
  },
  saveBtn: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
    shadowColor: colors.secondary,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  saveBtnText: {
    fontFamily: fonts.tajawalBold,
    fontSize: 18,
    color: colors.secondary,
  },
  inputGroup: {
    gap: 12,
    marginBottom: 24,
  },
  inputLabel: {
    fontFamily: fonts.tajawalBold,
    fontSize: 16,
    color: colors.secondary,
    textAlign: 'right',
  },
  brutalistInput: {
    height: 52,
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.secondary,
    paddingHorizontal: 16,
    fontFamily: fonts.regular,
    textAlign: 'right',
  },
  toggleMatrix: {
    gap: 12,
  },
  toggleRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  toggleLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textPrimary,
  },
});
