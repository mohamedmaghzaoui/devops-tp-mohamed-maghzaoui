import { useState } from 'react'
import './form.css'
import { Popup } from './popup'
import { MdEdit } from 'react-icons/md'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { v4 as uuidv4 } from 'uuid'

export const Form = () => {
  const [fields, setFields] = useState([
    {
      id: uuidv4(),
      name: 'user',
      type: 'object',
      defaultValue: '',
      children: [],
    },
  ])

  const [showPopUp, setshowPopUp] = useState(false)
  const [activeField, setActiveField] = useState(null)

  // ================= POPUP =================

  const hidePopUp = () => setshowPopUp(false)

  const openPopup = (field) => {
    setActiveField(field)
    setshowPopUp(true)
  }

  // ================= ADD FIELD (RECURSIVE) =================

  const addField = (parentId = null) => {
    const newField = {
      id: uuidv4(),
      name: '',
      type: 'string',
      defaultValue: '',
      children: [],
    }

    if (!parentId) {
      setFields((prev) => [...prev, newField])
      return
    }

    const addNested = (items) =>
      items.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            children: [...item.children, newField],
          }
        }

        return {
          ...item,
          children: addNested(item.children || []),
        }
      })

    setFields((prev) => addNested(prev))
  }

  // ================= UPDATE NAME =================

  const handleFieldNameChange = (id, value) => {
    const update = (items) =>
      items.map((item) => {
        if (item.id === id) {
          return { ...item, name: value }
        }

        return {
          ...item,
          children: update(item.children || []),
        }
      })

    setFields((prev) => update(prev))
  }

  // ================= UPDATE POPUP DATA =================

  const updateFieldData = (data) => {
    const update = (items) =>
      items.map((item) => {
        if (item.id === activeField.id) {
          return { ...item, ...data }
        }

        return {
          ...item,
          children: update(item.children || []),
        }
      })

    setFields((prev) => update(prev))
    hidePopUp()
  }

  // ================= GENERATE JSON (FIXED) =================

  const generateJson = (fields) => {
    const result = {}

    fields.forEach((field) => {
      const key = field.name || 'unnamed'

      if (field.type === 'object') {
        result[key] = generateJson(field.children || [])
      } else if (field.type === 'array') {
        result[key] = [generateJson(field.children || [])]
      } else if (field.type === 'string') {
        result[key] = field.defaultValue || ''
      } else if (field.type === 'number') {
        result[key] = Number(field.defaultValue || 0)
      } else if (field.type === 'boolean') {
        result[key] = field.defaultValue === 'true'
      } else if (field.type === 'null') {
        result[key] = null
      } else {
        result[key] = field.defaultValue || null
      }
    })

    return result
  }

  // ================= RENDER FIELDS =================

  const renderFields = (fields, nested = false) => {
    return fields.map((field) => (
      <div key={field.id} className={`field-card ${nested ? 'ms-4' : ''}`}>
        <div className="d-flex align-items-center gap-2">
          <input
            className="field-input"
            placeholder="field name"
            value={field.name}
            onChange={(e) => handleFieldNameChange(field.id, e.target.value)}
          />

          <span className="badge-type">{field.type}</span>

          <button className="icon-btn" onClick={() => openPopup(field)}>
            <MdEdit />
          </button>

          <button className="icon-btn" onClick={() => addField(field.id)}>
            <IoIosAddCircleOutline />
          </button>
        </div>

        {field.children.length > 0 && (
          <div className="children">{renderFields(field.children, true)}</div>
        )}
      </div>
    ))
  }

  // ================= UI =================

  return (
    <div className="app-container">
      {/* BUILDER */}
      <div className="builder-zone">
        <div className="header">
          <h4>Schema Builder</h4>
          <p>Create nested JSON visually</p>
        </div>

        {renderFields(fields)}

        <button className="add-btn" onClick={() => addField()}>
          + Add Root Field
        </button>
      </div>

      {/* PREVIEW */}
      {/* <div className="preview-zone">
        <h5>JSON Preview</h5>

        <div className="preview-box">
          <pre>{JSON.stringify(generateJson(fields), null, 2)}</pre>
        </div>
      </div> */}

      {/* POPUP */}
      {showPopUp && (
        <Popup
          field={activeField}
          hidePopUp={hidePopUp}
          updateFieldData={updateFieldData}
        />
      )}
    </div>
  )
}
