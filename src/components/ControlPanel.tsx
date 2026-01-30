'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { OverlayData } from '@/types/overlay';

export default function ControlPanel() {
  const router = useRouter();
  const [data, setData] = useState<OverlayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch('/api/overlay', {
        cache: 'no-store',
      });
      const result = await response.json();

      if (result.success && result.data) {
        setData(result.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!data) return;

    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          team1_name: data.team1_name,
          team1_score: data.team1_score,
          team2_name: data.team2_name,
          team2_score: data.team2_score,
          best_of: data.best_of,
          match_stage: data.match_stage,
          current_map: data.current_map,
          running_text: data.running_text,
          organizer_name: data.organizer_name,
          overlay_scale: data.overlay_scale,
          winner_title: data.winner_title,
          winner_team_name: data.winner_team_name,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage('✓ Updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('✗ Failed to update: ' + result.error);
      }
    } catch (error) {
      setMessage('✗ Error updating overlay');
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  function updateField<K extends keyof OverlayData>(field: K, value: OverlayData[K]) {
    if (!data) return;
    setData({ ...data, [field]: value });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-600">Failed to load overlay data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SSL 2026 Control Panel</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your overlay in real-time</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Info Box */}
        <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-3">🎮 OBS Overlay URLs</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <div>
              <strong>Scene 1 - Live Match:</strong>{' '}
              <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                {typeof window !== 'undefined' ? window.location.origin : ''}/live-overlay
              </code>
            </div>
            <div>
              <strong>Scene 2 - Winner:</strong>{' '}
              <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                {typeof window !== 'undefined' ? window.location.origin : ''}/winner-overlay
              </code>
            </div>
            <div>
              <strong>Scene 3 - Game Pause:</strong>{' '}
              <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                {typeof window !== 'undefined' ? window.location.origin : ''}/game-pause
              </code>
            </div>
            <div>
              <strong>Scene 4 - Game Break:</strong>{' '}
              <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                {typeof window !== 'undefined' ? window.location.origin : ''}/game-break
              </code>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-3">
            💡 Add each URL as a separate Browser Source in OBS (1920x1080)
          </p>
        </div>

        {/* Status Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.startsWith('✓')
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Teams Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Teams & Scores</h2>
            <div className="grid grid-cols-2 gap-6">
              {/* Team 1 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team 1 Name
                  </label>
                  <input
                    type="text"
                    value={data.team1_name}
                    onChange={(e) => updateField('team1_name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team 1 Score
                  </label>
                  <input
                    type="number"
                    value={data.team1_score}
                    onChange={(e) => updateField('team1_score', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>

              {/* Team 2 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team 2 Name
                  </label>
                  <input
                    type="text"
                    value={data.team2_name}
                    onChange={(e) => updateField('team2_name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team 2 Score
                  </label>
                  <input
                    type="number"
                    value={data.team2_score}
                    onChange={(e) => updateField('team2_score', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Match Info Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Match Information</h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Best Of</label>
                <input
                  type="number"
                  value={data.best_of}
                  onChange={(e) => updateField('best_of', parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Match Stage</label>
                <input
                  type="text"
                  value={data.match_stage}
                  onChange={(e) => updateField('match_stage', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="GRAND FINAL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Map</label>
                <input
                  type="text"
                  value={data.current_map}
                  onChange={(e) => updateField('current_map', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="LAND OF DAWN"
                />
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Running Text (Marquee)
                </label>
                <input
                  type="text"
                  value={data.running_text}
                  onChange={(e) => updateField('running_text', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Selamat Datang di SIJA Super League 2026"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organizer Name
                  </label>
                  <input
                    type="text"
                    value={data.organizer_name}
                    onChange={(e) => updateField('organizer_name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="SIJA SMKN 1 CIMAHI"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Overlay Scale (%)
                  </label>
                  <input
                    type="number"
                    value={data.overlay_scale}
                    onChange={(e) => updateField('overlay_scale', parseInt(e.target.value) || 100)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="50"
                    max="150"
                    step="5"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Adjust zoom level for OBS (90-110% recommended)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Winner Scene Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🏆 Winner Scene Settings</h2>
            <p className="text-sm text-gray-500 mb-4">
              Configure winner announcement (Scene 2 - /winner-overlay)
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Winner Title
                </label>
                <input
                  type="text"
                  value={data.winner_title}
                  onChange={(e) => updateField('winner_title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="MATCH WINNER / GAME WINNER"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Examples: MATCH WINNER, GAME WINNER, TOURNAMENT CHAMPION
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Winner Team Name
                </label>
                <input
                  type="text"
                  value={data.winner_team_name}
                  onChange={(e) => updateField('winner_team_name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="SMKN 1 CIMAHI"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the winning team name
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800">
                💡 <strong>Quick Setup:</strong> Update winner info here, save, then switch to Scene 2 in OBS to display the winner overlay
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Updating...' : 'Update Overlay'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
