import crypto from 'crypto';

// Generate API key
const apiKey = crypto.randomUUID().replace(/-/g, '');
console.log('VITE_API_KEY:', apiKey);

// Generate validation key
const validationKey = crypto.randomUUID().replace(/-/g, '');
console.log('VITE_VALIDATION_KEY:', validationKey);
