'use client'

import axios from 'axios';

const API_AUTH_URL = 'https://gdgocinha.site/auth';

export const useAuthApi = () => {

  // Access Token 갱신 함수
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(`${API_AUTH_URL}/refresh`, {}, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      return response;
    } catch (error) {
      console.error('Access Token 갱신 중 오류 발생:', error);
      throw error;
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      await axios.post(`${API_AUTH_URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error('로그아웃 요청 오류 발생:', error);
      throw error;
    }
  };

  return { refreshAccessToken, logout };
};