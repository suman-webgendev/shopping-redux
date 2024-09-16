import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { forwardRef, memo } from "react";
import { buttonVariants } from "./button-variants";

const Button = forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export default memo(Button);
