import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({label, options, selected, onSelectedChange }) => {

    const [open, setopen] = useState(false);

    const ref = useRef();

    useEffect(() => {

        const onBodyClickEvent = (event) => {
            if (ref.current.contains(event.target)) {
                return;
            }
            setopen(false)
        }
        document.body.addEventListener('click', onBodyClickEvent,

            { capture: true }
        )

        return () => {
            document.body.removeEventListener('click', onBodyClickEvent,
                { capture: true }
            )
        }
    },
        []);

    const renderedItems = options.map(option => {
        if (option.value === selected.value) {
            return null;
        }
        return (
            <div key={option.value}
                onClick={() => onSelectedChange(option)}
                className='item'
            >

                {option.label}

            </div>
        );
    });

    return (
        <div ref={ref} className='ui form'>
            <div className='field'>
                <label className='label' >{label}</label>
                <div
                    onClick={() => setopen(!open)}
                    className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
                    <i className='dropdown icon'></i>
                    <div className='text'>{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedItems}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dropdown;