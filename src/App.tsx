import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { DBProvider } from './context/DBContext';
import { EncryptionProvider } from "./context/EncryptionContext";
import { DateProvider } from './context/DateContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { ClassProvider } from './context/ClassContext';
import { AudioProvider, useAudio } from "./context/AudioContext";


import { PopupProvider } from './context/PopupContext';


import { SearchProvider } from './context/SearchContext';


import Layout from './components/layouts/layout';
import Main from './components/pages/main';
import Class from './components/pages/class';
import DMS from './components/pages/dms';

import User from './components/pages/user';
import Login from './components/pages/authentication/login';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <SearchProvider>
              <AudioProvider>
                <DateProvider>
                  <DBProvider>
                    <EncryptionProvider token={"test"}>
                      <PopupProvider>
                        <Routes>
                          <Route
                            path="/"
                            element={
                              <Layout variant="alt">
                                <Main />
                              </Layout>
                            }
                          />

                          <Route
                            path="/search/"
                            element={
                              <Layout variant="search">
                                <DMS />
                              </Layout>
                            }
                          />

                          <Route
                            path="/:username"
                            element={
                              <Layout variant="user">
                                <UserProvider>
                                  <User />
                                </UserProvider>
                              </Layout>
                            }
                          />

                          <Route
                            path="/c/:class_code"
                            element={
                              <Layout variant="class">
                                <ClassProvider>
                                  <Class />
                                </ClassProvider>
                              </Layout>
                            }
                          />

                          <Route
                            path="/dms/"
                            element={
                              <Layout variant="dms">
                                <DMS />
                              </Layout>
                            }
                          />

                          <Route path="/login" element={<Login />} />

                          <Route path="*" element={<>Not Found</>} />
                        </Routes>
                      </PopupProvider>
                    </EncryptionProvider>
                  </DBProvider>
                </DateProvider>
              </AudioProvider>
            </SearchProvider>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
};

export default App;