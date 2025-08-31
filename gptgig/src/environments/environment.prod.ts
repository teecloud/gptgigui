import type { LocalConfig } from './local-config';

export const environment = {
  production: true,
  apiUrl: 'https://localhost:5001/api',
  stripePublishableKey: 'pk_live_your_key',
  useLocalConfig: false,
  localConfig: null as LocalConfig | null
};
