import ItemComponent from '../components/Item';
import { shallow, mount} from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeItem = {
  id: 'asdgf',
  title:'asdf',
  price:'334',
  description:'13241 25rbdt hrtgwfgwfgwr ',
  image:'asdlf.jpg',
  largeImage:'wlgreaihbvjk.jpg',
}



describe('<Item/>', () => {
  it('Displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});