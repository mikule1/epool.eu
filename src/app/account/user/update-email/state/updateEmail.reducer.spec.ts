import { FormState, FormStates } from 'app/store/forms/formState';

import { updateEmailReducer } from './updateEmail.reducer';
import { shouldNotAlterStateOnUnknownAction } from 'app/store/testing';
import { assignDeep } from 'app/helpers';
import { Messages } from 'app/resources/messages';
import { UpdateEmailActions } from 'app/account/user/update-email/state/updateEmail.actions';

describe('Update Email Reducer', () => {
    shouldNotAlterStateOnUnknownAction(updateEmailReducer);

    let oldState: FormState;

    beforeEach(() => {
        oldState = assignDeep(FormStates.Default);
    });

    it('Should toggle the form visibility when toggle is called', () => {
        oldState.showForm = false;
        let newState = updateEmailReducer(
            oldState,
            new UpdateEmailActions.ToggleForm()
        );
        expect(newState.showForm).toBe(true);
        newState = updateEmailReducer(
            newState,
            new UpdateEmailActions.ToggleForm()
        );
        expect(newState.showForm).toBe(false);
    });

    it('Should show the requesting status WHEN update is called', () => {
        const newState = updateEmailReducer(
            oldState,
            new UpdateEmailActions.Update('example@gmail.com')
        );
        expect(newState).toEqual(FormStates.Requesting);
    });

    it('Should show the failure status WHEN failure is called', () => {
        const newState = updateEmailReducer(
            oldState,
            new UpdateEmailActions.Failure({})
        );
        expect(newState).toEqual(
            FormStates.Failure(Messages.ApiResponse.ServerError)
        );
    });

    it('Should show the success status WHEN failure is called', () => {
        const newState = updateEmailReducer(
            oldState,
            new UpdateEmailActions.Success({})
        );
        expect(newState).toEqual(
            FormStates.Success(Messages.ApiResponse.UpdateEmailSuccess)
        );
    });
});
