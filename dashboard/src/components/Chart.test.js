import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Chart from './Chart';
import gas10Api from './gas10Api.json';

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
