import Button from '@mui/material/Button';


interface QueryRunButtonProps {
    query: string
}

export default function QueryRunButton({ query }: QueryRunButtonProps) {

    return (
        <Button
            variant="contained"
            color="secondary"
        >
            Run
        </Button>
    );
}