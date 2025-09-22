import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import dayjs from "dayjs";

export const formatDate = (
  dateString: string | Date,
  format = "DD MMM, YYYY",
) => {
  return dayjs(dateString).format(format);
};


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
