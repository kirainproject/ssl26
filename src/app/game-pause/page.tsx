import GamePauseOverlay from '@/components/GamePauseOverlay';

export const metadata = {
  title: 'SSL 2026 - Game Pause',
  description: 'Game pause overlay for OBS',
};

export default function GamePausePage() {
  return <GamePauseOverlay />;
}
