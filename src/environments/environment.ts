import { Environment } from './environment.model';

export const APP_CONFIG: Environment = {
  //LOCAL
  API_URL: 'http://localhost:5268/api/v1/',

  // DEV
  // API_URL: 'http://devapi.wissalacademy.com/api/v1/',
};

export const environment = {
  production: true
};