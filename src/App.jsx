
import { Invoice } from './components/Invoice'


const url = "https://api.merchant.staging.ercaspay.com/api/v1";
const secretKey = "ECRS-TEST-SKga84vcdU9u3Mbf6vh28ZIScZugauatzSnWVXEnOk";

function App() {
 
 
  return (
    <>
      <Invoice baseurl={url} secretKey={secretKey} />
      
    </>
  )
}

export default App
