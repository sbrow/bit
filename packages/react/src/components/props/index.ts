import { ComponentType, FunctionComponent } from "react";

/**
 * Constructs a type by extracting the properties from  React component `T`.
 **/
export type Props<T extends ComponentType<any>> = T extends FunctionComponent<
  any
>
    Parameters<T>[0]
  : Parameters<T["constructor"]>[0];

/**
 * Constructs a type by extracting property `K` from React component `T`.
 **/
export type ExtractProp<
  T extends ComponentType<any>,
  K extends keyof Parameters<T>[0]
> = Props<T>[K];
