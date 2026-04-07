import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  I18nManager,
  ActivityIndicator,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Library,
  Wallet,
  GraduationCap,
  Shield,
  Bell,
  Plus,
  HelpCircle,
  Settings,
  LogOut,
  ChevronLeft,
} from 'lucide-react-native';
import {
  useFonts,
  Alexandria_400Regular,
  Alexandria_700Bold,
  Alexandria_600SemiBold,
} from '@expo-google-fonts/alexandria';
import { Tajawal_700Bold } from '@expo-google-fonts/tajawal';

import { colors, fonts, radius, spacing, shadows } from '@/src/theme';
import { KPIRow, RevenueChart, Leaderboard, ApprovalsList, ActivityFeed } from '@/src/components/dashboard';
import { TeachersScreen } from '@/src/components/teachers/TeachersScreen';
import { ApprovalsScreen } from '@/src/components/approvals/ApprovalsScreen';
import { LibraryScreen } from '@/src/components/library/LibraryScreen';
import { FinanceScreen } from '@/src/components/finance/FinanceScreen';
import { StudentsScreen } from '@/src/components/students/StudentsScreen';
import { RolesScreen } from '@/src/components/roles/RolesScreen';
import { SupportScreen } from '@/src/components/support/SupportScreen';
import { SearchBar } from '@/src/components/ui/SearchBar';
import { LoginScreen } from '@/src/components/auth/LoginScreen';
import { Button } from '@/src/components/ui/Button';
import { TabKey } from '@/src/types';

const SIDEBAR_W = 280; // Slightly wider for better text flow

if (!I18nManager.isRTL) {
  I18nManager.forceRTL(true);
}

interface MenuItem {
  key: TabKey;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

const mainMenu: MenuItem[] = [
  { key: 'dashboard', label: 'مركز القيادة (الرئيسية)', icon: LayoutDashboard },
  { key: 'teachers', label: 'إدارة فريق العمل', icon: Users },
  { key: 'approvals', label: 'مراجعة وتدقيق المحتوى', icon: ClipboardCheck, badge: 3 },
  { key: 'library', label: 'المكتبة المركزية', icon: Library },
  { key: 'finance', label: 'الماليات والعمولات', icon: Wallet },
  { key: 'students', label: 'إدارة الطلاب', icon: GraduationCap },
  { key: 'roles', label: 'الصلاحيات', icon: Shield },
  { key: 'support', label: 'الدعم والمراسلات', icon: HelpCircle },
];

const DashboardHome: React.FC = () => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.dashContent}
  >
    <View style={styles.headerBar}>
      <View style={styles.greetingGroup}>
        <Text style={styles.sectionTitle}>أهلاً بك مرة أخرى، هشام! 👋</Text>
        <Text style={styles.sectionSubtitle}>إليك ملخص أداء السنتر اليوم.</Text>
      </View>
      <Button
        label="دعوة مدرس جديد"
        onPress={() => {}}
        variant="primary"
        icon={<Plus size={18} color={colors.secondary} />}
        style={styles.ctaHeader}
      />
    </View>

    <KPIRow />

    <View style={styles.mainGrid}>
      <View style={styles.chartCol}>
        <RevenueChart />
      </View>
      <View style={styles.leaderboardCol}>
        <Leaderboard />
      </View>
    </View>

    <View style={styles.bottomGrid}>
      <View style={styles.approvalsCol}>
        <ApprovalsList />
      </View>
      <View style={styles.activityCol}>
        <ActivityFeed />
      </View>
    </View>
  </ScrollView>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [fontsLoaded] = useFonts({
    Alexandria_400Regular,
    Alexandria_600SemiBold,
    Alexandria_700Bold,
    Tajawal_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardHome />;
      case 'teachers': return <TeachersScreen />;
      case 'approvals': return <ApprovalsScreen />;
      case 'library': return <LibraryScreen />;
      case 'finance': return <FinanceScreen />;
      case 'students': return <StudentsScreen />;
      case 'roles': return <RolesScreen />;
      case 'support': return <SupportScreen />;
      default: return <DashboardHome />;
    }
  };

  return (
    <SafeAreaView style={styles.root} pointerEvents="box-none">
      <StatusBar style="dark" />
      <View style={styles.layout} pointerEvents="box-none">

        {/* SIDEBAR */}
        <View style={styles.sidebar}>
          <View>
            <View style={styles.logoSlot}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoChar}>ت</Text>
              </View>
              <View>
                <Text style={styles.logoName}>منصة تميز</Text>
                <Text style={styles.logoSub}>بوابة المؤسسات التعليمية</Text>
              </View>
            </View>

            <View style={styles.navMenu}>
              {mainMenu.map((item) => {
                const active = activeTab === item.key;
                return (
                  <Pressable
                    key={item.key}
                    style={({ pressed }) => [
                      styles.navItem, 
                      active && styles.navItemActive,
                      { opacity: pressed ? 0.7 : 1 }
                    ]}
                    onPress={() => setActiveTab(item.key)}
                  >
                    <item.icon
                      size={20}
                      color={active ? colors.secondary : colors.textSecondary}
                    />
                    <Text style={[styles.navLabel, active && styles.navLabelActive]}>
                      {item.label}
                    </Text>
                    {item.badge && (
                      <View style={styles.sidebarBadge}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.sidebarFooter}>
            <View style={styles.footerLinks}>
              <TouchableOpacity style={styles.footerItem}>
                <Settings size={20} color={colors.textSecondary} />
                <Text style={styles.footerLabel}>إعدادات الحساب</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.footerItem, styles.logoutBtn]}
                onPress={() => setIsAuthenticated(false)}
              >
                <LogOut size={20} color={colors.error} />
                <Text style={[styles.footerLabel, { color: colors.error }]}>تسجيل الخروج</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* MAIN */}
        <View style={styles.mainContent} pointerEvents="box-none">
          <View style={styles.topbar}>
            <View style={styles.searchContainer}>
              <SearchBar
                value=""
                onChangeText={() => {}}
                placeholder="ابحث عن مدرس، طالب، فاتورة..."
              />
            </View>
            
            <TouchableOpacity style={styles.notifBtn}>
              <Bell size={20} color={colors.textSecondary} />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            {renderScreen()}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  layout: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  sidebar: {
    width: SIDEBAR_W,
    backgroundColor: colors.surface,
    borderLeftWidth: 1,
    borderLeftColor: colors.borderLight,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  logoSlot: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
    paddingVertical: spacing.lg,
    marginBottom: spacing.xl,
    paddingHorizontal: 8,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.secondary,
  },
  logoChar: {
    fontFamily: fonts.tajawalBold,
    fontSize: 24,
    color: colors.secondary,
  },
  logoName: {
    fontFamily: fonts.tajawalBold,
    fontSize: 20,
    color: colors.secondary,
  },
  logoSub: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: -2,
  },
  navMenu: {
    flex: 1,
    gap: 4,
  },
  navItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 14,
    borderRadius: radius.lg,
    gap: 12,
    marginBottom: 6,
    ...Platform.select({
      web: { cursor: 'pointer' },
      default: {},
    }),
  },
  navItemActive: {
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  navLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
    textAlign: 'right',
  },
  navLabelActive: {
    fontFamily: fonts.tajawalBold,
    color: colors.secondary,
  },
  sidebarBadge: {
    backgroundColor: colors.error,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: fonts.bold,
  },
  sidebarFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.lg,
  },
  footerLinks: {
    gap: 4,
  },
  footerItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: radius.md,
  },
  logoutBtn: {
    backgroundColor: '#FFF1F2',
    marginTop: spacing.md,
  },
  footerLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
    textAlign: 'right',
  },
  mainContent: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topbar: {
    height: 72,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  searchContainer: {
    flex: 1,
    maxWidth: 600,
  },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.error,
    borderWidth: 1.5,
    borderColor: colors.surface,
  },
  dashContent: {
    paddingBottom: spacing.xxxl,
    paddingHorizontal: spacing.lg,
  },
  headerBar: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  greetingGroup: {
    gap: 2,
  },
  sectionTitle: {
    fontFamily: fonts.tajawalBold,
    fontSize: 28,
    color: colors.textPrimary,
    textAlign: 'right',
  },
  sectionSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'right',
  },
  ctaHeader: {
    borderRadius: radius.xl,
    paddingHorizontal: 24,
  },
  mainGrid: {
    flexDirection: 'row-reverse',
    gap: 24,
    marginTop: 24,
  },
  chartCol: {
    flex: 3.2,
  },
  leaderboardCol: {
    flex: 2,
  },
  bottomGrid: {
    flexDirection: 'row-reverse',
    gap: 24,
    marginTop: 24,
  },
  approvalsCol: {
    flex: 3.2,
  },
  activityCol: {
    flex: 2,
  },
});
