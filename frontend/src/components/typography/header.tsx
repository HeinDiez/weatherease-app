import {ReactNode} from "react";

interface HeaderProps {
    children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
    return (
        <h3 className='text-base font-semibold leading-6 '>{children}</h3>
    )
}

export default Header;