

export const returnErrorMessages = (error, status) => ({
    type: 'GET_ERRORS',
    payload: { error, status}
})

// returnErrorMessages will be used inside catch erros for api calls, see below
// dispatchEvent(returnErrorMessages(error.response.data, error.response.status))