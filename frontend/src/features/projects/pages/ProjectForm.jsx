// ============================================
// Page Formulaire de création de projet
// ============================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import projectService from '../services/projectService';
import { useAuth } from '../../../context/AuthContext';
import { Button, Input, Card } from '../../../components/ui';

function ProjectForm() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    dateFinPrevue: '',
    priorite: 'moyenne',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.nom.trim()) {
      errors.nom = 'Le nom est obligatoire';
    } else if (formData.nom.length < 3) {
      errors.nom = 'Le nom doit contenir au moins 3 caractères';
    }

    if (!formData.dateFinPrevue) {
      errors.dateFinPrevue = 'La date de fin prévue est obligatoire';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setFieldErrors({});

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await projectService.create({
        ...formData,
        proprietaire: user._id,
      });

      // Redirection vers le projet créé
      navigate(`/projects/${response.data._id}`);
    } catch (err) {
      if (err.response?.data?.errors && err.response.data.errors.length > 0) {
        const backendErrors = {};
        err.response.data.errors.forEach((e) => {
          backendErrors[e.field] = e.message;
        });
        setFieldErrors(backendErrors);
      } else {
        setError(err.response?.data?.message || 'Erreur lors de la création');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => navigate('/projects')}
        className="text-sm text-primary hover:underline mb-4"
      >
        ← Retour aux projets
      </button>

      <Card className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Nouveau projet</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-danger rounded-lg text-danger text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Nom du projet"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Ex: Refonte du site web"
            error={fieldErrors.nom}
            required
          />

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-neutral-dark mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez votre projet..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <Input
            label="Date de fin prévue"
            type="date"
            name="dateFinPrevue"
            value={formData.dateFinPrevue}
            onChange={handleChange}
            error={fieldErrors.dateFinPrevue}
            required
          />

          <div className="mb-4">
            <label
              htmlFor="priorite"
              className="block text-sm font-medium text-neutral-dark mb-1"
            >
              Priorité
            </label>
            <select
              id="priorite"
              name="priorite"
              value={formData.priorite}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="basse">Basse</option>
              <option value="moyenne">Moyenne</option>
              <option value="haute">Haute</option>
            </select>
          </div>

          <div className="flex gap-3 mt-6">
            <Button type="submit" disabled={loading}>
              {loading ? 'Création...' : 'Créer le projet'}
            </Button>
            <Button variant="secondary" onClick={() => navigate('/projects')}>
              Annuler
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default ProjectForm;