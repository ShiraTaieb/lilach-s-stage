import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X, Save, Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "datetime-local" | "url" | "image" | "select";
  required?: boolean;
  options?: { value: string; label: string }[];
};

export type AdminTable = "events" | "services" | "gallery" | "playbacks";

interface Props {
  table: AdminTable;
  title: string;
  fields: Field[];
  orderBy: string;
  ascending?: boolean;
  filter?: { column: string; value: string };
  defaults?: Record<string, unknown>;
  display: (row: Record<string, unknown>) => React.ReactNode;
}

export function AdminSection({ table, title, fields, orderBy, ascending = true, filter, defaults, display }: Props) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  const load = async () => {
    let q = supabase.from(table).select("*").order(orderBy, { ascending });
    if (filter) q = q.eq(filter.column, filter.value);
    const { data, error } = await q;
    if (error) toast.error(error.message);
    setRows((data ?? []) as Record<string, unknown>[]);
  };

  useEffect(() => { load(); }, []);

  const startNew = () => {
    const empty: Record<string, unknown> = { ...(defaults ?? {}) };
    fields.forEach((f) => {
      if (!(f.name in empty)) empty[f.name] = f.type === "number" ? 0 : "";
    });
    setEditing(empty);
    setOpen(true);
  };

  const startEdit = (row: Record<string, unknown>) => {
    const copy = { ...row };
    fields.forEach((f) => {
      if (f.type === "datetime-local" && copy[f.name]) {
        copy[f.name] = new Date(copy[f.name] as string).toISOString().slice(0, 16);
      }
    });
    setEditing(copy);
    setOpen(true);
  };

  const handleFile = async (fieldName: string, file: File) => {
    setUploading(fieldName);
    try {
      const ext = file.name.split(".").pop() ?? "bin";
      const path = `${table}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("site-media").upload(path, file, { upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("site-media").getPublicUrl(path);
      setEditing((prev) => prev ? { ...prev, [fieldName]: data.publicUrl } : prev);
      toast.success("הקובץ הועלה");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "שגיאה בהעלאה");
    } finally {
      setUploading(null);
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const payload: Record<string, unknown> = { ...(defaults ?? {}) };
    fields.forEach((f) => {
      let v = editing[f.name];
      if (f.type === "number") v = Number(v);
      if (f.type === "datetime-local" && v) v = new Date(v as string).toISOString();
      payload[f.name] = v;
    });
    if (editing.id) {
      const { error } = await supabase.from(table).update(payload).eq("id", editing.id as string);
      if (error) return toast.error(error.message);
      toast.success("נשמר");
    } else {
      const { error } = await supabase.from(table).insert(payload);
      if (error) return toast.error(error.message);
      toast.success("נוסף");
    }
    setOpen(false);
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("למחוק?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("נמחק");
    load();
  };

  return (
    <section className="bg-gradient-card rounded-3xl border border-border/60 p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-2xl italic text-gradient-gold">{title}</h2>
        <button onClick={startNew} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4" /> הוספה
        </button>
      </div>
      <div className="space-y-2">
        {rows.length === 0 && <p className="text-sm text-muted-foreground">אין רשומות</p>}
        {rows.map((row) => (
          <div key={String(row.id)} className="flex items-center justify-between gap-4 rounded-xl border border-border/40 bg-background/40 px-4 py-3">
            <div className="min-w-0 flex-1 truncate text-sm">{display(row)}</div>
            <div className="flex gap-1">
              <button onClick={() => startEdit(row)} className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => remove(String(row.id))} className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/20 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {open && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur" onClick={() => setOpen(false)}>
          <form onSubmit={save} onClick={(e) => e.stopPropagation()} className="bg-gradient-card max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-primary/30 p-6 shadow-elegant">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-2xl italic">{editing.id ? "עריכה" : "הוספה"}</h3>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-1 hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3">
              {fields.map((f) => (
                <label key={f.name} className="block">
                  <span className="mb-1 block text-sm text-muted-foreground">{f.label}</span>
                  {f.type === "textarea" ? (
                    <textarea required={f.required} rows={4} value={String(editing[f.name] ?? "")} onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })} className="w-full rounded-xl border border-input bg-background/60 px-3 py-2 outline-none focus:border-primary" />
                  ) : f.type === "select" ? (
                    <select required={f.required} value={String(editing[f.name] ?? "")} onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })} className="w-full rounded-xl border border-input bg-background/60 px-3 py-2 outline-none focus:border-primary">
                      <option value="">בחרי...</option>
                      {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  ) : f.type === "image" ? (
                    <div className="space-y-2">
                      {editing[f.name] && <img src={String(editing[f.name])} alt="" className="h-24 w-full rounded-lg object-cover" />}
                      <div className="flex items-center gap-2">
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-input bg-background/60 px-3 py-2 text-sm hover:border-primary">
                          <Upload className="h-4 w-4" />
                          {uploading === f.name ? "מעלה..." : "העלאת תמונה"}
                          <input type="file" accept="image/*,audio/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(f.name, e.target.files[0])} />
                        </label>
                        <input type="url" placeholder="או הדביקי URL" value={String(editing[f.name] ?? "")} onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })} className="flex-1 rounded-lg border border-input bg-background/60 px-3 py-2 text-xs outline-none focus:border-primary" />
                      </div>
                    </div>
                  ) : (
                    <input type={f.type ?? "text"} required={f.required} value={String(editing[f.name] ?? "")} onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })} className="w-full rounded-xl border border-input bg-background/60 px-3 py-2 outline-none focus:border-primary" />
                  )}
                </label>
              ))}
            </div>
            <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2.5 font-semibold text-primary-foreground hover:opacity-90">
              <Save className="h-4 w-4" /> שמירה
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
