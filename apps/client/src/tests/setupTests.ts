import { vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

setActivePinia(createPinia());

vi.mock('primevue/usetoast', () => ({
  useToast: vi.fn(() => ({ add: vi.fn() })),
}));
