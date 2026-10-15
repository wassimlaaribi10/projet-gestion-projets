// ============================================
// Page d'inscription
// ============================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../../context/AuthContext';
import { Button, Input, Card } from '../../../components/ui';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  // State du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // State de la requête
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // Mise à jour d'un champ
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validation côté client
  const validateForm = () => {
    const errors = {};

    if (!formData.nom.trim()) {
      errors.nom = 'Le nom est obligatoire';
    }

    if (!formData.prenom.trim()) {
      errors.prenom = 'Le prénom est obligatoire';
    }

    if (!formData.email.trim()) {
      errors.email = "L'email est obligatoire";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Email invalide';
    }

    if (formData.password.length < 8) {
      errors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setFieldErrors({});

    // Validation côté client
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await register({
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        password: formData.password,
      });
      // Redirection vers le dashboard
      navigate('/dashboard');
    } catch (err) {
      // Erreurs de validation du backend
      if (err.response?.data?.errors && err.response.data.errors.length > 0) {
        const backendErrors = {};
        err.response.data.errors.forEach((e) => {
          backendErrors[e.field] = e.message;
        });
        setFieldErrors(backendErrors);
      } else {
        const message =
          err.response?.data?.message || "Erreur d'inscription. Veuillez réessayer.";
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-light px-4 py-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Gestion de Projets</h1>
          <p className="text-neutral mt-1">Créez votre compte</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-danger rounded-lg text-danger text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Nom"
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Votre nom"
            error={fieldErrors.nom}
            required
          />

          <Input
            label="Prénom"
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Votre prénom"
            error={fieldErrors.prenom}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="votre@email.com"
            error={fieldErrors.email}
            required
          />

          <Input
            label="Mot de passe"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            error={fieldErrors.password}
            required
          />

          <Input
            label="Confirmer le mot de passe"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            error={fieldErrors.confirmPassword}
            required
          />

          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? 'Inscription...' : "S'inscrire"}
          </Button>
        </form>

        <p className="text-center text-sm text-neutral mt-6">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Se connecter
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;