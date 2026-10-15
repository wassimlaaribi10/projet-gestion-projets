// ============================================
// Page Notifications
// ============================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import notificationService from '../services/notificationService';
import { useAuth } from '../../../context/AuthContext';
import { Button, Card } from '../../../components/ui';

function Notifications() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Charger les notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await notificationService.getByUser(user._id);
        setNotifications(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchNotifications();
    }
  }, [user]);

  // Marquer comme lue
  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(
        notifications.map((n) => (n._id === id ? { ...n, lue: true } : n))
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur');
    }
  };

  // Tout marquer comme lu
  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead(user._id);
      setNotifications(notifications.map((n) => ({ ...n, lue: true })));
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur');
    }
  };

  // Supprimer
  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette notification ?')) return;

    try {
      await notificationService.remove(id);
      setNotifications(notifications.filter((n) => n._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur');
    }
  };

  // Compter les non lues
  const unreadCount = notifications.filter((n) => !n.lue).length;

  // États
  if (loading) {
    return <p className="text-neutral text-center py-12">Chargement...</p>;
  }

  if (error) {
    return (
      <Card>
        <p className="text-danger">{error}</p>
      </Card>
    );
  }

  return (
    <div>
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-dark">Notifications</h1>
          <p className="text-sm text-neutral">
            {unreadCount > 0
              ? `${unreadCount} non lue${unreadCount > 1 ? 's' : ''}`
              : 'Toutes lues'}
          </p>
        </div>

        {unreadCount > 0 && (
          <Button variant="secondary" onClick={handleMarkAllAsRead}>
            Tout marquer comme lu
          </Button>
        )}
      </div>

      {/* État vide */}
      {notifications.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-neutral">Aucune notification.</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`bg-white rounded-lg shadow-sm p-4 flex justify-between items-start ${
                !notification.lue ? 'border-l-4 border-primary' : ''
              }`}
            >
              <div className="flex-1">
                <p className={`text-sm ${!notification.lue ? 'font-semibold' : ''}`}>
                  {notification.message}
                </p>
                <p className="text-xs text-neutral mt-1">
                  {new Date(notification.dateCreation).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              <div className="flex gap-2 ml-4">
                {!notification.lue && (
                  <button
                    onClick={() => handleMarkAsRead(notification._id)}
                    className="text-xs text-primary hover:underline"
                  >
                    Marquer lue
                  </button>
                )}
                <button
                  onClick={() => handleDelete(notification._id)}
                  className="text-xs text-danger hover:underline"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Retour */}
      <button
        onClick={() => navigate('/dashboard')}
        className="text-sm text-primary hover:underline mt-6"
      >
        ← Retour au tableau de bord
      </button>
    </div>
  );
}

export default Notifications;