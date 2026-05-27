import aigenImage from './assets/Try our AiGen.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Form } from './components/form'
import { Data } from './components/data'

function App() {
  return (
    <>
      <div className="d-flex flex-column align-items-center ">
        <img
          className="img-fluid w-25 mt-5 mb-4"
          src={aigenImage}
          alt="Try our AiGen"
        />
        <p className="initial-text fs-5">Design Your Data, Powered by AI</p>
        <div className="main-content w-75 border rounded row">
          <div className="col-6">
            <Form />
          </div>
          <div className="col">
            <Data />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
