/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import KitchenPage from './Kitchen'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}))

describe(('Test component Login'), () => {
  test('render component Login', () => {
    const { asFragment } = render(<KitchenPage />)
    const BtnLogout = screen.getByText('LogOut')
    expect(asFragment()).toMatchSnapshot()
    expect(BtnLogout).toBeDefined()
  })
})
