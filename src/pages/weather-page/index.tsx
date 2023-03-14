import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Box, Button, TextField, Typography } from "@mui/material";
import { API_KEY } from "..";

export type GeoData = {
	country: string;
	lat: number;
	lon: number;
	local_names: any;
	name: string;
	state: string;
};

export type CoordinatesData = {
	lat: number;
	lon: number;
};

export type DisplayWeatherType = {
	date: string;
	maxTemp: number;
	minTemp: number;
	humidity: number;
};

const WeatherPage = () => {
	const [data, setData] = useState<GeoData[]>();
	const [weatherData, setWeatherData] = useState<DisplayWeatherType[]>();
	const [selectedCity, setSelectedCity] = useState<string>("");
	const [searchText, setSearchText] = useState<string>("");
	const [coordinates, setCoordinates] = useState<CoordinatesData>({ lat: 0, lon: 0 });
	const [name, setName] = useState<string>("");

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	const handleGoClick = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		try {
			const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=82f1ab018134545b247f9e04fae6ba74`);

			if (response.data.length > 0) {
				setData(response.data);
			} else {
				alert("Please check the spelling and try again");
				setSearchText("");
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleSelectChange = useCallback((e: SelectChangeEvent) => {
		setSelectedCity(e.target.value);
		setName(e.target.value);
		setSearchText("");
		if (data) {
			const values: any = data?.filter((item) => item.name == e.target.value).map((item) => ({ lat: item.lat, lon: item.lon }));
			setCoordinates(values);
		}
	}, []);

	const getWeather = async () => {
		try {
			setSelectedCity("");

			const response = await axios.get(
				`https://api.openweathermap.org/data/2.5/forecast?cnt=5&units=metric&lat=${coordinates.lat}&lon=${coordinates.lon}&appid=82f1ab018134545b247f9e04fae6ba74`
			);

			const values = response.data.list.map((item: any) => ({
				date: item.dt + "000",
				maxTemp: item.main.temp_max,
				minTemp: item.main.temp_min,
				humidity: item.main.humidity,
			}));
			setWeatherData(values);
			setCoordinates({ lat: 0, lon: 0 });
		} catch (error) {
			console.log(error);
		}
	};

	const formatDate = (date: string) => {
		const newDate = new Date(parseInt(date)).toLocaleDateString();

		return newDate;
	};

	return (
		<>
			<Grid container justifyContent="center" alignItems="center" direction="row" spacing={2} sx={{ height: "100vh" }}>
				<Grid item sx={{ width: "40vw" }}>
					<TextField label="Please enter the city" onChange={handleTextChange} required fullWidth value={searchText} />
				</Grid>
				<Grid item sx={{ width: "40vw" }}>
					<Button variant="contained" onClick={handleGoClick} sx={{ width: "100%" }}>
						Go!
					</Button>
				</Grid>
				{data && (
					<>
						<Grid item sx={{ width: "40vw" }}>
							<FormControl sx={{ width: "100%" }}>
								<InputLabel>Select Desired Location</InputLabel>
								<Select value={selectedCity} onChange={handleSelectChange} label="Select Desired Location">
									{data.map((item) => (
										<MenuItem key={item.lat} value={item.name}>
											{item.name} , {item.state}, {item.country}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item sx={{ width: "40vw" }}>
							<Button onClick={getWeather} disabled={selectedCity == "" ? true : false} variant="contained" sx={{ width: "100%" }}>
								Get Weather!
							</Button>
						</Grid>
					</>
				)}

				{weatherData && (
					<>
						<Grid item sx={{ width: "40vw" }}>
							Weather for {name} is:
							{weatherData.map((item) => (
								<Box key={item.date} sx={{ border: "1px solid grey", margin: 2 }}>
									<Typography>Weather for : {formatDate(item.date)}</Typography>
									<Typography>Max Temp: {item.maxTemp} C</Typography>
									<Typography>Min Temp: {item.minTemp} C</Typography>
									<Typography>Humidity: {item.humidity}</Typography>
								</Box>
							))}
						</Grid>
						<Button variant="contained" onClick={() => window.location.reload()}>
							Ok!
						</Button>
					</>
				)}
			</Grid>
		</>
	);
};

export default WeatherPage;
