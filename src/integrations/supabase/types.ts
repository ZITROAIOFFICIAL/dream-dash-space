export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bet_history: {
        Row: {
          ai_data_count: number | null
          best_bookmaker: string | null
          best_odds: number | null
          bet_type: string
          bet_units: string | null
          block_id: string
          created_at: string
          id: string
          match_date: string | null
          match_time: string | null
          multiplier: number | null
          odds: number | null
          over_under_stat_type: string | null
          over_under_type: string | null
          over_under_value: string | null
          result: string | null
          shop_domain: string
          sport_type: string
          spread_team: string | null
          spread_value: string | null
          team1_logo: string | null
          team1_name: string
          team2_logo: string | null
          team2_name: string
          win_percentage: number | null
        }
        Insert: {
          ai_data_count?: number | null
          best_bookmaker?: string | null
          best_odds?: number | null
          bet_type: string
          bet_units?: string | null
          block_id: string
          created_at?: string
          id?: string
          match_date?: string | null
          match_time?: string | null
          multiplier?: number | null
          odds?: number | null
          over_under_stat_type?: string | null
          over_under_type?: string | null
          over_under_value?: string | null
          result?: string | null
          shop_domain: string
          sport_type: string
          spread_team?: string | null
          spread_value?: string | null
          team1_logo?: string | null
          team1_name: string
          team2_logo?: string | null
          team2_name: string
          win_percentage?: number | null
        }
        Update: {
          ai_data_count?: number | null
          best_bookmaker?: string | null
          best_odds?: number | null
          bet_type?: string
          bet_units?: string | null
          block_id?: string
          created_at?: string
          id?: string
          match_date?: string | null
          match_time?: string | null
          multiplier?: number | null
          odds?: number | null
          over_under_stat_type?: string | null
          over_under_type?: string | null
          over_under_value?: string | null
          result?: string | null
          shop_domain?: string
          sport_type?: string
          spread_team?: string | null
          spread_value?: string | null
          team1_logo?: string | null
          team1_name?: string
          team2_logo?: string | null
          team2_name?: string
          win_percentage?: number | null
        }
        Relationships: []
      }
      live_member_count: {
        Row: {
          created_at: string | null
          current_count: number
          current_target: number
          id: string
          last_updated: string | null
        }
        Insert: {
          created_at?: string | null
          current_count?: number
          current_target?: number
          id?: string
          last_updated?: string | null
        }
        Update: {
          created_at?: string | null
          current_count?: number
          current_target?: number
          id?: string
          last_updated?: string | null
        }
        Relationships: []
      }
      parlay_history: {
        Row: {
          ai_data_count: number | null
          best_bookmaker: string | null
          best_odds: number | null
          bet_units: string | null
          block_id: string
          created_at: string
          id: string
          legs: Json
          match_date: string | null
          match_time: string | null
          multiplier: number | null
          odds: number | null
          result: string | null
          shop_domain: string
          sport_type: string
          win_percentage: number | null
        }
        Insert: {
          ai_data_count?: number | null
          best_bookmaker?: string | null
          best_odds?: number | null
          bet_units?: string | null
          block_id: string
          created_at?: string
          id?: string
          legs?: Json
          match_date?: string | null
          match_time?: string | null
          multiplier?: number | null
          odds?: number | null
          result?: string | null
          shop_domain: string
          sport_type: string
          win_percentage?: number | null
        }
        Update: {
          ai_data_count?: number | null
          best_bookmaker?: string | null
          best_odds?: number | null
          bet_units?: string | null
          block_id?: string
          created_at?: string
          id?: string
          legs?: Json
          match_date?: string | null
          match_time?: string | null
          multiplier?: number | null
          odds?: number | null
          result?: string | null
          shop_domain?: string
          sport_type?: string
          win_percentage?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
