/* eslint-disable no-undef */
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CrudDashboardRow from './CrudDashboardRow'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}))

describe(('Test component CrudDashboardRow'), () => {
  test('render component CrudDashboardRow', () => {
    const { asFragment } = render(<CrudDashboardRow />)
    expect(asFragment()).toMatchSnapshot()
  })
})
