// popup.jsx

import { useState } from 'react'
import './popup.css'

export const Popup = ({ field, hidePopUp, updateFieldData }) => {
  const [formData, setFormData] = useState({
    type: field.type || 'string',
    required: field.required || false,
    defaultValue: field.defaultValue || '',
    format: field.format || '',
    regex: field.regex || '',
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateFieldData(formData)
  }

  return (
    <div className="overlay">
      <div className="content">
        <button onClick={hidePopUp} className="btn btn-danger btn-sm float-end">
          X
        </button>

        <h3 className="text-white mb-4">Field Settings</h3>

        <form onSubmit={handleSubmit}>
          {/* TYPE */}
          <div className="mb-4">
            <label className="text-white mb-2">Field Type</label>

            <select
              required
              className="form-select"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
              <option value="object">Object</option>
              <option value="array">Array</option>
              <option value="null">Null</option>
            </select>
          </div>

          {/* DEFAULT VALUE */}
          <div className="mb-4">
            <label className="text-white mb-2">Default Value</label>

            <input
              type="text"
              className="form-control"
              placeholder="Default value"
              name="defaultValue"
              value={formData.defaultValue}
              onChange={handleChange}
            />
          </div>

          {/* FORMAT */}
          <div className="mb-4">
            <label className="text-white mb-2">Format</label>

            <input
              type="text"
              className="form-control"
              placeholder="email / uuid / yyyy-mm-dd"
              name="format"
              value={formData.format}
              onChange={handleChange}
            />
          </div>

          {/* REGEX */}
          <div className="mb-4">
            <label className="text-white mb-2">Regex</label>

            <input
              type="text"
              className="form-control"
              placeholder="Regex validation"
              name="regex"
              value={formData.regex}
              onChange={handleChange}
            />
          </div>

          {/* REQUIRED */}
          <div className="form-check mb-4">
            <input
              type="checkbox"
              className="form-check-input"
              name="required"
              checked={formData.required}
              onChange={handleChange}
            />

            <label className="form-check-label text-white">
              Required field
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Save Field
          </button>
        </form>
      </div>
    </div>
  )
}
