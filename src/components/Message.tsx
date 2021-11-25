import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import { Message as MessageResponse } from '../websocket/Responses';
import moment from 'moment';

const NameAndDateBar = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    minWidth: '10vw'
});

const MessageCreatedAt = styled('div')(({ theme }) => ({
    fontSize: '10px',
    fontStyle: 'italic',
    color: theme.palette.text.primary
}));

const Text = styled('div')(({ theme }) => ({
    color: theme.palette.text.primary
}));

const Name = styled('div')(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 'bolder',
}));

export function Message({ message, ownerId }: {
    message: MessageResponse,
    ownerId: string
}) {
    return (
        <Box
            component="span"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '12px',
                backgroundColor: message.id === ownerId ? 'primary.main' : 'secondary.main',
                p: 1,
            }}>
            <NameAndDateBar>
                <Name>{message.name}</Name>
                <MessageCreatedAt>{moment(message.createdAt).format('h:mm DD.MM')}</MessageCreatedAt>
            </NameAndDateBar>

            <Text>{message.message}</Text>

        </Box>
    );
}