/**
 * The utility function to create composite reducer from an object mapping from action types to handlers.
 * @param {object} initialState
 * @param {object} handlers
 */
 export default function createReducer(initialState, handlers = {}) {

    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else if (handlers.hasOwnProperty("default")) {
            return handlers["default"](state, action);
        } else {
            return state;
        }
    };
};