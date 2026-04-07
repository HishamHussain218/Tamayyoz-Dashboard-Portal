import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import {
  Archive,
  MessageSquare,
  Search,
  Megaphone,
  Eye,
  EyeOff,
  Phone,
  UserPlus,
  Send,
  X,
  Plus,
  FileText,
  Image as ImageIcon,
  MoreVertical,
} from 'lucide-react-native';
import { colors, fonts, spacing } from '../../theme';

// --- Neobrutalist Design Constants ---
const NEO_BORDER = 2.5;
const NEO_RADIUS = 0; // Sharp edges as requested
const NEO_SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 5,
};

// --- Types ---
interface Ticket {
  id: string;
  student: { name: string; avatar: string; level: string };
  category: 'Technical' | 'Financial' | 'Academic';
  status: 'Open' | 'In Progress' | 'Resolved';
  lastMessage: string;
  time: string;
}

// --- Mock Data ---
const TICKETS: Ticket[] = [
  {
    id: '1',
    student: { name: 'أحمد محمود', avatar: 'https://i.pravatar.cc/150?u=ahmed', level: 'المستوى الثاني' },
    category: 'Technical',
    status: 'Open',
    lastMessage: 'لا يمكنني الدخول إلى المحاضرة المباشرة...',
    time: 'منذ 5 دقائق',
  },
  {
    id: '2',
    student: { name: 'سارة خالد', avatar: 'https://i.pravatar.cc/150?u=sara', level: 'المستوى الثالث' },
    category: 'Financial',
    status: 'In Progress',
    lastMessage: 'تم إرسال إيصال الدفع ولكن لم يتم التفعيل...',
    time: 'منذ ساعة',
  },
  {
    id: '3',
    student: { name: 'ياسين علي', avatar: 'https://i.pravatar.cc/150?u=yassin', level: 'بيت الخبرة' },
    category: 'Academic',
    status: 'Resolved',
    lastMessage: 'شكراً جزيلاً، تم حل المشكلة.',
    time: 'أمس',
  },
];

const QUICK_REPLIES = ['تم حل المشكلة', 'جاري المراجعة مع الحسابات', 'تواصل مع الدعم الفني', 'يرجى إرسال صورة'];

// --- Sub Components ---

const NeoBadge = ({ text, color, bgColor }: { text: string; color?: string; bgColor?: string }) => (
  <View style={[styles.badge, { backgroundColor: bgColor || colors.primary, borderColor: colors.secondary }]}>
    <Text style={[styles.badgeText, { color: color || colors.secondary }]}>{text}</Text>
  </View>
);

const IconButton = ({ icon: Icon, onPress, variant = 'white' }: any) => {
  const bg = variant === 'yellow' ? colors.primary : colors.surface;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.iconButton,
        { backgroundColor: bg, transform: [{ translateY: pressed ? 2 : 0 }, { translateX: pressed ? 2 : 0 }] },
        NEO_SHADOW,
      ]}
    >
      <Icon size={20} color={colors.secondary} strokeWidth={2.5} />
    </Pressable>
  );
};

export const SupportScreen = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isAuditMode, setIsAuditMode] = useState(false);
  const [isBroadcastModalVisible, setBroadcastModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* --- Top Action Bar --- */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            onPress={() => setBroadcastModalVisible(true)}
            style={({ pressed }) => [
              styles.broadcastBtn,
              { transform: [{ translateY: pressed ? 2 : 0 }, { translateX: pressed ? 2 : 0 }] },
              NEO_SHADOW,
            ]}
          >
            <Megaphone size={18} color={colors.secondary} strokeWidth={2.5} />
            <Text style={styles.broadcastBtnText}>إرسال إعلان عام</Text>
          </Pressable>

          <Pressable
            onPress={() => setIsAuditMode(!isAuditMode)}
            style={[
              styles.auditToggle,
              isAuditMode && { backgroundColor: '#FFCCE6' }, // Light pink for monitoring
              NEO_SHADOW,
            ]}
          >
            {isAuditMode ? <Eye size={18} color="#E91E63" /> : <EyeOff size={18} color={colors.textMuted} />}
            <Text style={[styles.auditToggleText, isAuditMode && { color: '#E91E63' }]}>
              {isAuditMode ? 'وضع الرقابة نشط' : 'مركز المراقبة'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} style={{ marginLeft: 12 }} />
          <TextInput
            placeholder="بحث في التذاكر..."
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
          />
        </View>
      </View>

      <View style={styles.mainLayout}>
        {/* --- Ticket List --- */}
        <View style={styles.ticketSection}>
          <Text style={styles.sectionTitle}>نظام التذاكر المركزي</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 3 }]}>الطالب</Text>
              <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>الفئة</Text>
              <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>الحالة</Text>
              <Text style={[styles.tableHeaderText, { flex: 1.5, textAlign: 'center' }]}>الإجراءات</Text>
            </View>

            {TICKETS.map((ticket) => (
              <Pressable
                key={ticket.id}
                onPress={() => setSelectedTicket(ticket)}
                style={({ pressed }) => [
                  styles.ticketRow,
                  selectedTicket?.id === ticket.id && { backgroundColor: '#F0F0FF' },
                  { opacity: pressed ? 0.9 : 1 },
                ]}
              >
                {/* Student Info */}
                <View style={[styles.cell, { flex: 3, flexDirection: 'row-reverse' }]}>
                  <Image source={{ uri: ticket.student.avatar }} style={styles.avatar} />
                  <View style={{ marginRight: 12, alignItems: 'flex-end' }}>
                    <Text style={styles.studentName}>{ticket.student.name}</Text>
                    <Text style={styles.studentLevel}>{ticket.student.level}</Text>
                  </View>
                </View>

                {/* Category */}
                <View style={[styles.cell, { flex: 1.5 }]}>
                  <NeoBadge
                    text={ticket.category === 'Technical' ? 'تقني' : ticket.category === 'Financial' ? 'مالي' : 'أكاديمي'}
                    bgColor={
                      ticket.category === 'Technical' ? '#E1F5FE' : ticket.category === 'Financial' ? '#FFF9C4' : '#E8F5E9'
                    }
                  />
                </View>

                {/* Status */}
                <View style={[styles.cell, { flex: 1.5 }]}>
                  <NeoBadge
                    text={ticket.status === 'Open' ? 'مفتوح' : ticket.status === 'In Progress' ? 'قيد العمل' : 'محلول'}
                    bgColor={
                      ticket.status === 'Open' ? '#FFFF00' : ticket.status === 'In Progress' ? '#00FFFF' : '#4CAF50'
                    }
                  />
                </View>

                {/* Actions */}
                <View style={[styles.cell, { flex: 1.5, flexDirection: 'row-reverse', justifyContent: 'center' }]}>
                  <IconButton icon={MessageSquare} onPress={() => setSelectedTicket(ticket)} variant="yellow" />
                  <View style={{ width: 12 }} />
                  <IconButton icon={Archive} onPress={() => {}} />
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* --- Side Chat Drawer --- */}
        {selectedTicket && (
          <View style={[styles.chatDrawer, NEO_SHADOW]}>
            <View style={styles.chatHeader}>
              <View style={styles.chatHeaderInfo}>
                <Image source={{ uri: selectedTicket.student.avatar }} style={styles.chatAvatar} />
                <View style={{ marginRight: 12, alignItems: 'flex-end' }}>
                  <Text style={styles.chatHeaderTitle}>{selectedTicket.student.name}</Text>
                  <Text style={styles.chatHeaderSub}>{selectedTicket.student.level}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row-reverse' }}>
                <IconButton icon={Phone} onPress={() => {}} />
                <View style={{ width: 8 }} />
                <Pressable style={styles.transferBtn}>
                  <UserPlus size={16} color="white" strokeWidth={2.5} />
                  <Text style={styles.transferBtnText}>تحويل للمدرس</Text>
                </Pressable>
                <View style={{ width: 8 }} />
                <IconButton icon={X} onPress={() => setSelectedTicket(null)} />
              </View>
            </View>

            <ScrollView style={styles.chatArea} contentContainerStyle={{ padding: 16 }}>
              <View style={styles.messageRowStudent}>
                <View style={styles.messageBubbleStudent}>
                  <Text style={styles.messageText}>{selectedTicket.lastMessage}</Text>
                </View>
                <Text style={styles.messageTime}>10:30 AM</Text>
              </View>

              <View style={styles.messageRowAdmin}>
                <View style={styles.messageBubbleAdmin}>
                  <Text style={styles.messageText}>أهلاً بك، جاري فحص المشكلة حالياً وسنقوم بالرد عليك خلال دقائق.</Text>
                </View>
                <Text style={styles.messageTime}>10:35 AM</Text>
              </View>
            </ScrollView>

            <View style={styles.chatFooter}>
              <View style={styles.quickReplies}>
                {QUICK_REPLIES.map((reply, idx) => (
                  <Pressable key={idx} style={[styles.quickReplyBtn, NEO_SHADOW]}>
                    <Text style={styles.quickReplyText}>{reply}</Text>
                  </Pressable>
                ))}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="اكتب ردك هنا..."
                  multiline
                  style={styles.chatInput}
                  placeholderTextColor={colors.textMuted}
                />
                <View style={styles.inputActions}>
                  <Pressable style={styles.attachmentBtn}>
                    <Plus size={20} color={colors.secondary} />
                  </Pressable>
                  <Pressable style={styles.sendBtn}>
                    <Send size={20} color="white" />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* --- Broadcast Modal --- */}
      {isBroadcastModalVisible && (
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, NEO_SHADOW]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>إرسال إعلان عالمي</Text>
              <IconButton icon={X} onPress={() => setBroadcastModalVisible(false)} />
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.inputLabel}>المستهدفين</Text>
              <View style={styles.audienceChips}>
                {['الجميع', 'المستوى الأول', 'المستوى الثاني', 'المعلمين'].map((chip, idx) => (
                  <Pressable
                    key={idx}
                    style={[styles.chip, idx === 0 && { backgroundColor: colors.primary }]}
                  >
                    <Text style={styles.chipText}>{chip}</Text>
                  </Pressable>
                ))}
              </View>

              <Text style={styles.inputLabel}>محتوى الإعلان</Text>
              <TextInput
                style={styles.modalTextArea}
                placeholder="اكتب نص الإعلان هنا..."
                multiline
                numberOfLines={6}
              />

              <View style={styles.attachmentSection}>
                <Pressable style={styles.attachBtn}>
                  <ImageIcon size={20} color={colors.secondary} />
                  <Text style={styles.attachBtnText}>إرفاق صورة</Text>
                </Pressable>
                <View style={{ width: 12 }} />
                <Pressable style={styles.attachBtn}>
                  <FileText size={20} color={colors.secondary} />
                  <Text style={styles.attachBtnText}>إرفاق ملف PDF</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.modalFooter}>
              <Pressable
                onPress={() => setBroadcastModalVisible(false)}
                style={[styles.submitBtn, NEO_SHADOW]}
              >
                <Text style={styles.submitBtnText}>نشر الآن</Text>
                <Megaphone size={20} color={colors.secondary} style={{ marginRight: 8 }} />
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {/* --- Audit Mode Indicator --- */}
      {isAuditMode && (
        <View style={styles.auditIndicator}>
          <Eye size={16} color="white" />
          <Text style={styles.auditIndicatorText}>وضع المراقبة مفعل: للقراءة فقط</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  headerLeft: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  broadcastBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: NEO_BORDER,
    borderColor: colors.secondary,
    borderRadius: 4,
  },
  broadcastBtnText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.secondary,
    marginRight: 10,
  },
  auditToggle: {
    backgroundColor: 'white',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: NEO_BORDER,
    borderColor: colors.secondary,
    borderRadius: 4,
    marginRight: 16,
  },
  auditToggleText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
    maxWidth: 400,
    height: 48,
    backgroundColor: 'white',
    borderWidth: NEO_BORDER,
    borderColor: colors.secondary,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderRadius: 4,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 15,
    textAlign: 'right',
    paddingRight: 12,
  },
  mainLayout: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  ticketSection: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: NEO_BORDER,
    borderColor: colors.secondary,
    borderRadius: 4,
    padding: 20,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.secondary,
    textAlign: 'right',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row-reverse',
    paddingVertical: 12,
    borderBottomWidth: NEO_BORDER,
    borderColor: colors.secondary,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
  },
  tableHeaderText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.secondary,
    textAlign: 'right',
  },
  ticketRow: {
    flexDirection: 'row-reverse',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  cell: {
    justifyContent: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: colors.secondary,
  },
  studentName: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.secondary,
  },
  studentLevel: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderRadius: 4,
  },
  badgeText: {
    fontFamily: fonts.bold,
    fontSize: 12,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatDrawer: {
    width: 450,
    backgroundColor: 'white',
    borderWidth: NEO_BORDER,
    borderColor: colors.secondary,
    borderRadius: 4,
    marginRight: 24,
    flexDirection: 'column',
  },
  chatHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: NEO_BORDER,
    borderColor: colors.secondary,
    backgroundColor: '#F8F9FA',
  },
  chatHeaderInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  chatAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  chatHeaderTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.secondary,
  },
  chatHeaderSub: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textSecondary,
  },
  transferBtn: {
    backgroundColor: colors.secondary,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  transferBtnText: {
    fontFamily: fonts.bold,
    color: 'white',
    fontSize: 12,
    marginRight: 6,
  },
  chatArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  messageRowStudent: {
    alignSelf: 'flex-end',
    maxWidth: '85%',
    marginBottom: 20,
  },
  messageRowAdmin: {
    alignSelf: 'flex-start',
    maxWidth: '85%',
    marginBottom: 20,
  },
  messageBubbleStudent: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: colors.secondary,
    padding: 14,
    borderRadius: 4,
  },
  messageBubbleAdmin: {
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.secondary,
    padding: 14,
    borderRadius: 4,
  },
  messageText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.secondary,
    textAlign: 'right',
  },
  messageTime: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 4,
    textAlign: 'right',
  },
  chatFooter: {
    padding: 16,
    borderTopWidth: NEO_BORDER,
    borderColor: colors.secondary,
    backgroundColor: 'white',
  },
  quickReplies: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  quickReplyBtn: {
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  quickReplyText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.secondary,
  },
  inputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 4,
    padding: 8,
  },
  chatInput: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 15,
    paddingVertical: 8,
    paddingRight: 10,
    maxHeight: 100,
    textAlign: 'right',
  },
  inputActions: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingBottom: 4,
  },
  attachmentBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtn: {
    width: 40,
    height: 40,
    backgroundColor: colors.secondary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    width: 600,
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: colors.secondary,
    borderRadius: 4,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.secondary,
  },
  modalBody: {
    marginBottom: 24,
  },
  inputLabel: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.secondary,
    textAlign: 'right',
    marginBottom: 10,
    marginTop: 16,
  },
  audienceChips: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 4,
    marginLeft: 10,
    marginBottom: 10,
  },
  chipText: {
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  modalTextArea: {
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 4,
    padding: 16,
    fontFamily: fonts.regular,
    fontSize: 16,
    textAlign: 'right',
    backgroundColor: '#FAFAFA',
  },
  attachmentSection: {
    flexDirection: 'row-reverse',
    marginTop: 20,
  },
  attachBtn: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 4,
  },
  attachBtnText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    marginRight: 8,
  },
  modalFooter: {
    alignItems: 'flex-start',
  },
  submitBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderWidth: 3,
    borderColor: colors.secondary,
    borderRadius: 4,
  },
  submitBtnText: {
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  auditIndicator: {
    position: 'absolute',
    bottom: 24,
    left: '50%',
    transform: [{ translateX: -150 }],
    width: 300,
    backgroundColor: '#E91E63',
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },
  auditIndicatorText: {
    fontFamily: fonts.bold,
    color: 'white',
    fontSize: 13,
    marginRight: 8,
  },
});
