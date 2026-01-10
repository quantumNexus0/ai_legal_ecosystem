import React from 'react';
import { Clock, Calendar, User, Trash2, MessageCircle } from 'lucide-react';

import { dashboardService } from '../../../services/dashboardService';

import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { useChatStore } from '../../../store/chatStore';

const AppointmentsList = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { startChat } = useChatStore();
  const [appointments, setAppointments] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  // ... existing code ...

  React.useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await dashboardService.getLawyerAppointments();
        setAppointments(data);
      } catch (error) {
        console.error('Failed to fetch lawyer appointments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  if (loading) return <div className="p-4 text-gray-500">Loading appointments...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
        {user?.role === 'lawyer' && (
          <button
            onClick={() => navigate('/dashboard/appointments/new')}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            New Appointment
          </button>
        )}
      </div>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{appointment.title}</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {appointment.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {appointment.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    With: {appointment.with_ || appointment.with}
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">{appointment.type}</p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${appointment.status === 'Confirmed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {appointment.status}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const otherId = user?.role === 'lawyer' ? appointment.client_id : appointment.lawyer_id;
                      const otherName = appointment.with_ || appointment.with;
                      startChat({ id: otherId, name: otherName });
                      navigate('/dashboard?tab=messages');
                    }}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    title="Message"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  {user?.role === 'lawyer' && (
                    <button
                      onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this appointment?')) {
                          try {
                            await dashboardService.deleteAppointment(appointment.id);
                            setAppointments(appointments.filter(a => a.id !== appointment.id));
                          } catch (error) {
                            console.error('Failed to delete appointment:', error);
                            alert('Failed to delete appointment');
                          }
                        }
                      }}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      title="Delete Appointment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsList;