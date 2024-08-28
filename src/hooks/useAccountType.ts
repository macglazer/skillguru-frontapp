// Libraries
import {useSelector} from 'react-redux';
// Selectors
import {getRole} from 'src/redux/selectors/authSelectors';

export const useAccountType = () => {
	const role = useSelector(getRole);

	return {isMentor: role === 'M', isStudent: role === 'S'};
};
