import { render, fireEvent } from '@testing-library/vue';
import { TABS_LIST_LABELS } from '@/constants/tabs-list-labels.ts';

import TabsListItem from '@/lib/tabs-list-item/tabs-list-item.vue';
import TabsList from './tabs-list.vue';

describe('tabs-list.vue', () => {

  // mocked tabs
  const tabs = [
    { label: TABS_LIST_LABELS.all, badge: 10 },
    { label: TABS_LIST_LABELS.onVacation, badge: 5 },
    { label: TABS_LIST_LABELS.onHolidays, badge: 2 }
  ];

  // helper render component fn
  const renderComponent = (activeTab = TABS_LIST_LABELS.all) => render(
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
    const { getByText } = renderComponent(TABS_LIST_LABELS.onVacation);

    // check if active tab has an active class
    const activeTabElement = getByText(TABS_LIST_LABELS.onVacation)
      .closest('.tabs-list-item');

    expect(activeTabElement).toHaveClass('active');

    // check if another tab doesn't have an active class
    const inactiveTabElement = getByText(TABS_LIST_LABELS.all)
      .closest('.tabs-list-item');

    expect(inactiveTabElement).not.toHaveClass('active');
  });

  it('emits "set-active-tab" event when a tab is clicked', async () => {
    const { getByText, emitted } = renderComponent();

    // get on holidays tab and emit it
    const tabElement = getByText(TABS_LIST_LABELS.onHolidays);
    await fireEvent.click(tabElement);

    // check if emitted tab equals to a clicked tab
    expect(emitted()['set-active-tab']).toBeTruthy();
    expect(emitted()['set-active-tab'][0])
      .toEqual([TABS_LIST_LABELS.onHolidays]);
  });
});
