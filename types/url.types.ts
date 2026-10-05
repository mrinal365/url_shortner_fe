export interface UrlItem {
  id: number | string;
  originalUrl: string;
  shortCode: string;
  shortUrl?: string;
  customAlias?: string | null;
  title?: string | null;
  clicks: number;
  userId?: number | null;
  createdAt: string;
  updatedAt?: string;
  expiresAt?: string | null;
  isActive?: boolean;
}

export interface CreateUrlPayload {
  originalUrl: string;
  customAlias?: string;
  title?: string;
  expiresAt?: string;
}

export interface UpdateUrlPayload {
  title?: string;
  customAlias?: string;
  expiresAt?: string | null;
  isActive?: boolean;
}

export interface ClickDataPoint {
  date: string;
  count: number;
}

export interface DeviceDataPoint {
  device: string;
  count: number;
}

export interface BrowserDataPoint {
  browser: string;
  count: number;
}

export interface CountryDataPoint {
  country: string;
  count: number;
}

export interface ReferrerDataPoint {
  referrer: string;
  count: number;
}

export interface RecentClickEvent {
  id?: string | number;
  ip?: string;
  referrer?: string;
  country?: string;
  device?: string;
  browser?: string;
  timestamp: string;
}

export interface UrlAnalytics {
  urlId: number | string;
  shortCode: string;
  totalClicks: number;
  uniqueClicks?: number;
  clicksByDate: ClickDataPoint[];
  clicksByDevice: DeviceDataPoint[];
  clicksByBrowser: BrowserDataPoint[];
  clicksByCountry: CountryDataPoint[];
  clicksByReferrer: ReferrerDataPoint[];
  recentClicks: RecentClickEvent[];
}

export interface UrlState {
  items: UrlItem[];
  selectedUrl: UrlItem | null;
  activeAnalytics: UrlAnalytics | null;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}
