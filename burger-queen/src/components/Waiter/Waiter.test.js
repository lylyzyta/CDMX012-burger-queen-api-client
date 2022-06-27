/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import WaiterPage from './Waiter'
import React from 'react'

test('render buttons', () => {
  render(<WaiterPage />)
  const buttons = screen.getByText('Breakfast', 'Burger', 'Dessert', 'Beverage')
})