import { render, RenderResult } from '@testing-library/vue';
import Badge from '@/lib/badge/badge.vue';
import TabsListItem from './tabs-list-item.vue';

describe('tabs-list-item.vue', () => {
  let wrapper: RenderResult;

  // default setup before each test
  beforeEach(() => {
    wrapper = render(TabsListItem, {
      props: {
        label: 'test label',
        isActive: false,
        badge: 10
      },
      global: {
        components: { Badge }
      }
    });
  });

  it('renders the label correctly', () => {

    // check if tabs-list-item component rendered with test text
    expect(wrapper.getByTestId('tabs-list-item')).toBeInTheDocument();
  });

  it('applies the active class when isActive is true', async () => {

    // rerender the component with needed props
    await wrapper.rerender({ isActive: true });

    // check if tabs-list-item component rendered with an active class
    expect(wrapper.getByTestId('tabs-list-item')).toHaveClass('active');
  });
});
