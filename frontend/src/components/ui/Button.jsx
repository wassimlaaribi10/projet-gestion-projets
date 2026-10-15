// ============================================
// Composant Button
// ============================================

function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
}) {
  // Styles de base (communs à tous les variants)
  const baseStyles =
    'px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  // Styles par variant
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-white text-primary border border-primary hover:bg-primary-light',
    danger: 'bg-danger text-white hover:bg-red-600',
    ghost: 'bg-transparent text-primary hover:bg-primary-light',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;