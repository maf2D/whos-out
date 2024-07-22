import type { Decorator } from '@storybook/vue3';

const logDecorator: Decorator = (story, context) => {
  console.log({ context });

  return ({
    components: { story },
    template: '<story />'
  });
};

export const globalDecorators = [logDecorator];
