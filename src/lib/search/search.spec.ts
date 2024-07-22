import { render, fireEvent, waitFor, RenderResult } from '@testing-library/vue';
import IconSearch from '@/lib/icons/search/search.vue';
import Search from './search.vue';

describe('search.vue', () => {

  let wrapper: RenderResult;

  // default setup before each test
  beforeEach(() => {
    wrapper = render(Search, {
      props: {
        modelValue: '',
        placeholder: 'Search...'
      },
      global: {
        components: { IconSearch }
      }
    });
  });

  it('updates the modelValue on input', async () => {

    const inputElement = wrapper.getByTestId('search-input');
    const newValue = 'new search val';

    // fire input event
    await fireEvent.update(inputElement, newValue);

    // wait for the debounce time
    await waitFor(() => {
      expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([newValue]);
    });
  });

  it('renders the IconSearch component', () => {

    // check if the IconSearch component is rendered
    expect(wrapper.getByTestId('icon-search')).toBeInTheDocument();
  });
});