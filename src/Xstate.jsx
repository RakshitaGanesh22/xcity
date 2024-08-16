import { useEffect, useState } from "react";
import axios from "axios";

export default function Xstate() {
    const [countryData, setCountryData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [cityData, setCityData] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("https://crio-location-selector.onrender.com/countries");
                setCountryData(response.data);
                console.log("Countries:", response.data);
            } catch (error) {
                console.log("Error fetching countries: " + error);
            }
        };
        fetchCountries();
    }, []); 

    async function fetchStateData(countryName) {
        setSelectedCountry(countryName);
        setSelectedState(""); // Clear state and city when country changes
        setCityData([]);
        setSelectedCity("");
        setLoading(false); // Reset loading state
        try {
            const response = await axios.get(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
            setStateData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log("Error fetching states: " + error);
        }
    }

    async function fetchCityData(state) {
        setSelectedState(state);
        setSelectedCity(""); // Clear city when state changes
        setLoading(false); // Reset loading state
        try {
            const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`);
            setCityData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log("Error fetching cities: " + error);
        }
    }

    function handleCityChange(event) {
        const city = event.target.value;
        setSelectedCity(city);
        setLoading(true);
    }

    return (
        <div>
            <div>Select Location</div>
            <div>
                <select
                    name="CountrySelect"
                    id="country"
                    onChange={(event) => fetchStateData(event.target.value)}
                >
                    <option value="" disabled selected>Select Country</option>
                    {countryData.map((ele) => (
                        <option key={ele} value={ele}>
                            {ele}
                        </option>
                    ))}
                </select>
                
                <select
                    name="StateData"
                    id="StateData"
                    onChange={(event) => fetchCityData(event.target.value)}
                >
                    <option value="" disabled selected>Select State</option>
                    {stateData.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>

                <select
                    name="cityData"
                    id="cityData"
                    onChange={handleCityChange}
                >
                    <option value="" disabled selected>Select City</option>
                    {cityData.map((element) => (
                        <option key={element} value={element}>
                            {element}
                        </option>
                    ))}
                </select>
                {isLoading ? (
                    <div>You Selected {selectedCity}, {selectedState}, {selectedCountry}</div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    ); 
}
