import {bookingInitialState} from "./constants";
import {useDispatch, useSelector} from 'react-redux';
import {BookingAction, BookingState} from "./types";
import {Dispatch} from "redux";

export const useBookingReducer = () : [BookingState, Dispatch<BookingAction>] => {
    const bookingState : BookingState = useSelector((state) => {
        if(state && typeof state === 'object' && 'booking' in state){
            return state?.booking as BookingState
        }
        return bookingInitialState
    });
    const dispatch = useDispatch();

    return [bookingState, dispatch]
    // return useReducer(
    //     bookingReducer,
    //     bookingInitialState,
    // );
}
