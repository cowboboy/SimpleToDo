import { FC } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const Error: FC = () => {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return (
        <div>
            <h1>Error: {error.statusText}</h1>
            <p>{error.data}</p>
        </div>
    )
  }
}

export default Error