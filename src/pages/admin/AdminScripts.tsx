import { useEffect, useState } from 'react';
import { toast } from '../../components/ui/Toaster';

interface Script {
  id: number;
  name: string;
  type: string;
  content: string;
  location: string;
  is_active: number;
  created_at: string;
}

export default function AdminScripts() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingScript, setEditingScript] = useState<Script | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'javascript',
    content: '',
    location: 'head',
    is_active: 1,
  });

  useEffect(() => {
    loadScripts();
  }, []);

  const loadScripts = async () => {
    try {
      const res = await fetch('/api/admin/scripts', { credentials: 'include' });
      const data = await res.json();
      setScripts(data.scripts || []);
    } catch (error) {
      toast('Failed to load scripts', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingScript
        ? `/api/admin/scripts/${editingScript.id}`
        : '/api/admin/scripts';
      const method = editingScript ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save');

      toast(editingScript ? 'Script updated!' : 'Script created!', 'success');
      setShowModal(false);
      resetForm();
      loadScripts();
    } catch (error) {
      toast('Failed to save script', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this script?')) return;
    try {
      const res = await fetch(`/api/admin/scripts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete');
      toast('Script deleted', 'success');
      loadScripts();
    } catch (error) {
      toast('Failed to delete script', 'error');
    }
  };

  const handleEdit = (script: Script) => {
    setEditingScript(script);
    setFormData({
      name: script.name,
      type: script.type,
      content: script.content,
      location: script.location,
      is_active: script.is_active,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingScript(null);
    setFormData({
      name: '',
      type: 'javascript',
      content: '',
      location: 'head',
      is_active: 1,
    });
  };

  const toggleActive = async (script: Script) => {
    try {
      const res = await fetch(`/api/admin/scripts/${script.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ is_active: script.is_active ? 0 : 1 }),
      });
      if (!res.ok) throw new Error('Failed to update');
      toast('Script status updated', 'success');
      loadScripts();
    } catch (error) {
      toast('Failed to update script', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Custom Scripts</h1>
          <p className="text-muted-foreground">Add custom HTML, CSS, or JavaScript</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="btn btn-primary"
        >
          + Add Script
        </button>
      </div>

      <div className="card p-4 mb-6 bg-warning/10 border-warning/20">
        <p className="text-sm text-warning-foreground">
          ⚠️ <strong>Security Warning:</strong> Custom scripts can pose security risks. Only add
          scripts from trusted sources. Malicious scripts can steal data or harm your users.
        </p>
      </div>

      <div className="card overflow-hidden">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr className="bg-muted/50">
                <th>Name</th>
                <th>Type</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scripts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-muted-foreground">
                    No scripts found. Add your first custom script!
                  </td>
                </tr>
              ) : (
                scripts.map((script) => (
                  <tr key={script.id}>
                    <td className="font-medium text-foreground">{script.name}</td>
                    <td>
                      <span className="badge badge-secondary">{script.type.toUpperCase()}</span>
                    </td>
                    <td className="capitalize">{script.location}</td>
                    <td>
                      <button
                        onClick={() => toggleActive(script)}
                        className={`badge cursor-pointer ${
                          script.is_active ? 'badge-success' : 'badge-secondary'
                        }`}
                      >
                        {script.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(script)}
                          className="btn btn-ghost btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(script.id)}
                          className="btn btn-ghost btn-sm text-destructive"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-foreground">
                {editingScript ? 'Edit Script' : 'Add Script'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="e.g., Google Analytics"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="input"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="css">CSS</option>
                    <option value="html">HTML</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Location</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="input"
                  >
                    <option value="head">Head (before &lt;/head&gt;)</option>
                    <option value="body_start">Body Start (after &lt;body&gt;)</option>
                    <option value="body_end">Body End (before &lt;/body&gt;)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="input font-mono text-sm min-h-[200px]"
                  placeholder={
                    formData.type === 'javascript'
                      ? '// Your JavaScript code here\nconsole.log("Hello");'
                      : formData.type === 'css'
                      ? '/* Your CSS styles here */\nbody { color: red; }'
                      : '<!-- Your HTML here -->'
                  }
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active === 1}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })}
                  className="rounded border-input"
                />
                <label htmlFor="is_active" className="text-sm text-foreground">Active</label>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingScript ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
