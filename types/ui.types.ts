export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

export type ModalType =
  | 'CREATE_URL'
  | 'EDIT_URL'
  | 'DELETE_CONFIRM'
  | 'QR_CODE'
  | 'VIEW_STATS'
  | null;

export interface ModalState {
  type: ModalType;
  isOpen: boolean;
  data?: Record<string, unknown> | null;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface UiState {
  theme: ThemeMode;
  toasts: ToastMessage[];
  modal: ModalState;
  isSidebarOpen: boolean;
  isGlobalLoading: boolean;
}
