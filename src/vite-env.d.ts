/// <reference types="vite/client" />
/// <reference types="react" />

import * as React from "react";
export {};

declare global {
  namespace React {
    type ReactNode = import("react").ReactNode;
    type ReactElement = import("react").ReactElement;
    type ElementType = import("react").ElementType;
    type Key = import("react").Key;
    type FormEvent<T = Element> = import("react").FormEvent<T>;
    type MouseEvent<T = Element> = import("react").MouseEvent<T>;
    type ChangeEvent<T = Element> = import("react").ChangeEvent<T>;
    type KeyboardEvent<T = Element> = import("react").KeyboardEvent<T>;
    type ComponentProps<T extends import("react").ElementType> = import("react").ComponentProps<T>;
    type HTMLAttributes<T> = import("react").HTMLAttributes<T>;
  }
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}
