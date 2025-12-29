import { describe, it } from 'vitest';
import { mount } from '@vue/test-utils';
import ConfigFormNumber from '@/components/ConfigFormNumber.vue';
import { configBonusPercentScheme } from '@packages/shared';
import { markRaw } from 'vue';

describe('ConfigFormNumber', () => {
  it('renders component', () => {
    const wrapper = mount(ConfigFormNumber, {
      props: {
        configKey: 'bonusPercent',
        title: 'title',
        zodScheme: markRaw(configBonusPercentScheme),
      },
    });

    wrapper.get('[data-test="config-number"]');
    wrapper.get('[data-test="config-submit"]');
  });
});
