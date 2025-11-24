import { describe, it } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import ConfigFormNumberTemplate from '@/components/ConfigFormNumberTemplate.vue';

describe('ConfigFormNumberTemplate', () => {
  it('renders component', () => {
    const wrapper = mount(ConfigFormNumberTemplate, {
      global: {
        plugins: [PrimeVue],
      },
    });

    wrapper.get('[data-test="config-number"]');
    wrapper.get('[data-test="config-submit"]');
  });
});
