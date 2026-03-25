export function normalizePrimitive(value, fallback = null) {
  return value === undefined || value === null ? fallback : value;
}

export function safeString(value, fallback = "") {
  if (value === undefined || value === null) return fallback;
  return String(value);
}

export function safeNumber(value, fallback = 0) {
  const converted = Number(value);
  return Number.isFinite(converted) ? converted : fallback;
}

export function normalizeStatus(value, fallback = "UNKNOWN") {
  return safeString(value, fallback).trim().toUpperCase();
}

export function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

export function normalizePagedResult(response) {
  if (!response || typeof response !== "object") {
    return {
      items: [],
      page: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0,
    };
  }

  const content = Array.isArray(response.content)
    ? response.content
    : Array.isArray(response.items)
      ? response.items
      : [];

  return {
    items: content,
    page: safeNumber(response.page, 0),
    size: safeNumber(response.size, content.length),
    totalElements: safeNumber(response.totalElements, content.length),
    totalPages: safeNumber(response.totalPages, content.length > 0 ? 1 : 0),
  };
}
