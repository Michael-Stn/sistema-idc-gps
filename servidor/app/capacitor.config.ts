import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'edu.michalavila.app',
  appName: 'app',
  webDir: 'dist/app',
  bundledWebRuntime: false,
  server: {
    url: 'http://134.122.8.119',
    cleartext: true,
  },
};

export default config;
