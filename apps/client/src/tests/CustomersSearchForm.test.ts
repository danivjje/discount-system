import CustomersSearchForm from '@/components/CustomersSearchForm.vue';
import { mount } from '@vue/test-utils';
import { describe, it } from 'vitest';

describe('CustomersSearchForm', () => {
  it('renders component', () => {
    const wrapper = mount(CustomersSearchForm);

    wrapper.get('[data-test="customers-search-input"]');
    wrapper.get('[data-test="customers-search-submit"]');
  });
});
