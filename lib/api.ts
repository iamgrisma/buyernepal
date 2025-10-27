// lib/api.ts
import axios from 'axios';

// This reads from your .env.local file
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined in .env.local');
}

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This is crucial for sending/receiving HttpOnly auth cookies
});
