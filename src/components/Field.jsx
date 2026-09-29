/**
 * Field
 * -----
 * A form label wrapped around its input. `htmlFor` links the label to the
 * input's id, so clicking the label focuses the input and screen readers
 * read the label aloud.
 */
export default function Field({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}
