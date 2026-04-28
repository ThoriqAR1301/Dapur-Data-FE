import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../constants/theme';

export const getData = async (endpoint: string) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/api/${endpoint}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    return json;

  } catch (error) {
    console.error(`[GET] /${endpoint} error:`, error);
    throw error;

  } finally {
    console.log(`[GET] /${endpoint} Selesai`);
  }
};

export const postData = async (endpoint: string, body: Record<string, any>) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/api/${endpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    return json;

  } catch (error) {
    console.error(`[POST] /${endpoint} error:`, error);
    throw error;

  } finally {
    console.log(`[POST] /${endpoint} Selesai`);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (json.token) {
      await AsyncStorage.setItem('token', json.token);
      await AsyncStorage.setItem('user', JSON.stringify(json.user));
    }

    return json;

  } catch (error) {
    console.error('[LOGIN] error:', error);
    throw error;

  } finally {
    console.log('[LOGIN] Selesai');
  }
};

export const logout = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');

  } catch (error) {
    console.error('[LOGOUT] error:', error);
    throw error;

  } finally {
    console.log('[LOGOUT] Selesai');
  }
};