import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const inter = Inter({ subsets: ["latin"] });
export const API_KEY = `${process.env.REACT_APP_API_KEY}`;

export default function Home() {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Weather app</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/1779940.png" />
			</Head>
			{/* <i className="wi wi-night-sleet"></i> */}
			<Grid container justifyContent="center" alignItems="center" direction="column" spacing={5} sx={{ height: "80vh" }}>
				<Grid item>
					<Typography variant="h2">Welcome to the Weather app</Typography>
				</Grid>
				<Grid item>
					<Button variant="contained" onClick={() => router.push("/weather-page")}>
						Lets go!
					</Button>
				</Grid>
			</Grid>
		</>
	);
}