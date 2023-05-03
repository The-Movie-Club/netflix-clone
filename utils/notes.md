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

/////////////
//imported method that takes these two args
//mostly syntax but would be nice to deep dive later
await signIn("credentials", {
email,
password,
redirect: false,
callbackUrl: "/",
});
router.push("/");

/////////
why?
adapter: PrismaAdapter(prismadb),

/////what is the next auth api file exactly?

///what is the lib folder for?
