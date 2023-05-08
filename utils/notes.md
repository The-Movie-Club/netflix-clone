## TODO

look up code status code 405,422

## Takeaways

- i notice he is building it out in order of authentication. guessing it helps prevent building and missing steps that would grant users more access than they need

- he adds all the css, html, and logic for a component before moving on

## Questions

- what is the next auth api file exactly?

- what is the lib folder for?

- why?
  adapter: PrismaAdapter(prismadb),

- do we love his div soup?

-FavoriteButton as its own component? why?

## Code block review

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

// function that is run before rendering the component
// uses built in logic to fetch the context created with useCurrentUser.ts
export async function getServerSideProps(context: NextPageContext) {
const session = await getSession(context);
if (!session) {
return {
redirect: {
destination: "/auth",
permanent: false,
},
};
}

return {
props: {},
};
}
///////////////////////////////////////////////////

go over all of useInfoModal.ts file

///////////////////////////////////////////////////

go over prismadb.ts file
