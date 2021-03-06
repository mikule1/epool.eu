import { initialTodosState, TodosState } from './todos.state';
import { shouldNotAlterStateOnUnknownAction } from 'app/store/testing';
import { assignDeep } from 'app/helpers';
import { todosReducer } from 'app/account/todos/state/todos.reducer';
import { TodosActions } from 'app/account/todos/state/todos.actions';

describe('Todos Reducer', () => {
    shouldNotAlterStateOnUnknownAction(todosReducer);

    let oldState: TodosState;

    beforeEach(() => {
        oldState = assignDeep(initialTodosState);
    });

    it(`Assigns the uid of the edited todo to the editing prop
        WHEN edit is called`, () => {
        const newState = todosReducer(oldState, new TodosActions.Edit('123'));
        expect(newState.editing).toBe('123');
    });

    it(`Assigns an empty string to the editing prop
        WHEN Update is called`, () => {
        oldState.editing = '123';
        const newState = todosReducer(oldState, new TodosActions.Update(null));
        expect(newState.editing).toBe('');
    });

    it(`Assigns an empty string to the editing prop
        WHEN Close Edit is called`, () => {
        oldState.editing = '123';
        const newState = todosReducer(oldState, new TodosActions.CloseEdit());
        expect(newState.editing).toBe('');
    });
});
