import React, { useState } from 'react'
import './Select.scss'
import { DropdownItemProps, DropdownProps, Select as SemanticSelect } from 'semantic-ui-react'
import clsx from 'clsx'

type SemanticValue = string | number | boolean | (string | number | boolean)[] | undefined

interface Props {
  value?: SemanticValue
  placeholder?: string
  options: DropdownItemProps[]
  onChange: (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => void
  disabled?: boolean
  className?: string

  // Expand as needed
}

/**
 * Controlled instance of Semantic's Select.
 *
 * This is slightly different to overcome a user-experience conflict associated with Placeholder.
 * When the user clicks on the select and clicks away (staying on value ''), it should not automatically
 * pick the first value.
 */
export const Select: React.FC<Props> = ({ value, placeholder, options, onChange, disabled, className }) => {
  const initialValue = value ?? placeholder ? 'placeholder' : ''
  const [controlledValue, setControlledValue] = useState<SemanticValue>(initialValue)

  let selectOptions: DropdownItemProps[] = [...options]

  if (placeholder)
    selectOptions.unshift({
      key: 'placeholder',
      value: 'placeholder',
      text: placeholder,
    })

  const onSemanticChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    setControlledValue(data.value)

    onChange?.(event, {
      ...data,
      // The value should not matter internally, however, we want to make sure to return the correct empty value.
      value: data.value === 'placeholder' ? '' : data.value,
    })
  }

  return (
    <SemanticSelect
      className={clsx('w-full', 'semantic-options-override', className, {
        'semantic-placeholder-override': controlledValue === 'placeholder' && placeholder,
      })}
      options={selectOptions}
      value={controlledValue}
      onChange={onSemanticChange}
      disabled={disabled}
    />
  )
}
