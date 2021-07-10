const readline = require('readline');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function restartProcess(message = "An error has occured. Please restart the process") {
  if (message) return console.log(message);
}

function promptQuestion(question) {
  return `${question} \n=> `;
}

console.clear();

rl.question(promptQuestion('What Service Are You Requesting Access To? [weather]'), service => {
  console.clear();
  
  switch(service.toLowerCase()) {
    case 'weather': {
      rl.question(promptQuestion('What is your latitude?'), latitude => {

        console.clear();

        rl.question(promptQuestion('What is your longitude?'), async longitude => {

          console.clear();

          const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=f713ed814b44d28f20abc74aaeceb8d7&lat=${latitude}&lon=${longitude}&units=imperial`).catch(console.log);
          const data = await res.json();


          const { temp, feels_like, temp_min, temp_max, humidity } = data.main;
          const des = data.weather[0].description;

          let message = `Today, in ${data.name} the temperature is ${temp}°F, we should expect a high of ${temp_max}°F and a low of ${temp_min}°F. The humidity right now is at about ${humidity}%. As a result, it feels like ${feels_like}°F. In short, we have "${des}"`;

          await console.log(message);
        });
      });
      break;
    }
		
    default:
      return restartProcess();
  };
});