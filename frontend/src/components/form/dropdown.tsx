import {useEffect, useState} from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {twMerge} from "@/utils/tailwindMerger";

export type DropdownOption = {
    label: string,
    value: string | number
};

interface DropdownProps {
    options: DropdownOption[];
    onSelect: (option: DropdownOption['value']) => void;
    model: DropdownOption['value']
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, model }) => {
    const [selectedValue, setSelectedValue] = useState<DropdownOption['value']>('Select an option');

    useEffect(() => {
        const [selected] = options.filter((option) => option.value === model);
        setSelectedValue(selected.label)
    }, [model, options])
    const handleMenuItemClick = ({value, label}: DropdownOption) => {
        onSelect(value);
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {selectedValue}
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-[1000] mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    {options.map((option, index) => (
                        <MenuItem key={index}>
                            {() => (
                                <a
                                    href="#"
                                    onClick={() => handleMenuItemClick(option)}
                                    className={twMerge(`block px-4 py-2 text-sm text-gray-700`, model === option.value ? 'bg-gray-100 text-gray-900' : '' )}
                                >
                                    {option.label}
                                </a>
                            )}
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    );
};

export default Dropdown;
