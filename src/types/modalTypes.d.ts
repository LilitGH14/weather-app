declare module "simple-react-modal" {
  import * as React from "react";

  export interface ModalProps {
    children?: React.ReactNode;
    closeOnOuterClick?: boolean;
    show?: boolean;
    onClose?: () => void;
    transitionSpeed?: number;
    containerClassName:string
  }

  export default class Modal extends React.Component<ModalProps> {}
}
