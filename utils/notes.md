look up code status code 405,422

AUTH.TSX
//todo CONVERT BACK TO USECALLBACK. NEED TO FIGURE OUT THE OTHER OPTION FOR THIS LOGIC
const register = useCallback(async () => {
try {
await axios.post("/api/register"),
{
email,
name,
password,
};
} catch (error) {
console.log(error);
}
}, [email, name, password]);
