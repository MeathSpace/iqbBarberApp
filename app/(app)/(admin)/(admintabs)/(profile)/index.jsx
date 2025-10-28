import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import ThemeSafeAreaView from '../../../../components/ThemeSafeAreaView';
import ThemeTextPrimary from '../../../../components/ThemeTextPrimary';
import { AboutIcon, HelpSupportIcon, ReportIcon, RightIcon } from '../../../../constants/icons';

const index = () => {

  const { colors } = useTheme();

  const profileOptions = [
    {
      label: 'Report',
      icon: <ReportIcon color="#2563eb" />,
      lightBg: '#ede9fe',
      darkBg: '#5b21b633',
      lightColor: "#2563eb",
      darkColor: '#c4b5fd',
      route: "/connectSalon",
      display: true
    },
    {
      label: 'Help & Support',
      icon: <HelpSupportIcon color='#059669' />,
      lightBg: '#d1fae5',
      darkBg: '#065f4633',
      lightColor: '#059669',
      darkColor: '#6ee7b7',
      route: "/helpSupport",
      display: true
    },
    {
      label: 'About',
      icon: <AboutIcon color='#0284c7' />,
      lightBg: '#e0f2fe',
      darkBg: '#1e3a8a33',
      lightColor: '#0284c7',
      darkColor: '#93c5fd',
      route: "/(about)",
      display: true
    },
  ];

  const router = useRouter()

  const logoutPressed = () => {
    router.replace("/(adminauth)/signin")
  }

  return (
    <ThemeSafeAreaView
      style={{
        backgroundColor: colors.background2,
        padding: scale(15)
      }}
      edges={['top', 'left', 'right']}
    >
      <View style={styles.header}>
        <ThemeTextPrimary style={{ fontSize: scale(18), fontFamily: "AirbnbCereal_W_XBd" }}>Profile</ThemeTextPrimary>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: verticalScale(30), gap: verticalScale(24), marginTop: verticalScale(10) }}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info Card */}

        <LinearGradient
          colors={['#14b8a6', '#0d9488']}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Image
            source={{ uri: "https://img.freepik.com/premium-vector/hand-drawn-profile-icon-avatar-character_884500-33561.jpg" }}
            style={styles.avatar}
            onError={() => { }}
          />
          <View>
            <ThemeTextPrimary style={styles.cardTitle}>Sagnik Nandy</ThemeTextPrimary>
            <ThemeTextPrimary style={[styles.cardSubtitle, { width: "100%" }]} numberOfLines={2}>sagniknandy@example.com</ThemeTextPrimary>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => { router.push("/manageProfile") }}>
            <Feather name="edit-2" size={scale(16)} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>

        <View style={[styles.optionsBox, { backgroundColor: colors.background2, borderColor: colors.borderColor1 }]}>
          {profileOptions.map((opt, idx) => {
            if (!opt.display) return null; // Skip if display is false

            return (
              <View key={idx}>
                <TouchableOpacity activeOpacity={0.8} style={styles.optionRow} onPress={() => { }}>
                  <View style={[styles.optionIconWrapper, { backgroundColor: opt.lightBg }]}>
                    {opt.icon}
                  </View>
                  <ThemeTextPrimary style={[styles.optionLabel]}>{opt.label}</ThemeTextPrimary>
                  <RightIcon size={moderateScale(16)} color={colors.text} style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>
                {idx !== profileOptions.length - 1 && (
                  <View style={[styles.separator, { backgroundColor: colors.borderColor1 }]} />
                )}
              </View>
            );
          })}
        </View>

        {/* Log Out */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.logoutButton, { backgroundColor: '#fee2e2' }]}
          onPress={logoutPressed}
        >
          <Feather name="log-out" size={moderateScale(16)} color={'#dc2626'} />
          <ThemeTextPrimary style={[styles.logoutText, { color: '#dc2626' }]}>Log Out</ThemeTextPrimary>
        </TouchableOpacity>

      </ScrollView>

    </ThemeSafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  card: {
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    position: 'relative',
  },
  avatar: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    borderWidth: scale(2),
    borderColor: '#fff',
  },
  cardTitle: {
    fontSize: scale(20),
    fontFamily: "AirbnbCereal_W_XBd",
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: scale(14),
    color: '#fff',
    opacity: 0.9,
    marginTop: verticalScale(4),
  },
  editButton: {
    position: 'absolute',
    top: verticalScale(12),
    right: scale(12),
    backgroundColor: '#ffffff33',
    padding: scale(8),
    borderRadius: 999,
  },
  optionsBox: {
    borderRadius: scale(16),
    borderWidth: scale(1),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
  },
  optionIconWrapper: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(12),
    justifyContent: "center",
    alignItems: "center"
  },
  optionLabel: {
    marginLeft: scale(12),
    fontFamily: "AirbnbCereal_W_Bd",
    fontSize: scale(16),
  },
  separator: {
    height: verticalScale(0.5),
    marginHorizontal: scale(16),
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(16),
    borderRadius: scale(12),
    gap: scale(8),
  },
  logoutText: {
    fontWeight: '700',
  },
})