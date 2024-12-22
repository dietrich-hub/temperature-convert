import { ImageBackground, StatusBar, Text, View } from "react-native";
import { s } from "./Layout.style";
import hotBackground from "../assets/hot.png";
import coldBackground from "../assets/cold.png";
import { InputTemperature } from "../components/InputTemperature/InputTemperature";
import { TemperatureDisplay } from "../components/TemperatureDisplay/TemperatureDisplay";
import {DEFAULT_TEMPERATURE,DEFAULT_UNIT, UNITS} from "./constant"
import {getOppossitUnit,convertTemperatureTo, isIceTemperature} from "../services/temperature-service"
import {ButtonConvert} from "../components/ButtonConvert/ButtonConvert"
import { useEffect, useState } from "react";
export default function RootLayout() {
  const [inputValue, setInputValue]=useState(DEFAULT_TEMPERATURE)
  const [currentUnit, setCurrentUnit]=useState(DEFAULT_UNIT)
  const [currentBackground, setCurrentBackground]= useState()
const oppositeUnit = getOppossitUnit(currentUnit)
useEffect(()=>{
  const temperatureAsFloat = Number.parseFloat(inputValue)
  if(!isNaN(temperatureAsFloat)){
    const isColdBackground=isIceTemperature(inputValue,currentUnit)
    setCurrentBackground(isColdBackground?coldBackground:hotBackground)
  }
},[inputValue])
function getConvertedTemperature(){
  const valueAsFloat = Number.parseFloat(inputValue)
  return isNaN(valueAsFloat) ? "" :convertTemperatureTo(oppositeUnit,inputValue).toFixed(1)
}
  return (
    <ImageBackground source={currentBackground} style={s.container}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle={"dark-content"}
        translucent={true}
      />
      <View style={s.workspace}>
        <TemperatureDisplay value={getConvertedTemperature()} unit={oppositeUnit}/>
        <InputTemperature onChangeText={setInputValue} defaultValue={DEFAULT_TEMPERATURE} unit={currentUnit} />
        <ButtonConvert onPress={()=>{
          setCurrentUnit(oppositeUnit)
        }} unit={currentUnit} />
      </View>
    </ImageBackground>
  );
}
