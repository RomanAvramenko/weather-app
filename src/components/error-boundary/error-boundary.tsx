import React, { ErrorInfo, ReactElement, Component, ReactNode } from "react";
import "./error-boundary.scss";

type ErState = {
  hasError: boolean;
};

type Props = {
  children: ReactNode;
};

export class ErrorBoundary extends Component<Props, ErState> {
  readonly state: ErState = {
    hasError: false,
  };

  public componentDidCatch?(error: Error, info: ErrorInfo): void {
    this.setState({ hasError: true });
  }

  public render(): ReactElement {
    if (this.state.hasError) {
      return (
        <div className="error-main">
          <div className="error-image"></div>
          <h3 className="error-description">Guess something went wrong</h3>
        </div>
      );
    }
    return <>{this.props.children}</>;
  }
}
