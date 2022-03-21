import {
  LOAD_CLIENTS_REQUEST,
  LOAD_ALL_CLIENTS_SUCCESS,
  LOAD_CLIENTS_FAILURE,
  SAVE_CLIENT_SUCCESS,
  SAVE_CLIENT_FAILURE,
  SELECTED_CLIENT,
  REMOVE_SELECTED_CLIENT,
  LOAD_STATISTICS_REQUEST,
  LOAD_STATISTICS_SUCCESS,
  LOAD_STATISTICS_FAILURE,
  LOAD_CHANGE_STATUS_SUCCESS,
  LOAD_CHANGE_STATUS_FAILURE
} from "../types/client";

const initialState = {
  clients: [],
  selected: null,
  isFetching: false,
  error: false,
  statistics: null
}

export const clientsReducer = (state = initialState, action={}) => {

  switch(action.type) {

    case LOAD_CLIENTS_REQUEST:
      return { ...state, isFetching: true, error: false }      

    case LOAD_ALL_CLIENTS_SUCCESS:      
      return { ...state, isFetching: false, clients: action.payload, error: false }
   
    case LOAD_CLIENTS_FAILURE: 
      return { ...state, isFetching: false, error: action.payload }

    case SAVE_CLIENT_SUCCESS:      
    return { ...state, isFetching: false, error: false }
  
    case SAVE_CLIENT_FAILURE: 
      return { ...state, isFetching: false, error: action.payload }
    
    case SELECTED_CLIENT: 
      return { ...state, selected: { ...action.payload },  error: false }      
    
    case REMOVE_SELECTED_CLIENT: 
      return { ...state, selected: null }
    
    case LOAD_STATISTICS_REQUEST:
      return { ...state, isFetching: true, error: false }      

    case LOAD_STATISTICS_SUCCESS:
      return { ...state, isFetching: false, statistics: action.payload, error: false }
    
    case LOAD_STATISTICS_FAILURE:
      return { ...state, isFetching: false, error: action.payload }

    case LOAD_CHANGE_STATUS_SUCCESS:
      return { ...state, isFetching: false, error: false }
    
    case LOAD_CHANGE_STATUS_FAILURE:
      return { ...state, isFetching: false, error: action.payload }

    default:
      return state;
  }
}