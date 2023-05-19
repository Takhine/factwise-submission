import React from "react";

type TypographyProps<C extends React.ElementType> = {
    as?: C;
  };

type Props<C extends React.ElementType> = React.PropsWithChildren<TypographyProps<C>> &   
Omit<React.ComponentPropsWithoutRef<C>, keyof TypographyProps<C>>;


const Typography = <C extends React.ElementType = "h2">({
    as,
    children,
    ...restProps
}: Props<C>) => {
    const Component = as || "h2";

    return <Component {...restProps}>{children}</Component>;
};

Typography.displayName = "Typography";

export default Typography;