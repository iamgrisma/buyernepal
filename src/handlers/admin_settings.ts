import { Context } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { AppEnv } from '../index';

// --- Zod Schemas ---
const SettingSchema = z.object({
    key: z.string().min(1).max(100).regex(/^[a-zA-Z0-9_.-]+$/, "Key must be alphanumeric, underscore, dot, or hyphen"),
    value: z.string().optional().nullable(), // Store complex values as JSON strings
    description: z.string().optional().nullable(),
});

const UpdateSettingsSchema = z.array(SettingSchema); // Expect an array of settings to update

// --- Handlers ---

// GET /api/admin/settings
export const handleAdminGetSettings = async (c: Context<AppEnv>) => {
    try {
        const { results } = await c.env.DB.prepare("SELECT key, value, description, updated_at FROM settings").all();
        // Convert to a key-value object for easier frontend use
        const settingsObj = (results ?? []).reduce((acc, row) => {
            acc[row.key as string] = { value: row.value, description: row.description, updated_at: row.updated_at };
            return acc;
        }, {} as Record<string, any>);
        return c.json({ success: true, settings: settingsObj });
    } catch (e: any) {
        console.error("Admin Get Settings Error:", e);
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};

// PUT /api/admin/settings (Batch update)
export const handleAdminUpdateSettings = zValidator('json', UpdateSettingsSchema, (result, c) => {
    if (!result.success) {
        return c.json({ success: false, error: 'Validation failed', details: result.error.errors }, 400);
    }
});
export const handleAdminUpdateSettingsAction = async (c: Context<AppEnv>) => {
    const settingsUpdates = c.req.valid('json');

    if (!settingsUpdates || settingsUpdates.length === 0) {
        return c.json({ success: false, error: "No settings provided for update" }, 400);
    }

    try {
        const updateStmt = c.env.DB.prepare(
            "INSERT INTO settings (key, value, description) VALUES (?1, ?2, ?3) " +
            "ON CONFLICT(key) DO UPDATE SET value = excluded.value, description = excluded.description, updated_at = CURRENT_TIMESTAMP"
        );

        const batchUpdates = settingsUpdates.map(setting =>
            updateStmt.bind(setting.key, setting.value, setting.description)
        );

        const results = await c.env.DB.batch(batchUpdates);

        const allSucceeded = results.every(res => res.success);
        if (!allSucceeded) {
            console.warn("Some settings failed to update:", results.filter(r => !r.success));
            // Decide if this should be a partial success or full failure
             return c.json({ success: false, error: "Some settings failed to update. Check logs." }, 500);
        }

        return c.json({ success: true, message: `${settingsUpdates.length} settings updated.` });

    } catch (e: any) {
        console.error("Admin Update Settings Error:", e);
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};
