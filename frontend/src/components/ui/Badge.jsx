// ============================================
// Composant Badge
// ============================================

function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-gray-200 text-gray-900',
    success: 'bg-green-200 text-green-900',
    warning: 'bg-yellow-200 text-yellow-900',
    danger: 'bg-red-200 text-red-900',
    info: 'bg-blue-200 text-blue-900',
  };

  return (
    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${variants[variant]}`}>
      {children}
    </span>
  );
}

export default Badge;