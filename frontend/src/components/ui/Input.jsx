// ============================================
// Composant Input
// ============================================

function Input({ label, type = 'text', name, value, onChange, placeholder, error, required }) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-neutral-dark mb-1">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
          error ? 'border-danger bg-red-50' : 'border-gray-300'
        }`}
      />

      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
}

export default Input;