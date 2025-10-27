import { z } from 'zod';

// Example Zod schema - define your actual schemas here
export const ProductSearchSchema = z.object({
  query: z.string().min(1, "Search query cannot be empty").max(100),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(50).optional().default(10),
  category: z.string().optional(),
});

export const UserRegistrationSchema = z.object({
    username: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(8),
});

// Add other schemas as needed (e.g., login, product creation, etc.)
