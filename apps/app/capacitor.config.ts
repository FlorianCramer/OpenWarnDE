import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'de.openwarnde.app',
  appName: 'OpenWarnDE',
  webDir: 'out',

  // Native WebView
  server: {
    androidScheme: 'https'
  },

  // Android
  android: {
    backgroundColor: '#ffffff'
  },

  // iOS
  ios: {
    backgroundColor: '#ffffff'
  },

  // Plugins
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      showSpinner: true
    },

    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#ffffff'
    }
  }
};

export default config;
