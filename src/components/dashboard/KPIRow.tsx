import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DollarSign, TrendingUp, Users, ArrowUpRight, GraduationCap, Percent } from 'lucide-react-native';
import { colors, fonts, radius, spacing, shadows } from '../../theme';
import { kpis } from '../../data/mockData';

interface KPIItemProps {
  title: string;
  value: string;
  trend?: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  highlighted?: boolean;
}

const KPIItem: React.FC<KPIItemProps> = ({ title, value, trend, icon: Icon, iconBg, iconColor, highlighted }) => (
  <View style={[styles.card, highlighted && styles.cardHighlighted]}>
    <View style={styles.cardTop}>
      <View style={[styles.iconWrap, { backgroundColor: highlighted ? 'rgba(0,0,0,0.1)' : iconBg }]}>
        <Icon size={18} color={highlighted ? colors.secondary : iconColor} />
      </View>
      {trend && (
        <View style={[styles.trendWrap, highlighted && { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
          <ArrowUpRight size={12} color={highlighted ? colors.secondary : colors.success} />
          <Text style={[styles.trendText, highlighted && { color: colors.secondary }]}>{trend}</Text>
        </View>
      )}
    </View>
    <Text style={[styles.value, highlighted && { color: colors.secondary }]}>{value}</Text>
    <Text style={[styles.title, highlighted && { color: 'rgba(0,0,0,0.7)' }]}>{title}</Text>
  </View>
);

export const KPIRow: React.FC = () => (
  <View style={styles.grid}>
    <KPIItem
      title="صافي ربح السنتر المتوقع (عمولة %)"
      value="104,250 ج.م"
      trend="+8%"
      icon={Percent}
      iconBg="#fff"
      iconColor={colors.secondary}
      highlighted
    />
    <KPIItem
      title="إجمالي مبيعات السنتر الكلي"
      value="346,800 ج.م"
      trend="+12%"
      icon={DollarSign}
      iconBg={colors.background}
      iconColor={colors.textSecondary}
    />
    <KPIItem
      title="المعلمين النشطين حالياً"
      value="18"
      icon={Users}
      iconBg={colors.infoLight}
      iconColor={colors.info}
    />
    <KPIItem
      title="إجمالي الطلاب المسجلين"
      value="50"
      icon={GraduationCap}
      iconBg={colors.warningLight}
      iconColor={colors.warning}
    />
  </View>
);

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row-reverse',
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  cardHighlighted: {
    backgroundColor: '#FFFF00',
    borderColor: colors.secondary,
    borderWidth: 2,
  },
  cardTop: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    gap: 2,
  },
  trendText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: colors.success,
  },
  value: {
    fontFamily: fonts.tajawalBold,
    fontSize: 24,
    color: colors.secondary,
    marginBottom: 2,
    textAlign: 'right',
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'right',
    lineHeight: 18,
  },
});
