import React, { useEffect, useState } from 'react';
import {Star} from 'lucide-react';
import { adminApi } from '../../../API/endpoints/adminApi.js';

const TopPerformers = ({ compact = false, performers: performersProp }) => {
  const [performers, setPerformers] = useState(performersProp || []);
  const [loading, setLoading] = useState(!performersProp);
  const [error, setError] = useState('');

  useEffect(() => {
    if (performersProp && performersProp.length) {
      setPerformers(performersProp);
      setLoading(false);
      return;
    }

    let active = true;

    const loadPerformers = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await adminApi.getDashboardOverview();
        if (!data || typeof data !== 'object' || Array.isArray(data)) {
          throw new Error('Dashboard API returned invalid data.');
        }
        if (!active) return;

        const list = Array.isArray(data.topPerformingChws) ? data.topPerformingChws : [];
        const mapped = list.map((item) => ({
          id: item.id,
          name: item.name,
          patients: item.monthlyVisits ?? 0,
          rating: item.rating ?? '0',
        }));
        setPerformers(mapped);
      } catch (err) {
        if (active) {
          setError(err.message || 'Failed to load performers');
          setPerformers([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadPerformers();

    return () => {
      active = false;
    };
  }, [performersProp]);

  const sortedPerformers = [...performers].sort(
    (a, b) => Number(b.patients || 0) - Number(a.patients || 0)
  );
  const visiblePerformers = compact ? sortedPerformers.slice(0, 4) : sortedPerformers;

  return (
    <div className="bg-white border border-gray-200">
      <div className={`${compact ? 'px-3 py-2' : 'px-6 py-4'} border-b border-gray-200`}>
        <h3 className={`${compact ? 'text-sm' : 'text-lg'} font-semibold`}>Top Performing CHWs</h3>
      </div>
      <div className={compact ? 'p-3' : 'p-6'}>
        {loading && <p className="text-xs text-gray-500">Loading performers...</p>}
        {error && <p className="text-xs text-red-600">{error}</p>}
        {!loading && !error && (
          <div className={compact ? 'space-y-2' : 'space-y-4'}>
            {visiblePerformers.map((performer, index) => (
              <div
                key={performer.id}
                className={`flex items-center justify-between rounded-lg hover:bg-gray-50 transition-colors ${compact ? 'p-2' : 'p-3'}`}
              >
                <div className={compact ? 'flex items-center space-x-2' : 'flex items-center space-x-3'}>
                  <div className={`${compact ? 'w-6 h-6 text-xs' : 'w-8 h-8'} flex items-center justify-center`}>
                    <span className="text-blue-700">#{index + 1}</span>
                  </div>
                  <div>
                    <p className={compact ? 'text-xs font-medium' : ''}>{performer.name}</p>
                    <p className="text-xs text-gray-500">{performer.patients} patients</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-blue-500" />
                    <span className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700 ml-1`}>
                      {performer.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {!visiblePerformers.length && (
              <p className="text-xs text-gray-500">No performers available yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopPerformers;