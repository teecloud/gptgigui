import type { LocalConfig } from './local-config';

export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api',
  stripePublishableKey: 'pk_test_your_key',
  useLocalConfig: false,
  localConfig: null as LocalConfig | null
};
