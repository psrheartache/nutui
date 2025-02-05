import { Row } from '@nutui/nutui';
import { mount } from '@vue/test-utils';

test('should add "nut-row-flex-nowrap" class when wrap prop is false', () => {
  const wrapper = mount(Row, {
    props: {
      wrap: 'nowrap'
    }
  });
  expect(wrapper.classes()).toContain('nut-row-flex-nowrap');
});
