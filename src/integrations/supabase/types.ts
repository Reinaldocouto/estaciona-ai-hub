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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          premium: boolean | null
          premium_until: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          premium?: boolean | null
          premium_until?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          premium?: boolean | null
          premium_until?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reservas: {
        Row: {
          created_at: string | null
          end_time: string
          id: string
          start_time: string
          status: string | null
          total_price: number | null
          user_id: string | null
          vaga_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_time: string
          id?: string
          start_time: string
          status?: string | null
          total_price?: number | null
          user_id?: string | null
          vaga_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_time?: string
          id?: string
          start_time?: string
          status?: string | null
          total_price?: number | null
          user_id?: string | null
          vaga_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservas_vaga_id_fkey"
            columns: ["vaga_id"]
            isOneToOne: false
            referencedRelation: "vagas"
            referencedColumns: ["id"]
          },
        ]
      }
      vagas: {
        Row: {
          available: boolean | null
          bairro: string | null
          cidade: string | null
          created_at: string | null
          discount_premium: boolean | null
          disponibilidade: Json | null
          endereco: string | null
          features: string[] | null
          id: string
          image_url: string | null
          lat: number | null
          lng: number | null
          owner_id: string | null
          preco_dia: number | null
          preco_hora: number | null
          preco_mes: number | null
          price: number
          rating: number | null
          recursos: string[] | null
          titulo: string
        }
        Insert: {
          available?: boolean | null
          bairro?: string | null
          cidade?: string | null
          created_at?: string | null
          discount_premium?: boolean | null
          disponibilidade?: Json | null
          endereco?: string | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          lat?: number | null
          lng?: number | null
          owner_id?: string | null
          preco_dia?: number | null
          preco_hora?: number | null
          preco_mes?: number | null
          price: number
          rating?: number | null
          recursos?: string[] | null
          titulo: string
        }
        Update: {
          available?: boolean | null
          bairro?: string | null
          cidade?: string | null
          created_at?: string | null
          discount_premium?: boolean | null
          disponibilidade?: Json | null
          endereco?: string | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          lat?: number | null
          lng?: number | null
          owner_id?: string | null
          preco_dia?: number | null
          preco_hora?: number | null
          preco_mes?: number | null
          price?: number
          rating?: number | null
          recursos?: string[] | null
          titulo?: string
        }
        Relationships: []
      }
    }
    Views: {
      mv_price_benchmarks: {
        Row: {
          amostra_dia: number | null
          amostra_hora: number | null
          amostra_mes: number | null
          bairro: string | null
          cidade: string | null
          p25_dia: number | null
          p25_hora: number | null
          p25_mes: number | null
          p5_dia: number | null
          p5_hora: number | null
          p5_mes: number | null
          p50_dia: number | null
          p50_hora: number | null
          p50_mes: number | null
          p75_dia: number | null
          p75_hora: number | null
          p75_mes: number | null
          p95_dia: number | null
          p95_hora: number | null
          p95_mes: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      refresh_price_benchmarks: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
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
