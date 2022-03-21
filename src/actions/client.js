import { message } from 'antd';
import moment from 'moment';
import { getAllClients, saveClient, updateClient, getStatistics, setInactiveClient, setActiveClient } from '../api/services/client';
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

export const selectClient = (client) => {  
  let currentClient = { ...client };
  if(currentClient.birthdate) currentClient.birthdate = moment(currentClient.birthdate);     
  return {
    type: SELECTED_CLIENT,
    payload: currentClient
  }
}

export const removeSelectClient = () => {
  return {
    type: REMOVE_SELECTED_CLIENT    
  }
}

export const loadClientsRequest = () => {
  return {
    type: LOAD_CLIENTS_REQUEST
  }
}

export const loadAllClientsSuccess = (data) => {
  return {
    type: LOAD_ALL_CLIENTS_SUCCESS,
    payload: data
  }
}

export const loadClientsFailure = () => {
  return {
    type: LOAD_CLIENTS_FAILURE
  }
}

export const saveClientSuccess = (data) => {
  return {
    type: SAVE_CLIENT_SUCCESS,
    payload: data
  }
}

export const saveClientFailure = (data) => {   
  return {
    type: SAVE_CLIENT_FAILURE,
    payload: data
  }
}

export const loadStatisticsRequest = () => {
  return {
    type: LOAD_STATISTICS_REQUEST
  }
}

export const loadStatisticsSuccess = (data) => {
  return {
    type: LOAD_STATISTICS_SUCCESS,
    payload: data
  }
}

export const loadStatisticsFailure = () => {
  return {
    type: LOAD_STATISTICS_FAILURE
  }
}

export const loadChangeStatusSuccess = () => {
  return {
    type: LOAD_CHANGE_STATUS_SUCCESS
  }
}

export const loadChangeStatusFailure = () => {
  return {
    type: LOAD_CHANGE_STATUS_FAILURE
  }
}

export const loadAllClients = () => {  
  return async (dispatch) => {
    try { 
      dispatch(loadClientsRequest());
      const response = await getAllClients();      
      const data = response.data.data;
      dispatch(loadAllClientsSuccess( data ));
    }catch (error) {
      dispatch(loadClientsFailure(error));
    }     
  }
}

export const loadSaveClient = (data) => {  
  return async (dispatch) => {
    try { 
      dispatch(loadClientsRequest());
      await saveClient(data);            
      message.success("Cliente creado correctamente");
      dispatch(saveClientSuccess());
    }catch (error) {      
      if(error.response.status === 500) {
        message.error("Error interno del servidor, contacte al administrador");
      }else if(error.response.status === 400) {
        dispatch(saveClientFailure(error.response.data.errors));        
      }else {
        message.error("Error al crear el cliente, contacte al administrador");
      }
      throw error;
    }     
  }
}

export const loadUpdateClient = (id, data) => {  
  return async (dispatch) => {
    try { 
      dispatch(loadClientsRequest());
      await updateClient(id, data);            
      message.success("Cliente actualizado correctamente");
      dispatch(saveClientSuccess());
    }catch (error) {
      if(error.response.status === 500) {
        message.error("Error interno del servidor, contacte al administrador");
      }else if(error.response.status === 400) {
        dispatch(saveClientFailure(error.response.data.errors));        
      }else {
        message.error("Error al crear el cliente, contacte al administrador");
      }
      dispatch(saveClientFailure(error.response.data.errors));
      throw error;
    }     
  }
}

export const loadStatistics = () => {  
  return async (dispatch) => {
    try { 
      dispatch(loadStatisticsRequest());
      const response = await getStatistics();      
      const data = response.data.data;
      dispatch(loadStatisticsSuccess( data ));
    }catch (error) {
      dispatch(loadStatisticsFailure(error));
    }     
  }
}

export const loadChangeStatusClient = (status, id) => {  
  return async (dispatch) => {
    try {
      dispatch(loadStatisticsRequest());
      if( status ) {
        await setInactiveClient(id);
        message.success("Cliente eliminado correctamente");
      }else {
        await setActiveClient(id);
        message.success("Cliente activado correctamente");
      }            
      dispatch(loadChangeStatusSuccess( ));
    }catch (error) {
      message.error("Algo salió mal, contacte al administrador");
      dispatch(loadChangeStatusFailure(error.response));
      throw error;
    }     
  }
}
