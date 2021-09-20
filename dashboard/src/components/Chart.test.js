import Enzyme, { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Chart from './Chart';
import gas10Api from './gas10Api.json';
Enzyme.configure({ adapter: new Adapter() });

describe('Chart tests', () => {
    it('should render chart correctly', () => {
        const match = {
            path: '/',
            url: '/',
            isExact: true,
            params: {}
        };

        const component = shallow(
            <Chart match={match} data={gas10Api} setTotal={(e) => { return null}} />
        );

        expect(toJSON(component)).toMatchSnapshot();
    });
});
