import { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Colors, Spacing } from '../../constants/theme';
import { getData } from '../../services/api';

type Sertifikasi = {
  id: number;
  nama_sertifikat: string;
  lembaga_penerbit: string;
  tanggal_terbit: string;
  nomor_sertifikat: string;
  kategori: string;
  jurusan: string;
  tools: string;
  deskripsi: string;
};

function SertifikatCard({ item }: { item: Sertifikasi }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>🎓</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{item.nama_sertifikat}</Text>
          <Text style={styles.cardLembaga}>{item.lembaga_penerbit}</Text>
        </View>
        <View style={styles.badgeKategori}>
          <Text style={styles.badgeKategoriText}>{item.kategori}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>JURUSAN</Text>
          <View style={styles.badgeJurusan}>
            <Text style={styles.badgeJurusanText}>{item.jurusan}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>TERBIT</Text>
          <Text style={styles.infoValue}>{item.tanggal_terbit}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>NO.</Text>
          <Text style={styles.infoValue}>{item.nomor_sertifikat}</Text>
        </View>

        <View style={styles.descBox}>
          <Text style={styles.descLabel}>DESKRIPSI KOMPETENSI</Text>
          <Text style={styles.descText}>{item.deskripsi}</Text>
        </View>

        <View style={styles.toolsRow}>
          <Text style={styles.toolsIcon}>🔧</Text>
          <Text style={styles.toolsText}>{item.tools}</Text>
        </View>
      </View>
    </View>
  );
}

function EmptyState() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🎓</Text>
      <Text style={styles.emptyTitle}>Belum Ada Sertifikasi</Text>
      <Text style={styles.emptySubtitle}>Tambahkan Sertifikat Kompetensi Kamu!</Text>
    </View>
  );
}

export default function SertifikatScreen() {
  const [data, setData] = useState<Sertifikasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const result = await getData('sertifikasi');
      setData(result.data ?? []);
    } catch (e) {
      console.error('Gagal Ambil Data Sertifikasi :', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchData();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.headerMenu}>☰</Text>
        </TouchableOpacity>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>SERTIFIKASI</Text>
        </View>
        <View style={styles.avatarBtn}>
          <Text>👤</Text>
        </View>
      </View>

      <View style={styles.titleRow}>
        <Text style={styles.pageTitle}>← SERTIFIKAT</Text>
        <View style={styles.titleUnderline} />
      </View>

      {loading ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color={Colors.orange} />
          <Text style={styles.spinnerText}>Memuat Data...</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <SertifikatCard item={item} />}
          contentContainerStyle={[
            styles.listContent,
            data.length === 0 && styles.listEmpty,
          ]}
          ListEmptyComponent={<EmptyState />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.orange]}
              tintColor={Colors.orange}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light },
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
  headerMenu: { color: Colors.white, fontSize: 22 },
  headerBadge: { borderWidth: 2, borderColor: Colors.orange, paddingVertical: 4, paddingHorizontal: 10 },
  headerBadgeText: { fontFamily: 'SpaceMono', fontSize: 11, color: Colors.orange },
  avatarBtn: { width: 32, height: 32, backgroundColor: Colors.white, borderWidth: 2, borderColor: Colors.black, alignItems: 'center', justifyContent: 'center' },
  titleRow: { padding: Spacing.md, paddingBottom: 0 },
  pageTitle: { fontFamily: 'SpaceMono', fontSize: 26, fontWeight: 'bold', color: Colors.black, letterSpacing: -1, marginBottom: 4 },
  titleUnderline: { height: 3, backgroundColor: Colors.black, marginBottom: 8 },
  spinnerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  spinnerText: { fontFamily: 'SpaceMono', fontSize: 12, color: Colors.gray, letterSpacing: 1 },
  listContent: { padding: Spacing.md, gap: 16 },
  listEmpty: { flex: 1 },
  card: {
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderColor: Colors.black,
    shadowColor: Colors.black,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: Colors.dark,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  cardIcon: { fontSize: 20 },
  cardTitle: { fontFamily: 'SpaceMono', fontWeight: 'bold', fontSize: 13, color: Colors.white, marginBottom: 2 },
  cardLembaga: { fontSize: 11, color: Colors.gray },
  badgeKategori: { backgroundColor: Colors.orange, paddingVertical: 3, paddingHorizontal: 8, alignSelf: 'flex-start' },
  badgeKategoriText: { fontFamily: 'SpaceMono', fontSize: 9, color: Colors.white, fontWeight: 'bold' },
  cardBody: { padding: 14, gap: 10 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoLabel: { fontFamily: 'SpaceMono', fontSize: 9, letterSpacing: 1, color: Colors.gray, width: 50 },
  infoValue: { fontSize: 12, color: Colors.black, flex: 1 },
  badgeJurusan: { backgroundColor: Colors.grayLight, borderWidth: 2, borderColor: Colors.black, paddingVertical: 3, paddingHorizontal: 10 },
  badgeJurusanText: { fontFamily: 'SpaceMono', fontSize: 10, color: Colors.black, fontWeight: 'bold' },
  descBox: { backgroundColor: Colors.grayLight, padding: 10, borderLeftWidth: 3, borderLeftColor: Colors.orange },
  descLabel: { fontFamily: 'SpaceMono', fontSize: 9, letterSpacing: 1, color: Colors.gray, marginBottom: 6 },
  descText: { fontSize: 12, color: Colors.black, lineHeight: 18 },
  toolsRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  toolsIcon: { fontSize: 14 },
  toolsText: { fontSize: 12, color: Colors.gray, flex: 1 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80, gap: 12 },
  emptyIcon: { fontSize: 48, opacity: 0.3 },
  emptyTitle: { fontFamily: 'SpaceMono', fontSize: 16, color: Colors.gray, fontWeight: 'bold' },
  emptySubtitle: { fontSize: 13, color: Colors.gray },
});