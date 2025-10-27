import { scrypt } from 'scrypt-js';
import { Buffer } from 'buffer'; // Node.js Buffer polyfill for browsers/workers

// Configure scrypt parameters (adjust N for desired security/performance balance)
// N must be a power of 2. 16384 is a common default.
const N = 16384, r = 8, p = 1;
const dkLen = 64; // Derived key length in bytes

// Generate a salt (should be unique per password)
export function generateSalt(length = 16): Uint8Array {
  const salt = new Uint8Array(length);
  crypto.getRandomValues(salt);
  return salt;
}

// Hash a password using scrypt
export async function hashPassword(password: string, salt: Uint8Array): Promise<string> {
  const passwordBuffer = Buffer.from(password, 'utf8');
  const derivedKey = await scrypt(passwordBuffer, salt, N, r, p, dkLen);
  // Store salt and hash together, commonly separated by a character like '.' or '$'
  // Store as hex or base64. Hex is simpler here.
  const saltHex = Buffer.from(salt).toString('hex');
  const hashHex = Buffer.from(derivedKey).toString('hex');
  return `${saltHex}.${hashHex}`;
}

// Verify a password against a stored hash
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    const [saltHex, hashHex] = storedHash.split('.');
    if (!saltHex || !hashHex) {
      return false; // Invalid hash format
    }
    const salt = Buffer.from(saltHex, 'hex');
    const storedKey = Buffer.from(hashHex, 'hex');

    const passwordBuffer = Buffer.from(password, 'utf8');
    const derivedKey = await scrypt(passwordBuffer, salt, N, r, p, dkLen);

    // Constant-time comparison is crucial for security
    return Buffer.from(derivedKey).equals(storedKey);
  } catch (error) {
    console.error("Password verification error:", error);
    return false;
  }
}

// Simple SHA-256 hash for things like IP addresses (one-way hashing)
export async function sha256Hash(input: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
