import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Label } from '../ui/label' // ✅ Make sure you have this import (you used <Label> below)

const Form = ({ formControls, formData, setFormData, onSubmit, buttontext }) => {
  // Helper function to render each form control
  const renderinputsbyCtype = (getcontrolItems) => {
    let element = null
    const value = formData[getcontrolItems.name] || ''

    switch (getcontrolItems.componentType) {
      case 'input':
        element = (
          <input
            name={getcontrolItems.name}
            placeholder={getcontrolItems.placeholder}
            id={getcontrolItems.name}
            type={getcontrolItems.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getcontrolItems.name]: event.target.value,
              })
            }
            className="border rounded-md px-3 py-2 w-full"
          />
        )
        break

      case 'select':
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getcontrolItems.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getcontrolItems.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getcontrolItems.options &&
              getcontrolItems.options.length > 0
                ? getcontrolItems.options.map((optionItem) => (
                    <SelectItem
                      key={optionItem.id}
                      value={optionItem.id}
                    >
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        )
        break

      case 'textarea':
        element = (
          <Textarea
            name={getcontrolItems.name}
            placeholder={getcontrolItems.placeholder}
            id={getcontrolItems.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getcontrolItems.name]: event.target.value,
              })
            }
            className="w-full border rounded-md px-3 py-2"
          />
        )
        break

      default:
        element = (
          <input
            name={getcontrolItems.name}
            placeholder={getcontrolItems.placeholder}
            id={getcontrolItems.name}
            type={getcontrolItems.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getcontrolItems.name]: event.target.value,
              })
            }
            className="border rounded-md px-3 py-2 w-full"
          />
        )
        break
    }
    return element
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
          {formControls.map((controlItems) => (
            <div className="grid w-full gap-1.5" key={controlItems.name}>
              <Label className="mb-1">{controlItems.label}</Label>
              {renderinputsbyCtype(controlItems)}
            </div>
          ))}
        </div>

        <Button type="submit" className="mt-4 w-full">
          {buttontext || 'Submit'}
        </Button>
      </form>
    </div>
  )
}

export default Form
