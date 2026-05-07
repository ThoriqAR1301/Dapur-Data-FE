import { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Colors, Spacing } from '../../constants/theme';
import { getData } from '../../services/api';

type Portfolio = {
  id: number;
  judul: string;
  kategori: string;
  nilai: string;
  tanggal?: string;
  tools: string;
  teknologi: string;
  deskripsi: string;
};

function PortfolioCard({ item, onPress }: { item: Portfolio; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.thumbnail}>
        <Text style={{ fontSize: 40, opacity: 0.4 }}>⚙️</Text>
        <View style={styles.badgeGrade}>
          <Text style={styles.badgeGradeText}>{item.nilai} GRADED</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.judul}</Text>

        <View style={styles.cardMeta}>
          <Text style={styles.cardDate}>{item.tanggal ?? '—'}</Text>
          <View style={styles.badgeKategori}>
            <Text style={styles.badgeKategoriText}>{item.kategori}</Text>
          </View>
        </View>

        <Text style={styles.cardTools}>🔧 {item.tools}</Text>
        <Text style={styles.cardTeknologi}>💻 {item.teknologi}</Text>

        <TouchableOpacity style={styles.btnView} onPress={onPress}>
          <Text style={styles.btnViewText}>👁  VIEW PROJECT</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function EmptyState() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>⊡</Text>
      <Text style={styles.emptyTitle}>Belum Ada Portfolio</Text>
      <Text style={styles.emptySubtitle}>Tambahkan Proyek Pertama Kamu!</Text>
    </View>
  );
}

export default function PortfolioScreen() {
  const router = useRouter();
  const [data, setData] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const result = await getData('portofolio');
      setData(result.data ?? []);
    } catch (e) {
      console.error('Gagal Ambil Data Portfolio :', e);
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
          <Text style={styles.headerBadgeText}>PORTFOLIO_SYSTEM</Text>
        </View>
        <View style={styles.avatarBtn}>
          <Text>👤</Text>
        </View>
      </View>

      <View style={styles.titleRow}>
        <Text style={styles.pageTitle}>← PORTFOLIO</Text>
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
          renderItem={({ item }) => (
            <PortfolioCard
              item={item}
              onPress={() => router.push(`/portfolio/${item.id}` as any)}
            />
          )}
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

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/portfolio/add' as any)}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
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
  headerBadge: {
    borderWidth: 2,
    borderColor: Colors.orange,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  headerBadgeText: {
    fontFamily: 'SpaceMono',
    fontSize: 11,
    color: Colors.orange,
  },
  avatarBtn: {
    width: 32, height: 32,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: { padding: Spacing.md, paddingBottom: 0 },
  pageTitle: {
    fontFamily: 'SpaceMono',
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.black,
    letterSpacing: -1,
    marginBottom: 4,
  },
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
  thumbnail: {
    height: 160,
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgeGrade: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.orange,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  badgeGradeText: { fontFamily: 'SpaceMono', fontSize: 10, color: Colors.white, fontWeight: 'bold' },
  cardBody: { padding: 14 },
  cardTitle: {
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.black,
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  cardMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  cardDate: { fontSize: 12, color: Colors.gray },
  badgeKategori: { backgroundColor: Colors.dark, paddingVertical: 3, paddingHorizontal: 8 },
  badgeKategoriText: { fontFamily: 'SpaceMono', fontSize: 10, color: Colors.white, fontWeight: 'bold' },
  cardTools: { fontSize: 12, color: Colors.gray, marginBottom: 2 },
  cardTeknologi: { fontSize: 12, color: Colors.gray, marginBottom: 12 },
  btnView: {
    borderWidth: 2,
    borderColor: Colors.black,
    padding: 10,
    alignItems: 'center',
  },
  btnViewText: { fontFamily: 'SpaceMono', fontSize: 11, letterSpacing: 1 },

  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80, gap: 12 },
  emptyIcon: { fontSize: 48, opacity: 0.3 },
  emptyTitle: { fontFamily: 'SpaceMono', fontSize: 16, color: Colors.gray, fontWeight: 'bold' },
  emptySubtitle: { fontSize: 13, color: Colors.gray },

  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 52,
    height: 52,
    backgroundColor: Colors.orange,
    borderWidth: 3,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  fabText: { fontSize: 24, color: Colors.white, fontWeight: 'bold' },
});
