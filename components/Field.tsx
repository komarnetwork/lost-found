import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Field({ label, id, ...props }: FieldProps) {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-sm text-ink-soft">{label}</span>
      <input
        id={id}
        className="mt-1 w-full border-b-2 border-ink/20 bg-transparent py-2 text-ink outline-none focus:border-booth"
        {...props}
      />
    </label>
  );
}

interface AreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function TextArea({ label, id, ...props }: AreaProps) {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-sm text-ink-soft">{label}</span>
      <textarea
        id={id}
        className="mt-1 min-h-28 w-full border-b-2 border-ink/20 bg-transparent py-2 text-ink outline-none focus:border-booth"
        {...props}
      />
    </label>
  );
}

interface FileFieldProps {
  id: string;
  name: string;
  label: string;
  previewUrl?: string | null;
  onChange: (file: File | null) => void;
}

export function FileField({ id, name, label, previewUrl, onChange }: FileFieldProps) {
  return (
    <div>
      <span className="text-sm text-ink-soft">{label}</span>
      <label
        htmlFor={id}
        className="mt-1 flex cursor-pointer items-center gap-3 border-2 border-dashed border-ink/25 px-3 py-3 text-sm text-ink-soft transition hover:border-booth hover:text-ink"
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt=""
            className="h-12 w-12 shrink-0 border border-ink/15 object-cover"
          />
        ) : null}
        <span>{previewUrl ? "Ganti foto" : "Lampirkan foto (opsional)"}</span>
      </label>
      <input
        id={id}
        name={name}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />
    </div>
  );
}
