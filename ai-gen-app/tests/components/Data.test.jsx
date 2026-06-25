import { render, screen } from '@testing-library/react'
import { Data } from '../../src/components/data'
import { expect, test } from 'vitest'

test('renders JSON data', () => {
  render(<Data />)

  expect(screen.getByText(/JSON example/i)).toBeInTheDocument()
 
})