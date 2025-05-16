
import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Container.displayName = "Container";

const Box = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { as?: React.ElementType }
>(({ className, as: Component = "div", ...props }, ref) => {
  return <Component ref={ref} className={cn(className)} {...props} />;
});
Box.displayName = "Box";

export { Container, Box };
