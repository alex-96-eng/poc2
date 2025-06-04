"use client";

import { CSSProperties, ReactNode } from "react";
import { FormProvider as RhfFormProvider, UseFormReturn } from "react-hook-form";

type Props = {
    children: ReactNode;
    methods: UseFormReturn<any>;
    onSubmit?: VoidFunction;
    style?: CSSProperties;
};

/**
 * This component acts as a wrapper that integrates React Hook Form with your form components.
 * It provides form methods context to all child components using the React Hook Form's `FormProvider`.
 * This allows you to use hooks like `useFormContext` within your nested form components.
 *
 * Props:
 *  - children (ReactNode): The child components of the form, typically form fields and submit buttons.
 *  - methods (UseFormReturn<any>): The methods object returned from the `useForm()` hook of React Hook Form.
 *    This object includes functions and state necessary to control form behavior.
 *  - onSubmit (VoidFunction | undefined): Optional. A function that is called when the form is submitted.
 *    This function should handle form validation and data submission.
 *  - className (string | undefined): Optional. A string that allows you to apply CSS classes to the form element for styling.
 *
 * Example Usage:
 * ```jsx
 * const methods = useForm();
 * const onSubmit = (data) => console.log(data);
 *
 * return (
 *   <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
 *     <FormInput name="username" />
 *     <SubmitButton />
 *   </FormProvider>
 * );
 * ```
 */
const FormProvider = ({ children, onSubmit, methods, style }: Props) => {
    return (
        <RhfFormProvider  {...methods}>
            <form onSubmit={onSubmit} style={{ ...style }}>
                {children}
            </form>
        </RhfFormProvider>
    );
};

export default FormProvider;
