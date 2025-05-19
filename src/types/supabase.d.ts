export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      address: {
        Row: {
          address_id: string
          city: string | null
          country: string | null
          created_at: string
          log_id: string | null
          sigungu: string | null
        }
        Insert: {
          address_id?: string
          city?: string | null
          country?: string | null
          created_at?: string
          log_id?: string | null
          sigungu?: string | null
        }
        Update: {
          address_id?: string
          city?: string | null
          country?: string | null
          created_at?: string
          log_id?: string | null
          sigungu?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "address_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "log"
            referencedColumns: ["log_id"]
          },
        ]
      }
      follow: {
        Row: {
          follow_id: number
          follower_id: string | null
          following_id: string | null
        }
        Insert: {
          follow_id?: number
          follower_id?: string | null
          following_id?: string | null
        }
        Update: {
          follow_id?: number
          follower_id?: string | null
          following_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "follow_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "follow_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      log: {
        Row: {
          created_at: string
          description: string | null
          log_id: string
          thumbnail_url: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          log_id?: string
          thumbnail_url: string
          title: string
          user_id?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          log_id?: string
          thumbnail_url?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      log_bookmark: {
        Row: {
          log_bookmark_id: number
          log_id: string | null
          user_id: string | null
        }
        Insert: {
          log_bookmark_id?: number
          log_id?: string | null
          user_id?: string | null
        }
        Update: {
          log_bookmark_id?: number
          log_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "log_bookmark_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "log"
            referencedColumns: ["log_id"]
          },
          {
            foreignKeyName: "log_bookmark_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      log_tag: {
        Row: {
          category: string | null
          log_id: string | null
          log_tag_id: number
          tag: string | null
        }
        Insert: {
          category?: string | null
          log_id?: string | null
          log_tag_id?: number
          tag?: string | null
        }
        Update: {
          category?: string | null
          log_id?: string | null
          log_tag_id?: number
          tag?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "log_tag_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "log"
            referencedColumns: ["log_id"]
          },
        ]
      }
      place: {
        Row: {
          address: string
          category: string
          created_at: string
          description: string | null
          log_id: string
          name: string
          place_id: string
          updated_at: string | null
        }
        Insert: {
          address: string
          category: string
          created_at?: string
          description?: string | null
          log_id: string
          name: string
          place_id?: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          category?: string
          created_at?: string
          description?: string | null
          log_id?: string
          name?: string
          place_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "place_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "log"
            referencedColumns: ["log_id"]
          },
        ]
      }
      place_bookmark: {
        Row: {
          place_bookmark_id: number
          place_id: string | null
          user_id: string | null
        }
        Insert: {
          place_bookmark_id?: number
          place_id?: string | null
          user_id?: string | null
        }
        Update: {
          place_bookmark_id?: number
          place_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "place_bookmark_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "place"
            referencedColumns: ["place_id"]
          },
          {
            foreignKeyName: "place_bookmark_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      place_images: {
        Row: {
          image_path: string
          order: number
          place_id: string
          place_image_id: number
        }
        Insert: {
          image_path: string
          order: number
          place_id?: string
          place_image_id?: number
        }
        Update: {
          image_path?: string
          order?: number
          place_id?: string
          place_image_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "place_images_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "place"
            referencedColumns: ["place_id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          description: string | null
          email: string | null
          image_url: string | null
          insta_id: string | null
          is_deleted: boolean | null
          nickname: string | null
          provider: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          email?: string | null
          image_url?: string | null
          insta_id?: string | null
          is_deleted?: boolean | null
          nickname?: string | null
          provider?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          email?: string | null
          image_url?: string | null
          insta_id?: string | null
          is_deleted?: boolean | null
          nickname?: string | null
          provider?: string | null
          user_id?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
