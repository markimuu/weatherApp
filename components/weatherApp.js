import React from "react"
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native"
import Icon from "react-native-vector-icons/AntDesign"

const WeatherApp = () => {
    const [city, setCity] = React.useState("Helsinki");
    const [data, setData] = React.useState([]);
    const [temp, setTemp] = React.useState("");
    const [icon, setIcon] = React.useState("");
    const [showcity, setShowCity] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [main, setMain] = React.useState("");
    const [humidity, setHumidity] = React.useState("");
    const [pressure, setPressure] = React.useState("");
    const [visibility, setVisibility] = React.useState("");
    const [info, setInfo] = React.useState(true);

    const weatherFetch = () => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=70d62fdcd9ec10df1893d778e3af3e2f`)
      .then(response => response.json())
      .then(json => {
           setData(json);
           setTemp((json.main.temp-273.15).toFixed(1) + " °C");
           setShowCity(json.name);
           setIcon(json.weather[0].icon);
           setDesc(json.weather[0].description);
           setMain(json.weather[0].main);
           setHumidity(json.main.humidity+" %");
           setPressure(json.main.pressure+" hPa");
           setVisibility((json.visibility/1000).toFixed(2)+" Km")
        })
        .catch((error) => console.error(error))
        .finally(() => {
            setInfo(false);
      });
    }

    React.useEffect(() => {
        weatherFetch();
    }, []);


    console.log(showcity)

  
    return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor="#000"/>
      <ImageBackground source={{uri:"https://cdn.dribbble.com/users/403631/screenshots/14905352/media/d9ab35e9b8cf655ad6edb814b73d829b.jpg"}} 
      style={styles.ImageBackground}>

        <View style={styles.searchBoxView}>
          <TextInput placeholder="Search City" placeholderTextColor="#FFF" style={styles.searchBox} onChangeText={text => setCity(text)} />
            <TouchableOpacity style={styles.buttonTouch} onPress={weatherFetch}>
              <Icon name="search1" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

        <View style={styles.weatherBoxMain}>
          <View style={styles.weatherHolderView}>
              <Image tintColor='#FFF' source={{uri:"http://openweathermap.org/img/wn/"+icon+"@2x.png"}} style={styles.weatherImg}/>
              <View>
                <Text style={styles.tempratureText}>{temp}</Text>
                <Text style={styles.cityText}>{showcity}</Text>
              </View>
            </View>
        </View>

        <View style={styles.infoBoxView}>
          <View style={styles.infoHolderView}>
            <Text style={styles.mainWeatherText}>{main}</Text>
            <Text style={styles.descriptionText}>{desc}</Text>
            <Text style={styles.humidityText}>Humidity : {humidity}</Text>
            <Text style={styles.otherText}>Pressure : {pressure}</Text>
            <Text style={styles.othertext}>Visibility : {visibility}</Text>
          </View>
        </View>
      </ImageBackground>
      
    </SafeAreaView>
    )
}


const styles = StyleSheet.create({
  container:{
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },
  ImageBackground:{
    height:"100%",
    width:"100%"
  },
  searchBoxView:{
    height:"20%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
  },
  searchBox:{
    height:"35%",
    width:"80%",
    borderColor:"#FFF",
    borderWidth:1,
    borderRadius:15,
    color:"#FFF",
    paddingHorizontal:15
  },
  buttonTouch:{
    marginLeft:"5%",
    height:"35%",
    width:"8%",
    justifyContent:"center",
    alignItems:"center"
  },
  weatherBoxMain:{
    height:"30%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
  },
  weatherHolderView:{
    height:"80%",
    width:"90%",
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius:15,
    alignItems:"center",
    flexDirection:"row"
  },
  weatherImg:{
    height:"80%",
    width:"50%"
  },
  tempratureText:{
    fontSize:30,
    color:"#FFF",
    marginLeft:"5%"
  },
  cityText:{
    fontSize:20,
    color:"#FFF",
    marginLeft:"5%",
    marginTop:"3%"
  },
  infoBoxView:{
    height:"45%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
  infoHolderView:{
    height:"80%",
    width:"90%",
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius:15
  },
  mainWeatherText:{
    fontSize:28,
    color:"#464646",
    marginLeft:"8%",
    marginTop:"8%",
    fontWeight:"bold"
  },
  descriptionText:{
    fontSize:20,
    color:"#121212",
    marginLeft:"8%",
    marginTop:"3%"
  },
  humidityText:{
    fontSize:18,
    color:"#121212",
    marginLeft:"8%",
    marginTop:"5%"
  },
  otherText:{
    fontSize:18,
    color:"#121212",
    marginLeft:"8%",
    marginTop:"2%"
  }
})

export default WeatherApp;