import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing } from '../constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoBox}>
          <Text style={styles.logoIcon}>🎓</Text>
        </View>
        <Text style={styles.logoText}>SMK Яesat</Text>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Profiling &{'\n'}Portfolio{'\n'}Siswa</Text>
        <Text style={styles.heroSubtitle}>
          Lacak Prestasi, Nilai, Dan Portofolio Kamu Dalam Satu Platform
        </Text>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => router.push('/login')}
          activeOpacity={0.85}
        >
          <Text style={styles.btnPrimaryText}>MASUK KE PORTAL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} activeOpacity={0.85}>
          <Text style={styles.btnSecondaryText}>Lihat Profil Publik Siswa</Text>
        </TouchableOpacity>

        <Text style={styles.version}>v1.0 · SMK Pesat</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    paddingTop: 52,
    gap: 10,
  },
  logoBox: {
    width: 36,
    height: 36,
    backgroundColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: { fontSize: 18 },
  logoText: {
    fontFamily: 'SpaceMono',
    fontSize: 20,
    color: Colors.white,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  hero: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Spacing.md,
    paddingBottom: 60,
  },
  heroTitle: {
    fontFamily: 'SpaceMono',
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.white,
    lineHeight: 54,
    letterSpacing: -2,
  },
  heroSubtitle: {
    color: Colors.gray,
    fontSize: 14,
    marginTop: 14,
    lineHeight: 22,
  },
  bottom: {
    backgroundColor: Colors.light,
    padding: Spacing.md,
    paddingBottom: 36,
    gap: 12,
  },
  btnPrimary: {
    backgroundColor: Colors.orange,
    borderWidth: 3,
    borderColor: Colors.black,
    padding: 16,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  btnPrimaryText: {
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
    fontSize: 13,
    color: Colors.white,
    letterSpacing: 2,
  },
  btnSecondary: {
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderColor: Colors.black,
    padding: 16,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  btnSecondaryText: {
    fontWeight: '600',
    fontSize: 14,
    color: Colors.black,
  },
  version: {
    textAlign: 'center',
    fontFamily: 'SpaceMono',
    fontSize: 10,
    color: Colors.gray,
    letterSpacing: 2,
  },
});
