export interface OverlayData {
  id: string;
  team1_name: string;
  team1_score: number;
  team2_name: string;
  team2_score: number;
  best_of: number;
  match_stage: string;
  current_map: string;
  running_text: string;
  organizer_name: string;
  organizer_logo: string | null;
  ssl_logo: string | null;
  overlay_scale: number;
  winner_title: string;
  winner_team_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OverlayUpdateData {
  team1_name?: string;
  team1_score?: number;
  team2_name?: string;
  team2_score?: number;
  best_of?: number;
  match_stage?: string;
  current_map?: string;
  running_text?: string;
  organizer_name?: string;
  overlay_scale?: number;
  winner_title?: string;
  winner_team_name?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
