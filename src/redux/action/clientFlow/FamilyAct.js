import { ClientFamilyType } from "service/actionType";
import { api } from "service/api";
import { clientFlowApi } from "service/apiVariables";
import { errorToast } from "service/helperFunctions";

export const getFamilyDetailsSummary = (body) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getFamilyDetails, body })
      .then((data) => {
        resolve(data);
        dispatch({
          type: ClientFamilyType.updateFamilySummary,
          payload: data?.ObjectResponse,
        });
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getFamilyDetailsMember = (body) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getFamilyDetailsMember, body })
      .then((data) => {
        resolve(data);
        if (body?.Operation !== "2") {
          dispatch({
            type: ClientFamilyType.updateFamilyMember,
            payload: data?.familySummary,
          });
        }
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getFamilyDetailsGrid = (body) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getFamilyDetailsSchemeGrid, body })
      .then((data) => {
        resolve(data);
        if (body?.Operation !== "2") {
          dispatch({
            type: ClientFamilyType.updateFamilyGrid,
            payload: data?.SchemeSummary,
          });
        }
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};
