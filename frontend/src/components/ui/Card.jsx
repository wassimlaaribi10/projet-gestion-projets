// ============================================
// Composant Card
// ============================================

function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-5 ${className}`}>{children}</div>
  );
}

export default Card;