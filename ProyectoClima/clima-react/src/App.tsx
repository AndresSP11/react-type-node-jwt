import styles from "./App.module.css"
import Alert from "./components/Alert/Alert";
import Form from "./components/Form/Form"

import useWeather from "./components/hooks/useWeather"
import Spinner from "./components/Spinner/Spinner";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";



function App() {
  
  const {fetchWeather,weather,hasWeatherData,notFound,loading}=useWeather();

  console.log(import.meta.env)

  return (
    <>
      <h1 className={styles.title}>
        Buscador de Clima
      </h1>
      <div className={styles.container}>
        <Form
          fetchWeather={fetchWeather}
        
        ></Form>
        {loading && <Spinner></Spinner>}
        {/*  La funcion del useMemo corrobora la data */}
        { hasWeatherData && <WeatherDetail weather={weather}></WeatherDetail>}
        {notFound && <Alert>Ciudad No Encontrada</Alert>}
        

      </div>
    </>
  )
}

export default App
