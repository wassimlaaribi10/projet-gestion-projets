// ============================================
// Page Profil
// ============================================

import { useState } from 'react';

import userService from '../services/userService';
import { useAuth } from '../../../context/AuthContext';
import { Button, Input, Card } from '../../../components/ui';

function Profile() {
  const { user } = useAuth();

  // Formulaire infos
  const [formData, setFormData] = useState({
    nom: user?.nom || '',
    prenom: user?.prenom || '',
    email: user?.email || '',
  });

  // Formulaire mot de passe
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // États
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [successProfile, setSuccessProfile] = useState('');
  const [successPassword, setSuccessPassword] = useState('');
  const [errorProfile, setErrorProfile] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  // Mise à jour d'un champ (infos)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Mise à jour d'un champ (mot de passe)
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  // Sauvegarder le profil
  const handleSubmitProfile = async (e) => {
    e.preventDefault();

    setErrorProfile('');
    setSuccessProfile('');
    setLoadingProfile(true);

    try {
      await userService.updateProfile(user._id, formData);
      setSuccessProfile('Profil mis à jour avec succès');
    } catch (err) {
      setErrorProfile(err.response?.data?.message || 'Erreur lors de la mise à jour');
    } finally {
      setLoadingProfile(false);
    }
  };

  // Changer le mot de passe
  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    setErrorPassword('');
    setSuccessPassword('');

    // Validation
    if (passwordData.newPassword.length < 8) {
      setErrorPassword('Le nouveau mot de passe doit contenir au moins 8 caractères');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorPassword('Les mots de passe ne correspondent pas');
      return;
    }

    setLoadingPassword(true);

    try {
      await userService.changePassword(user._id, {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });

      setSuccessPassword('Mot de passe modifié avec succès');
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      setErrorPassword(err.response?.data?.message || 'Erreur lors du changement');
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-dark mb-6">Mon profil</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carte Infos */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Informations personnelles</h2>

          {errorProfile && (
            <div className="mb-4 p-3 bg-red-50 border border-danger rounded-lg text-danger text-sm">
              {errorProfile}
            </div>
          )}

          {successProfile && (
            <div className="mb-4 p-3 bg-green-50 border border-success rounded-lg text-success text-sm">
              {successProfile}
            </div>
          )}

          <form onSubmit={handleSubmitProfile}>
            <Input
              label="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />

            <Input
              label="Prénom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Button type="submit" disabled={loadingProfile}>
              {loadingProfile ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </form>
        </Card>

        {/* Carte Mot de passe */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Changer le mot de passe</h2>

          {errorPassword && (
            <div className="mb-4 p-3 bg-red-50 border border-danger rounded-lg text-danger text-sm">
              {errorPassword}
            </div>
          )}

          {successPassword && (
            <div className="mb-4 p-3 bg-green-50 border border-success rounded-lg text-success text-sm">
              {successPassword}
            </div>
          )}

          <form onSubmit={handleSubmitPassword}>
            <Input
              label="Ancien mot de passe"
              type="password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              required
            />

            <Input
              label="Nouveau mot de passe"
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              required
            />

            <Input
              label="Confirmer le nouveau mot de passe"
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              required
            />

            <Button type="submit" disabled={loadingPassword}>
              {loadingPassword ? 'Changement...' : 'Changer le mot de passe'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Profile;