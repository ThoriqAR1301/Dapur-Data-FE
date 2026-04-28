import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing } from '../../constants/theme';

type User = {
  name: string;
  jurusan?: string;
  kelas?: string;
};

export default function DashboardScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const raw = await AsyncStorage.getItem('user');
        if (raw) setUser(JSON.parse(raw));
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const stats = [
    { num: '12', label: 'PORTOFOLIO' },
    { num: '3', label: 'SERTIFIKASI' },
    { num: '5', label: 'PRESTASI' },
    { num: '85', label: 'RATA NILAI' },
  ];

  const menus = [
    { icon: '👤', label: 'PROFIL', route: '/profile' },
    { icon: '📊', label: 'NILAI', route: null },
    { icon: '⊡', label: 'PORTOFOLIO', route: '/(tabs)/explore' },
    { icon: '🏆', label: 'PRESTASI', route: null },
    { icon: '✓', label: 'SERTIFIKASI', route: '/(tabs)/sertifikat' },
    { icon: '📄', label: 'CIS', route: null },
  ];

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
        <TouchableOpacity>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>STUDENT PROFILE</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
          <View style={styles.avatarBtn}>
            <Text>👤</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.avatarBig}>
            <Text style={{ fontSize: 32 }}>👨‍💼</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroGreet}>Selamat Datang,</Text>
            <Text style={styles.heroName}>{user?.name ?? 'Siswa'}</Text>
            <Text style={styles.heroKelas}>
              {user?.kelas ?? 'XII'} — {user?.jurusan ?? 'RPL'}
            </Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((s, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statNum}>{s.num}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Kelengkapan Profil</Text>
            <Text style={styles.progressPct}>80%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '80%' }]} />
          </View>
        </View>

        <View style={styles.menuGrid}>
          {menus.map((m, i) => (
            <TouchableOpacity
              key={i}
              style={styles.menuCard}
              onPress={() => m.route && router.push(m.route as any)}
              activeOpacity={0.8}
            >
              <Text style={styles.menuIcon2}>{m.icon}</Text>
              <Text style={styles.menuLabel}>{m.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.light },
  header: {
    backgroundColor: Colors.dark,
    paddingTop: 52,
    paddingHorizontal: Spacing.md,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 3,
    borderBottomColor: Colors.black,
  },
  menuIcon: { color: Colors.white, fontSize: 22 },
  headerTitle: { fontFamily: 'SpaceMono', fontSize: 13, color: Colors.white, letterSpacing: 2 },
  avatarBtn: {
    width: 32, height: 32, backgroundColor: Colors.white,
    borderWidth: 2, borderColor: Colors.orange,
    alignItems: 'center', justifyContent: 'center',
  },
  scroll: { flex: 1, padding: Spacing.md },
  heroCard: {
    backgroundColor: Colors.dark,
    borderWidth: 3,
    borderColor: Colors.black,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  avatarBig: {
    width: 70, height: 70,
    backgroundColor: Colors.grayLight,
    borderWidth: 3,
    borderColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroGreet: { color: Colors.gray, fontSize: 12, marginBottom: 4 },
  heroName: {
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.white,
    marginBottom: 4,
  },
  heroKelas: {
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.orange,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderColor: Colors.black,
    padding: 14,
    shadowColor: Colors.black,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  statNum: {
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
    fontSize: 24,
    color: Colors.orange,
  },
  statLabel: {
    fontFamily: 'SpaceMono',
    fontSize: 10,
    letterSpacing: 1,
    color: Colors.black,
    marginTop: 2,
  },
  progressCard: {
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderColor: Colors.black,
    padding: 14,
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  progressLabel: { fontWeight: '600', fontSize: 13 },
  progressPct: { fontFamily: 'SpaceMono', fontWeight: 'bold', fontSize: 13, color: Colors.orange },
  progressTrack: {
    backgroundColor: Colors.grayLight,
    height: 12,
    borderWidth: 2,
    borderColor: Colors.black,
  },
  progressFill: { backgroundColor: Colors.orange, height: '100%' },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  menuCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderColor: Colors.black,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  menuIcon2: { fontSize: 24 },
  menuLabel: {
    fontFamily: 'SpaceMono',
    fontSize: 10,
    letterSpacing: 1,
    color: Colors.black,
  },
});
