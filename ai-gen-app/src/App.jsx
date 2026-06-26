/* global __APP_VERSION__ */
import aigenImage from './assets/Try our AiGen.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Form } from './components/form'
import { Data } from './components/data'

const version = __APP_VERSION__

function App() {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column align-items-center">
      <div className="w-100 d-flex justify-content-between align-items-center mt-3 px-3">
        <span className="text-light small">Version {version}</span>
      </div>

      {/* HEADER */}
      <div className="text-center mt-2">
        <img
          className="img-fluid mb-3"
          style={{ maxWidth: '220px' }}
          src={aigenImage}
          alt="Try our AiGen"
        />

        <p className="fs-5 text-light">Design Your Data, Powered by AI</p>
      </div>

      {/* MAIN */}
      <div className="container mt-3">
        <div className="row g-3">
          {/* FORM */}
          <div className="col-12 col-lg-6">
            <div className="bg-dark rounded p-3 h-100">
              <Form />
            </div>
          </div>

          {/* DATA */}
          <div className="col-12 col-lg-6">
            <div className="bg-dark rounded p-3 h-100">
              <Data />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
