import { postServerData } from '../../helper/quiz/helper'
import * as Action from '../../redux/quiz/result_reducer'

export const PushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(Action.pushResultAction(result))
    } catch (error) {
        console.log(error)
    }
}
export const updateResult = (index) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(index));
    } catch (error) {
        console.log(error)
    }
}

/** insert user data */
export const usePublishResult = (resultData) => {
    const { result, username } = resultData;
    (async () => {
        try {
            if(!Array.isArray(result) || result.length === 0 && !username) throw new Error("Couldn't get Result");
            await postServerData(`http://localhost:8080/api/result`, resultData, data => data)
        } catch (error) {
            console.log(error)
        }
    })();
}