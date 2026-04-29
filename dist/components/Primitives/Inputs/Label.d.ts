import * as React from "react";
/**
 * Label primitive — shadcn-compatible.
 *
 * Uses a native <label> with the standard `htmlFor` attribute to associate
 * with an input, so we avoid the extra @radix-ui/react-label dependency.
 * The `peer-disabled:*` utilities still work when the paired input has the
 * `peer` class.
 */
export declare const Label: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, "ref"> & React.RefAttributes<HTMLLabelElement>>;
