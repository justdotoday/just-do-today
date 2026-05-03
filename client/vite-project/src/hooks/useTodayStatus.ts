import { useEffect, useState } from 'react';
import { getTodayStatus, type TodayStatus } from '../api/member';

export const useTodayStatus = (open: boolean) => {
  const [status, setStatus] = useState<TodayStatus | null>(null);

  useEffect(() => {
    if (!open) return;
    getTodayStatus().then(setStatus).catch(() => setStatus(null));
  }, [open]);

  return status;
};
