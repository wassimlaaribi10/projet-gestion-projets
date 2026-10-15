// ============================================
// Page de connexion
// ============================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../../context/AuthContext';
import { Button, Input, Card } from '../../../components/ui';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // State du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State de la requête
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // Redirection vers le dashboard après connexion
      navigate('/dashboard');
    } catch (err) {
      // Afficher le message d'erreur du backend
      const message =
        err.response?.data?.message || 'Erreur de connexion. Veuillez réessayer.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-light px-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Gestion de Projets</h1>
          <p className="text-neutral mt-1">Connectez-vous à votre compte</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-danger rounded-lg text-danger text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
          />

          <Input
            label="Mot de passe"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>

        <p className="text-center text-sm text-neutral mt-6">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-primary hover:underline font-medium">
            S&apos;inscrire
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Login;