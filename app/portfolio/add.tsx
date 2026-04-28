import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing } from '../../constants/theme';
import { postData } from '../../services/api';

const KATEGORI_OPTIONS = ['Engineering', 'Civil', 'Electrical', 'Drafting', 'Web', 'Mobile', 'IoT'];
const NILAI_OPTIONS = ['A', 'B', 'C', 'D'];

export default function AddPortfolioScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    judul: '',
    kategori: '',
    nilai: '',
    deskripsi: '',
    link_github: '',
    jenis_porto: '',
    tools: '',
    teknologi: '',
  });

  const handleSave = async () => {
    if (!form.judul || !form.kategori || !form.nilai || !form.deskripsi) {
      Alert.alert('Validasi', 'Judul, Kategori, Nilai, Dan Deskripsi Wajib Diisi!');
      return;
    }

    setLoading(true);
    try {
      await postData('portofolio', form);
      router.push('/portfolio/success' as any);
    } catch {
      Alert.alert('Error', 'Gagal Menyimpan Portfolio. Coba lagi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.headerMenu}>☰</Text>
        </TouchableOpacity>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>PORTFOLIO_SYSTEM</Text>
        </View>
        <View style={styles.avatarBtn}><Text>👤</Text></View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>TAMBAH PORTOFOLIO</Text>
        <Text style={styles.pageSubtitle}>
          Lengkapi Data Proyek Untuk Ditambahkan Ke Profil Akademik Anda
        </Text>

        <View style={styles.field}>
          <View style={styles.fieldLabelBox}>
            <Text style={styles.fieldLabelText}>JUDUL PROYEK</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Masukkan Judul Proyek Yang Representatif"
            placeholderTextColor={Colors.gray}
            value={form.judul}
            onChangeText={(v) => setForm({ ...form, judul: v })}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.pickerLabel}>Pilih Kategori</Text>
          <View style={styles.optionRow}>
            {KATEGORI_OPTIONS.map((k) => (
              <TouchableOpacity
                key={k}
                style={[styles.optionChip, form.kategori === k && styles.optionChipActive]}
                onPress={() => setForm({ ...form, kategori: k })}
              >
                <Text style={[styles.optionChipText, form.kategori === k && styles.optionChipTextActive]}>
                  {k}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.pickerLabel}>Nilai</Text>
          <View style={styles.optionRow}>
            {NILAI_OPTIONS.map((n) => (
              <TouchableOpacity
                key={n}
                style={[styles.optionChip, form.nilai === n && styles.optionChipActive]}
                onPress={() => setForm({ ...form, nilai: n })}
              >
                <Text style={[styles.optionChipText, form.nilai === n && styles.optionChipTextActive]}>
                  {n}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <View style={styles.fieldLabelBox}>
            <Text style={styles.fieldLabelText}>DESKRIPSI</Text>
          </View>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Jelaskan Peran Anda, Teknologi Yang Digunakan, Dan Hasil Yang Dicapai..."
            placeholderTextColor={Colors.gray}
            multiline
            numberOfLines={4}
            value={form.deskripsi}
            onChangeText={(v) => setForm({ ...form, deskripsi: v })}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.pickerLabel}>Tools & Teknologi</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh : VSCode, Figma, Postman"
            placeholderTextColor={Colors.gray}
            value={form.tools}
            onChangeText={(v) => setForm({ ...form, tools: v })}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.pickerLabel}>Stack Teknologi</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh : Laravel, React Native, MySQL"
            placeholderTextColor={Colors.gray}
            value={form.teknologi}
            onChangeText={(v) => setForm({ ...form, teknologi: v })}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.pickerLabel}>Link GitHub (Opsional)</Text>
          <TextInput
            style={styles.input}
            placeholder="https://github.com/username/repo"
            placeholderTextColor={Colors.gray}
            value={form.link_github}
            onChangeText={(v) => setForm({ ...form, link_github: v })}
            keyboardType="url"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.field}>
          <View style={[styles.fieldLabelBox, { backgroundColor: Colors.orange }]}>
            <Text style={styles.fieldLabelText}>UNGGAH FILE/GAMBAR</Text>
          </View>
          <View style={styles.uploadBox}>
            <Text style={styles.uploadIcon}>☁️</Text>
            <Text style={styles.uploadTitle}>Seret & Lepas File</Text>
            <Text style={styles.uploadSub}>Atau Klik Untuk Menelusuri</Text>
            <View style={styles.uploadFormats}>
              {['JPG', 'PNG', 'PDF'].map(f => (
                <View key={f} style={styles.formatBadge}>
                  <Text style={styles.formatText}>{f}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.btnSave}
          onPress={handleSave}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading
            ? <ActivityIndicator color={Colors.white} />
            : <Text style={styles.btnSaveText}>💾  SIMPAN PORTOFOLIO</Text>
          }
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  scroll: { flex: 1, padding: Spacing.md },
  pageTitle: { fontFamily: 'SpaceMono', fontWeight: 'bold', fontSize: 20, color: Colors.black, marginBottom: 4 },
  pageSubtitle: { fontSize: 12, color: Colors.gray, marginBottom: 20, lineHeight: 18 },
  field: { marginBottom: 18 },
  fieldLabelBox: { backgroundColor: Colors.black, paddingVertical: 4, paddingHorizontal: 10, alignSelf: 'flex-start', marginBottom: 8 },
  fieldLabelText: { fontFamily: 'SpaceMono', fontSize: 10, color: Colors.white, letterSpacing: 1 },
  pickerLabel: { fontFamily: 'SpaceMono', fontSize: 10, letterSpacing: 1, color: Colors.gray, marginBottom: 8 },
  input: { borderWidth: 3, borderColor: Colors.black, padding: 12, fontSize: 13, color: Colors.black, backgroundColor: Colors.white },
  textarea: { height: 100, textAlignVertical: 'top' },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionChip: { borderWidth: 2, borderColor: Colors.black, paddingVertical: 6, paddingHorizontal: 14 },
  optionChipActive: { backgroundColor: Colors.orange, borderColor: Colors.orange },
  optionChipText: { fontFamily: 'SpaceMono', fontSize: 11, color: Colors.black },
  optionChipTextActive: { color: Colors.white },
  uploadBox: {
    borderWidth: 3,
    borderColor: Colors.black,
    borderStyle: 'dashed',
    padding: 30,
    alignItems: 'center',
    backgroundColor: Colors.white,
    gap: 6,
  },
  uploadIcon: { fontSize: 32 },
  uploadTitle: { fontFamily: 'SpaceMono', fontWeight: 'bold', fontSize: 13 },
  uploadSub: { fontSize: 12, color: Colors.gray },
  uploadFormats: { flexDirection: 'row', gap: 8, marginTop: 6 },
  formatBadge: { borderWidth: 2, borderColor: Colors.black, paddingVertical: 3, paddingHorizontal: 10 },
  formatText: { fontFamily: 'SpaceMono', fontSize: 10 },
  btnSave: {
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
  btnSaveText: { fontFamily: 'SpaceMono', fontWeight: 'bold', fontSize: 13, color: Colors.white, letterSpacing: 2 },
});