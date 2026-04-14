import React from 'react';
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    title?: string;
    description?: string;
    children?: React.ReactNode;
}
export declare const Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>>;
export {};
