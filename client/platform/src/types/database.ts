// src/types/database.ts

export interface Message {
    id: string;
    content: string;
    sender_id: string;
    receiver_id: string;
    read: boolean;
    created_at: string;  // ISO string or timestamp
    updated_at: string;  // ISO string or timestamp
  }
  