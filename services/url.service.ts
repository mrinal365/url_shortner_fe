import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants/api.constants';
import type {
  UrlItem,
  CreateUrlPayload,
  UpdateUrlPayload,
  UrlAnalytics,
} from '@/types/url.types';

export async function getUrls(): Promise<UrlItem[]> {
  const { data } = await apiClient.get<UrlItem[]>(API_ENDPOINTS.URLS.GET_ALL);
  return data;
}

export async function getUrlById(idOrCode: string | number): Promise<UrlItem> {
  const { data } = await apiClient.get<UrlItem>(
    API_ENDPOINTS.URLS.GET_ONE(idOrCode)
  );
  return data;
}

export async function createUrl(payload: CreateUrlPayload): Promise<UrlItem> {
  const { data } = await apiClient.post<UrlItem>(
    API_ENDPOINTS.URLS.CREATE,
    payload
  );
  return data;
}

export async function updateUrl(
  id: string | number,
  payload: UpdateUrlPayload
): Promise<UrlItem> {
  const { data } = await apiClient.put<UrlItem>(
    API_ENDPOINTS.URLS.UPDATE(id),
    payload
  );
  return data;
}

export async function deleteUrl(id: string | number): Promise<void> {
  await apiClient.delete(API_ENDPOINTS.URLS.DELETE(id));
}

export async function getUrlAnalytics(
  idOrCode: string | number
): Promise<UrlAnalytics> {
  const { data } = await apiClient.get<UrlAnalytics>(
    API_ENDPOINTS.URLS.ANALYTICS(idOrCode)
  );
  return data;
}

export async function checkAliasAvailability(
  alias: string
): Promise<{ available: boolean }> {
  const { data } = await apiClient.get<{ available: boolean }>(
    API_ENDPOINTS.URLS.CUSTOM_ALIAS_CHECK(alias)
  );
  return data;
}
