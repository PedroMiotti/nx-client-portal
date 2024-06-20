import { format, parseISO } from "date-fns";
import { pt } from "date-fns/locale";

/**
 * patterns:
 * - "dd MMM, HH:mm" = 01 Jan, 00:00
 * - "dd MMM, HH:mm:ss" = 01 Jan, 00:00:00
 * - "dd MMM yyyy, HH:mm" = 01 Jan 2021, 00:00
 * - "dd MMM yyyy, HH:mm:ss" = 01 Jan 2021, 00:00:00
 * - "dd MMM yyyy" = 01 Jan 2021
 * - "dd MMM" = 01 Jan
 * - "HH:mm" = 00:00
 * - "HH:mm:ss" = 00:00:00
 * - "yyyy-MM-dd" = 2021-01-01
 */
export const formatDateToPattern = (date: string, pattern: string) => {
  const formattedDate = format(new Date(date), pattern, { locale: pt });
  return formattedDate;
};

export function formatDate(date: string): string {
  if (!date) return "";
  return format(parseISO(date), "yyyy-MM-dd");
}

export const formatSimpleDate = (date: string): string => {
  if (!date) return "";
  return format(new Date(date), "dd MMM", { locale: pt });
};
export function formatDateTime(date: string): string {
  if (!date) return "";
  return format(parseISO(date), "dd/MM/yyyy HH:mm");
}
