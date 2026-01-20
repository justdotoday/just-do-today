export type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';
export type Day = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export type CreateHabitPayload = {
  name: string;
  category: string;
  frequency: Frequency;
  days?: Day[];
  isPublic: boolean;
};
