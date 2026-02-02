/* eslint-disable react-refresh/only-export-components */
import apolloClient from '@/utils/apollo';
import { gql } from '@apollo/client';
import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '@/hooks/useAuthStore';

interface AuthContextProps {
  authData: any;
  loginUser: (credentials: { email: any; password: any; autoLogin: any; type?: any }) => any;
  logoutUser: () => void;
  fetchUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authData, setAuthData } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      if (!authData || !authData.name) {
        await fetchUser();
      }
    };
    init();
  }, []);

  const fetchUser = async () => {
    try {
      const info = await apolloClient.query({
        query: gql`
          query {
            whoAmI {
              id
              type
              avatar
              email
              name
              phone
              address
              googleId
              orders {
                order_items {
                  combo_id
                  course_id
                }
                status
              }
              cartItems {
                course_id
              }
              user_courses {
                course_id
              }
            }
          }
        `,
        fetchPolicy: 'no-cache',
      });
      if (info && info.data && info.data.whoAmI) {
        console.log('Fetched user info:', info.data.whoAmI);
        setAuthData(info.data.whoAmI);
      } else {
        setAuthData(null);
      }
    } catch (error: any) {
      console.log(error.message);
      setAuthData(null);
    }
  };

  const loginUser = async (credentials: { email: string; password: string; autoLogin: boolean; type?: string }) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include', // 👈 send + receive HttpOnly cookie
      });

      const json = await response.json();
      if (json && json.status === 'ok') {
        await fetchUser(); // 👈 load user sau login
      }
      return json;
    } catch (error) {
      return null;
    }
  };

  const logoutUser = async () => {
    await fetch('/api/logout');
    setAuthData(null);
    useAuthStore.persist.clearStorage(); // xóa khỏi localStorage
    localStorage.removeItem('auth-storage');
  };

  return <AuthContext.Provider value={{ authData, loginUser, logoutUser, fetchUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
