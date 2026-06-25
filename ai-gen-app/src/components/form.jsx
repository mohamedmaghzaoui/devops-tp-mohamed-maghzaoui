import { useState } from 'react'
import './form.css'
import { Popup } from './popup'
import { MdEdit } from 'react-icons/md'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { v4 as uuidv4 } from 'uuid'
import { useGenerateJson } from '../hooks/useGenerateJson'

export const Form = () => {
  const [fields, setFields] = useState([
    {
      id: uuidv4(),
      name: 'username',
      type: 'string',
      defaultValue: '',
      children: [],
    },
  ])

  const [showPopUp, setshowPopUp] = useState(false)
  const [activeField, setActiveField] = useState(null)

  const { mutate, isPending } = useGenerateJson()

  const hidePopUp = () => setshowPopUp(false)

  const openPopup = (field) => {
    setActiveField(field)
    setshowPopUp(true)
  }

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
        return { ...item, children: addNested(item.children || []) }
      })

    setFields((prev) => addNested(prev))
  }

  const deleteField = (id) => {
    const remove = (items) =>
      items
        .filter((i) => i.id !== id)
        .map((i) => ({
          ...i,
          children: remove(i.children || []),
        }))

    setFields((prev) => remove(prev))
  }

  const handleFieldNameChange = (id, value) => {
    const update = (items) =>
      items.map((i) => {
        if (i.id === id) return { ...i, name: value }
        return { ...i, children: update(i.children || []) }
      })

    setFields((prev) => update(prev))
  }

  const updateFieldData = (data) => {
    const update = (items) =>
      items.map((i) => {
        if (i.id === activeField.id) return { ...i, ...data }
        return { ...i, children: update(i.children || []) }
      })

    setFields((prev) => update(prev))
    hidePopUp()
  }

  const buildSchema = (fields) =>
    fields.map((f) => ({
      name: f.name,
      type: f.type,
      format: f.format,
      regex: f.regex,
      children: buildSchema(f.children || []),
    }))

  const handleGenerate = () => {
    mutate({
      schema: buildSchema(fields),
      count: 10,
    })
  }

  const renderFields = (fields, nested = false) =>
    fields.map((field) => (
      <div key={field.id} className={`field-card ${nested ? 'ms-4' : ''}`}>
        <div className="d-flex align-items-center gap-2">
          <input
            className="field-input"
            value={field.name}
            onChange={(e) => handleFieldNameChange(field.id, e.target.value)}
            placeholder="field name"
          />

          <span className="badge-type">{field.type}</span>

          <button className="icon-btn" onClick={() => openPopup(field)}>
            <MdEdit />
          </button>

          <button className="icon-btn" onClick={() => addField(field.id)}>
            <IoIosAddCircleOutline />
          </button>

          <button
            className="icon-btn text-danger"
            onClick={() => deleteField(field.id)}
          >
            🗑
          </button>
        </div>

        {field.children.length > 0 && (
          <div className="children">{renderFields(field.children, true)}</div>
        )}
      </div>
    ))

  return (
    <div className="app-container">
      <div className="builder-zone">
        <div className="header">
          <h4>Schema Builder</h4>
          <p>Create nested JSON visually</p>
        </div>

        {renderFields(fields)}

        <button className="add-btn" onClick={() => addField()}>
          + Add Root Field
        </button>

        <button className="add-btn" onClick={handleGenerate}>
          {isPending ? 'Generating...' : 'Generate JSON'}
        </button>
      </div>

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
