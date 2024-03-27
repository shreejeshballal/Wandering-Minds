/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isNullOrUndefined = (value: any): value is null | undefined => {
  return value === null || value === undefined;
};

export const isEmpty = (value: any): boolean => {
  if (value instanceof File) {
    return value.size === 0;
  }
  if (isNullOrUndefined(value)) {
    return true;
  }
  if (typeof value === "string") {
    return value.trim().length === 0;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === "object") {
    console.log(Object.keys(value).length === 0);
    return Object.keys(value).length === 0;
  }

  return false;
};

export const checkEmptyfields = (fields: any) => {
  return fields.some((field: any) => isEmpty(field.value));
};

export const formatDate = (date: string) => {
  const d = new Date(date);

  const month = d.toLocaleString("default", { month: "short" });
  const day = d.getDate();
  // let year = d.getFullYear();
  // year = year.toString().slice(2, 4);

  return `${day} ${month}`;
};

export const getImageUrl = (file: any) => {
  const url = URL.createObjectURL(file);
  return url;
};
