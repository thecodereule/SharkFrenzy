import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount"
import { loginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";

export default function LoginForm() {
    const { loginUser } = useAccount();
    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<loginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: loginSchema) => {
        await loginUser.mutateAsync(data);
    }

    return (
        <Paper 
            sx={{display: 'flex', flexDirection: 'column', p: 3, gap: 3, maxWidth: 'md', mx: 'auto', borderRadius: 3}} 
            component='form' 
            onSubmit={handleSubmit(onSubmit)}
        >
            <Box display='flex' alignItems='center' justifyContent='center' gap={3} color='secondary.main'>
                <LockOpen fontSize="large" />
                <Typography variant="h4">Sign in</Typography>
            </Box>    
            <TextInput label='Email' control={control} name='email'></TextInput>
            <TextInput label='Password' type="password" control={control} name='password'></TextInput>
            <Button type='submit' disabled={!isValid || isSubmitting} variant="contained" size="large">
                Login
            </Button>
        </Paper>
    )
}