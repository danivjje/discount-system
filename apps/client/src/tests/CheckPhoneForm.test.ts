import { describe, it } from 'vitest';
import { mount } from '@vue/test-utils';
import CheckPhoneForm from '@/components/CheckPhoneForm.vue';

describe('CheckPhoneForm', () => {
  it('renders component', () => {
    const wrapper = mount(CheckPhoneForm);

    wrapper.get('[data-test="check-phone"]');
    wrapper.get('[data-test="check-submit"]');
  });
});
