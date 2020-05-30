const requestAllServices = 'REQUEST_ALL_SERVICES';
const suceessAllServices = 'SUCCESS_ALL_SERVICES';

const requestAllProviders = 'REQUEST_ALL_PROVIDERS';
const suceessAllProviders = 'SUCCESS_ALL_PROVIDERS';

const filterProviders = 'FILTER_PROVIDER';

const initialState = { services: [], isLoading: false };

export const actionCreators = {
  getServices: () => (dispatch, getState) => {
    dispatch({ type: requestAllServices });
    try {
        const url = `https://api.inquickerstaging.com/v3/winter.inquickerstaging.com/services`;
        fetch(url)
        .then(res => res.json())
        .then(res => {
            dispatch({ type: suceessAllServices, services: res.data });
        });
    } catch(error){
        console.log("Exception occured in Home -> actionCreators -> getServices:",error);
    }

  },
  getAllProviders: () => (dispatch, getState) => {    
    dispatch({ type: requestAllProviders });
    try {
        const url = `https://api.inquickerstaging.com/v3/winter.inquickerstaging.com/providers?include=locations%2Cschedules.location&page%5Bnumber%5D=1&page%5Bsize%5D=10`;
        fetch(url)
        .then(res => res.json())
        .then(res => {
            dispatch({ type: suceessAllProviders, originalProviderData: res.data ,allProviders: res.data });
        });
    } catch(error){
        console.log("Exception occured in Home -> actionCreators -> getAllProviders:",error);
    }
  },

  filterProviders: (service) => (dispatch, getState) => {
        const { originalProviderData } = getState().homeReducer;

        const filteredProviders = originalProviderData.filter(r => {
            return r.attributes.subspecialties 
                && r.attributes.subspecialties.includes(service.attributes.name)
               
        });

        dispatch({ type: filterProviders, allProviders: filteredProviders });
  }
};

export const homeReducer = (state, action) => {
  state = state || initialState;

  switch(action.type) {
        case requestAllServices:
            return {
                ...state,
                services: [],
                isLoading: true
              };
        case suceessAllServices:
            return {
                ...state,
                services: action.services,
                isLoading: false
              };
        case requestAllProviders:
            return {
                ...state,
                originalProviderData: [],
                allProviders: [],
                isLoading: true
              };
        case suceessAllProviders:
            return {
                ...state,
                originalProviderData: action.originalProviderData,
                allProviders: action.allProviders,
                isLoading: false
              };
        case filterProviders:
        return {
            ...state,
            allProviders: action.allProviders,
            };
        default: 
         return state;
  }
};
