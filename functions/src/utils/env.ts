import * as functions from 'firebase-functions';

export function loadEnvConfig() {
  return {
    SMTP_HOST: process.env.SMTP_HOST || functions.config().smtp?.host || 'smtp.gmail.com',
    SMTP_PORT: process.env.SMTP_PORT || functions.config().smtp?.port || '465',
    SMTP_USER: process.env.SMTP_USER || functions.config().smtp?.user || 'theutsavchopra@gmail.com',
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || functions.config().smtp?.password || 'lkbiahhqddbkdkri'
  };
}
