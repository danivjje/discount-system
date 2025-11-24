import { describe, it } from 'vitest';
import { mount } from '@vue/test-utils';
import EnrollBonusesForm from '@/components/EnrollBonusesForm.vue';
import PrimeVue from 'primevue/config';

describe('EnrollBonusesForm', () => {
  it('renders component', () => {
    const wrapper = mount(EnrollBonusesForm, {
      global: {
        plugins: [PrimeVue],
      },
    });

    wrapper.get('[data-test="enroll-phone"]');
    wrapper.get('[data-test="enroll-sum"]');
    wrapper.get('[data-test="enroll-submit"]');
  });
});
