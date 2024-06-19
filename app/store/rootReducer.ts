import { reducer as toastrReducer } from 'react-redux-toastr'

import { reducer as useReducer } from './user/user.slice'

export const reducers = {
	user: useReducer,
	toastr: toastrReducer,
}
