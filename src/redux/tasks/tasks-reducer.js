const INITIAL_STATE = {
    projects: null,
    isFetching: false,
    errorMessage: undefined
};

const tasksReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FETCH_TASKS_START":
            return {
                ...state,
                isFetching: true
            };
        case "FETCH_TASKS_SUCCESS":
            return {
                ...state,
                isFetching: false,
                tasks: action.payload
            };
        case "FETCH_TASKS_FAILURE":
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};

export default tasksReducer;