import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, jest } from '@jest/globals';
import Dropdown, { DropdownOption } from '../dropdown';
import '@testing-library/jest-dom/jest-globals'
describe('Dropdown', () => {
    const options: DropdownOption[] = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' }
    ];
    const mockOnSelect = jest.fn();

    it('should render the component with options', () => {
        const { getByText } = render(
            <Dropdown options={options} onSelect={mockOnSelect} model="1" />
        );
        expect(getByText('Option 1')).toBeInTheDocument();
    });

    it('should show the selected option based on the model prop', () => {
        const { getByText } = render(
            <Dropdown options={options} onSelect={mockOnSelect} model="2" />
        );
        expect(getByText('Option 2')).toBeInTheDocument();
    });

    it('should call onSelect with the correct value when an option is clicked', () => {
        const { getByText } = render(
            <Dropdown options={options} onSelect={mockOnSelect} model="1" />
        );

        fireEvent.click(getByText('Option 1'));
        fireEvent.click(getByText('Option 2'));

        expect(mockOnSelect).toHaveBeenCalledWith('2');
    });

    it('should update the selected value when the model prop changes', () => {
        const { getByText, rerender } = render(
            <Dropdown options={options} onSelect={mockOnSelect} model="1" />
        );

        rerender(<Dropdown options={options} onSelect={mockOnSelect} model="3" />);

        expect(getByText('Option 3')).toBeInTheDocument();
    });
});
