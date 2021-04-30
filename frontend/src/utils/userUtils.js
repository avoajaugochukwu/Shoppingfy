export const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const getUserInfo = (response) => {
    const { data } = response
    const { data: { user } } = response
    const userInfo = {
        email: user.email,
        username: user.username,
        key: data.key,
        id: user.id
    }

    return userInfo
}