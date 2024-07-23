import { render, fireEvent } from '@testing-library/vue';
import TabsListItem from '@/lib/tabs-list-item/tabs-list-item.vue';
import TabsList from './tabs-list.vue';

describe('tabs-list.vue', () => {

  // mock tabs
  const tabs = [
    { label: 'All', badge: 10 },
    { label: 'On Vacation', badge: 5 },
    { label: 'On Holidays', badge: 3 }
  ];

  // helper render component fn
  const renderComponent = (activeTab = 'All') => render(
    TabsList,
    {
      props: {
        tabs,
        activeTab
      },
      global: {
        components: { TabsListItem }
      }
    }
  );

  it('renders all tabs with correct labels and badges', () => {
    const { getByText } = renderComponent();

    // render all the tabs
    tabs.forEach((tab) => {

      // get element by text
      const tabElement = getByText(tab.label).closest('.tabs-list-item');

      // check if the tab is rendered
      expect(tabElement).toBeInTheDocument();
      expect(tabElement).toHaveTextContent(tab.label);
    });
  });

  it('applies active class to the active tab', () => {
    const { getByText } = renderComponent('On Vacation');

    // check if active tab has an active class
    const activeTabElement = getByText('On Vacation')
      .closest('.tabs-list-item');

    expect(activeTabElement).toHaveClass('active');

    // check if another tab doesn't have an active class
    const inactiveTabElement = getByText('All')
      .closest('.tabs-list-item');

    expect(inactiveTabElement).not.toHaveClass('active');
  });

  it('emits "set-active-tab" event when a tab is clicked', async () => {
    const { getByText, emitted } = renderComponent();

    // get on holidays tab and emit it
    const tabElement = getByText('On Holidays');
    await fireEvent.click(tabElement);

    // check if emitted tab equals to a clicked tab
    expect(emitted()['set-active-tab']).toBeTruthy();
    expect(emitted()['set-active-tab'][0])
      .toEqual(['On Holidays']);
  });
});
