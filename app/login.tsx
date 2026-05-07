import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing } from '../constants/theme';
import { login } from '../services/api';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Oops!', 'Email Dan Kata Sandi Wajib Diisi');
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password);

      if (result.token) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Login Gagal', result.message || 'Email Atau Kata Sandi Salah');
      }
    } catch {
      Alert.alert('Error', 'Tidak Dapat Terhubung Ke Server. Cek Koneksi Kamu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.headerIcon}>🎓</Text>
            <Text style={styles.headerTitle}>MASUK</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="siswa@smkpesat.sch.id"
                placeholderTextColor={Colors.gray}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Kata Sandi</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={[styles.input, { paddingRight: 44 }]}
                  placeholder="••••••••••"
                  placeholderTextColor={Colors.gray}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeBtn}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={{ fontSize: 18 }}>{showPassword ? '🙈' : '👁'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity>
              <Text style={styles.forgotText}>Lupa Kata Sandi?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnLogin}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading
                ? <ActivityIndicator color={Colors.white} />
                : <Text style={styles.btnLoginText}>MASUK</Text>
              }
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footer}>SISTEM PROFILING SISWA SMK PESAT</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grayLight,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.md,
  },
  card: {
    borderWidth: 3,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: Colors.dark,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIcon: { fontSize: 18, color: Colors.white },
  headerTitle: {
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.white,
    letterSpacing: 2,
  },
  form: {
    padding: Spacing.md,
    gap: 14,
  },
  fieldGroup: { gap: 6 },
  label: {
    fontWeight: '600',
    fontSize: 13,
    color: Colors.black,
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.black,
    padding: 12,
    fontSize: 13,
    color: Colors.black,
  },
  passwordWrapper: { position: 'relative' },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    top: 10,
  },
  forgotText: {
    color: Colors.orange,
    fontWeight: '600',
    fontSize: 13,
  },
  btnLogin: {
    backgroundColor: Colors.orange,
    borderWidth: 3,
    borderColor: Colors.black,
    padding: 16,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  btnLoginText: {
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.white,
    letterSpacing: 2,
  },
  footer: {
    textAlign: 'center',
    fontFamily: 'SpaceMono',
    fontSize: 9,
    color: Colors.gray,
    marginTop: 20,
    letterSpacing: 3,
  },
});