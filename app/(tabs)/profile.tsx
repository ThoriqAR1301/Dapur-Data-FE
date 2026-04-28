import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing } from '../../constants/theme';
import { getData, logout } from '../../services/api';

type User = {
  id: number;
  name: string;
  email: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  agama?: string;
  jenis_kelamin?: string;
  alamat?: string;
  sosmed?: string;
  kelas?: string;
  jurusan?: string;
  nis?: string;
};

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getData('user');
        setUser(result);
      } catch {
        const raw = await AsyncStorage.getItem('user');
        if (raw) setUser(JSON.parse(raw));
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/modal');
    } catch {
      Alert.alert('Error', 'Gagal Logout. Coba lagi');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.orange} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>STUDENT PROFILE</Text>
        <View style={styles.headerIcon}>
          <Text>🎓</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={{ fontSize: 36 }}>👨‍💼</Text>
            </View>
            <TouchableOpacity style={styles.editAvatar}>
              <Text style={{ fontSize: 12 }}>✏️</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.heroName}>{user?.name?.toUpperCase() ?? '—'}</Text>

          <View style={styles.badgeAktif}>
            <Text style={styles.badgeAktifText}>AKTIF</Text>
          </View>

          <View style={styles.nisBadge}>
            <Text style={styles.nisText}>NIS: {user?.nis ?? '—'}</Text>
          </View>

          <View style={styles.badgeRow}>
            <View style={styles.badgeJurusan}>
              <Text style={styles.badgeJurusanText}>{user?.jurusan?.toUpperCase() ?? 'RPL'}</Text>
            </View>
            <View style={styles.badgeKelas}>
              <Text style={styles.badgeKelasText}>{user?.kelas?.toUpperCase() ?? 'KELAS XII'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📋</Text>
            <Text style={styles.sectionTitle}>DATA DIRI</Text>
          </View>

          {[
            { label: 'TEMPAT, TGL LAHIR', value: `${user?.tempat_lahir ?? '—'}, ${user?.tanggal_lahir ?? '—'}` },
            { label: 'AGAMA', value: user?.agama ?? '—' },
            { label: 'JENIS KELAMIN', value: user?.jenis_kelamin ?? '—' },
            { label: 'ALAMAT', value: user?.alamat ?? '—' },
            { label: 'NO. TELEPON', value: '—' },
          ].map((row, i) => (
            <View key={i} style={styles.dataRow}>
              <Text style={styles.dataLabel}>{row.label}</Text>
              <Text style={styles.dataValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🔗</Text>
            <Text style={styles.sectionTitle}>SOSIAL MEDIA</Text>
          </View>

          {[
            { icon: '🔗', label: 'INSTAGRAM', value: '@—' },
            { icon: '💼', label: 'LINKEDIN', value: 'in/—' },
            { icon: '⌨️', label: 'GITHUB', value: user?.sosmed ?? '—' },
          ].map((s, i) => (
            <View key={i} style={[styles.sosmedRow, i < 2 && styles.sosmedBorder]}>
              <View style={styles.sosmedIconBox}>
                <Text style={{ fontSize: 16 }}>{s.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.sosmedLabel}>{s.label}</Text>
                <Text style={styles.sosmedValue}>{s.value}</Text>
              </View>
              {i === 2 && (
                <TouchableOpacity style={styles.sosmedEdit}>
                  <Text>✏️</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.btnLogout}
          onPress={() => setShowLogout(true)}
          activeOpacity={0.85}
        >
          <Text style={styles.btnLogoutText}>↪ KELUAR</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>

      <Modal visible={showLogout} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalIconBox}>
              <Text style={{ fontSize: 24 }}>↪</Text>
            </View>
            <Text style={styles.modalTitle}>Keluar Dari Akun?</Text>
            <Text style={styles.modalSubtitle}>
              Kamu Akan Keluar Dari Portal Siswa SMK Pesat
            </Text>
            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={styles.btnBatal}
                onPress={() => setShowLogout(false)}
              >
                <Text style={styles.btnBatalText}>BATAL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnYaKeluar}
                onPress={handleLogout}
              >
                <Text style={styles.btnYaKeluarText}>YA, KELUAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    backgroundColor: Colors.white,
    paddingTop: 52,
    paddingHorizontal: Spacing.md,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 3,
    borderBottomColor: Colors.black,
  },
  backBtn: { fontSize: 22, color: Colors.black },
  headerTitle: { fontFamily: 'SpaceMono', fontSize: 12, color: Colors.black, letterSpacing: 2 },
  headerIcon: { width: 32, height: 32, backgroundColor: Colors.dark, alignItems: 'center', justifyContent: 'center' },
  scroll: { flex: 1, padding: Spacing.md },
  heroCard: {
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderColor: Colors.black,
    shadowColor: Colors.black,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  avatarWrapper: { position: 'relative' },
  avatar: {
    width: 80, height: 80,
    backgroundColor: Colors.dark,
    borderWidth: 4, borderColor: Colors.orange,
    alignItems: 'center', justifyContent: 'center',
  },
  editAvatar: {
    position: 'absolute', bottom: -4, right: -4,
    backgroundColor: Colors.orange,
    width: 24, height: 24,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.black,
  },
  heroName: { fontFamily: 'SpaceMono', fontWeight: 'bold', fontSize: 20, color: Colors.black, letterSpacing: -0.5 },
  badgeAktif: { backgroundColor: Colors.green, paddingVertical: 4, paddingHorizontal: 14 },
  badgeAktifText: { fontFamily: 'SpaceMono', fontSize: 11, color: Colors.white, fontWeight: 'bold', letterSpacing: 1 },
  nisBadge: { backgroundColor: Colors.dark, paddingVertical: 6, paddingHorizontal: 16 },
  nisText: { fontFamily: 'SpaceMono', fontSize: 12, color: Colors.white, letterSpacing: 1 },
  badgeRow: { flexDirection: 'row', gap: 8 },
  badgeJurusan: { backgroundColor: Colors.orange, paddingVertical: 4, paddingHorizontal: 12 },
  badgeJurusanText: { fontFamily: 'SpaceMono', fontSize: 10, color: Colors.white, fontWeight: 'bold' },
  badgeKelas: { backgroundColor: Colors.white, borderWidth: 2, borderColor: Colors.black, paddingVertical: 4, paddingHorizontal: 12 },
  badgeKelasText: { fontFamily: 'SpaceMono', fontSize: 10, color: Colors.black, fontWeight: 'bold' },
  section: {
    borderWidth: 3, borderColor: Colors.black,
    shadowColor: Colors.black,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1, shadowRadius: 0,
    elevation: 5,
    marginBottom: 16,
    overflow: 'hidden',
  },
  sectionHeader: {
    backgroundColor: Colors.dark,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionIcon: { fontSize: 16 },
  sectionTitle: { fontFamily: 'SpaceMono', fontSize: 11, color: Colors.white, letterSpacing: 2 },
  dataRow: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight,
    backgroundColor: Colors.white,
  },
  dataLabel: { fontFamily: 'SpaceMono', fontSize: 9, letterSpacing: 1, color: Colors.gray, marginBottom: 4 },
  dataValue: { fontSize: 13, color: Colors.black, lineHeight: 20 },
  sosmedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
    backgroundColor: Colors.white,
  },
  sosmedBorder: { borderBottomWidth: 1, borderBottomColor: Colors.grayLight },
  sosmedIconBox: { width: 36, height: 36, borderWidth: 2, borderColor: Colors.black, alignItems: 'center', justifyContent: 'center' },
  sosmedLabel: { fontFamily: 'SpaceMono', fontSize: 9, color: Colors.gray, marginBottom: 2, letterSpacing: 1 },
  sosmedValue: { fontSize: 12, color: Colors.black },
  sosmedEdit: { backgroundColor: Colors.orange, width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  btnLogout: {
    borderWidth: 2, borderColor: Colors.red,
    padding: 14, alignItems: 'center',
    flexDirection: 'row', justifyContent: 'center', gap: 8,
  },
  btnLogoutText: { fontFamily: 'SpaceMono', fontWeight: 'bold', fontSize: 12, color: Colors.red, letterSpacing: 1 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 32 },
  modalBox: {
    backgroundColor: '#FAF9F6',
    borderWidth: 3, borderColor: Colors.black,
    shadowColor: Colors.black,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1, shadowRadius: 0,
    elevation: 10,
    padding: 28,
  },
  modalIconBox: { backgroundColor: Colors.orange, width: 52, height: 52, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: Colors.black, marginBottom: 16 },
  modalTitle: { fontFamily: 'SpaceMono', fontWeight: 'bold', fontSize: 20, color: Colors.black, marginBottom: 8 },
  modalSubtitle: { fontSize: 13, color: '#666', lineHeight: 20, marginBottom: 24 },
  modalBtns: { flexDirection: 'row', gap: 10 },
  btnBatal: { flex: 1, backgroundColor: Colors.white, borderWidth: 3, borderColor: Colors.black, padding: 14, alignItems: 'center' },
  btnBatalText: { fontFamily: 'SpaceMono', fontSize: 11, letterSpacing: 1 },
  btnYaKeluar: { flex: 1, backgroundColor: Colors.dark, borderWidth: 3, borderColor: Colors.black, padding: 14, alignItems: 'center', shadowColor: Colors.black, shadowOffset: { width: 3, height: 3 }, shadowOpacity: 1, shadowRadius: 0, elevation: 5 },
  btnYaKeluarText: { fontFamily: 'SpaceMono', fontSize: 11, color: Colors.white, letterSpacing: 1 },
});