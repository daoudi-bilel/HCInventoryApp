import { Environment } from './environment.model';

export const APP_CONFIG: Environment = {
  //LOCAL
  //API_URL: 'http://localhost:5268/api/v1/',

  // REMOTE
   API_URL: 'https://bilos.bsite.net/api/v1/',
};

export const environment = {
  production: true
};