import aigenImage from './assets/Try our AiGen.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Form } from './components/form'
import { Data } from './components/data'

function App() {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column align-items-center">
      {/* HEADER */}
      <div className="text-center mt-5">
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
