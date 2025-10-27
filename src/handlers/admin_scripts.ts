import { Context } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { AppEnv } from '../index';

// --- Zod Schemas ---
const ScriptSchema = z.object({
    name: z.string().min(1).max(100),
    content: z.string().min(1, "Script content cannot be empty"),
    location: z.enum(['head', 'body_start', 'body_end']),
    is_active: z.boolean().default(true),
});

const CreateScriptSchema = ScriptSchema;
const UpdateScriptSchema = ScriptSchema.partial();

// --- Handlers ---

// GET /api/admin/scripts
export const handleAdminGetScripts = async (c: Context<AppEnv>) => {
    try {
        const { results } = await c.env.DB.prepare("SELECT * FROM scripts ORDER BY name ASC").all();
        return c.json({ success: true, scripts: results ?? [] });
    } catch (e: any) {
        console.error("Admin Get Scripts Error:", e);
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};

// POST /api/admin/scripts
export const handleAdminCreateScript = zValidator('json', CreateScriptSchema, (result, c) => {
    if (!result.success) {
        return c.json({ success: false, error: 'Validation failed', details: result.error.errors }, 400);
    }
});
export const handleAdminCreateScriptAction = async (c: Context<AppEnv>) => {
    const data = c.req.valid('json');
    try {
        const { success, meta } = await c.env.DB.prepare(
            "INSERT INTO scripts (name, content, location, is_active) VALUES (?1, ?2, ?3, ?4)"
        ).bind(data.name, data.content, data.location, data.is_active).run();

        if (!success) throw new Error("Failed to insert script.");
        return c.json({ success: true, id: meta?.last_row_id }, 201);
    } catch (e: any) {
        console.error("Admin Create Script Error:", e);
        if (e.message?.includes('UNIQUE constraint failed')) {
            return c.json({ success: false, error: 'Conflict', message: 'Script name already exists' }, 409);
        }
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};

// PUT /api/admin/scripts/:id
export const handleAdminUpdateScript = zValidator('json', UpdateScriptSchema, (result, c) => {
     if (!result.success) {
        return c.json({ success: false, error: 'Validation failed', details: result.error.errors }, 400);
    }
});
export const handleAdminUpdateScriptAction = async (c: Context<AppEnv>) => {
     const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) return c.json({ success: false, error: "Invalid ID" }, 400);
    const data = c.req.valid('json');

    const fieldsToUpdate = Object.keys(data);
    if (fieldsToUpdate.length === 0) return c.json({ success: false, error: "No fields to update" }, 400);

    try {
        const setClauses = fieldsToUpdate.map((field, i) => `${field} = ?${i + 1}`);
        const values = fieldsToUpdate.map(field => data[field as keyof typeof data]);
        values.push(id);

        const { success, meta } = await c.env.DB.prepare(
             `UPDATE scripts SET ${setClauses.join(', ')} WHERE id = ?${values.length}`
        ).bind(...values).run();

         if (!success || meta?.changes === 0) {
            const exists = await c.env.DB.prepare("SELECT 1 FROM scripts WHERE id = ?1").bind(id).first();
             if (!exists) return c.json({ success: false, error: "Script not found" }, 404);
             if (!success) throw new Error("Database update failed.");
        }
        return c.json({ success: true, id });
    } catch (e: any) {
        console.error(`Admin Update Script ${id} Error:`, e);
         if (e.message?.includes('UNIQUE constraint failed')) {
            return c.json({ success: false, error: 'Conflict', message: 'Script name already exists' }, 409);
        }
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};

// DELETE /api/admin/scripts/:id
export const handleAdminDeleteScript = async (c: Context<AppEnv>) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) return c.json({ success: false, error: "Invalid ID" }, 400);

    try {
        const { success, meta } = await c.env.DB.prepare("DELETE FROM scripts WHERE id = ?1").bind(id).run();

        if (!success || meta?.changes === 0) {
           const exists = await c.env.DB.prepare("SELECT 1 FROM scripts WHERE id = ?1").bind(id).first();
             if (!exists) return c.json({ success: false, error: "Script not found" }, 404);
             if (!success) throw new Error("Database delete failed.");
        }
        return c.json({ success: true, message: `Script ${id} deleted` });
    } catch (e: any) {
        console.error(`Admin Delete Script ${id} Error:`, e);
        return c.json({ success: false, error: "Database error", message: e.message }, 500);
    }
};
