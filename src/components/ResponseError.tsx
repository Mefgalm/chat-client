import { Alert } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { WebSocketContext } from "../websocket/WsClient";

export function ResponseErrorComponent() {
    const responseError = 'responseError';
    const [error, setError] = React.useState<string>("");
    const [show, setShow] = React.useState<boolean>(false);

    const webClient = React.useContext(WebSocketContext);
    useEffect(() => {
        webClient.addErrorHandler(responseError, e => {
            setError(e.message);
            setShow(true);
            setTimeout(() => {
                setError("");
                setShow(false);
            }, 5000);
        });

        return () => {
            webClient.removeErrorHandler(responseError);
        }
    });

    return (
        <Alert sx={{ position: 'absolute', display: show ? 'inline' : 'none' }} variant="outlined" severity="error">
            {error}
        </Alert>
    )
}