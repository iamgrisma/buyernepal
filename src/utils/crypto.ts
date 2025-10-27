import { scrypt } from 'scrypt-js';

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
  const passwordBuffer = new TextEncoder().encode(password);
  const derivedKey = await scrypt(passwordBuffer, salt, N, r, p, dkLen);
  // Store salt and hash together, commonly separated by a character like '.' or '$'
  // Store as hex or base64. Hex is simpler here.
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
  const hashHex = Array.from(derivedKey).map(b => b.toString(16).padStart(2, '0')).join('');
  return `${saltHex}.${hashHex}`;
}

// Verify a password against a stored hash
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    const [saltHex, hashHex] = storedHash.split('.');
    if (!saltHex || !hashHex) {
      return false; // Invalid hash format
    }
    const salt = new Uint8Array(saltHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
    const storedKey = new Uint8Array(hashHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));

    const passwordBuffer = new TextEncoder().encode(password);
    const derivedKey = await scrypt(passwordBuffer, salt, N, r, p, dkLen);

    // Constant-time comparison is crucial for security
    if (derivedKey.length !== storedKey.length) return false;
    let diff = 0;
    for (let i = 0; i < derivedKey.length; i++) {
      diff |= derivedKey[i] ^ storedKey[i];
    }
    return diff === 0;
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
