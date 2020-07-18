import {
    DELETE_SUBJECT,
    CREATE_SUBJECT,
    UPDATE_SUBJECT,
    SET_SUBJECT,
} from '../actions/subjects';

import SubjectName from '../../models/subjectName';

const initialState = {
    //availableProducts: [],
    userSubjects: [],
    //completedTasks: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SUBJECT:
            return {
                //availableProducts: action.products,
                userSubjects: action.userSubjects,
                //completedTasks: action.userProducts.filter(task => task.completed === true)
                //completedTasks: action.completedTasks
            };

        case CREATE_SUBJECT:
            const newSubject = new SubjectName(
                action.productData.subject,
            );
            return {
                ...state,
                //availableProducts: state.availableProducts.concat(newProduct),
                userSubjects: state.userSubjects.concat(newSubject)
            };
        case UPDATE_SUBJECT:
            const subjectIndex = state.userSubjects.findIndex(
                sub => sub.subject === action.subject
            );
            const updatedSubject = new SubjectName(
                state.userSubjects[subjectIndex].ownerId,
                action.productData.subject,
            );
            const updatedUserSubjects = [...state.userSubjects];
            updatedUserSubjects[productIndex] = updatedSubject;
            return {
                ...state,
                //availableProducts: updatedAvailableProducts,
                userSubjects: updatedUserSubjects
            };
        case DELETE_SUBJECT:
            return {
                ...state,
                userSubjects: state.userSubjects.filter(
                    sub => sub.subject !== action.subject
                ),
                // availableProducts: state.availableProducts.filter(
                //   product => product.id !== action.pid
                // )
            };
    }
    return state;
};
