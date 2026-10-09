import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config';

class SupabaseService {
  private client: SupabaseClient | null = null;
  public isConnected: boolean = false;

  constructor() {
    if (config.supabase.url && config.supabase.serviceRoleKey) {
      try {
        this.client = createClient(config.supabase.url, config.supabase.serviceRoleKey, {
          auth: { persistSession: false },
        });
        this.isConnected = true;
        console.log('[Supabase]: Connected to remote PostgreSQL database.');
      } catch (err: any) {
        console.warn('[Supabase]: Failed to initialize client, fallback enabled.', err.message);
      }
    } else {
      console.log('[Supabase]: Credentials not configured. Using active in-memory / state persistence layer.');
    }
  }

  getClient(): SupabaseClient | null {
    return this.client;
  }
}

export const supabaseService = new SupabaseService();
