import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

type DialogProps = DialogPrimitive.DialogProps & {
  children: React.ReactNode;
};

const Dialog = ({ children, ...props }: DialogProps) => (
  <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>
);

const DialogTrigger = DialogPrimitive.Trigger;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 z-50" />
    <DialogPrimitive.Content
      ref={ref}
      {...props}
      className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#0f172a] p-6 rounded-lg shadow-lg"
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));

DialogContent.displayName = "DialogContent";

const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">{children}</div>
);

const DialogTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>
);

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
};
