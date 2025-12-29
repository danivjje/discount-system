import { describe, it } from 'vitest';
import { mount } from '@vue/test-utils';
import LoginForm from '@/components/LoginForm.vue';

describe('LoginForm component', () => {
  it('renders component', () => {
    const wrapper = mount(LoginForm);

    wrapper.get('[data-test="auth-username"]');
    wrapper.get('[data-test="auth-password"]');
    wrapper.get('[data-test="auth-submit"]');
  });
});
