import { FindFilter } from "./FindFilter.styled";
import PropTypes from 'prop-types';

export const Filter = ({ filter, onChangeFilter }) => {
    return (
        <FindFilter>
            Find contacts by name
            <input type="text" value={filter} placeholder="Find contact" onChange={onChangeFilter} />
        </FindFilter>
    )
};

Filter.propTypes = {
    onChangeFilter: PropTypes.func.isRequired,
    filter:PropTypes.string,
    
}