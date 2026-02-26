const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function padTwoDigits(value: number): string {
  return String(value).padStart(2, '0');
}

export function formatToLocal(utcString: string): string {
  const date = new Date(utcString);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const year = date.getFullYear();
  const month = padTwoDigits(date.getMonth() + 1);
  const day = padTwoDigits(date.getDate());
  const hours = padTwoDigits(date.getHours());
  const minutes = padTwoDigits(date.getMinutes());

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function daysAgo(utcString: string): number {
  const date = new Date(utcString);
  if (Number.isNaN(date.getTime())) {
    return 0;
  }

  const diffMs = Date.now() - date.getTime();
  return Math.max(0, Math.floor(diffMs / ONE_DAY_MS));
}
