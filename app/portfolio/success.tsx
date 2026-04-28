import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing } from '../../constants/theme';

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.checkBox}>
          <Text style={styles.checkIcon}>✓</Text>
        </View>

        <View style={styles.titleBox}>
          <Text style={styles.titleText}>BERHASIL{'\n'}DIUNGGAH!</Text>
        </View>

        <View style={styles.subtitleBox}>
          <Text style={styles.subtitleText}>
            Portfolio Kamu Telah Tersimpan Dalam Sistem
          </Text>
        </View>

        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => router.replace('/(tabs)/explore' as any)}
          activeOpacity={0.85}
        >
          <Text style={styles.btnPrimaryText}>KEMBALI KE LIST</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => router.replace('/(tabs)/explore' as any)}
          activeOpacity={0.85}
        >
          <Text style={styles.btnSecondaryText}>LIHAT PORTOFOLIO →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: 16,
  },
  checkBox: {
    width: 80,
    height: 80,
    backgroundColor: Colors.orange,
    borderWidth: 4,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-6deg' }],
    shadowColor: Colors.black,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
    marginBottom: 8,
  },
  checkIcon: {
    fontSize: 36,
    color: Colors.white,
    fontWeight: 'bold',
  },
  titleBox: {
    borderWidth: 4,
    borderColor: Colors.black,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 7,
    backgroundColor: Colors.white,
  },
  titleText: {
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
    fontSize: 32,
    color: Colors.black,
    textAlign: 'center',
    letterSpacing: -1,
    lineHeight: 36,
  },
  subtitleBox: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.orange,
    paddingLeft: 14,
    alignSelf: 'stretch',
  },
  subtitleText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  btnPrimary: {
    alignSelf: 'stretch',
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
    marginTop: 8,
  },
  btnPrimaryText: {
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
    fontSize: 13,
    color: Colors.white,
    letterSpacing: 2,
  },
  btnSecondary: {
    alignSelf: 'stretch',
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderColor: Colors.black,
    padding: 14,
    alignItems: 'center',
  },
  btnSecondaryText: {
    fontFamily: 'SpaceMono',
    fontSize: 13,
    letterSpacing: 2,
    color: Colors.black,
  },
});