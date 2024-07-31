import type { RenderResult } from '@testing-library/vue';
import { render } from '@testing-library/vue';
import Badge from './badge.vue';

describe('badge.vue', () => {

  let wrapper: RenderResult;

  // default setup before each test
  beforeEach(() => {
    wrapper = render(Badge, {
      props: { label: 'Test Label', type: 'light' }
    });
  });

  it('renders the correct label', async () => {

    // check if badge component is rendered with some text
    expect(wrapper.getByTestId('badge')).toHaveTextContent('Test Label');
  });

  it('applies the dark class when type is "dark"', async () => {

    // rerender the component
    await wrapper.rerender({ type: 'dark' });

    // check if badge component is rendered with a dark class
    expect(wrapper.getByTestId('badge')).toHaveClass('dark')
  });
});
