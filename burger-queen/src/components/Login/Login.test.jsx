/* eslint-disable no-undef */
import React from 'react'
// import { BrowserRouter as Router } from 'react-router-dom'
// import { create, act } from 'react-test-renderer'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LoginPage from './Login'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}))

describe(('Test component Login'), () => {
  test('render component Login', () => {
    const { asFragment } = render(<LoginPage />)
    const loginButton = screen.getByText('Login')
    expect(asFragment()).toMatchSnapshot()
    expect(loginButton).toBeDefined()
  })

  test('value when click on button login', () => {
    const mockOnClick = jest.fn()
    render(<LoginPage onClick={mockOnClick}/>)
    const button = screen.getByText('Login')
    fireEvent.click(button)
    expect(mockOnClick).toHaveBeenCalledTimes(0)
  })
})
