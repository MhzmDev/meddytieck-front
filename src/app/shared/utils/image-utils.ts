import { environment } from '../../../environments/environment';

export function getImageUrl(url: string | null | undefined) {
  if (!url) return null;
  return `${environment.baseUrl}/Images/${url}`;
}
