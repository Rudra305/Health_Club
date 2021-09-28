export const fetchApiWrapper = async (apiPromise, errorMsg = "Something went Wrong", snackBarVariant = "success") => {
    const [res, error] = await apiPromise();
    if (res !== undefined) {
        const statusCode = res.status
        if (statusCode === 200) {
            const data = await res.json()

            return [{ statusCode, data }, error]
    
        } else if (statusCode === 401 || statusCode === 403) {
            window.localStorage.removeItem("token")
            // if (window.location.pathname.indexOf("/home") === -1) {
            //     window.location.pathname = `/${window.location.pathname.split("/")[1]}/home`
            // }

            return [{ statusCode, data: "Session Expired" }, error]

        } else {
            return [{ statusCode,  data: errorMsg }, error]
        }
    } else
        return [{}, error]
}