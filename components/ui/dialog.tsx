import * as DialogPrimitive from "@rn-primitives/dialog";
import clsx from "clsx";
import * as React from "react";
import { View, type ViewProps } from "react-native";
import { Text } from "./text";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlayWeb = React.forwardRef<
  DialogPrimitive.OverlayRef,
  DialogPrimitive.OverlayProps
>(({ className, ...props }, ref) => {
  const { open } = DialogPrimitive.useRootContext();
  return (
    <DialogPrimitive.Overlay
      className={clsx(
        "bg-black/80 flex justify-center items-center p-2 absolute top-0 right-0 bottom-0 left-0",
        open ? "web:animate-in web:fade-in-0" : "web:animate-out web:fade-out-0"
      )}
    />
  );
});

DialogOverlayWeb.displayName = "DialogOverlayWeb";

const DialogOverlayNative = React.forwardRef<
  DialogPrimitive.OverlayRef,
  DialogPrimitive.OverlayProps
>(({ className, children, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay
      className={clsx("flex bg-black/80 justify-center items-center p-2")}
    >
      <View>
        <>{children}</>
      </View>
    </DialogPrimitive.Overlay>
  );
});

DialogOverlayNative.displayName = "DialogOverlayNative";

const DialogContent = React.forwardRef<
  DialogPrimitive.ContentRef,
  DialogPrimitive.ContentProps & { portalHost?: string }
>(({ className, children, portalHost, ...props }, ref) => {
  const { open } = DialogPrimitive.useRootContext();
  return (
    <DialogPortal hostName={portalHost}>
      <DialogOverlayNative>
        <DialogPrimitive.Content
          className={clsx(
            "max-w-lg gap-4 border border-border web:cursor-default bg-background p-6 shadow-lg web:duration-200 rounded-lg",
            open
              ? "web:animate-in web:fade-in-0 web:zoom-in-95"
              : "web:animate-out web:fade-out-0 web:zoom-out-95"
          )}
        >
          {children}
          <DialogPrimitive.Close
            className={
              "absolute right-4 top-4 p-0.5 web:group rounded-sm opacity-70 web:ring-offset-background web:transition-opacity web:hover:opacity-100 web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2 web:disabled:pointer-events-none"
            }
          >
            <Text>x</Text>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogOverlayNative>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: ViewProps) => (
  <View className={clsx("flex flex-col gap-1.5 text-center sm:text-left")} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: ViewProps) => (
  <View
    className={clsx("flex flex-col-reverse sm:flex-row sm:justify-end gap-2")}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  DialogPrimitive.TitleRef,
  DialogPrimitive.TitleProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    className={clsx(
      "text-lg native:text-xl text-foreground font-semibold leading-none tracking-tight"
    )}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  DialogPrimitive.DescriptionRef,
  DialogPrimitive.DescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    className={clsx("text-sm native:text-base text-muted-foreground")}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlayNative,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
