import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Platform,
  Image,
  Alert,
  TextInput,
  Switch,
  Modal
} from 'react-native';
import { 
  Shield, 
  Plus, 
  Crown, 
  Wallet, 
  BookOpen, 
  GraduationCap,
  AlertTriangle,
  Lock,
  ChevronLeft,
  UserPlus,
  Users,
  Send,
  ArrowRight,
  CheckCircle2,
  Trash2,
  Settings,
  ChevronRight,
  X,
  FileText,
  UserCheck,
  Search,
  MoreVertical
} from 'lucide-react-native';
import { colors, fonts, radius, spacing } from '../../theme';

// ─── Types & Data ────────────────────────────────────────────────

type ViewMode = 'list' | 'edit' | 'add';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: string;
  joinedDate: string;
}

interface RoleData {
  id: string;
  title: string;
  subtitle: string;
  icon: 'crown' | 'wallet' | 'books' | 'graduation';
  staffCount: number;
  staff: StaffMember[];
  isAdmin?: boolean;
}

const rolesData: RoleData[] = [
  { 
    id: '1', 
    title: 'سوبر أدمن (المالك / المدير)', 
    subtitle: 'كافة الصلاحيات عبر النظام المالي والتعليمي',
    icon: 'crown',
    staffCount: 2, 
    staff: [
      { id: 'u1', name: 'أحمد محمود', email: 'ahmed@tamayyoz.com', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', status: 'نشط', joinedDate: '2026/01' },
      { id: 'u2', name: 'سارة خالد', email: 'sara@tamayyoz.com', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', status: 'نشط', joinedDate: '2026/01' }
    ],
    isAdmin: true,
  },
  { 
    id: '2', 
    title: 'المسؤول المالي', 
    subtitle: 'صلاحيات إدارة الفواتير والمدفوعات',
    icon: 'wallet',
    staffCount: 3, 
    staff: [
      { id: 'u3', name: 'ياسين علي', email: 'yassin@finance.com', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', status: 'نشط', joinedDate: '2026/02' },
      { id: 'u4', name: 'منى يوسف', email: 'mona@finance.com', avatar: 'https://randomuser.me/api/portraits/women/22.jpg', status: 'نشط', joinedDate: '2026/01' },
      { id: 'u5', name: 'كريم حسن', email: 'karim@finance.com', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', status: 'نشط', joinedDate: '2026/03' }
    ],
  },
  { 
    id: '3', 
    title: 'مشرف المحتوى', 
    subtitle: 'صلاحيات إدارة الجداول الدراسية والطلاب',
    icon: 'books',
    staffCount: 5, 
    staff: [
      { id: 'u6', name: 'ليلى إبراهيم', email: 'layla@content.com', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', status: 'نشط', joinedDate: '2026/01' },
      { id: 'u7', name: 'محمد زكي', email: 'm.zaki@content.com', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', status: 'في إجازة', joinedDate: '2026/02' },
      { id: 'u8', name: 'روان هاني', email: 'rawan@content.com', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', status: 'نشط', joinedDate: '2026/01' },
      { id: 'u9', name: 'عمر عادل', email: 'omar@content.com', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', status: 'نشط', joinedDate: '2026/01' },
      { id: 'u10', name: 'نور سمير', email: 'noor@content.com', avatar: 'https://randomuser.me/api/portraits/women/6.jpg', status: 'نشط', joinedDate: '2026/03' }
    ],
  },
  { 
    id: '4', 
    title: 'شؤون الطلاب', 
    subtitle: 'صلاحيات إدخال البيانات المالية والتقارير',
    icon: 'graduation',
    staffCount: 4, 
    staff: [
      { id: 'u11', name: 'خالد منير', email: 'khaled@students.com', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', status: 'نشط', joinedDate: '2026/01' },
      { id: 'u12', name: 'رزان وليد', email: 'razan@students.com', avatar: 'https://randomuser.me/api/portraits/women/23.jpg', status: 'نشط', joinedDate: '2026/02' },
      { id: 'u13', name: 'يوسف ساري', email: 'youssef@students.com', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', status: 'نشط', joinedDate: '2026/01' },
      { id: 'u14', name: 'هالة خليل', email: 'hala@students.com', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', status: 'نشط', joinedDate: '2026/01' }
    ],
  },
];

const permissionContent = [
  {
    title: 'إدارة المحتوى والاعتماد',
    permissions: [
      { id: 'c1', label: 'إضافة ومراجعة الدروس التعليمية' },
      { id: 'c2', label: 'إدارة بنك الأسئلة والامتحانات' },
      { id: 'c3', label: 'حذف المحتوى (صلاحية حساسة)' },
      { id: 'c4', label: 'تنظيم المكتبة المركزية المتقدم' },
    ]
  },
  {
    title: 'إدارة المستخدمين',
    permissions: [
      { id: 'u1', label: 'إضافة طلاب جدد وتفعيل الحسابات' },
      { id: 'u2', label: 'دعوة مدرسين جدد للمنصة' },
      { id: 'u3', label: 'مراقبة سجلات الحضور والنشاط' },
      { id: 'u4', label: 'تعديل صلاحيات الأدوار الإدارية' },
    ]
  },
  {
    title: 'الإدارة المالية',
    permissions: [
      { id: 'f1', label: 'عرض التقارير المالية والأرباح' },
      { id: 'f2', label: 'إدارة سجل المدفوعات والعمليات' },
      { id: 'f3', label: 'اعتماد طلبات سحب الرصيد' },
    ]
  }
];

// ─── Styling Presets ─────────────────────────────────────────────

const neoShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 8,
};

const neoShadowSmall = {
  shadowColor: '#000',
  shadowOffset: { width: 3, height: 3 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 6,
};

// ─── Sub Components ──────────────────────────────────────────────

const RoleIcon = ({ type, size = 26 }: { type: RoleData['icon'], size?: number }) => {
  switch (type) {
    case 'crown': return <Crown size={size} color={colors.secondary} />;
    case 'wallet': return <Wallet size={size} color={colors.secondary} />;
    case 'books': return <BookOpen size={size} color={colors.secondary} />;
    case 'graduation': return <GraduationCap size={size} color={colors.secondary} />;
    default: return <Shield size={size} color={colors.secondary} />;
  }
};

const AvatarStack = ({ staff }: { staff: StaffMember[] }) => (
  <View style={styles.avatarStack}>
    {staff.slice(0, 3).map((member, idx) => (
      <Image key={member.id} source={{ uri: member.avatar }} style={[styles.stackAvatar, { zIndex: 10 - idx, marginRight: idx === 0 ? 0 : -10 }]} />
    ))}
    {staff.length > 3 && (
      <View style={styles.avatarOverflow}>
        <Text style={styles.avatarOverflowText}>+{staff.length - 3}</Text>
      </View>
    )}
  </View>
);

// ─── Main Component ──────────────────────────────────────────────

export const RolesScreen: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedRole, setSelectedRole] = useState<RoleData | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewingStaffRole, setViewingStaffRole] = useState<RoleData | null>(null);
  const [memberSearch, setMemberSearch] = useState('');

  // States for Add/Invite
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedRoleTemplate, setSelectedRoleTemplate] = useState<string>('1');

  const navigateBack = () => {
    setViewMode('list');
    setSelectedRole(null);
  };

  // ─── Modal Viewers ──────────────────────────────────────────────

  const renderAddModal = () => (
    <Modal visible={showAddModal} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalBox, neoShadow]}>
          <TouchableOpacity style={styles.modalCloseIcon} onPress={() => setShowAddModal(false)}>
            <X size={24} color={colors.secondary} />
          </TouchableOpacity>
          
          <Text style={styles.modalTitle}>إضافة عضو جديد</Text>
          
          <View style={styles.modalForm}>
            <View style={styles.modalInputGroup}>
              <Text style={styles.modalInputLabel}>الاسم الكامل</Text>
              <TextInput style={styles.modalInput} placeholder="علي محمد علي" value={inviteName} onChangeText={setInviteName} />
            </View>

            <View style={styles.modalInputGroup}>
              <Text style={styles.modalInputLabel}>البريد الإلكتروني</Text>
              <TextInput style={styles.modalInput} placeholder="lawadytrading68@domain.com" value={inviteEmail} onChangeText={setInviteEmail} />
            </View>

            <View style={styles.modalInputGroup}>
              <Text style={styles.modalInputLabel}>الدور الوظيفي</Text>
              <View style={styles.rolePickerGrid}>
                {rolesData.map((role) => (
                  <TouchableOpacity 
                    key={role.id}
                    style={[styles.roleOption, selectedRoleTemplate === role.id && styles.roleOptionActive]}
                    onPress={() => setSelectedRoleTemplate(role.id)}
                  >
                    <RoleIcon type={role.icon} size={18} />
                    <Text style={[styles.roleOptionText, selectedRoleTemplate === role.id && styles.roleOptionTextActive]}>
                      {role.title.split(' (')[0]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.modalFooterButtons}>
            <TouchableOpacity style={[styles.modalBtnSubmit, neoShadowSmall]} onPress={() => { setShowAddModal(false); Alert.alert('تم الإرسال', 'تم إرسال دعوة الانضمام بنجاح'); }}>
              <Text style={styles.modalBtnSubmitText}>إرسال الدعوة</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setShowAddModal(false)}>
              <Text style={styles.modalBtnCancelText}>إلغاء</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderStaffModal = () => (
    <Modal visible={viewingStaffRole !== null} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={[styles.staffModalBox, neoShadow]}>
          <View style={styles.staffModalHeader}>
            <View style={styles.headerLeft}>
               <TouchableOpacity onPress={() => setViewingStaffRole(null)}>
                <X size={24} color={colors.secondary} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.staffModalTitle}>الموظفين في دور: {viewingStaffRole?.title.split(' (')[0]}</Text>
              <View style={styles.headerBadge}>
                <Text style={styles.headerBadgeText}>{viewingStaffRole?.staffCount} موظفين</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.staffSearchContainer}>
            <Search size={18} color={colors.textMuted} />
            <TextInput 
              style={styles.staffSearchInput} 
              placeholder="ابحث عن اسم موظف..." 
              value={memberSearch}
              onChangeText={setMemberSearch}
              textAlign="right"
            />
          </View>

          <ScrollView style={styles.staffListScroll} showsVerticalScrollIndicator={false}>
            {viewingStaffRole?.staff.filter(s => s.name.includes(memberSearch)).map((member) => (
              <View key={member.id} style={styles.memberCard}>
                <View style={styles.memberLeft}>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusBadgeText}>نشط</Text>
                  </View>
                  <TouchableOpacity style={styles.memberActionBtn}>
                    <Trash2 size={16} color={colors.error} />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.memberCenter}>
                  <Text style={styles.joinedText}>انضم منذ: {member.joinedDate}</Text>
                </View>

                <View style={styles.memberRight}>
                  <View style={styles.memberInfo}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    <Text style={styles.memberEmail}>{member.email}</Text>
                  </View>
                  <Image source={{ uri: member.avatar }} style={styles.memberAvatar} />
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.staffModalFooter}>
            <TouchableOpacity 
              style={[styles.assignNewBtn, neoShadowSmall]} 
              onPress={() => { setViewingStaffRole(null); setShowAddModal(true); }}
            >
              <Plus size={18} color={colors.secondary} />
              <Text style={styles.assignNewBtnText}>+ تعيين موظف جديد</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // ─── Screens ──────────────────────────────────────────────────

  const renderRolesList = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <View style={styles.headerTitleBlock}>
          <Text style={styles.mainTitle}>الصلاحيات والأدوار</Text>
          <Text style={styles.mainSubtitle}>توزيع الأدوار الإدارية والتحكم في وصول الموظفين</Text>
        </View>
        <TouchableOpacity style={[styles.addRoleBtn, neoShadow]} onPress={() => setShowAddModal(true)}>
          <Plus size={20} color={colors.secondary} />
          <Text style={styles.addRoleBtnText}>إضافة دور +</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rolesContainer}>
        {rolesData.map((role) => (
          <View key={role.id} style={[styles.roleCard, neoShadow]}>
            <View style={styles.cardHeader}>
              <View style={styles.roleLabelBadge}>
                <Users size={14} color={colors.primary} />
                <TouchableOpacity onPress={() => setViewingStaffRole(role)}>
                  <Text style={styles.roleLabelBadgeText}>{role.staffCount} موظف</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{role.title}</Text>
                <Text style={styles.cardSubtitle}>{role.subtitle}</Text>
              </View>
              <View style={styles.cardIconBox}>
                <RoleIcon type={role.icon} />
              </View>
            </View>

            <View style={styles.cardFooter}>
              <TouchableOpacity 
                style={styles.editLinkBtn} 
                onPress={() => { setSelectedRole(role); setViewMode('edit'); }}
              >
                <ChevronLeft size={16} color={colors.textMuted} />
                <Text style={styles.editLinkText}>تعديل الصلاحيات</Text>
              </TouchableOpacity>
              <View style={styles.footerTeam}>
                <Text style={styles.footerTeamText}>{role.staffCount} موظفين نشطين</Text>
                <AvatarStack staff={role.staff} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderEditPermissions = () => (
    <View style={styles.pageContainer}>
      <View style={styles.pageHeader}>
        <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
          <Text style={styles.backButtonText}>العودة للصلاحيات والأدوار</Text>
          <ChevronRight size={18} color={colors.secondary} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>صلاحيات الوصول</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.permissionsScroll}>
        {permissionContent.map((section, sIdx) => (
          <View key={sIdx} style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.permsCard}>
              {section.permissions.map((perm, pIdx) => (
                <View key={perm.id} style={[styles.permLine, pIdx === section.permissions.length - 1 && { borderBottomWidth: 0 }]}>
                  <View style={styles.permDetail}>
                    <Text style={styles.permLabel}>{perm.label}</Text>
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={[styles.actionBtn, styles.actionBtnActive]}>
                      <Text style={styles.actionBtnTextActive}>تحكم كامل</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn}>
                      <Text style={styles.actionBtnText}>عرض فقط</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn}>
                      <Text style={styles.actionBtnText}>منع</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.saveFooter}>
        <TouchableOpacity style={[styles.saveBtn, neoShadow]} onPress={navigateBack}>
          <Text style={styles.saveBtnText}>حفظ التغييرات</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.root}>
      {renderAddModal()}
      {renderStaffModal()}
      {viewMode === 'list' && renderRolesList()}
      {viewMode === 'edit' && renderEditPermissions()}
    </View>
  );
};

// ─── Styles ────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  headerTitleBlock: {
    alignItems: 'flex-end',
  },
  mainTitle: {
    fontFamily: fonts.tajawalBold,
    fontSize: 34,
    color: colors.secondary,
  },
  mainSubtitle: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  addRoleBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.secondary,
    gap: 8,
  },
  addRoleBtnText: {
    fontFamily: fonts.tajawalBold,
    fontSize: 16,
    color: colors.secondary,
  },

  // Role Cards
  rolesContainer: {
    gap: 20,
  },
  roleCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 20,
  },
  roleLabelBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
  },
  roleLabelBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.primary,
  },
  cardInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  cardTitle: {
    fontFamily: fonts.tajawalBold,
    fontSize: 20,
    color: colors.secondary,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  cardIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f3f3f3',
    paddingTop: 16,
  },
  footerTeam: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  footerTeamText: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.textSecondary,
  },
  editLinkBtn: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
  },
  editLinkText: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.textMuted,
  },

  // Edit Permissions View
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.secondary,
    gap: 6,
  },
  backButtonText: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.secondary,
  },
  pageTitle: {
    fontFamily: fonts.tajawalBold,
    fontSize: 28,
    color: colors.secondary,
  },
  permissionsScroll: {
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  sectionBlock: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: fonts.tajawalBold,
    fontSize: 18,
    color: colors.secondary,
    textAlign: 'right',
    marginBottom: 12,
  },
  permsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 16,
  },
  permLine: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
  },
  permDetail: {
    alignItems: 'flex-end',
    flex: 1,
  },
  permLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: colors.secondary,
  },
  actionButtons: {
    flexDirection: 'row-reverse',
    gap: 6,
  },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#eee',
  },
  actionBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.secondary,
  },
  actionBtnText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.textMuted,
  },
  actionBtnTextActive: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.secondary,
  },
  saveFooter: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  saveBtn: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  saveBtnText: {
    fontFamily: fonts.tajawalBold,
    fontSize: 18,
    color: colors.secondary,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  modalCloseIcon: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },
  modalTitle: {
    fontFamily: fonts.tajawalBold,
    fontSize: 24,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalForm: {
    gap: 16,
  },
  modalInputGroup: {
    gap: 8,
  },
  modalInputLabel: {
    fontFamily: fonts.tajawalBold,
    fontSize: 15,
    color: colors.secondary,
    textAlign: 'right',
  },
  modalInput: {
    height: 52,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 16,
    fontFamily: fonts.semiBold,
    fontSize: 15,
    textAlign: 'right',
  },
  rolePickerGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  roleOption: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  roleOptionActive: {
    backgroundColor: colors.primary,
    borderColor: colors.secondary,
  },
  roleOptionText: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.textSecondary,
  },
  roleOptionTextActive: {
    fontFamily: fonts.bold,
    color: colors.secondary,
  },
  modalFooterButtons: {
    flexDirection: 'row-reverse',
    gap: 12,
    marginTop: 32,
  },
  modalBtnSubmit: {
    flex: 1,
    backgroundColor: colors.primary,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  modalBtnSubmitText: {
    fontFamily: fonts.tajawalBold,
    fontSize: 16,
    color: colors.secondary,
  },
  modalBtnCancel: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBtnCancelText: {
    fontFamily: fonts.tajawalBold,
    fontSize: 16,
    color: colors.secondary,
  },

  // Staff Modal Specific
  staffModalBox: {
    width: '100%',
    maxWidth: 680,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  staffModalHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerRight: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  headerLeft: {
    padding: 4,
  },
  staffModalTitle: {
    fontFamily: fonts.tajawalBold,
    fontSize: 22,
    color: colors.secondary,
  },
  headerBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.secondary,
  },
  headerBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.secondary,
  },
  staffSearchContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#eee',
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 20,
    gap: 10,
  },
  staffSearchInput: {
    flex: 1,
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.secondary,
  },
  staffListScroll: {
    maxHeight: 400,
  },
  memberCard: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    padding: 14,
    marginBottom: 12,
  },
  memberRight: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
    flex: 1.5,
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  memberInfo: {
    alignItems: 'flex-end',
  },
  memberName: {
    fontFamily: fonts.tajawalBold,
    fontSize: 15,
    color: colors.secondary,
  },
  memberEmail: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  memberCenter: {
    flex: 1,
    alignItems: 'center',
  },
  joinedText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.textSecondary,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  memberLeft: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
  statusBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  statusBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: '#15803D',
  },
  memberActionBtn: {
    padding: 6,
  },
  staffModalFooter: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f3f3',
    paddingTop: 20,
  },
  assignNewBtn: {
    backgroundColor: '#fff',
    height: 52,
    borderRadius: 14,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
    gap: 8,
  },
  assignNewBtnText: {
    fontFamily: fonts.tajawalBold,
    fontSize: 16,
    color: colors.secondary,
  },

  // Avatar Component Styles
  avatarStack: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  stackAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#f3f3f3',
  },
  avatarOverflow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: -10,
  },
  avatarOverflowText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: fonts.bold,
  },
});
