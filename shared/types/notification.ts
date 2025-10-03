import { NotificationType, Roles } from "@shared/enums";


export interface NotificationAttribute {
  id?: string;
  user_id?: string | null;         
  role_target: Roles | null; 
  is_global?: boolean;              
  type: NotificationType;         
  title: string;                  
  message: string;                
  meta_data?: Record<string, any>; 
  is_read?: boolean;                
  read_at?: Date | null;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}
