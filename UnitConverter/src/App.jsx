import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const [unitType, setUnitType] = useState('temperature')
  const [selectedValueFrom, setSelectedValueFrom] = useState('')
  const [selectedValueTo, setSelectedValueTo] = useState('')
  const [unitValue, setUnitValue] = useState('')
  const [result, setResult] = useState('')

  const setUnitState = (type) => {
    setUnitType(type)
    setSelectedValueFrom('')
    setSelectedValueTo('')
    setUnitValue('')
    setResult('')
  }

  const updateToValue = (event) => {
    setSelectedValueTo(event.target.value)
  }

  const updateFromValue = (event) => {
    setSelectedValueFrom(event.target.value)
  }

  const changeUnitValue = (event) => {
    if(event.target.value > 100000){
      alert("Please enter value which is less than 100000.")
      return
    }
    if(event.target.value == ''){
      setResult('')
    }
    setUnitValue(event.target.value)
  }

  const calculateTheConversion = () => {
    const type = unitType
    const from = selectedValueFrom
    const to = selectedValueTo
    const val = unitValue
    console.log(type, from, to, val)
    if (type == null || type == "" || from == null || from == "" || to == null || to == "" || val == null || val == "") {
      alert("Please enter all the required data")
      setResult('')
      return
    }
    if (type === "temperature") {
      
      if (selectedValueFrom == 'celsius') {
        if (selectedValueTo == 'fahrenheit') {
          const result = Number(unitValue) * (9/5) + 32
          setResult(result.toPrecision(5))
        } else if (selectedValueTo == 'kelvin') {
          const result = Number(unitValue) + 273.15
          setResult(result.toPrecision(5))
        } else {
          alert("Invalid Selection")
          return
        }
      } else if (selectedValueFrom == 'fahrenheit') {
        if (selectedValueTo == 'celsius') {
          const result = ( Number(unitValue) - 32 ) * (5 / 9)
          setResult(result.toPrecision(5))
        } else if (selectedValueTo == 'kelvin') {
          const result = ( Number(unitValue) - 32 ) * (5 / 9) + 273.15
          setResult(result.toPrecision(5))
        } else {
          alert("Invalid Selection")
          return
        }
      } else if (selectedValueFrom == 'kelvin') {
        if (selectedValueTo == 'fahrenheit') {
          const result = ( Number(unitValue) - 273.15 ) * (9 / 5) + 32
          setResult(result.toPrecision(5))
        } else if (selectedValueTo == 'celsius') {
          const result = Number(unitValue) - 273.15
          setResult(result.toPrecision(5))
        } else {
          alert("Invalid Selection")
          return
        }
      } else {
        alert("Invalid Selection")
        return
      }
    } else if (type === "length") {
      const convertToMeter = val * lengths[`${from}`]
      const result = convertToMeter / lengths[`${to}`]
      setResult(result.toPrecision(5))
    } else if (type === "weight") {
      const convertToGm = val * weights[`${from}`]
      const result = convertToGm / weights[`${to}`]
      setResult(result.toPrecision(5))
    } else {
      alert("Invalid Input")
      return
    }
  }

  const resetAllValues = () => {
    setSelectedValueFrom('')
    setSelectedValueTo('')
    setUnitValue('')
    setResult('')
  }

  useEffect(() => {
    console.log(unitType)
  }, [unitType])

  const lengths = {
    millimeter: 0.001,   // 1 millimeter = 0.001 meters
    centimeter: 0.01,    // 1 centimeter = 0.01 meters
    meter: 1,            // 1 meter = 1 meter
    kilometer: 1000,     // 1 kilometer = 1000 meters
    inch: 0.0254,        // 1 inch = 0.0254 meters
    foot: 0.3048,        // 1 foot = 0.3048 meters
    yard: 0.9144,        // 1 yard = 0.9144 meters
    mile: 1609.34        // 1 mile = 1609.34 meters
  }

  const weights = {
    milligram: 0.001,     // 1 milligram = 0.001 grams
    gram: 1,              // 1 gram = 1 gram
    kilogram: 1000,       // 1 kilogram = 1000 grams
    ounce: 28.3495,       // 1 ounce = 28.3495 grams
    pound: 453.592        // 1 pound = 453.592 grams
  }

  const temperature = [
    "celsius",
    "fahrenheit",
    "kelvin"
  ]

  return (
    <>
      <div className='applicationName'>⚖️ Unit Converter Tool</div>
      <div className='wrapper'>
        <div className='section inputSection'>
          <div className='units'>
            <div
              className={`unitTypes ${unitType === 'temperature' ? 'activeUnitType' : ''}`}
              onClick={() => setUnitState('temperature')}
            >
              <a href='#' className='linkUnitTypes'>🌡️ Temperature</a>
            </div>
            <div
              className={`unitTypes ${unitType === 'weight' ? 'activeUnitType' : ''}`}
              onClick={() => setUnitState('weight')}
            >
              <a href='#' className='linkUnitTypes'>⚖️ Weight</a>
            </div>
            <div
              className={`unitTypes ${unitType === 'length' ? 'activeUnitType' : ''}`}
              onClick={() => setUnitState('length')}
            >
              <a href='#' className='linkUnitTypes'>📏 Length</a>
            </div>
          </div>
          <div>
            <div className='formInputs mt-3'>
              <div className='mb-2'>
                <div className='label mb-1'>Enter the {unitType == "temperature" ? "Temperature" : unitType == "length" ? "Length" : "Weight"} to Convert: </div>
                <div className='inputField'>
                  <input type='number' className='form-control' value={unitValue} onChange={changeUnitValue}></input>
                </div>
              </div>
              <div className='mb-2'>
                <div className='label mb-1'>Unit to Convert From: </div>
                <div className='inputField'>
                  <select className='form-select' onChange={updateFromValue} value={selectedValueFrom}>
                    <option value="">--Select--</option>
                    {unitType === "temperature" &&
                      Array.from(temperature).map((x, index) => (
                        x !== selectedValueTo &&
                        <option key={index} value={x} className='optionText'>{x.toUpperCase()}</option>

                      ))
                    }
                    {unitType === "length" &&
                      Object.keys(lengths).map((x, index) => (
                        x !== selectedValueTo &&
                        <option key={index} value={x} className='optionText'>{x.toUpperCase()}</option>

                      ))
                    }
                    {unitType === "weight" &&
                      Object.keys(weights).map((x, index) => (
                        x !== selectedValueTo &&
                        <option key={index} value={x} className='optionText'>{x.toUpperCase()}</option>

                      ))
                    }
                  </select>
                </div>
              </div>
              <div className='mb-2'>
                <div className='label mb-1'>Unit to Convert To: </div>
                <div className='inputField'>
                  <select className='form-select' onChange={updateToValue} value={selectedValueTo}>
                    <option value="">--Select--</option>
                    {unitType === "temperature" &&
                      Array.from(temperature).map((x, index) => (

                        x !== selectedValueFrom &&
                        <option key={index} value={x} className='optionText'>{x.toUpperCase()}</option>

                      ))
                    }
                    {unitType === "length" &&
                      Object.keys(lengths).map((x, index) => (
                        x !== selectedValueFrom &&
                        <option key={index} value={x} className='optionText'>{x.toUpperCase()}</option>

                      ))
                    }
                    {unitType === "weight" &&
                      Object.keys(weights).map((x, index) => (
                        x !== selectedValueFrom &&
                        <option key={index} value={x} className='optionText'>{x.toUpperCase()}</option>

                      ))
                    }
                  </select>
                </div>
              </div>
              <div className='mb-2 buttons'>
                <input type='button' className='inputButton' value="Convert" onClick={calculateTheConversion}></input>
                <input type='button' className='inputButton resetButton' value="Reset" onClick={resetAllValues}></input>
              </div>
            </div>
          </div>
        </div>
        <div className='section outputSection'>

          {
            result !== "" ? (
              <div className='resultContainer'>
                <div className='resultHeading'>Result for you calculation is: </div>
                <div className='result'>{unitValue} {selectedValueFrom} = {result} {selectedValueTo}</div>
              </div> // Display the result if it's not empty
            ) : (
              <img src="puppyoutput.jpg" alt="Fallback Image" className='images' /> // Display the image if the result is empty
            )
          }

        </div>
      </div>
      <div className='footer'>Designed and Developed By Pranav K. Nigam 😊</div>
    </>
  )
}

export default App
