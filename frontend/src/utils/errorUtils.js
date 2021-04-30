
export const getErrorType = (error) => {
    if (String(error).includes('Network Error')) {
        return 'NETWORK_ERROR'
    }
}

export const createErrorObject = (error) => {
    const err = {
        message: error.response?.data,
        status: error.response?.status
    }

    return err
}
