import type { Preview } from '@storybook/vue3';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { globalDecorators } from './decorators';
import '@/style.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },

    viewport: {
      viewports: INITIAL_VIEWPORTS
    }
  }
};

export const decorators = globalDecorators;
export default preview;
